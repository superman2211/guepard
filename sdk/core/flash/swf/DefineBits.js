(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.atlas = null;
	
	d.DefineBits = function ()
	{
		this.Tag_constructor();
		
		this.baseClass = flash.display.Bitmap;
	}
	
	/*override*/
	d.linkage = function (bitmap)
	{
		if (!this.bitmap)
		{
			this.bitmap = flash.system.ApplicationDomain.get_currentDomain()._getImage(this.atlas);
		}
		
		bitmap.set_bitmapData(this.bitmap);
	};
	
	d.setImages = function (domain)
	{
		if (this.atlas)
		{
			domain._setImage(this.atlas, null);
		}
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.DefineBits", d, "flash.swf.Tag", s, null);
	
}
());