/*class flash.filters.ConvolutionFilter*/
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
	d.get_bias = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_bias = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_clamp = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_clamp = function (value/*Boolean*/)/*void*/
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
	d.get_divisor = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_divisor = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_matrix = function ()/*Array*/
	{
		
	};
	
	/*public*/
	d.set_matrix = function (value/*Array*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_matrixX = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_matrixX = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_matrixY = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_matrixY = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_preserveAlpha = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_preserveAlpha = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	
	/*public*/
	d.ConvolutionFilter = function (matrixX/*Number*/, matrixY/*Number*/, matrix/*Array*/, divisor/*Number*/, bias/*Number*/, preserveAlpha/*Boolean*/, clamp/*Boolean*/, color/*uint*/, alpha/*Number*/)
	{
		this.BitmapFilter_constructor();
		if (matrixX == undefined) matrixX = 0;
		if (matrixY == undefined) matrixY = 0;
		if (matrix == undefined) matrix = null;
		if (divisor == undefined) divisor = 1;
		if (bias == undefined) bias = 0;
		if (preserveAlpha == undefined) preserveAlpha = true;
		if (clamp == undefined) clamp = true;
		if (color == undefined) color = 0;
		color = /*uint*/Math.floor(color);
		if (alpha == undefined) alpha = 0;
		
		this.set_matrixX(matrixX);
		this.set_matrixY(matrixY);
		
		if (matrix != null)
		{
			this.set_matrix(matrix);
			
		}
		this.set_divisor(divisor);
		this.set_bias(bias);
		this.set_preserveAlpha(preserveAlpha);
		this.set_clamp(clamp);
		this.set_color(color);
		this.set_alpha(alpha);
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.ConvolutionFilter(this.get_matrixX(), this.get_matrixY(), this.get_matrix(), this.get_divisor(), this.get_bias(), this.get_preserveAlpha(), this.get_clamp(), this.get_color(), this.get_alpha());
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.ConvolutionFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
