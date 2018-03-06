package flash.events
{
	import flash.utils.*;
	
	public class NetFilterEvent extends Event
	{
		public var data:ByteArray;
		public var header:ByteArray;
		
		public function NetFilterEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, header:ByteArray = null, data:ByteArray = null)
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
