/*class flash.accessibility.AccessibilityImplementation*/
/*
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.errno/*uint*/ = 0;
	/*public*/
	d/*var*/.stub/*Boolean*/ = false;
	
	
	/*public*/
	d.AccessibilityImplementation = function ()
	{
		this.stub = false;
		this.errno = 0;
		return;
		
	};
	
	/*public*/
	d.accDoDefaultAction = function (childID/*uint*/)/*void*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return;
		
	};
	
	/*public*/
	d.accLocation = function (childID/*uint*/)/*Object*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return null;
		
	};
	
	/*public*/
	d.accSelect = function (operation/*uint*/, childID/*uint*/)/*void*/
	{
		operation = /*uint*/Math.floor(operation);
		childID = /*uint*/Math.floor(childID);
		
		return;
		
	};
	
	/*public*/
	d.getChildIDArray = function ()/*Array*/
	{
		return null;
		
	};
	
	/*public*/
	d.get_accDefaultAction = function (childID/*uint*/)/*String*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return null;
		
	};
	
	/*public*/
	d.get_accFocus = function ()/*uint*/
	{
		return 0;
		
	};
	
	/*public*/
	d.get_accName = function (childID/*uint*/)/*String*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return null;
		
	};
	
	/*public*/
	d.get_accRole = function (childID/*uint*/)/*uint*/
	{
		childID = /*uint*/Math.floor(childID);
		
		throw new Error(2143);
		return 0;
		
	};
	
	/*public*/
	d.get_accSelection = function ()/*Array*/
	{
		return null;
		
	};
	
	/*public*/
	d.get_accState = function (childID/*uint*/)/*uint*/
	{
		childID = /*uint*/Math.floor(childID);
		
		throw new Error(2144);
		return 0;
		
	};
	
	/*public*/
	d.get_accValue = function (childID/*uint*/)/*String*/
	{
		childID = /*uint*/Math.floor(childID);
		
		return null;
		
	};
	
	/*public*/
	d.isLabeledBy = function (labelBounds/*Rectangle*/)/*Boolean*/
	{
		return false;
		
	};
	
	
	flash.addDescription("flash.accessibility.AccessibilityImplementation", d, null, null, null);
	
}
());
