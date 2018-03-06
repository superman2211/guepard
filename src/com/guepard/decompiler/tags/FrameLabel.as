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
	public class FrameLabel extends Tag
	{
		public var name:String;
		
		public function FrameLabel()
		{
			super();
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			name = null;
		}
		
		override public function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			name = stream.readString();
		}
		
		override public function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.writeString(name);
		}
		
		override public function toString():String
		{
			return tagName + " (name:" + name + ", length:" + bytes.length + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.name = name;
			
			return node;
		}
	}
	
}