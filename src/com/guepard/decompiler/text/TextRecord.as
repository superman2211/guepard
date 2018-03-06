package com.guepard.decompiler.text
{
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TextRecord
	{
		public var flags:uint;
		public var font:String;
		public var fontId:int;
		public var color:uint;
		public var x:Number;
		public var y:Number;
		public var height:Number;
		
		public var text:String;
		
		public var glyphEntries:Array;
		
		public function get hasFont():Boolean
		{
			return Boolean(flags & 0x08);// 00001000
		}
		
		public function set hasFont(value:Boolean):void
		{
			flags = (value) ? flags | 0x08 : flags & ~0x08;// 00001000
		}
		
		public function get hasColor():Boolean
		{
			return Boolean(flags & 0x04);// 00000100
		}
		
		public function set hasColor(value:Boolean):void
		{
			flags = (value) ? flags | 0x04 : flags & ~0x04;// 00000100
		}
		
		public function get hasOffsetX():Boolean
		{
			return Boolean(flags & 0x02);// 00000010
		}
		
		public function set hasOffsetX(value:Boolean):void
		{
			flags = (value) ? flags | 0x02 : flags & ~0x02;// 00000010
		}
		
		public function get hasOffsetY():Boolean
		{
			return Boolean(flags & 0x01);// 00000001
		}
		
		public function set hasOffsetY(value:Boolean):void
		{
			flags = (value) ? flags | 0x01 : flags & ~0x01;// 00000001
		}
		
		public function get isCorrect():Boolean
		{
			return Boolean(flags & 0x80);// 10000000
		}
		
		public function set isCorrect(value:Boolean):void
		{
			flags = (value) ? flags | 0x80 : flags & ~0x80;// 10000000
		}
		
		public function TextRecord()
		{
			
		}
		
		public function toXML():XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "TextRecord");
			
			node.attributes.text = escape(text);
			
			if (hasFont)
			{
				node.attributes.font = font;
				node.attributes.fontId = fontId;
			}
			
			if (hasColor)
			{
				node.attributes.color = color;
			}
			
			if (x)
			{
				node.attributes.x = x;
			}
			
			if (y)
			{
				node.attributes.y = y;
			}
			
			if (hasFont)
			{
				node.attributes.height = height;
			}
			
			for each(var entry:GlyphEntry in glyphEntries)
			{
				node.appendChild(entry.toXML())
			}
			
			return node;
		}
		
	}
	
}