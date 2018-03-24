package resources 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Loader;
	import flash.display.LoaderInfo;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.HTTPStatusEvent;
	import flash.events.IOErrorEvent;
	import flash.events.SecurityErrorEvent;
	import flash.media.Sound;
	import flash.net.URLLoader;
	import flash.net.URLRequest;
	import flash.net.URLStream;
	import flash.system.ApplicationDomain;
	import flash.system.LoaderContext;
	import flash.system.SecurityDomain;
	import flash.utils.ByteArray;
	import flash.xml.XMLDocument;
	import utils.DisplayUtil;
	import utils.Path;
	/**
	 * ...
	 * @author Sergey Antonov
	 */
	public class ResourceItem
	{
		private var _completeHandler:Function;
		private var _errorHandler:Function;
		
		public var width:int;
		public var height:int;
		
		public var path:String;
		public var data:Object;
		public var loaded:Boolean;
		
		public function get movieClip():MovieClip
		{
			return MovieClip(data);
		}
		
		public function get bitmapData():BitmapData
		{
			return Bitmap(data).bitmapData;
		}
		
		public function get string():String
		{
			return String(data);
		}
		
		public function get sound():Sound
		{
			return Sound(data);
		}
		
		public function get xml():XMLDocument
		{
			var xml:XMLDocument = new XMLDocument();
			xml.ignoreWhite = true;
			
			try
			{
				xml.parseXML(String(data));
			}
			catch (e:Error)
			{
				throw new Error("Не верный формат XML.\nФайл: " + path + "\n\n" + e.message);
			}
			
			return xml;
		}
		
		public function ResourceItem(path:String = null)
		{
			this.path = path;
			
			loaded = false;
		}
		
		public function load(completeHandler:Function, errorHandler:Function):void 
		{
			_completeHandler = completeHandler;
			_errorHandler = errorHandler;
			
			var rndPath:String = path + "?rnd=" + Math.random().toString();
			
			trace("load: " + path);
			
			switch(Path.getExtension(path).toLowerCase())
			{
				case "swf":
				case "jpg":
				case "png":
					var loader:Loader = new Loader();
					loader.contentLoaderInfo.addEventListener(Event.COMPLETE, loadDisplayObjectComplete);
					loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, loadIOError);
					loader.load(new URLRequest(rndPath));
					break;
					
				case "txt":
				case "xml":
					var urlLoader:URLLoader = new URLLoader();
					urlLoader.addEventListener(Event.COMPLETE, loadTextComplete);
					urlLoader.addEventListener(IOErrorEvent.IO_ERROR, loadIOError);
					urlLoader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, loadSecurityError);
					urlLoader.load(new URLRequest(rndPath));
					break;
					
				case "mp3":
				case "wav":
					var sound:Sound = new Sound();
					sound.addEventListener(Event.COMPLETE, loadSoundComplete);
					sound.addEventListener(IOErrorEvent.IO_ERROR, loadIOError);
					sound.addEventListener(SecurityErrorEvent.SECURITY_ERROR, loadSecurityError);
					sound.load(new URLRequest(rndPath));
					break;
					
				default:
					var stream:URLStream = new URLStream();
					stream.addEventListener(Event.COMPLETE, loadStreamComplete);
					stream.addEventListener(IOErrorEvent.IO_ERROR, loadIOError);
					stream.addEventListener(SecurityErrorEvent.SECURITY_ERROR, loadSecurityError);
					stream.load(new URLRequest(rndPath));
					break;
			}
		}
		
		private function loadSecurityError(e:SecurityErrorEvent):void 
		{
			if (_errorHandler != null) _errorHandler("Security Error: " + path + "\n\n" + e);
		}
		
		private function loadIOError(e:IOErrorEvent):void 
		{
			if (_errorHandler != null) _errorHandler("File Not Founded: " + path + "\n\n" + e);
		}
		
		public function getClass(className:String):Class 
		{
			return Class(movieClip.loaderInfo.applicationDomain.getDefinition(className));
		}
		
		private function loadComplete():void 
		{
			loaded = true;
			if (_completeHandler != null) _completeHandler();
		}
		
		private function loadStreamComplete(e:Event):void 
		{
			var bytes:ByteArray = new ByteArray();
			
			var stream:URLStream = URLStream(e.target);
			stream.readBytes(bytes, 0, stream.bytesAvailable);
			stream.close();
			
			data = bytes;
			
			loadComplete();
		}
		
		private function loadSoundComplete(e:Event):void 
		{
			data = Sound(e.target);
			
			loadComplete();
		}
		
		private function loadTextComplete(e:Event):void 
		{
			var loader:URLLoader = URLLoader(e.target);
			
			data = loader.data;
			
			loadComplete();
		}
		
		private function loadDisplayObjectComplete(e:Event):void 
		{
			var loaderInfo:LoaderInfo = LoaderInfo(e.target);
			
			DisplayUtil.stop(loaderInfo.content);
			
			data = loaderInfo.content;
			width = loaderInfo.width;
			height = loaderInfo.height;
			
			loadComplete();
		}
	}
}