package com.guepard.tests 
{
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class UnknownExtends extends Sprite 
	{
		
		public function UnknownExtends() 
		{
			super();
			
		}
		
		override public function addChild(child:DisplayObject):DisplayObject 
		{
			return super.addChild(child);
		}
		
		override public function addEventListener(type:String, listener:Function, useCapture:Boolean = false, priority:int = 0, useWeakReference:Boolean = false):void 
		{
			super.addEventListener(type, listener, useCapture, priority, useWeakReference);
		}
		
		override public function get alpha():Number 
		{
			return super.alpha;
		}
		
		override public function set alpha(value:Number):void 
		{
			super.alpha = value;
		}
		
		override public function get width():Number 
		{
			return super.width;
		}
		
		override public function set width(value:Number):void 
		{
			super.width = value;
		}
	}

}