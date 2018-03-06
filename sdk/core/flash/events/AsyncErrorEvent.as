package flash.events
{
	
	public class AsyncErrorEvent extends ErrorEvent
	{
		public static const ASYNC_ERROR:String = "asyncError";
		public var error:Error;
		
		public function AsyncErrorEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, text:String = "", error:Error = null)
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
