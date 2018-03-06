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
	
	d.get_bytesLoaded = function ()/*uint*/
	{
		return 0;
	};
	
	d.get_bytesTotal = function ()/*int*/
	{
		return 0;
	};
	
	d.get_id3 = function ()/*ID3Info*/
	{
		return null;
	};
	
	d.get_isBuffering = function ()/*Boolean*/
	{
		return false;
	};
	
	d.get_length = function ()/*Number*/
	{
		return 0;
	};
	
	d.get_url = function ()/*String*/
	{
		return null;
	};
	
	
	d.Sound = function (stream/*URLRequest*/, context/*SoundLoaderContext*/)
	{
		this.EventDispatcher_constructor();
		
		if (stream == undefined) stream = null;
		if (context == undefined) context = null;
		
		this.load(stream, context);
		
		this._soundChannel = new flash.media.SoundChannel();
		
		flash.linkage(this, flash.media.Sound);
	};
	
	d.close = function ()/*void*/
	{
		
	};
	
	d.load = function (stream/*URLRequest*/, context/*SoundLoaderContext*/)/*void*/
	{
		if (context == undefined) context = null;
		
	};
	
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
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	flash.addDescription("flash.media.Sound", d, "flash.events.EventDispatcher", s, null);
	
}
());
