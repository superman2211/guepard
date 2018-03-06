/*class flash.filters.BevelFilter*/
(function ()
{
	"use strict";
	
	//var base = flash.filters.BitmapFilter;
	
	var d = {};
	
	
	d.get_angle = function ()/*Number*/
	{
		
	};
	
	d.set_angle = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_blurX = function ()/*Number*/
	{
		
	};
	
	d.set_blurX = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_blurY = function ()/*Number*/
	{
		
	};
	
	d.set_blurY = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_distance = function ()/*Number*/
	{
		
	};
	
	d.set_distance = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_highlightAlpha = function ()/*Number*/
	{
		
	};
	
	d.set_highlightAlpha = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_highlightColor = function ()/*uint*/
	{
		
	};
	
	d.set_highlightColor = function (value/*uint*/)/*void*/
	{
		
	};
	
	d.get_knockout = function ()/*Boolean*/
	{
		
	};
	
	d.set_knockout = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	d.get_quality = function ()/*int*/
	{
		
	};
	
	d.set_quality = function (value/*int*/)/*void*/
	{
		
	};
	
	d.get_shadowAlpha = function ()/*Number*/
	{
		
	};
	
	d.set_shadowAlpha = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_shadowColor = function ()/*uint*/
	{
		
	};
	
	d.set_shadowColor = function (value/*uint*/)/*void*/
	{
		
	};
	
	d.get_strength = function ()/*Number*/
	{
		
	};
	
	d.set_strength = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_type = function ()/*String*/
	{
		
	};
	
	d.set_type = function (value/*String*/)/*void*/
	{
		
	};
	
	
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
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.BevelFilter(this.get_distance(), this.get_angle(), this.get_highlightColor(), this.get_highlightAlpha(), this.get_shadowColor(), this.get_shadowAlpha(), this.get_blurX(), this.get_blurY(), this.get_strength(), this.get_quality(), this.get_type(), this.get_knockout());
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.BevelFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
