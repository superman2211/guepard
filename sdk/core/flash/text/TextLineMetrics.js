/*class flash.text.TextLineMetrics*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.ascent/*Number*/ = 0;
	/*public*/
	d/*var*/.descent/*Number*/ = 0;
	/*public*/
	d/*var*/.height/*Number*/ = 0;
	/*public*/
	d/*var*/.leading/*Number*/ = 0;
	/*public*/
	d/*var*/.width/*Number*/ = 0;
	/*public*/
	d/*var*/.x/*Number*/ = 0;
	
	
	/*public*/
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
