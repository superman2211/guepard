package flash.net
{
	import flash.events.*;
	import flash.utils.*;
	
	public class URLLoader extends EventDispatcher
	{
		public var dataFormat:String = "text";
		public var bytesLoaded:uint = 0;
		public var bytesTotal:uint = 0;
		public var data:Object;
		
		public function URLLoader(request:URLRequest = null)
		{
			
		}
		
		public function load(request:URLRequest):void
		{
		}
		
		public function close():void
		{
		}
		
	}
}
