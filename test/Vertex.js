/*class  com.guepard.tests.Vertex*/
/*
import flash.utils.setTimeout;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/d/*var*/.x/*Number*/ = 0;
	/*public*/d/*var*/.y/*Number*/ = 0;
	/*public*/d/*var*/.z/*Number*/ = 0;
	
	/*public*/d.get_example = function ()/*Number*/
	{
		return this.x + this.y + this.z;
		
	};
	
	/*public*/d.set_example = function (value/*Number*/)/*void*/
	{
		this.x = this.y = this.z = value / 3;
		
	};
	
	/*public*/d.get_length = function ()/*Number*/
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		
	};
	
	/*public*/d.set_length = function (value/*Number*/)/*void*/
	{
		var l/*Number*/ = 0;
		
		l = this.get_length();
		if (l != 0)
		{
			l = value / l;
			this.x *= l;
			this.y *= l;
			this.z *= l
		}
		
		
	};
	
	
	/*public*/d.Vertex = function (x/*Number*/, y/*Number*/, z/*Number*/)
	{
		
		if (x == undefined) x = 0;
		if (y == undefined) y = 0;
		if (z == undefined) z = 0;
		
		this.x = x;
		this.y = y;
		this.z = z;
		flash.utils.setTimeout(flash.bindFunction(function ()/*void*/
		{
			this.x = 10;
			
		}
		, this), 1000);
		
	};
	
	/*public*/d.add = function (vertex/*com.guepard.tests.Vertex*/)/*void*/
	{
		this.x += vertex.x;
		this.y += vertex.y;
		this.z += vertex.z;
		
	};
	
	/*public*/d.subtract = function (vertex/*com.guepard.tests.Vertex*/)/*void*/
	{
		this.x -= vertex.x;
		this.y -= vertex.y;
		this.z -= vertex.z;
		
	};
	
	/*public*/d.test = function ()/*void*/
	{
		var v1/*com.guepard.tests.Vertex*/ = null;
		var v2/*com.guepard.tests.Vertex*/ = null;
		var d/*Number*/ = 0;
		
		v1 = new com.guepard.tests.Vertex(1, 2, 3);
		v2 = new com.guepard.tests.Vertex(4, 5, 6);
		d = com.guepard.tests.Vertex.distance(v1, v2);
		
	};
	
	
	var s = {};
	
	
	/*public*/s.distance = function (vertex0/*com.guepard.tests.Vertex*/, vertex1/*com.guepard.tests.Vertex*/)/*Number*/
	{
		var dx/*Number*/ = 0;
		var dy/*Number*/ = 0;
		var dz/*Number*/ = 0;
		
		dx = vertex0.x - vertex1.x;
		dy = vertex0.y - vertex1.y;
		dz = vertex0.z - vertex1.z;
		return Math.sqrt(dx * dx + dy * dy + dz * dz);
		
	};
	
	
	
	flash.addDescription("com.guepard.tests.Vertex", d, null, s, ["com.guepard.tests.IExample"], null);
	
}
());
