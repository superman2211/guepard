package com.guepard.decompiler.abc.traits
{
	import com.guepard.decompiler.abc.info.ConstantsInfo;
	import com.guepard.decompiler.abc.info.MultinameInfo;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TraitSlotAndConst extends Trait
	{
		public var type:MultinameInfo;
		public var value:Object;
		public var valueIndex:uint;
		public var valueKind:uint;
		
		public function TraitSlotAndConst()
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
			
			if (kindMethod == ConstantsInfo.TRAIT_Slot)
			{
				ret += "var ";
			}
			else if (kindMethod == ConstantsInfo.TRAIT_Const)
			{
				ret += "const ";
			}
			
			ret += name.name;
			
			if (type)
			{
				ret += ":" + type.name;
			}
			
			if (value)
			{
				if (value is String)
				{
					ret += ' = "' + value + '"';
				}
				else
				{
					ret += " = " + value;
				}
			}
			
			ret += ";";
			
			return ret;
		}
	}
	
}