/*class flash.events.FullScreenEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_fullScreen/*Boolean*/ = false;
	
	d.get_fullScreen = function ()/*Boolean*/
	{
		return this.m_fullScreen;
		
	};
	
	
	d.FullScreenEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, fullScreen/*Boolean*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (fullScreen == undefined) fullScreen = false;
		
		this.ActivityEvent_constructor(type, bubbles, cancelable);
		this.m_fullScreen = fullScreen;
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.FullScreenEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.get_fullScreen());
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("FullScreenEvent", "type", "bubbles", "cancelable", "eventPhase", "fullScreen");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.ActivityEvent_constructor = this.__base__;
		
		this.FULL_SCREEN/*String*/ = "fullScreen";
		
	};
	
	
	flash.addDescription("flash.events.FullScreenEvent", d, "flash.events.ActivityEvent", s, null);
	
}
());
