package flash.utils
{
	
	public class ByteArray implements IDataInput, IDataOutput
	{
		
		public static function get defaultObjectEncoding():uint
		{
		}
		
		public static function set defaultObjectEncoding(version:uint):void
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
		
		public function get position():uint
		{
		}
		
		public function set position(offset:uint):void
		{
		}
		
		public function get objectEncoding():uint
		{
		}
		
		public function set objectEncoding(version:uint):void
		{
		}
		
		public function get length():uint
		{
		}
		
		public function set length(value:uint):void
		{
		}
		
		public function ByteArray()
		{
		}
		
		public function writeUTFBytes(value:String):void
		{
		}
		
		public function readObject():Object
		{
		}
		
		public function writeObject(object:Object):void
		{
		}
		
		public function readShort():int
		{
		}
		
		public function writeDouble(value:Number):void
		{
		}
		
		public function writeByte(value:int):void
		{
		}
		
		public function readUnsignedShort():uint
		{
		}
		
		public function writeInt(value:int):void
		{
		}
		
		public function readBoolean():Boolean
		{
		}
		
		public function readDouble():Number
		{
		}
		
		public function readUTF():String
		{
		}
		
		public function readUTFBytes(length:uint):String
		{
		}
		
		public function readUnsignedInt():uint
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
		
		public function writeMultiByte(value:String, charSet:String):void
		{
		}
		
		public function writeBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void
		{
		}
		
		public function writeFloat(value:Number):void
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
		
		public function compress():void
		{
		}
		
		public function toString():String
		{
		}
		
		public function readFloat():Number
		{
		}
		
		public function readInt():int
		{
		}
		
		public function readMultiByte(length:uint, charSet:String):String
		{
		}
		
		public function uncompress():void
		{
		}
		
		public function readBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void
		{
		}
		
	}
}
