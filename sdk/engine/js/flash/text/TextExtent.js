/*class flash.text.TextExtent*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.ascent/*Number*/ = 0;
	d.descent/*Number*/ = 0;
	d.height/*Number*/ = 0;
	d.textFieldHeight/*Number*/ = 0;
	d.textFieldWidth/*Number*/ = 0;
	d.width/*Number*/ = 0;
	
	
	d.TextExtent = function (width/*Number*/, height/*Number*/, textFieldWidth/*Number*/, textFieldHeight/*Number*/, ascent/*Number*/, descent/*Number*/)
	{
		this.width = width;
		this.height = height;
		this.textFieldWidth = textFieldWidth;
		this.textFieldHeight = textFieldHeight;
		this.ascent = ascent;
		this.descent = descent;
		return;
		
	};
	
	
	flash.addDescription("flash.text.TextExtent", d, null, null, null);
	
}
());
