package flash.net
{
	import flash.events.*;
	import flash.utils.*;
	
	public class Socket extends EventDispatcher implements IDataInput, IDataOutput
	{
		
		public function get connected():Boolean
		{
		}
		
		public function get endian():String
		{
		}
		
		public function set endian(type:String):void
		{
		}
		
		public function get bytesAvailable():uint
		{
		}
		
		public function get objectEncoding():uint
		{
		}
		
		public function set objectEncoding(version:uint):void
		{
		}
		
		public function Socket(host:String = null, port:int = 0)
		{
			
		}
		
		public function writeUTFBytes(value:String):void
		{
		}
		
		public function flush():void
		{
		}
		
		public function writeByte(value:int):void
		{
		}
		
		public function writeInt(value:int):void
		{
		}
		
		public function readShort():int
		{
		}
		
		public function readUnsignedShort():uint
		{
		}
		
		public function writeDouble(value:Number):void
		{
		}
		
		public function readObject():Object
		{
		}
		
		public function readDouble():Number
		{
		}
		
		public function readUTF():String
		{
		}
		
		public function readBoolean():Boolean
		{
		}
		
		public function readUTFBytes(length:uint):String
		{
		}
		
		public function writeMultiByte(value:String, charSet:String):void
		{
		}
		
		public function writeFloat(value:Number):void
		{
		}
		
		public function readByte():int
		{
		}
		
		public function writeUTF(value:String):void
		{
		}
		
		public function writeBoolean(value:Boolean):void
		{
		}
		
		public function readUnsignedInt():uint
		{
		}
		
		public function writeBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void
		{
		}
		
		public function readUnsignedByte():uint
		{
		}
		
		public function writeUnsignedInt(value:uint):void
		{
		}
		
		public function writeShort(value:int):void
		{
		}
		
		public function readFloat():Number
		{
		}
		
		public function connect(host:String, port:int):void
		{
		}
		
		public function readMultiByte(length:uint, charSet:String):String
		{
		}
		
		public function close():void
		{
		}
		
		public function readInt():int
		{
		}
		
		public function readBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void
		{
		}
		
		public function writeObject(object:Object):void
		{
		}
		
	}
}
