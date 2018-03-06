package flash.events
{
	
	public class SyncEvent extends Event
	{
		public static const SYNC:String = "sync";
		
		public function get changeList():Array
		{
		}
		
		public function set changeList(value:Array):void
		{
		}
		
		public function SyncEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, changeList:Array = null)
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
