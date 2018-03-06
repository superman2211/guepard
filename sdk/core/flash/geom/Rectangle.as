package flash.geom
{
	
	public class Rectangle
	{
		public var y:Number;
		public var x:Number;
		
		public var width:Number;
		public var height:Number;
		
		public function get left():Number
		{
		}
		
		public function set left(value:Number):void
		{
		}
		
		public function get right():Number
		{
		}
		
		public function set right(value:Number):void
		{
		}
		
		public function get top():Number
		{
		}
		
		public function set top(value:Number):void
		{
		}
		
		public function get bottom():Number
		{
		}
		
		public function set bottom(value:Number):void
		{
		}
		
		public function get bottomRight():Point
		{
		}
		
		public function set bottomRight(value:Point):void
		{
		}
		
		public function get topLeft():Point
		{
		}
		
		public function set topLeft(value:Point):void
		{
		}
		
		public function get size():Point
		{
		}
		
		public function set size(value:Point):void
		{
		}
		
		public function Rectangle(x:Number = 0, y:Number = 0, width:Number = 0, height:Number = 0)
		{
		}
		
		public function clone():Rectangle
		{
		}
		
		public function contains(x:Number, y:Number):Boolean
		{
		}
		
		public function containsPoint(point:Point):Boolean
		{
		}
		
		public function containsRect(rect:Rectangle):Boolean
		{
		}
		
		public function isEmpty():Boolean
		{
		}
		
		public function inflate(dx:Number, dy:Number):void
		{
		}
		
		public function inflatePoint(point:Point):void
		{
		}
		
		public function setEmpty():void
		{
		}
		
		public function offset(dx:Number, dy:Number):void
		{
		}
		
		public function offsetPoint(point:Point):void
		{
		}
		
		public function equals(rect:Rectangle):Boolean
		{
		}
		
		public function union(rect:Rectangle):Rectangle
		{
		}
		
		public function intersection(rect:Rectangle):Rectangle
		{
		}
		
		public function intersects(rect:Rectangle):Boolean
		{
		}
		
		public function toString():String
		{
		}
	}
}
