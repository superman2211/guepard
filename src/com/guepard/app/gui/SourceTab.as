package com.guepard.app.gui
{
	import com.guepard.app.Converter;
	import com.guepard.decompiler.data.SWFData;
	import com.guepard.decompiler.serialization.SWFSerializator;
	
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.net.FileFilter;
	import flash.utils.ByteArray;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SourceTab extends TabController
	{
		public function get custom():SourceDesign
		{
			return SourceDesign(design);
		}
		
		public function get sourcePaths():Vector.<File>
		{
			var paths:Vector.<File> = new Vector.<File>();
			
			var parts:Array = custom.sourceCodePath.text.split(";");
			
			for each(var part:String in parts)
			{
				var file:File = getFile(part);
				
				if (file && file.exists)
				{
					paths.push(file);
				}
			}
			
			return paths;
		}
		
		public function get swfPath():File
		{
			return getFile(custom.swfFile.text);
		}
		
		public function get preloaderPath():File
		{
			return getFile(custom.preloaderFile.text);
		}
		
		public function get flaPaths():Vector.<File>
		{
			var paths:Vector.<File> = new Vector.<File>();
			
			var parts:Array = custom.flaFile.text.split(";");
			
			for each(var part:String in parts)
			{
				var file:File = getFile(part);
				
				if (file && file.exists)
				{
					paths.push(file);
				}
			}
			
			return paths;
		}
		
		public function SourceTab(design:MovieClip)
		{
			super(design);
			
			new BrowseController(custom.sourceCodePath, custom.sourceCodePathButton, null, true);
			new BrowseController(custom.swfFile, custom.swfFileButton, [new FileFilter("Flash Movie (*.swf)", "*.swf")]);
			new BrowseController(custom.flaFile, custom.flaFileButton, [new FileFilter("Flash Document (*.fla)", "*.fla")], true);
			new BrowseController(custom.preloaderFile, custom.preloaderFileButton, [new FileFilter("Flash Movie (*.swf)", "*.swf")]);
			
			getDefaults();
		}
		
		override protected function change(e:Event):void
		{
			super.change(e);
			
			if (e.currentTarget == custom.swfFile && swfPath && swfPath.exists)
			{
				var bytes:ByteArray = new ByteArray();
				
				var stream:FileStream = new FileStream();
				stream.open(swfPath, FileMode.READ);
				stream.readBytes(bytes, 0, stream.bytesAvailable);
				stream.close();
				
				var swf:SWFData = SWFSerializator.read(bytes);
				
				Converter.parameters.custom.appWidth.value = swf.size.width;
				Converter.parameters.custom.appHeight.value = swf.size.height;
				Converter.parameters.custom.frameRate.value = swf.frameRate;
				Converter.parameters.custom.backgroundColor.text = "0x" + swf.backgroundColor.toString(16);
				
				swf.dispose();
			}
		}
	}
}