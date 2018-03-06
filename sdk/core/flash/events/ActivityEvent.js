/*class flash.events.ActivityEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/.m_activating/*Boolean*/ = false;
	
	/*public*/
	d.get_activating = function ()/*Boolean*/
	{
		return this.m_activating;
		
	};
	
	/*public*/
	d.set_activating = function (value/*Boolean*/)/*void*/
	{
		this.m_activating = value;
		return;
		
	};
	
	
	/*public*/
	d.ActivityEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, activating/*Boolean*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (activating == undefined) activating = false;
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_activating = activating;
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.ActivityEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.get_activating());
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("ActivityEvent", "type", "bubbles", "cancelable", "eventPhase", "activating");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Event_constructor = this.__base__;
		
		/*public*/
		this/*const*/.ACTIVITY/*String*/ = "activity";
		
	};
	
	
	flash.addDescription("flash.events.ActivityEvent", d, "flash.events.Event", s, null);
	
}
());
