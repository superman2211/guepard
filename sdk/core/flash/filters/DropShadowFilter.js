/*class flash.filters.DropShadowFilter*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_alpha = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_alpha = function (value/*Number*/)/*void*/
	{
		
	};
	
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
	d.get_color = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.set_color = function (value/*uint*/)/*void*/
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
	d.get_hideObject = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_hideObject = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_inner = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_inner = function (value/*Boolean*/)/*void*/
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
	d.get_strength = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_strength = function (value/*Number*/)/*void*/
	{
		
	};
	
	
	/*public*/
	d.DropShadowFilter = function (distance/*Number*/, angle/*Number*/, color/*uint*/, alpha/*Number*/, blurX/*Number*/, blurY/*Number*/, strength/*Number*/, quality/*int*/, inner/*Boolean*/, knockout/*Boolean*/, hideObject/*Boolean*/)
	{
		this.BitmapFilter_constructor();
		if (distance == undefined) distance = 4;
		if (angle == undefined) angle = 45;
		if (color == undefined) color = 0;
		color = /*uint*/Math.floor(color);
		if (alpha == undefined) alpha = 1;
		if (blurX == undefined) blurX = 4;
		if (blurY == undefined) blurY = 4;
		if (strength == undefined) strength = 1;
		if (quality == undefined) quality = 1;
		quality = /*int*/Math.floor(quality);
		if (inner == undefined) inner = false;
		if (knockout == undefined) knockout = false;
		if (hideObject == undefined) hideObject = false;
		
		this.set_distance(distance);
		this.set_angle(angle);
		this.set_color(color);
		this.set_alpha(alpha);
		this.set_blurX(blurX);
		this.set_blurY(blurY);
		this.set_quality(quality);
		this.set_strength(strength);
		this.set_inner(inner);
		this.set_knockout(knockout);
		this.set_hideObject(hideObject);
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.DropShadowFilter(this.get_distance(), this.get_angle(), this.get_color(), this.get_alpha(), this.get_blurX(), this.get_blurY(), this.get_strength(), this.get_quality(), this.get_inner(), this.get_knockout(), this.get_hideObject());
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.DropShadowFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
