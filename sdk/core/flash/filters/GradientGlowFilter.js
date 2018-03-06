/*class flash.filters.GradientGlowFilter*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_alphas = function ()/*Array*/
	{
		
	};
	
	/*public*/
	d.set_alphas = function (value/*Array*/)/*void*/
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
	d.get_colors = function ()/*Array*/
	{
		
	};
	
	/*public*/
	d.set_colors = function (value/*Array*/)/*void*/
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
	d.get_ratios = function ()/*Array*/
	{
		
	};
	
	/*public*/
	d.set_ratios = function (value/*Array*/)/*void*/
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
	d.GradientGlowFilter = function (distance/*Number*/, angle/*Number*/, colors/*Array*/, alphas/*Array*/, ratios/*Array*/, blurX/*Number*/, blurY/*Number*/, strength/*Number*/, quality/*int*/, type/*String*/, knockout/*Boolean*/)
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
	/*public*/
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.GradientGlowFilter(this.get_distance(), this.get_angle(), this.get_colors(), this.get_alphas(), this.get_ratios(), this.get_blurX(), this.get_blurY(), this.get_strength(), this.get_quality(), this.get_type(), this.get_knockout());
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.GradientGlowFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
