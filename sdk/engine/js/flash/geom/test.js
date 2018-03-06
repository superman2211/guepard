(function ()
{
	"use strict";
	
	flash.createPackage("flash.geom");
	
	flash.geom.test = function ()
	{
		flash.trace("flash.geom.test");
		
		var point = new flash.geom.Point();
		var rectangle = new flash.geom.Rectangle();
		var matrix = new flash.geom.Matrix();
		var color = new flash.geom.ColorTransform();
		
		flash.trace(point.toString());
		flash.trace(rectangle);
		flash.trace(matrix);
		flash.trace(color);
		flash.trace();
	};
}
());