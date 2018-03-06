package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.serialization.SWFStream;
	import com.guepard.decompiler.text.KerningRecord;
	import com.guepard.decompiler.text.LanguageCode;
	import com.guepard.utils.GeomUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineFont3 extends DefineFont
	{
		public var glyphs:Array;
		public var languageCode:uint;
		public var flags:uint;
		public var advances:Array;
		public var ascent:int;
		public var descent:int;
		public var leading:int;
		public var bounds:Array;
		public var kernings:Array;
		public var maps:Array;
		public var atlases:Array;
		
		public function get hasLayout():Boolean
		{
			return Boolean(flags & 0x80);
		}
		
		public function get shiftJIS():Boolean
		{
			return Boolean(flags & 0x40);
		}
		
		public function get smallText():Boolean
		{
			return Boolean(flags & 0x20);
		}
		
		public function get ANSI():Boolean
		{
			return Boolean(flags & 0x10);
		}
		
		public function get wideOffsets():Boolean
		{
			return Boolean(flags & 0x08);
		}
		
		public function get wideCodes():Boolean
		{
			return Boolean(flags & 0x04);
		}
		
		public function get italic():Boolean
		{
			return Boolean(flags & 0x02);
		}
		
		public function get bold():Boolean
		{
			return Boolean(flags & 0x01);
		}
		
		public function DefineFont3()
		{
			super();
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			glyphs = null;
			name = null;
			advances = null;
			bounds = null;
			kernings = null;
		}
		
		public override function read():void
		{
			var i:uint;
			
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			
			flags = stream.byteArray.readUnsignedByte();
			
			languageCode = stream.byteArray.readUnsignedByte();
			
			var nameLenght:uint = stream.byteArray.readUnsignedByte();
			
			name = "";
			
			for (i = 0; i < nameLenght - 1; i++)
			{
				var code:uint = stream.byteArray.readUnsignedByte();
				name += String.fromCharCode(code);
			}
			
			stream.byteArray.readUnsignedByte();
			
			var numGlyphs:uint = stream.byteArray.readUnsignedShort();
			
			if (numGlyphs)
			{
				var glyphSizes:Array = [];
				
				var prevOffset:uint = wideOffsets ? stream.byteArray.readUnsignedInt() : stream.byteArray.readUnsignedShort();
				
				for (i = 0; i < numGlyphs; i++)
				{
					var newOffset:uint = wideOffsets ? stream.byteArray.readUnsignedInt() : stream.byteArray.readUnsignedShort();
					glyphSizes.push(newOffset - prevOffset);
					prevOffset = newOffset;
				}
				
				glyphs = [];
				
				for (i = 0; i < numGlyphs; i++)
				{
					var shape:ByteArray = new ByteArray();
					stream.byteArray.readBytes(shape, 0, uint(glyphSizes[i]));
					glyphs.push(shape);
				}
				
				for (i = 0; i < numGlyphs; i++)
				{
					var char:String = String.fromCharCode(wideCodes ? stream.byteArray.readUnsignedShort() : stream.byteArray.readUnsignedByte());
					chars.push(char);
				}
				
				if (hasLayout)
				{
					ascent = stream.byteArray.readShort();
					
					descent = stream.byteArray.readShort();
					
					leading = stream.byteArray.readShort();
					
					advances = [];
					
					for (i = 0; i < numGlyphs; i++)
					{
						advances.push(stream.byteArray.readShort());
					}
					
					bounds = [];
					
					for (i = 0; i < numGlyphs; i++)
					{
						bounds.push(stream.readRectangle());
					}
					
					var kerningCount:uint = stream.byteArray.readUnsignedShort();
					kernings = [];
					
					for (i = 0; i < kerningCount; i++)
					{
						var kerningRecord:KerningRecord = new KerningRecord();
						kerningRecord.code1 = wideCodes ? stream.byteArray.readUnsignedShort() : stream.byteArray.readUnsignedByte();
						kerningRecord.code2 = wideCodes ? stream.byteArray.readUnsignedShort() : stream.byteArray.readUnsignedByte();
						kerningRecord.adjustments = stream.byteArray.readShort();
						kernings.push(kerningRecord);
					}
				}
			}
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			
			stream.byteArray.writeByte(flags);
			
			stream.byteArray.writeByte(languageCode);
			
			stream.byteArray.writeByte(name.length + 1);
			
			for (var i:uint = 0; i < name.length; i++)
			{
				stream.byteArray.writeByte(name.charCodeAt(i));
			}
			
			stream.byteArray.writeByte(0);
			
			var numGlyphs:uint = chars ? chars.length : 0;
			
			stream.byteArray.writeShort(numGlyphs);
			
			if (numGlyphs)
			{
				var offset:uint = wideOffsets ? ((numGlyphs + 1) * 4) : ((numGlyphs + 1) * 2);
				
				for each(var shape:ByteArray in glyphs)
				{
					if (wideOffsets) stream.byteArray.writeUnsignedInt(offset);
					else stream.byteArray.writeShort(offset);
					
					offset += shape.length;
				}
				
				if (wideOffsets) stream.byteArray.writeUnsignedInt(offset);
				else stream.byteArray.writeShort(offset);
				
				for each(shape in glyphs)
				{
					stream.byteArray.writeBytes(shape, 0, shape.length);
				}
				
				for each(var char:String in chars)
				{
					if (wideCodes) stream.byteArray.writeShort(char.charCodeAt(0));
					else stream.byteArray.writeByte(char.charCodeAt(0));
				}
				
				if (hasLayout)
				{
					stream.byteArray.writeShort(ascent);
					
					stream.byteArray.writeShort(descent);
					
					stream.byteArray.writeShort(leading);
					
					for (i = 0; i < numGlyphs; i++)
					{
						stream.byteArray.writeShort(advances[i]);
					}
					
					for (i = 0; i < numGlyphs; i++)
					{
						stream.writeRectangle(bounds[i]);
					}
					
					stream.byteArray.writeShort(kernings.length);
					
					for each(var kerningRecord:KerningRecord in kernings)
					{
						if (wideCodes)
						{
							stream.byteArray.writeShort(kerningRecord.code1);
							stream.byteArray.writeShort(kerningRecord.code2);
						}
						else
						{
							stream.byteArray.writeByte(kerningRecord.code1);
							stream.byteArray.writeByte(kerningRecord.code2);
						}
						
						stream.byteArray.writeShort(kerningRecord.adjustments);
					}
				}
			}
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", id: " + id + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.id = id;
			node.attributes.name = name;
			node.attributes.bold = bold;
			node.attributes.italic = italic;
			node.attributes.ascent = ascent;
			node.attributes.descent = descent;
			node.attributes.leading = leading;
			node.attributes.languageCode = LanguageCode.getName(languageCode);
			
			if (!hasLayout)
			{
				node = new XMLNode(XMLNodeType.ELEMENT_NODE, "Undefined");
			}
			
			return node;
		}
		
		private function charsToXML(chars:Array, node:XMLNode):void
		{
			if (chars)
			{
				for (var i:int = 0; i < chars.length; i++)
				{
					var char:String = chars[i];
					
					var charNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "char");
					charNode.attributes.char = escape(char);
					charNode.attributes.code = char.charCodeAt();
					
					if (hasLayout)
					{
						if (advances[i] != 0)
						{
							charNode.attributes.advance = advances[i];
						}
						
						if (!GeomUtil.isEmpty(bounds[i]))
						{
							charNode.appendChild(XMLUtil.toXML(bounds[i], "bounds"));
						}
					}
					
					if (maps && i < maps.length && maps[i])
					{
						charNode.appendChild(XMLUtil.toXML(maps[i], "map"));
					}
					
					if (atlases && i < atlases.length && atlases[i])
					{
						charNode.attributes.atlas = atlases[i];
					}
					
					node.appendChild(charNode);
				}
				
				if (hasLayout && kernings && kernings.length)
				{
					var kerningsNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "kernings");
					node.appendChild(kerningsNode);
					
					for each(var kerningRecord:KerningRecord in kernings)
					{
						var kerningNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "kerning");
						
						kerningNode.attributes.code1 = kerningRecord.code1;
						kerningNode.attributes.code2 = kerningRecord.code2;
						
						kerningNode.attributes.char1 = escape(String.fromCharCode(kerningRecord.code1));
						kerningNode.attributes.char2 = escape(String.fromCharCode(kerningRecord.code2));
						
						kerningNode.attributes.adjustments = kerningRecord.adjustments;
						kerningsNode.appendChild(kerningNode);
					}
				}
			}
		}
	}
	
}