/*class flash.sampler.StackFrame*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.file/*String*/ = null;
	d.line/*uint*/ = 0;
	d.name/*String*/ = null;
	
	
	d.StackFrame = function ()
	{
		
	};
	
	d.toString = function ()/*String*/
	{
		return this.name + "()" + (this.file ? ("[" + this.file + ":" + this.line + "]") : (""));
		
	};
	
	
	flash.addDescription("flash.sampler.StackFrame", d, null, null, null);
	
}
());
