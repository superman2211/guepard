/*class flash.events.IOErrorEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.IOErrorEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, text/*String*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (text == undefined) text = "";
		
		this.ErrorEvent_constructor(type, bubbles, cancelable, text);
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.IOErrorEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.get_text());
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("IOErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.ErrorEvent_constructor = this.__base__;
		
		this.DISK_ERROR/*String*/ = "diskError";
		this.IO_ERROR/*String*/ = "ioError";
		this.NETWORK_ERROR/*String*/ = "networkError";
		this.VERIFY_ERROR/*String*/ = "verifyError";
		
	};
	
	
	flash.addDescription("flash.events.IOErrorEvent", d, "flash.events.ErrorEvent", s, null);
	
}
());
