/*class  flash.geom.Vector3D*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.w/*Number*/ = 0;
	d.x/*Number*/ = 0;
	d.y/*Number*/ = 0;
	d.z/*Number*/ = 0;
	
	d.get_length = function ()/*Number*/
	{
		return 0;
		
	};
	
	d.get_lengthSquared = function ()/*Number*/
	{
		return 0;
		
	};
	
	
	d.add = function (a/*flash.geom.Vector3D*/)/*flash.geom.Vector3D*/
	{
		return null;
		
	};
	
	d.clone = function ()/*flash.geom.Vector3D*/
	{
		return null;
		
	};
	
	d.copyFrom = function (sourceVector3D/*flash.geom.Vector3D*/)/*void*/
	{
		
	};
	
	d.crossProduct = function (a/*flash.geom.Vector3D*/)/*flash.geom.Vector3D*/
	{
		return null;
		
	};
	
	d.decrementBy = function (a/*flash.geom.Vector3D*/)/*void*/
	{
		
	};
	
	d.dotProduct = function (a/*flash.geom.Vector3D*/)/*Number*/
	{
		return 0;
		
	};
	
	d.equals = function (toCompare/*flash.geom.Vector3D*/, allFour/*Boolean*/)/*Boolean*/
	{
		if (allFour == undefined) allFour = false;
		
		return false;
		
	};
	
	d.incrementBy = function (a/*flash.geom.Vector3D*/)/*void*/
	{
		
	};
	
	d.nearEquals = function (toCompare/*flash.geom.Vector3D*/, tolerance/*Number*/, allFour/*Boolean*/)/*Boolean*/
	{
		if (allFour == undefined) allFour = false;
		
		return false;
		
	};
	
	d.negate = function ()/*void*/
	{
		
	};
	
	d.normalize = function ()/*Number*/
	{
		return 0;
		
	};
	
	d.project = function ()/*void*/
	{
		
	};
	
	d.scaleBy = function (s/*Number*/)/*void*/
	{
		
	};
	
	d.setTo = function (xa/*Number*/, ya/*Number*/, za/*Number*/)/*void*/
	{
		
	};
	
	d.subtract = function (a/*flash.geom.Vector3D*/)/*flash.geom.Vector3D*/
	{
		return null;
		
	};
	
	d.toString = function ()/*String*/
	{
		return "";
		
	};
	
	d.Vector3D = function (x/*Number*/, y/*Number*/, z/*Number*/, w/*Number*/)
	{
		
		if (x == undefined) x = 0;
		if (y == undefined) y = 0;
		if (z == undefined) z = 0;
		if (w == undefined) w = 0;
		
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.X_AXIS/*flash.geom.Vector3D*/ = new flash.geom.Vector3D(1, 0, 0);
		this.Y_AXIS/*flash.geom.Vector3D*/ = new flash.geom.Vector3D(0, 1, 0);
		this.Z_AXIS/*flash.geom.Vector3D*/ = new flash.geom.Vector3D(0, 0, 1);
		
		
	};
	
	
	s.angleBetween = function (a/*flash.geom.Vector3D*/, b/*flash.geom.Vector3D*/)/*Number*/
	{
		return 0;
		
	};
	
	s.distance = function (pt1/*flash.geom.Vector3D*/, pt2/*flash.geom.Vector3D*/)/*Number*/
	{
		return 0;
		
	};
	
	
	flash.addDescription("flash.geom.Vector3D", d, null, s, null, [ "flash.geom.Vector3D" ]);
	
}
());
