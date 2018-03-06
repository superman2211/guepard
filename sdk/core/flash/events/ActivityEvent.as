package flash.events
{
	
	public class ActivityEvent extends Event
	{
		public static const ACTIVITY:String = "activity";
		
		public function get activating():Boolean
		{
		}
		
		public function set activating(value:Boolean):void
		{
		}
		
		public function ActivityEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, activating:Boolean = false)
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
