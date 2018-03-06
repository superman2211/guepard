package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.abc.ABCData;
	import com.guepard.decompiler.abc.ABCSerializator;
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	import flash.utils.ByteArray;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DoABC extends Tag
	{
		public var flags:uint;
		public var name:String;
		public var abc:ABCData;
		private var abcByteArray:ByteArray;
		
		public function DoABC()
		{
			
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			abc.dispose();
			abc = null;
			
			name = null;
			abcByteArray = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			flags = stream.byteArray.readUnsignedInt();
			name = stream.readString();
			
			abcByteArray = new ByteArray();
			stream.byteArray.readBytes(abcByteArray, 0, stream.byteArray.bytesAvailable);
			
			abc = ABCSerializator.read(abcByteArray);
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeUnsignedInt(flags);
			stream.writeString(name);
			
			var oldAbcByteArray:ByteArray = abcByteArray;
			
			abcByteArray = ABCSerializator.write(abc);
			
			stream.byteArray.writeBytes(abcByteArray);
		}
		
		override public function toString():String
		{
			return tagName + " (name:" + name + ", length:" + bytes.length + ", flags:" + flags + ")";
		}
		
	}
	
}