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
	public class RemoveObject2 extends Tag
	{
		public var depth:uint;
		
		public function RemoveObject2()
		{
			
		}
		
		override public function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			depth = stream.byteArray.readUnsignedShort();
		}
		
		override public function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(depth);
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + " depth:" + depth + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.depth = depth;
			
			return node;
		}
	}
	
}