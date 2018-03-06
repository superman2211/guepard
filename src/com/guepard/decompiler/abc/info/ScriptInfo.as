package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ScriptInfo
	{
		public var initMethod:MethodInfo;
		
		public var traits:Array;
		
		public function ScriptInfo()
		{
			
		}
		
		public function dispose():void
		{
			initMethod = null;
			traits = null;
		}
		
	}
	
}