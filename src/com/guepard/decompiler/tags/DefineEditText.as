package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.CorrectParameters;
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	import com.guepard.utils.GeomUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.geom.Rectangle;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFieldType;
	import flash.text.TextFormatAlign;
	import flash.utils.ByteArray;
	import flash.xml.XMLDocument;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineEditText extends Tag
	{
		public var font:uint;
		public var name:String;
		
		public var bounds:Rectangle;
		
		public var flags0:uint;
		public var flags1:uint;
		
		public var fontClass:String;
		public var height:Number;
		public var color:uint;
		public var length:uint;
		public var align:uint;
		public var leftMargin:Number;
		public var rightMargin:Number;
		public var indent:Number;
		public var leading:Number;
		public var variable:String;
		public var text:String;
		
		public function get hasText():Boolean
		{
			return Boolean(flags0 & 0x80);
		}
		
		public function set hasText(value:Boolean):void
		{
			flags0 = (value) ? flags0 | 0x80 : flags0 & ~0x80;
		}
		
		public function get wordWrap():Boolean
		{
			return Boolean(flags0 & 0x40);
		}
		
		public function set wordWrap(value:Boolean):void
		{
			flags0 = (value) ? flags0 | 0x40 : flags0 & ~0x40;
		}
		
		public function get multiline():Boolean
		{
			return Boolean(flags0 & 0x20);
		}
		
		public function set multiline(value:Boolean):void
		{
			flags0 = (value) ? flags0 | 0x20 : flags0 & ~0x20;
		}
		
		public function get password():Boolean
		{
			return Boolean(flags0 & 0x10);
		}
		
		public function set password(value:Boolean):void
		{
			flags0 = (value) ? flags0 | 0x10 : flags0 & ~0x10;
		}
		
		public function get readOnly():Boolean
		{
			return Boolean(flags0 & 0x08);
		}
		
		public function set readOnly(value:Boolean):void
		{
			flags0 = (value) ? flags0 | 0x08 : flags0 & ~0x08;
		}
		
		public function get hasTextColor():Boolean
		{
			return Boolean(flags0 & 0x04);
		}
		
		public function set hasTextColor(value:Boolean):void
		{
			flags0 = (value) ? flags0 | 0x04 : flags0 & ~0x04;
		}
		
		public function get hasMaxLength():Boolean
		{
			return Boolean(flags0 & 0x02);
		}
		
		public function set hasMaxLength(value:Boolean):void
		{
			flags0 = (value) ? flags0 | 0x02 : flags0 & ~0x02;
		}
		
		public function get hasFont():Boolean
		{
			return Boolean(flags0 & 0x01);
		}
		
		public function set hasFont(value:Boolean):void
		{
			flags0 = (value) ? flags0 | 0x01 : flags0 & ~0x01;
		}
		
		public function get hasFontClass():Boolean
		{
			return Boolean(flags1 & 0x80);
		}
		
		public function set hasFontClass(value:Boolean):void
		{
			flags1 |= (value) ? 0x80 : 0;
		}
		
		public function get autoSize():Boolean
		{
			return Boolean(flags1 & 0x40);
		}
		
		public function set autoSize(value:Boolean):void
		{
			flags1 |= (value) ? 0x40 : 0;
		}
		
		public function get hasLayout():Boolean
		{
			return Boolean(flags1 & 0x20);
		}
		
		public function set hasLayout(value:Boolean):void
		{
			flags1 |= (value) ? 0x20 : 0;
		}
		
		public function get noSelect():Boolean
		{
			return Boolean(flags1 & 0x10);
		}
		
		public function set noSelect(value:Boolean):void
		{
			flags1 |= (value) ? 0x10 : 0;
		}
		
		public function get border():Boolean
		{
			return Boolean(flags1 & 0x08);
		}
		
		public function set border(value:Boolean):void
		{
			flags1 |= (value) ? 0x08 : 0;
		}
		
		public function get wasStatic():Boolean
		{
			return Boolean(flags1 & 0x04);
		}
		
		public function set wasStatic(value:Boolean):void
		{
			flags1 |= (value) ? 0x04 : 0;
		}
		
		public function get html():Boolean
		{
			return Boolean(flags1 & 0x02);
		}
		
		public function set html(value:Boolean):void
		{
			flags1 |= (value) ? 0x02 : 0;
		}
		
		public function get useOutlines():Boolean
		{
			return Boolean(flags1 & 0x01);
		}
		
		public function set useOutlines(value:Boolean):void
		{
			flags1 |= (value) ? 0x01 : 0;
		}
		
		public function get alignName():String
		{
			switch (align)
			{
				case 0:
					return TextFormatAlign.LEFT;
				case 1:
					return TextFormatAlign.RIGHT;
				case 2:
					return TextFormatAlign.CENTER;
				case 3:
					return TextFormatAlign.JUSTIFY;
				default:
					return TextFormatAlign.LEFT;
			}
		}
		
		public function DefineEditText()
		{
			super();
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			bounds = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			
			bounds = stream.readRectangle();
			
			flags0 = stream.byteArray.readUnsignedByte();
			flags1 = stream.byteArray.readUnsignedByte();
			
			if (hasFont)
			{
				font = stream.byteArray.readUnsignedShort();
			}
			
			if (hasFontClass)
			{
				fontClass = stream.readString();
			}
			
			if (hasFont)
			{
				height = stream.byteArray.readUnsignedShort() / 20;
			}
			
			if (hasTextColor)
			{
				color = stream.readRGBA();
			}
			
			if (hasMaxLength)
			{
				length = stream.byteArray.readUnsignedShort();
			}
			
			if (hasLayout)
			{
				align = stream.byteArray.readUnsignedByte();
				leftMargin = stream.byteArray.readUnsignedShort() / 20;
				rightMargin = stream.byteArray.readUnsignedShort() / 20;
				indent = stream.byteArray.readUnsignedShort() / 20;
				leading = stream.byteArray.readShort() / 20;
			}
			
			variable = stream.readString();
			
			if (hasText)
			{
				text = stream.readString();
			}
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			
			stream.writeRectangle(bounds);
			
			stream.byteArray.writeByte(flags0);
			
			stream.byteArray.writeByte(flags1);
			
			if (hasFont)
			{
				stream.byteArray.writeShort(font);
			}
			
			if (hasFontClass)
			{
				stream.writeString(fontClass);
			}
			
			if (hasFont)
			{
				stream.byteArray.writeShort(height * 20);
			}
			
			if (hasTextColor)
			{
				stream.writeRGBA(color);
			}
			
			if (hasMaxLength)
			{
				stream.byteArray.writeShort(length);
			}
			
			if (hasLayout)
			{
				stream.byteArray.writeByte(align);
				stream.byteArray.writeShort(leftMargin * 20);
				stream.byteArray.writeShort(rightMargin * 20);
				stream.byteArray.writeShort(indent * 20);
				stream.byteArray.writeShort(leading * 20);
			}
			
			stream.writeString(variable);
			
			if (hasText)
			{
				stream.writeString(text);
			}
		}
		
		override public function toString():String
		{
			return "DefineEditText (length:" + bytes.length + ", id:" + id + "')";
		}
		
		public override function correct(parameters:CorrectParameters):void
		{
			var defineFont:DefineFont = parameters.swf.getFontTagById(font);
			
			if (defineFont)
			{
				name = defineFont.name;
			}
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.id = id;
			
			if (hasFont)
			{
				node.attributes.fontName = name;
				
				node.attributes.fontId = font;
				node.attributes.bold = true;
			}
			
			if (hasFontClass)
			{
				node.attributes["class"] = fontClass;
			}
			
			if (hasFont)
			{
				node.attributes.height = height;
			}
			
			if (hasTextColor)
			{
				node.attributes.color = "0x" + (color & 0xffffff).toString(16);
			}
			
			if (hasMaxLength)
			{
				node.attributes.length = length;
			}
			
			if (hasLayout)
			{
				node.attributes.align = alignName;
				node.attributes.leftMargin = leftMargin;
				node.attributes.rightMargin = rightMargin;
				node.attributes.indent = indent;
				node.attributes.leading = leading;
			}
			
			if (wordWrap) node.attributes.wordWrap = wordWrap;
			if (multiline) node.attributes.multiline = multiline;
			if (border) node.attributes.border = border;
			//if (html) node.attributes.html = html;
			if (password) node.attributes.password = password;
			
			if (autoSize) node.attributes.autoSize = TextFieldAutoSize.LEFT;
			
			if (noSelect) node.attributes.selectable = false;
			
			node.attributes.type = readOnly ? TextFieldType.DYNAMIC : TextFieldType.INPUT;
			
			if (bounds && !GeomUtil.isEmpty(bounds))
			{
				node.appendChild(XMLUtil.toXML(bounds));
			}
			
			node.attributes.variable = variable;
			
			if (text)
			{
				if (text.length && text.substring(0, 1) == "<")
				{
					var html:XMLDocument = new XMLDocument();
					html.ignoreWhite = true;
					html.parseXML("<text>" + text + "</text>");
					
					var fontNode:XMLNode = getFontNode(html);
					
					if (fontNode)
					{
						node.attributes.fontName = fontNode.attributes.face;
						node.attributes.fontSize = fontNode.attributes.size;
						node.attributes.fontKerning = fontNode.attributes.kerning;
						node.attributes.fontLetterSpacing = fontNode.attributes.letterSpacing;
						node.attributes.fontColor = fontNode.attributes.color.replace("#", "0x");
					}
					
					var lines:Array = [];
					
					for each(var p:XMLNode in html.firstChild.childNodes)
					{
						var line:String = "";
						
						for each(var lineNode:XMLNode in p.childNodes)
						{
							line += String(lineNode.firstChild).replace("<b>", "").replace("</b>", "");
						}
						
						lines.push(line);
					}
					
					node.attributes.text = escape(lines.join("\n"));
				}
				else
				{
					node.attributes.text = escape(text);
				}
			}
			else
			{
				node.attributes.text = "";
			}
			
			return node;
		}
		
		private function getFontNode(node:XMLNode):XMLNode
		{
			for each (var child:XMLNode in node.childNodes)
			{
				if (child.nodeName == "font")
				{
					return child;
				}
				else
				{
					var font:XMLNode = getFontNode(child);
					
					if (font) return font;
				}
			}
			
			return null;
		}
	}
	
}