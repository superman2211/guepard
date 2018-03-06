/*class flash.geom.Transform*/
/*
import flash.display.DisplayObject;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*private*/
	d/*var*/._colorTransform/*ColorTransform*/ = null;
	/*private*/
	d/*var*/._concatenatedColorTransform/*ColorTransform*/ = null;
	/*private*/
	d/*var*/._concatenatedMatrix/*Matrix*/ = null;
	/*private*/
	d/*var*/._invertedConcatenatedMatrix = null;
	/*private*/
	d/*var*/._displayObject/*DisplayObject*/ = null;
	/*private*/
	d/*var*/._matrix/*Matrix*/ = null;
	/*private*/
	d/*var*/._pixelBounds/*Rectangle*/ = null;
	
	/*public*/
	d.get_colorTransform = function ()/*ColorTransform*/
	{
		return this._colorTransform.clone();
		
	};
	
	/*public*/
	d.set_colorTransform = function (value/*ColorTransform*/)/*void*/
	{
		this._colorTransform.copyFrom(value);
		
	};
	
	/*public*/
	d.get_concatenatedColorTransform = function ()/*ColorTransform*/
	{
		var c = this._colorTransform.clone();
		
		if (this._displayObject._parent != null)
		{
			c.concat(this._displayObject._parent._transform.get_concatenatedColorTransform());
		}
		
		return c;
	};
	
	/*public*/
	d.get_concatenatedMatrix = function ()/*Matrix*/
	{
		var m = this._matrix.clone();
		
		if (this._displayObject._parent != null)
		{
			m.concat(this._displayObject._parent._transform.get_concatenatedMatrix());
		}
		
		return m;
	};
	
	/*public*/
	d.get_matrix = function ()/*Matrix*/
	{
		return this._matrix.clone();
		
	};
	
	/*public*/
	d.set_matrix = function (value/*Matrix*/)/*void*/
	{
		this._matrix.copyFrom(value);
		
	};
	
	/*public*/
	d.get_pixelBounds = function ()/*Rectangle*/
	{
		return this._pixelBounds;
		
	};
	
	/*public*/
	d.Transform = function (displayObject/*DisplayObject*/)
	{
		this._displayObject = displayObject;
		this._matrix = new flash.geom.Matrix();
		this._concatenatedMatrix = new flash.geom.Matrix();
		this._invertedConcatenatedMatrix = new flash.geom.Matrix();
		this._colorTransform = new flash.geom.ColorTransform();
		this._concatenatedColorTransform = new flash.geom.ColorTransform();
		this._pixelBounds = new flash.geom.Rectangle();
	};
	
	flash.addDescription("flash.geom.Transform", d, null, null, null);
}
());
