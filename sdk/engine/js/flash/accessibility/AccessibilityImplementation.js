/*class flash.accessibility.AccessibilityImplementation*/
/*
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.errno/*uint*/ = 0;
	d.stub/*Boolean*/ = false;
	
	
	d.AccessibilityImplementation = function ()
	{
		this.stub = false;
		this.errno = 0;
		return;
		
	};
	
	d.accDoDefaultAction = function (childID/*uint*/)/*void*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return;
		
	};
	
	d.accLocation = function (childID/*uint*/)/*Object*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return null;
		
	};
	
	d.accSelect = function (operation/*uint*/, childID/*uint*/)/*void*/
	{
		operation = /*uint*/Math.floor(operation);
		childID = /*uint*/Math.floor(childID);
		
		return;
		
	};
	
	d.getChildIDArray = function ()/*Array*/
	{
		return null;
		
	};
	
	d.get_accDefaultAction = function (childID/*uint*/)/*String*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return null;
		
	};
	
	d.get_accFocus = function ()/*uint*/
	{
		return 0;
		
	};
	
	d.get_accName = function (childID/*uint*/)/*String*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return null;
		
	};
	
	d.get_accRole = function (childID/*uint*/)/*uint*/
	{
		childID = /*uint*/Math.floor(childID);
		
		throw new Error(2143);
		return 0;
		
	};
	
	d.get_accSelection = function ()/*Array*/
	{
		return null;
		
	};
	
	d.get_accState = function (childID/*uint*/)/*uint*/
	{
		childID = /*uint*/Math.floor(childID);
		
		throw new Error(2144);
		return 0;
		
	};
	
	d.get_accValue = function (childID/*uint*/)/*String*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return null;
		
	};
	
	d.isLabeledBy = function (labelBounds/*Rectangle*/)/*Boolean*/
	{
		return false;
		
	};
	
	
	flash.addDescription("flash.accessibility.AccessibilityImplementation", d, null, null, null);
	
}
());
