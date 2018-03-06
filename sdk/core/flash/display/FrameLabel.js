/*class flash.display.FrameLabel*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.frame/*int*/ = 0;
	/*public*/
	d/*var*/.name/*String*/ = null;
	
	
	/*public*/
	d.FrameLabel = function (name/*String*/, frame/*int*/)
	{
		this.name = name;
		this.frame = /*int*/Math.floor(frame);
	};
	
	flash.addDescription("flash.display.FrameLabel", d, null, null, null);
	
}
());
