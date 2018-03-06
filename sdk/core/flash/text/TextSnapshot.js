/*class flash.text.TextSnapshot*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	/*public*/
	d.get_charCount = function ()/*int*/
	{
		return 0;
		
	};
	
	
	/*public*/
	d.TextSnapshot = function ()
	{
		return;
		
	};
	
	/*public*/
	d.findText = function (beginIndex/*int*/, textToFind/*String*/, caseSensitive/*Boolean*/)/*int*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		
		return 0;
		
	};
	
	/*public*/
	d.getSelected = function (beginIndex/*int*/, endIndex/*int*/)/*Boolean*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		
		return false;
		
	};
	
	/*public*/
	d.getSelectedText = function (includeLineEndings/*Boolean*/)/*String*/
	{
		if (includeLineEndings == undefined) includeLineEndings = false;
		
		return null;
		
	};
	
	/*public*/
	d.getText = function (beginIndex/*int*/, endIndex/*int*/, includeLineEndings/*Boolean*/)/*String*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		if (includeLineEndings == undefined) includeLineEndings = false;
		
		return null;
		
	};
	
	/*public*/
	d.getTextRunInfo = function (beginIndex/*int*/, endIndex/*int*/)/*Array*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		
		return null;
		
	};
	
	/*public*/
	d.hitTestTextNearPos = function (x/*Number*/, y/*Number*/, maxDistance/*Number*/)/*Number*/
	{
		if (maxDistance == undefined) maxDistance = 0;
		
		return 0;
		
	};
	
	/*public*/
	d.setSelectColor = function (hexColor/*uint*/)/*void*/
	{
		if (hexColor == undefined) hexColor = 16776960;
		hexColor = /*uint*/Math.floor(hexColor);
		
		
	};
	
	/*public*/
	d.setSelected = function (beginIndex/*int*/, endIndex/*int*/, select/*Boolean*/)/*void*/
	{
		beginIndex = /*int*/Math.floor(beginIndex);
		endIndex = /*int*/Math.floor(endIndex);
		
		
	};
	
	
	flash.addDescription("flash.text.TextSnapshot", d, null, null, null);
	
}
());
