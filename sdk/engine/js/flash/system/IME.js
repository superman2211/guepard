/*class flash.system.IME*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.IME = function ()
	{
		this.EventDispatcher_constructor();
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	
	s.set_constructOK = function (construct/*Boolean*/)/*void*/
	{
		
	};
	
	s.get_conversionMode = function ()/*String*/
	{
		
	};
	
	s.set_conversionMode = function (mode/*String*/)/*void*/
	{
		
	};
	
	s.get_enabled = function ()/*Boolean*/
	{
		
	};
	
	s.set_enabled = function (enabled/*Boolean*/)/*void*/
	{
		
	};
	
	
	s.doConversion = function ()/*void*/
	{
		
	};
	
	s.setCompositionString = function (composition/*String*/)/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.system.IME", d, "flash.events.EventDispatcher", s, null);
	
}
());
