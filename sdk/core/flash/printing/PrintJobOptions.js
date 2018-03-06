/*class flash.printing.PrintJobOptions*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.printAsBitmap/*Boolean*/ = false;
	
	
	/*public*/
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
