package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class FileAttributes extends Tag
	{
		public var flags:uint;
		
		public function get hasMetadata():Boolean
		{
			return Boolean(flags & 0x10);
		}
		
		public function get avm2():Boolean
		{
			return Boolean(flags & 0x08);
		}
		
		public function get useNetwork():Boolean
		{
			return Boolean(flags & 0x01);
		}
		
		public function FileAttributes()
		{
			super();
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			flags = stream.byteArray.readUnsignedByte();
		}
	}
}