/// <reference path="../flash.js" />
/// <reference path="Endian.js" />

/*class flash.utils.ByteArray*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._data = null;
	d._position = 0;
	d._endian = null;
	d._objectEncoding = 0;
	
	
	/*public*/
	d.get_bytesAvailable = function ()/*uint*/
	{
		return this._data.length - this._position;
	};
	
	/*public*/
	d.get_endian = function ()/*String*/
	{
		return this._endian;
	};
	
	/*public*/
	d.set_endian = function (value/*String*/)/*void*/
	{
		this._endian = value;
		
		return value;
	};
	
	/*public*/
	d.get_length = function ()/*uint*/
	{
		return this._data.length;
	};
	
	/*public*/
	d.set_length = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this._data.length = value;
		
		if (this._position > this._data.length)
		{
			this._position = this._data.length;
		}
		
		return value;
	};
	
	/*public*/
	d.get_objectEncoding = function ()/*uint*/
	{
		return this._objectEncoding;
	};
	
	/*public*/
	d.set_objectEncoding = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this._objectEncoding = value;
		
		return value;
	};
	
	/*public*/
	d.get_position = function ()/*uint*/
	{
		return this._position;
	};
	
	/*public*/
	d.set_position = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this._position = value;
		
		if (this._position > this._data.length)
		{
			this._position = this._data.length;
		}
		
		return value;
	};
	
	
	/*public*/
	d.ByteArray = function ()
	{
		this._data = [];
		this._position = 0;
		this._endian = flash.utils.Endian.BIG_ENDIAN;
		this._objectEncoding = flash.utils.ByteArray.get_defaultObjectEncoding();
		
		flash.linkage(this, flash.utils.ByteArray);
	};
	
	/*public*/
	d.clear = function ()/*void*/
	{
		this._data.length = 0;
		this._position = 0;
	};
	
	/*public*/
	d.compress = function ()/*void*/
	{
		//TODO
		
		throw new Error("This method not implemented");
	};
	
	/*public*/
	d.readBoolean = function ()/*Boolean*/
	{
		return this.readUnsignedByte() != 0;
	};
	
	/*public*/
	d.readByte = function ()/*int*/
	{
		var b = this.readUnsignedByte();
		
		if (b > 127) b -= 256;
		
		return b;
	};
	
	/*public*/
	d.readBytes = function (bytes/*ByteArray*/, offset/*uint*/, length/*uint*/)/*void*/
	{
		if (offset == undefined) offset = 0;
		offset = /*uint*/Math.floor(offset);
		if (length == undefined) length = 0;
		length = /*uint*/Math.floor(length);
		
		//TODO
		
		throw new Error("This method not implemented");
	};
	
	/*public*/
	d.readDouble = function ()/*Number*/
	{
		var i0 = this.readUnsignedInt();
		var i1 = this.readUnsignedInt();
		
		if (this._endian == flash.utils.Endian.BIG_ENDIAN)
		{
			return flash.utils.ByteArray._decodeDouble(i1, i0);
		}
		else
		{
			return flash.utils.ByteArray._decodeDouble(i0, i1);
		}
	};
	
	/*public*/
	d.readFloat = function ()/*Number*/
	{
		var i = this.readUnsignedInt();
		
		return flash.utils.ByteArray._decodeFloat(i);
	};
	
	/*public*/
	d.readInt = function ()/*int*/
	{
		var i = this.readUnsignedInt();
		
		if (i > 2147483647) i -= 4294967296;
		
		return i;
	};
	
	/*public*/
	d.readMultiByte = function (length/*uint*/, charSet/*String*/)/*String*/
	{
		length = /*uint*/Math.floor(length);
		
		//TODO
		
		throw new Error("This method not implemented");
		
		return null;
	};
	
	/*public*/
	d.readObject = function ()/*Object*/
	{
		//TODO
		
		throw new Error("This method not implemented");
		
		return null;
	};
	
	/*public*/
	d.readShort = function ()/*int*/
	{
		var s = this.readUnsignedShort();
		
		if (s > 32767) s -= 65536;
		
		return s;
	};
	
	d._writeUTF8String = function (bytes/*ByteArray*/, source/*String*/)/*void*/
	{
		for (var i = 0; i < source.length; i++)
		{
			var charcode = source.charCodeAt(i);
			
			if (charcode < 0x80)
			{
				bytes.writeByte(charcode);
			}
			else if (charcode < 0x800)
			{
				bytes.writeByte(0xc0 | (charcode >> 6),
					0x80 | (charcode & 0x3f));
			}
			else if (charcode < 0xd800 || charcode >= 0xe000)
			{
				bytes.writeByte(0xe0 | (charcode >> 12),
					0x80 | ((charcode >> 6) & 0x3f),
					0x80 | (charcode & 0x3f));
			}
			else// surrogate pair
			{
				i++;
				// UTF-16 encodes 0x10000-0x10FFFF by
				// subtracting 0x10000 and splitting the
				// 20 bits of 0x0-0xFFFFF into two halves
				charcode = 0x10000 + (((charcode & 0x3ff) << 10)
					| (str.charCodeAt(i) & 0x3ff))
				bytes.writeByte(0xf0 | (charcode >> 18),
					0x80 | ((charcode >> 12) & 0x3f),
					0x80 | ((charcode >> 6) & 0x3f),
					0x80 | (charcode & 0x3f));
			}
		}
	};
	
	/*private*/
	d._readUTF8String = function (bytes/*ByteArray*/, length/*int*/)/*String*/
	{
		if (!bytes || !bytes.get_bytesAvailable)
		{
			flash.trace();
		}
		
		var string = "";
		
		while (bytes.get_bytesAvailable() && length)
		{
			var byte1 = bytes.readUnsignedByte();
			
			if (byte1 < 0x80)
			{
				string += String.fromCharCode(byte1);
			}
			else if (byte1 >= 0xC2 && byte1 < 0xE0)
			{
				var byte2 = bytes.readUnsignedByte();
				
				string += String.fromCharCode(((byte1 & 0x1F) << 6) + (byte2 & 0x3F));
			}
			else if (byte1 >= 0xE0 && byte1 < 0xF0)
			{
				var byte2 = bytes.readUnsignedByte();
				var byte3 = bytes.readUnsignedByte();
				
				string += String.fromCharCode(((byte1 & 0xFF) << 12) + ((byte2 & 0x3F) << 6) + (byte3 & 0x3F));
			}
			else if (byte1 >= 0xF0 && byte1 < 0xF5)
			{
				var byte2 = bytes.readUnsignedByte();
				var byte3 = bytes.readUnsignedByte();
				var byte4 = bytes.readUnsignedByte();
				
				var codepoint = ((byte1 & 0x07) << 18) + ((byte2 & 0x3F) << 12) + ((byte3 & 0x3F) << 6) + (byte4 & 0x3F);
				
				codepoint -= 0x10000;
				
				string += String.fromCharCode(
					(codepoint >> 10) + 0xD800,
					(codepoint & 0x3FF) + 0xDC00
				);
			}
			
			length--;
		}
		
		return string;
	};
	
	/*private*/
	d._update = function ()/*void*/
	{
		for (var i = 0; i < this._data.length; i++)
		{
			this[ i ] = this._data[ i ];
		}
	};
	
	/*public*/
	d.readUTFBytes = function (length/*uint*/)/*String*/
	{
		length = /*uint*/Math.floor(length);
		
		var string = this._readUTF8String(this, length);
		
		return string;
	};
	
	/*public*/
	d.readUTF = function ()/*String*/
	{
		var string = this._readUTF8String(this, this._data.length);
		
		return string;
	};
	
	/*public*/
	d.readUnsignedByte = function ()/*uint*/
	{
		if (this._position < this._data.length)
		{
			var b = this._data[ this._position ];
			
			this._position++;
			
			return b;
		}
		else
		{
			throw new Error("End of file was encountered.");
		}
	};
	
	/*public*/
	d.readUnsignedInt = function ()/*uint*/
	{
		var b1 = this.readUnsignedByte();
		var b2 = this.readUnsignedByte();
		var b3 = this.readUnsignedByte();
		var b4 = this.readUnsignedByte();
		
		var i;
		
		if (this._endian == flash.utils.Endian.BIG_ENDIAN)
		{
			i = (b1 << 24) + (b2 << 16) + (b3 << 8) + b4;
		}
		else
		{
			i = (b4 << 24) + (b3 << 16) + (b2 << 8) + b1;
		}
		
		if (i < 0) i += 4294967296;
		
		return i;
	};
	
	/*public*/
	d.readUnsignedShort = function ()/*uint*/
	{
		var b1 = this.readUnsignedByte();
		var b2 = this.readUnsignedByte();
		
		if (this._endian == flash.utils.Endian.BIG_ENDIAN)
		{
			return (b1 << 8) + b2;
		}
		else
		{
			return (b2 << 8) + b1;
		}
	};
	
	/*public*/
	d.toString = function ()/*String*/
	{
		var position = this._position;
		
		this._position = 0;
		
		var string = this._readUTF8String(this, this._data.length);
		
		this._position = position;
		
		return string;
	};
	
	/*public*/
	d.uncompress = function ()/*void*/
	{
		//TODO
		
		throw new Error("This method not implemented");
	};
	
	/*public*/
	d.writeBoolean = function (value/*Boolean*/)/*void*/
	{
		this.writeByte(value ? 1 : 0);
	};
	
	/*public*/
	d.writeByte = function (value/*int*/)/*void*/
	{
		var p = this._position;
		this._data[ p ] = this[ p ] = value & 0xff;
		this._position++;
	};
	
	/*public*/
	d.writeBytes = function (bytes/*ByteArray*/, offset/*uint*/, length/*uint*/)/*void*/
	{
		if (offset == undefined) offset = 0;
		offset = /*uint*/Math.floor(offset);
		if (length == undefined) length = 0;
		length = /*uint*/Math.floor(length);
		
		//TODO
		
		throw new Error("This method not implemented");
	};
	
	/*public*/
	d.writeDouble = function (value/*Number*/)/*void*/
	{
		var array = flash.utils.ByteArray._encodeDouble(value);
		
		if (this._endian == flash.utils.Endian.BIG_ENDIAN)
		{
			this.writeUnsignedInt(array[ 1 ]);
			this.writeUnsignedInt(array[ 0 ]);
		}
		else
		{
			this.writeUnsignedInt(array[ 0 ]);
			this.writeUnsignedInt(array[ 1 ]);
		}
	};
	
	/*public*/
	d.writeFloat = function (value/*Number*/)/*void*/
	{
		var i = flash.utils.ByteArray._encodeFloat(value);
		
		this.writeUnsignedInt(i);
	};
	
	/*public*/
	d.writeInt = function (value/*int*/)/*void*/
	{
		var b1 = value >> 24 & 0xff;
		var b2 = value >> 16 & 0xff;
		var b3 = value >> 8 & 0xff;
		var b4 = value & 0xff;
		
		if (this._endian == flash.utils.Endian.BIG_ENDIAN)
		{
			this.writeByte(b1);
			this.writeByte(b2);
			this.writeByte(b3);
			this.writeByte(b4);
		}
		else
		{
			this.writeByte(b4);
			this.writeByte(b3);
			this.writeByte(b2);
			this.writeByte(b1);
		}
	};
	
	/*public*/
	d.writeMultiByte = function (value/*String*/, charSet/*String*/)/*void*/
	{
		//TODO
		
		throw new Error("This method not implemented");
	};
	
	/*public*/
	d.writeObject = function (object/*Object*/)/*void*/
	{
		//TODO
		
		throw new Error("This method not implemented");
	};
	
	/*public*/
	d.writeShort = function (value/*int*/)/*void*/
	{
		var b1 = value >> 8 & 0xff;
		var b2 = value & 0xff;
		
		if (this._endian == flash.utils.Endian.BIG_ENDIAN)
		{
			this.writeByte(b1);
			this.writeByte(b2);
		}
		else
		{
			this.writeByte(b2);
			this.writeByte(b1);
		}
	};
	
	/*public*/
	d.writeUTF = function (value/*String*/)/*void*/
	{
		//TODO
		
		throw new Error("This method not implemented");
	};
	
	/*public*/
	d.writeUTFBytes = function (value/*String*/)/*void*/
	{
		this._writeUTF8String(this, value);
	};
	
	/*public*/
	d.writeUnsignedInt = function (value/*uint*/)/*void*/
	{
		this.writeInt(value);
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this._defaultObjectEncoding = flash.net.ObjectEncoding.DEFAULT;
		
		this._buffer32 = new ArrayBuffer(4);
		this._uint32 = new Uint32Array(this._buffer32);
		this._float32 = new Float32Array(this._buffer32);
		
		this._buffer64 = new ArrayBuffer(8);
		this._uint64 = new Uint32Array(this._buffer64);
		this._float64 = new Float64Array(this._buffer64);
	};
	
	s._encodeFloat = function (value)
	{
		this._float32[ 0 ] = value;
		return this._uint32[ 0 ];
	};
	
	s._decodeFloat = function (value)
	{
		this._uint32[ 0 ] = value;
		return this._float32[ 0 ];
	}
	
	s._encodeDouble = function (value)
	{
		this._float64[ 0 ] = value;
		return this._uint64;
	};
	
	s._decodeDouble = function (value0, value1)
	{
		this._uint64[ 0 ] = value0;
		this._uint64[ 1 ] = value1;
		return this._float64[ 0 ];
	}
	
	/*public*/
	s.get_defaultObjectEncoding = function ()/*uint*/
	{
		return this._defaultObjectEncoding;
	};
	
	/*public*/
	s.set_defaultObjectEncoding = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this._defaultObjectEncoding = value;
		
		return value;
	};
	
	flash.addDescription("flash.utils.ByteArray", d, null, s, [ "flash.utils.IDataInput", "flash.utils.IDataOutput" ]);
}
());