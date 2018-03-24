package com.guepard.parser.serialization
{
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.info.ExpressionInfo;
	import com.guepard.parser.info.ExpressionType;
	import com.guepard.parser.info.MemberInfo;
	import com.guepard.parser.info.MethodInfo;
	import com.guepard.parser.info.MethodType;
	import com.guepard.parser.info.NamespaceInfo;
	import com.guepard.parser.info.TagInfo;
	import com.guepard.parser.info.VariableInfo;
	import com.guepard.parser.token.Token;
	import com.guepard.parser.token.TokenType;
	import com.guepard.utils.PathUtil;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class JSWriter extends CodeWriter
	{
		public static const DESCRIPTION:String = "d";
		public static const STATICAL:String = "s";
		public static const LIBRARY:String = "flash";
		
		private var _convertComma:Boolean = true;
		
		public function JSWriter(info:ClassInfo)
		{
			super(info);
		}
		
		override public function write():void
		{
			super.write();
			
			var stream:Token = new Token();
			
			writeClass(stream, _info);
			
			for each(var internalInfo:ClassInfo in _info.classesInfo)
			{
				stream.writeSymbol(ENTER, ENTER, "/*internal class*/", ENTER, ENTER);
				
				writeClass(stream, internalInfo);
			}
			
			var strings:Vector.<String> = stream.toStrings(true);
			
			_output = writeStrings(strings, "");
		}
		
		private function writeClass(stream:Token, info:ClassInfo):void
		{
			writeBegin(stream, info);
			
			writeInstance(stream, info);
			writeProperties(stream, info, true);
			writeMethods(stream, info, true, true);
			writeMethods(stream, info, true, false);
			
			writeStatic(stream, info);
			writeStaticInit(stream, info);
			writeMethods(stream, info, false, true);
			writeMethods(stream, info, false, false);
			writeEmbed(stream, info);
			
			writeEnd(stream, info);
		}
		
		private function writeBegin(stream:Token, info:ClassInfo):void
		{
			stream.writeSymbol("/*", info.type, " ", info.fullName, "*/", ENTER);
			
			if (info.importsInfo.length)
			{
				stream.writeSymbol("/*", ENTER);
				
				for each(var importInfo:NamespaceInfo in info.importsInfo)
				{
					stream.writeSymbol("import ", importInfo);
					
					writeSplitter(stream);
				}
				
				stream.writeSymbol("*/", ENTER);
			}
			
			stream.writeSymbol("(", "function", "(", ")", "{", '"', "use strict", '"', ";");
			
			stream.writeSymbol(ENTER, ENTER);
		}
		
		private function writeInstance(stream:Token, info:ClassInfo):void
		{
			if (_info.hasInstanceMembers)
			{
				stream.writeSymbol("var", DESCRIPTION, "=", "{}", ";");
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeEnd(stream:Token, info:ClassInfo):void
		{
			stream.writeSymbol(ENTER);
			
			stream.writeSymbol(LIBRARY, ".", "addDescription", "(", '"', info.fullName, '"', ",");
			stream.writeSymbol(info.hasInstanceMembers ? DESCRIPTION : "null", ",");
			
			if (info.extendsInfo && info.extendsInfo.data != "Object")
			{
				stream.writeSymbol('"', info.extendsInfo.data, '"');
			}
			else
			{
				stream.writeSymbol("null");
			}
			
			stream.writeSymbol(",", (info.hasStaticMembers || info.hasTagMembers || info.hasOverride) ? STATICAL : "null", ",");
			
			if (info.implementsInfo && info.implementsInfo.length)
			{
				var implementation:Array = [];
				
				for each(var implementInfo:NamespaceInfo in info.implementsInfo)
				{
					implementation.push('"' + implementInfo.data + '"');
				}
				
				stream.writeSymbol("[", implementation.join(", "), "]");
			}
			else
			{
				stream.writeSymbol("null");
			}
			
			stream.writeSymbol(",");
			
			if (info.requiredClasses.length)
			{
				var requiredClasses:Array = [];
				
				for each(var requiredClassName:String in info.requiredClasses)
				{
					requiredClasses.push('"' + requiredClassName + '"');
				}
				
				stream.writeSymbol("[", requiredClasses.join(", "), "]");
			}
			else
			{
				stream.writeSymbol("null");
			}
			
			stream.writeSymbol(")", ";", "}", "(", ")", ")", ";");
		}
		
		private function writeProperties(stream:Token, info:ClassInfo, instance:Boolean):void
		{
			if (info.variablesInfo && info.variablesInfo.length)
			{
				for each (var variable:VariableInfo in info.variablesInfo)
				{
					if (instance == !variable.statique)
					{
						writeMember(stream, variable, info, false);
						
						if (variable.constant)
						{
							stream.writeSymbol("/*const*/");
						}
						else
						{
							stream.writeSymbol("/*var*/");
						}
						
						writeProperty(stream, variable, info);
					}
				}
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeMember(stream:Token, member:MemberInfo, info:ClassInfo, overrideMode:Boolean):void
		{
			if (member.tag)
			{
				writeTag(stream, member.tag, info);
			}
			
			stream.writeSymbol("/*" + member.access + "*/");
			
			if (overrideMode)
			{
				stream.writeSymbol(THIS, ".", "prototype");
			}
			else if (member.statique)
			{
				if (member is VariableInfo)
				{
					stream.writeSymbol(THIS);
				}
				else
				{
					stream.writeSymbol(STATICAL);
				}
			}
			else
			{
				stream.writeSymbol(DESCRIPTION);
			}
		}
		
		private function writeTag(stream:Token, tag:TagInfo, info:ClassInfo):void
		{
			stream.writeSymbol(ENTER, "/*", "[", tag.type);
			
			if (tag.parameters)
			{
				stream.writeSymbol("(");
				
				var enabled:Boolean = false;
				
				for (var i:String in tag.parameters)
				{
					stream.writeSymbol(i, "=", '"', tag.parameters[i], '"', ",");
					
					enabled = true;
				}
				
				if (enabled)
				{
					stream.pop();
				}
				
				stream.writeSymbol(")");
			}
			
			stream.writeSymbol("]", "*/", ENTER);
		}
		
		private function writeProperty(stream:Token, variable:VariableInfo, info:ClassInfo):void
		{
			stream.writeSymbol(".", variable.name);
			
			stream.writeSymbol("/*" + variable.type + "*/");
			
			stream.writeSymbol("=");
			
			if (variable.body && variable.statique)
			{
				writeBody(stream, variable.body, null, info);
			}
			else
			{
				stream.writeSymbol(variable.defaultValue);
			}
			
			writeSplitter(stream);
		}
		
		private function writeBody(stream:Token, body:Vector.<ExpressionInfo>, method:MethodInfo, info:ClassInfo, splitter:String = SEMICOLON, checkFunction:Boolean = false, ignoreSplitterToken:Token = null):void
		{
			if (!body) return;
			
			for (var i:int = 0; i < body.length; i++)
			{
				var expression:ExpressionInfo = body[i];
				
				if (expression)
				{
					writePath(stream, expression, method, info, checkFunction);
					
					if (splitter && stream.lastToken.data != ENTER)
					{
						var splitterEnabled:Boolean = true;
						
						if (ignoreSplitterToken)
						{
							if (expression.token.equals(ignoreSplitterToken))
							{
								splitterEnabled = false;
							}
							else
							{
								var next:ExpressionInfo = i + 1 < body.length ? body[i + 1] : null;
								
								if (next && next.token.equals(ignoreSplitterToken))
								{
									splitterEnabled = false;
								}
							}
						}
						
						if (splitterEnabled)
						{
							writeSplitter(stream, splitter);
						}
					}
				}
				else
				{
					writeSplitter(stream, "; ");
				}
			}
		}
		
		private function writeMethods(stream:Token, info:ClassInfo, instance:Boolean, properties:Boolean):void
		{
			if (info.methodsInfo && info.methodsInfo.length)
			{
				for each(var method:MethodInfo in info.methodsInfo)
				{
					if (instance == !method.statique && properties == method.isProperty)
					{
						if (method.overrided)
						{
							stream.writeSymbol("/*override*/");
						}
						
						if (method.finalMethod)
						{
							stream.writeSymbol("/*final*/");
						}
						
						writeMember(stream, method, info, false);
						
						writeMethod(stream, method, info);
					}
				}
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeMethod(stream:Token, method:MethodInfo, info:ClassInfo):void
		{
			stream.writeSymbol(".");
			
			if (method.methodType == MethodType.GETTER)
			{
				stream.writeSymbol("get_");
			}
			else if (method.methodType == MethodType.SETTER)
			{
				stream.writeSymbol("set_");
			}
			
			stream.writeSymbol(method.name, "=", "function");
			
			writeFunction(stream, method, info);
			
			writeSplitter(stream);
			
			stream.writeSymbol(ENTER);
		}
		
		private function writeFunction(stream:Token, method:MethodInfo, info:ClassInfo):void
		{
			stream.writeSymbol("(");
			
			writeParameters(stream, method);
			
			stream.writeSymbol(")");
			
			if (method.type)
			{
				stream.writeSymbol("/*" + method.type + "*/");
			}
			
			stream.writeSymbol("{");
			
			if (method.body)
			{
				if (method.name == info.name)
				{
					writePropertiesBody(stream, info);
				}
				
				writeLocals(stream, method, info);
				
				writeBody(stream, method.body, method, info);
			}
			
			stream.writeSymbol("}");
		}
		
		private function writeParameters(stream:Token, method:MethodInfo):void
		{
			if (method.parameters && method.parameters.length)
			{
				for (var i:int = 0; i < method.parameters.length; i++)
				{
					var parameter:VariableInfo = method.parameters[i];
					
					if (parameter.multiply)
					{
						break;
					}
					
					if (i != 0)
					{
						stream.writeSymbol(",");
					}
					
					stream.writeSymbol(parameter.name, "/*" + parameter.type + "*/");
				}
			}
		}
		
		private function writePropertiesBody(stream:Token, info:ClassInfo):void
		{
			for each(var variable:VariableInfo in info.variablesInfo)
			{
				if (variable.body && !variable.statique && !variable.hasDefaultValue)
				{
					stream.writeSymbol(THIS, ".", variable.name, "=");
					
					writeBody(stream, variable.body, null, info);
					
					writeSplitter(stream);
				}
			}
			
			stream.writeSymbol(ENTER);
		}
		
		private function writeLocals(stream:Token, method:MethodInfo, info:ClassInfo):void
		{
			var type:String;
			
			if (method.parameters && method.parameters.length)
			{
				var needEnter:Boolean = false;
				
				for each (var parameter:VariableInfo in method.parameters)
				{
					if (parameter.multiply)
					{
						stream.writeSymbol("var", parameter.name, "/*Array*/", "=", "Array", ".", "prototype", ".", "slice", ".", "call", "(", "arguments", ",", method.parameters.indexOf(parameter), ")");
						
						writeSplitter(stream);
						
						needEnter = true;
					}
					else if (parameter.body)
					{
						stream.writeSymbol("if", "(", parameter.name, "==", "undefined", ")", " ", parameter.name, "=");
						
						writeBody(stream, parameter.body, method, info);
						
						writeSplitter(stream);
						
						needEnter = true;
					}
					
					if (parameter.type && (parameter.type.data == "int" || parameter.type.data == "uint"))
					{
						stream.writeSymbol(parameter.name, "=", "/*" + parameter.type + "*/", LIBRARY, ".", parameter.type.data, "(" + parameter.name + ")");
						
						writeSplitter(stream);
						
						needEnter = true;
					}
				}
				
				if (needEnter)
				{
					stream.writeSymbol(ENTER);
				}
			}
			
			if (method.locals && method.locals.length)
			{
				for each (var local:VariableInfo in method.locals)
				{
					stream.writeSymbol("var", local.name, "/*", local.type, "*/", "=", local.defaultValue);
					
					writeSplitter(stream);
				}
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeStatic(stream:Token, info:ClassInfo):void
		{
			if (info.hasStaticMembers || info.hasTagMembers || info.hasOverride)
			{
				stream.writeSymbol("var", STATICAL, "=", "{}", ";");
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeStaticInit(stream:Token, info:ClassInfo):void
		{
			var staticProperties:Boolean = (info.hasStaticProperties || info.hasOverride);
			
			if (staticProperties)
			{
				stream.writeSymbol(STATICAL, ".", "__init__", "=", "function", "(", ")", "{");
				
				writeOverrideMethods(stream, info);
				
				writeProperties(stream, info, false);
				
				stream.writeSymbol("}", ";");
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeEmbed(stream:Token, info:ClassInfo):void
		{
			if (info.hasTagMembers)
			{
				stream.writeSymbol(STATICAL, ".", "__embed__", "=", "function", "(", ")", "{");
				
				for each(var variable:VariableInfo in info.variablesInfo)
				{
					if (variable.tag && variable.tag.type == TagInfo.EMBED)
					{
						if (variable.statique)
						{
							stream.writeSymbol(THIS);
						}
						else
						{
							stream.writeSymbol(THIS, ".", "prototype");
						}
						
						stream.writeSymbol(".", variable.name, "=");
						
						stream.writeSymbol(LIBRARY, ".", "createEmbedClass", "(", '"', info.fullName + "_" + variable.name, '"');
						
						if (variable.tag.isImage && variable.tag.embed.file.exists)
						{
							stream.writeSymbol(",", '"', variable.tag.embed.name, '"');
						}
						else if (variable.tag.isFont)
						{
							stream.writeSymbol(",", '"', PathUtil.getName(variable.tag.source), '"', ",", '"', variable.tag.fontName, '"');
						}
						
						stream.writeSymbol(")", ";");
					}
				}
				
				stream.writeSymbol("}", ";");
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeOverrideMethods(stream:Token, info:ClassInfo):void
		{
			var superClass:ClassInfo = info.getExtends();
			
			if (superClass && info.overrideMethods.length)
			{
				for each(var method:MethodInfo in info.overrideMethods)
				{
					stream.writeSymbol("/*super*/");
					
					writeMember(stream, method, info, true);
					
					stream.writeSymbol(".", superClass.name, "_");
					
					var append:String = "";
					
					if (method.methodType == MethodType.GETTER)
					{
						append = "get_";
					}
					else if (method.methodType == MethodType.SETTER)
					{
						append = "set_";
					}
					
					if (method.name == superClass.name)
					{
						stream.writeSymbol("constructor", "=", THIS, ".", "__base__", ";");
					}
					else
					{
						stream.writeSymbol(append, method.name, "=", THIS, ".", "__base__", ".", "prototype", ".", append, method.name, ";");
					}
				}
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writePath(stream:Token, expression:ExpressionInfo, method:MethodInfo, info:ClassInfo, checkFunction:Boolean):void
		{
			if (expression)
			{
				var isFunction:Boolean = checkFunction && expression.isFunction;
				
				if (method && !expression.child && method.getParameter(expression.tokenData))
				{
					isFunction = false;
				}
				
				if (isFunction)
				{
					stream.writeSymbol(LIBRARY, ".", "bindFunction", "(");
					
					expression.peak.enabled = false;
					
					if (expression.tokenData == "super")
					{
						stream.writeSymbol("this");
					}
					else
					{
						writeExpression(stream, expression, method, info);
					}
					
					stream.writeSymbol(",");
					
					expression.peak.enabled = true;
				}
				
				writeExpression(stream, expression, method, info);
				
				if (isFunction)
				{
					stream.writeSymbol(")");
				}
			}
		}
		
		private function writeExpression(stream:Token, expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			var checkFunction:Boolean = false;
			
			switch (expression.type)
			{
				case ExpressionType.GET:
					if (expression.parent && expression.parent.isAccess)
					{
						stream.writeSymbol(".");
						
						if (writeGetProperty(stream, expression, method, info)) return;
					}
					else if (expression.isLiteral)
					{
						switch (expression.tokenType)
						{
							case TokenType.NUMBER:
							case TokenType.BOOLEAN:
							case TokenType.STRING:
							case TokenType.LITERAL:
							case TokenType.REGULAR_EXPRESSION:
								stream.writeSymbol(expression.tokenData);
								break;
							
							case TokenType.NATIVE_XML:
								stream.writeSymbol("new", "XML", "(");
								
								stream.writeString(expression.tokenData);
								
								stream.writeSymbol(")");
								break;
						}
					}
					else
					{
						switch (expression.tokenData)
						{
							case "int":
							case "uint":
								stream.writeSymbol("/*" + expression.tokenData + "*/", LIBRARY, ".", expression.tokenData);
								break;
							
							case "Number":
							case "String":
							case "Boolean":
							case "Object":
								stream.writeSymbol(expression.tokenData);
								break;
							
							case "trace":
								stream.writeSymbol(LIBRARY, ".", "trace");
								break;
							
							case "this":
								stream.writeSymbol(THIS);
								break;
							
							case "super":
								var comentStart:Boolean;
								
								if (!expression.context)
								{
									comentStart = true;
									stream.writeSymbol("/*");
								}
								
								stream.writeSymbol(THIS, ".");
								
								stream.writeSymbol(expression.context ? expression.context.name : "Object", "_");
								
								if (expression.child.type == ExpressionType.RUN)
								{
									stream.writeSymbol("constructor");
								}
								else
								{
									expression = expression.child;
									
									if (writeGetProperty(stream, expression, method, info))
									{
										if (comentStart)
										{
											stream.writeSymbol("*/");
										}
										
										return;
									}
								}
								
								if (comentStart)
								{
									if (expression.child)
									{
										expression = expression.child;
										
										writeGetProperty(stream, expression, method, info);
									}
									
									stream.writeSymbol("*/");
								}
								break;
							
							default:
								if (expression.isThisAccess)
								{
									writeThisAccess(stream, expression, info);
									
									if (expression.enabled)
									{
										stream.writeSymbol(".");
										
										if (writeGetProperty(stream, expression, method, info)) return;
									}
								}
								else
								{
									if (expression.enabled)
									{
										if (expression.context && expression.context.data == "Class" && expression.context.child)
										{
											if ((!expression.parent || expression.parent.tokenData != "new") &&
												expression.child && expression.child.type == ExpressionType.RUN)
											{
												stream.writeSymbol("/*" + expression.context.child.data + "*/");
											}
											else
											{
												stream.writeSymbol(expression.context.child.data);
											}
										}
										else if (expression.context && expression.context.data == "Function" && expression.tag)
										{
											stream.writeSymbol(expression.tag.data);
										}
										else
										{
											if (writeGetProperty(stream, expression, method, info)) return;
										}
									}
									else
									{
										stream.writeSymbol("null");
									}
								}
								break;
						}
					}
					break;
				
				case ExpressionType.ELEMENT:
					if (expression.isDictionary || (expression.parent && expression.parent.isDictionary))
					{
						if (expression.child && expression.child.type == ExpressionType.SET)
						{
							stream.writeSymbol(".", "setProperty", "(");
							
							writeBody(stream, expression.body, method, info);
							
							removeSplitter(stream);
							
							stream.writeSymbol(",");
							
							writePath(stream, expression.child.child, method, info, true);
							
							stream.writeSymbol(")");
							
							return;
						}
						else
						{
							stream.writeSymbol(".", "getProperty", "(");
							
							writeBody(stream, expression.body, method, info);
							
							removeSplitter(stream);
							
							stream.writeSymbol(")");
						}
					}
					else
					{
						stream.writeSymbol("[");
						
						writeBody(stream, expression.body, method, info);
						
						removeSplitter(stream);
						
						stream.writeSymbol("]");
					}
					break;
				
				case ExpressionType.RUN:
					stream.writeSymbol("(");
					
					writeBody(stream, expression.body, method, info, COMMA, true);
					
					removeSplitter(stream, COMMA);
					
					stream.writeSymbol(")");
					break;
				
				case ExpressionType.SET:
					stream.writeSymbol(expression.tokenData);
					checkFunction = true;
					break;
				
				case ExpressionType.VECTOR:
					stream.writeSymbol("Array");
					break;
				
				case ExpressionType.DESCENDANT:
					stream.writeSymbol(".", "descendants");
					
					if (expression.child && expression.child.enabled)
					{
						stream.writeSymbol("(", "'", expression.child.tokenData, "'", ")");
						
						if (expression.child.child && expression.child.child.enabled)
						{
							writeExpression(stream, expression.child.child, method, info);
						}
						
						return;
					}
					break;
				
				case ExpressionType.ATTRIBUTE:
					stream.writeSymbol(".", "attribute");
					
					if (expression.child && expression.child.enabled)
					{
						if (expression.child.child && expression.child.child.type == ExpressionType.SET)
						{
							stream.writeSymbol("(", "'", expression.child.tokenData, "'", ",");
							
							if (expression.child.child.child && expression.child.child.child.enabled)
							{
								writeExpression(stream, expression.child.child.child, method, info);
							}
							
							stream.writeSymbol(")");
						}
						else
						{
							stream.writeSymbol("(", "'", expression.child.tokenData, "'", ")");
							
							if (expression.child.child && expression.child.child.enabled)
							{
								writeExpression(stream, expression.child.child, method, info);
							}
						}
						
						return;
					}
					break;
				
				case ExpressionType.FIND:
					var temp:String = info.getTempVariableName(method);
					
					stream.writeSymbol(".", "__find__", "(", "function", "(", temp, ")", "{ ", "return", temp);
					
					writeBody(stream, expression.body, method, info, COMMA, true);
					
					removeSplitter(stream, COMMA);
					
					stream.writeSymbol(" }", ")");
					break;
				
				case ExpressionType.CONSTRUCTION:
					switch (expression.tokenData)
					{
						case "break":
						case "continue":
							stream.writeSymbol(expression.tokenData);
							break;
						
						case "return":
						case "throw":
						case "new":
							stream.writeSymbol(expression.tokenData);
							break;
						
						case "if":
						case "else if":
						case "switch":
						case "while":
							stream.writeSymbol(expression.tokenData);
							writeBlock(stream, "(", ")", expression.body, COMMA, method, info, new Token(TokenType.OPERATOR, ","));
							writeBlock(stream, "{", "}", expression.child.body, SEMICOLON, method, info, null);
							stream.writeSymbol(ENTER);
							return;
						
						case "try":
						case "finally":
							stream.writeSymbol(expression.tokenData);
							writeBlock(stream, "{", "}", expression.body, SEMICOLON, method, info, null);
							stream.writeSymbol(ENTER);
							return;
						
						case "with":
							stream.writeSymbol(expression.tag);
							writeBlock(stream, "{", "}", expression.child.body, SEMICOLON, method, info, null);
							stream.writeSymbol(ENTER);
							return;
						
						case "case":
						case "default":
							stream.writeSymbol(expression.tokenData);
							writeBody(stream, expression.body, method, info, null);
							stream.writeSymbol(":", ENTER);
							return;
						
						case "else":
							stream.writeSymbol(expression.tokenData);
							writeBlock(stream, "{", "}", expression.child.body, SEMICOLON, method, info, null);
							stream.writeSymbol(ENTER);
							return;
						
						case "for":
							if (expression.tag)
							{
								stream.writeSymbol(expression.tag);
							}
							else
							{
								stream.writeSymbol(expression.tokenData);
							}
							
							if (expression.body.length)
							{
								_convertComma = false;
								writeBlock(stream, "(", ")", expression.body, "; ", method, info, new Token(TokenType.OPERATOR, ","));
								_convertComma = true;
							}
							else
							{
								stream.writeSymbol("(;;)");
							}
							
							writeBlock(stream, "{", "}", expression.child.body, SEMICOLON, method, info, null);
							stream.writeSymbol(ENTER);
							return;
						
						case "do while":
							stream.writeSymbol("do");
							writeBlock(stream, "{", "}", expression.body, SEMICOLON, method, info, null);
							stream.writeSymbol("while");
							writeBlock(stream, "(", ")", expression.child.body, COMMA, method, info, new Token(TokenType.OPERATOR, ","));
							stream.writeSymbol(ENTER);
							return;
						
						case "function":
							var bind:Boolean = expression.method.bind;
							
							if (bind) stream.writeSymbol("flash", ".", "bindFunction", "(");
							
							if (bind) stream.writeSymbol("this", ",");
							
							stream.writeSymbol(expression.tokenData);
							
							writeFunction(stream, expression.method, info);
							
							if (bind) stream.writeSymbol(")");
							
							return;
						
						case "catch":
							stream.writeSymbol(expression.tokenData);
							writeFunction(stream, expression.method, info);
							stream.writeSymbol(ENTER);
							return;
						
						case "delete":
							if (expression.peak && expression.peak.type == ExpressionType.ELEMENT &&
								expression.peak.parent && expression.peak.parent.isDictionary)
							{
								expression.peak.enabled = false;
								
								writePath(stream, expression.child, method, info, false);
								
								stream.writeSymbol(".", "deleteProperty", "(");
								
								writeBody(stream, expression.peak.body, method, info);
								
								removeSplitter(stream);
								
								stream.writeSymbol(")");
								
								expression.peak.enabled = true;
								
								return;
							}
							else
							{
								stream.writeSymbol(expression.tokenData);
							}
							break;
						
						case "typeof":
							stream.writeSymbol(expression.tokenData);
							
							writeExpression(stream, expression.child, method, info);
							
							return;
						
						default:
							stream.writeSymbol("/*error: " + expression.tokenData + "*/");
							break;
					}
					break;
				
				case ExpressionType.OBJECT:
					writeObject(stream, expression.properties, method, info);
					break;
				
				case ExpressionType.ARRAY:
					writeBlock(stream, "[", "]", expression.body, COMMA, method, info, null);
					break;
				
				case ExpressionType.BLOCK:
					writeBlock(
						stream,
						expression.tokenData,
						TokenType.getPairedSymbol(expression.tokenData),
						expression.body,
						SEMICOLON,
						method,
						info, null
					);
					break;
				
				case ExpressionType.OPERATION:
					switch (expression.tokenData)
					{
						case "as":
							while (expression.child && expression.child.isAccess)
							{
								expression = expression.child;
							}
							break;
						
						case "is":
							stream.writeSymbol("instanceof");
							break;
						
						case ":":
							removeSplitter(stream);
							stream.writeSymbol(":");
							break;
						
						case "::":
							stream.writeSymbol(".");
							break;
						
						case ",":
							if (_convertComma)
							{
								stream.writeSymbol(";");
							}
							else
							{
								stream.writeSymbol(",");
							}
							break;
						
						default:
							stream.writeSymbol(expression.tokenData);
							break;
					}
					break;
				
				default:
					stream.writeSymbol("/*expression*/");
					break;
			}
			
			if (expression.child && expression.child.enabled)
			{
				writePath(stream, expression.child, method, info, checkFunction);
			}
		}
		
		private function writeGetProperty(stream:Token, expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):Boolean
		{
			var isProperty:Boolean = expression.isProperty;
			
			if (expression.child && expression.child.type == ExpressionType.SET)
			{
				if (isProperty)
				{
					if (expression.child.enabled)
					{
						stream.writeSymbol("set_" + expression.tokenData, "(");
						
						var operation:String = expression.child.tokenData.charAt(0);
						
						switch (expression.child.tokenData)
						{
							case "=":
								writePath(stream, expression.child.child, method, info, true);
								break;
							
							default:
								var path:ExpressionInfo = expression.rootPath;
								
								expression.child.enabled = false;
								
								writeExpression(stream, path, method, info);
								
								expression.child.enabled = true;
								
								stream.writeSymbol(operation);
								
								if (expression.child.child)
								{
									stream.writeSymbol("(");
									
									writeExpression(stream, expression.child.child, method, info);
									
									stream.writeSymbol(")");
								}
								else
								{
									stream.writeSymbol("1");
								}
								break;
						}
						
						stream.writeSymbol(")");
					}
					else
					{
						stream.writeSymbol("get_" + expression.tokenData, "(", ")");
					}
					
					return true;
				}
				else
				{
					stream.writeSymbol(expression.tokenData);
					
					if (expression.context &&
						expression.child.tokenData != "++" && expression.child.tokenData != "--" &&
						(expression.context.data == "int" || expression.context.data == "uint") &&
						expression.child.child)
					{
						var context:NamespaceInfo = CodeAnalyzator.getExpressionContext(expression.child.child, info);
						
						if (!context || (context.data != "uint" && context.data != "int"))
						{
							stream.writeSymbol(expression.child.tokenData);
							
							stream.writeSymbol("/*int*/", LIBRARY, ".", expression.context.data, "(");
							
							writeExpression(stream, expression.child.child, method, info);
							
							stream.writeSymbol(")");
							
							return true;
						}
					}
				}
			}
			else
			{
				if (isProperty)
				{
					stream.writeSymbol("get_" + expression.tokenData, "(", ")");
				}
				else if (
					expression.tokenData != "__find__" &&
					expression.parent &&
					expression.parent.context &&
					(
						expression.parent.context.data == "XML" ||
						expression.parent.context.data == "XMLList"
					) &&
					
					expression.context &&
					(
						expression.context.data == "XML" ||
						expression.context.data == "XMLList" ||
						expression.context.data == "Function"
					)
				)
				{
					var member:MemberInfo = ClassInfo.getClass("XML").getMember(expression.tokenData);
					
					var isChild:Boolean = false;
					
					if (member)
					{
						if (member is MethodInfo)
						{
							if (!expression.child || expression.child.type != ExpressionType.RUN)
							{
								isChild = true;
							}
						}
					}
					else
					{
						isChild = true;
					}
					
					if (isChild)
					{
						stream.writeSymbol("child", "(", "\"", expression.tokenData, "\"", ")");
					}
					else
					{
						stream.writeSymbol(expression.tokenData);
					}
				}
				else
				{
					stream.writeSymbol(expression.tokenData);
				}
			}
			
			return false;
		}
		
		private function writeThisAccess(stream:Token, expression:ExpressionInfo, info:ClassInfo):void
		{
			if (expression.tag)
			{
				stream.writeSymbol(expression.tag);
			}
			else if (expression.member.statique)
			{
				var current:ClassInfo = info.getClassByMember(expression.member);
				
				if (!current) current = info;
				
				stream.writeSymbol(current.fullName);
			}
			else
			{
				stream.writeSymbol(THIS);
			}
		}
		
		private function writeObject(stream:Token, properties:Vector.<Object>, method:MethodInfo, info:ClassInfo):void
		{
			stream.writeSymbol("{");
			
			for each (var property:Object in properties)
			{
				stream.writeSymbol(property.name, ":");
				
				writePath(stream, ExpressionInfo(property.value), method, info, true);
				
				writeSplitter(stream, COMMA);
			}
			
			removeSplitter(stream, COMMA);
			
			stream.writeSymbol("}");
		}
		
		private function writeBlock(stream:Token, begin:String, end:String, body:Vector.<ExpressionInfo>, splitter:String, method:MethodInfo, info:ClassInfo, ignoreSplitterToken:Token):void
		{
			stream.writeSymbol(begin);
			
			writeBody(stream, body, method, info, splitter, false, ignoreSplitterToken);
			
			removeSplitter(stream, splitter);
			
			stream.writeSymbol(end);
		}
	}
}