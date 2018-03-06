package com.guepard.app.gui
{
	import flash.display.MovieClip;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Controller
	{
		private var _design:MovieClip;
		
		public function get design():MovieClip
		{
			return _design;
		}
		
		public function get x():Number
		{
			return _design.x;
		}
		
		public function set x(value:Number):void
		{
			_design.x = value;
		}
		
		public function get y():Number
		{
			return _design.y;
		}
		
		public function set y(value:Number):void
		{
			_design.y = value;
		}
		
		public function get width():Number
		{
			return _design.width;
		}
		
		public function set width(value:Number):void
		{
			_design.width = value;
		}
		
		public function get height():Number
		{
			return _design.height;
		}
		
		public function set height(value:Number):void
		{
			_design.height = value;
		}
		
		public function get enabled():Boolean
		{
			return _design.mouseEnabled;
		}
		
		public function set enabled(value:Boolean):void
		{
			_design.mouseEnabled = value;
			_design.mouseChildren = value;
			_design.alpha = value ? 1 : 0.5;
		}
		
		public function Controller(design:MovieClip)
		{
			_design = design;
		}
	}
	
}