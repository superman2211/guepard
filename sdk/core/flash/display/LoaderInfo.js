/*class flash.display.LoaderInfo*/
/*
import flash.errors.IllegalOperationError;
import flash.events.*;
import flash.system.*;
import flash.utils.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._content = null;
	d._applicationDomain = null;
	
	d._actionScriptVersion = 0;
	d._swfVersion = 0;
	
	d._bytesLoaded = 0;
	d._bytesTotal = 100;
	
	d._childAllowsParent = true;
	d._parentAllowsChild = true;
	
	d._contentType = null;
	
	d._width = 0;
	d._height = 0;
	
	d._frameRate = 0;
	
	d._loader = null;
	d._loaderURL = null;
	d._url = null;
	
	d._parameters = null;
	
	/*public*/
	d.get_actionScriptVersion = function ()/*uint*/
	{
		return this._actionScriptVersion;
		
	};
	
	/*public*/
	d.get_applicationDomain = function ()/*ApplicationDomain*/
	{
		return this._applicationDomain;
		
	};
	
	/*public*/
	d.get_bytes = function ()/*ByteArray*/
	{
		return null;
		
	};
	
	/*public*/
	d.get_bytesLoaded = function ()/*uint*/
	{
		return this._bytesLoaded;
		
	};
	
	/*public*/
	d.get_bytesTotal = function ()/*uint*/
	{
		return this._bytesTotal;
		
	};
	
	/*public*/
	d.get_childAllowsParent = function ()/*Boolean*/
	{
		return this._childAllowsParent;
		
	};
	
	/*public*/
	d.get_content = function ()/*DisplayObject*/
	{
		return this._content;
		
	};
	
	d.set_content = function (value/*DisplayObject*/)
	{
		this._content = value;
		
		this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE));
	};
	
	
	/*public*/
	d.get_contentType = function ()/*String*/
	{
		return this._contentType;
		
	};
	
	/*public*/
	d.get_frameRate = function ()/*Number*/
	{
		return this._frameRate;
		
	};
	
	/*public*/
	d.get_height = function ()/*int*/
	{
		return this._height;
		
	};
	
	/*public*/
	d.get_loader = function ()/*Loader*/
	{
		return this._loader;
		
	};
	
	/*public*/
	d.get_loaderURL = function ()/*String*/
	{
		return this._loaderURL;
		
	};
	
	/*public*/
	d.get_parameters = function ()/*Object*/
	{
		return this._parameters;
		
	};
	
	/*public*/
	d.set_parameters = function (value/*Object*/)
	{
		this._parameters = value;
		
	};
	
	/*public*/
	d.get_parentAllowsChild = function ()/*Boolean*/
	{
		return this._parentAllowsChild;
		
	};
	
	/*public*/
	d.get_sameDomain = function ()/*Boolean*/
	{
		return true;
		
	};
	
	/*public*/
	d.get_sharedEvents = function ()/*EventDispatcher*/
	{
		return null;
		
	};
	
	/*public*/
	d.get_swfVersion = function ()/*uint*/
	{
		return this._swfVersion;
		
	};
	
	/*public*/
	d.get_url = function ()/*String*/
	{
		return this._url;
		
	};
	
	/*public*/
	d.get_width = function ()/*int*/
	{
		return this._width;
	};
	
	
	/*public*/
	d.LoaderInfo = function ()
	{
		this.EventDispatcher_constructor();
		
		this._parameters = {};
		
		this._applicationDomain = flash.system.ApplicationDomain.get_currentDomain();
	};
	
	/*private*/
	d._getArgs = function ()/*Object*/
	{
		return null;
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	};
	
	
	/*public*/
	s.getLoaderInfoByDefinition = function (object/*Object*/)/*LoaderInfo*/
	{
		return null;
	};
	
	
	flash.addDescription("flash.display.LoaderInfo", d, "flash.events.EventDispatcher", s, null);
	
}
());
