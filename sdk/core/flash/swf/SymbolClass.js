(function ()
{
	"use strict";
	
	var d = {};
	
	d.data = null;
	
	d.SymbolClass = function ()
	{
		this.Tag_constructor();
		
	};
	
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		this.data = {};
		
		var childNodes = node.get_childNodes();
		
		for (var i = 0; i < childNodes.length; i++)
		{
			var child = childNodes[ i ];
			
			if (child.nodeName == "SymbolData")
			{
				var attributes = child.get_attributes();
				
				this.data[ attributes.name ] = flash.swf.Tag._baseId + attributes.id;
			}
		}
	};
	
	d.getClassName = function (id)
	{
		for (var name in this.data)
		{
			if (this.data[ name ] == id)
			{
				return name;
			}
		}
		
		return null;
	};
	
	d.getDefineId = function (name, weak)
	{
		if (weak)
		{
			for (var key in this.data)
			{
				if (key.indexOf(name) != -1)
				{
					return this.data[ key ];
				}
			}
		}
		else
		{
			return this.data[ name ];
		}
	};
	
	d.setIdToClasses = function ()
	{
		for (var name in this.data)
		{
			var id = this.data[ name ];
			
			var ClassObject = flash.utils.getDefinitionByName(name);
			
			if (!ClassObject)
			{
				var define = flash.system.ApplicationDomain.get_currentDomain()._getDefine(id);
				
				if (define)
				{
					ClassObject = flash.createExtendsClass(name, define.baseClass);
				}
			}
			
			if (ClassObject)
			{
				ClassObject.__linkageId = id;
			}
			else
			{
				throw new Error("Class for linkage not found '" + name + "'");
			}
		}
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.SymbolClass", d, "flash.swf.Tag", s, null);
	
}
());