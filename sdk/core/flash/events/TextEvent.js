/*class flash.events.TextEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/.m_text/*String*/ = null;
	
	/*public*/
	d.get_text = function ()/*String*/
	{
		return this.m_text;
		
	};
	
	/*public*/
	d.set_text = function (value/*String*/)/*void*/
	{
		this.m_text = value;
		return;
		
	};
	
	
	/*public*/
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
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.TextEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_text);
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("TextEvent", "type", "bubbles", "cancelable", "eventPhase", "text");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Event_constructor = this.__base__;
		
		/*public*/
		this/*const*/.LINK/*String*/ = "link";
		/*public*/
		this/*const*/.TEXT_INPUT/*String*/ = "textInput";
		
	};
	
	
	flash.addDescription("flash.events.TextEvent", d, "flash.events.Event", s, null);
	
}
());
