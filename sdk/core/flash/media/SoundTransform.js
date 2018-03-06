/*class flash.media.SoundTransform*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._volume = 1;
	d._pan = 0;
	
	
	/*public*/
	d.get_leftToLeft = function ()/*Number*/
	{
		return 0;
		
	};
	
	/*public*/
	d.set_leftToLeft = function (leftToLeft/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_leftToRight = function ()/*Number*/
	{
		return 0;
		
	};
	
	/*public*/
	d.set_leftToRight = function (leftToRight/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_pan = function ()/*Number*/
	{
		return this._pan;
		
	};
	
	/*public*/
	d.set_pan = function (panning/*Number*/)/*void*/
	{
		this._pan = panning;
		
		return panning;
	};
	
	/*public*/
	d.get_rightToLeft = function ()/*Number*/
	{
		return 0;
		
	};
	
	/*public*/
	d.set_rightToLeft = function (rightToLeft/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_rightToRight = function ()/*Number*/
	{
		return 0;
		
	};
	
	/*public*/
	d.set_rightToRight = function (rightToRight/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_volume = function ()/*Number*/
	{
		return this._volume;
		
	};
	
	/*public*/
	d.set_volume = function (volume/*Number*/)/*void*/
	{
		this._volume = volume;
		
		return volume;
	};
	
	
	/*public*/
	d.SoundTransform = function (volume/*Number*/, panning/*Number*/)
	{
		if (volume == undefined) volume = 1;
		if (panning == undefined) panning = 0;
		
		this.set_volume(volume);
		this.set_pan(panning);
		
	};
	
	flash.addDescription("flash.media.SoundTransform", d, null, null, null);
	
}
());
