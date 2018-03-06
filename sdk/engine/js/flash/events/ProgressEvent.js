/*class flash.events.ProgressEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_bytesLoaded/*uint*/ = 0;
	d.m_bytesTotal/*uint*/ = 0;
	
	d.get_bytesLoaded = function ()/*uint*/
	{
		return this.m_bytesLoaded;
		
	};
	
	d.set_bytesLoaded = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_bytesLoaded = value;
		return;
		
	};
	
	d.get_bytesTotal = function ()/*uint*/
	{
		return this.m_bytesTotal;
		
	};
	
	d.set_bytesTotal = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_bytesTotal = value;
		return;
		
	};
	
	
	d.ProgressEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, bytesLoaded/*uint*/, bytesTotal/*uint*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (bytesLoaded == undefined) bytesLoaded = 0;
		bytesLoaded = /*uint*/Math.floor(bytesLoaded);
		if (bytesTotal == undefined) bytesTotal = 0;
		bytesTotal = /*uint*/Math.floor(bytesTotal);
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_bytesLoaded = bytesLoaded;
		this.m_bytesTotal = bytesTotal;
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.ProgressEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_bytesLoaded, this.m_bytesTotal);
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("ProgressEvent", "type", "bubbles", "cancelable", "eventPhase", "bytesLoaded", "bytesTotal");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.PROGRESS/*String*/ = "progress";
		this.SOCKET_DATA/*String*/ = "socketData";
		
	};
	
	
	flash.addDescription("flash.events.ProgressEvent", d, "flash.events.Event", s, null);
	
}
());
