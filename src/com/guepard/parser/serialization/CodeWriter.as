package com.guepard.parser.serialization
{
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.token.Token;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class CodeWriter
	{
		public static const ENTER:String = "\r\n";
		public static const TAB:String = "\t";
		public static const SEMICOLON:String = ";";
		static public const COMMA:String = ",";
		public static const THIS:String = "this";
		
		static public function writeSplitter(stream:Token, splitter:String = SEMICOLON):void
		{
			if (stream.length && stream.lastToken.data != splitter)
			{
				stream.writeSymbol(splitter);
			}
		}
		
		static public function removeSplitter(stream:Token, splitter:String = SEMICOLON):void
		{
			if (stream.length && stream.lastToken.data == splitter)
			{
				stream.length--;
			}
		}
		
		static public function writeStrings(strings:Vector.<String>, tab:String):String
		{
			var data:String = "";
			
			while (strings.length)
			{
				var token:String = strings.shift();
				
				switch (token)
				{
					case "}":
						return data;
					
					case "{":
						if (data.substring(data.length - 7) != "return ")
						{
							data += ENTER + tab;
						}
						
						data += token;
						data += ENTER + tab + TAB;
						
						data += writeStrings(strings, tab + TAB);
						
						data += ENTER + tab;
						
						data += "}";
						
						if (strings.length && strings[0] == ";")
						{
							data += strings.shift();
						}
						
						data += ENTER + tab;
						break;
					
					case "var":
					case "const":
					case "function":
					case "return":
					case "delete":
					case "if":
					case "else":
					case "switch":
					case "for":
					case "do":
					case "while":
					case "new":
					case "try":
					case "catch":
					case "finally":
					case "throw":
					case "default":
					case "case":
					case "typeof":
						data += token + " ";
						break;
					
					case "get":
					case "set":
					case "package":
					case "dynamic":
					case "class":
					case "interface":
					case "import":
					case "public":
					case "private":
					case "internal":
					case "protected":
					case "override":
					case "static":
						data += token + " ";
						break;
					
					case "extends":
					case "implements":
					case "instanceof":
						data += " " + token + " ";
						break;
					
					case "in":
					case "++":
					case "--":
					case "+=":
					case "-=":
					case "&&=":
					case "||=":
					case "&&":
					case "||":
					case ">>>":
					case ">>":
					case "<<<":
					case "<<":
					case ">>=":
					case "<<=":
					case ">=":
					case "<=":
					case "*=":
					case "/=":
					case "%=":
					case "&=":
					case "|=":
					case "===":
					case "==":
					case "!==":
					case "!=":
					case "...":
					case ":":
					case "+":
					case "-":
					case "*":
					case "/":
					case "%":
					case "&":
					case "|":
					case ">":
					case "<":
					case "?":
					case "~":
					case "^":
					case "\\":
					case "=":
						data += " " + token + " ";
						break;
					
					case ";":
						data += token + ENTER + tab;
						break;
					
					case ENTER:
						data += token + tab;
						break;
					
					case ",":
						data += token + " ";
						break;
					
					default:
						data += token;
						break;
				}
			}
			
			return data;
		}
		
		protected var _info:ClassInfo;
		
		public function get info():ClassInfo
		{
			return _info;
		}
		
		protected var _output:String;
		
		public function get output():String
		{
			return _output;
		}
		
		public function CodeWriter(info:ClassInfo)
		{
			_info = info;
		}
		
		public function dispose():void
		{
			_info = null;
			_output = null;
		}
		
		public function write():void
		{
			_output = "";
		}
		
	}
	
}