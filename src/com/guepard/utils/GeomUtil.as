package com.guepard.utils
{
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	/**
	 * ...
	 * @author
	 */
	public class GeomUtil
	{
		
		public static function roundRectangle(rectangle:Rectangle):void
		{
			if (rectangle)
			{
				rectangle.x = Math.round(rectangle.x);
				rectangle.y = Math.round(rectangle.y);
				rectangle.width = Math.round(rectangle.width);
				rectangle.height = Math.round(rectangle.height);
			}
		}
		
		public static function roundPoint(point:Point):void
		{
			if (point)
			{
				point.x = Math.round(point.x);
				point.y = Math.round(point.y);
			}
		}
		
		public static function deltaAngleRadians(alpha:Number, betta:Number):Number
		{
			var gamma:Number = betta % 6.28318531 - alpha % 6.28318531;
			if (gamma > 3.14159265) return gamma - 6.28318531;
			else if (gamma < -3.14159265) return gamma + 6.28318531;
			else return gamma;
		}
		
		public static function deltaAngleDegrees(alpha:Number, betta:Number):Number
		{
			var gamma:Number = betta % 360 - alpha % 360;
			if (gamma > 180) return gamma - 360;
			else if (gamma < -180) return gamma + 360;
			else return gamma;
		}
		
		static public function addBorder(rectangle:Rectangle, border:Number):void
		{
			rectangle.x -= border;
			rectangle.y -= border;
			
			border += border;
			
			rectangle.width += border;
			rectangle.height += border;
		}
		
		static public function distance(x0:Number, y0:Number, x1:Number, y1:Number):Number
		{
			var dx:Number = x0 - x1;
			var dy:Number = y0 - y1;
			
			return Math.sqrt(dx * dx + dy * dy);
		}
		
		static public function scaleRectangle(rectangle:Rectangle, scale:Number):void
		{
			rectangle.x *= scale;
			rectangle.y *= scale;
			rectangle.width *= scale;
			rectangle.height *= scale;
		}
		
		static public function limits(source:Number, min:Number, max:Number):Number
		{
			if (min > max)
			{
				var temp:Number = min;
				min = max;
				max = temp;
			}
			
			if (source < min) source = min;
			else if (source > max) source = max;
			
			return source;
		}
		
		static public function getCenter(rectangle:Rectangle):Point
		{
			return new Point(rectangle.x + rectangle.width * 0.5, rectangle.y + rectangle.height * 0.5);
		}
		
		static public function isEmpty(object:Object):Boolean
		{
			if (object is Point)
			{
				var point:Point = Point(object);
				return point.x == 0 && point.y == 0;
			}
			else if (object is Rectangle)
			{
				var rectangle:Rectangle = Rectangle(object);
				return rectangle.x == 0 && rectangle.y == 0 && rectangle.width == 0 && rectangle.height == 0;
			}
			else if (object is Matrix)
			{
				var matrix:Matrix = Matrix(object);
				return matrix.a == 1 && matrix.b == 0 && matrix.c == 0 && matrix.d == 1 && matrix.tx == 0 && matrix.ty == 0;
			}
			else if (object is ColorTransform)
			{
				var ct:ColorTransform = ColorTransform(object);
				
				return ct.alphaMultiplier == 1 &&
					ct.redMultiplier == 1 &&
					ct.greenMultiplier == 1 &&
					ct.blueMultiplier == 1 &&
					
					ct.alphaOffset == 0 &&
					ct.redOffset == 0 &&
					ct.greenOffset == 0 &&
					ct.blueOffset == 0;
			}
			else
			{
				return false;
			}
		}
	}
}