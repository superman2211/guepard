package flash.events
{
	
	public class DataEvent extends TextEvent
	{
		public static const DATA:String = "data";
		public static const UPLOAD_COMPLETE_DATA:String = "uploadCompleteData";
		
		public function get data():String
		{
		}
		
		public function set data(value:String):void
		{
		}
		
		public function DataEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, data:String = "")
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
