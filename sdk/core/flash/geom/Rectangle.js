/// <reference path="../flash.js"/>
// <reference path="Point.js"/>

/*class flash.geom.Rectangle*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.height/*Number*/ = 0;
	/*public*/
	d/*var*/.width/*Number*/ = 0;
	/*public*/
	d/*var*/.x/*Number*/ = 0;
	/*public*/
	d/*var*/.y/*Number*/ = 0;
	
	/*public*/
	d.get_bottom = function ()/*Number*/
	{
		return this.y + this.height;
		
	};
	
	/*public*/
	d.set_bottom = function (value/*Number*/)/*void*/
	{
		this.height = value - this.y;
	};
	
	/*public*/
	d.get_bottomRight = function ()/*Point*/
	{
		return new flash.geom.Point(this.x + this.width, this.y + this.height);
	};
	
	/*public*/
	d.set_bottomRight = function (value/*Point*/)/*void*/
	{
		this.width = value.x - this.x;
		this.height = value.y - this.y;
	};
	
	/*public*/
	d.get_left = function ()/*Number*/
	{
		return this.x;
		
	};
	
	/*public*/
	d.set_left = function (value/*Number*/)/*void*/
	{
		this.width += this.x - value;
		this.x = value;
		
	};
	
	/*public*/
	d.get_right = function ()/*Number*/
	{
		return this.x + this.width;
		
	};
	
	/*public*/
	d.set_right = function (value/*Number*/)/*void*/
	{
		this.width = value - this.x;
		
	};
	
	/*public*/
	d.get_size = function ()/*Point*/
	{
		return new flash.geom.Point(this.width, this.height);
		
	};
	
	/*public*/
	d.set_size = function (value/*Point*/)/*void*/
	{
		this.width = value.x;
		this.height = value.y;
		
	};
	
	/*public*/
	d.get_top = function ()/*Number*/
	{
		return this.y;
		
	};
	
	/*public*/
	d.set_top = function (value/*Number*/)/*void*/
	{
		this.height += this.y - value;
		this.y = value;
		
	};
	
	/*public*/
	d.get_topLeft = function ()/*Point*/
	{
		return new flash.geom.Point(this.x, this.y);
		
	};
	
	/*public*/
	d.set_topLeft = function (value/*Point*/)/*void*/
	{
		this.width += this.x - value.x;
		this.height += this.y - value.y;
		this.x = value.x;
		this.y = value.y;
		
	};
	
	
	/*public*/
	d.Rectangle = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/)
	{
		this.x = x == undefined ? 0 : x;
		this.y = y == undefined ? 0 : y;
		this.width = width == undefined ? 0 : width;
		this.height = height == undefined ? 0 : height;
		
	};
	
	/*public*/
	d.clone = function ()/*Rectangle*/
	{
		return new flash.geom.Rectangle(this.x, this.y, this.width, this.height);
		
	};
	
	/*public*/
	d.contains = function (x/*Number*/, y/*Number*/)/*Boolean*/
	{
		return x >= this.x && y >= this.y && x <= this.x + this.width && y <= this.y + this.height;
		
	};
	
	/*public*/
	d.containsPoint = function (point/*Point*/)/*Boolean*/
	{
		return point.x >= this.x &&
			point.y >= this.y &&
			point.x <= this.x + this.width &&
			point.y <= this.y + this.height;
		
	};
	
	/*public*/
	d.containsRect = function (rect/*Rectangle*/)/*Boolean*/
	{
		return rect.x >= this.x &&
			rect.y >= this.y &&
			rect.x + rect.width <= this.x + this.width &&
			rect.y + rect.height <= this.y + this.height;
		
	};
	
	/*public*/
	d.equals = function (rect/*Rectangle*/)/*Boolean*/
	{
		return this.x == rect.x && this.y == rect.y && this.width == rect.width && this.height == rect.height;
		
	};
	
	/*public*/
	d.inflate = function (dx/*Number*/, dy/*Number*/)/*void*/
	{
		this.x -= dx;
		this.y -= dy;
		this.width += dx * 2;
		this.height += dy * 2;
		
	};
	
	/*public*/
	d.inflatePoint = function (point/*Point*/)/*void*/
	{
		this.x -= point.x;
		this.y -= point.y;
		this.width += point.x * 2;
		this.height += point.y * 2;
		
	};
	
	/*public*/
	d.intersection = function (rect/*Rectangle*/)/*Rectangle*/
	{
		
		var result/*Rectangle*/ = new flash.geom.Rectangle();
		
		if (this.isEmpty() || rect.isEmpty()) return result;
		
		result.x = Math.max(this.x, rect.x);
		result.y = Math.max(this.y, rect.y);
		result.width = Math.min(this.x + this.width, rect.x + rect.width) - result.x;
		result.height = Math.min(this.y + this.height, rect.y + rect.height) - result.y;
		
		if (result.height <= 0 || result.width <= 0)
		{
			result.setEmpty();
		}
		
		return result;
		
	};
	
	/*public*/
	d.intersects = function (rect/*Rectangle*/)/*Boolean*/
	{
		if (this.isEmpty() || rect.isEmpty()) return false;
		
		var x/*Number*/ = Math.max(this.x, rect.x);
		var width/*Number*/ = Math.min(this.x + this.width, rect.x + rect.width) - x;
		
		if (width <= 0) return false;
		
		var y/*Number*/ = Math.max(this.y, rect.y);
		var height/*Number*/ = Math.min(this.y + this.height, rect.y + rect.height) - y;
		
		if (height <= 0) return false;
		
		return true;
		
	};
	
	/*public*/
	d.isEmpty = function ()/*Boolean*/
	{
		return this.height <= 0 || this.width <= 0;
		
	};
	
	/*public*/
	d.offset = function (dx/*Number*/, dy/*Number*/)/*void*/
	{
		this.x += dx;
		this.y += dy;
		
	};
	
	/*public*/
	d.offsetPoint = function (point/*Point*/)/*void*/
	{
		this.x += point.x;
		this.y += point.y;
		
	};
	
	/*public*/
	d.setEmpty = function ()/*void*/
	{
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		
	};
	
	/*public*/
	d.toString = function ()/*String*/
	{
		return "(x=" + this.x + ", y=" + this.y + ", w=" + this.width + ", h=" + this.height + ")";
		
	};
	
	/*public*/
	d.union = function (rect/*Rectangle*/)/*Rectangle*/
	{
		if (this.isEmpty()) return rect.clone();
		
		if (rect.isEmpty()) return this.clone();
		
		var result/*Rectangle*/ = new flash.geom.Rectangle();
		result.x = Math.min(this.x, rect.x);
		result.y = Math.min(this.y, rect.y);
		result.width = Math.max(this.x + this.width, rect.x + rect.width) - result.x;
		result.height = Math.max(this.y + this.height, rect.y + rect.height) - result.y;
		
		if (result.height <= 0 || result.width <= 0)
		{
			result.setEmpty();
		}
		
		return result;
		
	};
	
	d.add = function (test)
	{
		return test;
	}
	
	flash.addDescription("flash.geom.Rectangle", d, null, null, null);
	
}
());
