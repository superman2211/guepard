package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class OptionInfo
	{
		public var value:Object;
		public var kind:uint;
		public var valueIndex:uint;
		
		public function OptionInfo()
		{
			
		}
		
		public function toString():String
		{
			return "OptionInfo (value:" + value + ", kind:" + kind + ")";
		}
	}
	
}