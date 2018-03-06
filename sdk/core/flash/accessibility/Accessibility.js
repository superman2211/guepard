/*class flash.accessibility.Accessibility*/
/*
import flash.display.*;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	/*public*/
	d.Accessibility = function ()
	{
		return;
		
	};
	
	
	var s = {};
	
	
	/*public*/
	s.get_active = function ()/*Boolean*/
	{
		return false;
		
	};
	
	
	/*public*/
	s.sendEvent = function (source/*DisplayObject*/, childID/*uint*/, eventType/*uint*/, nonHTML/*Boolean*/)/*void*/
	{
		childID = /*uint*/Math.floor(childID);
		eventType = /*uint*/Math.floor(eventType);
		if (nonHTML == undefined) nonHTML = false;
		
		
	};
	
	/*public*/
	s.updateProperties = function ()/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.accessibility.Accessibility", d, null, s, null);
	
}
());
