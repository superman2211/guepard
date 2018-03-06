/*class flash.net.URLRequestHeader*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.name/*String*/ = null;
	/*public*/
	d/*var*/.value/*String*/ = null;
	
	
	/*public*/
	d.URLRequestHeader = function (name/*String*/, value/*String*/)
	{
		this.name = name == undefined ? "" : name;
		this.value = value == undefined ? "" : value;
		
	};
	
	flash.addDescription("flash.net.URLRequestHeader", d, null, null, null);
	
}
());
