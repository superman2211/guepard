package com.guepard.decompiler.abc.info
{
	import com.guepard.decompiler.abc.traits.*;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class InstanceInfo
	{
		public var name:MultinameInfo;
		public var superName:MultinameInfo;
		
		public var flags:uint;
		
		public var isSealed:Boolean;
		public var isFinal:Boolean;
		public var isInterface:Boolean;
		public var isProtectedNamespace:Boolean;
		
		public var protectedNamespace:NamespaceInfo;
		
		public var interfaces:Array;
		
		public var initMethod:MethodInfo;
		
		public var traits:Array;
		
		public var classReference:ClassInfo;
		
		public function get superClassPath():String
		{
			return (superName) ? superName.classPath : "";
		}
		
		public function get classPath():String
		{
			return (name) ? name.classPath : "";
		}
		
		public function get packagePath():String
		{
			return name.packagePath;
		}
		
		public function InstanceInfo()
		{
			
		}
		
		public function dispose():void
		{
			name = null;
			superName = null;
			protectedNamespace = null;
			interfaces = null;
			initMethod = null;
			traits = null;
			classReference = null;
		}
		
		public function findTrait(str:String):Trait
		{
			for each(var trait:Trait in traits)
			{
				if (trait.name.name == str)
				{
					return trait;
				}
			}
			
			return null;
		}
		
		public function toString():String
		{
			var ret:String = "InstanceInfo " + name.namespaceLink.name + "." + name.name + "\n";
			
			ret += "package " + name.namespaceLink.name;
			ret += "\n{";
			ret += "\n\t";
			
			if (protectedNamespace)
			{
				ret += protectedNamespace.name + " ";
			}
			else
			{
				ret += "public ";
			}
			
			ret += (isFinal) ? "final " : "";
			ret += (isInterface) ? "interface " : "class ";
			ret += name.name + " extends " + superName.name;
			
			if (interfaces && interfaces.length > 0)
			{
				ret += " implements ";
				for each(var mn:MultinameInfo in interfaces)
				{
					ret += mn;
					if (mn != interfaces[interfaces.length - 1])
					{
						ret += ", ";
					}
				}
			}
			ret += "\n\t" + "{";
			
			var trait:Trait;
			
			if (traits && traits.length > 0)
			{
				for each (trait in traits)
				{
					if (trait is TraitSlotAndConst)
					{
						ret += "\n\t\t" + trait;
					}
				}
				
				ret += "\n\t\t";
			}
			
			if (initMethod)
			{
				ret += "\n\t\t" + "public function " + name.name + initMethod;
				ret += "\n\t\t" + "{";
				ret += "\n\t\t" + "}";
				ret += "\n\t\t" + "";
			}
			
			if (traits && traits.length > 0)
			{
				for each (trait in traits)
				{
					if (trait is TraitMethod)
					{
						ret += "\n\t\t" + trait;
						ret += "\n\t\t" + "{";
						ret += "\n\t\t" + "}";
						ret += "\n\t\t" + "";
					}
				}
			}
			
			ret += "\n\t" + "}";
			ret += "\n}";
			
			return ret;
		}
	}
	
}