package com.guepard.decompiler.tags
{
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SymbolData
	{
		public var id:uint;
		public var name:String;
		
		public function SymbolData()
		{
			
		}
		
		public function toXML():XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "SymbolData");
			
			node.attributes.id = id;
			node.attributes.name = name;
			
			return node;
		}
		
	}
	
}