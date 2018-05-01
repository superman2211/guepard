package com.guepard.parser.info
{
	import com.guepard.parser.token.Token;
	import com.guepard.parser.token.TokenType;
	import com.guepard.utils.StringUtil;
	
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ExpressionInfo
	{
		static private var _nextId:int = 0;
		
		public var id:int;
		
		public var token:Token;
		public var type:String;
		
		public var body:Vector.<ExpressionInfo>;
		public var method:MethodInfo;
		public var properties:Vector.<Object>;
		public var member:MemberInfo;
		public var enabled:Boolean;
		public var tag:Object;
		public var accessOperator:Token;
		
		private var _child:ExpressionInfo;
		
		public function get child():ExpressionInfo
		{
			return _child;
		}
		
		public function set child(value:ExpressionInfo):void
		{
			if (_child)
			{
				_child._parent = null;
			}
			
			_child = value;
			
			if (_child)
			{
				_child._parent = this;
			}
		}
		
		private var _parent:ExpressionInfo;
		
		public function get parent():ExpressionInfo
		{
			return _parent;
		}
		
		public function set parent(value:ExpressionInfo):void
		{
			if (_parent)
			{
				_parent._child = null;
			}
			
			_parent = value;
			
			if (_parent)
			{
				_parent._child = this;
			}
		}
		
		private var _context:NamespaceInfo;
		
		public function get context():NamespaceInfo
		{
			return _context;
		}
		
		public function set context(value:NamespaceInfo):void
		{
			if (id == 388)
			{
				trace();
			}
			
			_context = value;
		}
		
		public function get isProperty():Boolean
		{
			return member is VariableInfo && VariableInfo(member).variableType == VariableType.PROPERTY;
		}
		
		public function get isDictionary():Boolean
		{
			return context && context.data == "flash.utils.Dictionary";
		}
		
		public function get tokenData():String
		{
			return token ? token.data : null;
		}
		
		public function set tokenData(value:String):void
		{
			if(token) token.data = value;
		}
		
		public function get tokenType():String
		{
			return token ? token.type : null;
		}
		
		public function get about():String
		{
			var data:String = "";
			
			switch (type)
			{
				case ExpressionType.GET:
					if (parent &&
						parent.type != ExpressionType.OPERATION &&
						parent.type != ExpressionType.SET &&
						parent.type != ExpressionType.BLOCK)
					{
						data += "." + token.data;
					}
					else
					{
						data += token.data;
					}
					break;
				
				case ExpressionType.SET:
					data += " " + token.data + " " + aboutBody;
					break;
				
				case ExpressionType.RUN:
					data += "(" + aboutBody + ")";
					break;
				
				case ExpressionType.ELEMENT:
					data += "[" + aboutBody + "]";
					break;
				
				case ExpressionType.VECTOR:
					data += "Vector.<" + aboutBody + ">";
					break;
				
				case ExpressionType.BLOCK:
					data += token.data + " " + aboutBody;
					
					switch (token.data)
					{
						case "(":
							data += ")";
							break;
						case "[":
							data += "]";
							break;
						case "{":
							data += "}";
							break;
					}
					break;
				
				default:
					if (token)
					{
						data += token.data;
					}
					
					if (body)
					{
						data += aboutBody;
					}
					break;
			}
			
			if (child)
			{
				data += child.about;
			}
			
			return data;
		}
		
		public function get aboutBody():String
		{
			var data:String = "";
			
			if (body && body.length)
			{
				for each(var expression:ExpressionInfo in body)
				{
					data += expression.about;
				}
			}
			
			return data;
		}
		
		public function get isKeyword():Boolean
		{
			return token && token.type == TokenType.KEYWORD;
		}
		
		public function get isLiteral():Boolean
		{
			return token && (token.type == TokenType.NUMBER ||
				token.type == TokenType.STRING ||
				token.type == TokenType.BOOLEAN ||
				token.type == TokenType.LITERAL ||
				token.type == TokenType.REGULAR_EXPRESSION ||
				token.type == TokenType.NATIVE_XML);
		}
		
		public function get isAccess():Boolean
		{
			return type == ExpressionType.GET ||
				type == ExpressionType.RUN ||
				type == ExpressionType.ELEMENT ||
				type == ExpressionType.VECTOR ||
				type == ExpressionType.BLOCK ||
				type == ExpressionType.OBJECT ||
				type == ExpressionType.ARRAY ||
				type == ExpressionType.FIND;
		}
		
		public function get root():ExpressionInfo
		{
			if (_parent)
			{
				return _parent.root;
			}
			else
			{
				return this;
			}
		}
		
		public function get rootPath():ExpressionInfo
		{
			if (_parent && _parent.isAccess)
			{
				return _parent.rootPath;
			}
			else
			{
				return this;
			}
		}
		
		public function get peak():ExpressionInfo
		{
			if (_child)
			{
				return _child.peak;
			}
			else
			{
				return this;
			}
		}
		
		public function get isFunction():Boolean
		{
			var child:ExpressionInfo = this.child;
			
			while (child)
			{
				if (!child.isAccess) return false;
				
				child = child.child;
			}
			
			return peak.context && peak.type != ExpressionType.RUN && peak.context.data == "Function";
		}
		
		public function get isThisAccess():Boolean
		{
			if (member)
			{
				if (member is VariableInfo)
				{
					var variable:VariableInfo = VariableInfo(member);
					
					switch (variable.variableType)
					{
						case VariableType.PROPERTY:
						case VariableType.VARIABLE:
							return true;
					}
				}
				else
				{
					return true;
				}
			}
			
			return false;
		}
		
		public function ExpressionInfo()
		{
			id = _nextId++;
			
			type = ExpressionType.EXPRESSION;
			
			enabled = true;
		}
		
		public function toXML():XMLNode
		{
			var expression:ExpressionInfo;
			
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, type);
			
			node.attributes.id = id;
			
			if (token)
			{
				node.attributes.data = StringUtil.correctText(token.data);
				node.attributes.type = token.type;
			}
			
			if (context)
			{
				node.attributes.context = context;
			}
			
			if (member)
			{
				var memberType:String;
				
				if (member is VariableInfo)
				{
					memberType = VariableInfo(member).variableType;
				}
				else
				{
					memberType = MethodInfo(member).methodType;
				}
				
				node.attributes.member = (member.statique ? "static " : "") + memberType + " : " + member.name;
			}
			
			if (body && body.length)
			{
				var bodyNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "body");
				node.appendChild(bodyNode);
				
				for each(expression in body)
				{
					if (expression)
					{
						bodyNode.appendChild(expression.toXML());
					}
					else
					{
						bodyNode.appendChild(new XMLNode(XMLNodeType.ELEMENT_NODE, "null"));
					}
				}
			}
			
			if (properties)
			{
				var propertiesNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "properties");
				node.appendChild(propertiesNode);
				
				for each (var property:Object in properties)
				{
					expression = ExpressionInfo(property.value);
					
					var propertyNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "property");
					propertyNode.attributes.name = property.name;
					propertyNode.appendChild(expression.toXML());
					propertiesNode.appendChild(propertyNode);
				}
			}
			
			if (method)
			{
				var methodNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "method");
				methodNode.appendChild(method.toXML());
				node.appendChild(methodNode);
			}
			
			if (child)
			{
				node.appendChild(child.toXML());
			}
			
			return node;
		}
		
		public function toString():String
		{
			return "{ text: " + about + ", id: " + id + " }";
		}
		
		public function calculateExpressionCount(type:String, tokenType:String, tokenData:String):int
		{
			var n:int = 0;
			
			for each(var expression:ExpressionInfo in body)
			{
				if (expression.type == type &&
					expression.tokenData == tokenData &&
					expression.tokenType == tokenType)
				{
					n++;
				}
			}
			
			return n;
		}
		
		public function getChildByData(data:String):ExpressionInfo
		{
			if (child)
			{
				if (child.tokenData == data)
				{
					return child;
				}
				else
				{
					return child.getChildByData(data);
				}
			}
			else
			{
				return null;
			}
		}
		
		public function getChildByType(type:String):ExpressionInfo
		{
			if (child)
			{
				if (child.type == type)
				{
					return child;
				}
				else
				{
					return child.getChildByType(type);
				}
			}
			else
			{
				return null;
			}
		}
		
		public function clone():ExpressionInfo
		{
			var copy:ExpressionInfo = new ExpressionInfo();
			
			copy.type = type;
			copy.method = method;
			copy.properties = properties;
			copy.context = context;
			copy.member = member;
			
			copy.token = token ? token.clone() : null;
			copy.child = child ? child.clone() : null;
			
			if (body)
			{
				copy.body = new Vector.<ExpressionInfo>();
				
				for each(var expression:ExpressionInfo in body)
				{
					copy.body.push(expression.clone());
				}
			}
			
			return copy;
		}
		
	}
	
}