/*class flash.events.TimerEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.TimerEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		
		this.Event_constructor(type, bubbles, cancelable);
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.TimerEvent(this.get_type(), this.get_bubbles(), this.get_cancelable());
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("TimerEvent", "type", "bubbles", "cancelable", "eventPhase");
		
	};
	
	d.updateAfterEvent = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.TIMER/*String*/ = "timer";
		this.TIMER_COMPLETE/*String*/ = "timerComplete";
		
	};
	
	
	flash.addDescription("flash.events.TimerEvent", d, "flash.events.Event", s, null);
	
}
());
