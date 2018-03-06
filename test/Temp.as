package com.guepard.tests 
{
	import flash.display.DisplayObject;
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Matrix;
	import flash.geom.Point;
	
	//import graphics.colors.YUV;
	/**
	 * ...
	 * @author 
	 */
	public class Temp extends Sprite
	{
		//[Embed(source="../../../../lib/images/Flash-Icon.png")]
		//public var EmbedBitmap:Class;
		
		private var message:String = "XML node " + temp1 + "\\" + _number1 + " is missing or is not in the correct format";
		
		//strings
		private var _string2:String = 'this \'is\' "test" /* string  */';
		private var _string1:String = "this is 'test' // string ";
		
		//array of classes
		private const includeClasses:Array = [Point];
		
		//variables in line
		private var temp1:Number = 1, temp2:String = "test", temp3:Object, temp4:Boolean;
		
		//numbers
		internal var _number1:Number = 12345;
		private var _number2:Number = 3.1415;
		internal var _number3:Number = .56789;
		public const number4:Number = 1.23e+010;
		protected var _number5:Number = 0.567E-005;
		private static var _number6:uint = 0xABcdEf45;
		private static const _number7:int = -123;
		
		//booleans
		private var _bool1:Boolean = _number6 > 0; 
		private var _bool2:Boolean = false; 
		private var _bool3:Boolean = true; 
		private var _bool4:Boolean = !(_number7 < 0); 
		
		//arrays
		private var _array1:Array;
		private var _array2:Array = new Array();
		private var _array3:Array = [1, 2, 3, 4];
		private var _array4:Array = [1, "test", true, { a: 1, b: 2 } ];
		private var _array5:Array = new Array(0 + 1, (1 + 2) * 5 / 25, 2 + 3, 3 + 4);
		
		//vectors
		private var _vector0:Vector.<Point> = new Vector.<Point>();
		private var _vector1:Vector.<Vertex> = new Vector.<Vertex>();
		private var _vector2:Vector.<Vector.<Point>> = new Vector.<Vector.<Point>>();
		private var _vector3:Vector.<Vector.<Vector.<Point>>> = new Vector.<Vector.<Vector.<Point>>>();
		private var _vector4:Vector.<Vector.<Vector.<Vertex>>> = new Vector.<Vector.<Vector.<Vertex>>>();
		
		private var callback:Function;
		private var _name:String;
		
		private var t2:Number;
		
		//comment /\/\/.*|\/\* [^]*?\*\//g;
		
		private var formula:Number = 1/25*(11.22)/[1,2,3].length*.123;
		private var regExp1:RegExp = /(1,2,3)\/\/.*|\/\* [^]*?\*\//g;
		private var regExp2:RegExp = /'([^']*)'/;
		private var regExp3:RegExp = new RegExp("\/\/.*|\/\* [^]*?\*\/", 'g');
		
		//getters and setters
		public function get number1():Number 
		{
			return _number1;
		}
		
		public function set number1(value:Number):void 
		{
			_number1 = value;
		}
		
		static public function get number6():uint 
		{
			return _number6;
		}
		
		static public function set number6(value:uint):void 
		{
			_number6 = value;
		}
		
		public override function get name():String 
		{
			return super.name;
		}
		
		public override function set name(value:String):void 
		{
			super.name = value;
		}
		
		//constructor 
		public function Temp()
		{
			super();
			
			
			var emailValidation:RegExp = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;
			
			super.transform.matrix = new Matrix();
			
			name = "instance";
			
			{
				_vector1 = new Vector.<Vertex>();
				_vector1.push(new Vertex(1, 2, 3));
				
				var lenght:Number = _vector1[0].length;
				
				lenght = x > y ? name.length : _vector1.length;
			}

			_array1 = [1, 2, 3 + _number7 + _number2 + 11, ["test123456", "double", "array"]];

			var obj:Object = 
			{
				name : _string1,
				_vector : [11, "str", _number2 + _number3 + 22],
				"obj" : { number1: number1, number4: number4, _vector : [] }
			};

			var a:Matrix = transform.matrix;

			(_array1).join(",");

			var test:Vertex = new (getClass())();
			
			_number1 = (_number2 + _number3 * _number5) / (_number6 - _number7 * _string1.length);
			
			_number2 = _number1 > number4 ? _number1 : _number6;
			
			constructions("test");
			
			var _overwriteLookup:Object = {none:0, all:1, auto:2, concurrent:3, allOnStart:4, preexisting:5, "true":1, "false":0};
		}
		
		//vectors
		private function vectors():void
		{
			var sub1:Vector.<Vector.<Vertex>> = _vector4[0];
			var sub2:Vector.<Vertex> = sub1[5];
			
			var vertex1:Vertex = sub2[9];
			var vertex2:Vertex = sub2.shift();
			var vertex3:Vertex = sub2.pop();
			var vertex4:Vertex = _vector4[0][1][2];
			
			var array:Array = new Array();
			array.push(1, 2, 3);
			
			var n0:int = array[0];
			var n1:int = array.shift();
			var n2:int = array.pop();
			
			return;
		}
		
		private function getClass():Class
		{
			return Vertex;
		}
		
		//parameters
		public function parameters(parameter1:Number, parameter2:Number = 0, parameter3:String = null, ...args):void
		{
			this._number1 = parameter1;
			this._number2 = parameter2;
			this._string1 = parameter3;
		}
		
		//locals
		public final function locals(...args:Array):void
		{
			var a:Number = 1, b:Number = 2, d:Object;
			
			if (a < b)
			{
				var c:Number = a + b;
			}
		}
		
		//return
		public static function returning(x:int, y:uint, z:Number):Point
		{
			if (x < y)
			{
				return new Point(x, y);
			}
			else
			{
				return new Point(y, x).subtract(new Point(_number6, _number7));
			}
			
			return null;
			
			return { x: Math.random(), y: Math.random() };
		}
		
		//conditions
		public final function conditions(e:Event = null):void
		{
			returning(x, y, 0);
			//get + run(get, get)
			
			var x:Number = Math.sin(Math.random());
			//get + set(get + get + run(get + get + run()));
			
			var y:Number = Math.random();
			
			if (typeof y == "number")
			{
				trace();
			}
			
			if (typeof y.toString() == "number")
			{
				trace();
			}
			
			if (typeof(y + "s") == "string")
			{
				trace();
			}
			
			if (x > y)
			{
				return;
			}
			else if (x < y)
			{
				_string1 = y + "+" + x;
			}
			else
			{
				_string1 = x + "-" + y;
			}
			
			if (_string1) 
				x + y + 
				_number1;
			
			else _string1 = "";
			
			//if(get) {get + operation + get + operation + get } + else {get + set(get)}
			
			if (_number1 > _number2) _number1 = _number2 else _number1++;
			
			switch(_number1)
			{
				case 0:
					_string1 = String(_number1 + _number2);
					break;
					
				case 3:
				case 4:
					_string1 = String(_number1 + _number2);
					
				case 1:
					_string2 = Number(_number2 + _number3).toString();
					return;
					
				default:
					_string2 = "" + (_number1 + _number2) / _number3 + number4;
					break;
			}
			
			var abc:Number = x > y ? x : y;
			
			var o:Object = name ? { name: name } : null;
		}
		
		private function cycles():void 
		{
			var array:Array = new Array();
			
			while (i++ < 100)
			{
				array.push(Math.random());
			}
			
			for (var i:int = 0; i < array.length; i++) 
			{
				trace(array[i]);
			}
			
			for each(var n:Number in array)
			{
				trace(n);
			}
			
			for (var s:String in array)
			{
				trace(s + " = " + array[s]);
			}
			
			do
			{
				array.length--;
			}
			while (array.length > 0)
			
			
			for (;;)
			{
				array.push(Math.random());
				if (array.length > 100) break;
			}
			
			for (i = 0; i < array.length; i++, array.length--) 
			{
				trace(array[i]);
			}
			
			i = 0;
			
			for (; i < array.length; i++, array.length--) 
			{
				trace(array[i]);
			}
			
			var m_height:int = 50 + Math.random() * 100;
			var inHeight:int = 50 + Math.random() * 100;
			
			var m_width:int = 50 + Math.random() * 100;
			var inWidth:int = 50 + Math.random() * 100;
			
			for (var k:int = 0, m:int = 0; k < Math.max(m_height, inHeight) && m < Math.max(m_width, inWidth); k++, m++)
			{
				
			}
		}
		
		private function properties():void
		{	
			var i:Number;
			
			i++;
			++i;
			
			number6--
			--number6
			_number6--
			number6++
			
			var instance:Temp = new Temp();
			instance.number1++;
			instance.number1 += this._number3;
			instance.number1 |= this._number1;
			
			{
				x = y = 1;
			}
		}
		
		private function throwing():void 
		{
			try
			{
				var x:Number = (10 + 20 * (_number1 + number4 / number1)) - number6;
			}
			catch (e:Error)
			{
				throw new Error("catch error");
			}
			finally
			{
				throw new Error("finaly error");
			}
		}
		
		//functions
		private function functions(callback:Function):void 
		{
			var anonymous:Function = function(e:Event):void
			{
				trace(e);
			};
			
			var instance:Temp = new Temp();
			instance.callback = callback;
			
			addEventListener(Event.ENTER_FRAME, instance.conditions);
			addEventListener(MouseEvent.CLICK, callback);
			addEventListener(MouseEvent.MOUSE_DOWN, instance.callback);
			addEventListener(MouseEvent.MOUSE_MOVE, anonymous);
			
			addEventListener(MouseEvent.MOUSE_MOVE, function(e:Event):void { trace(this) } );
			
			instance.addEventListener(Event.ADDED_TO_STAGE, addedToStage);
			
			var obj:Object = {x: Math.random(), ease: "backOut", onComplete: animationComplete };
		}
		
		private function animationComplete():void 
		{
			var test:DictionaryTests = new DictionaryTests();
		}
		
		private function addedToStage(e:Event):void 
		{
			var instance:Temp = Temp(e.currentTarget);
			
			instance.removeEventListener(Event.ADDED_TO_STAGE, addedToStage);
			
			
		}
		
		//constructions
		private function constructions(t1:String):void 
		{
			var t0:int;
			var v:Vertex = new Vertex();
			
			var mouseEnabled:Boolean = true;
			var length:Number = 0;
			
			with (v)
			{
				x = 11;
				y = z = 22;
				length = 33;
				
				while (x--)
				{
					y++;
				}
				
				mouseEnabled = false;
				
				transform.matrix = new Matrix();
			}
		}
		
		private function casting():void
		{
			var array:Array = [new MovieClip(), new Shape(), new Sprite()];
			
			for each(var obj:DisplayObject in array)
			{
				if (obj is MovieClip)
				{
					var totalFrames:int = MovieClip(obj).totalFrames;
				}
				else if (obj is Shape)
				{
					var graphics:Graphics = (obj as Shape).graphics;
				}
				else if(obj is Sprite)
				{
					(obj as Sprite).removeChildAt(0);
					Sprite(obj).graphics.drawRect(Number("0"), Number(String(100).split("")[0]), 100, 100);
				}
			}
			
			var i:int = 10.23 + number1;
			
			i++;
			
			i += 11.22;
			
			i -= 0xffee33;
			
			i -= 1.5e-002;
			
			i = 123;
			
			i = 11 + 22.33 + 1;
			
			i = name.length;
			
			i = new Vertex(1, 2, 3).length;
			
			i = 2 >> 4;
			i = 2 >>> 4.2;
			i = 0xff0000 | x;
		}
		
		//static
		private function statical():void
		{
			_number6 = _number7 + 1;
			Temp._number6 = 123;
		}
		
		public override function toString():String
		{
			return "{" + _number1 + ", " + _number2 + "}";
		}
	}

}