package com.guepard.parser.info
{
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class MemberInfo
	{
		public var name:String;
		public var access:String;
		public var statique:Boolean;
		public var type:NamespaceInfo;
		public var body:Vector.<ExpressionInfo>;
		public var tag:TagInfo;
		
		public function MemberInfo()
		{
			access = AccessType.INTERNAL;
			statique = false;
		}
		
		public function equals(info:MemberInfo):Boolean
		{
			return name == info.name &&
				access == info.access &&
				statique == info.statique &&
				String(type) == String(info.type);
		}
		
		public function toXML(memberType:String = null):XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, memberType);
			
			if (name) node.attributes["name"] = name;
			
			if (access != "internal")
			{
				node.attributes["access"] = access;
			}
			
			if (statique) node.attributes["static"] = statique;
			
			if (tag)
			{
				node.appendChild(tag.toXML());
			}
			
			if (type)
			{
				node.attributes.type = type.toString();
			}
			
			if (body && body.length)
			{
				var bodyNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "body");
				node.appendChild(bodyNode);
				
				for each(var expression:ExpressionInfo in body)
				{
					if (expression)
					{
						bodyNode.appendChild(expression.toXML());
					}
					else
					{
						bodyNode.appendChild(new XMLNode(XMLNodeType.ELEMENT_NODE, "null"));
					}
				}
			}
			
			return node;
		}
	}
}