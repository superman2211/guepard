/*class flash.display.MorphShape*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.MorphShape = function ()
	{
		this.DisplayObject_constructor();
		return;
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.DisplayObject_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.display.MorphShape", d, "flash.display.DisplayObject", s, null);
	
}
());
