/*class flash.media.Sound*/
/*
import flash.events.*;
import flash.net.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._audio = null;
	d._soundChannel = null;
	
	/*public*/
	d.get_bytesLoaded = function ()/*uint*/
	{
		return 0;
	};
	
	/*public*/
	d.get_bytesTotal = function ()/*int*/
	{
		return 0;
	};
	
	/*public*/
	d.get_id3 = function ()/*ID3Info*/
	{
		return null;
	};
	
	/*public*/
	d.get_isBuffering = function ()/*Boolean*/
	{
		return false;
	};
	
	/*public*/
	d.get_length = function ()/*Number*/
	{
		return 0;
	};
	
	/*public*/
	d.get_url = function ()/*String*/
	{
		return null;
	};
	
	
	/*public*/
	d.Sound = function (stream/*URLRequest*/, context/*SoundLoaderContext*/)
	{
		this.EventDispatcher_constructor();
		
		if (stream == undefined) stream = null;
		if (context == undefined) context = null;
		
		this.load(stream, context);
		
		this._soundChannel = new flash.media.SoundChannel();
		
		flash.linkage(this, flash.media.Sound);
	};
	
	/*public*/
	d.close = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.load = function (stream/*URLRequest*/, context/*SoundLoaderContext*/)/*void*/
	{
		if (context == undefined) context = null;
		
	};
	
	/*public*/
	d.play = function (startTime/*Number*/, loops/*int*/, sndTransform/*SoundTransform*/)/*SoundChannel*/
	{
		if (this._audio)
		{
			this._audio.play();
		}
		
		return this._soundChannel;
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	flash.addDescription("flash.media.Sound", d, "flash.events.EventDispatcher", s, null);
	
}
());
