/*class flash.display.FrameLabel*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.frame/*int*/ = 0;
	d.name/*String*/ = null;
	
	
	d.FrameLabel = function (name/*String*/, frame/*int*/)
	{
		this.name = name;
		this.frame = /*int*/Math.floor(frame);
	};
	
	flash.addDescription("flash.display.FrameLabel", d, null, null, null);
	
}
());
