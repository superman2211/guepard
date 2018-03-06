/*class flash.text.CSMSettings*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.fontSize/*Number*/ = 0;
	d.insideCutoff/*Number*/ = 0;
	d.outsideCutoff/*Number*/ = 0;
	
	
	d.CSMSettings = function (fontSize/*Number*/, insideCutoff/*Number*/, outsideCutoff/*Number*/)
	{
		this.fontSize = fontSize;
		this.insideCutoff = insideCutoff;
		this.outsideCutoff = outsideCutoff;
	};
	
	flash.addDescription("flash.text.CSMSettings", d, null, null, null);
	
}
());
