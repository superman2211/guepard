package com.guepard.converter.shape
{
	import by.blooddy.crypto.SHA1;
	
	import com.guepard.app.Converter;
	import com.guepard.decompiler.data.SWFData;
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.data.TagType;
	import com.guepard.decompiler.serialization.SWFSerializator;
	import com.guepard.decompiler.tags.DefineShape;
	import com.guepard.decompiler.tags.PlaceObject;
	import com.guepard.utils.TextureUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.display.BitmapData;
	import flash.display.Loader;
	import flash.display.LoaderInfo;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.events.Event;
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.geom.Rectangle;
	import flash.system.LoaderContext;
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ShapeExporter
	{
		[Embed(source="../../../../../lib/etalons/shape.swf", mimeType="application/octet-stream")]
		public static const EmptyShape:Class;
		
		private var _tag:Tag;
		private var _data:ShapeData;
		private var _directory:File;
		private var _bitmapTags:Vector.<Tag>;
		
		private var _bytes:ByteArray;
		private var _shape:Shape;
		
		public function get id():int
		{
			return _tag.id;
		}
		
		public function ShapeExporter(tag:Tag, data:ShapeData, directory:File, bitmapTags:Vector.<Tag>)
		{
			_tag = tag;
			_data = data;
			_directory = directory;
			_bitmapTags = bitmapTags;
		}
		
		public function exportShape():Boolean
		{
			Converter.output.log("Export Shape: " + id);
			
			var swf:SWFData = SWFSerializator.read(ByteArray(new EmptyShape()));
			
			var etalon:DefineShape = DefineShape(swf.getFirstTagByTypes([TagType.DEFINE_SHAPE_4]));
			
			var index:int = swf.getTagIndex(etalon);
			
			swf.setTagAt(_tag.clone(), index);
			
			var bitmapTags:Vector.<Tag> = new Vector.<Tag>();
			
			for each(var tag:Tag in _bitmapTags)
			{
				bitmapTags.push(tag.clone());
			}
			
			swf.addTagsAt(bitmapTags, index);
			
			var placeObject:PlaceObject = PlaceObject(swf.getFirstTagByTypes([TagType.PLACE_OBJECT, TagType.PLACE_OBJECT_2, TagType.PLACE_OBJECT_3]));
			
			placeObject.id = id;
			
			_bytes = SWFSerializator.write(swf);
			
			var file:File = _directory.resolvePath(id + ".swf");
			
			var stream:FileStream = new FileStream();
			stream.open(file, FileMode.WRITE);
			stream.writeBytes(_bytes, 0, _bytes.length);
			stream.close();
			
			var xml:XMLNode = swf.toXML();
			
			file = _directory.resolvePath(id + ".xml");
			
			stream = new FileStream();
			stream.open(file, FileMode.WRITE);
			stream.writeUTFBytes(XMLUtil.toMultilineString(xml));
			stream.close();
			
			swf.dispose();
			
			return true;
		}
		
		public function analyzeShape():Boolean
		{
			Converter.output.log("Analyze Shape: " + id);
			
			var context:LoaderContext = new LoaderContext();
			context.allowCodeImport = true;
			
			var loader:Loader = new Loader();
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, loadShapeComplete);
			loader.loadBytes(_bytes, context);
			
			return true;
		}
		
		public function analyzeShapeComplete():Boolean
		{
			return _shape != null;
		}
		
		public function dispose():Boolean
		{
			_tag = null;
			_data = null;
			_directory = null;
			_bitmapTags = null;
			
			_bytes = null;
			_shape = null;
			
			return true;
		}
		
		private function calculateHash(bitmapData:BitmapData):void
		{
			var rect:Rectangle = bitmapData.rect;
			
			var bytes:ByteArray = bitmapData.getPixels(rect)
			
			_data.hash = SHA1.hashBytes(bytes);
		}
		
		private function checkTransparent(bitmapData:BitmapData):void
		{
			var rect:Rectangle = bitmapData.rect;
			
			var pixels:Vector.<uint> = bitmapData.getVector(rect);
			
			for each (var color:uint in pixels)
			{
				var alpha:uint = (color >> 24) & 0xff;
				
				if (alpha < 0xff)
				{
					_data.transparent = true;
					return;
				}
			}
			
			_data.transparent = false;
		}
		
		private function checkColor(bitmapData:BitmapData):void
		{
			var rect:Rectangle = bitmapData.rect;
			
			if (rect.width > 2 && rect.height > 2)
			{
				rect.inflate(-1, -1);
			}
			
			var pixels:Vector.<uint> = bitmapData.getVector(rect);
			
			var pixel:uint = pixels[0];
			
			for each (var color:uint in pixels)
			{
				if (color != pixel)
				{
					_data.color = -1;
					return;
				}
			}
			
			_data.color = pixel;
		}
		
		private function loadShapeComplete(e:Event):void
		{
			Converter.output.log("Load Shape Complete: " + id);
			
			var info:LoaderInfo = LoaderInfo(e.target);
			info.removeEventListener(Event.COMPLETE, loadShapeComplete);
			
			_shape = Shape(MovieClip(info.content).getChildAt(0));
			
			_data.bounds = _shape.getBounds(_shape);
			
			_data.transparent = true;
			
			var bitmapData:BitmapData = TextureUtil.createBitmap(
				_shape,
				_data.bounds,
				_data.width,
				_data.height,
				_data.transparent
			);
			
			checkTransparent(bitmapData);
			checkColor(bitmapData);
			
			bitmapData.dispose();
			
			if (_data.transparent && _data.color == -1)
			{
				var border:Number = Converter.resources.custom.shapeBorder.value;
				
				_data.bounds.inflate(border, border);
			}
			
			_data.baseScale = _data.scale;
			
			_data.file = _directory.resolvePath(id + ".swf");
			
			Converter.output.log("Analyze Shape Complete: " + id);
		}
	}
}