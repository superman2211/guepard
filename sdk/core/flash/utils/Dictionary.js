/*class flash.utils.Dictionary*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._keys = null;
	d._values = null;
	
	/*public*/
	d.Dictionary = function (weakKeys/*Boolean*/)
	{
		this._keys = [];
		this._values = [];
	};
	
	d.getProperty = function (key)
	{
		var index = this._keys.indexOf(key);
		
		if (index != -1)
		{
			return this._values[ index ];
		}
		else
		{
			return undefined;
		}
	}
	
	d.setProperty = function (key, value)
	{
		var index = this._keys.indexOf(key);
		
		if (index != -1)
		{
			this._values[ index ] = value;
		}
		else
		{
			this._keys.push(key);
			this._values.push(value);
		}
		
		return value;
	}
	
	d.deleteProperty = function (key)
	{
		var index = this._keys.indexOf(key);
		
		if (index != -1)
		{
			this._keys.splice(index, 1);
			this._values.splice(index, 1);
		}
	}
	
	flash.addDescription("flash.utils.Dictionary", d, null, null, null);
	
}
());
