package resources 
{
	import flash.events.EventDispatcher;
	import flash.utils.Dictionary;
	/**
	 * ...
	 * @author Sergey Antonov
	 */
	public class ResourcesManager
	{
		static private var _items:Dictionary = new Dictionary();
		
		static private var _completeHandler:Function;
		static private var _errorHandler:Function;
		static private var _progressHandler:Function;
		
		static private var _itemsForLoad:Vector.<ResourceItem>;
		static private var _itemsTotal:uint;
		
		public static function get itemsTotal():uint
		{
			return _itemsTotal;
		}
		
		public static function get itemsLoaded():uint
		{
			return _itemsTotal - _itemsForLoad.length;
		}
		
		public static function contains(item:ResourceItem):Boolean
		{
			return _items[item.path] != undefined;
		}
		
		public static function clear():void
		{
			for (var path:String in _items) 
			{
				delete _items[path];
			}
		}
		
		public static function getItem(name:String):ResourceItem
		{
			return _items[name];
		}
		
		public static function addItem(item:ResourceItem):void
		{
			if (contains(item)) return;
			
			_items[item.path] = item;
		}
		
		public static function load(completeHandler:Function, progressHandler:Function, errorHandler:Function):void
		{
			_progressHandler = progressHandler;
			_completeHandler = completeHandler;
			_errorHandler = errorHandler;
			
			_itemsForLoad = new Vector.<ResourceItem>();
			
			for (var path:String in _items) 
			{
				var item:ResourceItem = _items[path];
				
				if (!item.loaded) 
				{
					_itemsForLoad.push(_items[path]);
				}
			}
			
			_itemsTotal = _itemsForLoad.length;
			
			loadNext();
		}
		
		static public function updateItem(path:String):void 
		{
			var item:ResourceItem = getItem(path);
			if (item) item.loaded = false;
		}
		
		static private function loadNext():void 
		{
			if(_progressHandler != null) _progressHandler(itemsLoaded / itemsTotal);
			
			if (_itemsForLoad.length)
			{
				var item:ResourceItem = _itemsForLoad.pop();
				item.load(loadNextComplete, loadNextError);
			}
			else
			{
				if (_completeHandler != null) _completeHandler();
			}
		}
		
		static private function loadNextComplete():void 
		{
			loadNext();
		}
		
		static private function loadNextError(message:String):void 
		{
			if(_errorHandler != null) _errorHandler(message);
		}
	}
}