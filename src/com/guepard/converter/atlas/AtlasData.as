package com.guepard.converter.atlas
{
	import com.guepard.converter.shape.ShapeData;
	
	import flash.geom.Rectangle;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class AtlasData
	{
		public var bounds:Rectangle;
		
		public var shape:ShapeData;
		
		public var left:AtlasData;
		public var right:AtlasData;
		
		public function get width():Number
		{
			return bounds.width;
		}
		
		public function set width(value:Number):void
		{
			bounds.width = value;
		}
		
		public function get height():Number
		{
			return bounds.height;
		}
		
		public function set height(value:Number):void
		{
			bounds.height = value;
		}
		
		public function get x():Number
		{
			return bounds.x;
		}
		
		public function set x(value:Number):void
		{
			bounds.x = value;
		}
		
		public function get y():Number
		{
			return bounds.y;
		}
		
		public function set y(value:Number):void
		{
			bounds.y = value;
		}
		
		public function AtlasData()
		{
			bounds = new Rectangle();
		}
		
		public function dispose():void
		{
			bounds = null;
			
			if (shape)
			{
				shape.dispose();
				shape = null;
			}
			
			if (left)
			{
				left.dispose();
				left = null;
			}
			
			if (right)
			{
				right.dispose();
				right = null;
			}
		}
	}
}