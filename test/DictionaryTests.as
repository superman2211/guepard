package com.guepard.tests 
{
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.utils.Dictionary;
	
	/**
	 * ...
	 * @author ...
	 */
	public class DictionaryTests 
	{
		private var _dict:Dictionary;
		
		public function get dict():Dictionary 
		{
			return _dict;
		}
		
		public function DictionaryTests() 
		{
			_dict = new Dictionary();
			
			_dict[Matrix] = new Point();
			_dict[Point] = new Matrix();
			_dict[_dict[Matrix]] = Matrix;
			_dict[_dict[Point]] = Point;
		}
		
		public function cycles():void
		{
			for (var prop:Object in _dict)
			{
				trace(prop + " = " + dict[prop]);
				
				if (prop == Matrix)
				{
					_dict[prop].tx = 10;
					var a:Number = dict[prop].ty = 20;
				}
			}
			
			for each (var value:Object in dict)
			{
				trace(value);
			}
		}
		
		public function remove():void
		{
			delete _dict[Matrix];
			delete dict[Point];
		}
		
		public static function test():void
		{
			var test:DictionaryTests = new DictionaryTests();
			
			for (var prop:Object in test.dict)
			{
				trace(prop + " = " + test.dict[prop]);
				
				if (prop == Matrix)
				{
					test.dict[prop].tx = 10;
					var b:Number = test.dict[prop].ty = 20;
				}
				
				if (prop == Point)
				{
					delete test.dict[prop];
				}
			}
			
			for each (var value:Object in test.dict)
			{
				if (value is Point)
				{
					value.x = 10;
					value.y = 20;
				}
			}
		}
		
		
	}

}