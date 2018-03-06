/*class flash.net.URLLoader*/
/*
import flash.events.*;
import flash.utils.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*public*/
	d/*var*/.bytesLoaded/*uint*/ = 0;
	/*public*/
	d/*var*/.bytesTotal/*uint*/ = 0;
	/*public*/
	d/*var*/.data/*Object*/ = null;
	/*public*/
	d/*var*/.dataFormat/*String*/ = "text";
	
	d._jsRequest = null;
	d._request = null;
	
	
	/*public*/
	d.URLLoader = function (request/*URLRequest*/)
	{
		this.EventDispatcher_constructor();
		
		if (request == undefined) request = null;
		
		if (request != null)
		{
			this.load(request);
		}
	};
	
	/*public*/
	d.close = function ()/*void*/
	{
		//this.stream.close();
		
		if (this._jsRequest)
		{
			this._jsRequest.abort();
		}
	};
	
	/*public*/
	d.load = function (request/*URLRequest*/)/*void*/
	{
		this._request = request;
		
		this._jsRequest = new XMLHttpRequest();
		
		this.dispatchEvent(new flash.events.Event(flash.events.Event.OPEN));
		
		this._jsRequest.addEventListener('readystatechange', flash.bindFunction(this, this._statusChange), false);
		
		this._jsRequest.addEventListener("progress", flash.bindFunction(this, this._updateProgress), false);
		this._jsRequest.addEventListener("load", flash.bindFunction(this, this._complete), false);
		
		var url = request.get_url();
		
		if (!url)
		{
			this.dispatchEvent(new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR));
			return;
		}
		
		var data = request.get_data() ? request.get_data().toString() : null;
		
		if (request.get_method() == flash.net.URLRequestMethod.GET && data)
		{
			url += "?" + data;
		}
		
		this._jsRequest.open(request.get_method(), url, true);
		
		if (this.dataFormat == flash.net.URLLoaderDataFormat.TEXT ||
			this.dataFormat == flash.net.URLLoaderDataFormat.VARIABLES)
		{
			this._jsRequest.responseType = "text";
		}
		else if (this.dataFormat == flash.net.URLLoaderDataFormat.BINARY)
		{
			this._jsRequest.responseType = "arraybuffer";
		}
		
		this._jsRequest.setRequestHeader("Content-Type", request.get_contentType());
		
		this._setHeaders();
		
		if (request.get_method() == flash.net.URLRequestMethod.GET)
		{
			this._jsRequest.send(null);
		}
		else
		{
			this._jsRequest.send(data);
		}
	};
	
	d._updateProgress = function (e)
	{
		this.bytesLoaded = e.loaded;
		this.bytesTotal = e.total;
		this.dispatchEvent(new flash.events.ProgressEvent(flash.events.ProgressEvent.PROGRESS, false, false, this.bytesLoaded, this.bytesTotal));
	}
	
	d._complete = function (e)
	{
		if (this.dataFormat == flash.net.URLLoaderDataFormat.TEXT)
		{
			this.data = this._jsRequest.responseText;
		}
		
		if (this.dataFormat == flash.net.URLLoaderDataFormat.BINARY)
		{
			this.data = this._jsRequest.response;
		}
		
		if (!this.data)
		{
			if (this._jsRequest.response)
			{
				this.data = this._jsRequest.response;
			}
			else if (this._jsRequest.responseText)
			{
				this.data = this._jsRequest.responseText;
			}
		}
		
		if (this.dataFormat == flash.net.URLLoaderDataFormat.VARIABLES)
		{
			var data = this._jsRequest.responseText.split("&");
			
			this.data = {};
			
			for (var i = 0; i < data.length; i++)
			{
				var variable = data[ i ].split("=");
				
				this.data[ variable[ 0 ] ] = variable[ 1 ];
				
			}
		}
		
		this.dispatchEvent(new flash.events.HTTPStatusEvent(flash.events.HTTPStatusEvent.HTTP_STATUS, false, false, e.status, false));
		this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE, false, false, e.status, false));
	};
	
	d._statusChange = function (e)
	{
		this.dispatchEvent(new flash.events.HTTPStatusEvent(flash.events.HTTPStatusEvent.HTTP_STATUS, false, false, e.status, false));
		
		if (this._jsRequest.readyState == 4 && this._jsRequest.status != 200)
		{
			this.dispatchEvent(new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR));
		}
	};
	
	d._setHeaders = function ()
	{
		var headers = this._request.get_requestHeaders();
		
		if (headers.length > 0)
		{
			for (var i = 0; i < headers.length; i++)
			{
				this._jsRequest.setRequestHeader(headers[ i ].header, headers[ i ].value);
			}
		}
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	
	flash.addDescription("flash.net.URLLoader", d, "flash.events.EventDispatcher", s, null);
	
}
());
