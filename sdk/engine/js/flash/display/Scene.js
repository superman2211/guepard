/*class flash.display.Scene*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._offset = 0;
	
	d._labels/*Array*/ = null;
	d._name/*String*/ = null;
	d._numFrames/*int*/ = 0;
	
	d.get_labels = function ()/*Array*/
	{
		return this._labels;
		
	};
	
	d.get_name = function ()/*String*/
	{
		return this._name;
		
	};
	
	d.get_numFrames = function ()/*int*/
	{
		return this._numFrames;
		
	};
	
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
