package com.guepard.converter
{
	import com.guepard.app.Converter;
	import com.guepard.app.data.Builder;
	import com.guepard.compiler.CodeCompiler;
	import com.guepard.compiler.CompilerData;
	import com.guepard.utils.FileUtil;
	import com.guepard.utils.JSMinifierUtil;
	
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class HTMLGenerator extends Builder
	{
		
		public function HTMLGenerator()
		{
			super("Generate HTML");
		}
		
		override public function start(completeHandler:Function, progressHandler:Function):void
		{
			super.start(completeHandler, progressHandler);
			
			var file:File = Converter.settings.htmlTemplatePath;
			
			var stream:FileStream = new FileStream();
			stream.open(file, FileMode.READ);
			var template:String = stream.readUTFBytes(stream.bytesAvailable);
			stream.close();
			
			template = replaceBase(template);
			template = replaceFonts(template);
			template = replaceEngineCode(template);
			template = replaceApplicationCode(template);
			
			file = Converter.target.targetPath.resolvePath("index.html");
			
			stream = new FileStream();
			stream.open(file, FileMode.WRITE);
			stream.writeUTFBytes(template);
			stream.close();
			
			complete();
		}
		
		private function replaceBase(template:String):String
		{
			template = template.replace(new RegExp("{project name}", 'g'), Converter.source.custom.projectName.text);
			
			template = template.replace(new RegExp("{width}", 'g'), Converter.parameters.custom.appWidth.value);
			template = template.replace(new RegExp("{height}", 'g'), Converter.parameters.custom.appHeight.value);
			
			var color:String = Converter.parameters.custom.backgroundColor.text.replace("0x", "").replace("#", "");
			while (color.length < 6) color = "0" + color;
			
			template = template.replace(new RegExp("{background color}", 'g'), color);
			
			template = template.replace(new RegExp("{render mode}", 'g'), Converter.target.custom.renderType.selectedItem.data);
			template = template.replace(new RegExp("{frame rate}", 'g'), Converter.parameters.custom.frameRate.value);
			template = template.replace(new RegExp("{align}", 'g'), Converter.parameters.custom.align.selectedItem.data);
			template = template.replace(new RegExp("{scale mode}", 'g'), Converter.parameters.custom.scaleMode.selectedItem.data);
			template = template.replace(new RegExp("{fill screen}", 'g'), Converter.parameters.custom.fillScreen.selected);
			template = template.replace(new RegExp("{debug mode}", 'g'), !Converter.target.custom.minify.selected);
			
			template = template.replace(new RegExp("{application path}", 'g'), '"data/' + Converter.source.custom.projectName.text + '.xml"');
			template = template.replace(new RegExp("{preloader path}", 'g'), '"data/' + Converter.settings.preloaderTemplatePath.name.replace(".swf", "") + '.xml"');
			
			return template;
		}
		
		private function replaceFonts(template:String):String
		{
			var text:String = "";
			
			//TODO: add google fonts
			/*if (Converter.resources.custom.exportFonts.selected)
			{
				var data:Array = [];
				
				data.push('<style type="text/css">');
				data.push('\t@font-face {');
				data.push('\t\tfont-family:"Pricedown Bl";');
				data.push('\t\tsrc: url("data/font/pricedown_bl-webfont.eot");');
				data.push('\t\tsrc: url("data/font/pricedown_bl-webfont.eot?#iefix") format("embedded-opentype"),');
				data.push('\t\turl("data/font/pricedown_bl-webfont.ttf") format("truetype"),');
				data.push('\t\turl("data/font/pricedown_bl-webfont.svg#pricedownblack") format("svg");');
				data.push('\t\tfont-weight: normal;');
				data.push('\t\tfont-style: normal;');
				data.push('\t}');
				data.push('</style>');
				
				text = data.join("\n\t\t");
			}//*/
			
			template = template.replace(new RegExp("{embed fonts}", 'g'), text);
			
			return template;
		}
		
		private function replaceEngineCode(template:String):String
		{
			var file:File;
			var stream:FileStream;
			var list:Array = [];
			
			var engine:File = Converter.settings.jsEnginePath;
			
			var files:Vector.<File> = new Vector.<File>();
			
			FileUtil.getFiles(files, Converter.settings.jsEnginePath, ["js"]);
			
			if (Converter.target.custom.minify.selected)
			{
				var code:Vector.<String> = new Vector.<String>();
				
				for each(file in files)
				{
					if (file.name != "test.js")
					{
						stream = new FileStream();
						stream.open(file, FileMode.READ);
						var data:String = stream.readUTFBytes(stream.bytesAvailable);
						stream.close();
						
						data = compressJS(data, file.name);
						
						if (file.name == "flash.js")
						{
							code.unshift(data);
						}
						else
						{
							code.push(data);
						}
					}
				}
				
				data = code.join(";");
				
				var engineFileName:String = "guepard.min.js";
				
				file = Converter.target.targetCodePath.resolvePath(engineFileName);
				
				stream = new FileStream();
				stream.open(file, FileMode.WRITE);
				stream.writeUTFBytes(data);
				stream.close();
				
				list.push('<script charset="UTF-8" src="js/' + engineFileName + '"></script>');
			}
			else
			{
				FileUtil.copyDirectory(Converter.settings.jsEnginePath, Converter.target.targetCodePath);
				
				for each(file in files)
				{
					var path:String = file.nativePath.substring(engine.nativePath.length);
					
					var script:String = '<script charset="UTF-8" src="js' + path + '"></script>';
					
					if (file.name == "flash.js")
					{
						list.unshift(script);
					}
					else
					{
						list.push(script);
					}
				}
			}
			
			template = template.replace(new RegExp("{engine code}", 'g'), list.join("\n\t\t"));
			
			return template;
		}
		
		private function compressJS(source:String, name:String):String
		{
			try
			{
				var minifier:JSMinifierUtil = new JSMinifierUtil(source);
				minifier.run();
				return minifier.output;
			}
			catch (e:Error)
			{
				Converter.output.error("Java Script Minify Error: " + name);
			}
			
			return source;
		}
		
		private function replaceApplicationCode(template:String):String
		{
			var data:CompilerData;
			var list:Array = [];
			
			var target:File = Converter.target.targetCodePath;
			
			var datas:Vector.<CompilerData> = CodeCompiler.datas;
			
			var requiredClasses:Vector.<String> = ResourcesConverter.getRequiredClasses();
			
			if (Converter.target.custom.minify.selected)
			{
				var code:Vector.<String> = new Vector.<String>();
				
				for each(data in datas)
				{
					if (data.info && !data.core && !data.info.appended && requiredClasses.indexOf(data.info.fullName) != -1)
					{
						var stream:FileStream = new FileStream();
						stream.open(data.target, FileMode.READ);
						var text:String = stream.readUTFBytes(stream.bytesAvailable);
						stream.close();
						
						code.push(text);
					}
				}
				
				text = code.join(";");
				
				if (text.length)
				{
					var appFileName:String = Converter.source.custom.projectName.text + ".min.js";
					
					list.push('<script charset="UTF-8" src="js/' + appFileName + '"></script>');
					
					var file:File = Converter.target.targetCodePath.resolvePath(appFileName);
					
					stream = new FileStream();
					stream.open(file, FileMode.WRITE);
					stream.writeUTFBytes(text);
					stream.close();
				}
			}
			else
			{
				
				for each(data in datas)
				{
					if (data.info && !data.core && !data.info.appended && requiredClasses.indexOf(data.info.fullName) != -1)
					{
						var path:String = data.target.nativePath.substring(target.nativePath.length);
						path = path.replace(".as", ".js");
						
						var script:String = '<script charset="UTF-8" src="js' + path + '"></script>';
						
						list.push(script);
					}
				}
			}
			
			list.sort();
			
			template = template.replace(new RegExp("{application code}", 'g'), list.join("\n\t\t"));
			
			return template;
		}
	}
	
}