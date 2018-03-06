package com.guepard.decompiler.tags
{
	import by.blooddy.crypto.Base64;
	
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineBinaryData extends Tag
	{
		public var reserved:uint;
		public var data:ByteArray;
		
		public function DefineBinaryData()
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
			reserved = stream.byteArray.readUnsignedInt();
			
			data = new ByteArray();
			
			stream.byteArray.readBytes(data);
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			stream.byteArray.writeInt(reserved);
			
			stream.byteArray.writeBytes(data);
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.id = id;
			node.attributes.reserved = reserved;
			node.attributes.data = Base64.encode(data);
			
			return node;
		}
	}
	
}