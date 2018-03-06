package com.guepard.utils
{
	import flash.filesystem.File;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class FileUtil
	{
		public static function getFiles(files:Vector.<File>, directory:File, extensions:Array = null):void
		{
			var list:Array = directory.getDirectoryListing();
			
			for each (var file:File in list)
			{
				if (file.isDirectory)
				{
					getFiles(files, file, extensions);
				}
				else if (!extensions || !extensions.length || extensions.indexOf(file.extension) != -1)
				{
					files.push(file);
				}
			}
		}
		
		public static function copyDirectory(source:File, target:File):void
		{
			var list:Array = source.getDirectoryListing();
			
			for each (var file:File in list)
			{
				if (file.isDirectory)
				{
					copyDirectory(file, target.resolvePath(file.name));
				}
				else
				{
					file.copyTo(target.resolvePath(file.name), true);
				}
			}
		}
		
		public function clearDirectory(directory:File, ignored:File = null):void
		{
			var files:Array = directory.getDirectoryListing();
			
			for each(var file:File in files)
			{
				if (ignored && ignored.nativePath == file.nativePath)
				{
					
				}
				else if (file.isDirectory)
				{
					file.deleteDirectory(true);
				}
				else
				{
					file.deleteFile();
				}
			}
		}
	}
	
}