package com.guepard.parser.token
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TokenType
	{
		public static const SPACE:String = "space";
		public static const ENTER:String = "enter";
		public static const COMMENT:String = "comment";
		
		public static const NUMBER:String = "number";
		public static const BOOLEAN:String = "boolean";
		public static const STRING:String = "string";
		static public const LITERAL:String = "literal";
		
		public static const UNKNOWN:String = "unknown";
		public static const KEYWORD:String = "keyword";
		public static const OPERATOR:String = "operator";
		
		public static const BLOCK:String = "block";
		
		public static const REGULAR_EXPRESSION:String = "regularExpression";
		public static const NATIVE_XML:String = "nativeXML";
		
		static public function getPairedSymbol(data:String):String
		{
			switch (data)
			{
				case "{":
					return "}";
				case "}":
					return "{";
				
				case "(":
					return ")";
				case ")":
					return "(";
				
				case "[":
					return "]";
				case "]":
					return "[";
			}
			
			return null;
		}
	}
}