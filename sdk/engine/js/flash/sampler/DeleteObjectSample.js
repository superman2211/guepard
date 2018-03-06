/*class flash.sampler.DeleteObjectSample*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.id/*Number*/ = 0;
	d.size/*Number*/ = 0;
	
	
	d.DeleteObjectSample = function ()
	{
		this.Sample_constructor();
		return;
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Sample_constructor = this.__base__;
	}
	
	
	flash.addDescription("flash.sampler.DeleteObjectSample", d, "flash.sampler.Sample", s, null);
	
}
());
