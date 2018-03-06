/*class flash.events.KeyboardEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/.m_altKey/*Boolean*/ = false;
	/*private*/
	d/*var*/.m_charCode/*uint*/ = 0;
	/*private*/
	d/*var*/.m_ctrlKey/*Boolean*/ = false;
	/*private*/
	d/*var*/.m_keyCode/*uint*/ = 0;
	/*private*/
	d/*var*/.m_keyLocation/*uint*/ = 0;
	/*private*/
	d/*var*/.m_shiftKey/*Boolean*/ = false;
	
	/*public*/
	d.get_altKey = function ()/*Boolean*/
	{
		return this.m_altKey;
		
	};
	
	/*public*/
	d.set_altKey = function (value/*Boolean*/)/*void*/
	{
		this.m_altKey = value;
		return;
		
	};
	
	/*public*/
	d.get_charCode = function ()/*uint*/
	{
		return this.m_charCode;
		
	};
	
	/*public*/
	d.set_charCode = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_charCode = value;
		return;
		
	};
	
	/*public*/
	d.get_ctrlKey = function ()/*Boolean*/
	{
		return this.m_ctrlKey;
		
	};
	
	/*public*/
	d.set_ctrlKey = function (value/*Boolean*/)/*void*/
	{
		this.m_ctrlKey = value;
		return;
		
	};
	
	/*public*/
	d.get_keyCode = function ()/*uint*/
	{
		return this.m_keyCode;
		
	};
	
	/*public*/
	d.set_keyCode = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_keyCode = value;
		return;
		
	};
	
	/*public*/
	d.get_keyLocation = function ()/*uint*/
	{
		return this.m_keyLocation;
		
	};
	
	/*public*/
	d.set_keyLocation = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_keyLocation = value;
		return;
		
	};
	
	/*public*/
	d.get_shiftKey = function ()/*Boolean*/
	{
		return this.m_shiftKey;
		
	};
	
	/*public*/
	d.set_shiftKey = function (value/*Boolean*/)/*void*/
	{
		this.m_shiftKey = value;
		return;
		
	};
	
	
	/*public*/
	d.KeyboardEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, charCode/*uint*/, keyCode/*uint*/, keyLocation/*uint*/, ctrlKey/*Boolean*/, altKey/*Boolean*/, shiftKey/*Boolean*/)
	{
		if (bubbles == undefined) bubbles = true;
		if (cancelable == undefined) cancelable = false;
		if (charCode == undefined) charCode = 0;
		charCode = /*uint*/Math.floor(charCode);
		if (keyCode == undefined) keyCode = 0;
		keyCode = /*uint*/Math.floor(keyCode);
		if (keyLocation == undefined) keyLocation = 0;
		keyLocation = /*uint*/Math.floor(keyLocation);
		if (ctrlKey == undefined) ctrlKey = false;
		if (altKey == undefined) altKey = false;
		if (shiftKey == undefined) shiftKey = false;
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_charCode = charCode;
		this.m_keyCode = keyCode;
		this.m_keyLocation = keyLocation;
		this.m_ctrlKey = ctrlKey;
		this.m_altKey = altKey;
		this.m_shiftKey = shiftKey;
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.KeyboardEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_charCode, this.m_keyCode, this.m_keyLocation, this.m_ctrlKey, this.m_altKey, this.m_shiftKey);
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("KeyboardEvent", "type", "bubbles", "cancelable", "eventPhase", "charCode", "keyCode", "keyLocation", "ctrlKey", "altKey", "shiftKey");
		
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
		this/*const*/.KEY_DOWN/*String*/ = "keyDown";
		/*public*/
		this/*const*/.KEY_UP/*String*/ = "keyUp";
		
	};
	
	
	flash.addDescription("flash.events.KeyboardEvent", d, "flash.events.Event", s, null);
	
}
());
