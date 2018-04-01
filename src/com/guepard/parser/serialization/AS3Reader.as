package com.guepard.parser.serialization
{
	import com.guepard.parser.info.AccessType;
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.info.EmbedInfo;
	import com.guepard.parser.info.ExpressionInfo;
	import com.guepard.parser.info.ExpressionType;
	import com.guepard.parser.info.MemberInfo;
	import com.guepard.parser.info.MethodInfo;
	import com.guepard.parser.info.MethodType;
	import com.guepard.parser.info.NamespaceInfo;
	import com.guepard.parser.info.TagInfo;
	import com.guepard.parser.info.VariableInfo;
	import com.guepard.parser.info.VariableType;
	import com.guepard.parser.token.Token;
	import com.guepard.parser.token.TokenType;
	import com.guepard.parser.token.Tokenizer;
	
	import flash.filesystem.File;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class AS3Reader extends CodeReader
	{
		public function AS3Reader(source:String)
		{
			super(source);
		}
		
		override public function read():void
		{
			super.read();
			
			if (!stream.length) return;
			
			var packageInfo:NamespaceInfo = readPackage(_stream);
			
			_classes = readClasses(readNextScope(_stream), packageInfo);
			
			if (_classes && _classes.length)
			{
				_classes[0].classesInfo = readClasses(_stream, packageInfo);
			}
			else
			{
				errorMessage("Classes not found in source", null, false);
			}
		}
		
		public function readScript(source:String, name:String, info:ClassInfo):void
		{
			var stream:Token = Tokenizer.tokenize(source);
			
			stream.position = 0;
			
			var importsInfo:Vector.<NamespaceInfo> = readImports(stream);
			info.importsInfo = info.importsInfo.concat(importsInfo);
			
			stream.position = 0;
			
			var variablesInfo:Vector.<VariableInfo> = readProperties(stream, info);
			info.variablesInfo = info.variablesInfo.concat(variablesInfo);
			
			stream.position = 0;
			
			var methodsInfo:Vector.<MethodInfo> = readMethods(stream, info, AccessType.PUBLIC);
			info.methodsInfo = info.methodsInfo.concat(methodsInfo);
			
			stream.position = 0;
			
			var frameMethod:MethodInfo = new MethodInfo();
			frameMethod.name = name;
			
			frameMethod.body = readBody(stream, frameMethod);
			
			removeAnonymouseFunctions(frameMethod.body);
			
			frameMethod.locals.length = 0;
			frameMethod.type = new NamespaceInfo("void");
			
			info.methodsInfo.push(frameMethod);
		}
		
		private function removeAnonymouseFunctions(body:Vector.<ExpressionInfo>):void
		{
			if (body)
			{
				for (var i:int = 0; i < body.length; i++)
				{
					var expression:ExpressionInfo = body[i];
					
					if (expression && expression.type == ExpressionType.CONSTRUCTION && expression.tokenData == "function")
					{
						body.splice(i, 1);
						i--;
					}
					
				}
			}
		}
		
		private function readPackage(stream:Token):NamespaceInfo
		{
			stream.gotoBegin();
			
			var position:int = stream.position;
			
			var keyword:Token = stream.readToken();
			
			var packageInfo:NamespaceInfo;
			
			if (keyword && keyword.data == "package")
			{
				var next:Token = stream.readToken();
				
				if (next && next.type == TokenType.UNKNOWN)
				{
					stream.stepPrevious();
					
					packageInfo = readNamespace(_stream);
				}
				else
				{
					stream.stepPrevious();
				}
			}
			else
			{
				errorMessage("Not found package in source", null, true);
			}
			
			return packageInfo;
		}
		
		private function readNamespace(stream:Token):NamespaceInfo
		{
			var info:NamespaceInfo = new NamespaceInfo();
			
			info.data = "";
			
			while (stream.tokensAvailable)
			{
				var name:Token = stream.readToken();
				
				if (name.data == "Vector")
				{
					var block:Token = stream.readToken();
					
					if (block && block.data == ".<")
					{
						info.data = "Vector";
						info.child = readNamespace(block);
					}
					else if (block && block.data == ";")
					{
						stream.stepPrevious();
					}
					else
					{
						errorMessage("Read Vector error: " + block, null, true);
					}
					
					break;
				}
				else if (name.data == "*")
				{
					info.data += name.data;
					
					break;
				}
				else if (name.data == "*=")
				{
					name.data = "*";
					
					info.data += name.data;
					
					stream.insertToken(new Token(TokenType.OPERATOR, "="));
					
					break;
				}
				else if (name.type == TokenType.UNKNOWN || name.type == TokenType.KEYWORD)
				{
					info.data += name.data;
					
					if (stream.tokensAvailable)
					{
						var dot:Token = stream.readToken();
						
						if (dot && dot.data == ".")
						{
							info.data += dot.data;
						}
						else
						{
							stream.stepPrevious();
							break;
						}
					}
					else
					{
						break;
					}
				}
				else
				{
					errorMessage("Read namespace error: " + name, null, true);
				}
			}
			
			return info;
		}
		
		private function readNextScope(stream:Token):Token
		{
			return stream.readTokenByData("{");
		}
		
		private function readImports(stream:Token):Vector.<NamespaceInfo>
		{
			var imports:Vector.<NamespaceInfo> = new Vector.<NamespaceInfo>();
			
			var position:int = stream.position;
			
			while (stream.tokensAvailable)
			{
				var keyword:Token = stream.readTokenByData("import");
				
				if (keyword)
				{
					imports.push(readNamespace(stream));
				}
				else
				{
					break;
				}
			}
			
			stream.position = position;
			
			return imports;
		}
		
		private function readClasses(stream:Token, packageInfo:NamespaceInfo):Vector.<ClassInfo>
		{
			if (!stream) return null;
			
			stream.gotoBegin();
			
			var classes:Vector.<ClassInfo> = new Vector.<ClassInfo>();
			
			var importsInfo:Vector.<NamespaceInfo> = readImports(stream);
			
			while (stream.tokensAvailable)
			{
				var keyword:Token = stream.readTokenByData(ClassInfo.CLASS, ClassInfo.INTERFACE, ClassInfo.FUNCTION);
				
				if (keyword)
				{
					var name:Token = stream.readToken();
					
					if (name && name.type == TokenType.UNKNOWN)
					{
						var info:ClassInfo = new ClassInfo();
						info.name = name.data;
						info.type = keyword.data;
						info.importsInfo = importsInfo;
						info.packageInfo = packageInfo;
						
						if (keyword.data == ClassInfo.FUNCTION)
						{
							var method:MethodInfo = new MethodInfo();
							method.name = info.name;
							
							readFunction(stream, method, info);
							
							info.methodsInfo = new Vector.<MethodInfo>();
							info.methodsInfo.push(method);
						}
						else
						{
							info.extendsInfo = readExtends(stream);
							info.implementsInfo = readImplements(stream);
							
							var body:Token = readNextScope(stream);
							
							info.variablesInfo = readProperties(body, info);
							info.methodsInfo = readMethods(body, info, null);
						}
						
						classes.push(info);
						
						ClassInfo.addClass(info);
					}
					else
					{
						errorMessage("Read class name error: " + name, null, true);
					}
				}
			}
			
			return classes;
		}
		
		private function readExtends(stream:Token):NamespaceInfo
		{
			var keyword:Token = stream.readToken();
			
			var baseInfo:NamespaceInfo;
			
			if (keyword && keyword.data == "extends")
			{
				baseInfo = readNamespace(stream);
			}
			else
			{
				stream.stepPrevious();
			}
			
			return baseInfo;
		}
		
		private function readImplements(stream:Token):Vector.<NamespaceInfo>
		{
			var infos:Vector.<NamespaceInfo> = new Vector.<NamespaceInfo>();
			
			var keyword:Token = stream.readToken();
			
			if (keyword && keyword.data == "implements")
			{
				while (stream.tokensAvailable)
				{
					infos.push(readNamespace(stream));
					
					var comma:Token = stream.readToken();
					
					if (comma && comma.data == ",")
					{
						
					}
					else
					{
						stream.stepPrevious();
						break;
					}
				}
			}
			else
			{
				stream.stepPrevious();
			}
			
			return infos;
		}
		
		private function readProperties(stream:Token, info:ClassInfo):Vector.<VariableInfo>
		{
			var properties:Vector.<VariableInfo> = new Vector.<VariableInfo>();
			
			stream.gotoBegin();
			
			while (stream.tokensAvailable)
			{
				var keyword:Token = stream.readTokenByData("var", "const");
				
				if (keyword && keyword.type == TokenType.KEYWORD)
				{
					var variable:VariableInfo = new VariableInfo();
					properties.push(variable);
					
					variable.variableType = VariableType.VARIABLE;
					variable.constant = keyword.data == "const";
					
					var position:int = stream.position;
					
					stream.stepPrevious();
					
					readMember(stream, variable, info);
					
					stream.position = position;
					
					var name:Token = stream.readToken();
					
					if (name && name.type == TokenType.UNKNOWN)
					{
						variable.name = name.data;
						
						variable.type = readType(stream, null, info);
						
						variable.body = readVariableBody(stream, null);
						
						if (stream.tokensAvailable)
						{
							var comma:Token = stream.readToken();
							
							if (comma && comma.data == ",")
							{
								comma.type = TokenType.KEYWORD;
								comma.data = "var";
								
								stream.stepPrevious();
								
								stream.insertToken(new Token(TokenType.KEYWORD, variable.access));
							}
							else
							{
								stream.stepPrevious();
							}
						}
					}
					else
					{
						errorMessage("Not found name of property: " + name, null, true);
					}
				}
			}
			
			return properties;
		}
		
		private function readVariableBody(stream:Token, method:MethodInfo):Vector.<ExpressionInfo>
		{
			if (stream.tokensAvailable)
			{
				var equals:Token = stream.readToken();
				
				if (equals && equals.data == "=")
				{
					var body:Vector.<ExpressionInfo> = new Vector.<ExpressionInfo>();
					body.push(readExpression(stream, method));
					return body;
				}
				else
				{
					stream.stepPrevious();
				}
			}
			
			return null;
		}
		
		private function readExpression(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				switch (token.type)
				{
					case TokenType.LITERAL:
					case TokenType.NUMBER:
					case TokenType.STRING:
					case TokenType.BOOLEAN:
					case TokenType.REGULAR_EXPRESSION:
					case TokenType.NATIVE_XML:
						stream.stepPrevious();
						
						expression = readIdentifier(stream, method);
						break;
					
					case TokenType.UNKNOWN:
						if (token.data == "Vector")
						{
							expression = readVector(stream, method);
						}
						else
						{
							stream.stepPrevious();
							
							expression = readIdentifier(stream, method);
						}
						break;
					
					case TokenType.OPERATOR:
						switch (token.data)
						{
							case ";":
								break;
							
							case ",":
								stream.stepPrevious();
								
								expression = readComma(stream, method);
								break;
							
							case "@":
								stream.stepPrevious();
								
								expression = readIdentifier(stream, method);
								break;
							
							default:
								stream.stepPrevious();
								
								expression = readOperation(stream, method);
								break;
						}
						break;
					
					case TokenType.KEYWORD:
						if (token.data == "set" || token.data == "get")
						{
							stream.stepPrevious();
							
							expression = readIdentifier(stream, method);
						}
						else
						{
							stream.stepPrevious();
							
							expression = readConstruction(stream, method);
						}
						break;
					
					case TokenType.BLOCK:
						stream.stepPrevious();
						
						expression = readBlock(stream, method);
						break;
					
					default:
						errorMessage("Read expression error: unknown token.", method, true);
						break;
				}
			}
			else
			{
				errorMessage("Read expression error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readComma(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				if (token.type == TokenType.OPERATOR && token.data == ",")
				{
					expression = new ExpressionInfo();
					expression.type = ExpressionType.OPERATION;
					expression.token = token;
				}
				else
				{
					stream.stepPrevious();
				}
			}
			
			return expression;
		}
		
		private function readBlock(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var comma:ExpressionInfo;
			var i:int;
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				switch (token.type)
				{
					case TokenType.BLOCK:
						switch (token.data)
						{
							case "[":
								expression = new ExpressionInfo();
								expression.type = ExpressionType.ARRAY;
								expression.token = token;
								expression.body = readBody(token, method);
								
								if (!removeCommaFromBody(expression.body))
								{
									expression.type = ExpressionType.BLOCK;
								}
								
								if (stream.tokensAvailable)
								{
									var dot:Token = stream.readToken();
									
									stream.stepPrevious();
									
									if (dot.type == TokenType.OPERATOR && dot.data == ".")
									{
										expression.child = readAccess(stream, method);
									}
								}
								break;
							
							case "(":
								expression = new ExpressionInfo();
								expression.type = ExpressionType.BLOCK;
								expression.token = token;
								expression.body = readBody(token, method);
								expression.child = readAccess(stream, method);
								break;
							
							case "{":
								expression = new ExpressionInfo();
								expression.type = ExpressionType.BLOCK;
								expression.token = token;
								expression.body = readBody(token, method);
								expression.properties = new Vector.<Object>();
								
								for (i = 0; i < expression.body.length; i++)
								{
									var name:ExpressionInfo = expression.body[i];
									
									if (name.type == ExpressionType.GET &&
										(name.tokenType == TokenType.UNKNOWN || name.tokenType == TokenType.STRING) &&
										name.child &&
										name.child.type == ExpressionType.OPERATION &&
										name.child.tokenData == ":" &&
										name.child.child)
									{
										expression.properties.push({name: name.tokenData, value: name.child.child});
									}
									else
									{
										expression.properties = null;
										break;
									}
									
									i++;
									
									if (i < expression.body.length)
									{
										comma = expression.body[i];
										
										if (comma.type == ExpressionType.OPERATION && comma.tokenData == ",")
										{
											
										}
										else
										{
											expression.properties = null;
											break;
										}
									}
								}
								
								if (expression.properties)
								{
									expression.type = ExpressionType.OBJECT;
									expression.body = null;
								}
								break;
							
							default:
								errorMessage("Read block error: unknown token.", method, true);
								break;
						}
						break;
					
					default:
						errorMessage("Read block error: unknown token.", method, true);
						break;
				}
			}
			else
			{
				errorMessage("Read block error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function removeCommaFromBody(body:Vector.<ExpressionInfo>):Boolean
		{
			for (var i:int = 0; i < body.length; i++)
			{
				i++;
				
				if (i < body.length)
				{
					var comma:ExpressionInfo = body[i];
					
					if (comma.type == ExpressionType.OPERATION && comma.tokenData == ",")
					{
						body.splice(i, 1);
						i--;
					}
					else
					{
						return false;
					}
				}
			}
			
			return true;
		}
		
		private function readConstruction(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var next:Token;
			var second:Token;
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				switch (token.type)
				{
					case TokenType.KEYWORD:
						switch (token.data)
						{
							case "break":
							case "continue":
								expression = new ExpressionInfo();
								expression.token = token;
								expression.type = ExpressionType.CONSTRUCTION;
								break;
							
							case "return":
							case "throw":
							case "new":
								expression = new ExpressionInfo();
								expression.token = token;
								expression.type = ExpressionType.CONSTRUCTION;
								
								if (stream.tokensAvailable)
								{
									next = stream.readToken();
									
									stream.stepPrevious();
									
									if (!next || next.type != TokenType.KEYWORD || next.data == "new" || next.data == "function")
									{
										expression.child = readExpression(stream, method);
									}
								}
								break;
							
							case "var":
							case "const":
								expression = readLocal(stream, method);
								break;
							
							case "if":
							case "switch":
							case "while":
							case "with":
								expression = readConstructionCondition(stream, method);
								expression.child = readConstructionBody(stream, method);
								expression.token = token;
								break;
							
							case "try":
							case "finally":
								expression = readConstructionBody(stream, method);
								expression.token = token;
								break;
							
							case "case":
							case "default":
								expression = readCaseDefault(stream, method);
								expression.token = token;
								expression.type = ExpressionType.CONSTRUCTION;
								break;
							
							case "else":
								expression = readElseIf(stream, method);
								break;
							
							case "for":
								expression = readForEach(stream, method);
								break;
							
							case "do":
								expression = readDoWhile(stream, method);
								break;
							
							case "function":
								expression = new ExpressionInfo();
								expression.token = token;
								expression.type = ExpressionType.CONSTRUCTION;
								expression.method = new MethodInfo();
								expression.method.methodType = MethodType.ANONYMOUS;
								
								var nameToken:Token = stream.readToken();
								
								if (nameToken.data != "(")
								{
									expression.method.name = nameToken.data;
								}
								else
								{
									stream.stepPrevious();
								}
								
								readFunction(stream, expression.method, null);
								break;
							
							case "catch":
								expression = new ExpressionInfo();
								expression.token = token;
								expression.type = ExpressionType.CONSTRUCTION;
								expression.method = new MethodInfo();
								expression.method.methodType = MethodType.ANONYMOUS;
								readFunction(stream, expression.method, null);
								break;
							
							case "import":
								readNamespace(stream);
								break;
							
							case "delete":
								expression = new ExpressionInfo();
								expression.token = token;
								expression.type = ExpressionType.CONSTRUCTION;
								expression.child = readExpression(stream, method);
								break;
							
							case "typeof":
								expression = new ExpressionInfo();
								expression.token = token;
								expression.type = ExpressionType.CONSTRUCTION;
								
								if (stream.tokensAvailable)
								{
									next = stream.readToken();
									
									stream.stepPrevious();
									
									if (next)
									{
										if (next.type == TokenType.BLOCK)
										{
											expression.child = readExpression(stream, method);
										}
										else
										{
											expression.child = readIdentifier(stream, method);
										}
									}
								}
								//expression.child = readExpression(stream, method);
								break;
							
							default:
								expression = new ExpressionInfo();
								expression.type = ExpressionType.CONSTRUCTION;
								expression.token = token;
								break;
						}
						break;
					
					default:
						errorMessage("Read keyword error: unknown token.", method, true);
						break;
				}
			}
			else
			{
				errorMessage("Read keyword error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readDoWhile(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var token:Token = new Token(TokenType.KEYWORD, "do");
			
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				expression = readConstructionBody(stream, method);
				expression.token = token;
				
				if (stream.tokensAvailable)
				{
					var second:Token = stream.readToken();
					
					if (second.type == TokenType.KEYWORD && second.data == "while")
					{
						token.data += " " + second.data;
					}
					else
					{
						stream.stepPrevious();
						
						errorMessage("Read do-while error: while not found.", method, true);
					}
					
					expression.child = readConstructionCondition(stream, method);
				}
				else
				{
					errorMessage("Read do-while error: end of stream.", method, true);
				}
			}
			else
			{
				errorMessage("Read do-while error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readForEach(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var token:Token = new Token(TokenType.KEYWORD, "for");
			
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var second:Token = stream.readToken();
				
				if (second.type == TokenType.KEYWORD && second.data == "each")
				{
					token.data += " " + second.data;
				}
				else
				{
					stream.stepPrevious();
				}
				
				expression = readConstructionCondition(stream, method);
				expression.child = readConstructionBody(stream, method);
				expression.token = token;
			}
			else
			{
				errorMessage("Read for-each error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readElseIf(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var token:Token = new Token(TokenType.KEYWORD, "else");
			
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var second:Token = stream.readToken();
				
				if (second.type == TokenType.KEYWORD && second.data == "if")
				{
					token.data += " " + second.data;
					
					expression = readConstructionCondition(stream, method);
				}
				else
				{
					expression = new ExpressionInfo();
					expression.type = ExpressionType.CONSTRUCTION;
					
					stream.stepPrevious();
				}
				
				expression.child = readConstructionBody(stream, method);
				expression.token = token;
			}
			else
			{
				errorMessage("Read else-if error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readCaseDefault(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var body:Token = stream.readStreamToToken(new Token(TokenType.OPERATOR, ":"));
			
			var expression:ExpressionInfo = new ExpressionInfo();
			expression.type = ExpressionType.CONSTRUCTION;
			expression.body = readBody(body, method);
			
			return expression;
		}
		
		private function readConstructionBody(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				expression = new ExpressionInfo();
				expression.type = ExpressionType.CONSTRUCTION;
				
				if (token.type == TokenType.BLOCK && token.data == "{")
				{
					expression.body = readBody(token, method);
				}
				else
				{
					stream.stepPrevious();
					
					expression.body = new Vector.<ExpressionInfo>();
					expression.body.push(readExpression(stream, method));
				}
			}
			else
			{
				errorMessage("Read keyword body error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readConstructionCondition(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				if (token.type == TokenType.BLOCK && token.data == "(")
				{
					expression = new ExpressionInfo();
					expression.type = ExpressionType.CONSTRUCTION;
					expression.body = readBody(token, method);
				}
				else
				{
					errorMessage("Read keyword condition error: condition not found.", method, true);
				}
			}
			else
			{
				errorMessage("Read keyword condition error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readVector(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				if (token.type == TokenType.BLOCK && token.data == ".<")
				{
					expression = new ExpressionInfo();
					expression.type = ExpressionType.VECTOR;
					expression.token = token;
					expression.body = readBody(token, method);
					expression.child = readAccess(stream, method);
				}
				else
				{
					errorMessage("Read vector error: unknown token.", method, true);
				}
			}
			else
			{
				errorMessage("Read vector error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readOperation(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				switch (token.type)
				{
					case TokenType.OPERATOR:
						switch (token.data)
						{
							case ";":
								break;
							
							case ",":
								stream.stepPrevious();
								break;
							
							case "=":
							case "+=":
							case "-=":
							case "*=":
							case "/=":
							case "%=":
							case "&=":
							case "|=":
							case "&&=":
							case "||=":
							case "++":
							case "--":
								expression = new ExpressionInfo();
								expression.token = token;
								expression.type = ExpressionType.SET;
								
								if (stream.tokensAvailable)
								{
									var next:Token = stream.readToken();
									
									stream.stepPrevious();
									
									if (next.type != TokenType.OPERATOR || next.data != ",")
									{
										expression.child = readExpression(stream, method);
									}
								}
								break;
							
							default:
								expression = new ExpressionInfo();
								expression.token = token;
								expression.type = ExpressionType.OPERATION;
								expression.child = readExpression(stream, method);
								break;
						}
						break;
					
					default:
						stream.stepPrevious();
						break;
				}
			}
			else
			{
				errorMessage("Read operation error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readIdentifier(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				switch (token.type)
				{
					case TokenType.NUMBER:
					case TokenType.STRING:
					case TokenType.BOOLEAN:
					case TokenType.LITERAL:
					case TokenType.UNKNOWN:
					case TokenType.KEYWORD:
					case TokenType.REGULAR_EXPRESSION:
					case TokenType.NATIVE_XML:
						expression = new ExpressionInfo();
						expression.token = token;
						expression.type = ExpressionType.GET;
						expression.child = readAccess(stream, method);
						break;
					
					case TokenType.OPERATOR:
						if (token.data == "@")
						{
							expression = new ExpressionInfo();
							expression.token = token;
							expression.type = ExpressionType.ATTRIBUTE;
							expression.child = readIdentifier(stream, method);
							expression.child.context = new NamespaceInfo("XMLList");
						}
						else
						{
							errorMessage("Read identifier error: unknown operator.", method, true);
						}
						break;
					
					case TokenType.BLOCK:
						if (token.data == "(")
						{
							expression = new ExpressionInfo();
							expression.token = token;
							expression.type = ExpressionType.FIND;
							expression.body = readBody(token, method);
							expression.context = new NamespaceInfo("XMLList");
							expression.child = readAccess(stream, method);
							
							if (expression.child)
							{
								expression.child.context = new NamespaceInfo("XMLList");
							}
						}
						else
						{
							errorMessage("Read identifier error: unknown block.", method, true);
						}
						break;
					
					default:
						errorMessage("Read identifier error: unknown token.", method, true);
						break;
				}
			}
			else
			{
				errorMessage("Read identifier error: end of stream.", method, true);
			}
			
			return expression;
		}
		
		private function readAccess(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				switch (token.type)
				{
					case TokenType.NUMBER:
					case TokenType.STRING:
					case TokenType.LITERAL:
					case TokenType.BOOLEAN:
					case TokenType.KEYWORD:
					case TokenType.UNKNOWN:
					case TokenType.NATIVE_XML:
					case TokenType.REGULAR_EXPRESSION:
						stream.stepPrevious();
						break;
					
					case TokenType.OPERATOR:
						switch (token.data)
						{
							case ";":
								break;
							
							case ",":
								stream.stepPrevious();
								break;
							
							case ".":
								expression = readIdentifier(stream, method);
								break;
							
							case "..":
								expression = new ExpressionInfo();
								expression.type = ExpressionType.DESCENDANT;
								expression.token = token;
								expression.child = readIdentifier(stream, method);
								expression.child.context = new NamespaceInfo("XMLList");
								break;
							
							default:
								stream.stepPrevious();
								expression = readOperation(stream, method);
								break;
						}
						break;
					
					case TokenType.BLOCK:
						switch (token.data)
						{
							case "(":
								expression = new ExpressionInfo();
								expression.type = ExpressionType.RUN;
								expression.token = token;
								expression.body = readBody(token, method);
								expression.child = readAccess(stream, method);
								
								removeCommaFromBody(expression.body);
								break;
							
							case "[":
								expression = new ExpressionInfo();
								expression.type = ExpressionType.ELEMENT;
								expression.token = token;
								expression.body = readBody(token, method);
								expression.child = readAccess(stream, method);
								break;
							
							default:
								stream.stepPrevious();
								break;
						}
						break;
					
					default:
						errorMessage("Read access error: unknown token.", method, true);
						break;
				}
			}
			
			return expression;
		}
		
		private function readLocal(stream:Token, method:MethodInfo):ExpressionInfo
		{
			var expression:ExpressionInfo;
			
			if (stream.tokensAvailable)
			{
				var name:Token = stream.readToken();
				
				if (name && name.type == TokenType.UNKNOWN)
				{
					var variable:VariableInfo = new VariableInfo();
					variable.variableType = VariableType.LOCAL;
					variable.name = name.data;
					variable.type = readType(stream, method, null);
					method.locals.push(variable);
					
					expression = new ExpressionInfo();
					expression.type = ExpressionType.GET;
					expression.token = name;
					expression.child = readOperation(stream, method);
				}
				else
				{
					errorMessage("Read local error: name not found.", method, true);
				}
			}
			else
			{
				errorMessage("Read local error: end of stream.", method, true);
			}
			
			if (stream.tokensAvailable)
			{
				var comma:Token = stream.readToken();
				
				if (comma.type == TokenType.OPERATOR && comma.data == ",")
				{
					stream.insertToken(new Token(TokenType.KEYWORD, "var"));
				}
				
				stream.stepPrevious();
			}
			
			return expression;
		}
		
		private function readMethods(stream:Token, info:ClassInfo, access:String):Vector.<MethodInfo>
		{
			var methods:Vector.<MethodInfo> = new Vector.<MethodInfo>();
			
			stream.gotoBegin();
			
			while (stream.tokensAvailable)
			{
				var keyword:Token = stream.readTokenByData("function");
				
				if (keyword && keyword.type == TokenType.KEYWORD)
				{
					var method:MethodInfo = new MethodInfo();
					methods.push(method);
					
					var position:int = stream.position;
					
					stream.stepPrevious();
					
					readMember(stream, method, info);
					
					stream.position = position;
					
					var next:Token = stream.readToken();
					var name:Token = stream.readToken();
					stream.stepPrevious();
					
					if (next.type == TokenType.KEYWORD && next.data == "get" && name && name.type == TokenType.UNKNOWN)
					{
						method.methodType = MethodType.GETTER;
					}
					else if (next.type == TokenType.KEYWORD && next.data == "set" && name && name.type == TokenType.UNKNOWN)
					{
						method.methodType = MethodType.SETTER;
					}
					else
					{
						stream.stepPrevious();
					}
					
					if (access)
					{
						method.access = access;
					}
					
					readFunction(stream, method, info);
				}
			}
			
			return methods;
		}
		
		private function readMember(stream:Token, member:MemberInfo, info:ClassInfo):void
		{
			while (stream.position)
			{
				var keyword:Token = stream.readToken(true);
				
				if (keyword && keyword.type == TokenType.KEYWORD)
				{
					var exit:Boolean = false;
					
					switch (keyword.data)
					{
						case AccessType.PRIVATE:
							member.access = AccessType.PRIVATE;
							break;
						
						case AccessType.PUBLIC:
							member.access = AccessType.PUBLIC;
							break;
						
						case AccessType.INTERNAL:
							member.access = AccessType.INTERNAL;
							break;
						
						case AccessType.PROTECTED:
							member.access = AccessType.PROTECTED;
							break;
						
						case "static":
							member.statique = true;
							break;
						
						case "override":
							if (member is MethodInfo)
							{
								MethodInfo(member).overrided = true;
							}
							else
							{
								errorMessage("Property can not be overrided: " + member.name, null, true);
							}
							break;
						
						case "final":
							if (member is MethodInfo)
							{
								MethodInfo(member).finalMethod = true;
							}
							else
							{
								errorMessage("Property can not be final: " + member.name, null, true);
							}
							break;
						
						default:
							stream.stepNext();
							exit = true;
							break;
					}
					
					if (exit) break;
				}
				else
				{
					break;
				}
			}
			
			if (stream.position)
			{
				var tagBlock:Token = stream.readToken(true);
				
				if (tagBlock && tagBlock.data == "[" && tagBlock.length)
				{
					member.tag = readTag(tagBlock, info);
				}
			}
		}
		
		private function readTag(stream:Token, info:ClassInfo):TagInfo
		{
			stream.gotoBegin();
			
			var tag:TagInfo;
			
			var typeToken:Token = stream.readToken();
			
			if (typeToken && typeToken.type == TokenType.UNKNOWN)
			{
				tag = new TagInfo();
				tag.type = typeToken.data;
				
				if (stream.tokensAvailable)
				{
					var blockToken:Token = stream.readToken();
					
					if (blockToken && blockToken.data == "(")
					{
						blockToken.gotoBegin();
						
						tag.parameters = {};
						
						while (blockToken.tokensAvailable)
						{
							var nameToken:Token = blockToken.readToken();
							
							if (nameToken && nameToken.type == TokenType.UNKNOWN)
							{
								var equalsToken:Token = blockToken.readToken();
								
								if (equalsToken && equalsToken.data == "=")
								{
									var valueToken:Token = blockToken.readToken();
									
									if (valueToken &&
										(
											valueToken.type == TokenType.STRING ||
											valueToken.type == TokenType.NUMBER ||
											valueToken.type == TokenType.BOOLEAN
										))
									{
										tag.parameters[nameToken.data] = valueToken.data;
										
										if (stream.tokensAvailable)
										{
											var comma:Token = stream.readToken();
											
											if (comma.data != ",")
											{
												break;
											}
										}
										else
										{
											break;
										}
									}
									else
									{
										errorMessage("Read tag parameter error: " + valueToken, null, true);
									}
								}
								else
								{
									errorMessage("Read tag parameter error: " + equalsToken, null, true);
								}
							}
							else
							{
								break;
							}
						}
						
						if (tag.type == TagInfo.EMBED && tag.isImage)
						{
							if (file)
							{
								var tagFile:File = file.parent;
								
								tagFile = tagFile.resolvePath(tag.source);
								
								tag.embed = EmbedInfo.addEmbed(tagFile);
							}
							else
							{
								errorMessage("Source file not found", null, false);
							}
						}
					}
					else
					{
						tag = null;
					}
				}
				else
				{
					tag = null;
				}
			}
			
			return tag;
		}
		
		private function readFunction(stream:Token, method:MethodInfo, info:ClassInfo):void
		{
			var name:Token = stream.readToken();
			
			if (name && (name.type == TokenType.UNKNOWN || name.type == TokenType.KEYWORD))
			{
				method.name = name.data;
			}
			else
			{
				stream.stepPrevious();
			}
			
			var parameters:Token = stream.readToken();
			
			if (parameters && parameters.data == "(")
			{
				method.parameters = readParameters(parameters);
				
				method.type = readType(stream, method, info);
				
				if (stream.tokensAvailable)
				{
					var body:Token = stream.readToken();
					
					if (body.data == "{")
					{
						method.body = readBody(body, method);
					}
					else
					{
						if (!info || (info.isClass && info.name != method.name))
						{
							errorMessage("Read function error: body not found.", method, true);
						}
						
						stream.stepPrevious();
					}
				}
			}
			else
			{
				errorMessage("Read function error. Not found parameters: " + method.name, method, true);
			}
		}
		
		private function readType(stream:Token, method:MethodInfo, info:ClassInfo):NamespaceInfo
		{
			if (stream.tokensAvailable)
			{
				var colon:Token = stream.readToken();
				
				if (colon.type == TokenType.OPERATOR && colon.data == ":")
				{
					return readNamespace(stream);
				}
				else
				{
					stream.stepPrevious();
				}
			}
			
			return null;
		}
		
		private function readParameters(stream:Token):Vector.<VariableInfo>
		{
			var parameters:Vector.<VariableInfo> = new Vector.<VariableInfo>();
			
			stream.gotoBegin();
			
			var colon:Token;
			
			while (stream.tokensAvailable)
			{
				var name:Token = stream.readToken();
				
				if (name.data != ",")
				{
					var variable:VariableInfo = new VariableInfo();
					parameters.push(variable);
					
					variable.variableType = VariableType.PARAMETER;
					
					if (name.type == TokenType.OPERATOR && name.data == "...")
					{
						variable.multiply = true;
						
						if (stream.tokensAvailable)
						{
							name = stream.readToken();
							
							if (name.type == TokenType.UNKNOWN)
							{
								variable.name = name.data;
								variable.type = readType(stream, null, null);
							}
							else
							{
								errorMessage("Read parameters error: not found name of multiply parameter: " + name, null, true);
								break;
							}
						}
						else
						{
							errorMessage("Read parameters error: not found name of multiply parameter: " + name, null, true);
							break;
						}
					}
					else if (name.type == TokenType.UNKNOWN)
					{
						variable.name = name.data;
						variable.type = readType(stream, null, null);
						variable.body = readVariableBody(stream, null);
					}
				}
			}
			
			return parameters;
		}
		
		private function readBody(stream:Token, method:MethodInfo):Vector.<ExpressionInfo>
		{
			stream.gotoBegin();
			
			var body:Vector.<ExpressionInfo> = new Vector.<ExpressionInfo>();
			
			while (stream.tokensAvailable)
			{
				var expression:ExpressionInfo = readExpression(stream, method);
				
				body.push(expression);
			}
			
			return body;
		}
	}
}