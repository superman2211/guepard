(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.data = null;
	
	d.DefineBinaryData = function ()
	{
		this.Tag_constructor();
		
		this.baseClass = flash.utils.ByteArray;
	}
	
	/*override*/
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var attributes = node.get_attributes();
		
		this.data = attributes.data;
	};
	
	/*override*/
	d.linkage = function (byteArray)
	{
		if (this.data)
		{
			byteArray._data = flash.decode64(this.data);
		}
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.DefineBinaryData", d, "flash.swf.Tag", s, null);
	
}
());