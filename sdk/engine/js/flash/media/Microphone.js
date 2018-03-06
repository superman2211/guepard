/*class flash.media.Microphone*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.get_activityLevel = function ()/*Number*/
	{
		
	};
	
	d.get_gain = function ()/*Number*/
	{
		
	};
	
	d.set_gain = function (gain/*Number*/)/*void*/
	{
		
	};
	
	d.get_index = function ()/*int*/
	{
		
	};
	
	d.get_muted = function ()/*Boolean*/
	{
		
	};
	
	d.get_name = function ()/*String*/
	{
		
	};
	
	d.get_rate = function ()/*int*/
	{
		
	};
	
	d.set_rate = function (rate/*int*/)/*void*/
	{
		
	};
	
	d.get_silenceLevel = function ()/*Number*/
	{
		
	};
	
	d.get_silenceTimeout = function ()/*int*/
	{
		
	};
	
	d.get_soundTransform = function ()/*SoundTransform*/
	{
		
	};
	
	d.set_soundTransform = function (sndTransform/*SoundTransform*/)/*void*/
	{
		
	};
	
	d.get_useEchoSuppression = function ()/*Boolean*/
	{
		
	};
	
	
	d.Microphone = function ()
	{
		this.EventDispatcher_constructor();
		return;
		
	};
	
	d.setLoopBack = function (state/*Boolean*/)/*void*/
	{
		
	};
	
	d.setSilenceLevel = function (silenceLevel/*Number*/, timeout/*int*/)/*void*/
	{
		
	};
	
	d.setUseEchoSuppression = function (useEchoSuppression/*Boolean*/)/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	s.get_names = function ()/*Array*/
	{
		
	};
	
	
	s.getMicrophone = function (index/*int*/)/*Microphone*/
	{
		
	};
	
	
	flash.addDescription("flash.media.Microphone", d, "flash.events.EventDispatcher", s, null);
	
}
());
