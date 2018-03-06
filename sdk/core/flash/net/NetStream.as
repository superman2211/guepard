package flash.net
{
	import flash.events.*;
	import flash.media.*;
	
	public class NetStream extends EventDispatcher
	{
		public function get bytesTotal():uint
		{
			
		}
		
		public function get soundTransform():SoundTransform
		{
			
		}
		
		public function set soundTransform(sndTransform:SoundTransform):void
		{
			
		}
		
		public function get bufferTime():Number
		{
			
		}
		
		public function set bufferTime(bufferTime:Number):void
		{
			
		}
		
		public function get currentFPS():Number
		{
			
		}
		
		public function get objectEncoding():uint
		{
			
		}
		
		public function get bufferLength():Number
		{
			
		}
		
		public function get client():Object
		{
			
		}
		
		public function set client(object:Object):void
		{
			
		}
		
		public function get bytesLoaded():uint
		{
			
		}
		
		public function get videoCodec():uint
		{
			
		}
		
		public function get audioCodec():uint
		{
			
		}
		
		public function get time():Number
		{
			
		}
		
		public function get liveDelay():Number
		{
			
		}
		
		public function get decodedFrames():uint
		{
			
		}
		
		public function get checkPolicyFile():Boolean
		{
			
		}
		
		public function set checkPolicyFile(state:Boolean):void
		{
			
		}
		
		public function NetStream(connection:NetConnection)
		{
			
		}
		
		public function togglePause():void
		{
			
		}
		
		public function send(handlerName:String, ...args:Array):void
		{
			
		}
		
		public function seek(offset:Number):void
		{
			
		}
		
		public function attachAudio(microphone:Microphone):void
		{
			
		}
		
		public function publish(name:String = null, type:String = null):void
		{
			
		}
		
		public function play(...args:Array):void
		{
			
		}
		
		public function resume():void
		{
			
		}
		
		public function receiveAudio(flag:Boolean):void
		{
			
		}
		
		public function receiveVideo(flag:Boolean):void
		{
			
		}
		
		public function attachCamera(theCamera:Camera, snapshotMilliseconds:int = -1):void
		{
			
		}
		
		public function receiveVideoFPS(FPS:Number):void
		{
			
		}
		
		public function pause():void
		{
			
		}
		
		public function close():void
		{
			
		}
		
	}
}
