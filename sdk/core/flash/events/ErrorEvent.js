/*class flash.events.ErrorEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.ErrorEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, text/*String*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (text == undefined) text = "";
		
		this.TextEvent_constructor(type, bubbles, cancelable, text);
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.ErrorEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.get_text());
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("ErrorEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.TextEvent_constructor = this.__base__;
		
		/*public*/
		this/*const*/.ERROR/*String*/ = "error";
		
	};
	
	
	flash.addDescription("flash.events.ErrorEvent", d, "flash.events.TextEvent", s, null);
	
}
());
