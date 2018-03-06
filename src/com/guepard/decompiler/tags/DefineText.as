package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.CorrectParameters;
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	import com.guepard.decompiler.text.GlyphEntry;
	import com.guepard.decompiler.text.TextRecord;
	import com.guepard.utils.GeomUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.geom.Matrix;
	import flash.geom.Rectangle;
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineText extends Tag
	{
		public var bounds:Rectangle;
		public var matrix:Matrix;
		
		public var glyphBits:uint;
		public var advanceBits:uint;
		
		public var textRecords:Array;
		
		public function DefineText()
		{
			super();
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			bounds = null;
			matrix = null;
			textRecords = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			
			bounds = stream.readRectangle();
			
			matrix = stream.readMatrix();
			
			glyphBits = stream.byteArray.readUnsignedByte();
			
			advanceBits = stream.byteArray.readUnsignedByte();
			
			textRecords = [];
			
			var styleFlags:uint;
			
			while ((styleFlags = stream.byteArray.readUnsignedByte()) != 0)
			{
				if (!(styleFlags & 0x80)) throw new Error("TextRecords Corrupted.");
				
				var textRecord:TextRecord = new TextRecord();
				textRecord.flags = styleFlags;
				
				if (textRecord.hasFont)
				{
					textRecord.fontId = stream.byteArray.readUnsignedShort();
				}
				else
				{
					textRecord.fontId = -1;
				}
				
				if (textRecord.hasColor)
				{
					textRecord.color = readColor(stream);
				}
				
				if (textRecord.hasOffsetX)
				{
					textRecord.x = stream.byteArray.readShort() / 20;
				}
				
				if (textRecord.hasOffsetY)
				{
					textRecord.y = stream.byteArray.readShort() / 20;
				}
				
				if (textRecord.hasFont)
				{
					textRecord.height = stream.byteArray.readUnsignedShort() / 20;
				}
				
				var glyphCount:uint = stream.byteArray.readUnsignedByte();
				
				if (glyphCount > 0)
				{
					textRecord.glyphEntries = [];
					
					for (var i:uint = 0; i < glyphCount; i++)
					{
						var glyphEntry:GlyphEntry = new GlyphEntry();
						glyphEntry.glyphIndex = stream.readUBits(glyphBits);
						glyphEntry.glyphAdvance = stream.readSBits(advanceBits);
						textRecord.glyphEntries.push(glyphEntry);
					}
					
					stream.synchBits();
					
					textRecords.push(textRecord);
				}
			}
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			
			stream.writeRectangle(bounds);
			
			stream.writeMatrix(matrix);
			
			glyphBits = 0;
			advanceBits = 0;
			
			var glyphEntry:GlyphEntry;
			var textRecord:TextRecord;
			
			for each(textRecord in textRecords)
			{
				for each(glyphEntry in textRecord.glyphEntries)
				{
					var glyphSize:uint = stream.determineUnsignedBitSize(glyphEntry.glyphIndex);
					if (glyphBits < glyphSize) glyphBits = glyphSize;
					
					var advanceSize:uint = stream.determineSignedBitSize(glyphEntry.glyphAdvance);
					if (advanceBits < advanceSize) advanceBits = advanceSize;
				}
			}
			
			stream.byteArray.writeByte(glyphBits);
			stream.byteArray.writeByte(advanceBits);
			
			for each(textRecord in textRecords)
			{
				stream.byteArray.writeByte(textRecord.flags);
				
				if (textRecord.hasFont)
				{
					stream.byteArray.writeShort(textRecord.fontId);
				}
				
				if (textRecord.hasColor)
				{
					writeColor(stream, textRecord.color);
				}
				
				if (textRecord.hasOffsetX)
				{
					stream.byteArray.writeShort(textRecord.x * 20);
				}
				
				if (textRecord.hasOffsetY)
				{
					stream.byteArray.writeShort(textRecord.y * 20);
				}
				
				if (textRecord.hasFont)
				{
					stream.byteArray.writeShort(textRecord.height * 20);
				}
				
				stream.byteArray.writeByte(textRecord.glyphEntries.length);
				
				for each(glyphEntry in textRecord.glyphEntries)
				{
					stream.writeUBits(glyphBits, glyphEntry.glyphIndex);
					stream.writeSBits(advanceBits, glyphEntry.glyphAdvance);
				}
				
				stream.flushBits();
			}
			
			stream.byteArray.writeByte(0);
		}
		
		public override function correct(parameters:CorrectParameters):void
		{
			var font:DefineFont;
			var glyphEntry:GlyphEntry;
			
			for each(var textRecord:TextRecord in textRecords)
			{
				if (textRecord.hasFont)
				{
					font = parameters.swf.getFontTagById(textRecord.fontId);
					
					textRecord.font = font.name;
				}
				
				textRecord.text = "";
				
				var chars:Array = DefineFont(font).chars;
				
				for each(glyphEntry in textRecord.glyphEntries)
				{
					textRecord.text += chars[glyphEntry.glyphIndex];
				}
			}
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", id:" + id + "')";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.id = id;
			
			if (bounds && !GeomUtil.isEmpty(bounds))
			{
				node.appendChild(XMLUtil.toXML(bounds));
			}
			
			if (matrix && !GeomUtil.isEmpty(matrix))
			{
				node.appendChild(XMLUtil.toXML(matrix));
			}
			
			for each(var textRecord:TextRecord in textRecords)
			{
				node.appendChild(textRecord.toXML());
			}
			
			return node;
		}
		
		protected function readColor(stream:SWFStream):uint
		{
			return stream.readRGB();
		}
		
		protected function writeColor(stream:SWFStream, color:uint):void
		{
			stream.writeRGB(color);
		}
	}
	
}