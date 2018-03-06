/*class flash.xml.XMLDocument*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.docTypeDecl/*Object*/ = null;
	d.idMap/*Object*/ = null;
	d.ignoreWhite/*Boolean*/ = false;
	d.xmlDecl/*Object*/ = null;
	
	
	d.XMLDocument = function (source/*String*/)
	{
		this.XMLNode_constructor(flash.xml.XMLNodeType.ELEMENT_NODE, null);
		
		this.parseXML(source);
	};
	
	d.createElement = function (name/*String*/)/*XMLNode*/
	{
		return new flash.xml.XMLNode(flash.xml.XMLNodeType.ELEMENT_NODE, name);
		
	};
	
	d.createTextNode = function (text/*String*/)/*XMLNode*/
	{
		return new flash.xml.XMLNode(flash.xml.XMLNodeType.TEXT_NODE, text);
		
	};
	
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
	d.toString = function ()/*String*/
	{
		return String(this.firstChild);
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.XMLNode_constructor = this.__base__;
		
		this.kElementNeverBegun/*int*/ = -10;
		this.kEndOfDocument/*int*/ = -1;
		this.kMalformedElement/*int*/ = -6;
		this.kNoError/*int*/ = 0;
		this.kOutOfMemory/*int*/ = -7;
		this.kUnterminatedAttributeValue/*int*/ = -8;
		this.kUnterminatedCdata/*int*/ = -2;
		this.kUnterminatedComment/*int*/ = -5;
		this.kUnterminatedDoctypeDeclaration/*int*/ = -4;
		this.kUnterminatedElement/*int*/ = -9;
		this.kUnterminatedXmlDeclaration/*int*/ = -3;
		
	};
	
	
	flash.addDescription("flash.xml.XMLDocument", d, "flash.xml.XMLNode", s, null);
	
}
());
