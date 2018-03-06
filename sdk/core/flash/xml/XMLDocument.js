/*class flash.xml.XMLDocument*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*public*/
	d/*var*/.docTypeDecl/*Object*/ = null;
	/*public*/
	d/*var*/.idMap/*Object*/ = null;
	/*public*/
	d/*var*/.ignoreWhite/*Boolean*/ = false;
	/*public*/
	d/*var*/.xmlDecl/*Object*/ = null;
	
	
	/*public*/
	d.XMLDocument = function (source/*String*/)
	{
		this.XMLNode_constructor(flash.xml.XMLNodeType.ELEMENT_NODE, null);
		
		this.parseXML(source);
	};
	
	/*public*/
	d.createElement = function (name/*String*/)/*XMLNode*/
	{
		return new flash.xml.XMLNode(flash.xml.XMLNodeType.ELEMENT_NODE, name);
		
	};
	
	/*public*/
	d.createTextNode = function (text/*String*/)/*XMLNode*/
	{
		return new flash.xml.XMLNode(flash.xml.XMLNodeType.TEXT_NODE, text);
		
	};
	
	/*public*/
	d.parseXML = function (source/*String*/)/*void*/
	{
		if (source)
		{
			this.firstChild = null;
			this.lastChild = null;
			
			if (this.ignoreWhite)
			{
				source = source.replace(/[\t\n\r ]+/g, " ");
				source = source.replace(new RegExp('> <', 'g'), "><");
				
			}
			
			var expr = RegExp(/(<\?[^>]+\?>)/);
			
			var declArray = source.match(expr);
			
			this.xmlDecl = declArray && declArray.length ? declArray[ 0 ] : null;
			
			source = source.replace(expr, "");
			
			source = source.replace(new RegExp("&", 'g'), '&amp;');
			
			source = "<rootnode>" + source + "</rootnode>";
			
			var xmlDoc = null;
			
			if (window.DOMParser)
			{
				var parser = new DOMParser();
				xmlDoc = parser.parseFromString(source, "text/xml");
			}
			else // Internet Explorer
			{
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = false;
				xmlDoc.loadXML(source);
			}
			
			xmlDoc = xmlDoc.firstChild;
			
			this._parseDomParsersXmlDoc(xmlDoc, this);
		}
	};
	
	d._parseAttributes = function (nativeNode, node)
	{
		var nativeAttributes = nativeNode.attributes;
		
		if (nativeAttributes)
		{
			var nodeAttributes = node.get_attributes();
			
			for (var i = 0; i < nativeAttributes.length; i++)
			{
				var attribute = nativeAttributes[ i ];
				nodeAttributes[ attribute.name ] = attribute.nodeValue;
			}
		}
	};
	
	d._parseDomParsersXmlDoc = function (nativeNode, node)
	{
		this._parseAttributes(nativeNode, node);
		
		var nativeNodes = nativeNode.childNodes;
		
		for (var i = 0; i < nativeNodes.length; i++)
		{
			var nativeChild = nativeNodes[ i ];
			
			var value = nativeChild.nodeType == flash.xml.XMLNodeType.ELEMENT_NODE ? nativeChild.nodeName : nativeChild.nodeValue;
			
			var child = new flash.xml.XMLNode(nativeChild.nodeType, value);
			
			this._parseDomParsersXmlDoc(nativeChild, child);
			
			node.appendChild(child);
		}
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return String(this.firstChild);
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.XMLNode_constructor = this.__base__;
		
		/*private*/
		this/*const*/.kElementNeverBegun/*int*/ = -10;
		/*private*/
		this/*const*/.kEndOfDocument/*int*/ = -1;
		/*private*/
		this/*const*/.kMalformedElement/*int*/ = -6;
		/*private*/
		this/*const*/.kNoError/*int*/ = 0;
		/*private*/
		this/*const*/.kOutOfMemory/*int*/ = -7;
		/*private*/
		this/*const*/.kUnterminatedAttributeValue/*int*/ = -8;
		/*private*/
		this/*const*/.kUnterminatedCdata/*int*/ = -2;
		/*private*/
		this/*const*/.kUnterminatedComment/*int*/ = -5;
		/*private*/
		this/*const*/.kUnterminatedDoctypeDeclaration/*int*/ = -4;
		/*private*/
		this/*const*/.kUnterminatedElement/*int*/ = -9;
		/*private*/
		this/*const*/.kUnterminatedXmlDeclaration/*int*/ = -3;
		
	};
	
	
	flash.addDescription("flash.xml.XMLDocument", d, "flash.xml.XMLNode", s, null);
	
}
());
