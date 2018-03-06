/*class flash.display.GraphicsPathCommand*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.GraphicsPathCommand = function ()
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.CIRCLE/*int*/ = 7;
		this.CUBIC_CURVE_TO/*int*/ = 6;
		this.CURVE_TO/*int*/ = 3;
		this.LINE_TO/*int*/ = 2;
		this.MOVE_TO/*int*/ = 1;
		this.NO_OP/*int*/ = 0;
		this.WIDE_LINE_TO/*int*/ = 5;
		this.WIDE_MOVE_TO/*int*/ = 4;
		
	};
	
	
	flash.addDescription("flash.display.GraphicsPathCommand", d, null, s, null);
	
}
());
