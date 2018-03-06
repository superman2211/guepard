package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineFont extends Tag
	{
		public var name:String;
		
		private var _chars:Array;
		
		public function get chars():Array
		{
			return _chars;
		}
		
		public function DefineFont()
		{
			super();
			
			_chars = [];
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			_chars = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
		}
		
		public override function write():void
		{
			
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", id: " + id + ")";
		}
		
	}
	
}