/*class flash.filters.DropShadowFilter*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._alpha = 0;
	d._angle = 0;
	d._blurX = 0;
	d._blurY = 0;
	d._color = 0;
	d._inner = false;
	d._knockout = false;
	d._hideObject = false;
	d._quality = 1;
	d._strength = 1;
	d._distance = 0;
	
	d.get_alpha = function ()/*Number*/
	{
		return this._alpha;
	};
	
	d.set_alpha = function (value/*Number*/)/*void*/
	{
		this._alpha = value;
	};
	
	d.get_angle = function ()/*Number*/
	{
		return this._angle;
	};
	
	d.set_angle = function (value/*Number*/)/*void*/
	{
		this._angle = value;
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
	
	d.get_distance = function ()/*Number*/
	{
		return this._distance;
	};
	
	d.set_distance = function (value/*Number*/)/*void*/
	{
		this._distance = value;
	};
	
	d.get_hideObject = function ()/*Boolean*/
	{
		return this._hideObject;
	};
	
	d.set_hideObject = function (value/*Boolean*/)/*void*/
	{
		this._hideObject = value;
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
		
		this._distance = distance;
		this._angle = angle;
		this._color = color;
		this._alpha = alpha;
		this._blurX = blurX;
		this._blurY = blurY;
		this._quality = quality;
		this._strength = strength;
		this._inner = inner;
		this._knockout = knockout;
		this._hideObject = hideObject;
	};
	
	/*override*/
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.DropShadowFilter(
			this._distance,
			this._angle,
			this._color,
			this._alpha,
			this._blurX,
			this._blurY,
			this._strength,
			this._quality,
			this._inner,
			this._knockout,
			this._hideObject
		);
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.DropShadowFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
