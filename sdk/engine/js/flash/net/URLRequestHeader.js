/*class flash.net.URLRequestHeader*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.name/*String*/ = null;
	d.value/*String*/ = null;
	
	
	d.URLRequestHeader = function (name/*String*/, value/*String*/)
	{
		this.name = name == undefined ? "" : name;
		this.value = value == undefined ? "" : value;
		
	};
	
	flash.addDescription("flash.net.URLRequestHeader", d, null, null, null);
	
}
());
