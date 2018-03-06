package com.guepard.decompiler.data
{
	import avmplus.getQualifiedClassName;
	
	import flash.utils.ByteArray;
	import flash.utils.getDefinitionByName;
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Tag
	{
		public var type:int;
		public var id:int;
		public var bytes:ByteArray;
		public var scaleCorrected:Boolean;
		
		public function get tagName():String
		{
			return TagType.getName(type);
		}
		
		public function Tag()
		{
			id = -1;
		}
		
		public function dispose():void
		{
			bytes = null;
		}
		
		public function clone():Tag
		{
			var TagClass:Class = Class(getDefinitionByName(getQualifiedClassName(this)));
			
			write();
			
			bytes.position = 0;
			
			var tag:Tag = new TagClass();
			tag.type = type;
			tag.bytes = new ByteArray();
			tag.bytes.writeBytes(bytes, 0, bytes.length);
			tag.read();
			
			return tag;
		}
		
		public function correct(parameters:CorrectParameters):void
		{
			
		}
		
		public function read():void
		{
			
		}
		
		public function write():void
		{
			
		}
		
		public function toString():String
		{
			return tagName + " (length:" + bytes.length + ")";
		}
		
		public function toXML():XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, tagName);
			
			return node;
		}
	}
}