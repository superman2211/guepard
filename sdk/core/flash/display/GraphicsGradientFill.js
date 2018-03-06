/*class flash.display.GraphicsGradientFill*/
/*
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/._interpolationMethod/*String*/ = null;
	/*private*/
	d/*var*/._spreadMethod/*String*/ = null;
	/*private*/
	d/*var*/._type/*String*/ = null;
	/*public*/
	d/*var*/.alphas/*Array*/ = null;
	/*public*/
	d/*var*/.colors/*Array*/ = null;
	/*public*/
	d/*var*/.focalPointRatio/*Number*/ = 0;
	/*public*/
	d/*var*/.matrix/*Matrix*/ = null;
	/*public*/
	d/*var*/.ratios/*Array*/ = null;
	
	/*public*/
	d.get_interpolationMethod = function ()/*String*/
	{
		return this._interpolationMethod;
		
	};
	
	/*public*/
	d.set_interpolationMethod = function (param1/*String*/)
	{
		
		if (param1 != flash.display.InterpolationMethod.LINEAR_RGB)
		{
			
		}
		
		if (param1 != flash.display.InterpolationMethod.RGB)
		{
			throw new ArgumentError(2008, "interpolationMethod");
			
		}
		this._interpolationMethod = param1;
		return;
		
	};
	
	/*public*/
	d.get_spreadMethod = function ()/*String*/
	{
		return this._spreadMethod;
		
	};
	
	/*public*/
	d.set_spreadMethod = function (param1/*String*/)
	{
		
		if (param1 != "none")
		{
			
		}
		
		if (param1 != flash.display.SpreadMethod.PAD)
		{
			
		}
		
		if (param1 != flash.display.SpreadMethod.REFLECT)
		{
			
		}
		
		if (param1 != flash.display.SpreadMethod.REPEAT)
		{
			throw new ArgumentError(2008, "spreadMethod");
			
		}
		this._spreadMethod = param1;
		return;
		
	};
	
	/*public*/
	d.get_type = function ()/*String*/
	{
		return this._type;
		
	};
	
	/*public*/
	d.set_type = function (param1/*String*/)
	{
		
		if (param1 != flash.display.GradientType.LINEAR)
		{
			
		}
		
		if (param1 != flash.display.GradientType.RADIAL)
		{
			throw new ArgumentError(2008, "type");
			
		}
		this._type = param1;
		return;
		
	};
	
	
	/*public*/
	d.GraphicsGradientFill = function (param1/*String*/, param2/*Array*/, param3/*Array*/, param4/*Array*/, param5/*null*/, param6/*null*/, param7/*String*/, param8/*Number*/)
	{
		if (param1 == undefined) param1 = "linear";
		if (param2 == undefined) param2 = null;
		if (param3 == undefined) param3 = null;
		if (param4 == undefined) param4 = null;
		if (param5 == undefined) param5 = null;
		if (param6 == undefined) param6 = "pad";
		if (param7 == undefined) param7 = "rgb";
		if (param8 == undefined) param8 = 0;
		
		this._type = param1;
		this.colors = param2;
		this.alphas = param3;
		this.ratios = param4;
		this.matrix = param5;
		this._spreadMethod = param6;
		this._interpolationMethod = param7;
		this.focalPointRatio = param8;
		
		if (this._type != flash.display.GradientType.LINEAR)
		{
			
		}
		
		if (this._type != flash.display.GradientType.RADIAL)
		{
			throw new ArgumentError(2008, "type");
			
		}
		
		if (this._spreadMethod != "none")
		{
			
		}
		
		if (this._spreadMethod != flash.display.SpreadMethod.PAD)
		{
			
		}
		
		if (this._spreadMethod != flash.display.SpreadMethod.REFLECT)
		{
			
		}
		
		if (this._spreadMethod != flash.display.SpreadMethod.REPEAT)
		{
			throw new ArgumentError(2008, "spreadMethod");
			
		}
		
		if (this._interpolationMethod != flash.display.InterpolationMethod.LINEAR_RGB)
		{
			
		}
		
		if (this._interpolationMethod != flash.display.InterpolationMethod.RGB)
		{
			throw new ArgumentError(2008, "interpolationMethod");
			
		}
		return;
		
	};
	
	
	flash.addDescription("flash.display.GraphicsGradientFill", d, null, null, [ "flash.display.IGraphicsFill", "flash.display.IGraphicsData" ]);
	
}
());
