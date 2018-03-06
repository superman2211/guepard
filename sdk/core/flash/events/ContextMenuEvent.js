/*class flash.events.ContextMenuEvent*/
/*
import flash.display.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/.m_contextMenuOwner/*InteractiveObject*/ = null;
	/*private*/
	d/*var*/.m_mouseTarget/*InteractiveObject*/ = null;
	
	/*public*/
	d.get_contextMenuOwner = function ()/*InteractiveObject*/
	{
		return this.m_contextMenuOwner;
		
	};
	
	/*public*/
	d.set_contextMenuOwner = function (value/*InteractiveObject*/)/*void*/
	{
		this.m_contextMenuOwner = value;
		return;
		
	};
	
	/*public*/
	d.get_mouseTarget = function ()/*InteractiveObject*/
	{
		return this.m_mouseTarget;
		
	};
	
	/*public*/
	d.set_mouseTarget = function (value/*InteractiveObject*/)/*void*/
	{
		this.m_mouseTarget = value;
		return;
		
	};
	
	
	/*public*/
	d.ContextMenuEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, mouseTarget/*InteractiveObject*/, contextMenuOwner/*InteractiveObject*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		if (mouseTarget == undefined) mouseTarget = null;
		if (contextMenuOwner == undefined) contextMenuOwner = null;
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_mouseTarget = mouseTarget;
		this.m_contextMenuOwner = contextMenuOwner;
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.ContextMenuEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_mouseTarget, this.m_contextMenuOwner);
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("ContextMenuEvent", "type", "bubbles", "cancelable", "eventPhase", "mouseTarget", "contextMenuOwner");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Event_constructor = this.__base__;
		
		/*public*/
		this/*const*/.MENU_ITEM_SELECT/*String*/ = "menuItemSelect";
		/*public*/
		this/*const*/.MENU_SELECT/*String*/ = "menuSelect";
		
	};
	
	
	flash.addDescription("flash.events.ContextMenuEvent", d, "flash.events.Event", s, null);
	
}
());
