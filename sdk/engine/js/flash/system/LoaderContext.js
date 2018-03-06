/*class flash.system.LoaderContext*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.applicationDomain/*ApplicationDomain*/ = null;
	d.checkPolicyFile/*Boolean*/ = false;
	d.securityDomain/*SecurityDomain*/ = null;
	
	
	d.LoaderContext = function (checkPolicyFile/*Boolean*/, applicationDomain/*ApplicationDomain*/, securityDomain/*SecurityDomain*/)
	{
		if (checkPolicyFile == undefined) checkPolicyFile = false;
		if (applicationDomain == undefined) applicationDomain = null;
		if (securityDomain == undefined) securityDomain = null;
		
		this.checkPolicyFile = checkPolicyFile;
		this.applicationDomain = applicationDomain;
		this.securityDomain = securityDomain;
		
	};
	
	
	flash.addDescription("flash.system.LoaderContext", d, null, null, null);
	
}
());
