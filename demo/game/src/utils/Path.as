package utils
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Path
	{
		public static const DIRECTORY_SEPARATOR:String = "/";
		public static const FOLDER_SEPARATOR:String = "\\";
		public static const EXTENSION_SEPARATOR:String = ".";
		
		public static function isDirectory(path:String):Boolean
		{
			return path.search("http") != -1 || path.search("www") != -1 || path.search(DIRECTORY_SEPARATOR) != -1;
		}
		
		public static function getParts(path:String):Array
		{
			var parts:Array = path.split(DIRECTORY_SEPARATOR);
			
			if (parts.length == 1)
			{
				return path.split(FOLDER_SEPARATOR);
			}
			else
			{
				return parts;
			}
		}
		
		public static function fromParts(parts:Array):String
		{
			return parts.join(DIRECTORY_SEPARATOR);
		}
		
		public static function getExtension(path:String):String
		{
			var fileName:String = getFileName(path);
			
			var array:Array = fileName.split(EXTENSION_SEPARATOR);
			
			if (array.length == 2) 
			{
				return String(array[1]);
			}
			else
			{
				return "";
			}
		}
		
		public static function changeExtension(path:String, extension:String):String
		{
			return getDirectory(path) + DIRECTORY_SEPARATOR + getFileNameWithoutExtension(path) + EXTENSION_SEPARATOR + extension;
		}
		
		public static function getDirectory(path:String):String
		{
			var parts:Array = getParts(path);
			
			parts.pop();
			
			return fromParts(parts);
		}
		
		public static function getFileName(path:String):String
		{
			return String(getParts(path).pop());
		}
		
		public static function getFileNameWithoutExtension(path:String):String
		{
			return String(getFileName(path).split(EXTENSION_SEPARATOR)[0]);
		}
	}

}