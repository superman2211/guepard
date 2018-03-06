package flash.media
{
	import flash.events.*;
	
	final public class Microphone extends EventDispatcher
	{
		
		public static function get names():Array
		{
		}
		
		public static function getMicrophone(index:int = 0):Microphone
		{
		}
		
		public function get name():String
		{
		}
		
		public function get index():int
		{
		}
		
		public function get useEchoSuppression():Boolean
		{
		}
		
		public function get soundTransform():SoundTransform
		{
		}
		
		public function set soundTransform(sndTransform:SoundTransform):void
		{
		}
		
		public function get rate():int
		{
		}
		
		public function set rate(rate:int):void
		{
		}
		
		public function get silenceTimeout():int
		{
		}
		
		public function get silenceLevel():Number
		{
		}
		
		public function get muted():Boolean
		{
		}
		
		public function get activityLevel():Number
		{
		}
		
		public function get gain():Number
		{
		}
		
		public function set gain(gain:Number):void
		{
		}
		
		public function Microphone()
		{
			
		}
		
		public function setUseEchoSuppression(useEchoSuppression:Boolean):void
		{
		}
		
		public function setSilenceLevel(silenceLevel:Number, timeout:int = -1):void
		{
		}
		
		public function setLoopBack(state:Boolean = true):void
		{
		}
		
	}
}
