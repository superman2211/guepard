/*class flash.net.SharedObject*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._data = {};
	
	
	d.get_client = function ()/*Object*/
	{
		
	};
	
	d.set_client = function (object/*Object*/)/*void*/
	{
		
	};
	
	d.get_data = function ()/*Object*/
	{
		return this._data;
	};
	
	d.set_fps = function (updatesPerSecond/*Number*/)/*void*/
	{
		this.invoke(flash.net.SharedObject.kSetFps, updatesPerSecond);
		
	};
	
	d.get_objectEncoding = function ()/*uint*/
	{
		
	};
	
	d.set_objectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	d.get_size = function ()/*uint*/
	{
		return Math.floor(this.invoke(flash.net.SharedObject.kGetSize));
		
	};
	
	
	d.SharedObject = function ()
	{
		this.EventDispatcher_constructor();
		
	};
	
	d.clear = function ()/*void*/
	{
		this.invoke(flash.net.SharedObject.kClear);
		
	};
	
	d.close = function ()/*void*/
	{
		this.invoke(flash.net.SharedObject.kClose);
		
	};
	
	d.connect = function (myConnection/*NetConnection*/, params/*String*/)/*void*/
	{
		if (params == undefined) params = null;
		
		
		if (!Boolean(this.invoke(flash.net.SharedObject.kConnect, myConnection, params)))
		{
			throw new Error(2139);
			
		}
		
	};
	
	d.flush = function (minDiskSpace/*int*/)/*String*/
	{
		
	};
	
	d.invoke = function (index/*uint*/)
	{
		
	};
	
	d.invokeWithArgsArray = function (index/*uint*/, args/*Array*/)
	{
		
	};
	
	d.send = function ()/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 0);
		
		this.invokeWithArgsArray(flash.net.SharedObject.kSend, args);
		
	};
	
	d.setDirty = function (propertyName/*String*/)/*void*/
	{
		
	};
	
	d.setProperty = function (propertyName/*String*/, value/*Object*/)/*void*/
	{
		if (value == undefined) value = null;
		
		
		if (this.get_data()[ propertyName ] != value)
		{
			this.get_data()[ propertyName ] = value;
			this.setDirty(propertyName);
			
		}
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
		
		this.kClear/*uint*/ = 6;
		this.kClose/*uint*/ = 3;
		this.kConnect/*uint*/ = 0;
		this.kFlush/*uint*/ = 2;
		this.kGetSize/*uint*/ = 4;
		this.kSend/*uint*/ = 1;
		this.kSetFps/*uint*/ = 5;
		
	};
	
	s.get_defaultObjectEncoding = function ()/*uint*/
	{
		
	};
	
	s.set_defaultObjectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	
	s.deleteAll = function (url/*String*/)/*int*/
	{
		
	};
	
	s.getDiskUsage = function (url/*String*/)/*int*/
	{
		
	};
	
	s.getLocal = function (name/*String*/, localPath/*String*/, secure/*Boolean*/)/*SharedObject*/
	{
		return new flash.net.SharedObject();
	};
	
	s.getRemote = function (name/*String*/, remotePath/*String*/, persistence/*Object*/, secure/*Boolean*/)/*SharedObject*/
	{
		
	};
	
	
	flash.addDescription("flash.net.SharedObject", d, "flash.events.EventDispatcher", s, null);
	
}
());
