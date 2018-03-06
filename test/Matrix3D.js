/*class  com.guepard.tests.Matrix3D*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/d.get_determinant = function ()/*Number*/
	{
		return 0;
		
	};
	
	/*public*/d.get_position = function ()/*com.guepard.tests.Vector3D*/
	{
		return null;
		
	};
	
	/*public*/d.set_position = function (pos/*com.guepard.tests.Vector3D*/)/*void*/
	{
		
	};
	
	/*public*/d.get_rawData = function ()/*Vector.<Number>*/
	{
		return null;
		
	};
	
	/*public*/d.set_rawData = function (v/*Vector.<Number>*/)/*void*/
	{
		
	};
	
	
	/*public*/d.append = function (lhs/*com.guepard.tests.Matrix3D*/)/*void*/
	{
		
	};
	
	/*public*/d.appendRotation = function (degrees/*Number*/, axis/*com.guepard.tests.Vector3D*/, pivotPoint/*com.guepard.tests.Vector3D*/)/*void*/
	{
		if (pivotPoint == undefined) pivotPoint = null;
		
		
	};
	
	/*public*/d.appendScale = function (xScale/*Number*/, yScale/*Number*/, zScale/*Number*/)/*void*/
	{
		
	};
	
	/*public*/d.appendTranslation = function (x/*Number*/, y/*Number*/, z/*Number*/)/*void*/
	{
		
	};
	
	/*public*/d.clone = function ()/*com.guepard.tests.Matrix3D*/
	{
		return null;
		
	};
	
	/*public*/d.copyColumnFrom = function (column/*uint*/, vector3D/*com.guepard.tests.Vector3D*/)/*void*/
	{
		column = /*uint*/flash.uint(column);
		
		
	};
	
	/*public*/d.copyColumnTo = function (column/*uint*/, vector3D/*com.guepard.tests.Vector3D*/)/*void*/
	{
		column = /*uint*/flash.uint(column);
		
		
	};
	
	/*public*/d.copyFrom = function (sourceMatrix3D/*com.guepard.tests.Matrix3D*/)/*void*/
	{
		
	};
	
	/*public*/d.copyRawDataFrom = function (vector/*Vector.<Number>*/, index/*uint*/, transpose/*Boolean*/)/*void*/
	{
		if (index == undefined) index = 0;
		index = /*uint*/flash.uint(index);
		if (transpose == undefined) transpose = false;
		
		
	};
	
	/*public*/d.copyRawDataTo = function (vector/*Vector.<Number>*/, index/*uint*/, transpose/*Boolean*/)/*void*/
	{
		if (index == undefined) index = 0;
		index = /*uint*/flash.uint(index);
		if (transpose == undefined) transpose = false;
		
		
	};
	
	/*public*/d.copyRowFrom = function (row/*uint*/, vector3D/*com.guepard.tests.Vector3D*/)/*void*/
	{
		row = /*uint*/flash.uint(row);
		
		
	};
	
	/*public*/d.copyRowTo = function (row/*uint*/, vector3D/*com.guepard.tests.Vector3D*/)/*void*/
	{
		row = /*uint*/flash.uint(row);
		
		
	};
	
	/*public*/d.copyToMatrix3D = function (dest/*com.guepard.tests.Matrix3D*/)/*void*/
	{
		
	};
	
	/*public*/d.decompose = function (orientationStyle/*String*/)/*Vector.<com.guepard.tests.Vector3D>*/
	{
		if (orientationStyle == undefined) orientationStyle = "eulerAngles";
		
		return null;
		
	};
	
	/*public*/d.deltaTransformVector = function (v/*com.guepard.tests.Vector3D*/)/*com.guepard.tests.Vector3D*/
	{
		return null;
		
	};
	
	/*public*/d.identity = function ()/*void*/
	{
		
	};
	
	/*public*/d.interpolateTo = function (toMat/*com.guepard.tests.Matrix3D*/, percent/*Number*/)/*void*/
	{
		
	};
	
	/*public*/d.invert = function ()/*Boolean*/
	{
		return null;
		
	};
	
	/*public*/d.Matrix3D = function (v/*Vector.<Number>*/)
	{
		
		if (v == undefined) v = null;
		
		
	};
	
	/*public*/d.pointAt = function (pos/*com.guepard.tests.Vector3D*/, at/*com.guepard.tests.Vector3D*/, up/*com.guepard.tests.Vector3D*/)/*void*/
	{
		if (at == undefined) at = null;
		if (up == undefined) up = null;
		
		
	};
	
	/*public*/d.prepend = function (rhs/*com.guepard.tests.Matrix3D*/)/*void*/
	{
		
	};
	
	/*public*/d.prependRotation = function (degrees/*Number*/, axis/*com.guepard.tests.Vector3D*/, pivotPoint/*com.guepard.tests.Vector3D*/)/*void*/
	{
		if (pivotPoint == undefined) pivotPoint = null;
		
		
	};
	
	/*public*/d.prependScale = function (xScale/*Number*/, yScale/*Number*/, zScale/*Number*/)/*void*/
	{
		
	};
	
	/*public*/d.prependTranslation = function (x/*Number*/, y/*Number*/, z/*Number*/)/*void*/
	{
		
	};
	
	/*public*/d.recompose = function (components/*Vector.<com.guepard.tests.Vector3D>*/, orientationStyle/*String*/)/*Boolean*/
	{
		if (orientationStyle == undefined) orientationStyle = "eulerAngles";
		
		return null;
		
	};
	
	/*public*/d.transformVector = function (v/*com.guepard.tests.Vector3D*/)/*com.guepard.tests.Vector3D*/
	{
		return null;
		
	};
	
	/*public*/d.transformVectors = function (vin/*Vector.<Number>*/, vout/*Vector.<Number>*/)/*void*/
	{
		
	};
	
	/*public*/d.transpose = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	
	/*public*/s.interpolate = function (thisMat/*com.guepard.tests.Matrix3D*/, toMat/*com.guepard.tests.Matrix3D*/, percent/*Number*/)/*com.guepard.tests.Matrix3D*/
	{
		return null;
		
	};
	
	
	
	flash.addDescription("com.guepard.tests.Matrix3D", d, null, s, null, null);
	
}
());
