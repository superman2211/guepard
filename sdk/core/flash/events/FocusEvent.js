/*class flash.events.FocusEvent*/
/*
import flash.display.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/.m_keyCode/*uint*/ = 0;
	/*private*/
	d/*var*/.m_relatedObject/*InteractiveObject*/ = null;
	/*private*/
	d/*var*/.m_shiftKey/*Boolean*/ = false;
	
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
	d.get_relatedObject = function ()/*InteractiveObject*/
	{
		return this.m_relatedObject;
		
	};
	
	/*public*/
	d.set_relatedObject = function (value/*InteractiveObject*/)/*void*/
	{
		this.m_relatedObject = value;
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
	d.FocusEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, relatedObject/*InteractiveObject*/, shiftKey/*Boolean*/, keyCode/*uint*/)
	{
		if (bubbles == undefined) bubbles = true;
		if (cancelable == undefined) cancelable = false;
		if (relatedObject == undefined) relatedObject = null;
		if (shiftKey == undefined) shiftKey = false;
		if (keyCode == undefined) keyCode = 0;
		keyCode = /*uint*/Math.floor(keyCode);
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_relatedObject = relatedObject;
		this.m_shiftKey = shiftKey;
		this.m_keyCode = keyCode;
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.FocusEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_relatedObject, this.m_shiftKey, this.m_keyCode);
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("FocusEvent", "type", "bubbles", "cancelable", "eventPhase", "relatedObject", "shiftKey", "keyCode");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Event_constructor = this.__base__;
		
		/*public*/
		this/*const*/.FOCUS_IN/*String*/ = "focusIn";
		/*public*/
		this/*const*/.FOCUS_OUT/*String*/ = "focusOut";
		/*public*/
		this/*const*/.KEY_FOCUS_CHANGE/*String*/ = "keyFocusChange";
		/*public*/
		this/*const*/.MOUSE_FOCUS_CHANGE/*String*/ = "mouseFocusChange";
		
	};
	
	
	flash.addDescription("flash.events.FocusEvent", d, "flash.events.Event", s, null);
	
}
());
