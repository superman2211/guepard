/*class flash.net.NetConnection*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.get_client = function ()/*Object*/
	{
		
	};
	
	d.set_client = function (object/*Object*/)/*void*/
	{
		
	};
	
	d.get_connected = function ()/*Boolean*/
	{
		
	};
	
	d.get_connectedProxyType = function ()/*String*/
	{
		
	};
	
	d.get_objectEncoding = function ()/*uint*/
	{
		
	};
	
	d.set_objectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	d.get_proxyType = function ()/*String*/
	{
		
	};
	
	d.set_proxyType = function (ptype/*String*/)/*void*/
	{
		
	};
	
	d.get_uri = function ()/*String*/
	{
		
	};
	
	d.get_usingTLS = function ()/*Boolean*/
	{
		
	};
	
	
	d.NetConnection = function ()
	{
		this.EventDispatcher_constructor();
		
		
	};
	
	d.addHeader = function (operation/*String*/, mustUnderstand/*Boolean*/, param/*Object*/)/*void*/
	{
		if (mustUnderstand == undefined) mustUnderstand = false;
		if (param == undefined) param = null;
		
		
	};
	
	d.call = function (command/*String*/, responder/*Responder*/)/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 2);
		
		
	};
	
	d.close = function ()/*void*/
	{
		
	};
	
	d.connect = function (command/*String*/)/*void*/
	{
		
	};
	
	d.invoke = function (index/*uint*/)
	{
		
	};
	
	d.invokeWithArgsArray = function (index/*uint*/, args/*Array*/)
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
		
		this.kAddHeader/*uint*/ = 3;
		this.kCall/*uint*/ = 2;
		this.kClose/*uint*/ = 1;
		this.kConnect/*uint*/ = 0;
		this.kGetConnectedProxyType/*uint*/ = 4;
		this.kGetUsingTLS/*uint*/ = 5;
		
	};
	
	s.get_defaultObjectEncoding = function ()/*uint*/
	{
		
	};
	
	s.set_defaultObjectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.net.NetConnection", d, "flash.events.EventDispatcher", s, null);
	
}
());
