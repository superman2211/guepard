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
	public class DefineButton2 extends Tag
	{
		public var actionsBytes:ByteArray;
		public var flags:uint;
		public var actionOffset:uint;
		public var characters:Vector.<ButtonRecord>;
		
		public function DefineButton2()
		{
			super();
		}
		
		override public function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			
			flags = stream.byteArray.readUnsignedByte();
			
			actionOffset = stream.byteArray.readUnsignedShort();
			
			characters = new Vector.<ButtonRecord>();
			
			var endFlag:uint = stream.byteArray.readUnsignedByte();
			
			while (endFlag)
			{
				stream.byteArray.position--;
				
				var record:ButtonRecord = new ButtonRecord();
				record.read(stream, this);
				characters.push(record);
				
				endFlag = stream.byteArray.readUnsignedByte();
			}
			
			actionsBytes = new ByteArray();
			stream.byteArray.readBytes(actionsBytes, 0, stream.byteArray.bytesAvailable);
		}
		
		override public function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			
			stream.byteArray.writeByte(flags);
			
			stream.byteArray.writeShort(actionOffset);
			
			for each(var record:ButtonRecord in characters)
			{
				record.write(stream, this);
			}
			
			stream.byteArray.writeByte(0);
			
			stream.byteArray.writeBytes(actionsBytes, 0, actionsBytes.length);
		}
		
		override public function toString():String
		{
			return tagName + " (id:" + id + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.id = id;
			
			for each(var record:ButtonRecord in characters)
			{
				node.appendChild(record.toXML());
			}
			
			return node;
		}
	}
	
}