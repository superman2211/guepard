package com.guepard.parser.token
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Tokenizer
	{
		public static function parse(data:String):Token
		{
			var stream:Token = new Token("class");
			
			stream.writeToken(new Token(TokenType.UNKNOWN, data));
			
			stream.split("//", TokenType.OPERATOR);
			stream.split("/*", TokenType.OPERATOR);
			stream.split("*/", TokenType.OPERATOR);
			
			stream.split("\r", TokenType.ENTER);
			stream.split("\n", TokenType.ENTER);
			
			stream.split("\\\\", TokenType.OPERATOR);
			stream.split("\\\"", TokenType.OPERATOR);
			stream.split("\"", TokenType.OPERATOR);
			stream.split("'", TokenType.OPERATOR);
			
			stream.split(".<", TokenType.OPERATOR);
			stream.split("++", TokenType.OPERATOR);
			stream.split("--", TokenType.OPERATOR);
			stream.split("+=", TokenType.OPERATOR);
			stream.split("-=", TokenType.OPERATOR);
			stream.split("&&=", TokenType.OPERATOR);
			stream.split("||=", TokenType.OPERATOR);
			stream.split("&&", TokenType.OPERATOR);
			stream.split("||", TokenType.OPERATOR);
			//stream.split(">>>", TokenType.OPERATOR);
			//stream.split(">>", TokenType.OPERATOR);
			stream.split("<<<", TokenType.OPERATOR);
			stream.split(">>=", TokenType.OPERATOR);
			stream.split("<<=", TokenType.OPERATOR);
			stream.split("<<", TokenType.OPERATOR);
			stream.split(">=", TokenType.OPERATOR);
			stream.split("<=", TokenType.OPERATOR);
			stream.split("*=", TokenType.OPERATOR);
			stream.split("/=", TokenType.OPERATOR);
			stream.split("%=", TokenType.OPERATOR);
			stream.split("&=", TokenType.OPERATOR);
			stream.split("|=", TokenType.OPERATOR);
			stream.split("!==", TokenType.OPERATOR);
			stream.split("!=", TokenType.OPERATOR);
			stream.split("===", TokenType.OPERATOR);
			stream.split("==", TokenType.OPERATOR);
			stream.split("...", TokenType.OPERATOR);
			stream.split("::", TokenType.OPERATOR);
			stream.split(":", TokenType.OPERATOR);
			stream.split(";", TokenType.OPERATOR);
			stream.split(",", TokenType.OPERATOR);
			stream.split("+", TokenType.OPERATOR);
			stream.split("-", TokenType.OPERATOR);
			stream.split("*", TokenType.OPERATOR);
			stream.split("/", TokenType.OPERATOR);
			stream.split("%", TokenType.OPERATOR);
			stream.split("&", TokenType.OPERATOR);
			stream.split("|", TokenType.OPERATOR);
			stream.split(">", TokenType.OPERATOR);
			stream.split("<", TokenType.OPERATOR);
			stream.split("!", TokenType.OPERATOR);
			stream.split("?", TokenType.OPERATOR);
			stream.split("~", TokenType.OPERATOR);
			stream.split("^", TokenType.OPERATOR);
			stream.split("\\", TokenType.OPERATOR);
			stream.split("..", TokenType.OPERATOR);
			stream.split(".", TokenType.OPERATOR);
			stream.split("=", TokenType.OPERATOR);
			stream.split("@", TokenType.OPERATOR);
			
			stream.split("\t", TokenType.SPACE);
			stream.split(" ", TokenType.SPACE);
			
			stream.split("{", TokenType.BLOCK);
			stream.split("}", TokenType.BLOCK);
			stream.split("[", TokenType.BLOCK);
			stream.split("]", TokenType.BLOCK);
			stream.split("(", TokenType.BLOCK);
			stream.split(")", TokenType.BLOCK);
			
			stream.mark("package", TokenType.KEYWORD);
			stream.mark("dynamic", TokenType.KEYWORD);
			stream.mark("class", TokenType.KEYWORD);
			stream.mark("interface", TokenType.KEYWORD);
			stream.mark("import", TokenType.KEYWORD);
			stream.mark("public", TokenType.KEYWORD);
			stream.mark("private", TokenType.KEYWORD);
			stream.mark("internal", TokenType.KEYWORD);
			stream.mark("protected", TokenType.KEYWORD);
			stream.mark("extends", TokenType.KEYWORD);
			stream.mark("implements", TokenType.KEYWORD);
			stream.mark("override", TokenType.KEYWORD);
			stream.mark("static", TokenType.KEYWORD);
			stream.mark("final", TokenType.KEYWORD);
			stream.mark("var", TokenType.KEYWORD);
			stream.mark("const", TokenType.KEYWORD);
			stream.mark("function", TokenType.KEYWORD);
			stream.mark("get", TokenType.KEYWORD);
			stream.mark("set", TokenType.KEYWORD);
			stream.mark("return", TokenType.KEYWORD);
			stream.mark("if", TokenType.KEYWORD);
			stream.mark("else", TokenType.KEYWORD);
			stream.mark("switch", TokenType.KEYWORD);
			stream.mark("break", TokenType.KEYWORD);
			stream.mark("continue", TokenType.KEYWORD);
			stream.mark("default", TokenType.KEYWORD);
			stream.mark("delete", TokenType.KEYWORD);
			stream.mark("case", TokenType.KEYWORD);
			stream.mark("for", TokenType.KEYWORD);
			stream.mark("each", TokenType.KEYWORD);
			stream.mark("while", TokenType.KEYWORD);
			stream.mark("do", TokenType.KEYWORD);
			stream.mark("new", TokenType.KEYWORD);
			stream.mark("try", TokenType.KEYWORD);
			stream.mark("catch", TokenType.KEYWORD);
			stream.mark("finally", TokenType.KEYWORD);
			stream.mark("throw", TokenType.KEYWORD);
			stream.mark("with", TokenType.KEYWORD);
			stream.mark("typeof", TokenType.KEYWORD);
			
			//stream.mark("Vector", TokenType.KEYWORD);
			
			stream.mark("in", TokenType.OPERATOR);
			stream.mark("is", TokenType.OPERATOR);
			stream.mark("as", TokenType.OPERATOR);
			
			stream.mark("true", TokenType.BOOLEAN);
			stream.mark("false", TokenType.BOOLEAN);
			
			stream.mark("null", TokenType.LITERAL);
			stream.mark("undefined", TokenType.LITERAL);
			
			return stream;
		}
		
		public static function tokenize(data:String):Token
		{
			var stream:Token = parse(data);
			
			mergeRegularExpressions(stream);
			
			mergeStringsAndComments(stream);
			
			mergeNumbers(stream);
			
			mergeNativeXML(stream);
			
			mergeBlocks(stream);
			
			insertSplitter(stream);
			
			removeSpace(stream);
			
			return stream;
		}
		
		static public function removeSpace(stream:Token):void
		{
			stream.removeTokensByType(TokenType.SPACE, TokenType.ENTER, TokenType.COMMENT);
		}
		
		static public function insertSplitter(stream:Token):void
		{
			stream.insertSplitter(
				new Token(TokenType.OPERATOR, ";"),
				TokenType.ENTER,
				[
					[TokenType.UNKNOWN, TokenType.UNKNOWN],
					[TokenType.STRING, TokenType.UNKNOWN],
					[TokenType.NUMBER, TokenType.UNKNOWN],
					[TokenType.BOOLEAN, TokenType.UNKNOWN],
					
					[TokenType.UNKNOWN, TokenType.KEYWORD],
					[TokenType.STRING, TokenType.KEYWORD],
					[TokenType.NUMBER, TokenType.KEYWORD],
					[TokenType.BOOLEAN, TokenType.KEYWORD],
					
					[
						[TokenType.UNKNOWN, TokenType.BLOCK, TokenType.NUMBER, TokenType.STRING, TokenType.BOOLEAN, TokenType.OPERATOR, TokenType.KEYWORD],
						new Token(TokenType.OPERATOR, "++")
					],
					
					[
						[TokenType.UNKNOWN, TokenType.BLOCK, TokenType.NUMBER, TokenType.STRING, TokenType.BOOLEAN, TokenType.OPERATOR, TokenType.KEYWORD],
						new Token(TokenType.OPERATOR, "--")
					],
					
					[
						new Token(TokenType.OPERATOR, "++"),
						[TokenType.UNKNOWN, TokenType.BLOCK, TokenType.NUMBER, TokenType.STRING, TokenType.BOOLEAN, TokenType.KEYWORD]
					],
					
					[
						new Token(TokenType.OPERATOR, "--"),
						[TokenType.UNKNOWN, TokenType.BLOCK, TokenType.NUMBER, TokenType.STRING, TokenType.BOOLEAN, TokenType.KEYWORD]
					],
					
					[new Token(TokenType.BLOCK, "("), TokenType.UNKNOWN, TokenType.KEYWORD],
					[new Token(TokenType.BLOCK, "("), TokenType.KEYWORD, TokenType.KEYWORD],
					
					[new Token(TokenType.BLOCK, "["), TokenType.UNKNOWN],
					[new Token(TokenType.BLOCK, "["), TokenType.KEYWORD]
				],
				[TokenType.SPACE, TokenType.ENTER, TokenType.COMMENT]
			);
		}
		
		static public function mergeBlocks(stream:Token):void
		{
			stream.mergeRecursive(
				new MergeData(
					[new Token(TokenType.BLOCK, "[")],
					[new Token(TokenType.BLOCK, "]")],
					TokenType.BLOCK,
					"[",
					false,
					[]
				),
				
				new MergeData(
					[new Token(TokenType.BLOCK, "(")],
					[new Token(TokenType.BLOCK, ")")],
					TokenType.BLOCK,
					"(",
					false,
					[]
				),
				
				new MergeData(
					[new Token(TokenType.BLOCK, "{")],
					[new Token(TokenType.BLOCK, "}")],
					TokenType.BLOCK,
					"{",
					false,
					[]
				),
				
				new MergeData(
					[new Token(TokenType.OPERATOR, ".<")],
					[new Token(TokenType.OPERATOR, ">")],
					TokenType.BLOCK,
					".<",
					false,
					[]
				)
			);
			
			stream.mergeSequence(
				[
					new Token(TokenType.OPERATOR, ">"),
					new Token(TokenType.OPERATOR, ">")
				],
				TokenType.OPERATOR
			);
			
			stream.mergeSequence(
				[
					new Token(TokenType.OPERATOR, ">>"),
					new Token(TokenType.OPERATOR, ">")
				],
				TokenType.OPERATOR
			);
		}
		
		static public function mergeNumbers(stream:Token):void
		{
			stream.markBeginWith(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], TokenType.NUMBER);
			
			stream.gotoBegin();
			
			while (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				if (token.type == TokenType.NUMBER && !token.startWith("0x") &&
					(token.endWith("E") || token.endWith("e")))
				{
					var end:Token = new Token(TokenType.UNKNOWN, token.data.substring(token.data.length - 1));
					
					stream.insertToken(end);
					
					token.data = token.data.substring(0, token.data.length - 1);
				}
			}
			
			stream.mergeSequence(
				[
					new Token(TokenType.NUMBER, null),
					new Token(TokenType.OPERATOR, "."),
					new Token(TokenType.NUMBER, null)
				],
				TokenType.NUMBER
			);
			
			stream.mergeSequence(
				[
					new Token(TokenType.OPERATOR, "."),
					new Token(TokenType.NUMBER, null)
				],
				TokenType.NUMBER
			);
			
			stream.mergeSequence(
				[
					new Token(TokenType.NUMBER, null),
					new Token(TokenType.UNKNOWN, "E"),
					new Token(TokenType.OPERATOR, "+"),
					new Token(TokenType.NUMBER, null)
				],
				TokenType.NUMBER
			);
			
			stream.mergeSequence(
				[
					new Token(TokenType.NUMBER, null),
					new Token(TokenType.UNKNOWN, "E"),
					new Token(TokenType.OPERATOR, "-"),
					new Token(TokenType.NUMBER, null)
				],
				TokenType.NUMBER
			);
			
			stream.mergeSequence(
				[
					new Token(TokenType.NUMBER, null),
					new Token(TokenType.UNKNOWN, "e"),
					new Token(TokenType.OPERATOR, "+"),
					new Token(TokenType.NUMBER, null)
				],
				TokenType.NUMBER
			);
			
			stream.mergeSequence(
				[
					new Token(TokenType.NUMBER, null),
					new Token(TokenType.UNKNOWN, "e"),
					new Token(TokenType.OPERATOR, "-"),
					new Token(TokenType.NUMBER, null)
				],
				TokenType.NUMBER
			);
		}
		
		static public function mergeRegularExpressions(stream:Token):void
		{
			stream.position = 0;
			
			var token:Token;
			var part:Token;
			var previous:Token;
			
			while (stream.tokensAvailable)
			{
				token = stream.readToken();
				
				if (token.type == TokenType.OPERATOR && token.data == "/")
				{
					if (!previous || (previous.type == TokenType.OPERATOR && previous.data == "="))
					{
						token.type = TokenType.REGULAR_EXPRESSION;
						
						var begin:int = stream.position;
						
						previous = null;
						
						while (stream.tokensAvailable)
						{
							part = stream.readToken();
							
							token.data += part.data;
							
							if (part.type == TokenType.OPERATOR)
							{
								if (part.data == "//")
								{
									break;
								}
								else if (part.data == "/" && (!previous || previous.data != "\\"))
								{
									break;
								}
							}
							
							if (token.type != TokenType.SPACE && token.type != TokenType.ENTER)
							{
								previous = part;
							}
						}
						
						while (stream.tokensAvailable)
						{
							part = stream.readToken();
							
							if (part.type != TokenType.UNKNOWN)
							{
								stream.stepPrevious();
								break;
							}
							else
							{
								token.data += part.data;
							}
						}
						
						stream.removeTokens(begin, stream.position);
						stream.position = begin;
						
						previous = null;
					}
				}
				
				if (token.type != TokenType.SPACE && token.type != TokenType.ENTER)
				{
					previous = token;
				}
			}
		}
		
		static public function mergeStringsAndComments(stream:Token):void
		{
			stream.merge(
				new MergeData(
					[new Token(TokenType.OPERATOR, "/*")],
					[new Token(TokenType.OPERATOR, "*/")],
					TokenType.COMMENT,
					"/*",
					true,
					[]
				),
				
				new MergeData(
					[new Token(TokenType.OPERATOR, "//")],
					[new Token(TokenType.ENTER, "\r"), new Token(TokenType.ENTER, "\n")],
					TokenType.COMMENT,
					"//",
					true,
					[]
				),
				
				new MergeData(
					[new Token(TokenType.OPERATOR, "\"")],
					[new Token(TokenType.OPERATOR, "\"")],
					TokenType.STRING,
					"\"",
					true,
					['\\"', "\\'"]
				),
				
				new MergeData(
					[new Token(TokenType.OPERATOR, "'")],
					[new Token(TokenType.OPERATOR, "'")],
					TokenType.STRING,
					"'",
					true,
					['\\"', "\\'"]
				)
			);
		}
		
		static private function mergeNativeXML(stream:Token):void
		{
			stream.position = 0;
			
			var xml:Token;
			var token:Token;
			var previous:Token;
			
			while (stream.tokensAvailable)
			{
				xml = stream.readToken();
				
				if (xml.type == TokenType.OPERATOR && xml.data == "<")
				{
					var isXML:Boolean = false;
					
					if (!previous)
					{
						isXML = true;
					}
					else if (previous.type == TokenType.OPERATOR)
					{
						switch (previous.data)
						{
							case "=":
							case ",":
							case ";":
								isXML = true;
								break;
						}
					}
					
					if (isXML)
					{
						xml.type = TokenType.NATIVE_XML;
						
						var begin:int = stream.position;
						
						previous = null;
						
						var tagType:String = "begin";
						var depth:int = 0;
						
						while (stream.tokensAvailable)
						{
							token = stream.readToken();
							
							if (token.type == TokenType.ENTER)
							{
								
							}
							else
							{
								xml.data += token.data;
							}
							
							if (token.type == TokenType.OPERATOR)
							{
								var position:int = stream.position;
								
								var exit:Boolean = false;
								
								if (token.data == "<" || token.data == ".<")
								{
									previous = stream.readToken();
									
									if (previous && previous.type == TokenType.OPERATOR && previous.data == "/")
									{
										tagType = "end";
									}
									else if (previous && previous.type == TokenType.OPERATOR && previous.data == "!")
									{
										xml.data += previous.data;
										
										previous = null;
										
										while (stream.tokensAvailable)
										{
											token = stream.readToken();
											
											xml.data += token.data;
											
											if (previous && previous.data + token.data == "-->")
											{
												break;
											}
											
											previous = token;
										}
										
										position = stream.position;
										
										if (depth == 0)
										{
											exit = true;
										}
									}
									else
									{
										tagType = "begin";
									}
								}
								else if (token.data == ">")
								{
									stream.stepPrevious();
									previous = stream.readToken(true);
									
									if (previous && previous.type == TokenType.OPERATOR && previous.data == "/")
									{
										tagType = "tag";
									}
									
									if (tagType == "begin")
									{
										depth++;
									}
									else if (tagType == "end")
									{
										depth--;
									}
									
									if (depth == 0)
									{
										exit = true;
									}
								}
								
								stream.position = position;
								
								if (exit) break;
							}
						}
						
						stream.removeTokens(begin, stream.position);
						stream.position = begin;
						
						previous = null;
					}
				}
				
				if (xml.type != TokenType.SPACE && xml.type != TokenType.ENTER)
				{
					previous = xml;
				}
			}
		}
	}
}