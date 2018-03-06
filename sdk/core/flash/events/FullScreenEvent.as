package flash.events
{
	
	public class FullScreenEvent extends ActivityEvent
	{
		public static const FULL_SCREEN:String = "fullScreen";
		
		public function get fullScreen():Boolean
		{
		}
		
		public function FullScreenEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, fullScreen:Boolean = false)
		{
		}
		
		override public function toString():String
		{
		}
		
		override public function clone():Event
		{
		}
		
	}
}
