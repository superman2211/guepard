/*class flash.net.NetConnection*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_client = function ()/*Object*/
	{
		
	};
	
	/*public*/
	d.set_client = function (object/*Object*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_connected = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.get_connectedProxyType = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.get_objectEncoding = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.set_objectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_proxyType = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.set_proxyType = function (ptype/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_uri = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.get_usingTLS = function ()/*Boolean*/
	{
		
	};
	
	
	/*public*/
	d.NetConnection = function ()
	{
		this.EventDispatcher_constructor();
		
		
	};
	
	/*public*/
	d.addHeader = function (operation/*String*/, mustUnderstand/*Boolean*/, param/*Object*/)/*void*/
	{
		if (mustUnderstand == undefined) mustUnderstand = false;
		if (param == undefined) param = null;
		
		
	};
	
	/*public*/
	d.call = function (command/*String*/, responder/*Responder*/)/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 2);
		
		
	};
	
	/*public*/
	d.close = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.connect = function (command/*String*/)/*void*/
	{
		
	};
	
	/*private*/
	d.invoke = function (index/*uint*/)
	{
		
	};
	
	/*private*/
	d.invokeWithArgsArray = function (index/*uint*/, args/*Array*/)
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
		
		/*private*/
		this/*const*/.kAddHeader/*uint*/ = 3;
		/*private*/
		this/*const*/.kCall/*uint*/ = 2;
		/*private*/
		this/*const*/.kClose/*uint*/ = 1;
		/*private*/
		this/*const*/.kConnect/*uint*/ = 0;
		/*private*/
		this/*const*/.kGetConnectedProxyType/*uint*/ = 4;
		/*private*/
		this/*const*/.kGetUsingTLS/*uint*/ = 5;
		
	};
	
	/*public*/
	s.get_defaultObjectEncoding = function ()/*uint*/
	{
		
	};
	
	/*public*/
	s.set_defaultObjectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.net.NetConnection", d, "flash.events.EventDispatcher", s, null);
	
}
());
