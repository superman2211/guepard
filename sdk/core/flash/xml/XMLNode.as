package flash.xml
{
	
	public class XMLNode
	{
		public var previousSibling:XMLNode;
		public var parentNode:XMLNode;
		public var nodeValue:String;
		public var firstChild:XMLNode;
		public var nextSibling:XMLNode;
		public var nodeType:uint;
		public var lastChild:XMLNode;
		public var nodeName:String;
		
		public function get namespaceURI():String
		{
		}
		
		public function get prefix():String
		{
		}
		
		public function get attributes():Object
		{
		}
		
		public function set attributes(value:Object):void
		{
			
		}
		
		public function get childNodes():Array
		{
			
		}
		
		public function get localName():String
		{
			
		}
		
		public function XMLNode(type:uint, value:String)
		{
			
		}
		
		public function appendChild(node:XMLNode):void
		{
			
		}
		
		public function insertBefore(node:XMLNode, before:XMLNode):void
		{
			
		}
		
		public function getNamespaceForPrefix(prefix:String):String
		{
			
		}
		
		public function hasChildNodes():Boolean
		{
			
		}
		
		public function getPrefixForNamespace(ns:String):String
		{
			
		}
		
		public function toString():String
		{
			
		}
		
		public function removeNode():void
		{
			
		}
		
		public function cloneNode(deep:Boolean):XMLNode
		{
			
		}
		
	}
}
