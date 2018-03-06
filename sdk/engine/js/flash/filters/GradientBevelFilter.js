/*class flash.filters.GradientBevelFilter*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.get_alphas = function ()/*Array*/
	{
		
	};
	
	d.set_alphas = function (value/*Array*/)/*void*/
	{
		
	};
	
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
	
	d.get_colors = function ()/*Array*/
	{
		
	};
	
	d.set_colors = function (value/*Array*/)/*void*/
	{
		
	};
	
	d.get_distance = function ()/*Number*/
	{
		
	};
	
	d.set_distance = function (value/*Number*/)/*void*/
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
	
	d.get_ratios = function ()/*Array*/
	{
		
	};
	
	d.set_ratios = function (value/*Array*/)/*void*/
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
	
	
	d.GradientBevelFilter = function (distance/*Number*/, angle/*Number*/, colors/*Array*/, alphas/*Array*/, ratios/*Array*/, blurX/*Number*/, blurY/*Number*/, strength/*Number*/, quality/*int*/, type/*String*/, knockout/*Boolean*/)
	{
		this.BitmapFilter_constructor();
		if (distance == undefined) distance = 4;
		if (angle == undefined) angle = 45;
		if (colors == undefined) colors = null;
		if (alphas == undefined) alphas = null;
		if (ratios == undefined) ratios = null;
		if (blurX == undefined) blurX = 4;
		if (blurY == undefined) blurY = 4;
		if (strength == undefined) strength = 1;
		if (quality == undefined) quality = 1;
		quality = /*int*/Math.floor(quality);
		if (type == undefined) type = "inner";
		if (knockout == undefined) knockout = false;
		
		this.set_distance(distance);
		this.set_angle(angle);
		
		if (colors != null)
		{
			this.set_colors(colors);
			
		}
		
		if (alphas != null)
		{
			this.set_alphas(alphas);
			
		}
		
		if (ratios != null)
		{
			this.set_ratios(ratios);
			
		}
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
		return new flash.filters.GradientBevelFilter(this.get_distance(), this.get_angle(), this.get_colors(), this.get_alphas(), this.get_ratios(), this.get_blurX(), this.get_blurY(), this.get_strength(), this.get_quality(), this.get_type(), this.get_knockout());
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.GradientBevelFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
