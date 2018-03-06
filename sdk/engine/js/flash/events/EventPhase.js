/*class flash.events.EventPhase*/
(function ()
{
	"use strict";
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.AT_TARGET/*uint*/ = 2;
		this.BUBBLING_PHASE/*uint*/ = 3;
		this.CAPTURING_PHASE/*uint*/ = 1;
		
	};
	
	
	flash.addDescription("flash.events.EventPhase", null, null, s, null);
	
}
());
