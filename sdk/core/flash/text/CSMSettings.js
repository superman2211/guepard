/*class flash.text.CSMSettings*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*public*/
	d/*var*/.fontSize/*Number*/ = 0;
	/*public*/
	d/*var*/.insideCutoff/*Number*/ = 0;
	/*public*/
	d/*var*/.outsideCutoff/*Number*/ = 0;
	
	
	/*public*/
	d.CSMSettings = function (fontSize/*Number*/, insideCutoff/*Number*/, outsideCutoff/*Number*/)
	{
		this.fontSize = fontSize;
		this.insideCutoff = insideCutoff;
		this.outsideCutoff = outsideCutoff;
	};
	
	flash.addDescription("flash.text.CSMSettings", d, null, null, null);
	
}
());
