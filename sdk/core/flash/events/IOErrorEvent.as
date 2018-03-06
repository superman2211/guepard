package flash.events
{
	
	public class IOErrorEvent extends ErrorEvent
	{
		public static const DISK_ERROR:String = "diskError";
		public static const NETWORK_ERROR:String = "networkError";
		public static const VERIFY_ERROR:String = "verifyError";
		public static const IO_ERROR:String = "ioError";
		
		public function IOErrorEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, text:String = "")
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
