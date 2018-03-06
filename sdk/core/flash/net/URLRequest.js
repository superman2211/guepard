/*class flash.net.URLRequest*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._contentType = 'application/x-www-form-urlencoded';
	d._data = null;//{};
	d._method = "get";
	d._headers = null;//[];
	d._url = null;
	
	/*public*/
	d.get_contentType = function ()/*String*/
	{
		return this._contentType;
		
	};
	
	/*public*/
	d.set_contentType = function (value/*String*/)/*void*/
	{
		this._contentType = value;
		
		return value;
	};
	
	/*public*/
	d.get_data = function ()/*Object*/
	{
		return this._data;
		
	};
	
	/*public*/
	d.set_data = function (value/*Object*/)/*void*/
	{
		this._data = value;
		
		return value;
	};
	
	/*public*/
	d.get_digest = function ()/*String*/
	{
		return null;
		
	};
	
	/*public*/
	d.set_digest = function (value/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_method = function ()/*String*/
	{
		return this._method;
		
	};
	
	/*public*/
	d.set_method = function (value/*String*/)/*void*/
	{
		this._method = value;
		
		return value;
	};
	
	/*public*/
	d.get_requestHeaders = function ()/*Array*/
	{
		return this._headers;
		
	};
	
	/*public*/
	d.set_requestHeaders = function (value/*Array*/)/*void*/
	{
		this._headers = value;
		
		return value;
	};
	
	/*public*/
	d.get_url = function ()/*String*/
	{
		return this._url;
		
	};
	
	/*public*/
	d.set_url = function (value/*String*/)/*void*/
	{
		this._url = value;
		
		return value;
	};
	
	/*public*/
	d.get_name = function ()/*String*/
	{
		if (!this._url) return null;
		
		var base = this._url.split("?");
		
		var parts = base[ 0 ].split("/");
		
		var name = parts[ parts.length - 1 ];
		
		return name.split(".")[ 0 ];
	};
	
	/*public*/
	d.get_extension = function ()/*String*/
	{
		if (!this._url) return null;
		
		var base = this._url.split("?");
		
		var parts = base[ 0 ].split(".");
		
		var name = parts[ parts.length - 1 ].split(".");
		
		return name[ 0 ];
	};
	
	/*public*/
	d.set_extension = function (value/*String*/)
	{
		if (!this._url) return;
		
		var base = this._url.split("?");
		
		var parts = base[ 0 ].split(".");
		
		parts[ parts.length - 1 ] = value;
		
		this._url = parts.join(".") + (base.length > 1 ? "?" + base[ 1 ] : "");
	};
	
	/*public*/
	d.URLRequest = function (url/*String*/)
	{
		this._data = null;
		this._headers = [];
		
		if (url)
		{
			this.set_url(url);
		}
	};
	
	
	flash.addDescription("flash.net.URLRequest", d, null, null, null);
	
}
());
