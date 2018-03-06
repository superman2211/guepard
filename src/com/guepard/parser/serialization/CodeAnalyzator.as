package com.guepard.parser.serialization
{
//	import adobe.utils.CustomActions;
//	import calista.hash.Blowfish;
	import com.guepard.app.Converter;
	import com.guepard.parser.info.AccessType;
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.info.ExpressionInfo;
	import com.guepard.parser.info.ExpressionType;
	import com.guepard.parser.info.MemberInfo;
	import com.guepard.parser.info.MethodInfo;
	import com.guepard.parser.info.MethodType;
	import com.guepard.parser.info.NamespaceInfo;
	import com.guepard.parser.info.VariableInfo;
	import com.guepard.parser.info.VariableType;
	import com.guepard.parser.token.Token;
	import com.guepard.parser.token.TokenType;
	
	import flash.utils.Dictionary;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class CodeAnalyzator
	{
		public static const ITERATIONS_MAX:int = 10;
		
		private static var _errors:Vector.<String> = new Vector.<String>;
		private static var _warnings:Vector.<String> = new Vector.<String>;
		
		static public function get hasErrors():Boolean
		{
			return _errors.length || _warnings.length;
		}
		
		static public function clear():void
		{
			_errors.length = 0;
			_warnings.length = 0;
		}
		
		public static function analyzeClass(info:ClassInfo):void
		{
			updateTypes(info);
			
			correctConstructor(info);
		}
		
		public static function correctClass(info:ClassInfo):void
		{
			analyzeContext(info);
			
			correctTypes(info);
			
			correctMethods(info);
		}
		
		static public function traceErrors():void
		{
			var data:String;
			
			for each(data in _errors)
			{
				Converter.output.error(data);
			}
			
			for each(data in _warnings)
			{
				Converter.output.warning(data);
			}
		}
		
		static public function getExpressionContext(expression:ExpressionInfo, info:ClassInfo):NamespaceInfo
		{
			if (!expression) return null;
			
			var contexts:Vector.<NamespaceInfo> = new Vector.<NamespaceInfo>();
			
			while (expression)
			{
				switch (expression.type)
				{
					case ExpressionType.OPERATION:
						switch (expression.tokenData)
						{
							case ">":
							case ">=":
							case "<":
							case "<=":
							case "==":
							case "===":
							case "!":
							case "!=":
							case "!==":
								return new NamespaceInfo("Boolean");
							
							case ">>":
							case ">>>":
							case "<<":
							case "<<<":
							case "|":
							case "&":
								return new NamespaceInfo("int");
							
							case "/":
							case "*":
								return new NamespaceInfo("Number");
						}
						break;
					
					default:
						if (expression.isAccess && (!expression.child || !expression.child.isAccess))
						{
							if (expression.context)
							{
								contexts.push(expression.context);
							}
						}
						break;
				}
				
				expression = expression.child;
			}
			
			if (contexts.length)
			{
				if (contexts.length == 1) return contexts[0];
				
				var containsString:Boolean = false;
				var containsNumber:Boolean = false;
				
				for each(var context:NamespaceInfo in contexts)
				{
					switch (context.data)
					{
						case "String":
							containsString = true;
							break;
						
						case "Number":
							containsNumber = true;
							break;
					}
				}
				
				if (containsString) return new NamespaceInfo("String");
				if (containsNumber) return new NamespaceInfo("Number");
				else return contexts[0];
			}
			
			return null;
		}
		
		static private function correctMethods(info:ClassInfo):void
		{
			for each(var method:MethodInfo in info.methodsInfo)
			{
				removeEndReturn(method.body, info);
				
				correctBody(method.body, method, info);
			}
		}
		
		static private function correctBody(body:Vector.<ExpressionInfo>, method:MethodInfo, info:ClassInfo):void
		{
			if (!body) return;
			
			for each(var expression:ExpressionInfo in body)
			{
				if (expression)
				{
					correctExpression(expression, method, info);
				}
			}
		}
		
		static private function correctExpression(expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			if (expression.type == ExpressionType.CONSTRUCTION && expression.tokenData == "for")
			{
				correctForConstruction(expression, method, info);
			}
			else if (expression.type == ExpressionType.CONSTRUCTION && expression.tokenData == "for each")
			{
				correctForEachConstruction(expression, method, info);
			}
			else if (expression.type == ExpressionType.CONSTRUCTION && expression.tokenData == "with")
			{
				correctWithConstruction(expression, method, info);
			}
			else if (expression.type == ExpressionType.FIND)
			{
				correctNativeXMLFind(expression, method, info);
			}
			
			if (expression.child)
			{
				correctExpression(expression.child, method, info);
			}
			
			if (expression.body)
			{
				correctBody(expression.body, method, info);
			}
		}
		
		static private function correctNativeXMLFind(expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			var temp:String = info.getTempVariableName(method);
			
			var find:ExpressionInfo = new ExpressionInfo();
			find.type = ExpressionType.GET;
			find.token = new Token(TokenType.UNKNOWN, "__find__");
			find.context = new NamespaceInfo("Function");
			find.context.child = new NamespaceInfo("XML");
			
			var run:ExpressionInfo = new ExpressionInfo();
			run.type = ExpressionType.RUN;
			run.context = new NamespaceInfo("XML");
			
			var parameter:VariableInfo = new VariableInfo();
			parameter.name = temp;
			parameter.type = new NamespaceInfo("XML");
			parameter.variableType = VariableType.PARAMETER;
			
			var condition:ExpressionInfo = new ExpressionInfo();
			condition.token = new Token(TokenType.KEYWORD, "return");
			condition.type = ExpressionType.CONSTRUCTION;
			
			condition.child = new ExpressionInfo();
			condition.child.type = ExpressionType.GET;
			condition.child.token = new Token(TokenType.UNKNOWN, temp);
			condition.child.context = new NamespaceInfo("XML");
			condition.child.member = parameter;
			condition.child.child = expression.body[0];
			
			condition.child = correctCastExpression(condition.child);
			
			var anonymous:ExpressionInfo = new ExpressionInfo();
			anonymous.type = ExpressionType.CONSTRUCTION;
			anonymous.token = new Token(TokenType.KEYWORD, "function");
			anonymous.body = new Vector.<ExpressionInfo>();
			
			anonymous.method = new MethodInfo();
			anonymous.method.methodType = MethodType.ANONYMOUS;
			anonymous.method.type = new NamespaceInfo("Boolean");
			anonymous.method.parameters = new Vector.<VariableInfo>();
			anonymous.method.parameters.push(parameter);
			anonymous.method.bind = false;
			anonymous.method.body = new Vector.<ExpressionInfo>();
			anonymous.method.body.push(condition);
			
			run.body = new Vector.<ExpressionInfo>();
			run.body.push(anonymous);
			
			expression.parent.child = find;
			find.child = run;
			run.child = expression.child;
		}
		
		static private function correctCastExpression(expression:ExpressionInfo):ExpressionInfo
		{
			var left:ExpressionInfo = expression;
			var operation:ExpressionInfo = expression.getChildByType(ExpressionType.OPERATION);
			var right:ExpressionInfo = operation.child;
			
			if (right.context)
			{
				var type:String = null;
				
				switch (right.context.data)
				{
					case "Number":
					case "int":
					case "uint":
					case "String":
					case "Boolean":
						type = right.context.data;
						break;
					
					default:
						type = "String";
						break;
				}
				
				var cast:ExpressionInfo = new ExpressionInfo();
				cast.type = ExpressionType.GET;
				cast.token = new Token(TokenType.UNKNOWN, type);
				
				cast.child = new ExpressionInfo();
				cast.child.type = ExpressionType.RUN;
				cast.child.token = new Token(TokenType.OPERATOR, "(");
				cast.child.body = new Vector.<ExpressionInfo>();
				cast.child.body.push(left);
				
				operation.parent = null;
				
				cast.child.child = operation;
				
				left = cast;
			}
			
			return left;
		}
		
		static private function correctWithConstruction(expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			if (expression.tag) return;
			
			var condition:ExpressionInfo = expression.body && expression.body.length == 1 ? expression.body[0] : null;
			
			if (condition && condition.context)
			{
				expression.tag = "/*with*/";
				
				var temp:VariableInfo = new VariableInfo();
				temp.variableType = VariableType.LOCAL;
				temp.name = info.getTempVariableName(method);
				temp.type = condition.context;
				method.locals.push(temp);
				
				var declaration:ExpressionInfo = new ExpressionInfo();
				declaration.type = ExpressionType.GET;
				declaration.token = new Token(TokenType.UNKNOWN, temp.name);
				declaration.context = temp.type;
				declaration.member = temp;
				
				declaration.child = new ExpressionInfo();
				declaration.child.type = ExpressionType.SET;
				declaration.child.token = new Token(TokenType.OPERATOR, "=");
				
				declaration.child.child = condition.clone();
				
				var currentInfo:ClassInfo = ClassInfo.getClass(condition.context.data);
				
				setAnvancedContext(expression.child, currentInfo, temp.name);
				
				expression.child.body.unshift(declaration);
			}
		}
		
		static private function setAnvancedContext(expression:ExpressionInfo, info:ClassInfo, name:String):void
		{
			if (info.containsMember(expression.member))
			{
				expression.tag = name;
			}
			
			for each(var e:ExpressionInfo in expression.body)
			{
				setAnvancedContext(e, info, name);
			}
			
			if (expression.child)
			{
				setAnvancedContext(expression.child, info, name);
			}
		}
		
		static private function correctForConstruction(expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			if (expression.tag) return;
			
			var condition:ExpressionInfo = expression.body && expression.body.length == 1 ? expression.body[0] : null;
			
			if (condition)
			{
				var operator:ExpressionInfo = condition.getChildByData("in");
				
				if (operator)
				{
					var iterator:ExpressionInfo = operator.root;
					var array:ExpressionInfo = operator.child;
					
					if (iterator && array && array.peak && array.peak.isDictionary)
					{
						expression.token.data = "for";
						expression.tag = "for/*dictionary*/";
						
						var temp:VariableInfo = new VariableInfo();
						temp.variableType = VariableType.LOCAL;
						temp.name = info.getTempVariableName(method);
						temp.type = new NamespaceInfo("String");
						method.locals.push(temp);
						
						var keys:ExpressionInfo = new ExpressionInfo();
						keys.type = ExpressionType.GET;
						keys.token = new Token(TokenType.UNKNOWN, "_keys");
						keys.context = new NamespaceInfo("Array");
						array.peak.child = keys;
						
						condition = condition.clone();
						condition.token = new Token(TokenType.UNKNOWN, temp.name);
						condition.context = temp.type;
						condition.member = temp;
						expression.body[0] = condition;
						
						iterator = iterator.clone();
						iterator.child = new ExpressionInfo();
						iterator.child.type = ExpressionType.SET;
						iterator.child.token = new Token(TokenType.OPERATOR, "=");
						
						array = array.clone();
						
						iterator.child.child = array;
						
						condition = condition.clone();
						condition.child = null;
						
						array = array.peak;
						array.child = new ExpressionInfo();
						array.child.type = ExpressionType.ELEMENT;
						array.child.token = new Token(TokenType.OPERATOR, "[");
						array.child.body = new Vector.<ExpressionInfo>();
						array.child.body.push(condition);
						
						expression.child.body.unshift(iterator);
					}
				}
			}
		}
		
		static private function correctForEachConstruction(expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			if (expression.tag) return;
			
			var condition:ExpressionInfo = expression.body && expression.body.length == 1 ? expression.body[0] : null;
			
			if (condition)
			{
				var operator:ExpressionInfo = condition.getChildByData("in");
				
				if (operator)
				{
					var iterator:ExpressionInfo = operator.root;
					var array:ExpressionInfo = operator.child;
					
					if (iterator && array)
					{
						expression.token.data = "for";
						expression.tag = "for/*each*/";
						
						var temp:VariableInfo = new VariableInfo();
						temp.variableType = VariableType.LOCAL;
						temp.name = info.getTempVariableName(method);
						temp.type = new NamespaceInfo("String");
						method.locals.push(temp);
						
						if (array.peak && array.peak.isDictionary)
						{
							expression.tag = "for/*each dictionary*/";
							
							var values:ExpressionInfo = new ExpressionInfo();
							values.type = ExpressionType.GET;
							values.token = new Token(TokenType.UNKNOWN, "_values");
							values.context = new NamespaceInfo("Array");
							array.peak.child = values;
						}
						
						condition = condition.clone();
						condition.token = new Token(TokenType.UNKNOWN, temp.name);
						condition.context = temp.type;
						condition.member = temp;
						expression.body[0] = condition;
						
						iterator = iterator.clone();
						iterator.child = new ExpressionInfo();
						iterator.child.type = ExpressionType.SET;
						iterator.child.token = new Token(TokenType.OPERATOR, "=");
						
						array = array.clone();
						
						iterator.child.child = array;
						
						condition = condition.clone();
						condition.child = null;
						
						array = array.peak;
						array.child = new ExpressionInfo();
						array.child.type = ExpressionType.ELEMENT;
						array.child.token = new Token(TokenType.OPERATOR, "[");
						array.child.body = new Vector.<ExpressionInfo>();
						array.child.body.push(condition);
						
						expression.child.body.unshift(iterator);
					}
					else
					{
						errorMessage("Iterator or Array not found in 'for each'", info, true);
					}
				}
				else
				{
					errorMessage("Operator 'in' not found in 'for each'", info, true);
				}
			}
			else
			{
				errorMessage("Condition not found in 'for each'", info, true);
			}
		}
		
		static private function removeEndReturn(body:Vector.<ExpressionInfo>, info:ClassInfo):void
		{
			if (body && body.length)
			{
				var expression:ExpressionInfo = body[body.length - 1];
				
				if (expression &&
					expression.type == ExpressionType.CONSTRUCTION &&
					expression.tokenData == "return" &&
					!expression.child)
				{
					body.length--;
					return;
				}
			}
		}
		
		static private function correctConstructor(info:ClassInfo):void
		{
			var method:MethodInfo = info.constructor;
			
			if (!method)
			{
				method = new MethodInfo();
				method.access = AccessType.PUBLIC;
				method.name = info.name;
				method.body = new Vector.<ExpressionInfo>();
				info.methodsInfo.push(method);
			}
			
			if (method.body && info.extendsInfo && info.extendsInfo.data != "Object" && !containsRunSuper(method.body))
			{
				var superExpression:ExpressionInfo = new ExpressionInfo();
				superExpression.type = ExpressionType.GET;
				superExpression.token = new Token(TokenType.UNKNOWN, "super");
				superExpression.context = info.extendsInfo;
				
				superExpression.child = new ExpressionInfo();
				superExpression.child.type = ExpressionType.RUN;
				superExpression.child.token = new Token(TokenType.BLOCK, "(");
				superExpression.child.context = info.extendsInfo;
				
				method.body.unshift(superExpression);
			}
		}
		
		static private function containsRunSuper(body:Vector.<ExpressionInfo>):Boolean
		{
			for each(var expression:ExpressionInfo in body)
			{
				if (expression &&
					expression.type == ExpressionType.GET &&
					expression.tokenData == "super" &&
					expression.child &&
					expression.child.type == ExpressionType.RUN)
				{
					return true;
				}
			}
			
			return false;
		}
		
		static private function updateTypes(info:ClassInfo):void
		{
			var method:MethodInfo;
			var variable:VariableInfo;
			var name:NamespaceInfo;
			
			updateType(info.extendsInfo, info);
			
			for each(name in info.implementsInfo)
			{
				updateType(name, info);
			}
			
			for each(variable in info.variablesInfo)
			{
				updateMemberType(variable, info);
			}
			
			for each(method in info.methodsInfo)
			{
				updateMethodType(method, info);
			}
			
			for each(var child:ClassInfo in info.classesInfo)
			{
				updateTypes(child);
			}
		}
		
		static private function updateMemberType(member:MemberInfo, info:ClassInfo):void
		{
			if (member.type)
			{
				if (member.type.data == "*")
				{
					member.type = null;
				}
				else
				{
					updateType(member.type, info);
				}
			}
		}
		
		static private function updateMethodType(method:MethodInfo, info:ClassInfo):void
		{
			if (method)
			{
				var variable:VariableInfo;
				
				for each(variable in method.parameters)
				{
					updateMemberType(variable, info);
				}
				
				for each(variable in method.locals)
				{
					updateMemberType(variable, info);
				}
				
				updateMemberType(method, info);
			}
		}
		
		static private function updateType(type:NamespaceInfo, info:ClassInfo):void
		{
			if (type)
			{
				var importInfo:ClassInfo = info.getImportClass(type.peak.data);
				
				if (importInfo)
				{
					type.peak.data = importInfo.fullName;
				}
				else
				{
					errorMessage("Import class not found, Name: " + type.peak.data, info, false);
				}
			}
		}
		
		static private function correctTypes(info:ClassInfo):void
		{
			var method:MethodInfo;
			var variable:VariableInfo;
			
			for each(variable in info.variablesInfo)
			{
				if (!variable.type)
				{
					variable.type = getBodyContext(variable.body, info);
					
					if (!variable.type)
					{
						errorMessage("Type error: type not found. Variable: " + variable.name, info, false);
					}
				}
			}
			
			for each(method in info.methodsInfo)
			{
				for each(variable in method.parameters)
				{
					if (!variable.type)
					{
						if (variable.multiply)
						{
							variable.type = new NamespaceInfo("Array");
						}
						else
						{
							variable.type = getBodyContext(variable.body, info);
						}
					}
				}
				
				correctSetTypes(method.body, method, info);
				
				if (!method.type && (info.isFunction || method.name != info.name))
				{
					var data:Object = {};
					data.hasReturn = false;
					
					method.type = getMethodBodyContext(method.body, info, data);
					
					if (!method.type)
					{
						if (data.hasReturn)
						{
							errorMessage("Type error: type not found. Method: " + method.name, info, false);
						}
						else
						{
							method.type = new NamespaceInfo("void");
						}
					}
				}
				
				for each(variable in method.parameters)
				{
					if (!variable.type)
					{
						errorMessage("Type error: type not found. Parameter: " + variable.name + ". In method: " + method.name, info, false);
					}
				}
				
				for each(variable in method.locals)
				{
					if (!variable.type)
					{
						errorMessage("Type error: type not found. Local: " + variable.name + ". In method: " + method.name, info, false);
					}
				}
			}
			
			for each(var child:ClassInfo in info.classesInfo)
			{
				correctTypes(child);
			}
		}
		
		static private function correctSetTypes(body:Vector.<ExpressionInfo>, method:MethodInfo, info:ClassInfo):void
		{
			if (body && body.length)
			{
				for each(var expression:ExpressionInfo in body)
				{
					correctSetExpressionType(expression, method, info);
				}
			}
		}
		
		static private function correctSetExpressionType(expression:ExpressionInfo, method:MethodInfo, info:ClassInfo):void
		{
			if (!expression) return;
			
			if (expression.type == ExpressionType.SET)
			{
				var context:NamespaceInfo = null;
				
				if (expression.tokenData == "++" || expression.tokenData == "--")
				{
					context = new NamespaceInfo("Number");
				}
				else
				{
					context = getExpressionContext(expression.child, info);
				}
				
				if (context)
				{
					if (expression.parent &&
						expression.parent.type == ExpressionType.ELEMENT &&
						expression.parent.parent &&
						expression.parent.parent.context &&
						expression.parent.parent.context.data == "Array")
					{
						expression.parent.context = context;
						
						expression.parent.parent.context = new NamespaceInfo("Vector", context);
						
						setLocalContext(
							expression.parent.parent.parent,
							expression.parent.parent.tokenData,
							expression.parent.parent.context,
							method,
							info,
							true
						);
						
						errorMessage("Convert Array to Vector warning", info, false);
					}
					else if (expression.parent &&
						expression.parent.isAccess &&
						!expression.parent.context)
					{
						expression.parent.context = context;
						
						setLocalContext(
							expression.parent.parent,
							expression.parent.tokenData,
							context,
							method,
							info,
							false
						);
					}
				}
			}
			
			correctSetTypes(expression.body, method, info)
			
			if (expression.child)
			{
				correctSetExpressionType(expression.child, method, info);
			}
		}
		
		static private function setLocalContext(expression:ExpressionInfo, name:String, context:NamespaceInfo, method:MethodInfo, info:ClassInfo, reset:Boolean):void
		{
			var variable:VariableInfo;
			
			if (expression)
			{
				if (name == "[" && context.data == "Vector" && reset)
				{
					context = new NamespaceInfo("Vector", context);
					
					setLocalContext(
						expression.parent,
						expression.tokenData,
						context,
						method,
						info,
						reset
					);
				}
				else if (expression.context)
				{
					var parentClass:ClassInfo;
					
					if (expression.context.data == "Class")
					{
						parentClass = ClassInfo.getClass(expression.context.childName);
					}
					else
					{
						parentClass = ClassInfo.getClass(expression.context.data);
					}
					
					if (parentClass)
					{
						setMemberContext(name, context, parentClass, reset);
					}
				}
			}
			else
			{
				variable = method.getLocal(name);
				
				if (variable)
				{
					if (reset || !variable.type)
					{
						variable.type = context;
					}
				}
				else
				{
					variable = method.getParameter(name);
					
					if (variable && !variable.multiply)
					{
						if (reset || !variable.type)
						{
							variable.type = context;
						}
					}
					else
					{
						setMemberContext(name, context, info, reset);
					}
				}
			}
		}
		
		static private function setMemberContext(name:String, context:NamespaceInfo, info:ClassInfo, reset:Boolean):void
		{
			var member:MemberInfo = info.getMember(name);
			
			if (member && member is VariableInfo && (reset || !member.type))
			{
				var variable:VariableInfo = VariableInfo(member);
				
				if (variable.variableType == VariableType.PROPERTY)
				{
					if (variable.getter)
					{
						variable.getter.type = context;
					}
					
					if (variable.setter && variable.setter.parameters.length)
					{
						variable.setter.parameters[0].type = context;
					}
				}
				else
				{
					variable.type = context;
				}
			}
		}
		
		static private function analyzeContext(info:ClassInfo):void
		{
			var method:MethodInfo;
			var variable:VariableInfo;
			
			for each(variable in info.variablesInfo)
			{
				info.addRequiredClassesEnabled = variable.statique;
				
				analyzeBodyContext(variable.body, null, info, null);
				
				info.addRequiredClassesEnabled = false;
			}
			
			for each(method in info.methodsInfo)
			{
				info.addRequiredClassesEnabled = method.statique;
				
				analyzeMethodBodyContext(method, info, null);
				
				info.addRequiredClassesEnabled = false;
			}
			
			for each(var child:ClassInfo in info.classesInfo)
			{
				analyzeContext(child);
			}
		}
		
		static private function analyzeMethodBodyContext(method:MethodInfo, info:ClassInfo, advanced:NamespaceInfo):void
		{
			if (method)
			{
				var variable:VariableInfo;
				
				for each(variable in method.parameters)
				{
					analyzeBodyContext(variable.body, null, info, advanced);
				}
				
				analyzeBodyContext(method.body, method, info, advanced);
			}
		}
		
		private static function analyzeBodyContext(body:Vector.<ExpressionInfo>, method:MethodInfo, info:ClassInfo, advanced:NamespaceInfo):void
		{
			if (body && body.length)
			{
				for each(var expression:ExpressionInfo in body)
				{
					analyzeExpressionContext(expression, method, info, advanced);
				}
			}
		}
		
		static private function analyzeExpressionContext(expression:ExpressionInfo, method:MethodInfo, info:ClassInfo, advanced:NamespaceInfo):void
		{
			if (expression)
			{
				analyzeBodyContext(expression.body, method, info, advanced);
				
				switch (expression.type)
				{
					case ExpressionType.GET:
						if (expression.parent && expression.parent.isAccess)
						{
							if (!expression.context || expression.context.data != "Function")
							{
								expression.context = findContext(expression.parent.context, null, expression, info, null);
								
								correctVectorMemberContext(expression.parent, expression);
								
								checkSuperAccess(expression, info);
							}
						}
						else if (expression.isLiteral)
						{
							switch (expression.tokenType)
							{
								case TokenType.NUMBER:
									if (isInteger(expression.tokenData))
									{
										expression.context = new NamespaceInfo("int");
									}
									else
									{
										expression.context = new NamespaceInfo("Number");
									}
									break;
								
								case TokenType.STRING:
									expression.context = new NamespaceInfo("String");
									break;
								
								case TokenType.BOOLEAN:
									expression.context = new NamespaceInfo("Boolean");
									break;
								
								case TokenType.REGULAR_EXPRESSION:
									expression.context = new NamespaceInfo("RegExp");
									break;
								
								case TokenType.NATIVE_XML:
									expression.context = new NamespaceInfo("XML");
									break;
								
								case TokenType.LITERAL:
									expression.context = null;
									break;
							}
						}
						else
						{
							switch (expression.tokenData)
							{
								case "this":
									expression.context = info.fullNamespace;
									break;
								
								case "super":
									if (info.extendsInfo)
									{
										expression.context = info.extendsInfo;
										
										var extendsInfo:ClassInfo = info.getExtends();
										
										if (extendsInfo)
										{
											expression.member = extendsInfo.constructor;
											
											info.addOverride(MethodInfo(expression.member));
										}
										else
										{
											expression.context = null;
											
											errorMessage("Base class '" + info.extendsInfo + "' undefined", info, false);
										}
									}
									break;
								
								default:
									if (!expression.context ||
										(
											expression.context.data != "XML" &&
											expression.context.data != "XMLList"
										)
									)
									{
										expression.context = findContext(info.fullNamespace, method, expression, info, advanced);
									}
									
									checkRequiredClass(expression, info);
									break;
							}
							
							correctCastingContext(expression);
						}
						break;
					
					case ExpressionType.RUN:
						if (expression.parent && expression.parent.isAccess)
						{
							if (expression.parent.context)
							{
								if (expression.parent.context.child)
								{
									expression.context = expression.parent.context.child;
								}
								else
								{
									expression.context = expression.parent.context;
								}
							}
							else
							{
								
								errorMessage("Run has not context. Expression: " + expression, info, false);
							}
						}
						else
						{
							errorMessage("Run has not parent. Expression: " + expression, info, true);
						}
						break;
					
					case ExpressionType.ELEMENT:
						if (expression.parent && expression.parent.isAccess)
						{
							if (expression.parent.context)
							{
								switch (expression.parent.context.data)
								{
									case "Array":
										expression.context = new NamespaceInfo("Object");
										break;
									
									case "Vector":
										expression.context = expression.parent.context.child;
										break;
									
									case "XML":
									case "XMLList":
										expression.context = new NamespaceInfo("XMLList");
										break;
									
									default:
										
										break;
								}
							}
							else
							{
								errorMessage("Element has not context. Expression: " + expression, info, true);
							}
						}
						else
						{
							errorMessage("Element has not parent. Expression: " + expression, info, true);
						}
						break;
					
					case ExpressionType.VECTOR:
						expression.context = new NamespaceInfo("Class");
						expression.context.child = getVectorContext(expression, info);
						break;
					
					case ExpressionType.OBJECT:
						expression.context = new NamespaceInfo("Object");
						break;
					
					case ExpressionType.ARRAY:
						expression.context = getArrayContext(expression, info);
						break;
					
					case ExpressionType.BLOCK:
						if (expression.tokenData == "(")
						{
							expression.context = getBodyContext(expression.body, info);
						}
						break;
					
					case ExpressionType.CONSTRUCTION:
						if (expression.tokenData == "with" &&
							expression.body &&
							expression.body.length == 1)
						{
							advanced = expression.body[0].context;
						}
						break;
				}
				
				analyzeMethodBodyContext(expression.method, info, advanced);
				
				for each(var property:Object in expression.properties)
				{
					analyzeExpressionContext(ExpressionInfo(property.value), method, info, advanced);
				}
				
				analyzeExpressionContext(expression.child, method, info, advanced);
			}
		}
		
		static private function isInteger(data:String):Boolean
		{
			return data.indexOf(".") == -1 &&
				data.toLowerCase().indexOf("e-") == -1;
		}
		
		static private function checkRequiredClass(expression:ExpressionInfo, info:ClassInfo):void
		{
			if (expression.context && expression.context.data == "Class" && expression.context.child)
			{
				info.addRequiredClass(expression.context.child.data);
			}
		}
		
		static private function checkSuperAccess(expression:ExpressionInfo, info:ClassInfo):void
		{
			if (expression.parent.tokenData == "super" && expression.member)
			{
				if (expression.member is MethodInfo)
				{
					info.addOverride(MethodInfo(expression.member));
				}
				else
				{
					var property:VariableInfo = VariableInfo(expression.member);
					
					if (property.getter)
					{
						info.addOverride(property.getter);
					}
					
					if (property.setter)
					{
						info.addOverride(property.setter);
					}
				}
			}
		}
		
		static private function getArrayContext(array:ExpressionInfo, info:ClassInfo):NamespaceInfo
		{
			var context:NamespaceInfo;
			
			var types:Vector.<NamespaceInfo> = new Vector.<NamespaceInfo>();
			
			for each(var expression:ExpressionInfo in array.body)
			{
				context = getExpressionContext(expression, info);
				
				if (context)
				{
					types.push(context);
				}
				else
				{
					errorMessage("Unknown element context", info, false);
				}
			}
			
			if (types.length)
			{
				context = new NamespaceInfo("Vector");
				context.child = getCommonContext(types);
				return context;
			}
			else
			{
				return new NamespaceInfo("Array");
			}
		}
		
		static private function getCommonContext(types:Vector.<NamespaceInfo>):NamespaceInfo
		{
			var context:NamespaceInfo;
			
			if (types.length)
			{
				context = getCommonMonoContext(types);
				
				if (context)
				{
					return context;
				}
				
				context = getCommonBaseContext(types);
				
				if (context)
				{
					return context;
				}
				
				context = getCommonInterfaceContext(types);
				
				if (context)
				{
					return context;
				}
			}
			
			return new NamespaceInfo("Object");
		}
		
		static private function getCommonBaseContext(types:Vector.<NamespaceInfo>):NamespaceInfo
		{
			var i:int = types.length - 1;
			
			var context:NamespaceInfo = types[i];
			
			while (i--)
			{
				context = selectCommonBaseContext(context, types[i]);
			}
			
			return context;
		}
		
		static private function selectCommonBaseContext(type0:NamespaceInfo, type1:NamespaceInfo):NamespaceInfo
		{
			if (type0 && type1)
			{
				var info0:ClassInfo = ClassInfo.getClass(type0.data);
				var info1:ClassInfo = ClassInfo.getClass(type1.data);
				
				if (info0 && info1)
				{
					var chain0:NamespaceInfo = info0.getExtendsChain();
					var chain1:NamespaceInfo = info1.getExtendsChain();
					
					var data:String;
					
					while (chain0 && chain1)
					{
						if (chain0.data == chain1.data)
						{
							data = chain0.data;
						}
						
						chain0 = chain0.child;
						chain1 = chain1.child;
					}
					
					if (data && data != "Object")
					{
						return new NamespaceInfo(data);
					}
				}
			}
			
			return null;
		}
		
		static private function getCommonMonoContext(types:Vector.<NamespaceInfo>):NamespaceInfo
		{
			var i:int = types.length - 1;
			
			var data:String = types[i].data;
			
			while (i--)
			{
				if (types[i].data != data)
				{
					return null;
				}
			}
			
			return new NamespaceInfo(data);
		}
		
		static private function getCommonInterfaceContext(types:Vector.<NamespaceInfo>):NamespaceInfo
		{
			var interfacesMap:Dictionary = new Dictionary();
			
			var type:NamespaceInfo;
			
			for each(type in types)
			{
				var info:ClassInfo = ClassInfo.getClass(type.data);
				
				if (info)
				{
					var interfacesInfos:Vector.<NamespaceInfo> = new Vector.<NamespaceInfo>();
					info.getInterfaces(interfacesInfos);
					
					for each(var interfaceInfo:NamespaceInfo in interfacesInfos)
					{
						if (interfacesMap[interfaceInfo.data])
						{
							interfacesMap[interfaceInfo.data]++;
						}
						else
						{
							interfacesMap[interfaceInfo.data] = 1;
						}
					}
				}
			}
			
			for (var data:String in interfacesMap)
			{
				if (interfacesMap[data] == types.length)
				{
					return new NamespaceInfo(data);
				}
			}
			
			return null;
		}
		
		static private function correctCastingContext(expression:ExpressionInfo):void
		{
			if (expression.context &&
				expression.context.data == "Class" &&
				expression.parent &&
				expression.parent.type == ExpressionType.OPERATION &&
				expression.parent.tokenData == "as" &&
				expression.parent.parent)
			{
				expression.parent.parent.context = expression.context.child.clone();
			}
		}
		
		static private function correctVectorMemberContext(parent:ExpressionInfo, expression:ExpressionInfo):void
		{
			if (parent.context && parent.context.data == "Vector" &&
				expression.context && expression.context.peak.data == "Class")
			{
				expression.context = expression.context.clone();
				expression.context.peak = parent.context.child;
			}
		}
		
		static private function getBodyContext(body:Vector.<ExpressionInfo>, info:ClassInfo):NamespaceInfo
		{
			if (body && body.length)
			{
				for each(var expression:ExpressionInfo in body)
				{
					var context:NamespaceInfo = getExpressionContext(expression, info);
					
					if (context)
					{
						return context;
					}
				}
			}
			
			return null;
		}
		
		static private function getMethodBodyContext(body:Vector.<ExpressionInfo>, info:ClassInfo, data:Object):NamespaceInfo
		{
			var context:NamespaceInfo;
			
			if (body && body.length)
			{
				for each(var expression:ExpressionInfo in body)
				{
					if (expression)
					{
						if (expression.type == ExpressionType.CONSTRUCTION && expression.tokenData == "return")
						{
							data.hasReturn = true;
							
							if (expression.child)
							{
								context = getExpressionContext(expression.child, info);
								
								if (context)
								{
									return context;
								}
							}
							else
							{
								return new NamespaceInfo("void");
							}
						}
						else if (expression.type == ExpressionType.BLOCK || expression.type == ExpressionType.CONSTRUCTION)
						{
							context = getMethodBodyContext(expression.body, info, data);
							
							if (context)
							{
								return context;
							}
							
							if (expression.child)
							{
								context = getMethodBodyContext(expression.child.body, info, data);
								
								if (context)
								{
									return context;
								}
							}
						}
					}
				}
			}
			
			return null;
		}
		
		static private function getVectorContext(expression:ExpressionInfo, info:ClassInfo):NamespaceInfo
		{
			var context:NamespaceInfo = new NamespaceInfo();
			
			if (expression.type == ExpressionType.VECTOR)
			{
				if (expression.body && expression.body.length)
				{
					context.data = "Vector";
					context.child = getVectorContext(expression.body[0], info);
				}
				else
				{
					errorMessage("Invalid vector body. Expression: " + expression, info, true);
				}
			}
			else if (expression.type == ExpressionType.GET)
			{
				context.data = expression.about;
				
				var importInfo:NamespaceInfo = info.getImport(context.data);
				
				if (importInfo)
				{
					context.data = importInfo.data;
				}
			}
			else
			{
				errorMessage("Invalid vector. Expression: " + expression, info, true);
			}
			
			return context;
		}
		
		static private function errorMessage(message:String, info:ClassInfo, error:Boolean):void
		{
			var data:String = message + (info ? " In class: '" + info.fullName + "'" : "");
			
			if (error)
			{
				_errors.push(data);
			}
			else
			{
				_warnings.push(data);
			}
		}
		
		static private function findContext(current:NamespaceInfo, method:MethodInfo, expression:ExpressionInfo, info:ClassInfo, advanced:NamespaceInfo):NamespaceInfo
		{
			var memberContext:NamespaceInfo;
			
			var name:String = expression.tokenData;
			
			if (advanced)
			{
				memberContext = getMemberContext(advanced, expression, info);
				
				if (memberContext)
				{
					if (memberContext.data)
					{
						return memberContext;
					}
					else
					{
						return null;
					}
				}
			}
			
			if (method)
			{
				var variable:VariableInfo = method.getLocal(name);
				
				if (variable)
				{
					expression.member = variable;
					
					return variable.type;
				}
				
				variable = method.getParameter(name);
				
				if (variable)
				{
					expression.member = variable;
					
					return variable.type;
				}
			}
			
			if (current && current.data != "Package")
			{
				memberContext = getMemberContext(current, expression, info);
				
				if (memberContext)
				{
					if (memberContext.data)
					{
						return memberContext;
					}
					else
					{
						return null;
					}
				}
			}
			
			if (current && (current.data == "XML" || current.data == "XMLList"))
			{
				return new NamespaceInfo("XMLList");
			}
			
			var importInfo:ClassInfo = info.getImportClass(name);
			
			if (importInfo)
			{
				var importName:NamespaceInfo = new NamespaceInfo();
				
				if (importInfo.isFunction)
				{
					importName.data = "Function";
					importName.child = importInfo.constructor.type.clone();
					expression.tag = importInfo.fullNamespace.clone();
				}
				else
				{
					importName.data = "Class";
					importName.child = importInfo.fullNamespace.clone();
				}
				
				return importName;
			}
			
			return info.getNamespaceInfo(
				(current && current.data == "Package" ? current.child.data + "." : "") + name
			);
		}
		
		static private function getMemberContext(current:NamespaceInfo, expression:ExpressionInfo, info:ClassInfo):NamespaceInfo
		{
			var currentInfo:ClassInfo;
			
			var name:String = expression.tokenData;
			
			if (current.data == "Class" && current.child)
			{
				currentInfo = ClassInfo.getClass(current.child.data);
			}
			else
			{
				currentInfo = ClassInfo.getClass(current.data);
			}
			
			if (currentInfo)
			{
				var member:MemberInfo = currentInfo.getMember(name);
				
				if (member)
				{
					expression.member = member;
					
					var type:NamespaceInfo = member.type;
					
					if (type)
					{
						type = type.clone();
						
						if (member is VariableInfo)
						{
							return type;
						}
						else if (member is MethodInfo)
						{
							var functionType:NamespaceInfo = new NamespaceInfo("Function");
							functionType.child = type;
							return functionType;
						}
					}
					else
					{
						return new NamespaceInfo();
					}
				}
			}
			else
			{
				errorMessage("Member context class not found. Name: '" + current + "'", info, false);
			}
			
			return null;
		}
		
	}
	
}