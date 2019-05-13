/*class flash.media.SoundChannel*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._leftPeak = 0;
	d._rightPeak = 0;
	d._position = 0;
	d._transform = null;
	d._sound = null;
	
	d.get_leftPeak = function ()/*Number*/
	{
		return this._leftPeak;
	};
	
	d.get_position = function ()/*Number*/
	{
		if(this._sound && this._sound._audio)
		{
			return this._sound._audio.currentTime;
		}
		return this._position;
	};
	
	d.get_rightPeak = function ()/*Number*/
	{
		return this._rightPeak;
	};
	
	d.get_soundTransform = function ()/*SoundTransform*/
	{
		return this._transform;
	};
	
	d.set_soundTransform = function (value/*SoundTransform*/)/*void*/
	{
		this._transform = value;

		if(this._sound && this._sound._audio)
		{
			this._sound._audio.volume = this._transform.get_volume();
		}
		
		return value;
	};
	
	
	d.SoundChannel = function (sound/*Sound*/)
	{
		this.EventDispatcher_constructor();

		this._sound = sound;
	};
	
	d.stop = function ()/*void*/
	{
		if(this._sound && this._sound._audio)
		{
			this._sound._audio.pause();
		}
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	flash.addDescription("flash.media.SoundChannel", d, "flash.events.EventDispatcher", s, null);
	
}
());
