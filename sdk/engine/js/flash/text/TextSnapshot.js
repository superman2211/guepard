/*class flash.text.TextSnapshot*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	d.get_charCount = function ()/*int*/
	{
		return 0;
		
	};
	
	
	d.TextSnapshot = function ()
	{
		return;
		
	};
	
	d.findText = function (beginIndex/*int*/, textToFind/*String*/, caseSensitive/*Boolean*/)/*int*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		
		return 0;
		
	};
	
	d.getSelected = function (beginIndex/*int*/, endIndex/*int*/)/*Boolean*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		
		return false;
		
	};
	
	d.getSelectedText = function (includeLineEndings/*Boolean*/)/*String*/
	{
		if (includeLineEndings == undefined) includeLineEndings = false;
		
		return null;
		
	};
	
	d.getText = function (beginIndex/*int*/, endIndex/*int*/, includeLineEndings/*Boolean*/)/*String*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		if (includeLineEndings == undefined) includeLineEndings = false;
		
		return null;
		
	};
	
	d.getTextRunInfo = function (beginIndex/*int*/, endIndex/*int*/)/*Array*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		
		return null;
		
	};
	
	d.hitTestTextNearPos = function (x/*Number*/, y/*Number*/, maxDistance/*Number*/)/*Number*/
	{
		if (maxDistance == undefined) maxDistance = 0;
		
		return 0;
		
	};
	
	d.setSelectColor = function (hexColor/*uint*/)/*void*/
	{
		if (hexColor == undefined) hexColor = 16776960;
		hexColor = /*uint*/Math.floor(hexColor);
		
		
	};
	
	d.setSelected = function (beginIndex/*int*/, endIndex/*int*/, select/*Boolean*/)/*void*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		
		
	};
	
	
	flash.addDescription("flash.text.TextSnapshot", d, null, null, null);
	
}
());
