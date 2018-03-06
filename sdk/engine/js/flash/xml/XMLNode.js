/*class flash.xml.XMLNode*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._attributes/*Object*/ = null;
	d.firstChild/*XMLNode*/ = null;
	d.lastChild/*XMLNode*/ = null;
	d.nextSibling/*XMLNode*/ = null;
	d.nodeName/*String*/ = null;
	d.nodeType/*uint*/ = 0;
	d.nodeValue/*String*/ = null;
	d.parentNode/*XMLNode*/ = null;
	d.previousSibling/*XMLNode*/ = null;
	
	d.get_attributes = function ()/*Object*/
	{
		if (this._attributes == null)
		{
			this._attributes = {};
		}
		
		return this._attributes;
	};
	
	d.set_attributes = function (value/*Object*/)/*void*/
	{
		this._attributes = value;
		
		return value;
	};
	
	d.get_childNodes = function ()/*Array*/
	{
		var childNodes = [];
		
		var child = this.firstChild;
		
		while (child)
		{
			childNodes.push(child);
			
			child = child.nextSibling;
		}
		
		return childNodes;
	};
	
	d.get_localName = function ()/*String*/
	{
		return null;
	};
	
	d.get_namespaceURI = function ()/*String*/
	{
		if (this.nodeName == null) return null;
		
		return this.getNamespaceForPrefix(this.get_prefix());
		
	};
	
	d.get_prefix = function ()/*String*/
	{
		if (this.nodeName == null) return null;
		
		var index = this.nodeName.indexOf(":");
		
		if (index != -1)
		{
			return this.nodeName.substring(0, index);
		}
		
		return "";
	};
	
	
	d.XMLNode = function (type/*uint*/, value/*String*/)
	{
		type = /*uint*/Math.floor(type);
		
		this.init(type, value);
	};
	
	d.appendChild = function (node/*XMLNode*/)/*void*/
	{
		var curentNode = this;
		
		while (curentNode)
		{
			if (curentNode === node)
			{
				console.error("XML recursion failure: new child would create infinite loop.");
				return;
			}
			
			curentNode = curentNode.parentNode;
		}
		
		node.parentNode = this;
		
		if (this.firstChild == null)
		{
			node.previousSibling = null;
			node.nextSibling = null;
			this.firstChild = node;
			this.lastChild = node;
		}
		else
		{
			this.lastChild.nextSibling = node;
			node.previousSibling = this.lastChild;
			node.nextSibling = null;
			this.lastChild = node;
		}
	};
	
	d.cloneNode = function (deep/*Boolean*/)/*XMLNode*/
	{
		return null;
	};
	
	d.getNamespaceForPrefix = function (prefix/*String*/)/*String*/
	{
		var str = "";
		var str2 = "";
		
		for (str in this.attributes)
		{
			if (str.indexOf("xmlns") == 0)
			{
				if (str.charCodeAt(5) == 58)
				{
					str2 = str.substring(6);
					
					if (str2 == prefix)
					{
						//console.log("p1");
						return this.attributes[ str ];
					}
					
					continue;
				}
				
				if (prefix.length == 0)
				{
					return this.attributes[ str ];
				}
			}
		}
		
		if (this.parentNode != null)
		{
			return this.parentNode.getNamespaceForPrefix(prefix);
		}
		
		return "";
	};
	
	d.getPrefixForNamespace = function (ns/*String*/)/*String*/
	{
		var str = "";
		
		for (str in _attributes)
		{
			if (str.indexOf("xmlns") == 0)
			{
				if (_attributes[ str ] == ns)
				{
					if (str.charCodeAt(5) == 58)
					{
						return str.substring(6);
					}
					
					return "";
				}
			}
		}
		
		if (parentNode !== null)
		{
			return this.parentNode.getPrefixForNamespace(ns);
		}
		
		return "";
		
	};
	
	d.hasChildNodes = function ()/*Boolean*/
	{
		return this.firstChild != null;
	};
	
	d.init = function (type/*uint*/, value/*String*/)/*void*/
	{
		this.nodeType = /*uint*/Math.floor(type);
		
		if (this.nodeType == flash.xml.XMLNodeType.ELEMENT_NODE)
		{
			this.nodeName = value;
		}
		else
		{
			this.nodeValue = value;
		}
	};
	
	d.insertBefore = function (node/*XMLNode*/, before/*XMLNode*/)/*void*/
	{
		if (before == null)
		{
			return this.appendChild(node);
		}
		
		if (before.parentNode == this || node.parentNode == this)
		{
			console.error("The before XMLNode parameter must be a child of the caller.")
		}
		
		node.removeNode();
		
		if (before.previousSibling == null)
		{
			this.firstChild = node;
		}
		else
		{
			before.previousSibling.nextSibling = node;
		}
		
		node.previousSibling = before.previousSibling;
		node.nextSibling = before;
		before.previousSibling = node;
		node.parentNode = this;
		
		var childNodes = this.get_childNodes();
		
		if (childNodes.length)
		{
			var counter = 0;
			
			while (counter < childNodes.length)
			{
				
				if (childNodes[ counter ] == before)
				{
					childNodes.splice(counter, 0, node);
					return;
				}
				
				counter = counter + 1;
			}
		}
		else
		{
			return;
		}
		
		console.error("The before XMLNode parameter must be a child of the caller.");
	};
	
	d.removeNode = function ()/*void*/
	{
		if (this.parentNode != null)
		{
			if (this.previousSibling == null && this.nextSibling == null)
			{
				this.parentNode.firstChild = null;
				this.parentNode.lastChild = null;
			}
			else if (this.previousSibling == null)
			{
				this.parentNode.firstChild = this.nextSibling;
				this.nextSibling.previousSibling = null;
			}
			else if (this.nextSibling == null)
			{
				this.parentNode.lastChild = this.previousSibling;
				this.previousSibling.nextSibling = null;
			}
			else
			{
				this.previousSibling.nextSibling = this.nextSibling;
				this.nextSibling.previousSibling = this.previousSibling;
			}
			
			this.previousSibling = null;
			this.nextSibling = null;
			this.parentNode = null;
		}
	};
	
	d.toString = function ()/*String*/
	{
		if (this.nodeType == flash.xml.XMLNodeType.ELEMENT_NODE)
		{
			var childNodes = this.get_childNodes();
			var attributes = this.get_attributes();
			
			var s = "<" + this.nodeName;
			
			for (var i in attributes)
			{
				s += " " + i + '="' + attributes[ i ] + '"';
			}
			
			if (childNodes.length)
			{
				s += ">";
				
				for (var j = 0; j < childNodes.length; j++)
				{
					var node = childNodes[ j ];
					
					s += node.toString();
				}
				
				s += "</" + this.nodeName + ">";
			}
			else
			{
				s += "/>";
			}
			
			return s;
		}
		else if (this.nodeType == flash.xml.XMLNodeType.COMMENT_NODE)
		{
			return "<!--" + this.nodeValue + "-->";
		}
		else if (this.nodeType == flash.xml.XMLNodeType.CDATA_NODE)
		{
			return "<![CDATA[" + this.nodeValue + "]]>";
		}
		else
		{
			return this.nodeValue;
		}
	};
	
	
	flash.addDescription("flash.xml.XMLNode", d, null, null, null);
	
}
());
