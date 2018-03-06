/*class  com.guepard.tests.DictionaryTests*/
/*
import flash.geom.Matrix;
import flash.geom.Point;
import flash.utils.Dictionary;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*private*/d/*var*/._dict/*flash.utils.Dictionary*/ = null;
	
	/*public*/d.get_dict = function ()/*flash.utils.Dictionary*/
	{
		return this._dict;
		
	};
	
	
	/*public*/d.DictionaryTests = function ()
	{
		
		this._dict = new flash.utils.Dictionary();
		this._dict.setProperty(flash.geom.Matrix, new flash.geom.Point());
		this._dict.setProperty(flash.geom.Point, new flash.geom.Matrix());
		this._dict.setProperty(this._dict.getProperty(flash.geom.Matrix), flash.geom.Matrix);
		this._dict.setProperty(this._dict.getProperty(flash.geom.Point), flash.geom.Point);
		
	};
	
	/*public*/d.cycles = function ()/*void*/
	{
		var prop/*Object*/ = null;
		var a/*Number*/ = 0;
		var value/*Object*/ = null;
		var t0/*String*/ = null;
		var t1/*String*/ = null;
		
		for/*dictionary*/(t0 in this._dict._keys)
		{
			prop = this._dict._keys[t0];
			flash.trace(prop + " = " + this.get_dict().getProperty(prop));
			if (prop == flash.geom.Matrix)
			{
				this._dict.getProperty(prop).tx = 10;
				a = this.get_dict().getProperty(prop).ty = 20
			}
			
			
		}
		
		for/*each dictionary*/(t1 in this.get_dict()._values)
		{
			value = this.get_dict()._values[t1];
			flash.trace(value)
		}
		
		
	};
	
	/*public*/d.remove = function ()/*void*/
	{
		this._dict.deleteProperty(flash.geom.Matrix);
		this.get_dict().deleteProperty(flash.geom.Point);
		
	};
	
	
	var s = {};
	
	
	/*public*/s.test = function ()/*void*/
	{
		var test/*com.guepard.tests.DictionaryTests*/ = null;
		var prop/*Object*/ = null;
		var b/*Number*/ = 0;
		var value/*Object*/ = null;
		var t0/*String*/ = null;
		var t1/*String*/ = null;
		
		test = new com.guepard.tests.DictionaryTests();
		for/*dictionary*/(t0 in test.get_dict()._keys)
		{
			prop = test.get_dict()._keys[t0];
			flash.trace(prop + " = " + test.get_dict().getProperty(prop));
			if (prop == flash.geom.Matrix)
			{
				test.get_dict().getProperty(prop).tx = 10;
				b = test.get_dict().getProperty(prop).ty = 20
			}
			
			if (prop == flash.geom.Point)
			{
				test.get_dict().deleteProperty(prop)
			}
			
			
		}
		
		for/*each dictionary*/(t1 in test.get_dict()._values)
		{
			value = test.get_dict()._values[t1];
			if (value instanceof flash.geom.Point)
			{
				value.x = 10;
				value.y = 20
			}
			
			
		}
		
		
	};
	
	
	
	flash.addDescription("com.guepard.tests.DictionaryTests", d, null, s, null, ["com.guepard.tests.DictionaryTests", "flash.geom.Matrix", "flash.geom.Point"]);
	
}
());
