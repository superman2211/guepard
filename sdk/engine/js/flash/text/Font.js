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
	
	d.get_fontName = function ()/*String*/
	{
		return this._fontName;
	};
	
	d.get_fontStyle = function ()/*String*/
	{
		return this._fontStyle;
	};
	
	d.get_fontType = function ()/*String*/
	{
		return this._fontType;
	};
	
	
	d.Font = function ()
	{
		flash.system.ApplicationDomain.get_currentDomain()._embedFonts.push(this)
		
		
	};
	
	d.hasGlyphs = function (str/*String*/)/*Boolean*/
	{
		
	};
	
	var s = {};
	
	s.enumerateFonts = function (enumerateDeviceFonts/*Boolean*/)/*Array*/
	{
		return flash.system.ApplicationDomain.get_currentDomain()._embedFonts
	};
	
	s.registerFont = function (font/*Class*/)/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.text.Font", d, null, s, null);
}
());
