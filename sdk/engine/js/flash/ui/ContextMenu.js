/*class flash.ui.ContextMenu*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.get_builtInItems = function ()/*ContextMenuBuiltInItems*/
	{
		return null;
		
	};
	
	d.set_builtInItems = function (value/*ContextMenuBuiltInItems*/)/*void*/
	{
		
	};
	
	d.get_customItems = function ()/*Array*/
	{
		return null;
		
	};
	
	d.set_customItems = function (value/*Array*/)/*void*/
	{
		
	};
	
	
	d.ContextMenu = function ()
	{
		this.EventDispatcher_constructor();
		this.set_builtInItems(new flash.ui.ContextMenuBuiltInItems());
		this.set_customItems(new Array());
		
	};
	
	d.clone = function ()/*ContextMenu*/
	{
		return null;
		
	};
	
	d.hideBuiltInItems = function ()/*void*/
	{
		this.get_builtInItems().save = false;
		this.get_builtInItems().zoom = false;
		this.get_builtInItems().quality = false;
		this.get_builtInItems().play = false;
		this.get_builtInItems().loop = false;
		this.get_builtInItems().rewind = false;
		this.get_builtInItems().forwardAndBack = false;
		this.get_builtInItems().print = false;
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.ui.ContextMenu", d, "flash.events.EventDispatcher", s, null);
	
}
());
