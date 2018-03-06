package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class NamespaceSetInfo
	{
		public var namespaces:Array;
		
		public function NamespaceSetInfo()
		{
			
		}
		
		public function equals(nss:NamespaceSetInfo):Boolean
		{
			return namespaces == nss.namespaces;
		}
		
		public function toString():String
		{
			if (namespaces)
			{
				return "NamespaceSetInfo (" + namespaces.length + ")";
			}
			else
			{
				return "NamespaceSetInfo";
			}
		}
	}
	
}