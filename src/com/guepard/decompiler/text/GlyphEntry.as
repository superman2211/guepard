package com.guepard.decompiler.text
{
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class GlyphEntry
	{
		public var glyphIndex:uint;
		public var glyphAdvance:int;
		
		public function GlyphEntry()
		{
			
		}
		
		public function toString():String
		{
			return " {" + glyphIndex + ", " + glyphAdvance + "}"
		}
		
		public function toXML():XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "GlyphEntry");
			
			node.attributes.index = glyphIndex;
			node.attributes.advance = glyphAdvance;
			
			return node;
		}
	}
	
}