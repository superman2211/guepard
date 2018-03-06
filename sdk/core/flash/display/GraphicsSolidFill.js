/*class flash.display.GraphicsSolidFill*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*public*/
	d/*var*/.alpha/*Number*/ = 1;
	/*public*/
	d/*var*/.color/*uint*/ = 0;
	
	
	/*public*/
	d.GraphicsSolidFill = function (param1/*uint*/, param2/*Number*/)
	{
		if (param1 == undefined) param1 = 0;
		param1 = /*uint*/Math.floor(param1);
		if (param2 == undefined) param2 = 1;
		
		this.color = param1;
		this.alpha = param2;
		
	};
	
	
	flash.addDescription("flash.display.GraphicsSolidFill", d, null, null, [ "flash.display.IGraphicsFill", "flash.display.IGraphicsData" ]);
	
}
());
