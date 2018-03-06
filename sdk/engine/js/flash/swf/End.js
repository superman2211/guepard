(function ()
{
	"use strict";
	
	var d = {};
	
	d.End = function ()
	{
		this.Tag_constructor();
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		
	}
	
	flash.addDescription("flash.swf.End", d, "flash.swf.Tag", s, null);
	
}
());