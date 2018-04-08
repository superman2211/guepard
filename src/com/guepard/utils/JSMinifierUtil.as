package com.guepard.utils
{
	public class JSMinifierUtil
	{
		public static const MINIMAL:uint = 1;
		public static const NORMAL:uint = 2;
		public static const AGRESSIVE:uint = 3;
		
		public static const unterminatedComment:String = "Unterminated Comment";
		public static const unterminatedRegularExpression:String = "Unterminated regular expression literal.";
		public static const unterminatedStringLiteral:String = "Unterminated string literal : ";
		
		public const whiteSpaceChars:Array =
			[
				"\u0009" /*Horizontal tab*/,
				"\u000A" /*Line feed or New line*/,
				"\u000B" /*Vertical tab*/,
				"\u000C" /*Formfeed*/,
				"\u000D" /*Carriage return*/,
				"\u0020" /*Space*/,
				"\u00A0" /*Non-breaking space*/,
				"\u1680" /*Ogham space mark*/,
				"\u180E" /*Mongolian vowel separator*/,
				"\u2000" /*En quad*/,
				"\u2001" /*Em quad*/,
				"\u2002" /*En space*/,
				"\u2003" /*Em space*/,
				"\u2004" /*Three-per-em space*/,
				"\u2005" /*Four-per-em space*/,
				"\u2006" /*Six-per-em space*/,
				"\u2007" /*Figure space*/,
				"\u2008" /*Punctuation space*/,
				"\u2009" /*Thin space*/,
				"\u200A" /*Hair space*/,
				"\u200B" /*Zero width space*/,
				"\u2028" /*Line separator*/,
				"\u2029" /*Paragraph separator*/,
				"\u202F" /*Narrow no-break space*/,
				"\u205F" /*Medium mathematical space*/,
				"\u3000" /*Ideographic space*/
			];
		
		public const trim:Function = function (source:String, chars:Array = null):String {
			if (chars == null)
			{
				chars = whiteSpaceChars;
			}
			if (source == null || source == "")
			{
				return "";
			}
			
			var i:int, l:int;
			
			l = source.length;
			for (i = 0; (i < l) && (chars.indexOf(source.charAt(i)) > -1); i++)
			{
			}
			source = source.substring(i);
			
			l = source.length;
			for (i = source.length - 1; (i >= 0) && (chars.indexOf(source.charAt(i)) > -1); i--)
			{
			}
			source = source.substring(0, i + 1);
			
			return source;
		};
		
		private static const EOF:String = "\uFFFC";
		private static const LETTERS:String = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		private static const DIGITS:String = '0123456789';
		private static const ALNUM:String = LETTERS + DIGITS + '_$\\';
		private var a:String;
		private var b:String;
		private var theLookahead:String;
		private var i:int;
		private var l:int;
		
		private var _input:String;
		
		public function get input():String
		{
			return _input;
		}
		
		public function set input(str:String):void
		{
			_input = str || "";
			_newSize = _input.length;
			_oldSize = _newSize;
			_output = _input;
		}
		
		private var _output:String;
		
		public function get output():String
		{
			return _output || "";
		}
		
		private var _oldSize:uint;
		
		public function get oldSize():uint
		{
			return _oldSize;
		}
		
		private var _newSize:uint;
		
		public function get newSize():uint
		{
			return _newSize;
		}
		
		private var _level:uint;
		
		public function get level():uint
		{
			return _level;
		}
		
		public function set level(value:uint):void
		{
			_level = Math.max(Math.min(value, 3), 1);
		}
		
		public function JSMinifierUtil(input:String)
		{
			this.input = input;
			this.level = JSMinifierUtil.MINIMAL;
		}
		
		public function run(...arguments:Array):void
		{
			if (arguments.length > 0)
			{
				if (arguments[0] != null && arguments[0] is String)
				{
					input = arguments[0] as String;
				}
				if (arguments[1] != null && arguments[1] is Number)
				{
					this.level = uint(arguments[1]);
				}
			}
			a = "";
			b = "";
			theLookahead = EOF;
			i = 0;
			_input = trim(_input);
			l = _input.length;
			_oldSize = l;
			_output = modify();
			_newSize = _output.length;
		}
		
		protected function action(d:uint):String
		{
			var r:Array = [];
			if (d == 1)
			{
				r.push(a);
			}
			if (d < 3)
			{
				a = b;
				if (a == '\'' || a == '"')
				{
					for (; ;)
					{
						r.push(a);
						a = get();
						if (a == b)
						{
							break;
						}
						if (a <= '\n')
						{
							throw new SyntaxError(unterminatedStringLiteral + a);
						}
						if (a == '\\')
						{
							r.push(a);
							a = get();
						}
					}
				}
			}
			
			b = next();
			
			if (b == '/' && '(,=:[!&|'.indexOf(a) > -1)
			{
				r.push(a);
				r.push(b);
				for (; ;)
				{
					a = get();
					
					if (a == '/')
					{
						break;
					}
					else if (a == '\\')
					{
						r.push(a);
						a = get();
					}
					else if (a <= '\n')
					{
						throw new SyntaxError(unterminatedRegularExpression);
					}
					r.push(a);
				}
				b = next();
			}
			return r.join("");
		}
		
		private function get():String
		{
			var c:String = theLookahead;
			if (i == l)
			{
				return EOF;
			}
			theLookahead = EOF;
			if (c == EOF)
			{
				c = _input.charAt(i);
				++i;
			}
			if (c >= ' ')
			{
				return c;
			}
			if (isLineTerminator(c))
			{
				return '\n';
			}
			return ' ';
		}
		
		private function isAlpha(c:String):Boolean
		{
			return c != EOF && (ALNUM.indexOf(c) > -1 || c.charCodeAt(0) > 126);
		}
		
		private function isLineTerminator(c:String):Boolean
		{
			switch (c)
			{
				case "\u000A":
				case "\u000D":
				case "\u2028":
				case "\u2029":
				{
					return true;
				}
				default:
				{
					return false;
				}
			}
		}
		
		private function modify():String
		{
			var r:Array = [];
			r.push(action(3));
			while (a != EOF)
			{
				switch (a)
				{
					case ' ':
					{
						if (isAlpha(b))
						{
							r.push(action(1));
						}
						else
						{
							r.push(action(2));
						}
						break;
					}
					case '\n' :
					{
						switch (b)
						{
							case '{':
							case '[':
							case '(':
							case '+':
							case '-':
							{
								r.push(action(1));
								break;
							}
							case ' ':
							{
								r.push(action(3));
								break;
							}
							default:
							{
								if (isAlpha(b))
								{
									r.push(action(1));
								}
								else
								{
									if (_level == 1 && b != '\n')
									{
										r.push(action(1));
									}
									else
									{
										r.push(action(2));
									}
								}
							}
						}
						break;
					}
					default :
					{
						switch (b)
						{
							case ' ':
							{
								if (isAlpha(a))
								{
									r.push(action(1));
									break;
								}
								r.push(action(3));
								break;
							}
							
							case '\n' :
							{
								if (_level == 1 && a != '\n')
								{
									r.push(action(1));
								}
								else
								{
									switch (a)
									{
										case '}':
										case ']':
										case ')':
										case '+':
										case '-':
										case '"':
										case '\'':
										{
											if (_level == 3)
											{
												r.push(action(3));
											}
											else
											{
												r.push(action(1));
											}
											break;
										}
										default:
										{
											if (isAlpha(a))
											{
												r.push(action(1));
											}
											else
											{
												r.push(action(3));
											}
										}
									}
								}
								break;
							}
							default :
							{
								r.push(action(1));
								break;
							}
						}
					}
				}
			}
			return r.join("");
		}
		
		private function next():String
		{
			var c:* = get();
			if (c == '/')
			{
				switch (peek())
				{
					case '/' :
					{
						for (; ;)
						{
							c = get();
							if (c <= '\n')
							{
								return c;
							}
						}
						break;
					}
					case '*':
					{
						get();
						if (peek() == '!')
						{
							var d:String = '/*!';
							for (; ;)
							{
								c = get();
								switch (c)
								{
									case '*':
									{
										if (peek() == '/')
										{
											get();
											return d + '*/';
										}
										break;
									}
									case EOF:
									{
										throw new SyntaxError(unterminatedComment);
									}
									default:
									{
										d += c;
									}
								}
							}
						}
						else
						{
							for (; ;)
							{
								switch (get())
								{
									case '*' :
									{
										if (peek() == '/')
										{
											get();
											return ' ';
										}
										break;
									}
									case EOF :
									{
										throw new SyntaxError(unterminatedComment);
									}
								}
							}
						}
						break;
					}
					default:
					{
						return c;
					}
				}
			}
			return c;
		}
		
		private function peek():String
		{
			theLookahead = get();
			return theLookahead;
		}
	}
}
