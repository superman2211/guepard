package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	import flash.utils.ByteArray;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineFontName extends Tag
	{
		public var name:String;
		public var copyright:String;
		
		public function DefineFontName()
		{
			
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			name = null;
			copyright = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			name = stream.readString();
			copyright = stream.readString();
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			stream.writeString(name);
			stream.writeString(copyright);
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", fontId: " + id + ", name: " + name + ", copyright: " + copyright + ")";
		}
	}
	
}