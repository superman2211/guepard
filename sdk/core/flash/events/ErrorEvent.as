package flash.events
{
	
	public class ErrorEvent extends TextEvent
	{
		public static const ERROR:String = "error";
		
		public function ErrorEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, text:String = "")
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
