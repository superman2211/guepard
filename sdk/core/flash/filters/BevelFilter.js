/*class flash.filters.BevelFilter*/
(function ()
{
	"use strict";
	
	//var base = flash.filters.BitmapFilter;
	
	var d = {};
	
	
	/*public*/
	d.get_angle = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_angle = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_blurX = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_blurX = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_blurY = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_blurY = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_distance = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_distance = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_highlightAlpha = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_highlightAlpha = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_highlightColor = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.set_highlightColor = function (value/*uint*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_knockout = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_knockout = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_quality = function ()/*int*/
	{
		
	};
	
	/*public*/
	d.set_quality = function (value/*int*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_shadowAlpha = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_shadowAlpha = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_shadowColor = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.set_shadowColor = function (value/*uint*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_strength = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_strength = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_type = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.set_type = function (value/*String*/)/*void*/
	{
		
	};
	
	
	/*public*/
	d.BevelFilter = function (distance/*Number*/, angle/*Number*/, highlightColor/*uint*/, highlightAlpha/*Number*/, shadowColor/*uint*/, shadowAlpha/*Number*/, blurX/*Number*/, blurY/*Number*/, strength/*Number*/, quality/*int*/, type/*String*/, knockout/*Boolean*/)
	{
		this.BitmapFilter_constructor();
		if (distance == undefined) distance = 4;
		if (angle == undefined) angle = 45;
		if (highlightColor == undefined) highlightColor = 16777215;
		highlightColor = /*uint*/Math.floor(highlightColor);
		if (highlightAlpha == undefined) highlightAlpha = 1;
		if (shadowColor == undefined) shadowColor = 0;
		shadowColor = /*uint*/Math.floor(shadowColor);
		if (shadowAlpha == undefined) shadowAlpha = 1;
		if (blurX == undefined) blurX = 4;
		if (blurY == undefined) blurY = 4;
		if (strength == undefined) strength = 1;
		if (quality == undefined) quality = 1;
		quality = /*int*/Math.floor(quality);
		if (type == undefined) type = "inner";
		if (knockout == undefined) knockout = false;
		
		this.set_distance(distance);
		this.set_angle(angle);
		this.set_highlightColor(highlightColor);
		this.set_highlightAlpha(highlightAlpha);
		this.set_shadowColor(shadowColor);
		this.set_shadowAlpha(shadowAlpha);
		this.set_blurX(blurX);
		this.set_blurY(blurY);
		this.set_quality(quality);
		this.set_strength(strength);
		this.set_type(type);
		this.set_knockout(knockout);
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.BevelFilter(this.get_distance(), this.get_angle(), this.get_highlightColor(), this.get_highlightAlpha(), this.get_shadowColor(), this.get_shadowAlpha(), this.get_blurX(), this.get_blurY(), this.get_strength(), this.get_quality(), this.get_type(), this.get_knockout());
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.BevelFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
