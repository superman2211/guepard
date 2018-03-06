/*class flash.external.ExternalInterface*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*public*/
	d.ExternalInterface = function ()
	{
		return;
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*public*/
		this/*var*/.marshallExceptions/*Boolean*/ = false;
	};
	
	/*private*/
	s.get_activeX = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	s.get_available = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	s.get_objectID = function ()/*String*/
	{
		
	};
	
	/*public*/
	s.addCallback = function (functionName/*String*/, closure/*Function*/)/*void*/
	{
		
	};
	
	/*public*/
	s.call = function (functionName/*String*/)
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 1);
		
		if (window[ functionName ])
		{
			window[ functionName ].apply(null, args);
		}
	};
	
	flash.addDescription("flash.external.ExternalInterface", d, null, s, null);
}
());
