/*class flash.text.TextLineMetrics*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.ascent/*Number*/ = 0;
	d.descent/*Number*/ = 0;
	d.height/*Number*/ = 0;
	d.leading/*Number*/ = 0;
	d.width/*Number*/ = 0;
	d.x/*Number*/ = 0;
	
	
	d.TextLineMetrics = function (x/*Number*/, width/*Number*/, height/*Number*/, ascent/*Number*/, descent/*Number*/, leading/*Number*/)
	{
		this.x = x;
		this.width = width;
		this.height = height;
		this.ascent = ascent;
		this.descent = descent;
		this.leading = leading;
		return;
		
	};
	
	
	flash.addDescription("flash.text.TextLineMetrics", d, null, null, null);
	
}
());
