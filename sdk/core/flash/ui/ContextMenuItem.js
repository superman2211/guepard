/*class flash.ui.ContextMenuItem*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_caption = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.set_caption = function (value/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_enabled = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_enabled = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_separatorBefore = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_separatorBefore = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_visible = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_visible = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	
	/*public*/
	d.ContextMenuItem = function (caption/*String*/, separatorBefore/*Boolean*/, enabled/*Boolean*/, visible/*Boolean*/)
	{
		this.EventDispatcher_constructor();
		if (separatorBefore == undefined) separatorBefore = false;
		if (enabled == undefined) enabled = true;
		if (visible == undefined) visible = true;
		
		this.set_caption(caption);
		this.set_separatorBefore(separatorBefore);
		this.set_enabled(enabled);
		this.set_visible(visible);
		return;
		
	};
	
	/*public*/
	d.clone = function ()/*ContextMenuItem*/
	{
		return new flash.ui.ContextMenuItem(this.get_caption(), this.get_separatorBefore(), this.get_enabled(), this.get_visible());
		
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	};
	
	flash.addDescription("flash.ui.ContextMenuItem", d, "flash.events.EventDispatcher", s, null);
	
}
());
