(function ()
{
	"use strict";
	
	var d = {};
	
	d.ShowFrame = function ()
	{
		this.Tag_constructor();
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		
	}
	
	flash.addDescription("flash.swf.ShowFrame", d, "flash.swf.Tag", s, null);
	
}
());