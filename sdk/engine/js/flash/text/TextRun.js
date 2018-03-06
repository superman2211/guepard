/*class flash.text.TextRun*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.beginIndex/*int*/ = 0;
	d.endIndex/*int*/ = 0;
	d.textFormat/*TextFormat*/ = null;
	
	
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
