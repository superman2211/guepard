package com.guepard.compiler
{
	import com.guepard.app.Converter;
	import com.guepard.app.data.Builder;
	import com.guepard.parser.fla.FLAExporter;
	import com.guepard.parser.fla.FLASymbol;
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.info.EmbedInfo;
	import com.guepard.parser.serialization.CodeAnalyzator;
	import com.guepard.tasks.Task;
	import com.guepard.utils.PathUtil;
	
	import flash.filesystem.File;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class CodeCompiler extends Builder
	{
		private static var _datas:Vector.<CompilerData>;
		
		static public function get datas():Vector.<CompilerData>
		{
			return _datas;
		}
		
		private var _analyzeIterations:Number;
		
		public function CodeCompiler():void
		{
			super("Compile Java Script");
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			if (_datas)
			{
				for each(var data:CompilerData in _datas)
				{
					data.dispose();
				}
			}
		}
		
		public override function start(completeHandler:Function, progressHandler:Function):void
		{
			ClassInfo.clearClasses();
			
			super.start(completeHandler, progressHandler);
			
			EmbedInfo.projectName = Converter.source.custom.projectName.text;
			EmbedInfo.targetFolder = Converter.target.targetDataPath;
			
			_datas = new Vector.<CompilerData>();
			
			addDatas(Converter.settings.corePath, Converter.settings.debugCodePath, Converter.settings.debugCodePath, true);
			
			var coreDatasLength:int = _datas.length;
			
			for each(var folder:File in Converter.source.sourcePaths)
			{
				addDatas(folder, Converter.target.targetCodePath, Converter.settings.debugCodePath, false);
			}
			
			addFlaDatas(Converter.target.targetCodePath, Converter.settings.debugCodePath);
			
			if (coreDatasLength == _datas.length)
			{
				Converter.output.log("Not found the source code");
				
				exportComplete();
			}
			else
			{
				addCodeCompilationTasks();
				
				tasks.start(exportComplete, exportProgress);
			}
		}
		
		private function addDatas(source:File, target:File, debug:File, core:Boolean):void
		{
			var list:Array = source.getDirectoryListing();
			
			for each(var file:File in list)
			{
				if (file.isDirectory)
				{
					addDatas(file, target/*.resolvePath(file.name)*/, debug.resolvePath(file.name), core);
				}
				else if (file.extension == "as")
				{
					var data:CompilerData = new CompilerData();
					data.source = file;
					data.targetFolder = target;//.resolvePath(file.name);
					data.debug = debug.resolvePath(file.name);
					data.core = core;
					
					_datas.push(data);
				}
			}
		}
		
		private function addCodeCompilationTasks():void
		{
			var data:CompilerData;
			
			for each(data in _datas)
			{
				tasks.addTask(new Task(data.read));
				tasks.addTask(new Task(data.parse));
			}
			
			_analyzeIterations = 0;
			
			tasks.addTask(new Task(analyzeClasses));
			
			for each(data in _datas)
			{
				tasks.addTask(new Task(data.export));
			}
		}
		
		private function analyzeClasses():Boolean
		{
			CodeAnalyzator.clear();
			
			var data:CompilerData;
			
			for each(data in _datas)
			{
				data.analyze();
			}
			
			for each(data in _datas)
			{
				data.correct();
			}
			
			_analyzeIterations++;
			
			if (_analyzeIterations >= CodeAnalyzator.ITERATIONS_MAX)
			{
				CodeAnalyzator.traceErrors();
			}
			else
			{
				Converter.output.log("Analyze iterations: " + _analyzeIterations);
			}
			
			return !CodeAnalyzator.hasErrors || _analyzeIterations >= CodeAnalyzator.ITERATIONS_MAX;
		}
		
		private function numberToHex(n:uint):String
		{
			var hex:String = n.toString(16);
			
			while (hex.length < 6)
			{
				hex = "0" + hex;
			}
			
			return "#" + hex;
		}
		
		private function replace(data:String, source:String, target:String):String
		{
			while (data.indexOf(source) != -1)
			{
				data = data.replace(source, target);
			}
			
			return data;
		}
		
		private function addFlaDatas(target:File, debug:File):void
		{
			for each(var builder:Builder in Converter.output.builders)
			{
				if (builder is FLAExporter)
				{
					var exporter:FLAExporter = FLAExporter(builder);
					
					for each(var symbol:FLASymbol in exporter.fla.symbols)
					{
						if (symbol.enabled || symbol.isSound)
						{
							var data:CompilerData = new CompilerData();
							data.source = symbol.target;
							data.targetFolder = target;
							data.debug = debug.resolvePath(PathUtil.changeName(symbol.info.path, symbol.info.name + "_fla"));
							data.core = false;
							
							_datas.push(data);
						}
					}
				}
			}
		}
		
		private function exportProgress(value:Number):void
		{
			progress(value);
		}
		
		private function exportComplete():void
		{
			exportEmbed();
		}
		
		private function exportEmbed():void
		{
			if (Converter.resources.custom.exportCodeEmbed.selected)
			{
				tasks.removeTasks();
				
				for each(var embed:EmbedInfo in EmbedInfo.list)
				{
					tasks.addTask(new Task(embed.export));
				}
				
				tasks.start(exportEmbedComplete, exportEmbedProgress);
			}
			else
			{
				exportEmbedComplete();
			}
		}
		
		private function exportEmbedProgress(value:Number):void
		{
			progress(value);
		}
		
		private function exportEmbedComplete():void
		{
			complete();
		}
		
	}
	
}