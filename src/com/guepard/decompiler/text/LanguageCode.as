package com.guepard.decompiler.text
{
	/**
	 * ...
	 * @author  Antonov Sergey
	 */
	public class LanguageCode
	{
		public static const NONE:uint = 0;
		public static const LATIN:uint = 1;
		public static const JAPANESE:uint = 2;
		public static const KOREAN:uint = 3;
		public static const SIMPLIFIED_CHINESE:uint = 4;
		public static const TRADITIONAL_CHINESE:uint = 5;
		
		public static function getName(code:uint):String
		{
			switch (code)
			{
				case NONE:
					return "none";
				case LATIN:
					return "latin";
				case JAPANESE:
					return "japanese";
				case KOREAN:
					return "korean";
				case SIMPLIFIED_CHINESE:
					return "simplified_chinese";
				case TRADITIONAL_CHINESE:
					return "traditional_chinese";
				default:
					return "unknown";
			}
		}
	}
	
}