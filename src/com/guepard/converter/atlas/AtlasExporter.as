package com.guepard.converter.atlas
{
	import by.blooddy.crypto.image.JPEGEncoder;
	import by.blooddy.crypto.image.PNGEncoder;
	
	import com.guepard.app.Converter;
	import com.guepard.utils.TextureUtil;
	
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.Loader;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.net.URLRequest;
	import flash.system.LoaderContext;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import flash.utils.ByteArray;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class AtlasExporter
	{
		private static var _textField:TextField;
		private static var _matrix:Matrix;
		
		private static function init():void
		{
			if (!_textField)
			{
				_textField = new TextField();
				_textField.autoSize = TextFieldAutoSize.LEFT;
				_textField.defaultTextFormat = new TextFormat("courier new", 10, 0xffffff);
				
				_matrix = new Matrix();
			}
		}
		
		private var _atlas:AtlasData;
		private var _debug:File;
		private var _target:File;
		private var _bitmapData:BitmapData;
		private var _bitmapDataDebug:BitmapData;
		private var _items:Vector.<AtlasData>;
		private var _loader:Loader;
		private var _index:int;
		private var _content:DisplayObject;
		
		private var _name:String;
		
		public function get name():String
		{
			return _name;
		}
		
		public function get numItems():int
		{
			return _items.length;
		}
		
		public function get currentItem():AtlasData
		{
			return _items[_index];
		}
		
		public function AtlasExporter(atlas:AtlasData, name:String, debug:File, target:File)
		{
			init();
			
			var extension:String = atlas.shape ? (atlas.shape.transparent ? ".png" : ".jpg") : ".png";
			
			_atlas = atlas;
			_name = name + extension;
			_debug = debug;
			_target = target;
			
			_items = new Vector.<AtlasData>();
			
			pushItems(_atlas);
		}
		
		public function createBitmap():Boolean
		{
			_bitmapData = new BitmapData(_atlas.width, _atlas.height, _atlas.shape ? _atlas.shape.transparent : true, 0);
			_bitmapDataDebug = new BitmapData(_atlas.width, _atlas.height, false, 0xff999999);
			
			drawItem(_atlas);
			
			return true;
		}
		
		public function loadItem():Boolean
		{
			Converter.output.log("Load: " + currentItem.shape.file.name);
			
			currentItem.shape.atlas = _name;
			
			var context:LoaderContext = new LoaderContext();
			context.allowCodeImport = true;
			
			_loader = new Loader();
			_loader.contentLoaderInfo.addEventListener(Event.COMPLETE, loadBitmapComplete);
			_loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, loadBitmapError);
			_loader.load(new URLRequest(currentItem.shape.file.url), context);
			
			return true;
		}
		
		public function loadItemComplete():Boolean
		{
			return _content != null;
		}
		
		public function drawItemShape():Boolean
		{
			Converter.output.log("Draw: " + currentItem.shape.file.name);
			
			var shapeBitmapData:BitmapData = TextureUtil.createBitmap(
				_content,
				currentItem.shape.bounds,
				currentItem.shape.width,
				currentItem.shape.height,
				true
			);
			
			var position:Point = currentItem.bounds.topLeft;
			
			_bitmapData.copyPixels(shapeBitmapData, shapeBitmapData.rect, position);
			_bitmapDataDebug.copyPixels(shapeBitmapData, shapeBitmapData.rect, position, null, null, true);
			
			_textField.text = currentItem.shape.id + " : " + currentItem.shape.width + "x" + currentItem.shape.height;
			
			_matrix.tx = currentItem.x;
			_matrix.ty = currentItem.y;
			
			_bitmapDataDebug.draw(_textField, _matrix);
			
			_content = null;
			
			shapeBitmapData.dispose();
			
			_loader.unload();
			_loader = null;
			
			_index++;
			
			return true;
		}
		
		public function saveBitmap():Boolean
		{
			Converter.output.log("Save Atlas: " + _name);
			
			var bytes:ByteArray = _bitmapData.transparent ? PNGEncoder.encode(_bitmapData) : JPEGEncoder.encode(_bitmapData, Converter.resources.custom.imageQuality.value);
			
			var file:File = _target.resolvePath(_name);
			
			var stream:FileStream = new FileStream();
			stream.open(file, FileMode.WRITE);
			stream.writeBytes(bytes, 0, bytes.length);
			stream.close();
			
			if (Converter.resources.custom.exportDebugTextures.selected)
			{
				bytes = JPEGEncoder.encode(_bitmapDataDebug, 100);
				
				file = _debug.resolvePath(_name.replace(".png", ".jpg"));
				
				stream = new FileStream();
				stream.open(file, FileMode.WRITE);
				stream.writeBytes(bytes, 0, bytes.length);
				stream.close();
			}
			
			return true;
		}
		
		public function dispose():Boolean
		{
			_bitmapData.dispose();
			_bitmapData = null;
			
			_bitmapDataDebug.dispose();
			_bitmapDataDebug = null;
			
			_atlas = null;
			_name = null;
			_debug = null;
			_target = null;
			
			_items = null;
			
			_loader = null;
			_content = null;
			
			return true;
		}
		
		private function pushItems(atlas:AtlasData):void
		{
			if (atlas.shape)
			{
				_items.push(atlas);
			}
			
			if (atlas.left)
			{
				pushItems(atlas.left);
			}
			
			if (atlas.right)
			{
				pushItems(atlas.right);
			}
		}
		
		private function drawItem(atlas:AtlasData):void
		{
			var rect:Rectangle = new Rectangle();
			var color:uint = 0xffff0000;
			
			rect.x = atlas.x;
			rect.y = atlas.y;
			rect.width = atlas.width;
			rect.height = 1;
			
			_bitmapDataDebug.fillRect(rect, color);
			
			rect.x = atlas.x;
			rect.y = atlas.y;
			rect.width = 1;
			rect.height = atlas.height;
			
			_bitmapDataDebug.fillRect(rect, color);
			
			rect.x = atlas.x;
			rect.y = atlas.y + atlas.height;
			rect.width = atlas.width;
			rect.height = 1;
			
			_bitmapDataDebug.fillRect(rect, color);
			
			rect.x = atlas.x + atlas.width;
			rect.y = atlas.y;
			rect.width = 1;
			rect.height = atlas.height;
			
			_bitmapDataDebug.fillRect(rect, color);
			
			if (atlas.left)
			{
				drawItem(atlas.left);
			}
			
			if (atlas.right)
			{
				drawItem(atlas.right);
			}
		}
		
		private function loadBitmapError(e:IOErrorEvent):void
		{
			Converter.output.error(e);
		}
		
		private function loadBitmapComplete(e:Event):void
		{
			_content = DisplayObject(_loader.content);
		}
	}
}