package flash.media
{
	import flash.events.*;
	
	final public class Camera extends EventDispatcher
	{
		
		public static function get names():Array
		{
		}
		
		public static function getCamera(name:String = null):Camera
		{
		}
		
		public function get motionTimeout():int
		{
		}
		
		public function get index():int
		{
		}
		
		public function get loopback():Boolean
		{
		}
		
		public function get width():int
		{
		}
		
		public function get name():String
		{
		}
		
		public function get height():int
		{
		}
		
		public function get fps():Number
		{
		}
		
		public function get muted():Boolean
		{
		}
		
		public function get motionLevel():int
		{
		}
		
		public function get currentFPS():Number
		{
		}
		
		public function get bandwidth():int
		{
		}
		
		public function get keyFrameInterval():int
		{
		}
		
		public function get activityLevel():Number
		{
		}
		
		public function get quality():int
		{
		}
		
		public function Camera()
		{
			
		}
		
		public function setMotionLevel(motionLevel:int, timeout:int = 2000):void
		{
		}
		
		public function setLoopback(compress:Boolean = false):void
		{
		}
		
		public function setCursor(value:Boolean):void
		{
		}
		
		public function setMode(width:int, height:int, fps:Number, favorArea:Boolean = true):void
		{
		}
		
		public function setKeyFrameInterval(keyFrameInterval:int):void
		{
		}
		
		public function setQuality(bandwidth:int, quality:int):void
		{
		}
		
	}
}
