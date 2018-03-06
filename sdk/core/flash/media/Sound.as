package flash.media
{
	import flash.events.*;
	import flash.net.*;
	
	public class Sound extends EventDispatcher
	{
		
		public function get bytesLoaded():uint
		{
		}
		
		public function get bytesTotal():int
		{
		}
		
		public function get isBuffering():Boolean
		{
		}
		
		public function get url():String
		{
		}
		
		public function get length():Number
		{
		}
		
		public function get id3():ID3Info
		{
		}
		
		public function Sound(stream:URLRequest = null, context:SoundLoaderContext = null)
		{
		}
		
		public function load(stream:URLRequest, context:SoundLoaderContext = null):void
		{
		}
		
		public function play(startTime:Number = 0, loops:int = 0, sndTransform:SoundTransform = null):SoundChannel
		{
		}
		
		public function close():void
		{
		}
		
		private function _buildLoaderContext(context:SoundLoaderContext):SoundLoaderContext
		{
		}
		
	}
}
