(function ()
{
	"use strict";
	
	flash.createPackage("flash.net");
	
	flash.net.test = function ()
	{
		flash.trace("flash.net.test");
		
		var obj = {};
		
		obj.loadComplete = function (e)
		{
			flash.trace(e);
			
			var taget = e.get_target();
			
			flash.trace(taget);
			flash.trace(taget.data);
			
			var xml = new flash.xml.XMLDocument();
			xml.ignoreWhite = true;
			xml.parseXML(taget.data);
			flash.trace("xml = " + xml);
		};
		
		obj.loadProgress = function (e)
		{
			
		};
		
		
		flash.trace();
		
		flash.trace("flash.net.URLRequestMethod.GET = " + flash.net.URLRequestMethod.GET);
		flash.trace("flash.net.URLLoaderDataFormat.BINARY = " + flash.net.URLLoaderDataFormat.BINARY);
		flash.trace("new flash.net.URLRequestHeader() = " + new flash.net.URLRequestHeader("name", "value"));
		flash.trace("flash.net.SharedObject.getLocal() = " + flash.net.SharedObject.getLocal("test"));
		flash.trace("new flash.net.URLVariables('a=10&b=test') = " + new flash.net.URLVariables('a=10&b=test'));
		
		var request = new flash.net.URLRequest('data/bouncing-balls.xml');
		var loader = new flash.net.URLLoader(request);
		loader.addEventListener(flash.events.Event.COMPLETE, flash.bindFunction(obj, obj.loadComplete));
		
		flash.trace("request = " + request);
		flash.trace("loader = " + loader);
		
		
		flash.trace();
	};
}
());