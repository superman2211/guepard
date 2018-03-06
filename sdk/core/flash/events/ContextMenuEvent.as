package flash.events
{
	import flash.display.*;
	
	public class ContextMenuEvent extends Event
	{
		public static const MENU_ITEM_SELECT:String = "menuItemSelect";
		public static const MENU_SELECT:String = "menuSelect";
		
		public function get mouseTarget():InteractiveObject
		{
		}
		
		public function set mouseTarget(value:InteractiveObject):void
		{
		}
		
		public function get contextMenuOwner():InteractiveObject
		{
		}
		
		public function set contextMenuOwner(value:InteractiveObject):void
		{
		}
		
		public function ContextMenuEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, mouseTarget:InteractiveObject = null, contextMenuOwner:InteractiveObject = null)
		{
		}
		
		override public function clone():Event
		{
		}
		
		override public function toString():String
		{
		}
		
	}
}
