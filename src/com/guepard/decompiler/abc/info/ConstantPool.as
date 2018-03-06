package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ConstantPool
	{
		public var integers:Array;
		public var uintegers:Array;
		public var doubles:Array;
		public var strings:Array;
		public var namespaces:Array;
		public var namespaceSets:Array
		public var multinames:Array;
		
		public function ConstantPool()
		{
			
		}
		
		public function dispose():void
		{
			integers = null;
			uintegers = null;
			doubles = null;
			strings = null;
			namespaces = null;
			namespaceSets = null;
			multinames = null;
		}
		
		public function createString(str:String):String
		{
			if (strings.indexOf(str) == -1)
			{
				strings.push(str);
			}
			
			return str;
		}
		
		public function createNamespace(name:String, kind:uint):NamespaceInfo
		{
			var mn:NamespaceInfo;
			for each(mn in namespaces)
			{
				if (mn && mn.info == name && mn.kind == kind)
				{
					return mn;
				}
			}
			mn = new NamespaceInfo();
			mn.info = name;
			mn.name = name;
			mn.kind = kind;
			
			namespaces.push(mn);
			
			return mn;
		}
		
		public function createNamespaceSet(namespaces:Array):NamespaceSetInfo
		{
			var namespaceSet:NamespaceSetInfo = new NamespaceSetInfo();
			namespaceSet.namespaces = namespaces;
			namespaceSets.push(namespaceSet);
			return namespaceSet;
		}
		
		public function createMultiname(name:String, namespaceLink:NamespaceInfo, kind:uint):MultinameInfo
		{
			var mn:MultinameInfo;
			for each(mn in multinames)
			{
				if (mn && mn.name == name && mn.namespaceLink == namespaceLink && mn.kind == kind)
				{
					return mn;
				}
			}
			
			mn = new MultinameInfo();
			mn.name = name;
			mn.namespaceLink = namespaceLink;
			mn.kind = kind;
			multinames.push(mn);
			return mn;
		}
		
		public function addString(value:String):void
		{
			if (strings.indexOf(value) == -1) strings.push(value);
		}
		
		public function addNamespace(value:NamespaceInfo):void
		{
			if (namespaces.indexOf(value) == -1) namespaces.push(value);
		}
		
		public function addMultiname(value:MultinameInfo):void
		{
			if (multinames.indexOf(value) == -1) multinames.push(value);
		}
		
		public function getMultiname(name:String):MultinameInfo
		{
			for each(var mn:MultinameInfo in multinames)
			{
				if (mn && mn.name == name) return mn;
			}
			
			return null;
		}
		
		public function toString():String
		{
			return "ConstantPool";
		}
		
		public function getInfo(tab:String = ""):void
		{
			trace(tab + "Integers");
			for each(var i:int in integers)
			{
				trace(tab + "\t" + i);
			}
			trace(tab);
			
			trace(tab + "Uintegers");
			for each(var u:uint in uintegers)
			{
				trace(tab + "\t" + u);
			}
			trace(tab);
			
			trace(tab + "Doubles");
			for each(var n:Number in doubles)
			{
				trace(tab + "\t" + n);
			}
			trace(tab);
			
			trace(tab + "Strings");
			for each(var s:String in strings)
			{
				trace(tab + "\t" + s);
			}
			trace(tab);
			
			trace(tab + "Namespaces");
			for each(var ns:NamespaceInfo in namespaces)
			{
				trace(tab + "\t" + ns);
			}
			trace(tab);
			
			trace(tab + "NamespaceSets");
			for each(var nss:NamespaceSetInfo in namespaceSets)
			{
				trace(tab + "\t" + nss);
			}
			trace(tab);
			
			trace(tab + "Multinames");
			for each(var mn:MultinameInfo in multinames)
			{
				trace(tab + "\t" + mn);
			}
			trace(tab);
		}
		
		public function append(constantPool:ConstantPool):void
		{
			var value:Object;
			
			for each(value in constantPool.integers)
			{
				if (integers.indexOf(value) == -1) integers.push(value);
			}
			
			for each(value in constantPool.uintegers)
			{
				if (uintegers.indexOf(value) == -1) uintegers.push(value);
			}
			
			for each(value in constantPool.doubles)
			{
				if (doubles.indexOf(value) == -1) doubles.push(value);
			}
			
			for each(value in constantPool.strings)
			{
				if (strings.indexOf(value) == -1) strings.push(value);
			}
			
			for each(value in constantPool.namespaces)
			{
				if (namespaces.indexOf(value) == -1) namespaces.push(value);
			}
			
			for each(value in constantPool.namespaceSets)
			{
				if (namespaceSets.indexOf(value) == -1) namespaceSets.push(value);
			}
			
			for each(value in constantPool.multinames)
			{
				if (multinames.indexOf(value) == -1) multinames.push(value);
			}
		}
	}
}