/*class flash.media.SoundLoaderContext*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.bufferTime/*Number*/ = 1000;
	d.checkPolicyFile/*Boolean*/ = false;
	
	
	d.SoundLoaderContext = function (bufferTime/*Number*/, checkPolicyFile/*Boolean*/)
	{
		if (bufferTime == undefined) bufferTime = 1000;
		if (checkPolicyFile == undefined) checkPolicyFile = false;
		
		bufferTime = 1000;
		checkPolicyFile = false;
		this.checkPolicyFile = checkPolicyFile;
		this.bufferTime = bufferTime;
		return;
		
	};
	
	
	flash.addDescription("flash.media.SoundLoaderContext", d, null, null, null);
	
}
());
