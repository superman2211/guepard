package com.guepard.decompiler.abc.info
{
	import com.guepard.decompiler.abc.traits.Trait;
	import com.guepard.decompiler.abc.traits.TraitMethod;
	import com.guepard.decompiler.abc.traits.TraitSlotAndConst;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ClassInfo
	{
		public var initMethod:MethodInfo;
		
		public var traits:Array;
		
		public var instanceReference:InstanceInfo;
		
		public function get packageName():String
		{
			return instanceReference.name.namespaceLink.name;
		}
		
		public function get fullName():String
		{
			return (packageName ? packageName + "." : "") + name;
		}
		
		public function get name():String
		{
			return instanceReference.name.name;
		}
		
		public function ClassInfo()
		{
			
		}
		
		public function dispose():void
		{
			initMethod = null;
			traits = null;
			instanceReference = null;
		}
		
		public function toString():String
		{
			var ret:String = "ClassInfo " + fullName + "\n";
			
			ret += "package " + packageName;
			ret += "\n{";
			ret += "\n\t";
			
			if (instanceReference.protectedNamespace)
			{
				ret += instanceReference.protectedNamespace.name + " ";
			}
			else
			{
				ret += "public ";
			}
			
			ret += (instanceReference.isFinal) ? "final " : "";
			ret += (instanceReference.isInterface) ? "interface " : "class ";
			if (instanceReference)
			{
				if (instanceReference.name)
				{
					ret += instanceReference.name.name;
				}
				
				if (instanceReference.superName)
				{
					ret += " extends " + instanceReference.superName.name;
				}
			}
			
			if (instanceReference.interfaces && instanceReference.interfaces.length > 0)
			{
				ret += " implements ";
				for each(var mn:MultinameInfo in instanceReference.interfaces)
				{
					ret += mn;
					if (mn != instanceReference.interfaces[instanceReference.interfaces.length - 1])
					{
						ret += ", ";
					}
				}
			}
			ret += "\n\t" + "{";
			
			ret += "\n\t\t" + "//static properties";
			
			var trait:Trait;
			
			if (traits && traits.length > 0)
			{
				for each (trait in traits)
				{
					if (trait is TraitSlotAndConst)
					{
						ret += "\n\t\t" + "static " + trait;
					}
				}
				
				ret += "\n\t\t";
			}
			
			ret += "\n\t\t" + "//instance properties";
			
			if (instanceReference.traits && instanceReference.traits.length > 0)
			{
				for each (trait in instanceReference.traits)
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
				ret += "\n\t\t" + "//constructor";
				ret += "\n\t\t" + "public function " + instanceReference.name.name + instanceReference.initMethod;
				ret += "\n\t\t" + "{";
				ret += "\n\t\t\t//static part";
				if (initMethod.body)
				{
					ret += "\n" + initMethod.body.getInfo("\t\t\t");
				}
				ret += "\n\t\t\t//instance part";
				if (instanceReference.initMethod.body)
				{
					ret += "\n" + instanceReference.initMethod.body.getInfo("\t\t\t");
				}
				ret += "\n\t\t" + "}";
				ret += "\n\t\t" + "";
			}
			
			ret += "\n\t\t" + "//instance methods";
			if (instanceReference.traits && instanceReference.traits.length > 0)
			{
				for each (trait in instanceReference.traits)
				{
					if (trait is TraitMethod)
					{
						ret += "\n\t\t" + trait;
						ret += "\n\t\t" + "{";
						if (TraitMethod(trait).method.body)
						{
							ret += "\n" + TraitMethod(trait).method.body.getInfo("\t\t\t");
						}
						ret += "\n\t\t" + "}";
						ret += "\n\t\t" + "";
					}
				}
			}
			
			ret += "\n\t\t" + "//static methods";
			if (traits && traits.length > 0)
			{
				for each (trait in traits)
				{
					if (trait is TraitMethod)
					{
						ret += "\n\t\t" + "static " + trait;
						ret += "\n\t\t" + "{";
						if (TraitMethod(trait).method.body)
						{
							ret += "\n" + TraitMethod(trait).method.body.getInfo("\t\t\t");
						}
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