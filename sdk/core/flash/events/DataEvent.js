/*class flash.events.DataEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_data = function ()/*String*/
	{
		return this.TextEvent_get_text();
		
	};
	
	/*public*/
	d.set_data = function (value/*String*/)/*void*/
	{
		this.TextEvent_set_text(value);
		return;
		
	};
	
	
	/*public*/
	d.DataEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, data/*String*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (data == undefined) data = "";
		
		this.TextEvent_constructor(type, bubbles, cancelable, data);
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.DataEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.get_data());
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("DataEvent", "type", "bubbles", "cancelable", "eventPhase", "data");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.TextEvent_get_text = this.__base__.prototype.get_text;
		/*super*/
		/*public*/
		this.prototype.TextEvent_set_text = this.__base__.prototype.set_text;
		/*super*/
		/*public*/
		this.prototype.TextEvent_constructor = this.__base__;
		
		/*public*/
		this/*const*/.DATA/*String*/ = "data";
		/*public*/
		this/*const*/.UPLOAD_COMPLETE_DATA/*String*/ = "uploadCompleteData";
		
	};
	
	
	flash.addDescription("flash.events.DataEvent", d, "flash.events.TextEvent", s, null);
	
}
());
