/*class flash.media.SoundMixer*/
/*
import flash.utils.*;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.SoundMixer = function ()
	{
		
	};
	
	
	var s = {};
	
	s._soundTransform = null;
	
	s.__init__ = function ()
	{
		this._soundTransform = new flash.media.SoundTransform();
	}
	
	
	s.get_bufferTime = function ()/*int*/
	{
		
	};
	
	s.set_bufferTime = function (bufferTime/*int*/)/*void*/
	{
		
	};
	
	s.get_soundTransform = function ()/*SoundTransform*/
	{
		return this._soundTransform;
	};
	
	s.set_soundTransform = function (value/*SoundTransform*/)/*void*/
	{
		this._soundTransform = value;
	};
	
	
	s.areSoundsInaccessible = function ()/*Boolean*/
	{
		
	};
	
	s.computeSpectrum = function (outputArray/*ByteArray*/, FFTMode/*Boolean*/, stretchFactor/*int*/)/*void*/
	{
		
	};
	
	s.stopAll = function ()/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.media.SoundMixer", d, null, s, null);
	
}
());
