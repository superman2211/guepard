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
	
	/*public*/
	d.get_alpha = function ()/*Number*/
	{
		return this._alpha;
	};
	
	/*public*/
	d.set_alpha = function (value/*Number*/)/*void*/
	{
		this._alpha = value;
	};
	
	/*public*/
	d.get_blurX = function ()/*Number*/
	{
		return this._blurX;
	};
	
	/*public*/
	d.set_blurX = function (value/*Number*/)/*void*/
	{
		this._blurX = value;
	};
	
	/*public*/
	d.get_blurY = function ()/*Number*/
	{
		return this._blurY;
	};
	
	/*public*/
	d.set_blurY = function (value/*Number*/)/*void*/
	{
		this._blurY = value;
	};
	
	/*public*/
	d.get_color = function ()/*uint*/
	{
		return this._color;
	};
	
	/*public*/
	d.set_color = function (value/*uint*/)/*void*/
	{
		this._color = value;
	};
	
	/*public*/
	d.get_inner = function ()/*Boolean*/
	{
		return this._inner;
	};
	
	/*public*/
	d.set_inner = function (value/*Boolean*/)/*void*/
	{
		this._inner = value;
	};
	
	/*public*/
	d.get_knockout = function ()/*Boolean*/
	{
		return this._knockout;
	};
	
	/*public*/
	d.set_knockout = function (value/*Boolean*/)/*void*/
	{
		this._knockout = value;
	};
	
	/*public*/
	d.get_quality = function ()/*int*/
	{
		return this._quality;
	};
	
	/*public*/
	d.set_quality = function (value/*int*/)/*void*/
	{
		this._quality = value;
	};
	
	/*public*/
	d.get_strength = function ()/*Number*/
	{
		return this._strength;
	};
	
	/*public*/
	d.set_strength = function (value/*Number*/)/*void*/
	{
		this._strength = value;
	};
	
	
	/*public*/
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
	/*public*/
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
	
	/*private*/
	d._toValue = function ()/*String*/
	{
		return this._color + "_" + this._alpha + "_" + this._blurX + "_" + this._blurY + "_" + this._strength + "_" + this._quality + "_" + this._inner + "_" + this._knockout;
	};
	
	/*override*/
	/*protected*/
	d._apply = function (d/*Array*/, w/*Number*/, h/*Number*/)/*void*/
	{
		if (this._blurX < 2 || this._blurY < 2) return;
		
		//var time = flash.utils.getTimer();
		
		/*var c = this._blurX * this._blurY;
		var v = 1 / c;

		var weights = [];

		while (c--) weights.push(v);

		var t = [];

		this._convolute(d, t, w, h, this._blurX, this._blurY, weights, false);//*/
		
		//var t = [];
		
		//var l = d.length;
		//while (l--) t[l] = d[l];
		
		var r = (this._color >> 16) & 0xff;
		var g = (this._color >> 8) & 0xff;
		var b = this._color & 0xff;
		
		this._fastShadow(d, w, h, this._blurX / 2, this._quality, r, g, b, this._alpha * this._strength);
		
		/*var r = (this._color >> 16) & 0xff;
		var g = (this._color >> 8) & 0xff;
		var b = this._color & 0xff;
		
		var l = d.length;

		var a1 = this._alpha * this._strength;
		var a2 = 0;
		var s1 = 0;
		var s2 = 0;
		
		while(l--)
		{
			a2 = d[l] / 256;

			s1 = t[l] * a1;
			s2 = d[l];
			d[l] = (s2 - s1) * a2 + s1;

			l--;

			s2 = d[l];
			d[l] = (s2 - b) * a2 + b;

			l--;

			s2 = d[l];
			d[l] = (s2 - g) * a2 + g;

			l--;

			s2 = d[l];
			d[l] = (s2 - r) * a2 + r;
		}//*/
		
		//flash.trace("GlowFilter._apply(" + this._quality + "):" + (flash.utils.getTimer() - time));
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.GlowFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
