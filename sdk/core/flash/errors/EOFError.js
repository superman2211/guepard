/*class flash.errors.EOFError*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.EOFError = function (message/*String*/, id/*int*/)
	{
		if (message == undefined) message = "";
		if (id == undefined) id = 0;
		id = /*int*/Math.floor(id);
		
		this.IOError_constructor(message, id);
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.IOError_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.errors.EOFError", d, "flash.errors.IOError", s, null);
	
}
());
