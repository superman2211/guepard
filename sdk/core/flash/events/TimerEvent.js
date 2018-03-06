/*class flash.events.TimerEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*public*/
	d.TimerEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		
		this.Event_constructor(type, bubbles, cancelable);
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.TimerEvent(this.get_type(), this.get_bubbles(), this.get_cancelable());
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("TimerEvent", "type", "bubbles", "cancelable", "eventPhase");
		
	};
	
	/*public*/
	d.updateAfterEvent = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Event_constructor = this.__base__;
		
		/*public*/
		this/*const*/.TIMER/*String*/ = "timer";
		/*public*/
		this/*const*/.TIMER_COMPLETE/*String*/ = "timerComplete";
		
	};
	
	
	flash.addDescription("flash.events.TimerEvent", d, "flash.events.Event", s, null);
	
}
());
