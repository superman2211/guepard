(function ()
{
	"use strict";
	
	var d = {};
	
	d.baseClass = null;
	
	d.Tag = function ()
	{
		
	};
	
	d.fromXML = function (node)
	{
		var attributes = node.get_attributes();
		
		if (attributes.id)
		{
			this.id = flash.swf.Tag._baseId + attributes.id;
		}
	};
	
	d.parseRectangle = function (node)
	{
		var rectangle = new flash.geom.Rectangle();
		
		var attributes = node.get_attributes();
		
		if (attributes.x) rectangle.x = Number(attributes.x);
		if (attributes.y) rectangle.y = Number(attributes.y);
		if (attributes.width) rectangle.width = Number(attributes.width);
		if (attributes.height) rectangle.height = Number(attributes.height);
		
		return rectangle;
	};
	
	d.parseMatrix = function (node)
	{
		var matrix = new flash.geom.Matrix();
		
		var attributes = node.get_attributes();
		
		if (attributes.a) matrix.a = Number(attributes.a);
		if (attributes.b) matrix.b = Number(attributes.b);
		if (attributes.c) matrix.c = Number(attributes.c);
		if (attributes.d) matrix.d = Number(attributes.d);
		if (attributes.tx) matrix.tx = Number(attributes.tx);
		if (attributes.ty) matrix.ty = Number(attributes.ty);
		
		return matrix;
	};
	
	d.parseColorTransform = function (node)
	{
		var colorTransform = new flash.geom.ColorTransform();
		
		var attributes = node.get_attributes();
		
		if (attributes.redMultiplier) colorTransform.redMultiplier = Number(attributes.redMultiplier);
		if (attributes.greenMultiplier) colorTransform.greenMultiplier = Number(attributes.greenMultiplier);
		if (attributes.blueMultiplier) colorTransform.blueMultiplier = Number(attributes.blueMultiplier);
		if (attributes.alphaMultiplier) colorTransform.alphaMultiplier = Number(attributes.alphaMultiplier);
		
		if (attributes.redOffset) colorTransform.redOffset = Number(attributes.redOffset);
		if (attributes.greenOffset) colorTransform.greenOffset = Number(attributes.greenOffset);
		if (attributes.blueOffset) colorTransform.blueOffset = Number(attributes.blueOffset);
		if (attributes.alphaOffset) colorTransform.alphaOffset = Number(attributes.alphaOffset);
		
		
		return colorTransform;
	};
	
	d.createDisplayObject = function ()
	{
		return null;
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this._baseId = null;
	}
	
	flash.addDescription("flash.swf.Tag", d, null, s, null);
	
}
());

