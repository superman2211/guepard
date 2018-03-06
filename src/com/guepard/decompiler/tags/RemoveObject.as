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
	public class RemoveObject extends Tag
	{
		public var depth:uint;
		
		public function RemoveObject()
		{
			
		}
		
		override public function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			depth = stream.byteArray.readUnsignedShort();
		}
		
		override public function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			stream.byteArray.writeShort(depth);
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", id:" + id + " depth:" + depth + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.id = id;
			node.attributes.depth = depth;
			
			return node;
		}
	}
	
}