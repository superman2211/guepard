/*class  flash.geom.Matrix3D*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._rawData = null;
	
	d.get_determinant = function ()/*Number*/
	{
		return 0;
		
	};
	
	d.get_position = function ()/*flash.geom.Vector3D*/
	{
		return new flash.geom.Vector3D(
			this._rawData[ 3 ],
			this._rawData[ 7 ],
			this._rawData[ 11 ],
			this._rawData[ 15 ]
		);
		
	};
	
	d.set_position = function (value/*flash.geom.Vector3D*/)/*void*/
	{
		this._rawData[ 3 ] = value.x;
		this._rawData[ 7 ] = value.y;
		this._rawData[ 11 ] = value.z;
		this._rawData[ 15 ] = value.w;
	};
	
	d.get_rawData = function ()/*Vector.<Number>*/
	{
		return this._rawData;
		
	};
	
	d.set_rawData = function (value/*Vector.<Number>*/)/*void*/
	{
		this._rawData = value;
	};
	
	
	d.append = function (lhs/*flash.geom.Matrix3D*/)/*void*/
	{
		
	};
	
	d.appendRotation = function (degrees/*Number*/, axis/*flash.geom.Vector3D*/, pivotPoint/*flash.geom.Vector3D*/)/*void*/
	{
		if (pivotPoint == undefined) pivotPoint = null;
		
		
	};
	
	d.appendScale = function (xScale/*Number*/, yScale/*Number*/, zScale/*Number*/)/*void*/
	{
		
	};
	
	d.appendTranslation = function (x/*Number*/, y/*Number*/, z/*Number*/)/*void*/
	{
		
	};
	
	d.clone = function ()/*flash.geom.Matrix3D*/
	{
		return null;
		
	};
	
	d.copyColumnFrom = function (column/*uint*/, vector3D/*flash.geom.Vector3D*/)/*void*/
	{
		column = /*uint*/Math.floor(column);
		
		
	};
	
	d.copyColumnTo = function (column/*uint*/, vector3D/*flash.geom.Vector3D*/)/*void*/
	{
		column = /*uint*/Math.floor(column);
		
		
	};
	
	d.copyFrom = function (sourceMatrix3D/*flash.geom.Matrix3D*/)/*void*/
	{
		
	};
	
	d.copyRawDataFrom = function (vector/*Vector.<Number>*/, index/*uint*/, transpose/*Boolean*/)/*void*/
	{
		if (index == undefined) index = 0;
		index = /*uint*/Math.floor(index);
		if (transpose == undefined) transpose = false;
		
		
	};
	
	d.copyRawDataTo = function (vector/*Vector.<Number>*/, index/*uint*/, transpose/*Boolean*/)/*void*/
	{
		if (index == undefined) index = 0;
		index = /*uint*/Math.floor(index);
		if (transpose == undefined) transpose = false;
		
		
	};
	
	d.copyRowFrom = function (row/*uint*/, vector3D/*flash.geom.Vector3D*/)/*void*/
	{
		row = /*uint*/Math.floor(row);
		
		
	};
	
	d.copyRowTo = function (row/*uint*/, vector3D/*flash.geom.Vector3D*/)/*void*/
	{
		row = /*uint*/Math.floor(row);
		
		
	};
	
	d.copyToMatrix3D = function (dest/*flash.geom.Matrix3D*/)/*void*/
	{
		
	};
	
	d.decompose = function (orientationStyle/*String*/)/*Vector.<flash.geom.Vector3D>*/
	{
		if (orientationStyle == undefined) orientationStyle = "eulerAngles";
		
		return null;
		
	};
	
	d.deltaTransformVector = function (v/*flash.geom.Vector3D*/)/*flash.geom.Vector3D*/
	{
		return null;
		
	};
	
	d.identity = function ()/*void*/
	{
		
	};
	
	d.interpolateTo = function (toMat/*flash.geom.Matrix3D*/, percent/*Number*/)/*void*/
	{
		
	};
	
	d.invert = function ()/*Boolean*/
	{
		return null;
		
	};
	
	d.Matrix3D = function (value/*Vector.<Number>*/)
	{
		
		if (value == undefined) value = null;
		
		if (!value)
		{
			value = [ 1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1 ];
		}
		
		this._rawData = value;
		
	};
	
	d.pointAt = function (pos/*flash.geom.Vector3D*/, at/*flash.geom.Vector3D*/, up/*flash.geom.Vector3D*/)/*void*/
	{
		if (at == undefined) at = null;
		if (up == undefined) up = null;
		
		
	};
	
	d.prepend = function (rhs/*flash.geom.Matrix3D*/)/*void*/
	{
		
	};
	
	d.prependRotation = function (degrees/*Number*/, axis/*flash.geom.Vector3D*/, pivotPoint/*flash.geom.Vector3D*/)/*void*/
	{
		if (pivotPoint == undefined) pivotPoint = null;
		
		
	};
	
	d.prependScale = function (xScale/*Number*/, yScale/*Number*/, zScale/*Number*/)/*void*/
	{
		
	};
	
	d.prependTranslation = function (x/*Number*/, y/*Number*/, z/*Number*/)/*void*/
	{
		
	};
	
	d.recompose = function (components/*Vector.<flash.geom.Vector3D>*/, orientationStyle/*String*/)/*Boolean*/
	{
		if (orientationStyle == undefined) orientationStyle = "eulerAngles";
		
		return null;
		
	};
	
	d.transformVector = function (v/*flash.geom.Vector3D*/)/*flash.geom.Vector3D*/
	{
		return null;
		
	};
	
	d.transformVectors = function (vin/*Vector.<Number>*/, vout/*Vector.<Number>*/)/*void*/
	{
		
	};
	
	d.transpose = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	
	s.interpolate = function (thisMat/*flash.geom.Matrix3D*/, toMat/*flash.geom.Matrix3D*/, percent/*Number*/)/*flash.geom.Matrix3D*/
	{
		return null;
		
	};
	
	
	flash.addDescription("flash.geom.Matrix3D", d, null, s, null, null);
	
}
());
