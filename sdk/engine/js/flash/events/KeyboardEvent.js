/*class flash.events.KeyboardEvent*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_altKey/*Boolean*/ = false;
	d.m_charCode/*uint*/ = 0;
	d.m_ctrlKey/*Boolean*/ = false;
	d.m_keyCode/*uint*/ = 0;
	d.m_keyLocation/*uint*/ = 0;
	d.m_shiftKey/*Boolean*/ = false;
	
	d.get_altKey = function ()/*Boolean*/
	{
		return this.m_altKey;
		
	};
	
	d.set_altKey = function (value/*Boolean*/)/*void*/
	{
		this.m_altKey = value;
		return;
		
	};
	
	d.get_charCode = function ()/*uint*/
	{
		return this.m_charCode;
		
	};
	
	d.set_charCode = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_charCode = value;
		return;
		
	};
	
	d.get_ctrlKey = function ()/*Boolean*/
	{
		return this.m_ctrlKey;
		
	};
	
	d.set_ctrlKey = function (value/*Boolean*/)/*void*/
	{
		this.m_ctrlKey = value;
		return;
		
	};
	
	d.get_keyCode = function ()/*uint*/
	{
		return this.m_keyCode;
		
	};
	
	d.set_keyCode = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_keyCode = value;
		return;
		
	};
	
	d.get_keyLocation = function ()/*uint*/
	{
		return this.m_keyLocation;
		
	};
	
	d.set_keyLocation = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.m_keyLocation = value;
		return;
		
	};
	
	d.get_shiftKey = function ()/*Boolean*/
	{
		return this.m_shiftKey;
		
	};
	
	d.set_shiftKey = function (value/*Boolean*/)/*void*/
	{
		this.m_shiftKey = value;
		return;
		
	};
	
	
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
	d.clone = function ()/*Event*/
	{
		return new flash.events.KeyboardEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_charCode, this.m_keyCode, this.m_keyLocation, this.m_ctrlKey, this.m_altKey, this.m_shiftKey);
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("KeyboardEvent", "type", "bubbles", "cancelable", "eventPhase", "charCode", "keyCode", "keyLocation", "ctrlKey", "altKey", "shiftKey");
		
	};
	
	d.updateAfterEvent = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.KEY_DOWN/*String*/ = "keyDown";
		this.KEY_UP/*String*/ = "keyUp";
		
	};
	
	
	flash.addDescription("flash.events.KeyboardEvent", d, "flash.events.Event", s, null);
	
}
());
