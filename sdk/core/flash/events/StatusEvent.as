package flash.events
{
	
	public class StatusEvent extends Event
	{
		public static const STATUS:String = "status";
		
		public function get level():String
		{
		}
		
		public function set level(value:String):void
		{
		}
		
		public function get code():String
		{
		}
		
		public function set code(value:String):void
		{
		}
		
		public function StatusEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, code:String = "", level:String = "")
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
