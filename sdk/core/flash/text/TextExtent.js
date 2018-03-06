/*class flash.text.TextExtent*/
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
	d/*var*/.textFieldHeight/*Number*/ = 0;
	/*public*/
	d/*var*/.textFieldWidth/*Number*/ = 0;
	/*public*/
	d/*var*/.width/*Number*/ = 0;
	
	
	/*public*/
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
