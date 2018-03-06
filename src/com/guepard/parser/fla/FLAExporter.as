package com.guepard.parser.fla
{
	import com.guepard.app.Converter;
	import com.guepard.app.data.Builder;
	import com.guepard.tasks.Task;
	
	import flash.filesystem.File;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class FLAExporter extends Builder
	{
		private var _fla:FLA;
		
		public function get fla():FLA
		{
			return _fla;
		}
		
		private var _file:File;
		
		public function get file():File
		{
			return _file;
		}
		
		public function FLAExporter(file:File)
		{
			super("Export FLA Scripts");
			
			_file = file;
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			if (_fla)
			{
				_fla.dispose();
				_fla = null;
			}
		}
		
		override public function start(completeHandler:Function, progressHandler:Function):void
		{
			super.start(completeHandler, progressHandler);
			
			if (_file && _file.exists)
			{
				parseFla();
				
				addCodeCompilationTasks();
				
				tasks.start(exportComplete, exportProgress);
			}
			else
			{
				Converter.output.error("FLA File Not Found: " + (file ? file.nativePath : "null"));
				
				complete();
			}
		}
		
		private function parseFla():void
		{
			Converter.output.log("Parse FLA: " + _file.name);
			
			var targetCodePath:File = Converter.settings.debugFlaPath;
			
			_fla = new FLA(_file);
			_fla.read();
			
			for each(var symbol:FLASymbol in _fla.symbols)
			{
				symbol.targetFolder = targetCodePath;
			}
		}
		
		private function addCodeCompilationTasks():void
		{
			var symbol:FLASymbol;
			
			for each(symbol in _fla.symbols)
			{
				tasks.addTask(new Task(symbol.parse));
			}
			
			for each(symbol in _fla.symbols)
			{
				tasks.addTask(new Task(symbol.export));
			}
		}
		
		private function exportProgress(value:Number):void
		{
			progress(value);
		}
		
		private function exportComplete():void
		{
			complete();
		}
		
	}
	
}