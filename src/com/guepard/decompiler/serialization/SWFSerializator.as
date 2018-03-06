package com.guepard.decompiler.serialization
{
	import com.guepard.decompiler.data.SWFData;
	
	import flash.utils.ByteArray;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SWFSerializator
	{
		public static function read(byteArray:ByteArray):SWFData
		{
			var stream:SWFStream = new SWFStream(byteArray);
			var swf:SWFData = new SWFData();
			
			var compressed:String = stream.readChar();
			if (compressed != "F" && compressed != "C")
			{
				throw new Error("Invalid SWF File Signature");
			}
			
			if ((stream.readChar() != "W") || (stream.readChar() != "S"))
			{
				throw new Error("Invalid SWF File Signature");
			}
			
			swf.version = stream.byteArray.readUnsignedByte();
			
			var fileSize:uint = stream.byteArray.readUnsignedInt();
			
			swf.compressed = compressed == "C";
			
			if (swf.compressed)
			{
				var uncompressedByteArray:ByteArray = new ByteArray();
				stream.byteArray.readBytes(uncompressedByteArray);
				uncompressedByteArray.position = 0;
				uncompressedByteArray.uncompress();
				uncompressedByteArray.position = 0;
				stream.byteArray = uncompressedByteArray;
			}
			
			swf.size = stream.readRectangle();
			
			swf.frameRate = stream.byteArray.readUnsignedShort() / 256;
			
			swf.frameCount = stream.byteArray.readUnsignedShort();
			
			stream.readTagList(swf);
			
			return swf;
		}
		
		public static function write(swf:SWFData):ByteArray
		{
			var stream:SWFStream = new SWFStream(new ByteArray());
			
			stream.writeChar("F");
			stream.writeChar("W");
			stream.writeChar("S");
			stream.byteArray.writeByte(swf.version);
			
			var content:SWFStream = new SWFStream(new ByteArray());
			content.writeRectangle(swf.size);
			content.byteArray.writeShort(swf.frameRate * 256);
			content.byteArray.writeShort(swf.frameCount);
			
			content.writeTagList(swf);
			
			var fileSize:uint = content.byteArray.length + 4 + stream.byteArray.length;
			
			stream.byteArray.writeUnsignedInt(fileSize);
			
			stream.byteArray.writeBytes(content.byteArray);
			
			stream.byteArray.position = 0;
			return stream.byteArray;
		}
		
		public static function isSwf(byteArray:ByteArray):Boolean
		{
			var stream:SWFStream = new SWFStream(byteArray);
			
			var compressed:String = stream.readChar();
			
			if (compressed != "F" && compressed != "C")
			{
				return false;
			}
			
			if ((stream.readChar() != "W") || (stream.readChar() != "S"))
			{
				return false;
			}
			
			return true;
		}
	}
}