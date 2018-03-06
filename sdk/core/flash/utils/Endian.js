/// <reference path="../flash.js" />

/*class flash.utils.Endian*/
(function ()
{
	"use strict";
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*public*/
		this/*const*/.BIG_ENDIAN/*String*/ = "bigEndian";
		/*public*/
		this/*const*/.LITTLE_ENDIAN/*String*/ = "littleEndian";
		
	};
	
	flash.addDescription("flash.utils.Endian", null, null, s, null);
	
}
());
