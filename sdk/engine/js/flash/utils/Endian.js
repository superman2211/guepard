/// <reference path="../flash.js" />

/*class flash.utils.Endian*/
(function ()
{
	"use strict";
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.BIG_ENDIAN/*String*/ = "bigEndian";
		this.LITTLE_ENDIAN/*String*/ = "littleEndian";
		
	};
	
	flash.addDescription("flash.utils.Endian", null, null, s, null);
	
}
());
