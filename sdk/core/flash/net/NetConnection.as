package flash.net
{
	import flash.events.*;
	
	public class NetConnection extends EventDispatcher
	{
		
		public static function get defaultObjectEncoding():uint
		{
		}
		
		public static function set defaultObjectEncoding(version:uint):void
		{
		}
		
		public function get proxyType():String
		{
		}
		
		public function set proxyType(ptype:String):void
		{
		}
		
		public function get connected():Boolean
		{
		}
		
		public function get client():Object
		{
		}
		
		public function set client(object:Object):void
		{
		}
		
		public function get usingTLS():Boolean
		{
		}
		
		public function get uri():String
		{
		}
		
		public function get objectEncoding():uint
		{
		}
		
		public function set objectEncoding(version:uint):void
		{
		}
		
		public function get connectedProxyType():String
		{
		}
		
		public function NetConnection()
		{
		}
		
		public function addHeader(operation:String, mustUnderstand:Boolean = false, param:Object = null):void
		{
		}
		
		public function call(command:String, responder:Responder, ...args:Array):void
		{
		}
		
		public function connect(command:String, ...args:Array):void
		{
		}
		
		public function close():void
		{
		}
		
	}
}
