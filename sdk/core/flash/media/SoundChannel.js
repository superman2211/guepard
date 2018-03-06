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
	
	/*public*/
	d.get_leftPeak = function ()/*Number*/
	{
		return this._leftPeak;
	};
	
	/*public*/
	d.get_position = function ()/*Number*/
	{
		return this._position;
	};
	
	/*public*/
	d.get_rightPeak = function ()/*Number*/
	{
		return this._rightPeak;
	};
	
	/*public*/
	d.get_soundTransform = function ()/*SoundTransform*/
	{
		return this._transform;
	};
	
	/*public*/
	d.set_soundTransform = function (value/*SoundTransform*/)/*void*/
	{
		this._transform = value;
		
		return value;
	};
	
	
	/*public*/
	d.SoundChannel = function ()
	{
		this.EventDispatcher_constructor();
		
	};
	
	/*public*/
	d.stop = function ()/*void*/
	{
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	flash.addDescription("flash.media.SoundChannel", d, "flash.events.EventDispatcher", s, null);
	
}
());
