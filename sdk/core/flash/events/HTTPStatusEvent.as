package flash.events
{
	
	public class HTTPStatusEvent extends Event
	{
		public static const HTTP_STATUS:String = "httpStatus";
		
		public function get status():int
		{
		}
		
		public function HTTPStatusEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, status:int = 0)
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
