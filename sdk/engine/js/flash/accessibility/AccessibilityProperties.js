/*class flash.accessibility.AccessibilityProperties*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.description/*String*/ = null;
	d.forceSimple/*Boolean*/ = false;
	d.name/*String*/ = null;
	d.noAutoLabeling/*Boolean*/ = false;
	d.shortcut/*String*/ = null;
	d.silent/*Boolean*/ = false;
	
	
	d.AccessibilityProperties = function ()
	{
		this.name = "";
		this.description = "";
		this.shortcut = "";
		this.silent = false;
		this.forceSimple = false;
		this.noAutoLabeling = false;
		
	};
	
	
	flash.addDescription("flash.accessibility.AccessibilityProperties", d, null, null, null);
	
}
());
