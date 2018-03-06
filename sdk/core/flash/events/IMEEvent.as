package flash.events
{
	
	public class IMEEvent extends TextEvent
	{
		public static const IME_COMPOSITION:String = "imeComposition";
		
		public function IMEEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, text:String = "")
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
