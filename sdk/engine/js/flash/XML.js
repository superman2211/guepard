/*class  XML*/
(function ()
{
	"use strict";
	
	
	var d = {};

	d._value = null;
	
	
	/*public*/d.XML = function (value/*Object*/)
	{
		if (value)
		{
			var xml = new flash.xml.XMLDocument();
			xml.ignoreWhite = XML._settings.ignoreWhitespace;
			xml.parseXML(value);

			this._value = xml.firstChild;

			var array = this._value.get_childNodes();

			for (var i in array)
			{
				this[i] = new XML(array[i].toString());
			}
		}
	};
	
	/*public*/d.addNamespace = function (ns/*Object*/)/*XML*/
	{
		
	};
	
	/*public*/d.appendChild = function (child/*Object*/)/*XML*/
	{
		
	};
	
	/*public*/d.attribute = function (name/*Object*/, value/*Object*/)/*XMLList*/
	{
		if (this._value)
		{
			var object = this._value.get_attributes();

			if (value != undefined)
			{
				object[name] = value;
			}

			return object[name];
		}

		return null;
	};
	
	/*public*/d.attributes = function ()/*XMLList*/
	{
		var list = new XMLList();

		if (this._value)
		{
			var object = this._value.get_attributes();

			var i = 0;

			for (var name in object)
			{
				list[i] = object[name];
				i++;
			}
		}

		return list;
	};
	
	/*public*/d.child = function (name/*Object*/)/*XMLList*/
	{
		var list = new XMLList();

		var attribute = null;

		if(name.indexOf("@") == 0)
		{
			attribute = name.substring(1);
		}

		if (this._value)
		{
			var array = this._value.get_childNodes();

			var j = 0;

			for (var i in array)
			{
				var node = array[i];

                if (attribute)
                {
                    if(node.get_attributes()[attribute])
                    {
                        list[j] = node.get_attributes()[attribute];
                        j++;
                    }
                }
				else if (node.nodeName == name)
				{
					list[j] = new XML(node.toString());
					j++;
				}
			}
		}

		return list;
	};
	
	/*public*/d.childIndex = function ()/*int*/
	{
		return 0;
	};
	
	/*public*/d.children = function ()/*XMLList*/
	{
		var list = new XMLList();

		if (this._value)
		{
			var array = this._value.get_childNodes();

			for (var i in array)
			{
				var node = array[i];

				list[i] = new XML(node.toString());
			}
		}

		return list;
	};
	
	/*public*/d.comments = function ()/*XMLList*/
	{
		
	};
	
	/*public*/d.contains = function (value/*Object*/)/*Boolean*/
	{
		
	};
	
	/*public*/d.copy = function ()/*XML*/
	{
		return new XML(this.toXMLString());
	};
	
	/*public*/d.descendants = function (name/*Object*/)/*XMLList*/
	{
       var list = new XMLList();

		if (this._value)
		{
			var array = [];

			this._getDescendants(this._value, name, array);

			for (var i in array)
			{
				var node = array[i];

				list[i] = new XML(node.toString());
			}
		}

		return list;
	};

	/*public*/d._getDescendants = function (xml/*XMLNode*/, name/*String*/, array/*Array*/)
	{
        var attribute = null;

        if(name.indexOf("@") == 0)
        {
            attribute = name.substring(1);
        }

		var nodes = xml.get_childNodes();

		for (var i in nodes)
		{
			var node = nodes[i];

			if (attribute)
			{
				if(node.get_attributes()[attribute])
				{
                    array.push(node.get_attributes()[attribute]);
				}
			}
			else if (node.nodeName == name)
			{
                array.push(node);
			}

			this._getDescendants(node, name, array);
		}
	}
	
	/*public*/d.elements = function (name/*Object*/)/*XMLList*/
	{
		if (name == undefined) name = "*";
		
		
	};
	
	/*public*/d.hasComplexContent = function ()/*Boolean*/
	{
		
	};
	
	/*public*/d.hasSimpleContent = function ()/*Boolean*/
	{
		
	};
	
	/*public*/d.inScopeNamespaces = function ()/*Array*/
	{
		
	};
	
	/*public*/d.insertChildAfter = function (child1/*Object*/, child2/*Object*/)/*Object*/
	{
		
	};
	
	/*public*/d.insertChildBefore = function (child1/*Object*/, child2/*Object*/)/*Object*/
	{
		
	};
	
	/*public*/d.length = function ()/*int*/
	{
		return this._value ? this._value.get_childNodes().length : 0;
	};
	
	/*public*/d.localName = function ()/*Object*/
	{
		
	};
	
	/*public*/d.name = function ()/*Object*/
	{
		return this._value ? this._value.nodeName : null;
	};
	
	/*public*/d.namespace = function (prefix/*Object*/)/*Object*/
	{
		if (prefix == undefined) prefix = null;
		
		
	};
	
	/*public*/d.namespaceDeclarations = function ()/*Array*/
	{
		
	};
	
	/*public*/d.nodeKind = function ()/*String*/
	{
		
	};
	
	/*public*/d.normalize = function ()/*XML*/
	{
		
	};
	
	/*public*/d.notification = function ()/*Function*/
	{
		
	};
	
	/*public*/d.parent = function ()/*Object*/
	{
		
	};
	
	/*public*/d.prependChild = function (value/*Object*/)/*XML*/
	{
		
	};
	
	/*public*/d.processingInstructions = function (name/*Object*/)/*XMLList*/
	{
		if (name == undefined) name = "*";
		
		
	};
	
	/*public*/d.propertyIsEnumerable = function (P/*Object*/)/*Boolean*/
	{
		if (P == undefined) P = null;
		
		
	};
	
	/*public*/d.removeNamespace = function (ns/*Object*/)/*XML*/
	{
		
	};
	
	/*public*/d.replace = function (propertyName/*Object*/, value/*Object*/)/*XML*/
	{
		
	};
	
	/*public*/d.setChildren = function (value/*Object*/)/*XML*/
	{
		
	};
	
	/*public*/d.setLocalName = function (name/*Object*/)/*void*/
	{
		
	};
	
	/*public*/d.setName = function (name/*Object*/)/*void*/
	{
		
	};
	
	/*public*/d.setNamespace = function (ns/*Object*/)/*void*/
	{
		
	};
	
	/*public*/d.setNotification = function (f/*Function*/)/*Object*/
	{
		
	};
	
	/*public*/d.text = function ()/*XMLList*/
	{
		return this.toString();
	};
	
	/*public*/d.toXMLString = function ()/*String*/
	{
		return this._value ? this._value.toString() : "";
	};

	/*public*/d.toString = function ()/*String*/
	{
		if (this._value)
		{
			var children = this.children();

			if (this._value.nodeValue)
			{
				return this._value.nodeValue;
			}
			else if (children.length())
			{
				return children.toXMLString();
			}
			else
			{
				return this.toXMLString();
			}
		}
		else
		{
			return "";
		}
	};
	
	/*public*/d.valueOf = function ()/*XML*/
	{
		return this;
	};
	
	
	var s = {};
	
	/*public*/s.get_ignoreComments = function ()/*Boolean*/
	{
		return this._settings.ignoreComments;
	};
	
	/*public*/s.set_ignoreComments = function (value/*Boolean*/)/*void*/
	{
		this._settings.ignoreComments = value;

		return value;
	};
	
	/*public*/s.get_ignoreProcessingInstructions = function ()/*Boolean*/
	{
		return this._settings.ignoreProcessingInstructions;
	};
	
	/*public*/s.set_ignoreProcessingInstructions = function (value/*Boolean*/)/*void*/
	{
		this._settings.ignoreProcessingInstructions = value;

		return value;
	};
	
	/*public*/s.get_ignoreWhitespace = function ()/*Boolean*/
	{
		return this._settings.ignoreWhitespace;
	};
	
	/*public*/s.set_ignoreWhitespace = function (value/*Boolean*/)/*void*/
	{
		this._settings.ignoreWhitespace = value;

		return value;
	};
	
	/*public*/s.get_prettyIndent = function ()/*int*/
	{
		return this._settings.prettyIndent;
	};
	
	/*public*/s.set_prettyIndent = function (value/*int*/)/*void*/
	{
		this._settings.prettyIndent = /*int*/flash.int(value);

		return value;
	};
	
	/*public*/s.get_prettyPrinting = function ()/*Boolean*/
	{
		return this._settings.prettyPrinting;
	};
	
	/*public*/s.set_prettyPrinting = function (value/*Boolean*/)/*void*/
	{
		this._settings.prettyPrinting = value;

		return value;
	};
	
	/*public*/s.defaultSettings = function ()/*Object*/
	{
		return this._defaultSettings;
	};
	
	/*public*/s.settings = function ()/*Object*/
	{
		return this._settings;
	};

	/*public*/s.setSettings = function (value/*Object*/)/*void*/
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
