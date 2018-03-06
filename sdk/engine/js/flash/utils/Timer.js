/*class flash.utils.Timer*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._delay/*Number*/ = 0;
	d._iteration/*int*/ = 0;
	d._repeatCount/*int*/ = 0;
	d._intervalID/*int*/ = -1;
	
	d.get_currentCount = function ()/*int*/
	{
		return this._iteration;
		
	};
	
	d.get_delay = function ()/*Number*/
	{
		return this._delay;
		
	};
	
	d.set_delay = function (value/*Number*/)/*void*/
	{
		this._delay = value;
		
		if (this.get_running())
		{
			this.stop();
			this.start();
		}
		
		return value;
	};
	
	d.get_repeatCount = function ()/*int*/
	{
		return this._repeatCount;
	};
	
	d.set_repeatCount = function (value/*int*/)/*void*/
	{
		value = /*int*/Math.floor(value);
		
		this._repeatCount = value;
		
		if (this._iteration >= this._repeatCount)
		{
			this.stop();
		}
		
		return value;
	};
	
	d.get_running = function ()/*Boolean*/
	{
		return this._intervalID != -1;
	};
	
	d.Timer = function (delay/*Number*/, repeatCount/*int*/)
	{
		this.EventDispatcher_constructor();
		
		if (repeatCount == undefined) repeatCount = 0;
		repeatCount = /*int*/Math.floor(repeatCount);
		
		this._delay = delay;
		this._repeatCount = repeatCount;
	};
	
	d.reset = function ()/*void*/
	{
		if (this.get_running())
		{
			this.stop();
		}
		
		this._iteration = 0;
	};
	
	d.start = function ()/*void*/
	{
		if (!this.get_running())
		{
			this._intervalID = window.setInterval(flash.bindFunction(this, this._tick), this._delay);
		}
	};
	
	d.stop = function ()/*void*/
	{
		if (this._intervalID != -1)
		{
			window.clearInterval(this._intervalID);
			
			this._intervalID = -1;
		}
	};
	
	d._tick = function ()/*void*/
	{
		this._iteration++;
		
		this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER, false, false));
		
		if (this._repeatCount && this._iteration >= this._repeatCount)
		{
			this.stop();
			this.dispatchEvent(new flash.events.TimerEvent(flash.events.TimerEvent.TIMER_COMPLETE, false, false));
		}
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.utils.Timer", d, "flash.events.EventDispatcher", s, null);
}
());
