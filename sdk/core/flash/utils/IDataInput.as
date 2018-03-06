package flash.utils
{
	
	public interface IDataInput
	{
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		{
		}
		
		function get bytesAvailable():uint
		
		function get objectEncoding():uint
		
		function set objectEncoding(version:uint):void
		
		function get endian():String
		
		function set endian(type:String):void
		
		public function IDataInput();
		
		function readUnsignedInt():uint
		
		function readShort():int
		
		function readMultiByte(length:uint, charSet:String):String
		
		function readFloat():Number
		
		function readDouble():Number
		
		function readUnsignedShort():uint
		
		function readBoolean():Boolean
		
		function readUnsignedByte():uint
		
		function readBytes(bytes:ByteArray, offset:uint = 0, length:uint = 0):void
		
		function readUTF():String
		
		function readInt():int
		
		function readUTFBytes(length:uint):String
		
		function readObject():Object;
		
		function readByte():int
		
	}
}
