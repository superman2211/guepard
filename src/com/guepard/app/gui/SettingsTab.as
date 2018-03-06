package com.guepard.app.gui
{
	import com.guepard.app.Converter;
	
	import flash.display.MovieClip;
	import flash.filesystem.File;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SettingsTab extends TabController
	{
		public function get custom():GeneralDesign
		{
			return GeneralDesign(design);
		}
		
		public function get sdkPath():File
		{
			return getFile(custom.sdkPath.text);
		}
		
		public function get corePath():File
		{
			return resolvePath(sdkPath, "core");
		}
		
		public function get debugPath():File
		{
			return resolvePath(File.applicationStorageDirectory, "debug");
		}
		
		public function get debugCodePath():File
		{
			return resolvePath(debugPath, "code");
		}
		
		public function get debugFlaPath():File
		{
			return resolvePath(debugPath, "fla");
		}
		
		public function get debugDataPath():File
		{
			return resolvePath(debugPath, "data");
		}
		
		public function get enginePath():File
		{
			return resolvePath(sdkPath, "engine");
		}
		
		public function get jsEnginePath():File
		{
			return resolvePath(enginePath, "js");
		}
		
		public function get templatesPath():File
		{
			return resolvePath(sdkPath, "templates");
		}
		
		public function get htmlTemplatePath():File
		{
			var file:File = Converter.target.htmlTemplatePath;
			
			if (file)
			{
				return file;
			}
			else
			{
				return resolvePath(templatesPath, "html/index.html");
			}
		}
		
		public function get extendsTemplatePath():File
		{
			return resolvePath(templatesPath, "as/ExtendsTemplate.as");
		}
		
		public function get preloaderTemplatePath():File
		{
			var file:File = Converter.source.preloaderPath;
			
			if (file)
			{
				return file;
			}
			else
			{
				return resolvePath(templatesPath, "preloader/preloader.swf");
			}
		}
		
		public function SettingsTab(design:MovieClip)
		{
			super(design);
			
			new BrowseController(custom.sdkPath, custom.sdkPathButton, null, true);
			
			getDefaults();
		}
	}
}