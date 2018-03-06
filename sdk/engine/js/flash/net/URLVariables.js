/*class flash.net.URLVariables*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.URLVariables = function (source/*String*/)
	{
		if (source)
		{
			this.decode(source);
		}
	};
	
	d.decode = function (source/*String*/)/*void*/
	{
		var list = source.split("&");
		
		for (var i = 0; i < list.length; i++)
		{
			var property = list[ i ].split("=");
			
			var name = property[ 0 ];
			var value = property.length > 1 ? property[ 1 ] : "";
			
			this[ name ] = value;
		}
	};
	
	d.toString = function ()/*String*/
	{
		var list = [];
		
		for (var name in this)
		{
			var value = this[ name ];
			var type = typeof value;
			
			if (type == "string" || type == "number" || type == "boolean")
			{
				list.push(name + "=" + encodeURIComponent(value));
			}
		}
		
		return list.join("&");
	};
	
	
	flash.addDescription("flash.net.URLVariables", d, null, null, null);
	
}
());
