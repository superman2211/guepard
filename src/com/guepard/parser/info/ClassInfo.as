package com.guepard.parser.info
{
	import com.guepard.utils.StringUtil;
	
	import flash.filesystem.File;
	import flash.utils.Dictionary;
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ClassInfo
	{
		public static const CLASS:String = "class";
		public static const INTERFACE:String = "interface";
		public static const FUNCTION:String = "function";
		
		static private var _classes:Dictionary = new Dictionary();
		
		static public function get classes():Dictionary
		{
			return _classes;
		}
		
		static public function addClass(info:ClassInfo):void
		{
			_classes[info.fullName] = info;
		}
		
		static public function clearClasses():void
		{
			_classes = new Dictionary();
		}
		
		static public function getClass(fullName:String):ClassInfo
		{
			if (_classes[fullName] is ClassInfo)
			{
				return _classes[fullName];
			}
			else
			{
				return null;
			}
		}
		
		static public function getPackage(name:String):NamespaceInfo
		{
			for each(var info:ClassInfo in _classes)
			{
				if (info.packageInfo)
				{
					if (info.packageInfo.data.indexOf(name) == 0)
					{
						var packageInfo:NamespaceInfo = new NamespaceInfo("Package");
						packageInfo.child = new NamespaceInfo(name);
						return packageInfo;
					}
				}
			}
			
			return null;
		}
		
		private static function compareMembers(a:MemberInfo, b:MemberInfo):Number
		{
			var nameA:String = a.name;
			var nameB:String = b.name;
			
			if (nameA == nameB && a is MethodInfo && b is MemberInfo)
			{
				var methodA:MethodInfo = MethodInfo(a);
				var methodB:MethodInfo = MethodInfo(b);
				
				nameA = methodA.methodType + nameA;
				nameB = methodB.methodType + nameB;
			}
			
			return (nameA == nameB) ? 0 : (nameA > nameB) ? 1 : -1;
		}
		
		public var name:String;
		public var extendsInfo:NamespaceInfo;
		public var implementsInfo:Vector.<NamespaceInfo>;
		public var packageInfo:NamespaceInfo;
		public var importsInfo:Vector.<NamespaceInfo>;
		public var methodsInfo:Vector.<MethodInfo>;
		public var variablesInfo:Vector.<VariableInfo>;
		public var classesInfo:Vector.<ClassInfo>;
		public var type:String;
		public var overrideMethods:Vector.<MethodInfo>;
		public var requiredClasses:Vector.<String>;
		public var addRequiredClassesEnabled:Boolean;
		public var file:File;
		public var tag:TagInfo;
		public var appended:Boolean;
		public var base:Boolean;
		
		public function get isInterface():Boolean
		{
			return type == INTERFACE;
		}
		
		public function get isClass():Boolean
		{
			return type == CLASS;
		}
		
		public function get isFunction():Boolean
		{
			return type == FUNCTION;
		}
		
		public function get fullName():String
		{
			return packageInfo && packageInfo.data ? packageInfo.data + "." + name : name;
		}
		
		public function get fullNamespace():NamespaceInfo
		{
			return new NamespaceInfo(fullName);
		}
		
		public function set fullNamespace(value:NamespaceInfo):void
		{
			packageInfo = value.parent;
			name = value.name;
		}
		
		public function get path():String
		{
			return StringUtil.replace(fullName, ".", "/") + ".as";
		}
		
		public function get constructor():MethodInfo
		{
			for each(var method:MethodInfo in methodsInfo)
			{
				if (method.name == name) return method;
			}
			
			return null;
		}
		
		public function get extendsLevel():int
		{
			if (name)
			{
				var extendsClass:ClassInfo = getExtends();
				
				return 1 + (extendsClass ? extendsClass.extendsLevel : 0);
			}
			
			return 0;
		}
		
		public function get hasOverride():Boolean
		{
			return overrideMethods && overrideMethods.length;
		}
		
		public function get hasInstanceMembers():Boolean
		{
			for each(var member:MethodInfo in methodsInfo)
			{
				if (!member.statique) return true;
			}
			
			for each(var variable:VariableInfo in variablesInfo)
			{
				if (!variable.statique) return true;
			}
			
			return false;
		}
		
		public function get hasStaticMethods():Boolean
		{
			for each(var member:MethodInfo in methodsInfo)
			{
				if (member.statique) return true;
			}
			
			return false;
		}
		
		public function get hasStaticProperties():Boolean
		{
			for each(var variable:VariableInfo in variablesInfo)
			{
				if (variable.statique) return true;
			}
			
			return false;
		}
		
		public function get hasStaticMembers():Boolean
		{
			return hasStaticMethods || hasStaticProperties;
		}
		
		public function get hasTagMembers():Boolean
		{
			for each(var variable:VariableInfo in variablesInfo)
			{
				if (variable.tag) return true;
			}
			
			for each(var member:MethodInfo in methodsInfo)
			{
				if (member.tag) return true;
			}
			
			return false;
		}
		
		public function ClassInfo()
		{
			type = CLASS;
			
			overrideMethods = new Vector.<MethodInfo>();
			requiredClasses = new Vector.<String>();
		}
		
		public function optimize():void
		{
			optimizeImports();
			optimizeProperties();
			optimizeMethods();
		}
		
		public function toXML():XMLNode
		{
			var info:NamespaceInfo;
			
			var node:XMLNode = packageInfo ? packageInfo.toXML("package") : new XMLNode(XMLNodeType.ELEMENT_NODE, "package");
			
			for each(info in importsInfo)
			{
				node.appendChild(info.toXML("import"));
			}
			
			var classNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, type);
			classNode.attributes.data = name;
			node.appendChild(classNode);
			
			if (extendsInfo)
			{
				classNode.appendChild(extendsInfo.toXML("extends"));
			}
			
			for each(info in implementsInfo)
			{
				classNode.appendChild(info.toXML("implements"));
			}
			
			var member:MemberInfo;
			
			for each(member in variablesInfo)
			{
				classNode.appendChild(member.toXML());
			}
			
			for each(member in methodsInfo)
			{
				classNode.appendChild(member.toXML());
			}
			
			return node;
		}
		
		public function getMember(name:String):MemberInfo
		{
			for each(var variable:VariableInfo in variablesInfo)
			{
				if (variable.name == name) return variable;
			}
			
			var property:VariableInfo;
			
			for each(var method:MethodInfo in methodsInfo)
			{
				if (method.name == name && method.name != this.name)
				{
					switch (method.methodType)
					{
						case MethodType.GETTER:
						case MethodType.SETTER:
							if (!property)
							{
								property = new VariableInfo();
								property.variableType = VariableType.PROPERTY;
								property.name = name;
							}
							
							property[method.methodType] = method;
							break;
						
						case MethodType.FUNCTION:
							return method;
					}
				}
			}
			
			if (property)
			{
				if (property.getter && property.getter.type)
				{
					property.type = property.getter.type;
				}
				else if (property.setter && property.setter.parameters.length && property.setter.parameters[0].type)
				{
					property.type = property.setter.parameters[0].type;
				}
				
				property.statique = property.getter ? property.getter.statique : property.setter ? property.setter.statique : false;
				
				return property;
			}
			
			var extendsClass:ClassInfo = getExtends();
			
			if (extendsClass)
			{
				return extendsClass.getMember(name);
			}
			
			return null;
		}
		
		public function getImportClass(name:String):ClassInfo
		{
			var namespaceInfo:NamespaceInfo = getImport(name);
			
			if (namespaceInfo)
			{
				return ClassInfo.getClass(namespaceInfo.data);
			}
			else if (extendsInfo)
			{
				var extendsClass:ClassInfo = getExtends();
				
				if (extendsClass)
				{
					return extendsClass.getImportClass(name);
				}
			}
			
			return ClassInfo.getClass(name);
		}
		
		public function getImport(name:String):NamespaceInfo
		{
			var info:ClassInfo;
			
			for each(var importInfo:NamespaceInfo in importsInfo)
			{
				if (importInfo.name == "*")
				{
					info = getClass(importInfo.parent + "." + name);
					
					if (info) return info.fullNamespace;
				}
				else
				{
					if (importInfo.name == name) return importInfo;
				}
			}
			
			if (packageInfo && packageInfo.data)
			{
				info = getClass(packageInfo.data + "." + name);
				
				if (info) return info.fullNamespace;
			}
			
			if (_classes[name])
			{
				return new NamespaceInfo(name);
			}
			
			return null;
		}
		
		public function getNamespaceInfo(name:String):NamespaceInfo
		{
			for each(var importInfo:NamespaceInfo in importsInfo)
			{
				if (importInfo.name == name)
				{
					return importInfo;
				}
				else if (importInfo.data.indexOf(name) == 0)
				{
					var packageInfo:NamespaceInfo = new NamespaceInfo("Package");
					packageInfo.child = new NamespaceInfo(name);
					return packageInfo;
				}
			}
			
			return null;
		}
		
		public function getExtends():ClassInfo
		{
			if (extendsInfo)
			{
				var namespaceInfo:NamespaceInfo = getImport(extendsInfo.data);
				
				if (namespaceInfo)
				{
					return getClass(namespaceInfo.data);
				}
				else if (extendsInfo.data != "Object")
				{
					return getClass(extendsInfo.data);
				}
			}
			
			return null;
		}
		
		public function toString():String
		{
			return fullName;
		}
		
		public function addOverride(method:MethodInfo):void
		{
			if (overrideMethods.indexOf(method) == -1)
			{
				overrideMethods.push(method);
			}
		}
		
		public function addRequiredClass(className:String):void
		{
			switch (className)
			{
				case "Class":
				case "Object":
				case "Number":
				case "String":
				case "Boolean":
				case "Array":
				case "Math":
				case "int":
				case "uint":
					return;
			}
			
			if (addRequiredClassesEnabled && requiredClasses.indexOf(className) == -1)
			{
				requiredClasses.push(className);
			}
		}
		
		public function append(info:ClassInfo):void
		{
			trace("append", info.name);
			
			info.appended = true;
			
			var thisConstructor:MethodInfo = this.constructor;
			var infoConstructor:MethodInfo = info.constructor;
			
			importsInfo = importsInfo.concat(info.importsInfo);
			variablesInfo = variablesInfo.concat(info.variablesInfo);
			methodsInfo = methodsInfo.concat(info.methodsInfo);
			
			if (thisConstructor && infoConstructor)
			{
				methodsInfo.splice(methodsInfo.indexOf(infoConstructor), 1);
				
				thisConstructor.body = constructor.body.concat(infoConstructor.body);
			}
		}
		
		public function getInterfaces(interfaces:Vector.<NamespaceInfo>):void
		{
			for each(var name:NamespaceInfo in implementsInfo)
			{
				interfaces.push(name);
			}
			
			var extendsInfo:ClassInfo = getExtends();
			
			if (extendsInfo)
			{
				extendsInfo.getInterfaces(interfaces);
			}
		}
		
		public function getExtendsChain():NamespaceInfo
		{
			if (fullName == "Object")
			{
				return fullNamespace;
			}
			
			var base:ClassInfo = getExtends();
			
			var baseName:NamespaceInfo;
			
			if (base && base.fullName != "Object")
			{
				baseName = base.getExtendsChain();
			}
			else
			{
				baseName = new NamespaceInfo("Object");
			}
			
			baseName.addChild(fullNamespace);
			
			return baseName;
		}
		
		public function getTempVariableName(method:MethodInfo):String
		{
			var index:int = 0;
			var temp:String = "t" + index;
			
			while (method.getParameter(temp) || method.getLocal(temp) || getMember(temp))
			{
				index++;
				temp = "t" + index;
			}
			
			return temp;
		}
		
		public function containsMember(member:MemberInfo):Boolean
		{
			var method:MethodInfo;
			var variable:VariableInfo;
			var v:VariableInfo;
			var m:MethodInfo;
			
			if (member)
			{
				if (member is VariableInfo)
				{
					variable = VariableInfo(member);
					
					for each(v in variablesInfo)
					{
						if (v == variable) return true;
					}
					
					for each(m in methodsInfo)
					{
						if (m == variable.setter || m == variable.getter) return true;
					}
				}
				else
				{
					method = MethodInfo(member);
					
					for each(m in methodsInfo)
					{
						if (m == method) return true;
					}
				}
			}
			
			return false;
		}
		
		public function getClassByMember(member:MemberInfo):ClassInfo
		{
			if (containsMember(member))
			{
				return this;
			}
			
			if (extendsInfo)
			{
				var info:ClassInfo = getExtends();
				
				if (info)
				{
					return info.getClassByMember(member);
				}
			}
			
			return null;
		}
		
		private function optimizeMethods():void
		{
			//TODO optimize methods
			
			/*for (var i:int = 0; i < methodsInfo.length; i++)
			{
				var info0:MethodInfo = methodsInfo[i];
				
				for (var j:int = i + 1; j < methodsInfo.length; j++)
				{
					var info1:MethodInfo = methodsInfo[j];
					
					if (info0.equals(info1))
					{
						methodsInfo.splice(j, 1);
						j--;
					}
				}
			}//*/
		}
		
		private function optimizeProperties():void
		{
			//TODO optimize properties
			
			/*for (var i:int = 0; i < variablesInfo.length; i++)
			{
				var info0:VariableInfo = variablesInfo[i];
				
				for (var j:int = i + 1; j < variablesInfo.length; j++)
				{
					var info1:VariableInfo = variablesInfo[j];
					
					if (info0.equals(info1))
					{
						variablesInfo.splice(j, 1);
						j--;
					}
				}
			}//*/
		}
		
		private function optimizeImports():void
		{
			//TODO optimize imports;
			
			/*for (var i:int = 0; i < importsInfo.length; i++)
			{
				var info0:NamespaceInfo = importsInfo[i];
				
				for (var j:int = i + 1; j < importsInfo.length; j++)
				{
					var info1:NamespaceInfo = importsInfo[j];
					
					if (info0.data == info1.data)
					{
						importsInfo.splice(j, 1);
						j--;
					}
				}
			}//*/
		}
	}
}