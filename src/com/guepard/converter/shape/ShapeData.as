package com.guepard.converter.shape
{
	import flash.filesystem.File;
	import flash.geom.Rectangle;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ShapeData
	{
		public var id:int;
		public var hash:String;
		public var bounds:Rectangle;
		
		public var scaleX:Number;
		public var scaleY:Number;
		
		public var transparent:Boolean;
		public var color:Number;
		
		public var file:File;
		
		public var char:String;
		public var font:String;
		
		public var map:Rectangle;
		public var atlas:String;
		public var target:File;
		public var changed:Boolean;
		public var baseScale:Number;
		
		public function get scale():Number
		{
			return scaleX;
		}
		
		public function set scale(value:Number):void
		{
			scaleX = scaleY = value;
		}
		
		public function get square():Number
		{
			return width * height;
		}
		
		public function get width():int
		{
			return Math.ceil(bounds.width * scaleX);
		}
		
		public function get height():int
		{
			return Math.ceil(bounds.height * scaleY);
		}
		
		public function get sortValue():Number
		{
			return height * 2048 + width;
		}
		
		public function ShapeData()
		{
			
		}
		
		public function dispose():void
		{
			bounds = null;
			file = null;
			char = null;
			font = null;
			map = null;
			atlas = null;
			target = null;
		}
		
	}
	
}