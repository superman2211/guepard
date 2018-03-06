/*class  com.guepard.tests.Vector3D*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/d/*var*/.w/*Number*/ = 0;
	/*public*/d/*var*/.x/*Number*/ = 0;
	/*public*/d/*var*/.y/*Number*/ = 0;
	/*public*/d/*var*/.z/*Number*/ = 0;
	
	/*public*/d.get_length = function ()/*Number*/
	{
		return 0;
		
	};
	
	/*public*/d.get_lengthSquared = function ()/*Number*/
	{
		return 0;
		
	};
	
	
	/*public*/d.add = function (a/*com.guepard.tests.Vector3D*/)/*com.guepard.tests.Vector3D*/
	{
		return null;
		
	};
	
	/*public*/d.clone = function ()/*com.guepard.tests.Vector3D*/
	{
		return null;
		
	};
	
	/*public*/d.copyFrom = function (sourceVector3D/*com.guepard.tests.Vector3D*/)/*void*/
	{
		
	};
	
	/*public*/d.crossProduct = function (a/*com.guepard.tests.Vector3D*/)/*com.guepard.tests.Vector3D*/
	{
		return null;
		
	};
	
	/*public*/d.decrementBy = function (a/*com.guepard.tests.Vector3D*/)/*void*/
	{
		
	};
	
	/*public*/d.dotProduct = function (a/*com.guepard.tests.Vector3D*/)/*Number*/
	{
		return 0;
		
	};
	
	/*public*/d.equals = function (toCompare/*com.guepard.tests.Vector3D*/, allFour/*Boolean*/)/*Boolean*/
	{
		if (allFour == undefined) allFour = false;
		
		return false;
		
	};
	
	/*public*/d.incrementBy = function (a/*com.guepard.tests.Vector3D*/)/*void*/
	{
		
	};
	
	/*public*/d.nearEquals = function (toCompare/*com.guepard.tests.Vector3D*/, tolerance/*Number*/, allFour/*Boolean*/)/*Boolean*/
	{
		if (allFour == undefined) allFour = false;
		
		return false;
		
	};
	
	/*public*/d.negate = function ()/*void*/
	{
		
	};
	
	/*public*/d.normalize = function ()/*Number*/
	{
		return 0;
		
	};
	
	/*public*/d.project = function ()/*void*/
	{
		
	};
	
	/*public*/d.scaleBy = function (s/*Number*/)/*void*/
	{
		
	};
	
	/*public*/d.setTo = function (xa/*Number*/, ya/*Number*/, za/*Number*/)/*void*/
	{
		
	};
	
	/*public*/d.subtract = function (a/*com.guepard.tests.Vector3D*/)/*com.guepard.tests.Vector3D*/
	{
		return null;
		
	};
	
	/*public*/d.toString = function ()/*String*/
	{
		return "";
		
	};
	
	/*public*/d.Vector3D = function (x/*Number*/, y/*Number*/, z/*Number*/, w/*Number*/)
	{
		
		if (x == undefined) x = 0;
		if (y == undefined) y = 0;
		if (z == undefined) z = 0;
		if (w == undefined) w = 0;
		
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*public*/this/*const*/.X_AXIS/*com.guepard.tests.Vector3D*/ = new com.guepard.tests.Vector3D(1, 0, 0);
		/*public*/this/*const*/.Y_AXIS/*com.guepard.tests.Vector3D*/ = new com.guepard.tests.Vector3D(0, 1, 0);
		/*public*/this/*const*/.Z_AXIS/*com.guepard.tests.Vector3D*/ = new com.guepard.tests.Vector3D(0, 0, 1);
		
		
	};
	
	
	/*public*/s.angleBetween = function (a/*com.guepard.tests.Vector3D*/, b/*com.guepard.tests.Vector3D*/)/*Number*/
	{
		return 0;
		
	};
	
	/*public*/s.distance = function (pt1/*com.guepard.tests.Vector3D*/, pt2/*com.guepard.tests.Vector3D*/)/*Number*/
	{
		return 0;
		
	};
	
	
	
	flash.addDescription("com.guepard.tests.Vector3D", d, null, s, null, ["com.guepard.tests.Vector3D"]);
	
}
());
