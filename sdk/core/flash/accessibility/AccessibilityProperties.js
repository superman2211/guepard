/*class flash.accessibility.AccessibilityProperties*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.description/*String*/ = null;
	/*public*/
	d/*var*/.forceSimple/*Boolean*/ = false;
	/*public*/
	d/*var*/.name/*String*/ = null;
	/*public*/
	d/*var*/.noAutoLabeling/*Boolean*/ = false;
	/*public*/
	d/*var*/.shortcut/*String*/ = null;
	/*public*/
	d/*var*/.silent/*Boolean*/ = false;
	
	
	/*public*/
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
