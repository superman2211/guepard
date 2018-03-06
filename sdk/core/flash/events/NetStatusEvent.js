/*class flash.events.NetStatusEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/.m_info/*Object*/ = null;
	
	/*public*/
	d.get_info = function ()/*Object*/
	{
		return this.m_info;
		
	};
	
	/*public*/
	d.set_info = function (value/*Object*/)/*void*/
	{
		this.m_info = value;
		return;
		
	};
	
	
	/*public*/
	d.NetStatusEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, info/*Object*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (info == undefined) info = null;
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_info = info;
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.NetStatusEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_info);
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("NetStatusEvent", "type", "bubbles", "cancelable", "eventPhase", "info");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Event_constructor = this.__base__;
		
		/*public*/
		this/*const*/.NET_STATUS/*String*/ = "netStatus";
		
	};
	
	
	flash.addDescription("flash.events.NetStatusEvent", d, "flash.events.Event", s, null);
	
}
());
