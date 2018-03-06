package com.guepard.decompiler.serialization
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.data.TagList;
	import com.guepard.decompiler.data.TagType;
	import com.guepard.decompiler.tags.ShowFrame;
	
	import flash.display.BlendMode;
	import flash.filters.BevelFilter;
	import flash.filters.BitmapFilter;
	import flash.filters.BitmapFilterType;
	import flash.filters.BlurFilter;
	import flash.filters.ColorMatrixFilter;
	import flash.filters.ConvolutionFilter;
	import flash.filters.DropShadowFilter;
	import flash.filters.GlowFilter;
	import flash.filters.GradientBevelFilter;
	import flash.filters.GradientGlowFilter;
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
	import flash.geom.Rectangle;
	import flash.utils.ByteArray;
	import flash.utils.Endian;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SWFStream
	{
		private var _bitBuffer:int = 0;
		private var _bitPosition:int = 0;
		
		private var _byteArray:ByteArray;
		
		public function get byteArray():ByteArray
		{
			return _byteArray;
		}
		
		public function set byteArray(value:ByteArray):void
		{
			_byteArray = value;
			_byteArray.endian = Endian.LITTLE_ENDIAN;
		}
		
		public function SWFStream(byteArrayI:ByteArray)
		{
			_byteArray = byteArrayI;
			_byteArray.position = 0;
			_byteArray.endian = Endian.LITTLE_ENDIAN;
		}
		
		public function writeChar(char:String):void
		{
			_byteArray.writeByte(char.charCodeAt(0));
		}
		
		public function readChar():String
		{
			return String.fromCharCode(byteArray.readUnsignedByte());
		}
		
		public function readMatrix():Matrix
		{
			synchBits();
			
			var matrix:Matrix = new Matrix();
			
			var bits:uint;
			
			if (readUBits(1) == 1)
			{
				bits = readUBits(5);
				
				matrix.a = readSBits(bits) / 65536;
				matrix.d = readSBits(bits) / 65536;
			}
			
			if (readUBits(1) == 1)
			{
				bits = readUBits(5);
				
				matrix.b = readSBits(bits) / 65536;
				matrix.c = readSBits(bits) / 65536;
			}
			
			bits = readUBits(5);
			
			matrix.tx = readSBits(bits) / 20;
			matrix.ty = readSBits(bits) / 20;
			
			synchBits();
			
			return matrix;
		}
		
		public function writeMatrix(matrix:Matrix):void
		{
			flushBits();
			
			var bits:int;
			
			if (matrix.a == 1 && matrix.d == 1)
			{
				writeUBits(1, 0);
			}
			else
			{
				var a:int = matrix.a * 65536;
				var d:int = matrix.d * 65536;
				
				bits = Math.max(determineSignedBitSize(a), determineSignedBitSize(d));
				
				writeUBits(1, 1);
				
				writeUBits(5, bits);
				
				writeSBits(bits, a);
				writeSBits(bits, d);
			}
			
			if (matrix.b == 0 && matrix.c == 0)
			{
				writeUBits(1, 0);
			}
			else
			{
				var b:int = matrix.b * 65536;
				var c:int = matrix.c * 65536;
				
				bits = Math.max(determineSignedBitSize(b), determineSignedBitSize(c));
				
				writeUBits(1, 1);
				writeUBits(5, bits);
				writeSBits(bits, c);
				writeSBits(bits, b);
			}
			
			if (matrix.tx == 0 && matrix.ty == 0)
			{
				writeUBits(5, 0);
			}
			else
			{
				var tx:int = matrix.tx * 20;
				var ty:int = matrix.ty * 20;
				
				bits = Math.max(determineSignedBitSize(tx), determineSignedBitSize(ty));
				
				writeUBits(5, bits);
				writeSBits(bits, tx);
				writeSBits(bits, ty);
			}
			
			flushBits();
		}
		
		public function readColorTransform(alphaEnabled:Boolean = true):ColorTransform
		{
			synchBits();
			
			var colorTransform:ColorTransform = new ColorTransform();
			
			var hasOffset:Boolean = readUBits(1) == 1;
			var hasMultiplier:Boolean = readUBits(1) == 1;
			var bits:uint = readUBits(4);
			
			if (hasMultiplier)
			{
				colorTransform.redMultiplier = readSBits(bits) / 256;
				colorTransform.greenMultiplier = readSBits(bits) / 256;
				colorTransform.blueMultiplier = readSBits(bits) / 256;
				if (alphaEnabled) colorTransform.alphaMultiplier = readSBits(bits) / 256;
			}
			
			if (hasOffset)
			{
				colorTransform.redOffset = readSBits(bits);
				colorTransform.greenOffset = readSBits(bits);
				colorTransform.blueOffset = readSBits(bits);
				if (alphaEnabled) colorTransform.alphaOffset = readSBits(bits);
			}
			
			synchBits();
			
			return colorTransform;
		}
		
		public function writeColorTransform(colorTransform:ColorTransform, alphaEnabled:Boolean = true):void
		{
			flushBits();
			
			var hasOffset:Boolean = colorTransform.redOffset != 0 &&
				colorTransform.blueOffset != 0 &&
				colorTransform.greenOffset != 0 &&
				(alphaEnabled && colorTransform.alphaOffset != 0);
			
			var hasMultiplier:Boolean = colorTransform.redMultiplier != 1 &&
				colorTransform.blueMultiplier != 1 &&
				colorTransform.greenMultiplier != 1 &&
				(alphaEnabled && colorTransform.alphaMultiplier != 1);
			
			if (hasOffset || hasMultiplier)
			{
				var bits:uint = 0;
				
				if (hasOffset)
				{
					bits = Math.max(bits, determineSignedBitSize(colorTransform.redOffset));
					bits = Math.max(bits, determineSignedBitSize(colorTransform.greenOffset));
					bits = Math.max(bits, determineSignedBitSize(colorTransform.blueOffset));
					if (alphaEnabled) bits = Math.max(bits, determineSignedBitSize(colorTransform.alphaOffset));
					
					writeUBits(1, 1);
				}
				
				if (hasMultiplier)
				{
					var redMultiplier:int = colorTransform.redMultiplier * 256;
					var greenMultiplier:int = colorTransform.greenMultiplier * 256;
					var blueMultiplier:int = colorTransform.blueMultiplier * 256;
					if (alphaEnabled) var alphaMultiplier:int = colorTransform.alphaMultiplier * 256;
					
					bits = Math.max(bits, determineSignedBitSize(redMultiplier));
					bits = Math.max(bits, determineSignedBitSize(greenMultiplier));
					bits = Math.max(bits, determineSignedBitSize(blueMultiplier));
					if (alphaEnabled) bits = Math.max(bits, determineSignedBitSize(alphaMultiplier));
					
					writeUBits(1, 1);
				}
				
				writeUBits(4, bits);
				
				if (hasMultiplier)
				{
					writeSBits(bits, redMultiplier);
					writeSBits(bits, greenMultiplier);
					writeSBits(bits, blueMultiplier);
					if (alphaEnabled) writeSBits(bits, alphaMultiplier);
				}
				
				if (hasOffset)
				{
					writeSBits(bits, colorTransform.redOffset);
					writeSBits(bits, colorTransform.greenOffset);
					writeSBits(bits, colorTransform.blueOffset);
					if (alphaEnabled) writeSBits(bits, colorTransform.alphaOffset);
				}
			}
			else
			{
				writeUBits(1, 0);
				writeUBits(1, 0);
				writeUBits(4, 0);
			}
			
			flushBits();
		}
		
		public function readRectangle():Rectangle
		{
			synchBits();
			
			var rectangle:Rectangle = new Rectangle();
			
			var bits:int = readUBits(5);
			
			rectangle.x = readSBits(bits) / 20;
			rectangle.width = readSBits(bits) / 20 - rectangle.x;
			
			rectangle.y = readSBits(bits) / 20;
			rectangle.height = readSBits(bits) / 20 - rectangle.y;
			
			synchBits();
			
			return rectangle;
		}
		
		public function writeRectangle(rectangle:Rectangle):void
		{
			flushBits();
			
			var bits:int = 0;
			
			var minX:int = rectangle.x * 20;
			var maxX:int = (rectangle.x + rectangle.width) * 20;
			
			var minY:int = rectangle.y * 20;
			var maxY:int = (rectangle.y + rectangle.height) * 20;
			
			bits = Math.max(bits, determineSignedBitSize(minX));
			bits = Math.max(bits, determineSignedBitSize(maxX));
			bits = Math.max(bits, determineSignedBitSize(minY));
			bits = Math.max(bits, determineSignedBitSize(maxY));
			
			writeUBits(5, bits);
			writeSBits(bits, minX);
			writeSBits(bits, maxX);
			writeSBits(bits, minY);
			writeSBits(bits, maxY);
			
			flushBits();
		}
		
		public function readString():String
		{
			var bytes:ByteArray = new ByteArray();
			
			var char:uint = _byteArray.readUnsignedByte();
			
			while (char)
			{
				bytes.writeByte(char);
				
				char = _byteArray.readUnsignedByte();
			}
			
			bytes.position = 0;
			
			var value:String = bytes.readUTFBytes(bytes.length);
			
			return value;
		}
		
		public function writeString(value:String):void
		{
			for (var i:uint = 0; i < value.length; i++)
			{
				var char:uint = value.charCodeAt(i);
				
				_byteArray.writeByte(char);
			}
			
			_byteArray.writeByte(0);
		}
		
		public function writeChars(ar:Array):void
		{
			for (var i:uint = 0; i < ar.length; i++)
			{
				_byteArray.writeByte(uint(ar[i]));
			}
			_byteArray.writeByte(0);
		}
		
		public function writeSBits(numBits:int, value:int):void
		{
			var result:int = value & 0x7FFFFFFF;
			
			if (value < 0)
			{
				result |= 1 << (numBits - 1);
			}
			
			writeUBits(numBits, result);
		}
		
		public function writeUBits(numBits:int, value:int):void
		{
			if (numBits == 0) return;
			
			if (_bitPosition == 0)
				_bitPosition = 8;
			
			var bitNum:int = numBits;
			
			while (bitNum > 0)
			{
				while (_bitPosition > 0 && bitNum > 0)
				{
					if (getBit(bitNum, value))
						_bitBuffer = setBit(_bitPosition, _bitBuffer);
					
					bitNum--;
					_bitPosition--;
				}
				
				if (_bitPosition == 0)
				{
					_byteArray.writeByte(_bitBuffer);
					_bitBuffer = 0;
					if (bitNum > 0)
						_bitPosition = 8;
				}
			}
		}
		
		public function readBoolBit():Boolean
		{
			return readUBits(1) == 1;
		}
		
		public function writeBoolBit(value:Boolean):void
		{
			writeUBits(1, value ? 1 : 0);
		}
		
		public function determineSignedBitSize(value:int):int
		{
			if (value >= 0)
				return determineUnsignedBitSize(value) + 1;
			
			var topBit:int = 31;
			var mask:uint = 0x40000000;
			
			while (topBit > 0)
			{
				if ((value & mask) == 0) break;
				
				mask >>= 1;
				topBit--;
			}
			
			if (topBit == 0) return 2;
			
			var checkValue:int = value & ((1 << topBit) - 1);
			
			if (checkValue == 0)
			{
				topBit++;
			}
			
			return topBit + 1;
		}
		
		public function determineUnsignedBitSize(value:uint):int
		{
			var topBit:int = 32;
			var mask:uint = 0x80000000;
			
			while (topBit > 0)
			{
				if ((value & mask) != 0) return topBit;
				
				mask >>= 1;
				topBit--;
			}
			
			return 0;
		}
		
		public function getBit(bitNum:int, value:int):Boolean
		{
			return (value & (1 << (bitNum - 1))) != 0;
		}
		
		public function setBit(bitNum:int, value:int):int
		{
			return value | (1 << (bitNum - 1));
		}
		
		public function readUBits(numBits:int):uint
		{
			if (numBits == 0)
				return 0;
			
			var bitsLeft:int = numBits;
			var result:int = 0;
			
			if (_bitPosition == 0)
			{
				_bitBuffer = _byteArray.readUnsignedByte();
				_bitPosition = 8;
			}
			
			while (true)
			{
				var shift:int = bitsLeft - _bitPosition;
				if (shift > 0)
				{
					result |= uint(_bitBuffer << shift);
					bitsLeft -= _bitPosition;
					
					_bitBuffer = _byteArray.readUnsignedByte();
					_bitPosition = 8;
				}
				else
				{
					result |= uint(_bitBuffer >> -shift);
					
					_bitPosition -= bitsLeft;
					_bitBuffer &= 0xff >> (8 - _bitPosition);
					
					return result;
				}
			}
			
			return 0;
		}
		
		public function readSBits(numBits:int):int
		{
			var uBits:int = readUBits(numBits);
			
			if ((uBits & (1 << (numBits - 1))) != 0)
			{
				uBits |= -1 << numBits;
			}
			
			return int(uBits);
		}
		
		public function flushBits():void
		{
			if (_bitPosition == 0) return;
			
			_byteArray.writeByte(_bitBuffer);
			
			_bitBuffer = 0;
			_bitPosition = 0;
		}
		
		public function synchBits():void
		{
			_bitBuffer = 0;
			_bitPosition = 0;
		}
		
		public function readTagList(list:TagList):void
		{
			var index:int = 1;
			
			do
			{
				var header:int = _byteArray.readUnsignedShort();
				
				var type:uint = header >> 6;
				
				var length:uint = header & 0x3F;
				
				if (length == 0x3F)
				{
					length = _byteArray.readUnsignedInt();
				}
				
				var TagClass:Class = TagType.getClass(type);
				
				var tag:Tag = new TagClass();
				
				tag.type = type;
				tag.bytes = new ByteArray();
				
				if (length > 0)
				{
					_byteArray.readBytes(tag.bytes, 0, length);
				}
				
				tag.read();
				
				if (tag.type == TagType.SHOW_FRAME)
				{
					ShowFrame(tag).index = index;
					index++;
				}
				
				list.addTag(tag);
				
			}
			while (_byteArray.bytesAvailable)
		}
		
		public function writeTagList(list:TagList):void
		{
			for (var i:int = 0; i < list.numTags; i++)
			{
				var tag:Tag = list.getTagAt(i);
				
				tag.write();
				
				var longTag:Boolean = tag.bytes.length > 62;
				
				var hdr:int = (tag.type << 6) + (longTag ? 0x3F : tag.bytes.length);
				_byteArray.writeShort(hdr);
				
				if (longTag)
				{
					_byteArray.writeUnsignedInt(tag.bytes.length);
				}
				
				if (tag.bytes.length > 0)
				{
					tag.bytes.position = 0;
					
					_byteArray.writeBytes(tag.bytes);
				}
			}
		}
		
		public function readS24():int
		{
			var b:int = _byteArray.readUnsignedByte();
			b |= _byteArray.readUnsignedByte() << 8;
			b |= _byteArray.readByte() << 16;
			return b;
		}
		
		public function writeS24(value:int):void
		{
			_byteArray.writeByte(value);
			_byteArray.writeByte(value >> 8);
			_byteArray.writeByte(value >> 16);
		}
		
		public function readVarUint32():uint
		{
			var result:uint = _byteArray.readUnsignedByte();
			
			if (!(result & 0x00000080)) return result;
			
			result = (result & 0x0000007f) | _byteArray.readUnsignedByte() << 7;
			
			if (!(result & 0x00004000)) return result;
			
			result = (result & 0x00003fff) | _byteArray.readUnsignedByte() << 14;
			
			if (!(result & 0x00200000)) return result;
			
			result = (result & 0x001fffff) | _byteArray.readUnsignedByte() << 21;
			
			if (!(result & 0x10000000)) return result;
			
			return (result & 0x0fffffff) | _byteArray.readUnsignedByte() << 28;
		}
		
		public function writeVarUint32(value:uint):void
		{
			if (value == 0)
			{
				_byteArray.writeByte(0);
				return;
			}
			
			var byte:uint = value & 0x0000007f;
			value = value >>> 7;
			if (value != 0) byte = byte | 0x00000080;
			_byteArray.writeByte(byte);
			if (value == 0) return;
			
			byte = value & 0x0000007f;
			value = value >>> 7;
			if (value != 0) byte = byte | 0x00000080;
			_byteArray.writeByte(byte);
			if (value == 0) return;
			
			byte = value & 0x0000007f;
			value = value >>> 7;
			if (value != 0) byte = byte | 0x00000080;
			_byteArray.writeByte(byte);
			if (value == 0) return;
			
			byte = value & 0x0000007f;
			value = value >>> 7;
			if (value != 0) byte = byte | 0x00000080;
			_byteArray.writeByte(byte);
			if (value == 0) return;
			
			byte = value & 0x0000007f;
			value = value >>> 7;
			if (value != 0) byte = byte | 0x00000080;
			_byteArray.writeByte(byte);
			
		}
		
		public function readFilterList(filters:Vector.<BitmapFilter>):void
		{
			var count:uint = _byteArray.readUnsignedByte();
			
			while (count--)
			{
				var type:uint = _byteArray.readUnsignedByte();
				
				var filter:BitmapFilter;
				
				switch (type)
				{
					case 0:
						filter = readDropShadowFilter();
						break;
					
					case 1:
						filter = readBlurFilter();
						break;
					
					case 2:
						filter = readGlowFilter();
						break;
					
					case 3:
						filter = readBevelFilter();
						break;
					
					case 4:
						filter = readGradientGlowFilter();
						break;
					
					case 5:
						filter = readConvolutionFilter();
						break;
					
					case 6:
						filter = readColorMatrixFilter();
						break;
					
					case 7:
						filter = readGradientBevelFilter();
						break;
				}
				
				filters.push(filter);
			}
		}
		
		public function readRGBA():uint
		{
			var r:uint = _byteArray.readUnsignedByte();
			var g:uint = _byteArray.readUnsignedByte();
			var b:uint = _byteArray.readUnsignedByte();
			var a:uint = _byteArray.readUnsignedByte();
			
			return (a << 24) | (r << 16) | (g << 8) | b;
		}
		
		public function writeRGBA(color:uint):void
		{
			var a:uint = (color >> 24) & 0xff;
			var r:uint = (color >> 16) & 0xff;
			var g:uint = (color >> 8) & 0xff;
			var b:uint = color & 0xff;
			
			_byteArray.writeByte(r);
			_byteArray.writeByte(g);
			_byteArray.writeByte(b);
			_byteArray.writeByte(a);
		}
		
		public function readARGB():uint
		{
			var a:uint = _byteArray.readUnsignedByte();
			var r:uint = _byteArray.readUnsignedByte();
			var g:uint = _byteArray.readUnsignedByte();
			var b:uint = _byteArray.readUnsignedByte();
			
			return (a << 24) | (r << 16) | (g << 8) | b;
		}
		
		public function writeARGB(color:uint):void
		{
			var a:uint = (color >> 24) & 0xff;
			var r:uint = (color >> 16) & 0xff;
			var g:uint = (color >> 8) & 0xff;
			var b:uint = color & 0xff;
			
			_byteArray.writeByte(a);
			_byteArray.writeByte(r);
			_byteArray.writeByte(g);
			_byteArray.writeByte(b);
		}
		
		public function readRGB():uint
		{
			var r:uint = _byteArray.readUnsignedByte();
			var g:uint = _byteArray.readUnsignedByte();
			var b:uint = _byteArray.readUnsignedByte();
			
			return (r << 16) | (g << 8) | b;
		}
		
		public function writeRGB(color:uint):void
		{
			var r:uint = (color >> 16) & 0xff;
			var g:uint = (color >> 8) & 0xff;
			var b:uint = color & 0xff;
			
			_byteArray.writeByte(r);
			_byteArray.writeByte(g);
			_byteArray.writeByte(b);
		}
		
		public function readFixed():Number
		{
			return _byteArray.readUnsignedShort() / 65536 + _byteArray.readUnsignedShort();
		}
		
		public function readFixed8():Number
		{
			return _byteArray.readUnsignedByte() / 256 + _byteArray.readUnsignedByte();
		}
		
		public function readBlendMode():String
		{
			var byte:uint = _byteArray.readUnsignedByte();
			
			switch (byte)
			{
				case 0:
				case 1:
					return BlendMode.NORMAL;
				
				case 2:
					return BlendMode.LAYER;
				
				case 3:
					return BlendMode.MULTIPLY;
				
				case 4:
					return BlendMode.SCREEN;
				
				case 5:
					return BlendMode.LIGHTEN;
				
				case 6:
					return BlendMode.DARKEN;
				
				case 7:
					return BlendMode.DIFFERENCE;
				
				case 8:
					return BlendMode.ADD;
				
				case 9:
					return BlendMode.SUBTRACT;
				
				case 10:
					return BlendMode.INVERT;
				
				case 11:
					return BlendMode.ALPHA;
				
				case 12:
					return BlendMode.ERASE;
				
				case 13:
					return BlendMode.OVERLAY;
				
				case 14:
					return BlendMode.HARDLIGHT;
				
				default:
					return BlendMode.NORMAL;
			}
		}
		
		private function readColorMatrixFilter():ColorMatrixFilter
		{
			var matrix:Array = [];
			
			var count:uint = 20;
			
			while (count--)
			{
				matrix.push(_byteArray.readFloat());
			}
			
			matrix.push(0, 0, 0, 1);
			
			return new ColorMatrixFilter(matrix);
		}
		
		private function readConvolutionFilter():ConvolutionFilter
		{
			var matrixX:uint = _byteArray.readUnsignedByte();
			var matrixY:uint = _byteArray.readUnsignedByte();
			
			var divisor:Number = _byteArray.readFloat();
			var bias:Number = _byteArray.readFloat();
			
			var matrix:Array = [];
			
			var count:uint = matrixX * matrixY;
			
			while (count--)
			{
				matrix.push(_byteArray.readFloat());
			}
			
			var defaultColor:uint = readRGBA();
			var color:uint = defaultColor & 0xffffff;
			var alpha:Number = ((defaultColor >> 24) & 0xff) / 0xff;
			
			synchBits();
			
			var reserved:Boolean = readBoolBit();
			var clamp:Boolean = readBoolBit();
			var preserveAlpha:Boolean = readBoolBit();
			
			synchBits();
			
			return new ConvolutionFilter(
				matrixX,
				matrixY,
				matrix,
				divisor,
				bias,
				preserveAlpha,
				clamp,
				color,
				alpha);
		}
		
		private function readGradientBevelFilter():GradientBevelFilter
		{
			var i:int;
			
			var numColors:uint = _byteArray.readUnsignedByte();
			
			var colors:Array = [];
			var alphas:Array = [];
			
			for (i = 0; i < numColors; i++)
			{
				var color:uint = readRGBA();
				
				colors[i] = color & 0xffffff;
				alphas[i] = ((color >> 24) & 0xff) / 0xff;
			}
			
			var ratios:Array = [];
			
			for (i = 0; i < numColors; i++)
			{
				ratios[i] = _byteArray.readUnsignedByte() / 0xff;
			}
			
			var blurX:Number = readFixed();
			var blurY:Number = readFixed();
			
			var angle:Number = readFixed();
			var distance:Number = readFixed();
			var strength:Number = readFixed8();
			
			synchBits();
			
			var inner:Boolean = readBoolBit();
			var knockout:Boolean = readBoolBit();
			var compositeSource:Boolean = readBoolBit();
			var outer:Boolean = readBoolBit();
			var passes:uint = readUBits(4);
			
			synchBits();
			
			var type:String = BitmapFilterType.FULL;
			
			if (inner) type = BitmapFilterType.INNER;
			else if (outer) type = BitmapFilterType.OUTER;
			else type = BitmapFilterType.FULL;
			
			return new GradientBevelFilter(
				distance,
				angle,
				colors,
				alphas,
				ratios,
				blurX,
				blurY,
				strength,
				passes,
				type,
				knockout
			);
		}
		
		private function readGradientGlowFilter():GradientGlowFilter
		{
			var i:int;
			
			var numColors:uint = _byteArray.readUnsignedByte();
			
			var colors:Array = [];
			var alphas:Array = [];
			
			for (i = 0; i < numColors; i++)
			{
				var color:uint = readRGBA();
				
				colors[i] = color & 0xffffff;
				alphas[i] = ((color >> 24) & 0xff) / 0xff;
			}
			
			var ratios:Array = [];
			
			for (i = 0; i < numColors; i++)
			{
				ratios[i] = _byteArray.readUnsignedByte() / 0xff;
			}
			
			var blurX:Number = readFixed();
			var blurY:Number = readFixed();
			
			var angle:Number = readFixed();
			var distance:Number = readFixed();
			var strength:Number = readFixed8();
			
			synchBits();
			
			var inner:Boolean = readBoolBit();
			var knockout:Boolean = readBoolBit();
			var compositeSource:Boolean = readBoolBit();
			var outer:Boolean = readBoolBit();
			var passes:uint = readUBits(4);
			
			synchBits();
			
			var type:String = BitmapFilterType.FULL;
			
			if (inner) type = BitmapFilterType.INNER;
			else if (outer) type = BitmapFilterType.OUTER;
			else type = BitmapFilterType.FULL;
			
			return new GradientGlowFilter(
				distance,
				angle,
				colors,
				alphas,
				ratios,
				blurX,
				blurY,
				strength,
				passes,
				type,
				knockout
			);
		}
		
		private function readBevelFilter():BevelFilter
		{
			var shadowColor:uint = readRGBA();
			
			var highlightColor:uint = readRGBA();
			
			var blurX:Number = readFixed();
			var blurY:Number = readFixed();
			
			var angle:Number = readFixed();
			var distance:Number = readFixed();
			var strength:Number = readFixed8();
			
			synchBits();
			
			var inner:Boolean = readBoolBit();
			var knockout:Boolean = readBoolBit();
			var compositeSource:Boolean = readBoolBit();
			var outer:Boolean = readBoolBit();
			var passes:uint = readUBits(4);
			
			synchBits();
			
			var type:String = BitmapFilterType.FULL;
			
			if (inner) type = BitmapFilterType.INNER;
			else if (outer) type = BitmapFilterType.OUTER;
			else type = BitmapFilterType.FULL;
			
			return new BevelFilter(
				distance,
				angle,
				
				highlightColor & 0xffffff,
				((highlightColor >> 24) & 0xff) / 0xff,
				
				shadowColor & 0xffffff,
				((shadowColor >> 24) & 0xff) / 0xff,
				
				blurX,
				blurY,
				strength,
				passes,
				type,
				knockout
			);
		}
		
		private function readGlowFilter():GlowFilter
		{
			var defaultColor:uint = readRGBA();
			var color:uint = defaultColor & 0xffffff;
			var alpha:Number = ((defaultColor >> 24) & 0xff) / 0xff;
			
			var blurX:Number = readFixed();
			var blurY:Number = readFixed();
			
			var strength:Number = readFixed8();
			
			synchBits();
			
			var inner:Boolean = readBoolBit();
			var knockout:Boolean = readBoolBit();
			var compositeSource:Boolean = readBoolBit();
			var passes:uint = readUBits(5);
			
			synchBits();
			
			return new GlowFilter(
				color,
				alpha,
				blurX,
				blurY,
				strength,
				passes,
				inner,
				knockout
			);
		}
		
		private function readBlurFilter():BlurFilter
		{
			var blurX:Number = readFixed();
			var blurY:Number = readFixed();
			
			synchBits();
			
			var passes:uint = readUBits(5);
			var reserved:uint = readUBits(3);
			
			synchBits();
			
			return new BlurFilter(blurX, blurY, passes);
		}
		
		private function readDropShadowFilter():DropShadowFilter
		{
			var defaultColor:uint = readRGBA();
			var color:uint = defaultColor & 0xffffff;
			var alpha:Number = ((defaultColor >> 24) & 0xff) / 0xff;
			
			var blurX:Number = readFixed();
			var blurY:Number = readFixed();
			var angle:Number = readFixed();
			var distance:Number = readFixed();
			var strength:Number = readFixed8();
			
			synchBits();
			
			var inner:Boolean = readBoolBit();
			var knockout:Boolean = readBoolBit();
			var compositeSource:Boolean = readBoolBit();
			var passes:uint = readUBits(5);
			
			synchBits();
			
			return new DropShadowFilter(
				distance,
				angle,
				color,
				alpha,
				blurX,
				blurY,
				strength,
				passes,
				inner,
				knockout,
				false
			);
		}
		
	}
}