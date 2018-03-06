package flash.events
{
	
	public class KeyboardEvent extends Event
	{
		public static const KEY_DOWN:String = "keyDown";
		public static const KEY_UP:String = "keyUp";
		
		public function get keyLocation():uint
		{
			
		}
		
		public function set keyLocation(value:uint):void
		{
		}
		
		public function get shiftKey():Boolean
		{
		}
		
		public function set shiftKey(value:Boolean):void
		{
			
		}
		
		public function get ctrlKey():Boolean
		{
		}
		
		public function set ctrlKey(value:Boolean):void
		{
		}
		
		public function get charCode():uint
		{
		}
		
		public function set charCode(value:uint):void
		{
		}
		
		public function get altKey():Boolean
		{
		}
		
		public function set altKey(value:Boolean):void
		{
			
		}
		
		public function get keyCode():uint
		{
		}
		
		public function set keyCode(value:uint):void
		{
		}
		
		public function KeyboardEvent(type:String, bubbles:Boolean = true, cancelable:Boolean = false, charCode:uint = 0, keyCode:uint = 0, keyLocation:uint = 0, ctrlKey:Boolean = false, altKey:Boolean = false, shiftKey:Boolean = false)
		{
		}
		
		override public function clone():Event
		{
		}
		
		override public function toString():String
		{
		}
		
		public function updateAfterEvent():void
		{
		}
		
	}
}
