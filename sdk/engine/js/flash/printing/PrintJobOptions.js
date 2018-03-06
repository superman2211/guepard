/*class flash.printing.PrintJobOptions*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.printAsBitmap/*Boolean*/ = false;
	
	
	d.PrintJobOptions = function (printAsBitmap/*Boolean*/)
	{
		if (printAsBitmap == undefined) printAsBitmap = false;
		
		printAsBitmap = false;
		this.printAsBitmap = printAsBitmap;
		return;
		
	};
	
	
	flash.addDescription("flash.printing.PrintJobOptions", d, null, null, null);
	
}
());
