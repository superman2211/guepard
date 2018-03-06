/*class flash.events.StatusEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_code/*String*/ = null;
	d.m_level/*String*/ = null;
	
	d.get_code = function ()/*String*/
	{
		return this.m_code;
		
	};
	
	d.set_code = function (value/*String*/)/*void*/
	{
		this.m_code = value;
		return;
		
	};
	
	d.get_level = function ()/*String*/
	{
		return this.m_level;
		
	};
	
	d.set_level = function (value/*String*/)/*void*/
	{
		this.m_level = value;
		return;
		
	};
	
	
	d.StatusEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, code/*String*/, level/*String*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (code == undefined) code = "";
		if (level == undefined) level = "";
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_code = code;
		this.m_level = level;
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.StatusEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_code, this.m_level);
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("StatusEvent", "type", "bubbles", "cancelable", "eventPhase", "code", "level");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.STATUS/*String*/ = "status";
		
	};
	
	
	flash.addDescription("flash.events.StatusEvent", d, "flash.events.Event", s, null);
	
}
());
