/*class  XML*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._value = null;
	
	
	d.XML = function (value/*Object*/)
	{
		if (value)
		{
			var xml = new flash.xml.XMLDocument();
			xml.ignoreWhite = XML._settings.ignoreWhitespace;
			xml.parseXML(value);
			
			this._value = xml.firstChild;
		}
	};
	
	d.addNamespace = function (ns/*Object*/)/*XML*/
	{
		
	};
	
	d.appendChild = function (child/*Object*/)/*XML*/
	{
		
	};
	
	d.attribute = function (name/*Object*/, value/*Object*/)/*XMLList*/
	{
		if (this._value)
		{
			var object = this._value.get_attributes();
			
			if (value != undefined)
			{
				object[ name ] = value;
			}
			
			return object[ name ];
		}
		
		return null;
	};
	
	d.attributes = function ()/*XMLList*/
	{
		var list = new XMLList();
		
		if (this._value)
		{
			var object = this._value.get_attributes();
			
			var i = 0;
			
			for (var name in object)
			{
				list[ i ] = object[ name ];
				i++;
			}
		}
		
		return list;
	};
	
	d.child = function (name/*Object*/)/*XMLList*/
	{
		var list = new XMLList();
		
		if (this._value)
		{
			var array = this._value.get_childNodes();
			
			var j = 0;
			
			for (var i in array)
			{
				var node = array[ i ];
				
				if (node.nodeName == name)
				{
					list[ j ] = new XML(node.toString());
					j++;
				}
			}
		}
		
		return list;
	};
	
	d.childIndex = function ()/*int*/
	{
		return 0;
	};
	
	d.children = function ()/*XMLList*/
	{
		var list = new XMLList();
		
		if (this._value)
		{
			var array = this._value.get_childNodes();
			
			for (var i in array)
			{
				var node = array[ i ];
				
				list[ i ] = new XML(node.toString());
			}
		}
		
		return list;
	};
	
	d.comments = function ()/*XMLList*/
	{
		
	};
	
	d.contains = function (value/*Object*/)/*Boolean*/
	{
		
	};
	
	d.copy = function ()/*XML*/
	{
		return new XML(this.toXMLString());
	};
	
	d.descendants = function (name/*Object*/)/*XMLList*/
	{
		var list = new XMLList();
		
		if (this._value)
		{
			var array = [];
			
			this._getDescendants(this._value, name, array);
			
			for (var i in array)
			{
				var node = array[ i ];
				
				list[ i ] = new XML(node.toString());
			}
		}
		
		return list;
	};
	
	d._getDescendants = function (xml/*XMLNode*/, name/*String*/, array/*Array*/)
	{
		var nodes = xml.get_childNodes();
		
		for (var i in nodes)
		{
			var node = nodes[ i ];
			
			if (node.nodeName == name)
			{
				array.push(node);
			}
			
			this._getDescendants(node, name, array);
		}
	}
	
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
		return this._value ? this._value.get_childNodes().length : 0;
	};
	
	d.localName = function ()/*Object*/
	{
		
	};
	
	d.name = function ()/*Object*/
	{
		return this._value ? this._value.nodeName : null;
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
	
	d.normalize = function ()/*XML*/
	{
		
	};
	
	d.notification = function ()/*Function*/
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
	
	d.setNotification = function (f/*Function*/)/*Object*/
	{
		
	};
	
	d.text = function ()/*XMLList*/
	{
		
	};
	
	d.toXMLString = function ()/*String*/
	{
		return this._value ? this._value.toString() : "";
	};
	
	d.toString = function ()/*String*/
	{
		if (this._value)
		{
			if (this._value.nodeValue)
			{
				return this._value.nodeValue;
			}
			else
			{
				return this.children().toString();
			}
		}
		else
		{
			return "";
		}
	};
	
	d.valueOf = function ()/*XML*/
	{
		return this;
	};
	
	
	var s = {};
	
	s.get_ignoreComments = function ()/*Boolean*/
	{
		return this._settings.ignoreComments;
	};
	
	s.set_ignoreComments = function (value/*Boolean*/)/*void*/
	{
		this._settings.ignoreComments = value;
		
		return value;
	};
	
	s.get_ignoreProcessingInstructions = function ()/*Boolean*/
	{
		return this._settings.ignoreProcessingInstructions;
	};
	
	s.set_ignoreProcessingInstructions = function (value/*Boolean*/)/*void*/
	{
		this._settings.ignoreProcessingInstructions = value;
		
		return value;
	};
	
	s.get_ignoreWhitespace = function ()/*Boolean*/
	{
		return this._settings.ignoreWhitespace;
	};
	
	s.set_ignoreWhitespace = function (value/*Boolean*/)/*void*/
	{
		this._settings.ignoreWhitespace = value;
		
		return value;
	};
	
	s.get_prettyIndent = function ()/*int*/
	{
		return this._settings.prettyIndent;
	};
	
	s.set_prettyIndent = function (value/*int*/)/*void*/
	{
		this._settings.prettyIndent = /*int*/flash.int(value);
		
		return value;
	};
	
	s.get_prettyPrinting = function ()/*Boolean*/
	{
		return this._settings.prettyPrinting;
	};
	
	s.set_prettyPrinting = function (value/*Boolean*/)/*void*/
	{
		this._settings.prettyPrinting = value;
		
		return value;
	};
	
	s.defaultSettings = function ()/*Object*/
	{
		return this._defaultSettings;
	};
	
	s.settings = function ()/*Object*/
	{
		return this._settings;
	};
	
	s.setSettings = function (value/*Object*/)/*void*/
	{
		if (value != null)
		{
			this._settings = {
				ignoreComments: value.ignoreComments,
				ignoreProcessingInstructions: value.ignoreProcessingInstructions,
				ignoreWhitespace: value.ignoreWhitespace,
				prettyIndent: value.prettyIndent,
				prettyPrinting: value.prettyPrinting
			};
		}
	};
	
	s.__init__ = function ()
	{
		this._defaultSettings = {
			ignoreComments: true,
			ignoreProcessingInstructions: true,
			ignoreWhitespace: true,
			prettyIndent: 2,
			prettyPrinting: true
		};
		
		this._settings = null;
		
		this.setSettings(this._defaultSettings);
	};
	
	flash.addDescription("XML", d, null, s, null, null);
	
}
());
