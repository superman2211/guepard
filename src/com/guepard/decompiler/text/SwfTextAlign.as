package com.guepard.decompiler.text
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SwfTextAlign
	{
		public static const LEFT:uint = 0;
		public static const RIGHT:uint = 1;
		public static const CENTER:uint = 2;
		public static const JUSTIFY:uint = 3;
		
		public static function getName(align:uint):String
		{
			switch (align)
			{
				case LEFT:
					return "LEFT";
				case RIGHT:
					return "RIGHT";
				case CENTER:
					return "CENTER";
				case JUSTIFY:
					return "JUSTIFY";
			}
			
			return "Undefined Text Align: " + align;
		}
	}
}