/*class flash.errors.IllegalOperationError*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.IllegalOperationError = function (message/*String*/, id/*int*/)
	{
		if (message == undefined) message = "";
		if (id == undefined) id = 0;
		id = /*int*/Math.floor(id);
		
		this.Error_constructor(message, id);
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Error_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.errors.IllegalOperationError", d, "Error", s, null);
	
}
());
