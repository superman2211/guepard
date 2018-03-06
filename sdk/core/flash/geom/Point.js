/// <reference path="../flash.js"/>
/// <reference path="Rectangle.js"/>

/*class flash.geom.Point*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.x/*Number*/ = 0;
	/*public*/
	d/*var*/.y/*Number*/ = 0;
	
	/*public*/
	d.get_length = function ()/*Number*/
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
		
	};
	
	
	/*public*/
	d.Point = function (x/*Number*/, y/*Number*/)
	{
		this.x = x == undefined ? 0 : x;
		this.y = y == undefined ? 0 : y;
		
	};
	
	/*public*/
	d.add = function (point/*Point*/)/*Point*/
	{
		return new flash.geom.Point(this.x + point.x, this.y + point.y);
		
	};
	
	/*public*/
	d.clone = function ()/*Point*/
	{
		return new flash.geom.Point(this.x, this.y);
		
	};
	
	/*public*/
	d.equals = function (point/*Point*/)/*Boolean*/
	{
		return this.x == point.x && this.y == point.y;
		
	};
	
	/*public*/
	d.normalize = function (thickness/*Number*/)/*void*/
	{
		
		var l/*Number*/ = this.get_length();
		
		if (l > 0)
		{
			l = thickness / l;
			this.x *= l;
			this.y *= l;
			
		}
		
	};
	
	/*public*/
	d.offset = function (dx/*Number*/, dy/*Number*/)/*void*/
	{
		this.x += dx;
		this.y += dy;
		
	};
	
	/*public*/
	d.subtract = function (point/*Point*/)/*Point*/
	{
		return new flash.geom.Point(this.x - point.x, this.y - point.y);
		
	};
	
	/*public*/
	d.toString = function ()/*String*/
	{
		return "(x=" + this.x + ", y=" + this.y + ")";
		
	};
	
	
	var s = {};
	
	
	/*public*/
	s.distance = function (point1/*Point*/, point2/*Point*/)/*Number*/
	{
		var dx = point1.x - point2.x;
		var dy = point1.y - point2.y;
		
		return Math.sqrt(dx * dx + dy * dy);
	};
	
	/*public*/
	s.interpolate = function (point1/*Point*/, point2/*Point*/, value/*Number*/)/*Point*/
	{
		return new flash.geom.Point(
			point2.x + value * (point1.x - point2.x),
			point2.y + value * (point1.y - point2.y)
		);
		
	};
	
	/*public*/
	s.polar = function (length/*Number*/, angle/*Number*/)/*Point*/
	{
		return new flash.geom.Point(length * Math.cos(angle), length * Math.sin(angle));
	};
	
	flash.addDescription("flash.geom.Point", d, null, s, null);
	
}
());

