package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ItemInfo
	{
		public var keyIndex:uint;
		public var valueIndex:uint;
		
		public function ItemInfo()
		{
			
		}
		
		public function toString():String
		{
			return "ItemInfo (key:" + keyIndex + ", value:" + valueIndex + ")";
		}
	}
	
}