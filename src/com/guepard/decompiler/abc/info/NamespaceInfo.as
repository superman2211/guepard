package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class NamespaceInfo
	{
		public var kind:uint;
		public var name:String = "*";
		public var info:String = "";
		
		public function NamespaceInfo()
		{
			
		}
		
		public function equals(value:NamespaceInfo):Boolean
		{
			return info == value.info && name == value.name && kind == value.kind;
		}
		
		public function toString():String
		{
			return name;
		}
	}
	
}