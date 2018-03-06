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
	
	d.get_contentType = function ()/*String*/
	{
		return this._contentType;
		
	};
	
	d.set_contentType = function (value/*String*/)/*void*/
	{
		this._contentType = value;
		
		return value;
	};
	
	d.get_data = function ()/*Object*/
	{
		return this._data;
		
	};
	
	d.set_data = function (value/*Object*/)/*void*/
	{
		this._data = value;
		
		return value;
	};
	
	d.get_digest = function ()/*String*/
	{
		return null;
		
	};
	
	d.set_digest = function (value/*String*/)/*void*/
	{
		
	};
	
	d.get_method = function ()/*String*/
	{
		return this._method;
		
	};
	
	d.set_method = function (value/*String*/)/*void*/
	{
		this._method = value;
		
		return value;
	};
	
	d.get_requestHeaders = function ()/*Array*/
	{
		return this._headers;
		
	};
	
	d.set_requestHeaders = function (value/*Array*/)/*void*/
	{
		this._headers = value;
		
		return value;
	};
	
	d.get_url = function ()/*String*/
	{
		return this._url;
		
	};
	
	d.set_url = function (value/*String*/)/*void*/
	{
		this._url = value;
		
		return value;
	};
	
	d.get_name = function ()/*String*/
	{
		if (!this._url) return null;
		
		var base = this._url.split("?");
		
		var parts = base[ 0 ].split("/");
		
		var name = parts[ parts.length - 1 ];
		
		return name.split(".")[ 0 ];
	};
	
	d.get_extension = function ()/*String*/
	{
		if (!this._url) return null;
		
		var base = this._url.split("?");
		
		var parts = base[ 0 ].split(".");
		
		var name = parts[ parts.length - 1 ].split(".");
		
		return name[ 0 ];
	};
	
	d.set_extension = function (value/*String*/)
	{
		if (!this._url) return;
		
		var base = this._url.split("?");
		
		var parts = base[ 0 ].split(".");
		
		parts[ parts.length - 1 ] = value;
		
		this._url = parts.join(".") + (base.length > 1 ? "?" + base[ 1 ] : "");
	};
	
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
