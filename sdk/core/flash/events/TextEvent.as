package flash.events
{
	
	public class TextEvent extends Event
	{
		public static const TEXT_INPUT:String = "textInput";
		public static const LINK:String = "link";
		
		public function get text():String
		{
		}
		
		public function set text(value:String):void
		{
		}
		
		public function TextEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, text:String = "")
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
