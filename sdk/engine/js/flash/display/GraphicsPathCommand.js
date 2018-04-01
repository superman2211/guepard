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
		this.NO_OP/*int*/ = 0;
		this.MOVE_TO/*int*/ = 1;
		this.LINE_TO/*int*/ = 2;
		this.CURVE_TO/*int*/ = 3;
		this.WIDE_MOVE_TO/*int*/ = 4;
		this.WIDE_LINE_TO/*int*/ = 5;
		this.CUBIC_CURVE_TO/*int*/ = 6;
	};
	
	
	flash.addDescription("flash.display.GraphicsPathCommand", d, null, s, null);
	
}
());
