package flash.display
{
	import flash.accessibility.*;
	import flash.errors.IllegalOperationError;
	import flash.events.*;
	import flash.geom.*;
	import flash.text.*;
	import flash.ui.*;
	
	public class Stage extends DisplayObjectContainer
	{
		
		override public function get textSnapshot():TextSnapshot
		{
			
		}
		
		override public function set name(value:String):void
		{
			
		}
		
		override public function get height():Number
		{
			
		}
		
		override public function set height(value:Number):void
		{
			
		}
		
		override public function set blendMode(value:String):void
		{
			
		}
		
		override public function set scale9Grid(value:Rectangle):void
		{
			
		}
		
		override public function set accessibilityImplementation(value:AccessibilityImplementation):void
		{
			
		}
		
		override public function set accessibilityProperties(value:AccessibilityProperties):void
		{
			
		}
		
		override public function set cacheAsBitmap(value:Boolean):void
		{
			
		}
		
		override public function set contextMenu(value:ContextMenu):void
		{
			
		}
		
		override public function set opaqueBackground(value:Object):void
		{
			
		}
		
		override public function set tabIndex(value:int):void
		{
			
		}
		
		override public function set scaleX(value:Number):void
		{
			
		}
		
		override public function set scaleY(value:Number):void
		{
			
		}
		
		override public function set scrollRect(value:Rectangle):void
		{
			
		}
		
		override public function get numChildren():int
		{
			
		}
		
		override public function get tabChildren():Boolean
		{
			
		}
		
		override public function set tabChildren(value:Boolean):void
		{
			
		}
		
		override public function set focusRect(value:Object):void
		{
			
		}
		
		override public function set alpha(value:Number):void
		{
			
		}
		
		override public function set mouseEnabled(value:Boolean):void
		{
			
		}
		
		override public function get mouseChildren():Boolean
		{
			
		}
		
		override public function set mouseChildren(value:Boolean):void
		{
			
		}
		
		override public function get width():Number
		{
			
		}
		
		override public function set width(value:Number):void
		{
			
		}
		
		override public function set mask(value:DisplayObject):void
		{
			
		}
		
		override public function set transform(value:Transform):void
		{
			
		}
		
		override public function set visible(value:Boolean):void
		{
			
		}
		
		override public function set tabEnabled(value:Boolean):void
		{
			
		}
		
		override public function set x(value:Number):void
		{
			
		}
		
		override public function set y(value:Number):void
		{
			
		}
		
		override public function set filters(value:Array):void
		{
			
		}
		
		override public function set rotation(value:Number):void
		{
			
		}
		
		public function get align():String
		{
			
		}
		
		public function set align(value:String):void
		{
			
		}
		
		public function get scaleMode():String
		{
			
		}
		
		public function set scaleMode(value:String):void
		{
			
		}
		
		public function get stageWidth():int
		{
			
		}
		
		public function set stageWidth(value:int):void
		{
			
		}
		
		public function get showDefaultContextMenu():Boolean
		{
			
		}
		
		public function set showDefaultContextMenu(value:Boolean):void
		{
			
		}
		
		public function get stageFocusRect():Boolean
		{
			
		}
		
		public function set stageFocusRect(on:Boolean):void
		{
			
		}
		
		public function get fullScreenWidth():uint
		{
			
		}
		
		public function get stageHeight():int
		{
			
		}
		
		public function set stageHeight(value:int):void
		{
			
		}
		
		public function get fullScreenSourceRect():Rectangle
		{
			
		}
		
		public function set fullScreenSourceRect(value:Rectangle):void
		{
			
		}
		
		public function get fullScreenHeight():uint
		{
			
		}
		
		public function get frameRate():Number
		{
			
		}
		
		public function set frameRate(value:Number):void
		{
			
		}
		
		public function get displayState():String
		{
			
		}
		
		public function set displayState(value:String):void
		{
			
		}
		
		public function get focus():InteractiveObject
		{
			
		}
		
		public function set focus(newFocus:InteractiveObject):void
		{
			
		}
		
		public function get quality():String
		{
			
		}
		
		public function set quality(value:String):void
		{
			
		}
		
		public function Stage()
		{
			
		}
		
		override public function addChild(child:DisplayObject):DisplayObject
		{
			
		}
		
		override public function setChildIndex(child:DisplayObject, index:int):void
		{
			
		}
		
		override public function removeChildAt(index:int):DisplayObject
		{
			
		}
		
		override public function addEventListener(type:String, listener:Function, useCapture:Boolean = false, priority:int = 0, useWeakReference:Boolean = false):void
		{
			
		}
		
		override public function swapChildrenAt(index1:int, index2:int):void
		{
			
		}
		
		override public function willTrigger(type:String):Boolean
		{
			
		}
		
		override public function addChildAt(child:DisplayObject, index:int):DisplayObject
		{
			
		}
		
		override public function hasEventListener(type:String):Boolean
		{
			
		}
		
		public function invalidate():void
		{
			
		}
		
		public function isFocusInaccessible():Boolean
		{
			
		}
		
		private function requireOwnerPermissions():void
		{
			
		}
		
		override public function dispatchEvent(event:Event):Boolean
		{
			
		}
		
	}
}
