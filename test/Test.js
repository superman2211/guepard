/*class  com.guepard.tests.Test*/
/*
import flash.display.DisplayObject;
import flash.display.Graphics;
import flash.display.MovieClip;
import flash.display.Shape;
import flash.display.Sprite;
import flash.events.Event;
import flash.events.MouseEvent;
import flash.geom.Matrix;
import flash.geom.Point;
import graphics.colors.YUV;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*private*/d/*var*/.message/*String*/ = null;
	/*private*/d/*var*/._string2/*String*/ = null;
	/*private*/d/*var*/._string1/*String*/ = null;
	/*private*/d/*const*/.includeClasses/*Array*/ = null;
	/*private*/d/*var*/.temp1/*Number*/ = 0;
	/*private*/d/*var*/.temp2/*String*/ = null;
	/*private*/d/*var*/.temp3/*Object*/ = null;
	/*private*/d/*var*/.temp4/*Boolean*/ = false;
	/*internal*/d/*var*/._number1/*Number*/ = 0;
	/*private*/d/*var*/._number2/*Number*/ = 0;
	/*internal*/d/*var*/._number3/*Number*/ = 0;
	/*public*/d/*const*/.number4/*Number*/ = 0;
	/*protected*/d/*var*/._number5/*Number*/ = 0;
	/*private*/d/*var*/._bool1/*Boolean*/ = false;
	/*private*/d/*var*/._bool2/*Boolean*/ = false;
	/*private*/d/*var*/._bool3/*Boolean*/ = false;
	/*private*/d/*var*/._bool4/*Boolean*/ = false;
	/*private*/d/*var*/._array1/*Array*/ = null;
	/*private*/d/*var*/._array2/*Array*/ = null;
	/*private*/d/*var*/._array3/*Array*/ = null;
	/*private*/d/*var*/._array4/*Array*/ = null;
	/*private*/d/*var*/._array5/*Array*/ = null;
	/*private*/d/*var*/._vector0/*Vector.<flash.geom.Point>*/ = null;
	/*private*/d/*var*/._vector1/*Vector.<com.guepard.tests.Vertex>*/ = null;
	/*private*/d/*var*/._vector2/*Vector.<Vector.<flash.geom.Point>>*/ = null;
	/*private*/d/*var*/._vector3/*Vector.<Vector.<Vector.<flash.geom.Point>>>*/ = null;
	/*private*/d/*var*/._vector4/*Vector.<Vector.<Vector.<com.guepard.tests.Vertex>>>*/ = null;
	/*private*/d/*var*/.callback/*Function*/ = null;
	/*private*/d/*var*/._name/*String*/ = null;
	/*private*/d/*var*/.t2/*Number*/ = 0;
	/*private*/d/*var*/.formula/*Number*/ = 0;
	/*private*/d/*var*/.regExp1/*RegExp*/ = null;
	/*private*/d/*var*/.regExp2/*RegExp*/ = null;
	/*private*/d/*var*/.regExp3/*RegExp*/ = null;
	
	/*public*/d.get_number1 = function ()/*Number*/
	{
		return this._number1;
		
	};
	
	/*public*/d.set_number1 = function (value/*Number*/)/*void*/
	{
		this._number1 = value;
		
	};
	
	/*override*//*public*/d.get_name = function ()/*String*/
	{
		return this.Sprite_get_name();
		
	};
	
	/*override*//*public*/d.set_name = function (value/*String*/)/*void*/
	{
		this.Sprite_set_name(value);
		
	};
	
	
	/*public*/d.Test = function ()
	{
		this.message = "XML node " + this.temp1 + "\\" + this._number1 + " is missing or is not in the correct format";
		this._string2 = 'this \'is\' "test" /* string  */';
		this._string1 = "this is 'test' // string ";
		this.includeClasses = [flash.geom.Point];
		this.temp1 = 1;
		this.temp2 = "test";
		this._number1 = 12345;
		this._number2 = 3.1415;
		this._number3 = .56789;
		this.number4 = 1.23e+010;
		this._number5 = 0.567E-005;
		this._bool1 = com.guepard.tests.Test._number6 > 0;
		this._bool3 = true;
		this._bool4 = !(com.guepard.tests.Test._number7 < 0);
		this._array2 = new Array();
		this._array3 = [1, 2, 3, 4];
		this._array4 = [1, "test", true, 
		{
			a : 1, b : 2
		}
		];
		this._array5 = new Array(0 + 1, (1 + 2) * 5 / 25, 2 + 3, 3 + 4);
		this._vector0 = new Array();
		this._vector1 = new Array();
		this._vector2 = new Array();
		this._vector3 = new Array();
		this._vector4 = new Array();
		this.formula = 1 / 25 * (11.22) / [1, 2, 3].length * .123;
		this.regExp1 = /(1,2,3)\/\/.*|\/\* [^]*?\*\//g;
		this.regExp2 = /'([^']*)'/;
		this.regExp3 = new RegExp("\/\/.*|\/\* [^]*?\*\/", 'g');
		
		var emailValidation/*RegExp*/ = null;
		var lenght/*Number*/ = 0;
		var obj/*Object*/ = null;
		var a/*flash.geom.Matrix*/ = null;
		var test/*com.guepard.tests.Vertex*/ = null;
		var _overwriteLookup/*Object*/ = null;
		
		this.Sprite_constructor();
		emailValidation = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;
		this.Sprite_get_transform().set_matrix(new flash.geom.Matrix());
		this.set_name("instance");
		
		{
			this._vector1 = new Array();
			this._vector1.push(new com.guepard.tests.Vertex(1, 2, 3));
			lenght = this._vector1[0].get_length();
			lenght = this.get_x() > this.get_y() ? this.get_name().length : this._vector1.length
		};
		this._array1 = [1, 2, 3 + com.guepard.tests.Test._number7 + this._number2 + 11, ["test123456", "double", "array"]];
		; obj = 
		{
			name : this._string1, _vector : [11, "str", this._number2 + this._number3 + 22], "obj" : 
			{
				number1 : this.get_number1(), number4 : this.number4, _vector : []
			}
			
		};
		; a = this.get_transform().get_matrix();
		(this._array1).join(",");
		test = new (this.getClass())();
		this._number1 = (this._number2 + this._number3 * this._number5) / (com.guepard.tests.Test._number6 - com.guepard.tests.Test._number7 * this._string1.length);
		this._number2 = this._number1 > this.number4 ? this._number1 : com.guepard.tests.Test._number6;
		this.constructions("test");
		_overwriteLookup = 
		{
			none : 0, all : 1, auto : 2, concurrent : 3, allOnStart : 4, preexisting : 5, "true" : 1, "false" : 0
		};
		; 
	};
	
	/*private*/d.vectors = function ()/*void*/
	{
		var sub1/*Vector.<Vector.<com.guepard.tests.Vertex>>*/ = null;
		var sub2/*Vector.<com.guepard.tests.Vertex>*/ = null;
		var vertex1/*com.guepard.tests.Vertex*/ = null;
		var vertex2/*com.guepard.tests.Vertex*/ = null;
		var vertex3/*com.guepard.tests.Vertex*/ = null;
		var vertex4/*com.guepard.tests.Vertex*/ = null;
		var array/*Array*/ = null;
		var n0/*int*/ = 0;
		var n1/*int*/ = 0;
		var n2/*int*/ = 0;
		
		sub1 = this._vector4[0];
		sub2 = sub1[5];
		vertex1 = sub2[9];
		vertex2 = sub2.shift();
		vertex3 = sub2.pop();
		vertex4 = this._vector4[0][1][2];
		array = new Array();
		array.push(1, 2, 3);
		n0 = /*int*/flash.int(array[0]);
		n1 = /*int*/flash.int(array.shift());
		n2 = /*int*/flash.int(array.pop());
		
	};
	
	/*private*/d.getClass = function ()/*Class*/
	{
		return com.guepard.tests.Vertex;
		
	};
	
	/*public*/d.parameters = function (parameter1/*Number*/, parameter2/*Number*/, parameter3/*String*/)/*void*/
	{
		if (parameter2 == undefined) parameter2 = 0;
		if (parameter3 == undefined) parameter3 = null;
		var args/*Array*/ = Array.prototype.slice.call(arguments, 3);
		
		this._number1 = parameter1;
		this._number2 = parameter2;
		this._string1 = parameter3;
		
	};
	
	/*final*//*public*/d.locals = function ()/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 0);
		
		var a/*Number*/ = 0;
		var b/*Number*/ = 0;
		var d/*Object*/ = null;
		var c/*Number*/ = 0;
		
		a = 1;
		;
		b = 2;
		;
		d;
		if (a < b)
		{
			c = a + b
		}
		
		
	};
	
	/*final*//*public*/d.conditions = function (e/*flash.events.Event*/)/*void*/
	{
		if (e == undefined) e = null;
		
		var x/*Number*/ = 0;
		var y/*Number*/ = 0;
		var abc/*Number*/ = 0;
		var o/*Object*/ = null;
		
		com.guepard.tests.Test.returning(x, y, 0);
		x = Math.sin(Math.random());
		y = Math.random();
		if (typeof y == "number")
		{
			flash.trace()
		}
		
		if (typeof y.toString() == "number")
		{
			flash.trace()
		}
		
		if (typeof (y + "s") == "string")
		{
			flash.trace()
		}
		
		if (x > y)
		{
			return 
		}
		
		else if(x < y)
		{
			this._string1 = y + "+" + x
		}
		
		else 
		{
			this._string1 = x + "-" + y
		}
		
		if (this._string1)
		{
			x + y + this._number1
		}
		
		else 
		{
			this._string1 = ""
		}
		
		if (this._number1 > this._number2)
		{
			this._number1 = this._number2
		}
		
		else 
		{
			this._number1 ++ 
		}
		
		switch (this._number1)
		{
			case 0 : 
			this._string1 = String(this._number1 + this._number2);
			break;
			; case 3 : 
			case 4 : 
			this._string1 = String(this._number1 + this._number2);
			case 1 : 
			this._string2 = Number(this._number2 + this._number3).toString();
			return ;
			default  : 
			this._string2 = "" + (this._number1 + this._number2) / this._number3 + this.number4;
			break;
			; 
		}
		
		abc = x > y ? x : y;
		o = this.get_name() ? 
		{
			name : this.get_name()
		}
		 : null;
		
	};
	
	/*private*/d.cycles = function ()/*void*/
	{
		var array/*Array*/ = null;
		var i/*int*/ = 0;
		var n/*Number*/ = 0;
		var s/*String*/ = null;
		var m_height/*int*/ = 0;
		var inHeight/*int*/ = 0;
		var m_width/*int*/ = 0;
		var inWidth/*int*/ = 0;
		var k/*int*/ = 0;
		var m/*int*/ = 0;
		var t0/*String*/ = null;
		
		array = new Array();
		while (i ++  < 100)
		{
			array.push(Math.random())
		}
		
		for (i = 0; i < array.length; i ++ )
		{
			flash.trace(array[i])
		}
		
		for/*each*/(t0 in array)
		{
			n = array[t0];
			flash.trace(n)
		}
		
		for (s in array)
		{
			flash.trace(s + " = " + array[s])
		}
		
		do 
		{
			array.length -- 
		}
		while (array.length > 0)
		for ()
		{
			array.push(Math.random());
			if (array.length > 100)
			{
				break
			}
			
			; 
		}
		
		for (i = 0; i < array.length; i ++ , array.length -- )
		{
			flash.trace(array[i])
		}
		
		i = 0;
		for (; i < array.length; i ++ , array.length -- )
		{
			flash.trace(array[i])
		}
		
		m_height = /*int*/flash.int(50 + Math.random() * 100);
		inHeight = /*int*/flash.int(50 + Math.random() * 100);
		m_width = /*int*/flash.int(50 + Math.random() * 100);
		inWidth = /*int*/flash.int(50 + Math.random() * 100);
		for (k = 0, m = 0; k < Math.max(m_height, inHeight) && m < Math.max(m_width, inWidth); k ++ , m ++ )
		{
			
		}
		
		
	};
	
	/*private*/d.properties = function ()/*void*/
	{
		var i/*Number*/ = 0;
		var instance/*com.guepard.tests.Temp*/ = null;
		
		i;
		i ++ ;
		 ++ i;
		com.guepard.tests.Test.set_number6(com.guepard.tests.Test.get_number6() - 1);
		 -- com.guepard.tests.Test.get_number6();
		com.guepard.tests.Test._number6 -- ;
		com.guepard.tests.Test.set_number6(com.guepard.tests.Test.get_number6() + 1);
		instance = new com.guepard.tests.Test();
		instance.set_number1(instance.get_number1() + 1);
		instance.set_number1(instance.get_number1() + (this._number3));
		instance.set_number1(instance.get_number1() | (this._number1));
		
		{
			this.set_x(this.set_y(1))
		};
		
	};
	
	/*private*/d.throwing = function ()/*void*/
	{
		var x/*Number*/ = 0;
		
		try 
		{
			x = (10 + 20 * (this._number1 + this.number4 / this.get_number1())) - com.guepard.tests.Test.get_number6()
		}
		
		catch (e/*Error*/)
		{
			throw new Error("catch error");
			
		}
		
		finally 
		{
			throw new Error("finaly error")
		}
		
		
	};
	
	/*private*/d.functions = function (callback/*Function*/)/*void*/
	{
		var anonymous/*Function*/ = null;
		var instance/*com.guepard.tests.Temp*/ = null;
		var obj/*Object*/ = null;
		
		anonymous = flash.bindFunction(function (e/*Event*/)/*void*/
		{
			flash.trace(e);
			
		}
		, this);
		; instance = new com.guepard.tests.Test();
		instance.callback = callback;
		this.addEventListener(flash.events.Event.ENTER_FRAME, flash.bindFunction(instance, instance.conditions));
		this.addEventListener(flash.events.MouseEvent.CLICK, callback);
		this.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, flash.bindFunction(instance, instance.callback));
		this.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, flash.bindFunction(null, anonymous));
		this.addEventListener(flash.events.MouseEvent.MOUSE_MOVE, flash.bindFunction(function (e/*Event*/)/*void*/
		{
			flash.trace(this);
			
		}
		, this));
		instance.addEventListener(flash.events.Event.ADDED_TO_STAGE, flash.bindFunction(this, this.addedToStage));
		obj = 
		{
			x : Math.random(), ease : "backOut", onComplete : flash.bindFunction(this, this.animationComplete)
		};
		; 
	};
	
	/*private*/d.animationComplete = function ()/*void*/
	{
		var test/*com.guepard.tests.DictionaryTests*/ = null;
		
		test = new com.guepard.tests.DictionaryTests();
		
	};
	
	/*private*/d.addedToStage = function (e/*flash.events.Event*/)/*void*/
	{
		var instance/*com.guepard.tests.Temp*/ = null;
		
		instance = /*com.guepard.tests.Temp*/(e.get_currentTarget());
		instance.removeEventListener(flash.events.Event.ADDED_TO_STAGE, flash.bindFunction(this, this.addedToStage));
		
	};
	
	/*private*/d.constructions = function (t1/*String*/)/*void*/
	{
		var t0/*int*/ = 0;
		var v/*com.guepard.tests.Vertex*/ = null;
		var mouseEnabled/*Boolean*/ = false;
		var length/*Number*/ = 0;
		var t3/*com.guepard.tests.Vertex*/ = null;
		
		t0;
		v = new com.guepard.tests.Vertex();
		mouseEnabled = true;
		length = 0;
		/*with*/
		{
			t3 = v;
			t3.x = 11;
			t3.y = t3.z = 22;
			t3.set_length(33);
			while (t3.x -- )
			{
				t3.y ++ 
			}
			
			mouseEnabled = false;
			this.get_transform().set_matrix(new flash.geom.Matrix())
		}
		
		
	};
	
	/*private*/d.casting = function ()/*void*/
	{
		var array/*Array*/ = null;
		var obj/*flash.display.DisplayObject*/ = null;
		var totalFrames/*int*/ = 0;
		var graphics/*flash.display.Graphics*/ = null;
		var i/*int*/ = 0;
		var t0/*String*/ = null;
		
		array = [new flash.display.MovieClip(), new flash.display.Shape(), new flash.display.Sprite()];
		; for/*each*/(t0 in array)
		{
			obj = array[t0];
			if (obj instanceof flash.display.MovieClip)
			{
				totalFrames = /*flash.display.MovieClip*/(obj).get_totalFrames()
			}
			
			else if(obj instanceof flash.display.Shape)
			{
				graphics = (obj).get_graphics()
			}
			
			else if(obj instanceof flash.display.Sprite)
			{
				(obj).removeChildAt(0);
				/*flash.display.Sprite*/(obj).get_graphics().drawRect(Number("0"), Number(String(100).split("")[0]), 100, 100)
			}
			
			
		}
		
		i = /*int*/flash.int(10.23 + this.get_number1());
		i ++ ;
		i += /*int*/flash.int(11.22);
		i -= 0xffee33;
		i -= /*int*/flash.int(1.5e-002);
		i = 123;
		i = /*int*/flash.int(11 + 22.33 + 1);
		i = this.get_name().length;
		i = /*int*/flash.int(new com.guepard.tests.Vertex(1, 2, 3).get_length());
		i = 2 >> 4;
		i = 2 >>> 4.2;
		i = 0xff0000 | this.get_x();
		
	};
	
	/*private*/d.statical = function ()/*void*/
	{
		com.guepard.tests.Test._number6 = com.guepard.tests.Test._number7 + 1;
		com.guepard.tests.Test._number6 = 123;
		
	};
	
	/*override*//*public*/d.toString = function ()/*String*/
	{
		return "{" + this._number1 + ", " + this._number2 + "}";
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*//*public*/this.prototype.Sprite_constructor = this.__base__;
		/*super*//*public*/this.prototype.Sprite_get_name = this.__base__.prototype.get_name;
		/*super*//*public*/this.prototype.Sprite_set_name = this.__base__.prototype.set_name;
		/*super*//*public*/this.prototype.Sprite_get_transform = this.__base__.prototype.get_transform;
		/*super*//*public*/this.prototype.Sprite_set_transform = this.__base__.prototype.set_transform;
		
		/*private*/this/*var*/._number6/*uint*/ = 0xABcdEf45;
		/*private*/this/*const*/._number7/*int*/ =  - 123;
		
		
	};
	
	/*public*/s.get_number6 = function ()/*uint*/
	{
		return com.guepard.tests.Test._number6;
		
	};
	
	/*public*/s.set_number6 = function (value/*uint*/)/*void*/
	{
		value = /*uint*/flash.uint(value);
		
		com.guepard.tests.Test._number6 = value;
		
	};
	
	
	/*public*/s.returning = function (x/*int*/, y/*uint*/, z/*Number*/)/*flash.geom.Point*/
	{
		x = /*int*/flash.int(x);
		y = /*uint*/flash.uint(y);
		
		if (x < y)
		{
			return new flash.geom.Point(x, y)
		}
		
		else 
		{
			return new flash.geom.Point(y, x).subtract(new flash.geom.Point(com.guepard.tests.Test._number6, com.guepard.tests.Test._number7))
		}
		
		return null;
		return {
			x : Math.random(), y : Math.random()
		};
		; 
	};
	
	
	
	flash.addDescription("com.guepard.tests.Test", d, "flash.display.Sprite", s, null, ["flash.geom.Point"]);
	
}
());
