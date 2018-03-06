package com.guepard.parser.info
{
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TagInfo
	{
		static public const EMBED:String = "Embed";
		
		public var type:String;
		public var parameters:Object;
		public var id:String;
		public var embed:EmbedInfo;
		
		public function get source():String
		{
			return parameters ? clearQuotes(parameters.source) : null;
		}
		
		public function get fontName():String
		{
			return parameters ? clearQuotes(parameters.fontName) : null;
		}
		
		public function get isImage():Boolean
		{
			if (parameters)
			{
				var path:String = source;
				
				if (path)
				{
					var extension:String = path.substring(path.length - 3).toLowerCase();
					
					return extension == "jpg" || extension == "png" || extension == "gif" || extension == "bmp";
				}
			}
			
			return false;
		}
		
		public function get isFont():Boolean
		{
			return parameters && parameters.fontName;
		}
		
		public function TagInfo()
		{
			
		}
		
		public function toXML():XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "tag");
			
			node.attributes.type = type;
			
			if (parameters)
			{
				var parametersNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "parameters");
				
				for (var i:String in parameters)
				{
					parametersNode.attributes[i] = parameters[i];
				}
				
				node.appendChild(parametersNode);
			}
			
			return node;
		}
		
		private function clearQuotes(string:String):String
		{
			if (string)
			{
				if (string.indexOf("\"") == 0 || string.indexOf("'") == 0)
				{
					string = string.substring(1, string.length - 1);
				}
			}
			
			return string;
		}
		
	}
	
}