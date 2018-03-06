package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.serialization.SWFStream;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineFont2 extends DefineFont
	{
		public function DefineFont2()
		{
			super();
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
		}
		
		public override function write():void
		{
			
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", id: " + id + ")";
		}
	}
	
}