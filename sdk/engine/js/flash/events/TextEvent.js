/*class flash.events.TextEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_text/*String*/ = null;
	
	d.get_text = function ()/*String*/
	{
		return this.m_text;
		
	};
	
	d.set_text = function (value/*String*/)/*void*/
	{
		this.m_text = value;
		return;
		
	};
	
	
	d.TextEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, text/*String*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (text == undefined) text = "";
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_text = text;
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.TextEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_text);
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("TextEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.LINK/*String*/ = "link";
		this.TEXT_INPUT/*String*/ = "textInput";
		
	};
	
	
	flash.addDescription("flash.events.TextEvent", d, "flash.events.Event", s, null);
	
}
());
