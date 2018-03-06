/*class flash.sampler.StackFrame*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*const*/.file/*String*/ = null;
	/*public*/
	d/*const*/.line/*uint*/ = 0;
	/*public*/
	d/*const*/.name/*String*/ = null;
	
	
	/*public*/
	d.StackFrame = function ()
	{
		
	};
	
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.name + "()" + (this.file ? ("[" + this.file + ":" + this.line + "]") : (""));
		
	};
	
	
	flash.addDescription("flash.sampler.StackFrame", d, null, null, null);
	
}
());
