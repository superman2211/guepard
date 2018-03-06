/*class flash.net.FileFilter*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	/*public*/
	d.get_description = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.set_description = function (value/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_extension = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.set_extension = function (value/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_macType = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.set_macType = function (value/*String*/)/*void*/
	{
		
	};
	
	
	/*public*/
	d.FileFilter = function (description/*String*/, extension/*String*/, macType/*String*/)
	{
		if (macType == undefined) macType = null;
		
		this.set_description(description);
		this.set_extension(extension);
		this.set_macType(macType);
		return;
		
	};
	
	
	flash.addDescription("flash.net.FileFilter", d, null, null, null);
	
}
());
