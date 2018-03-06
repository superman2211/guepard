/*class flash.filters.ConvolutionFilter*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.get_alpha = function ()/*Number*/
	{
		
	};
	
	d.set_alpha = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_bias = function ()/*Number*/
	{
		
	};
	
	d.set_bias = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_clamp = function ()/*Boolean*/
	{
		
	};
	
	d.set_clamp = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	d.get_color = function ()/*uint*/
	{
		
	};
	
	d.set_color = function (value/*uint*/)/*void*/
	{
		
	};
	
	d.get_divisor = function ()/*Number*/
	{
		
	};
	
	d.set_divisor = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_matrix = function ()/*Array*/
	{
		
	};
	
	d.set_matrix = function (value/*Array*/)/*void*/
	{
		
	};
	
	d.get_matrixX = function ()/*Number*/
	{
		
	};
	
	d.set_matrixX = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_matrixY = function ()/*Number*/
	{
		
	};
	
	d.set_matrixY = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.get_preserveAlpha = function ()/*Boolean*/
	{
		
	};
	
	d.set_preserveAlpha = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	
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
	d.clone = function ()/*BitmapFilter*/
	{
		return new flash.filters.ConvolutionFilter(this.get_matrixX(), this.get_matrixY(), this.get_matrix(), this.get_divisor(), this.get_bias(), this.get_preserveAlpha(), this.get_clamp(), this.get_color(), this.get_alpha());
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.BitmapFilter_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.filters.ConvolutionFilter", d, "flash.filters.BitmapFilter", s, null);
	
}
());
