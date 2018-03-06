package flash.geom
{
	public class Vector3D extends Object
	{
		public static const X_AXIS:Vector3D = new Vector3D(1, 0, 0);
		public static const Y_AXIS:Vector3D = new Vector3D(0, 1, 0);
		public static const Z_AXIS:Vector3D = new Vector3D(0, 0, 1);
		
		public static function angleBetween(a:Vector3D, b:Vector3D):Number
		{
			return 0;
		}

		public static function distance(pt1:Vector3D, pt2:Vector3D):Number
		{
			return 0;
		}
		public var w:Number;
		public var x:Number;
		public var y:Number;
		public var z:Number;
		
		public function get length():Number
		{
			return 0;
		}
		
		public function get lengthSquared():Number
		{
			return 0;
		}
		
		public function Vector3D(x:Number = 0, y:Number = 0, z:Number = 0, w:Number = 0)
		{
		}
		
		public function add(a:Vector3D):Vector3D
		{
			return null;
		}
		
		public function clone():Vector3D
		{
			return null;
		}
		
		public function copyFrom(sourceVector3D:Vector3D):void
		{
		}
		
		public function crossProduct(a:Vector3D):Vector3D
		{
			return null;
		}
		
		public function decrementBy(a:Vector3D):void
		{
		}
		
		public function dotProduct(a:Vector3D):Number
		{
			return 0;
		}
		
		public function equals(toCompare:Vector3D, allFour:Boolean = false):Boolean
		{
			return false;
		}
		
		public function incrementBy(a:Vector3D):void
		{
		}
		
		public function nearEquals(toCompare:Vector3D, tolerance:Number, allFour:Boolean = false):Boolean
		{
			return false;
		}
		
		public function negate():void
		{
		}
		
		public function normalize():Number
		{
			return 0;
		}
		
		public function project():void
		{
		}
		
		public function scaleBy(s:Number):void
		{
		}
		
		public function setTo(xa:Number, ya:Number, za:Number):void
		{
		}
		
		public function subtract(a:Vector3D):Vector3D
		{
			return null;
		}
		
		public function toString():String
		{
			return "";
		}
	}
}
