(function ()
{
	"use strict";
	
	var d = {};
	
	d.name = null;
	
	d.FrameLabel = function ()
	{
		this.Tag_constructor();
	}
	
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		this.name = node.get_attributes().name;
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.FrameLabel", d, "flash.swf.Tag", s, null);
	
}
());