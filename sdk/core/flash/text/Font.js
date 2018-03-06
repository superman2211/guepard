/*class flash.text.Font*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._fontName = "";
	d._fontType = "";
	d._fontStyle = "";
	d._glyphs = "";
	
	d._path = "";
	d._id = "";
	d._loaded = false;
	
	/*public*/
	d.get_fontName = function ()/*String*/
	{
		return this._fontName;
	};
	
	/*public*/
	d.get_fontStyle = function ()/*String*/
	{
		return this._fontStyle;
	};
	
	/*public*/
	d.get_fontType = function ()/*String*/
	{
		return this._fontType;
	};
	
	
	/*public*/
	d.Font = function ()
	{
		flash.system.ApplicationDomain.get_currentDomain()._embedFonts.push(this)
		
		
	};
	
	/*public*/
	d.hasGlyphs = function (str/*String*/)/*Boolean*/
	{
		
	};
	
	var s = {};
	
	/*public*/
	s.enumerateFonts = function (enumerateDeviceFonts/*Boolean*/)/*Array*/
	{
		return flash.system.ApplicationDomain.get_currentDomain()._embedFonts
	};
	
	/*public*/
	s.registerFont = function (font/*Class*/)/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.text.Font", d, null, s, null);
}
());
