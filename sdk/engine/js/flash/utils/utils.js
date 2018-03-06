(function ()
{
	"use strict";
	
	flash.createPackage("flash.utils");
	
	flash.utils.setInterval = function (callback, time)
	{
		return setInterval(callback, time);
	}
	
	flash.utils.setTimeout = function (callback, time)
	{
		return setTimeout(callback, time);
	}
	
	flash.utils.clearInterval = function (id)
	{
		return clearInterval(id);
	}
	
	flash.utils.clearTimeout = function (id)
	{
		return clearTimeout(id);
	}
	
	flash.utils.getTimer = function ()
	{
		return new Date().getTime();
	};
	
	flash.utils.describeType = function (value)
	{
		return new flash.xml.XMLNode(flash.xml.XMLNodeType.ELEMENT_NODE, "class");
	};
	
	flash.utils.getDefinitionByName = function (name)
	{
		return flash.classes[ name ];
	};
	
	flash.utils.getQualifiedClassName = function (value)
	{
		switch (typeof value)
		{
			case "number":
				return "Number";
			case "string":
				return "String";
			case "boolean":
				return "Boolean";
			case "function":
				return "Function";
			
			case "object":
				if (value.__class__) return value.__class__.__name__;
				else return "Object";
			
			default:
				return "Object";
		}
		;
	};
	
	flash.utils.getQualifiedSuperclassName = function (value)
	{
		return "Object";
	};
}
());