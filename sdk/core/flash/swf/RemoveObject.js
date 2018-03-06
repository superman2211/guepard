(function ()
{
	"use strict";
	
	var d = {};
	//var base = flash.swf.Tag;
	
	d.id = null;
	d.depth = -1;
	
	d.RemoveObject = function ()
	{
		this.Tag_constructor();
		
		// this.type = flash.swf.Tag.REMOVE_OBJECT;
	}
	
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var attributes = node.get_attributes();
		
		if (attributes.depth) this.depth = Number(attributes.depth);
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.RemoveObject", d, "flash.swf.Tag", s, null);
	
}
());