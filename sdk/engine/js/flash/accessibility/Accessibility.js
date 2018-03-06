/*class flash.accessibility.Accessibility*/
/*
import flash.display.*;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	d.Accessibility = function ()
	{
		return;
		
	};
	
	
	var s = {};
	
	
	s.get_active = function ()/*Boolean*/
	{
		return false;
		
	};
	
	
	s.sendEvent = function (source/*DisplayObject*/, childID/*uint*/, eventType/*uint*/, nonHTML/*Boolean*/)/*void*/
	{
		childID = /*uint*/Math.floor(childID);
		eventType = /*uint*/Math.floor(eventType);
		if (nonHTML == undefined) nonHTML = false;
		
		
	};
	
	s.updateProperties = function ()/*void*/
	{
		
	};
	
	
	flash.addDescription("flash.accessibility.Accessibility", d, null, s, null);
	
}
());
