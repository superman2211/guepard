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
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class AS3Writer extends CodeWriter
	{
		public static const DESCRIPTION:String = "description";
		public static const STATICAL:String = "statical";
		
		private var _convertComma:Boolean = true;
		
		public function AS3Writer(info:ClassInfo)
		{
			super(info);
		}
		
		override public function write():void
		{
			super.write();
			
			var stream:Token = new Token();
			
			writePackage(stream, info);
			
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
			writeImports(stream, info);
			
			stream.writeSymbol("public");
			
			if (info.isClass)
			{
				stream.writeSymbol("class");
			}
			else
			{
				stream.writeSymbol("interface");
			}
			
			stream.writeSymbol(info.name);
			
			if (info.extendsInfo && info.extendsInfo.data)
			{
				stream.writeSymbol("extends", info.extendsInfo.data);
			}
			
			stream.writeSymbol("{");
			
			writeProperties(stream, info);
			writeMethods(stream, info);
			
			stream.writeSymbol("}");
		}
		
		private function writePackage(stream:Token, info:ClassInfo):void
		{
			stream.writeSymbol("package");
			
			if (info.packageInfo && info.packageInfo.data)
			{
				stream.writeSymbol(info.packageInfo.data);
			}
			
			stream.writeSymbol("{");
			
			writeClass(stream, info);
			
			stream.writeSymbol("}");
		}
		
		private function writeImports(stream:Token, info:ClassInfo):void
		{
			if (info.importsInfo.length)
			{
				for each(var importInfo:NamespaceInfo in info.importsInfo)
				{
					stream.writeSymbol("import ", importInfo.data, ";");
				}
				
				stream.writeSymbol(ENTER);
			}
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
			
			stream.writeSymbol("flash", ".", "addDescription", "(", '"', info.fullName, '"', ",");
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
		
		private function writeProperties(stream:Token, info:ClassInfo):void
		{
			if (info.variablesInfo && info.variablesInfo.length)
			{
				for each (var variable:VariableInfo in info.variablesInfo)
				{
					writeMember(stream, variable, info);
					
					if (variable.constant)
					{
						stream.writeSymbol("const");
					}
					else
					{
						stream.writeSymbol("var");
					}
					
					writeProperty(stream, variable, info);
				}
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeMember(stream:Token, member:MemberInfo, info:ClassInfo):void
		{
			if (member.tag)
			{
				writeTag(stream, member.tag, info);
			}
			
			stream.writeSymbol(member.access);
			
			if (member.statique)
			{
				stream.writeSymbol("static");
			}
		}
		
		private function writeType(stream:Token, member:MemberInfo):void
		{
			stream.writeSymbol(":");
			
			if (member.type)
			{
				stream.writeSymbol(member.type.data);
			}
			else
			{
				stream.writeSymbol("Object");
			}
		}
		
		private function writeTag(stream:Token, tag:TagInfo, info:ClassInfo):void
		{
			stream.writeSymbol(ENTER, "[", tag.type);
			
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
			
			stream.writeSymbol("]", ENTER);
		}
		
		private function writeProperty(stream:Token, variable:VariableInfo, info:ClassInfo):void
		{
			stream.writeSymbol(variable.name);
			
			writeType(stream, variable);
			
			if (variable.body)
			{
				stream.writeSymbol("=");
				
				writeBody(stream, variable.body, null, info);
			}
			
			writeSplitter(stream);
		}
		
		private function writeBody(stream:Token, body:Vector.<ExpressionInfo>, method:MethodInfo, info:ClassInfo, splitter:String = SEMICOLON, ignoreSplitterToken:Token = null):void
		{
			if (!body) return;
			
			for (var i:int = 0; i < body.length; i++)
			{
				var expression:ExpressionInfo = body[i];
				
				writeExpression(stream, expression, method, info);
				
				if (splitter && stream.length && stream.lastToken.data != ENTER)
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
		}
		
		private function writeMethods(stream:Token, info:ClassInfo):void
		{
			if (info.methodsInfo && info.methodsInfo.length)
			{
				for each(var method:MethodInfo in info.methodsInfo)
				{
					if (method.overrided)
					{
						stream.writeSymbol("override");
					}
					
					if (method.finalMethod)
					{
						stream.writeSymbol("final");
					}
					
					writeMember(stream, method, info);
					
					writeMethod(stream, method, info);
				}
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeMethod(stream:Token, method:MethodInfo, info:ClassInfo):void
		{
			if (method.methodType == MethodType.GETTER)
			{
				stream.writeSymbol("get");
			}
			else if (method.methodType == MethodType.SETTER)
			{
				stream.writeSymbol("set");
			}
			
			stream.writeSymbol("function", method.name);
			
			writeFunction(stream, method, info);
			
			stream.writeSymbol(ENTER);
		}
		
		private function writeFunction(stream:Token, method:MethodInfo, info:ClassInfo):void
		{
			stream.writeSymbol("(");
			
			writeParameters(stream, method, info);
			
			stream.writeSymbol(")");
			
			writeType(stream, method);
			
			stream.writeSymbol("{");
			
			if (method.body)
			{
				writeLocals(stream, method, info);
				
				writeBody(stream, method.body, method, info);
			}
			
			stream.writeSymbol("}");
		}
		
		private function writeParameters(stream:Token, method:MethodInfo, info:ClassInfo):void
		{
			if (method.parameters && method.parameters.length)
			{
				for (var i:int = 0; i < method.parameters.length; i++)
				{
					var parameter:VariableInfo = method.parameters[i];
					
					if (i != 0)
					{
						stream.writeSymbol(",");
					}
					
					if (parameter.multiply)
					{
						stream.writeSymbol("...");
					}
					
					stream.writeSymbol(parameter.name);
					
					writeType(stream, parameter);
					
					if (parameter.body)
					{
						stream.writeSymbol("=");
						
						writeBody(stream, parameter.body, null, info);
					}
				}
			}
		}
		
		private function writeLocals(stream:Token, method:MethodInfo, info:ClassInfo):void
		{
			var type:String;
			
			if (method.locals && method.locals.length)
			{
				for each (var local:VariableInfo in method.locals)
				{
					stream.writeSymbol("var", local.name);
					
					writeType(stream, local);
					
					writeSplitter(stream);
				}
				
				stream.writeSymbol(ENTER);
			}
		}
		
		private function writeExpression(stream:Token, expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			if (expression)
			{
				var checkFunction:Boolean = false;
				
				switch (expression.type)
				{
					case ExpressionType.GET:
						if (expression.parent && expression.parent.isAccess)
						{
							stream.writeSymbol(".");
							
							//if (writeGetProperty(stream, expression, method, info)) return;
							writeGetProperty(stream, expression, method, info);
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
								case TokenType.NATIVE_XML:
									stream.writeSymbol(expression.tokenData);
									break;
								
								default:
									stream.writeSymbol("/*error: " + expression.tokenData + "*/");
									break;
							}
						}
						else
						{
							if (expression.tokenData)
							{
								stream.writeSymbol(expression.tokenData);
							}
						}
						break;
					
					case ExpressionType.ELEMENT:
						stream.writeSymbol("[");
						
						writeBody(stream, expression.body, method, info);
						
						removeSplitter(stream);
						
						stream.writeSymbol("]");
						break;
					
					case ExpressionType.RUN:
						stream.writeSymbol("(");
						
						writeBody(stream, expression.body, method, info, COMMA);
						
						removeSplitter(stream, COMMA);
						
						stream.writeSymbol(")");
						break;
					
					case ExpressionType.SET:
						stream.writeSymbol(expression.tokenData);
						break;
					
					case ExpressionType.VECTOR:
						stream.writeSymbol(expression.about);
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
							case "for each":
								stream.writeSymbol(expression.tokenData);
								
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
							case "catch":
								stream.writeSymbol(expression.tokenData);
								writeFunction(stream, expression.method, info);
								stream.writeSymbol(ENTER);
								return;
							
							case "delete":
								stream.writeSymbol(expression.tokenData);
								break;
							
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
						stream.writeSymbol(expression.tokenData);
						break;
				}
				
				if (expression.child && expression.child.enabled)
				{
					writeExpression(stream, expression.child, method, info);
				}
			}
			else
			{
				stream.writeSymbol(";");
			}
		}
		
		private function writeGetProperty(stream:Token, expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			stream.writeSymbol(expression.tokenData);
		}
		
		private function writeObject(stream:Token, properties:Vector.<Object>, method:MethodInfo, info:ClassInfo):void
		{
			stream.writeSymbol("{");
			
			for each (var property:Object in properties)
			{
				stream.writeSymbol(property.name, ":");
				
				writeExpression(stream, ExpressionInfo(property.value), method, info);
				
				writeSplitter(stream, COMMA);
			}
			
			removeSplitter(stream, COMMA);
			
			stream.writeSymbol("}");
		}
		
		private function writeBlock(stream:Token, begin:String, end:String, body:Vector.<ExpressionInfo>, splitter:String, method:MethodInfo, info:ClassInfo, ignoreSplitterToken:Token):void
		{
			stream.writeSymbol(begin);
			
			writeBody(stream, body, method, info, splitter, ignoreSplitterToken);
			
			removeSplitter(stream, splitter);
			
			stream.writeSymbol(end);
		}
	}
}