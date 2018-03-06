/*class flash.events.IOErrorEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.IOErrorEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, text/*String*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (text == undefined) text = "";
		
		this.ErrorEvent_constructor(type, bubbles, cancelable, text);
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.IOErrorEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.get_text());
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("IOErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.ErrorEvent_constructor = this.__base__;
		
		/*public*/
		this/*const*/.DISK_ERROR/*String*/ = "diskError";
		/*public*/
		this/*const*/.IO_ERROR/*String*/ = "ioError";
		/*public*/
		this/*const*/.NETWORK_ERROR/*String*/ = "networkError";
		/*public*/
		this/*const*/.VERIFY_ERROR/*String*/ = "verifyError";
		
	};
	
	
	flash.addDescription("flash.events.IOErrorEvent", d, "flash.events.ErrorEvent", s, null);
	
}
());
