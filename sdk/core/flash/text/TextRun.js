/*class flash.text.TextRun*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.beginIndex/*int*/ = 0;
	/*public*/
	d/*var*/.endIndex/*int*/ = 0;
	/*public*/
	d/*var*/.textFormat/*TextFormat*/ = null;
	
	
	/*public*/
	d.TextRun = function (beginIndex/*int*/, endIndex/*int*/, textFormat/*TextFormat*/)
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		
		this.beginIndex = beginIndex;
		this.endIndex = endIndex;
		this.textFormat = textFormat;
		return;
		
	};
	
	
	flash.addDescription("flash.text.TextRun", d, null, null, null);
	
}
());
