/*interface flash.events.IEventDispatcher*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	/*public*/
	d.IEventDispatcher = function ()
	{
		
	};
	
	/*internal*/
	d.addEventListener = function (type/*String*/, listener/*Function*/, useCapture/*Boolean*/, priority/*int*/, useWeakReference/*Boolean*/)/*void*/
	{
		
	};
	
	/*internal*/
	d.dispatchEvent = function (event/*Event*/)/*Boolean*/
	{
		
	};
	
	/*internal*/
	d.hasEventListener = function (type/*String*/)/*Boolean*/
	{
		
	};
	
	/*internal*/
	d.removeEventListener = function (type/*String*/, listener/*Function*/, useCapture/*Boolean*/)/*void*/
	{
		
	};
	
	/*internal*/
	d.willTrigger = function (type/*String*/)/*Boolean*/
	{
		
	};
	
	
	flash.addDescription("flash.events.IEventDispatcher", d, null, null, null);
	
}
());
