/*class  XMLList*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	d.XMLList = function (value/*Object*/)
	{
		
		if (value == undefined) value = null;
		
		
	};
	
	d.__find__ = function (callback/*Function*/)/*XML*/
	{
		var i = 0;
		
		while (this[ i ])
		{
			var xml = this[ i ];
			
			try
			{
				if (callback(xml))
				{
					return xml;
				}
			}
			catch (e)
			{
				
			}
			
			i++;
		}
		
		return null;
	};
	
	d.addNamespace = function (ns/*Object*/)/*XML*/
	{
		
	};
	
	d.appendChild = function (child/*Object*/)/*XML*/
	{
		
	};
	
	d.attribute = function (arg/*Object*/)/*XMLList*/
	{
		
	};
	
	d.attributes = function ()/*XMLList*/
	{
		
	};
	
	d.child = function (propertyName/*Object*/)/*XMLList*/
	{
		
	};
	
	d.childIndex = function ()/*int*/
	{
		
	};
	
	d.children = function ()/*XMLList*/
	{
		
	};
	
	d.comments = function ()/*XMLList*/
	{
		
	};
	
	d.contains = function (value/*Object*/)/*Boolean*/
	{
		
	};
	
	d.copy = function ()/*XMLList*/
	{
		
	};
	
	d.descendants = function (name/*Object*/)/*XMLList*/
	{
		if (name == undefined) name = "*";
		
		
	};
	
	d.elements = function (name/*Object*/)/*XMLList*/
	{
		if (name == undefined) name = "*";
		
		
	};
	
	d.hasComplexContent = function ()/*Boolean*/
	{
		
	};
	
	d.hasSimpleContent = function ()/*Boolean*/
	{
		
	};
	
	d.inScopeNamespaces = function ()/*Array*/
	{
		
	};
	
	d.insertChildAfter = function (child1/*Object*/, child2/*Object*/)/*Object*/
	{
		
	};
	
	d.insertChildBefore = function (child1/*Object*/, child2/*Object*/)/*Object*/
	{
		
	};
	
	d.length = function ()/*int*/
	{
		
	};
	
	d.localName = function ()/*Object*/
	{
		
	};
	
	d.name = function ()/*Object*/
	{
		
	};
	
	d.namespace = function (prefix/*Object*/)/*Object*/
	{
		if (prefix == undefined) prefix = null;
		
		
	};
	
	d.namespaceDeclarations = function ()/*Array*/
	{
		
	};
	
	d.nodeKind = function ()/*String*/
	{
		
	};
	
	d.normalize = function ()/*XMLList*/
	{
		
	};
	
	d.parent = function ()/*Object*/
	{
		
	};
	
	d.prependChild = function (value/*Object*/)/*XML*/
	{
		
	};
	
	d.processingInstructions = function (name/*Object*/)/*XMLList*/
	{
		if (name == undefined) name = "*";
		
		
	};
	
	d.propertyIsEnumerable = function (P/*Object*/)/*Boolean*/
	{
		if (P == undefined) P = null;
		
		
	};
	
	d.removeNamespace = function (ns/*Object*/)/*XML*/
	{
		
	};
	
	d.replace = function (propertyName/*Object*/, value/*Object*/)/*XML*/
	{
		
	};
	
	d.setChildren = function (value/*Object*/)/*XML*/
	{
		
	};
	
	d.setLocalName = function (name/*Object*/)/*void*/
	{
		
	};
	
	d.setName = function (name/*Object*/)/*void*/
	{
		
	};
	
	d.setNamespace = function (ns/*Object*/)/*void*/
	{
		
	};
	
	d.text = function ()/*XMLList*/
	{
		
	};
	
	d.toString = function ()/*String*/
	{
		var data = "";
		
		var i = 0;
		
		while (this[ i ])
		{
			data += this[ i ].toString();
			i++;
		}
		
		return data;
	};
	
	d.toXMLString = function ()/*String*/
	{
		var data = "";
		
		var i = 0;
		
		while (this[ i ])
		{
			data += this[ i ].toXMLString();
			i++;
		}
		
		return data;
	};
	
	d.valueOf = function ()/*XMLList*/
	{
		
	};
	
	
	flash.addDescription("XMLList", d, null, null, null, null);
	
}
());
