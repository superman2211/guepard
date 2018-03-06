package flash.events
{
	
	public class TimerEvent extends Event
	{
		public static const TIMER_COMPLETE:String = "timerComplete";
		public static const TIMER:String = "timer";
		
		public function TimerEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false)
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
