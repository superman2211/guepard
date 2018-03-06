package flash.events
{
	
	public class SecurityErrorEvent extends ErrorEvent
	{
		public static const SECURITY_ERROR:String = "securityError";
		
		public function SecurityErrorEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, text:String = "")
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
