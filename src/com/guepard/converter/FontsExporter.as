package com.guepard.converter
{
	
	public class FontsExporter
	{
		private static var _fonts:Array;
		
		public static function get fonts():Array
		{
			return _fonts;
		}
		
		public static function init():void
		{
			_fonts = [];
		}
	}
}
