/*class flash.events.SyncEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_changeList/*Array*/ = null;
	
	d.get_changeList = function ()/*Array*/
	{
		return this.m_changeList;
		
	};
	
	d.set_changeList = function (value/*Array*/)/*void*/
	{
		this.m_changeList = value;
		return;
		
	};
	
	
	d.SyncEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, changeList/*Array*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (changeList == undefined) changeList = null;
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_changeList = changeList;
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.SyncEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_changeList);
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("SyncEvent", "type", "bubbles", "cancelable", "eventPhase", "changeList");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.SYNC/*String*/ = "sync";
		
	};
	
	
	flash.addDescription("flash.events.SyncEvent", d, "flash.events.Event", s, null);
	
}
());
