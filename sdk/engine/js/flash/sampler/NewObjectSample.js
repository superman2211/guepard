/*class flash.sampler.NewObjectSample*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.id/*Number*/ = 0;
	d.type/*Class*/ = null;
	
	d.get_object = function ()
	{
		
	};
	
	
	d.NewObjectSample = function ()
	{
		this.Sample_constructor();
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Sample_constructor = this.__base__;
	}
	
	
	flash.addDescription("flash.sampler.NewObjectSample", d, "flash.sampler.Sample", s, null);
	
}
());
