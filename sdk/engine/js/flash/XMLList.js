/*class  XMLList*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	/*public*/d.XMLList = function (value/*Object*/)
	{
		
		if (value == undefined) value = null;
		
		
	};

	/*private*/d.__find__ = function (callback/*Function*/)/*XML*/
	{
		var i = 0;

		while (this[i])
		{
			var xml = this[i];

			try
			{
				if (callback(xml))
				{
					return xml;
				}
			}
			catch(e)
			{
				
			}

			i++;
		}

		return null;
	};

	/*public*/d.addNamespace = function (ns/*Object*/)/*XML*/
	{
		
	};
	
	/*public*/d.appendChild = function (child/*Object*/)/*XML*/
	{
		
	};
	
	/*public*/d.attribute = function (arg/*Object*/)/*XMLList*/
	{
		var i = 0;

		while (this[i])
		{
			var temp = this[i].attribute(arg);

			if (temp != null)
			{
				return temp;
			}

			i++;
		}

		return null;
	};
	
	/*public*/d.attributes = function ()/*XMLList*/
	{
		
	};
	
	/*public*/d.child = function (propertyName/*Object*/)/*XMLList*/
	{
		var list = new XMLList();

		var i = 0;
		var j = 0;

		while (this[i])
		{
			var temp = this[i].child(propertyName);

			var t = 0;

			while (temp[t])
			{
				list[j++] = temp[t];
				t++;
			}

			i++;
		}

		return list;
	};
	
	/*public*/d.childIndex = function ()/*int*/
	{
		
	};
	
	/*public*/d.children = function ()/*XMLList*/
	{
		
	};
	
	/*public*/d.comments = function ()/*XMLList*/
	{
		
	};
	
	/*public*/d.contains = function (value/*Object*/)/*Boolean*/
	{
		
	};
	
	/*public*/d.copy = function ()/*XMLList*/
	{
		
	};
	
	/*public*/d.descendants = function (name/*Object*/)/*XMLList*/
	{
		if (name == undefined) name = "*";
		
		
	};
	
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
        var i = 0;

        while (this[i])
        {
            i++;
        }

        return i;
	};
	
	/*public*/d.localName = function ()/*Object*/
	{
		
	};
	
	/*public*/d.name = function ()/*Object*/
	{
		
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
	
	/*public*/d.normalize = function ()/*XMLList*/
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
	
	/*public*/d.text = function ()/*XMLList*/
	{
		return this.toString();
	};
	
	/*public*/d.toString = function ()/*String*/
	{
        var data = [];

		var i = 0;

		while (this[i])
		{
			data.push(this[i].toString());
			i++;
		}

		return data.join("\n");
	};
	
	/*public*/d.toXMLString = function ()/*String*/
	{
		var data = [];

		var i = 0;

		while (this[i])
		{
			data.push(this[i].toXMLString());
			i++;
		}

		return data.join("\n");
	};
	
	/*public*/d.valueOf = function ()/*XMLList*/
	{
		
	};
	
	
	
	
	
	flash.addDescription("XMLList", d, null, null, null, null);
	
}
());
