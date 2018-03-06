package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class MultinameInfo
	{
		public var kind:uint;
		
		public var name:String;
		
		public var namespaceSet:NamespaceSetInfo;
		
		public var namespaceLink:NamespaceInfo;
		
		public var types:Array;
		
		public var multinameLink:MultinameInfo;
		
		public function get classPath():String
		{
			return (namespaceLink) ? namespaceLink.name + "." + name : name;
		}
		
		public function get packagePath():String
		{
			return (namespaceLink) ? namespaceLink.name : "";
		}
		
		public function MultinameInfo()
		{
			
		}
		
		public function toString():String
		{
			return name;
		}
		
		public function equals(value:MultinameInfo):Boolean
		{
			return kind == value.kind && name == value.name && namespaceSet == value.namespaceSet && namespaceLink == value.namespaceLink && types == value.types && multinameLink == value.multinameLink;
		}
	}
	
}