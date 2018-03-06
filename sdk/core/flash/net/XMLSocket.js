/*class flash.net.XMLSocket*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_connected = function ()/*Boolean*/
	{
		
	};
	
	
	/*public*/
	d.XMLSocket = function (host/*String*/, port/*int*/)
	{
		this.EventDispatcher_constructor();
		if (host == undefined) host = null;
		if (port == undefined) port = 0;
		port = /*int*/Math.floor(port);
		
		
		if (host != null)
		{
			this.connect(host, port);
			
		}
		return;
		
	};
	
	/*public*/
	d.close = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.connect = function (host/*String*/, port/*int*/)/*void*/
	{
		
	};
	
	/*public*/
	d.send = function (object/*null*/)/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	
	flash.addDescription("flash.net.XMLSocket", d, "flash.events.EventDispatcher", s, null);
	
}
());
