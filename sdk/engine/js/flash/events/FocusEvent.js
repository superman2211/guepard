/*class flash.events.FocusEvent*/
/*
import flash.display.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_keyCode/*uint*/ = 0;
	d.m_relatedObject/*InteractiveObject*/ = null;
	d.m_shiftKey/*Boolean*/ = false;
	
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
	
	d.get_relatedObject = function ()/*InteractiveObject*/
	{
		return this.m_relatedObject;
		
	};
	
	d.set_relatedObject = function (value/*InteractiveObject*/)/*void*/
	{
		this.m_relatedObject = value;
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
	d.clone = function ()/*Event*/
	{
		return new flash.events.FocusEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_relatedObject, this.m_shiftKey, this.m_keyCode);
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("FocusEvent", "type", "bubbles", "cancelable", "eventPhase", "relatedObject", "shiftKey", "keyCode");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.FOCUS_IN/*String*/ = "focusIn";
		this.FOCUS_OUT/*String*/ = "focusOut";
		this.KEY_FOCUS_CHANGE/*String*/ = "keyFocusChange";
		this.MOUSE_FOCUS_CHANGE/*String*/ = "mouseFocusChange";
		
	};
	
	
	flash.addDescription("flash.events.FocusEvent", d, "flash.events.Event", s, null);
	
}
());
