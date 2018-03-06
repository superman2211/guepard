/*class flash.display.Scene*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._offset = 0;
	
	/*private*/
	d/*var*/._labels/*Array*/ = null;
	/*private*/
	d/*var*/._name/*String*/ = null;
	/*private*/
	d/*var*/._numFrames/*int*/ = 0;
	
	/*public*/
	d.get_labels = function ()/*Array*/
	{
		return this._labels;
		
	};
	
	/*public*/
	d.get_name = function ()/*String*/
	{
		return this._name;
		
	};
	
	/*public*/
	d.get_numFrames = function ()/*int*/
	{
		return this._numFrames;
		
	};
	
	/*public*/
	d.Scene = function (name/*String*/, labels/*Array*/, numFrames/*int*/)
	{
		this._name = name;
		this._labels = labels;
		this._numFrames = /*int*/Math.floor(numFrames);
	};
	
	d._getLabel = function (frameName)
	{
		for (var i in this._labels)
		{
			var label = this._labels[ i ];
			
			if (label.name == frameName)
			{
				return label;
			}
		}
		
		return null;
	};
	
	flash.addDescription("flash.display.Scene", d, null, null, null);
	
}
());
