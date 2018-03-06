package com.guepard.decompiler.abc.traits
{
	import com.guepard.decompiler.abc.info.ConstantsInfo;
	import com.guepard.decompiler.abc.info.MethodInfo;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TraitMethod extends Trait
	{
		public var method:MethodInfo;
		
		public function TraitMethod()
		{
			
		}
		
		public override function toString():String
		{
			var ret:String = "";
			
			if (finalAttr) ret += "final ";
			if (overrideAttr) ret += "override ";
			
			if (name && name.namespaceLink)
			{
				ret += (name.namespaceLink.name == "") ? "public " : name.namespaceLink.name + " ";
			}
			
			var kindMethod:uint = kind & 0x0f;
			
			if (kindMethod == ConstantsInfo.TRAIT_Function || kindMethod == ConstantsInfo.TRAIT_Method)
			{
				ret += "function ";
			}
			else if (kindMethod == ConstantsInfo.TRAIT_Setter)
			{
				ret += "function set ";
			}
			else if (kindMethod == ConstantsInfo.TRAIT_Getter)
			{
				ret += "function get ";
			}
			else
			{
				ret += "function ";
			}
			
			ret += name.name;
			
			ret += method;
			
			return ret;
		}
	}
	
}