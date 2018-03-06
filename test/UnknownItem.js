/*class  com.guepard.tests.UnknownItem*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/d/*var*/.x/*int*/ = 0;
	/*public*/d/*var*/.y/*int*/ = 0;
	/*public*/d/*var*/.z/*int*/ = 0;
	/*public*/d/*var*/.name/*String*/ = null;
	/*public*/d/*var*/.parameter/*Boolean*/ = false;
	
	/*public*/d.get_length = function ()/*Number*/
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
		
	};
	
	/*public*/d.get_unknown = function ()/*int*/
	{
		return null;
		
	};
	
	/*public*/d.set_unknown = function (value/*int*/)/*void*/
	{
		value = /*int*/flash.int(value);
		
		
	};
	
	
	/*public*/d.UnknownItem = function (x/*int*/, y/*int*/, z/*int*/, name/*String*/, parameter/*Boolean*/)
	{
		
		if (x == undefined) x = 0;
		x = /*int*/flash.int(x);
		if (y == undefined) y = 0;
		y = /*int*/flash.int(y);
		if (z == undefined) z = 0;
		z = /*int*/flash.int(z);
		if (name == undefined) name = "default";
		if (parameter == undefined) parameter = true;
		
		this.x = x;
		this.y = y;
		this.z = z;
		this.name = name;
		this.parameter = parameter;
		
	};
	
	/*public*/d.clone = function ()/*com.guepard.tests.UnknownItem*/
	{
		return new com.guepard.tests.UnknownItem(this.x, this.y, this.z);
		
	};
	
	
	
	
	
	flash.addDescription("com.guepard.tests.UnknownItem", d, null, null, null, null);
	
}
());
