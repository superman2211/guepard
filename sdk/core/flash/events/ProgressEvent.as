package flash.events
{
	
	public class ProgressEvent extends Event
	{
		public static const PROGRESS:String = "progress";
		public static const SOCKET_DATA:String = "socketData";
		
		public function get bytesLoaded():uint
		{
		}
		
		public function set bytesLoaded(value:uint):void
		{
		}
		
		public function get bytesTotal():uint
		{
		}
		
		public function set bytesTotal(value:uint):void
		{
		}
		
		public function ProgressEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, bytesLoaded:uint = 0, bytesTotal:uint = 0)
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
