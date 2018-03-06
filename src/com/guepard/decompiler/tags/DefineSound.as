package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineSound extends Tag
	{
		public var data:ByteArray;
		
		public var format:uint;
		public var rate:uint;
		public var size:uint;
		public var soundType:uint;
		
		public var sampleCount:uint;
		public var path:String;
		
		public function DefineSound()
		{
			super();
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			data = null;
		}
		
		override public function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			
			stream.synchBits();
			
			format = stream.readUBits(4);
			rate = stream.readUBits(2);
			size = stream.readUBits(1);
			soundType = stream.readUBits(1);
			
			stream.synchBits();
			
			sampleCount = stream.byteArray.readUnsignedInt();
			
			data = new ByteArray();
			
			stream.byteArray.readBytes(data, 0, stream.byteArray.bytesAvailable);
		}
		
		override public function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			
			stream.flushBits();
			
			stream.writeUBits(4, format);
			stream.writeUBits(2, rate);
			stream.writeUBits(1, size);
			stream.writeUBits(1, soundType);
			
			stream.flushBits();
			
			stream.byteArray.writeInt(sampleCount);
			
			stream.byteArray.writeBytes(data, 0, data.length);
		}
		
		override public function toString():String
		{
			return tagName + " (id:" + id + ", data.length:" + data.length + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.id = id;
			
			node.attributes.format = AudioCodingFormat.getFormatName(format);
			node.attributes.rate = AudioCodingFormat.getRateName(rate);
			node.attributes.size = (size ? 16 : 8) + "Bit";
			node.attributes.type = soundType ? "stereo" : "mono";
			node.attributes.path = path;
			
			node.attributes.sampleCount = sampleCount;
			
			return node;
		}
	}
	
}