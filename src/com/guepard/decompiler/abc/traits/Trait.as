package com.guepard.decompiler.abc.traits
{
	import com.guepard.decompiler.abc.info.MultinameInfo;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Trait
	{
		public var name:MultinameInfo;
		
		public var kind:uint;
		public var id:uint;
		
		public var data:uint;
		
		public var metadata:Array;
		
		public var finalAttr:Boolean;
		public var overrideAttr:Boolean;
		public var publicAttr:Boolean;
		
		public function Trait()
		{
			
		}
		
		public function toString():String
		{
			return "Trait (name:" + name + ", kind:" + kind + ", id:" + id + ")";
		}
	}
	
}