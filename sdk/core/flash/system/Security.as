package flash.system
{
	
	final public class Security
	{
		public static const LOCAL_TRUSTED:String = "localTrusted";
		public static const REMOTE:String = "remote";
		public static const LOCAL_WITH_FILE:String = "localWithFile";
		public static const LOCAL_WITH_NETWORK:String = "localWithNetwork";
		
		public static function get sandboxType():String
		{
		}
		
		public static function get exactSettings():Boolean
		{
		}
		
		public static function set exactSettings(value:Boolean):void
		{
		}
		
		public static function get disableAVM1Loading():Boolean
		{
		}
		
		public static function set disableAVM1Loading(value:Boolean):void
		{
		}
		
		public static function showSettings(panel:String = "default"):void
		{
		}
		
		public static function allowDomain(...args:Array):void
		{
		}
		
		public static function allowInsecureDomain(...args:Array):void
		{
		}
		
		public static function loadPolicyFile(url:String):void
		{
		}
		
	}
}
