/*class flash.external.ExternalInterface*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.ExternalInterface = function ()
	{
		return;
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.marshallExceptions/*Boolean*/ = false;
	};
	
	s.get_activeX = function ()/*Boolean*/
	{
		
	};
	
	s.get_available = function ()/*Boolean*/
	{
		
	};
	
	s.get_objectID = function ()/*String*/
	{
		
	};
	
	s.addCallback = function (functionName/*String*/, closure/*Function*/)/*void*/
	{
		
	};
	
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
