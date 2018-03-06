package com.guepard.parser.info
{
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class NamespaceInfo
	{
		public var data:String;
		public var child:NamespaceInfo;
		
		public function get about():String
		{
			return toString();
		}
		
		public function get name():String
		{
			if (data)
			{
				var parts:Array = data.split(".");
				
				return parts.pop();
			}
			else
			{
				return null;
			}
		}
		
		public function get childName():String
		{
			if (child)
			{
				return child.data;
			}
			else
			{
				return data;
			}
		}
		
		public function set childName(value:String):void
		{
			if (child)
			{
				child.data = value;
			}
			else
			{
				data = value;
			}
		}
		
		public function get parent():NamespaceInfo
		{
			if (data)
			{
				var parts:Array = data.split(".");
				
				if (parts.length > 1)
				{
					parts.pop();
					
					return new NamespaceInfo(parts.join("."));
				}
			}
			
			return null;
		}
		
		public function get root():NamespaceInfo
		{
			var parent:NamespaceInfo = this.parent;
			
			if (parent)
			{
				return parent.root;
			}
			else
			{
				return this;
			}
		}
		
		public function get peak():NamespaceInfo
		{
			if (child)
			{
				return child.peak;
			}
			else
			{
				return this;
			}
		}
		
		public function set peak(value:NamespaceInfo):void
		{
			if (child)
			{
				child.peak = value;
			}
			else
			{
				data = value.data;
				child = value.child;
			}
		}
		
		public function NamespaceInfo(data:String = null, child:NamespaceInfo = null)
		{
			this.data = data;
			this.child = child;
		}
		
		public function addChild(value:NamespaceInfo):void
		{
			peak.child = value;
		}
		
		public function clone():NamespaceInfo
		{
			return new NamespaceInfo(
				data,
				child ? child.clone() : null
			);
		}
		
		public function toXML(name:String):XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, name);
			
			if (data)
			{
				node.attributes.data = data;
			}
			
			if (child)
			{
				node.appendChild(child.toXML("Child"));
			}
			
			return node;
		}
		
		public function toString():String
		{
			if (child)
			{
				if (data == "Vector")
				{
					return data + ".<" + child.toString() + ">";
				}
				else
				{
					return data + " : " + child.toString();
				}
			}
			else
			{
				return data;
			}
		}
	}
	
}