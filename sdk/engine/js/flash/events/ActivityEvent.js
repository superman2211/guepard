/*class flash.events.ActivityEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_activating/*Boolean*/ = false;
	
	d.get_activating = function ()/*Boolean*/
	{
		return this.m_activating;
		
	};
	
	d.set_activating = function (value/*Boolean*/)/*void*/
	{
		this.m_activating = value;
		return;
		
	};
	
	
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
	d.clone = function ()/*Event*/
	{
		return new flash.events.ActivityEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.get_activating());
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("ActivityEvent", "type", "bubbles", "cancelable", "eventPhase", "activating");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.ACTIVITY/*String*/ = "activity";
		
	};
	
	
	flash.addDescription("flash.events.ActivityEvent", d, "flash.events.Event", s, null);
	
}
());
