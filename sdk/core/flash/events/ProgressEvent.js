/*class flash.events.ProgressEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/.m_bytesLoaded/*uint*/ = 0;
	/*private*/
	d/*var*/.m_bytesTotal/*uint*/ = 0;
	
	/*public*/
	d.get_bytesLoaded = function ()/*uint*/
	{
		return this.m_bytesLoaded;
		
	};
	
	/*public*/
	d.set_bytesLoaded = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_bytesLoaded = value;
		return;
		
	};
	
	/*public*/
	d.get_bytesTotal = function ()/*uint*/
	{
		return this.m_bytesTotal;
		
	};
	
	/*public*/
	d.set_bytesTotal = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_bytesTotal = value;
		return;
		
	};
	
	
	/*public*/
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
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.ProgressEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_bytesLoaded, this.m_bytesTotal);
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("ProgressEvent", "type", "bubbles", "cancelable", "eventPhase", "bytesLoaded", "bytesTotal");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Event_constructor = this.__base__;
		
		/*public*/
		this/*const*/.PROGRESS/*String*/ = "progress";
		/*public*/
		this/*const*/.SOCKET_DATA/*String*/ = "socketData";
		
	};
	
	
	flash.addDescription("flash.events.ProgressEvent", d, "flash.events.Event", s, null);
	
}
());
