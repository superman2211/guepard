package flash.net
{
	import flash.events.*;
	
	public class SharedObject extends EventDispatcher
	{
		public static function get defaultObjectEncoding():uint
		{
		}
		
		public static function set defaultObjectEncoding(version:uint):void
		{
		}
		
		public static function getDiskUsage(url:String):int
		{
		}
		
		public static function getLocal(name:String, localPath:String = null, secure:Boolean = false):SharedObject
		{
		}
		
		public static function deleteAll(url:String):int
		{
		}
		
		public static function getRemote(name:String, remotePath:String = null, persistence:Object = false, secure:Boolean = false):SharedObject
		{
		}
		
		public function get size():uint
		{
		}
		
		public function get client():Object
		{
		}
		
		public function set client(object:Object):void
		{
		}
		
		public function set fps(updatesPerSecond:Number):void
		{
		}
		
		public function get data():Object
		{
		}
		
		public function get objectEncoding():uint
		{
		}
		
		public function set objectEncoding(version:uint):void
		{
		}
		
		public function SharedObject()
		{
		}
		
		public function flush(minDiskSpace:int = 0):String
		{
		}
		
		public function setDirty(propertyName:String):void
		{
		}
		
		public function clear():void
		{
		}
		
		public function send(...args:Array):void
		{
		}
		
		public function setProperty(propertyName:String, value:Object = null):void
		{
		}
		
		public function connect(myConnection:NetConnection, params:String = null):void
		{
		}
		
		public function close():void
		{
		}
		
		private function invokeWithArgsArray(index:uint, args:Array):Object
		{
		}
		
		private function invoke(index:uint, ...args:Array):Object
		{
		}
		
	}
}
