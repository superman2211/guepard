package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.CorrectParameters;
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.data.TagList;
	import com.guepard.decompiler.serialization.SWFStream;
	
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineSprite extends Tag
	{
		public var frames:uint;
		public var tags:TagList;
		
		public function DefineSprite()
		{
			tags = new TagList();
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			tags.dispose();
			tags = null;
		}
		
		override public function correct(parameters:CorrectParameters):void
		{
			parameters.defines[id] = this;
			
			parameters = parameters.clone();
			parameters.list = tags;
			
			tags.correctTags(parameters);
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			frames = stream.byteArray.readUnsignedShort();
			stream.readTagList(tags);
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			stream.byteArray.writeShort(frames);
			stream.writeTagList(tags);
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", id:" + id + ", frames:" + frames + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			node.attributes.id = id;
			node.attributes.frames = frames;
			
			for (var i:int = 0; i < tags.numTags; i++)
			{
				node.appendChild(tags.getTagAt(i).toXML());
			}
			
			return node;
		}
	}
	
}