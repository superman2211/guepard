package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	import flash.utils.ByteArray;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineFontAlignZones extends Tag
	{
		public var data:ByteArray;
		
		public function DefineFontAlignZones()
		{
			
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			data = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			
			data = new ByteArray();
			stream.byteArray.readBytes(data, 0, stream.byteArray.bytesAvailable);
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			stream.byteArray.writeBytes(data, 0, data.length);
		}
		
		override public function toString():String
		{
			return "DefineFontAlignZones (length:" + bytes.length + ", fontId: " + id + ", data: " + data.length + ")";
		}
		
	}
	
}