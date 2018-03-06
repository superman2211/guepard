/*class flash.display.GraphicsPath*/
/*
import __AS3__.vec.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/._winding/*String*/ = null;
	/*public*/
	d/*var*/.commands/*Vector.<int>*/ = null;
	/*public*/
	d/*var*/.data/*Vector.<Number>*/ = null;
	
	/*public*/
	d.get_winding = function ()/*String*/
	{
		return this._winding;
		
	};
	
	/*public*/
	d.set_winding = function (param1/*String*/)
	{
		
		if (param1 != flash.display.GraphicsPathWinding.EVEN_ODD)
		{
			
		}
		
		if (param1 != flash.display.GraphicsPathWinding.NON_ZERO)
		{
			throw new ArgumentError(2008, "winding");
			
		}
		this._winding = param1;
		return this._winding;
		
	};
	
	
	/*public*/
	d.GraphicsPath = function (commands, data, winding)
	{
		this.commands = [];
		this.data = [];
		
		if (commands)
		{
			this.commands = commands;
		}
		
		if (data)
		{
			this.data = data;
		}
		
		
		if (winding)
		{
			this._winding = winding;
		}
		else
		{
			this._winding = flash.display.GraphicsPathWinding.EVEN_ODD;
		}
		
		
	};
	
	d.moveTo = function (x, y)
	{
		
		this.commands.push(flash.display.GraphicsPathCommand.MOVE_TO);
		this.data.push(x, y);
		
	}
	
	d.lineTo = function (x, y)
	{
		this.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this.data.push(x, y);
		
	}
	
	d.widelineTo = function (x, y)
	{
		this.commands.push(flash.display.GraphicsPathCommand.WIDE_LINE_TO);
		this.data.push(x, y, x, y);
		
	}
	
	d.widemoveTo = function (x, y)
	{
		
		this.commands.push(flash.display.GraphicsPathCommand.WIDE_MOVE_TO);
		this.data.push(x, y, x, y);
		
	}
	
	d.curveTo = function (controlX, controlY, anchorX, anchorY)
	{
		
		this.commands.push(flash.display.GraphicsPathCommand.CURVE_TO);
		this.data.push(controlX, controlY, anchorX, anchorY);
		
		
	}
	
	d.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY)
	{
		this.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
		this.data.push(controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
		
	}
	
	d.clone = function ()
	{
		return new flash.display.GraphicsPath(commands, data, winding);
	}
	
	
	flash.addDescription("flash.display.GraphicsPath", d, null, null, [ "flash.display.IGraphicsPath", "flash.display.IGraphicsData" ]);
	
}
());
