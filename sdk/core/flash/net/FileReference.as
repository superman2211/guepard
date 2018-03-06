package flash.net
{
	import flash.events.*;
	
	public class FileReference extends EventDispatcher
	{
		
		public function get creator():String
		{
		}
		
		public function get size():uint
		{
		}
		
		public function get type():String
		{
		}
		
		public function get name():String
		{
		}
		
		public function get modificationDate():Date
		{
		}
		
		public function get creationDate():Date
		{
		}
		
		public function FileReference()
		{
		}
		
		public function browse(typeFilter:Array = null):Boolean
		{
		}
		
		public function upload(request:URLRequest, uploadDataFieldName:String = "Filedata", testUpload:Boolean = false):void
		{
		}
		
		public function cancel():void
		{
		}
		
		public function download(request:URLRequest, defaultFileName:String = null):void
		{
		}
		
	}
}
