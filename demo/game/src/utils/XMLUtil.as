package utils 
{
	import flash.xml.XMLDocument;
	import flash.xml.XMLNode;
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class XMLUtil
	{
		public static function getPercent(xmlNode:XMLNode, attributeName:String):Number
		{
			var percent:String = String(xmlNode.attributes[attributeName]).replace(",", ".");
			return Number(percent.substr(0, percent.length - 1)) / 100;
		}
		
		public static function getString(xmlNode:XMLNode, attributeName:String):String
		{
			return String(xmlNode.attributes[attributeName]);
		}
		
		public static function getNumber(xmlNode:XMLNode, attributeName:String):Number
		{
			return Number(String(xmlNode.attributes[attributeName]).replace(",", "."));
		}
		
		public static function getInt(xmlNode:XMLNode, attributeName:String):int
		{
			return int(Number(String(xmlNode.attributes[attributeName]).replace(",", ".")));
		}
		
		public static function getUint(xmlNode:XMLNode, attributeName:String):uint
		{
			return uint(Number(String(xmlNode.attributes[attributeName]).replace(",", ".")));
		}
		
		public static function getBoolean(xmlNode:XMLNode, attributeName:String):Boolean
		{
			return String(xmlNode.attributes[attributeName]).toLowerCase() == "true";
		}
		
		static public function getObject(xmlNode:XMLNode, attributeName:String):Object
		{
			return xmlNode.attributes[attributeName];
		}
		
		public static function getNode(xmlNode:XMLNode, nodeName:String):XMLNode
		{
			for each(var node:XMLNode in xmlNode.childNodes)
			{
				if (node.nodeName == nodeName) return node;
			}
			
			return null;
		}
		
		static public function getNodeByAttribute(xmlNode:XMLNode, attribute:String, name:String):XMLNode
		{
			for each(var node:XMLNode in xmlNode.childNodes)
			{
				if (node.attributes[attribute] == name) return node;
			}
			
			return null;
		}
		
		public static function hasAttribute(xmlNode:XMLNode, attributeName:String):Boolean
		{
			return xmlNode.attributes.hasOwnProperty(attributeName);
		}
		
		static public function hasNode(xmlNode:XMLNode, nodeName:String):Boolean 
		{
			for each(var node:XMLNode in xmlNode.childNodes)
			{
				if (node.nodeName == nodeName) return true;
			}
			
			return false;
		}
		
		public static function toMultilineString(xmlNode:XMLNode, tab:String = "\r\n"):String
		{
			if (xmlNode is XMLDocument)
			{
				return toMultilineString(xmlNode.firstChild);
			}
			
			var data:String = "";
			
			if (xmlNode.childNodes.length)
			{
				data += tab + "<" + xmlNode.nodeName + " " + attributesToString(xmlNode) + ">";
				
				for each(var child:XMLNode in xmlNode.childNodes)
				{
					data += toMultilineString(child, tab + "\t");
				}
				
				data += tab + "</" + xmlNode.nodeName + ">";
				data += tab;
			}
			else
			{
				data += tab + xmlNode.toString();
			}
			
			return data;
		}
		
		
		
		static private function attributesToString(xmlNode:XMLNode):String
		{
			var data:String = "";
			
			for (var name:String in xmlNode.attributes)
			{
				data += name + '="' + xmlNode.attributes[name] + '" ';
			}
			
			return data;
		}
	}

}