package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	import com.guepard.utils.ColorUtil;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SetBackgroundColor extends Tag
	{
		public var color:uint;
		
		public function SetBackgroundColor()
		{
			
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			var r:uint = stream.byteArray.readUnsignedByte();
			var g:uint = stream.byteArray.readUnsignedByte();
			var b:uint = stream.byteArray.readUnsignedByte();
			
			color = ColorUtil.fromRGB(r, g, b).rgb;
		}
	}
}