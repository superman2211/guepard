/*class flash.events.EventDispatcher*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._target = null,
		d._listeners = null;
	
	
	/*public*/
	d.EventDispatcher = function (target/*IEventDispatcher*/)
	{
		if (target == undefined) target = null;
		this._target = target;
		
		this._listeners = [];
	};
	
	/*public*/
	d.addEventListener = function (type/*String*/, listener/*Function*/, useCapture/*Boolean*/, priority/*int*/, useWeakReference/*Boolean*/)/*void*/
	{
		if (!type)
		{
			throw new Error("Error: 'type' must not be 'null'");
		}
		
		if (!listener)
		{
			throw new Error("Error: 'listener' must not be 'null'");
		}
		
		if (useCapture == undefined) useCapture = false;
		if (priority == undefined) priority = 0;
		priority = /*int*/Math.floor(priority);
		if (useWeakReference == undefined) useWeakReference = false;
		
		this._listeners.push({
			type: type,
			listener: listener,
			useCapture: useCapture,
			priority: priority,
			useWeakReference: useWeakReference
		});
		
	};
	
	/*public*/
	d.dispatchEvent = function (event/*Event*/)/*Boolean*/
	{
		
		if (event.get_target())
		{
			return this._dispatchEventFunction(event.clone());
			
		}
		else
		{
			return this._dispatchEventFunction(event);
		}
		
	};
	
	/*private*/
	d._dispatchEventFunction = function (event/*Event*/)/*Boolean*/
	{
		
		var complete = false;
		var eventType = event.get_type();
		
		for (var i in this._listeners)
		{
			var object = this._listeners[ i ];
			
			if (object.type == eventType)
			{
				event._target = this;
				
				object.listener(event);
				
				complete = true;
			}
		}
		
		return complete;
		
	};
	
	/*public*/
	d.hasEventListener = function (type/*String*/)/*Boolean*/
	{
		for (var i in this._listeners)
		{
			var object = this._listeners[ i ];
			
			if (object.type == type)
			{
				return true;
			}
		}
		
		return false;
		
	};
	
	/*public*/
	d.removeEventListener = function (type/*String*/, listener/*Function*/, useCapture/*Boolean*/)/*void*/
	{
		if (useCapture == undefined) useCapture = false;
		
		for (var i in this._listeners)
		{
			var object = this._listeners[ i ];
			
			if (object.type == type &&
				flash.equalsFunction(object.listener, listener) &&
				object.useCapture == useCapture)
			{
				this._listeners.splice(i, 1);
				return;
			}
		}
		
	};
	
	/*public*/
	d.willTrigger = function (type/*String*/)/*Boolean*/
	{
		return false;
	};
	
	flash.addDescription("flash.events.EventDispatcher", d, null, null, [ "flash.events.IEventDispatcher" ]);
	
}
());
