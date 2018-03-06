/*class flash.media.SoundMixer*/
/*
import flash.utils.*;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d.SoundMixer = function ()
	{
		
	};
	
	
	var s = {};
	
	s._soundTransform = null;
	
	s.__init__ = function ()
	{
		this._soundTransform = new flash.media.SoundTransform();
	}
	
	
	/*public*/
	s.get_bufferTime = function ()/*int*/
	{
		
	};
	
	/*public*/
	s.set_bufferTime = function (bufferTime/*int*/)/*void*/
	{
		
	};
	
	/*public*/
	s.get_soundTransform = function ()/*SoundTransform*/
	{
		return this._soundTransform;
	};
	
	/*public*/
	s.set_soundTransform = function (value/*SoundTransform*/)/*void*/
	{
		this._soundTransform = value;
	};
	
	
	/*public*/
	s.areSoundsInaccessible = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	s.computeSpectrum = function (outputArray/*ByteArray*/, FFTMode/*Boolean*/, stretchFactor/*int*/)/*void*/
	{
		
	};
	
	/*public*/
	s.stopAll = function ()/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.media.SoundMixer", d, null, s, null);
	
}
());
