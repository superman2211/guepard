/*class  com.guepard.tests.Unknown*/
/*
import flash.display.Bitmap;
import flash.display.BitmapData;
import flash.display.MovieClip;
import flash.display.Shape;
import flash.display.Sprite;
import flash.geom.Matrix;
import flash.geom.Point;
import flash.geom.Rectangle;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*internal*/d/*var*/.unknown1/*String*/ = null;
	/*internal*/d/*var*/.unknown2/*int*/ = 0;
	/*internal*/d/*var*/.unknown3/*Boolean*/ = false;
	/*internal*/d/*var*/.unknown4/*flash.geom.Point*/ = null;
	/*internal*/d/*var*/.unknown5/*com.guepard.tests.UnknownItem*/ = null;
	/*internal*/d/*var*/.obj0/*String*/ = null;
	/*internal*/d/*var*/.obj1/*Number*/ = 0;
	/*internal*/d/*var*/.obj2/*int*/ = 0;
	/*internal*/d/*var*/.xml/*XML*/ = null;
	/*internal*/d/*var*/._value/*int*/ = 0;
	
	
	/*public*/d.Unknown = function ()
	{
		this.obj0 = "string";
		this.obj1 = 123.456;
		this.obj2 = 2;
		this.xml = new XML("<test/>");
		
		if (!com.guepard.tests.Unknown.get_instance())
		{
			com.guepard.tests.Unknown.set_instance(this)
		}
		
		
	};
	
	/*private*/d.parametersAndLocals = function (param1/*Number*/, param2/*String*/, param3/*Array*/)/*String*/
	{
		var s/*String*/ = null;
		var n/*Number*/ = 0;
		var i/*Number*/ = 0;
		var u/*int*/ = 0;
		var b/*Boolean*/ = false;
		var r/*String*/ = null;
		var p/*flash.geom.Point*/ = null;
		var m/*flash.geom.Matrix*/ = null;
		var d/*flash.geom.Point*/ = null;
		var regExp1/*RegExp*/ = null;
		var regExp2/*RegExp*/ = null;
		var s_t_r/*String*/ = null;
		var f/*Boolean*/ = false;
		var element/*Object*/ = null;
		var v/*com.guepard.tests.UnknownItem*/ = null;
		var tmp/*Number*/ = 0;
		
		s = "test";
		n = 123.123;
		i = Math.round(n);
		u = /*int*/flash.int(n);
		b = true;
		r = n + i + s;
		p = flash.geom.Point.polar(1, 2);
		m = new flash.geom.Matrix(1, 2, 3, 4, 5, 6);
		d = m.deltaTransformPoint(p);
		regExp1 = /(1,2,3)\/\/.*|\/\* [^]*?\*\//g;
		regExp2 = /'([^']*)'/;
		this.unknown5 = new com.guepard.tests.UnknownItem();
		param1 = (n + i) / 2.2356478;
		s_t_r = "this string";
		if (s_t_r < n)
		{
			f = n > u;
			this.unknown1 = "str";
			this.unknown2 = 1;
			this.unknown3 = this.unknown2 > this.unknown1;
			this.unknown4 = p.add(new flash.geom.Point(1, 2));
			param2 = param1.toString();
			param3 = param2.split(",");
			element = param3[0]
		}
		
		v = new com.guepard.tests.UnknownItem(1, 2, 3);
		v.set_unknown(10);
		tmp = com.guepard.tests.Unknown.get_instance().unknown5.clone().get_length();
		return n + i + s;
		
	};
	
	/*private*/d.arrays = function (classes/*Vector.<Class>*/, instances/*Vector.<flash.display.DisplayObject>*/, interfaces/*Vector.<flash.display.IBitmapDrawable>*/, multy/*Vector.<Vector.<Vector.<Boolean>>>*/)/*void*/
	{
		var numbers/*Vector.<int>*/ = null;
		var strings/*Vector.<String>*/ = null;
		var booleans/*Vector.<Boolean>*/ = null;
		var objects/*Vector.<Object>*/ = null;
		var a/*int*/ = 0;
		var b/*int*/ = 0;
		var i/*int*/ = 0;
		var x/*XML*/ = null;
		
		numbers = [1, 2, 3];
		; strings = ["test", String(this), numbers.join(";")];
		; booleans = [true, numbers[0] > 1, !numbers];
		; objects = [true, 1, "str"];
		; classes = [flash.display.MovieClip, flash.display.Shape, flash.display.Sprite];
		; instances = [new flash.display.MovieClip(), new flash.display.Shape(), new flash.display.Sprite()];
		; interfaces = [new flash.display.Bitmap(), new flash.display.BitmapData(100, 100), new flash.display.Sprite(), new flash.display.MovieClip()];
		; a = 123;
		b = 235;
		multy = [];
		; multy[0] = "str";
		multy = [];
		; multy[0] = new Array();
		multy[0][1] = [];
		; multy[0][1][3] = a > b;
		i = multy[0][2].length;
		x = new XML("<root />");
		
	};
	
	/*private*/d.unknownArrayItem = function ()/*void*/
	{
		var array/*Array*/ = null;
		var item/*Object*/ = null;
		var t0/*String*/ = null;
		
		array = [];
		; array.push(new flash.display.Sprite());
		array.push(new flash.geom.Point());
		array.push(new flash.geom.Rectangle());
		array.push(
		{
			x : 1, y : 2
		}
		);
		for/*each*/(t0 in array)
		{
			item = array[t0];
			flash.trace(item.x);
			item.x = Math.random()
		}
		
		flash.trace(array[0].transform.matrix);
		flash.trace(array[1].x);
		
	};
	
	/*private*/d.unknownParameters = function (param1/*int*/, param2/*String*/)/*void*/
	{
		if (param1 == undefined) param1 = 10;
		param1 = /*int*/flash.int(param1);
		if (param2 == undefined) param2 = "s";
		
		var v/*int*/ = 0;
		
		v = this.get ();
		this.set (v + 10);
		
	};
	
	/*public*/d.set  = function (value/*int*/)/*void*/
	{
		value = /*int*/flash.int(value);
		
		this._value = value;
		
	};
	
	/*public*/d.get  = function ()/*int*/
	{
		return this._value;
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*private*/this/*var*/._instance/*com.guepard.tests.Unknown*/ = null;
		
		
	};
	
	/*public*/s.get_instance = function ()/*com.guepard.tests.Unknown*/
	{
		return com.guepard.tests.Unknown._instance;
		
	};
	
	/*public*/s.set_instance = function (value/*com.guepard.tests.Unknown*/)/*void*/
	{
		com.guepard.tests.Unknown._instance = value;
		
	};
	
	
	
	
	flash.addDescription("com.guepard.tests.Unknown", d, null, s, null, null);
	
}
());
