/*class flash.events.AsyncErrorEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.error/*Error*/ = null;
	
	
	d.AsyncErrorEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, text/*String*/, error/*Error*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (text == undefined) text = "";
		if (error == undefined) error = null;
		
		this.error = error;
		this.ErrorEvent_constructor(type, bubbles, cancelable, text);
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.AsyncErrorEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.error);
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("AsyncErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text", "error");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.ErrorEvent_constructor = this.__base__;
		
		this.ASYNC_ERROR/*String*/ = "asyncError";
		
	};
	
	
	flash.addDescription("flash.events.AsyncErrorEvent", d, "flash.events.ErrorEvent", s, null);
	
}
());
