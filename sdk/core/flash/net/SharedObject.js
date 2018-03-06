/*class flash.net.SharedObject*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._data = {};
	
	
	/*public*/
	d.get_client = function ()/*Object*/
	{
		
	};
	
	/*public*/
	d.set_client = function (object/*Object*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_data = function ()/*Object*/
	{
		return this._data;
	};
	
	/*public*/
	d.set_fps = function (updatesPerSecond/*Number*/)/*void*/
	{
		this.invoke(flash.net.SharedObject.kSetFps, updatesPerSecond);
		
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
	d.get_size = function ()/*uint*/
	{
		return Math.floor(this.invoke(flash.net.SharedObject.kGetSize));
		
	};
	
	
	/*public*/
	d.SharedObject = function ()
	{
		this.EventDispatcher_constructor();
		
	};
	
	/*public*/
	d.clear = function ()/*void*/
	{
		this.invoke(flash.net.SharedObject.kClear);
		
	};
	
	/*public*/
	d.close = function ()/*void*/
	{
		this.invoke(flash.net.SharedObject.kClose);
		
	};
	
	/*public*/
	d.connect = function (myConnection/*NetConnection*/, params/*String*/)/*void*/
	{
		if (params == undefined) params = null;
		
		
		if (!Boolean(this.invoke(flash.net.SharedObject.kConnect, myConnection, params)))
		{
			throw new Error(2139);
			
		}
		
	};
	
	/*public*/
	d.flush = function (minDiskSpace/*int*/)/*String*/
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
	
	/*public*/
	d.send = function ()/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 0);
		
		this.invokeWithArgsArray(flash.net.SharedObject.kSend, args);
		
	};
	
	/*public*/
	d.setDirty = function (propertyName/*String*/)/*void*/
	{
		
	};
	
	/*public*/
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
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
		
		/*private*/
		this/*const*/.kClear/*uint*/ = 6;
		/*private*/
		this/*const*/.kClose/*uint*/ = 3;
		/*private*/
		this/*const*/.kConnect/*uint*/ = 0;
		/*private*/
		this/*const*/.kFlush/*uint*/ = 2;
		/*private*/
		this/*const*/.kGetSize/*uint*/ = 4;
		/*private*/
		this/*const*/.kSend/*uint*/ = 1;
		/*private*/
		this/*const*/.kSetFps/*uint*/ = 5;
		
	};
	
	/*public*/
	s.get_defaultObjectEncoding = function ()/*uint*/
	{
		
	};
	
	/*public*/
	s.set_defaultObjectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	
	/*public*/
	s.deleteAll = function (url/*String*/)/*int*/
	{
		
	};
	
	/*public*/
	s.getDiskUsage = function (url/*String*/)/*int*/
	{
		
	};
	
	/*public*/
	s.getLocal = function (name/*String*/, localPath/*String*/, secure/*Boolean*/)/*SharedObject*/
	{
		return new flash.net.SharedObject();
	};
	
	/*public*/
	s.getRemote = function (name/*String*/, remotePath/*String*/, persistence/*Object*/, secure/*Boolean*/)/*SharedObject*/
	{
		
	};
	
	
	flash.addDescription("flash.net.SharedObject", d, "flash.events.EventDispatcher", s, null);
	
}
());
