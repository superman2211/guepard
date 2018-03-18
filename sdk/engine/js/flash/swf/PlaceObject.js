(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.depth = -1;
	d.mask = -1
	d.matrix = null;
	d.colorTransform = null;
	d.filters = null;
	d.name = null;
	
	
	d.PlaceObject = function ()
	{
		this.Tag_constructor();
		
	}
	
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var attributes = node.get_attributes();
		
		if (attributes.depth) this.depth = Number(attributes.depth);
		if (attributes.name) this.name = String(attributes.name);
		if (attributes.mask) this.mask = Number(attributes.mask);
		
		var childNodes = node.get_childNodes();
		
		for (var i = 0; i < childNodes.length; i++)
		{
			var child = childNodes[ i ];
			
			switch (child.nodeName)
			{
				case "Matrix":
					this.matrix = this.parseMatrix(child);
					break;
				
				case "ColorTransform":
					this.colorTransform = this.parseColorTransform(child);
					break;
				
				case "BlurFilter":
					this._createFilters();
					this.filters.push(this.parseBlurFilter(child));
					break;
				
				case "GlowFilter":
					this._createFilters();
					this.filters.push(this.parseGlowFilter(child));
					break;
				
				case "DropShadowFilter":
					this._createFilters();
					this.filters.push(this.parseDropShadowFilter(child));
					break;
			}
		}
	};
	
	d._createFilters = function ()
	{
		if (!this.filters) this.filters = [];
	}
	
	d.parseBlurFilter = function (node)
	{
		var attributes = node.get_attributes();
		
		return new flash.filters.BlurFilter(
			Number(attributes.blurX),
			Number(attributes.blurY),
			Number(attributes.quality)
		);
	};
	
	d.parseGlowFilter = function (node)
	{
		var attributes = node.get_attributes();
		
		return new flash.filters.GlowFilter(
			Number(attributes.color),
			Number(attributes.alpha),
			Number(attributes.blurX),
			Number(attributes.blurY),
			Number(attributes.strength),
			Number(attributes.quality),
			attributes.inner == "true",
			attributes.knockout == "true"
		);
	};
	
	d.parseDropShadowFilter = function (node)
	{
		var attributes = node.get_attributes();
		
		return new flash.filters.DropShadowFilter(
			Number(attributes.distance),
			Number(attributes.angle),
			Number(attributes.color),
			Number(attributes.alpha),
			Number(attributes.blurX),
			Number(attributes.blurY),
			Number(attributes.strength),
			Number(attributes.quality),
			attributes.inner == "true",
			attributes.knockout == "true",
			attributes.hideObject == "true"
		);
	};
	
	d.initDefaults = function ()
	{
		if (!this.matrix)
		{
			this.matrix = new flash.geom.Matrix();
		}
		
		if (!this.colorTransform)
		{
			this.colorTransform = new flash.geom.ColorTransform();
		}
		
		if (!this.filters)
		{
			this.filters = [];
		}
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.PlaceObject", d, "flash.swf.Tag", s, null);
	
}
());