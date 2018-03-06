package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ShowFrame extends Tag
	{
		public var index:int;
		
		public function ShowFrame()
		{
			super();
		}
		
		public override function toString():String
		{
			return tagName + " (index: " + index + ")";
		}
		
		public override function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.index = index;
			
			return node;
		}
	}
	
}