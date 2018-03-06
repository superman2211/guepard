package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.serialization.SWFStream;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineText2 extends DefineText
	{
		public function DefineText2()
		{
			super();
		}
		
		override protected function readColor(stream:SWFStream):uint
		{
			return stream.readRGBA();
		}
		
		override protected function writeColor(stream:SWFStream, color:uint):void
		{
			stream.writeRGBA(color);
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", id:" + id + ")";
		}
	}
	
}