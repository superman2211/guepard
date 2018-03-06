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
		
		return value;
	};
	
	
	d.SoundChannel = function ()
	{
		this.EventDispatcher_constructor();
		
	};
	
	d.stop = function ()/*void*/
	{
		
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
