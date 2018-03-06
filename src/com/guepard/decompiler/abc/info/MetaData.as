package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class MetaData
	{
		public var name:String;
		public var itemInfos:Array;
		
		public function MetaData()
		{
			
		}
		
		public function dispose():void
		{
			itemInfos = null;
		}
		
		public function toString():String
		{
			return "MetaData (name:" + name + ", length:" + itemInfos.length + ")";
		}
	}
	
}