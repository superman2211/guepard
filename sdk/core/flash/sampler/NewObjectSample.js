/*class flash.sampler.NewObjectSample*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*public*/
	d/*const*/.id/*Number*/ = 0;
	/*public*/
	d/*const*/.type/*Class*/ = null;
	
	/*public*/
	d.get_object = function ()
	{
		
	};
	
	
	/*public*/
	d.NewObjectSample = function ()
	{
		this.Sample_constructor();
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Sample_constructor = this.__base__;
	}
	
	
	flash.addDescription("flash.sampler.NewObjectSample", d, "flash.sampler.Sample", s, null);
	
}
());
