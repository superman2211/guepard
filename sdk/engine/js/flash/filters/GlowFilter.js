/*class flash.filters.GlowFilter*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._alpha = 0;
	d._blurX = 0;
	d._blurY = 0;
	d._color = 0;
	d._inner = false;
	d._knockout = false;
	d._quality = 1;
	d._strength = 1;
	
	d.get_alpha = function ()/*Number*/
	{
		return this._alpha;
	};
	
	d.set_alpha = function (value/*Number*/)/*void*/
	{
		this._alpha = value;
	};
	
	d.get_blurX = function ()/*Number*/
	{
		return this._blurX;
	};
	
	d.set_blurX = function (value/*Number*/)/*void*/
	{
		this._blurX = value;
	};
	
	d.get_blurY = function ()/*Number*/
	{
		return this._blurY;
	};
	
	d.set_blurY = function (value/*Number*/)/*void*/
	{
		this._blurY = value;
	};
	
	d.get_color = function ()/*uint*/
	{
		return this._color;
	};
	
	d.set_color = function (value/*uint*/)/*void*/
	{
		this._color = value;
	};
	
	d.get_inner = function ()/*Boolean*/
	{
		return this._inner;
	};
	
	d.set_inner = function (value/*Boolean*/)/*void*/
	{
		this._inner = value;
	};
	
	d.get_knockout = function ()/*Boolean*/
	{
		return this._knockout;
	};
	
	d.set_knockout = function (value/*Boolean*/)/*void*/
	{
		this._knockout = value;
	};
	
	d.get_quality = function ()/*int*/
	{
		return this._quality;
	};
	
	d.set_quality = function (value/*int*/)/*void*/
	{
		this._quality = value;
	};
	
	d.get_strength = function ()/*Number*/
	{
		return this._strength;
	};
	
	d.set_strength = function (value/*Number*/)/*void*/
	{
		this._strength = value;
	};
	
	
	d.GlowFilter = function (color/*uint*/, alpha/*Number*/, blurX/*Number*/, blurY/*Number*/, strength/*Number*/, quality/*int*/, inner/*Boolean*/, knockout/*Boolean*/)
	{
		this.BitmapFilter_constructor();
		
		if (color == undefined) color = 16711680;
		color = /*uint*/Math.floor(color);
		
		if (alpha == undefined) alpha = 1;
		if (blurX == undefined) blurX = 6;
		if (blurY == undefined) blurY = 6;
		if (strength == undefined) strength = 2;
		
		if (quality == undefined) quality = 1;
		quality = /*int*/Math.floor(quality);
		
		if (inner == undefined) inner = false;
		if (knockout == undefined) knockout = false;
		
		this._color = color;
		this._alpha = alpha;
		this._blurX = blurX;
		this._blurY = blurY;
		this._quality = quality;
		this._strength = strength;
		this._inner = inner;
		this._knockout = knockout;
		
	};
	
	/*override*/
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.GlowFilter(
			this._color,
			this._alpha,
			this._blurX,
			this._blurY,
			this._strength,
			this._quality,
			this._inner,
			this._knockout
		);
	};
	
	d._toValue = function ()/*String*/
	{
		return this._color + "_" + this._alpha + "_" + this._blurX + "_" + this._blurY + "_" + this._strength + "_" + this._quality + "_" + this._inner + "_" + this._knockout;
	};
	
	/*override*/
	d._apply = function (d/*Array*/, w/*Number*/, h/*Number*/)/*void*/
	{
		// if (this._blurX < 2 || this._blurY < 2) return;
		//
		// var r = (this._color >> 16) & 0xff;
		// var g = (this._color >> 8) & 0xff;
		// var b = this._color & 0xff;
		//
		// this._fastShadow(d, w, h, this._blurX / 2, this._quality, r, g, b, this._alpha * this._strength);
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.GlowFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
