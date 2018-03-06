package com.guepard.tests 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Unknown 
	{
		//unknown types
		var unknown1;
		var unknown2;
		var unknown3;
		var unknown4;
		var unknown5;
		
		var obj0:*="string";
		var obj1:*=123.456;
		var obj2:* = 2;
		
		var xml = <test/>;
		
		private static var _instance;
		
		public static function get instance()
		{
			return _instance;
		}
		
		public static function set instance(value)
		{
			_instance = value;
		}
		
		public function Unknown() 
		{
			if (!Unknown.instance)
			{
				Unknown.instance = this;
			}
		}
		
		private function parametersAndLocals(param1, param2, param3)
		{
			var s = "test";
			var n = 123.123;
			var i = Math.round(n);
			var u = int(n);
			var b = true;
			var r = n + i + s;
			var p = Point.polar(1, 2);
			var m = new Matrix(1, 2, 3, 4, 5, 6)
			var d = m.deltaTransformPoint(p);
			
			var regExp1 = /(1,2,3)\/\/.*|\/\* [^]*?\*\//g;
			var regExp2 = /'([^']*)'/;
			
			unknown5 = new UnknownItem();
			
			param1 = (n + i) / 2.2356478;
			
			var s_t_r = "this string";
			
			if (s_t_r < n)
			{
				var f = n > u;
				
				unknown1 = "str";
				unknown2 = 1;
				unknown3 = unknown2 > unknown1;
				unknown4 = p.add(new Point(1, 2));
				
				param2 = param1.toString();
				param3 = param2.split(",");
				
				var element = param3[0];
			}
			
			var v = new UnknownItem(1, 2, 3);
			v.unknown = 10;
			
			var tmp = Unknown.instance.unknown5.clone().length;
			
			return n + i + s;
		}
		
		private function arrays(classes, instances, interfaces, multy)
		{
			var numbers = [1, 2, 3];
			var strings = ["test", String(this), numbers.join(";")];
			var booleans = [true, numbers[0] > 1, !numbers];
			var objects = [true, 1, "str"];
			
			classes = [MovieClip, Shape, Sprite];
			instances = [new MovieClip(), new Shape(), new Sprite()];
			interfaces = [new Bitmap(), new BitmapData(100, 100), new Sprite(), new MovieClip()];
			
			var a = 123;
			var b = 235;
			
			multy = [];
			multy[0] = "str";
			
			multy = [];
			multy[0] = new Array();
			multy[0][1] = []
			multy[0][1][3] = a > b;
			
			
			
			var i = multy[0][2].length;
			
			var x = <root />
		}
		
		private function unknownArrayItem()
		{
			var array = [];
			
			array.push(new Sprite());
			array.push(new Point());
			array.push(new Rectangle());
			array.push( { x: 1, y: 2 } );
			
			for each(var item in array)
			{
				trace(item.x);
				
				item.x = Math.random();
			}
			
			trace(array[0].transform.matrix);
			trace(array[1].x);
		}
		
		private function unknownParameters(param1:*=10,param2:*="s")
		{
			var v = get();
			
			set(v + 10);
		}
		
		var _value:int;
		
		public function set(value:int):void
		{
			_value = value;
		}
		
		public function get()
		{
			return _value;
		}
	}

}