package com.guepard.converter
{
	import com.guepard.app.Converter;
	import com.guepard.app.data.Builder;
	import com.guepard.converter.atlas.AtlasData;
	import com.guepard.converter.atlas.AtlasExporter;
	import com.guepard.converter.atlas.AtlasGenerator;
	import com.guepard.converter.shape.ShapeData;
	import com.guepard.converter.shape.ShapeExporter;
	import com.guepard.decompiler.data.SWFData;
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.data.TagType;
	import com.guepard.decompiler.serialization.SWFSerializator;
	import com.guepard.decompiler.tags.AudioCodingFormat;
	import com.guepard.decompiler.tags.DefineFont;
	import com.guepard.decompiler.tags.DefineShape;
	import com.guepard.decompiler.tags.DefineSound;
	import com.guepard.tasks.Task;
	import com.guepard.utils.XMLUtil;
	
	import deng.fzip.FZip;
	
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ResourcesConverter extends Builder
	{
		static public const XML_HEADER:String = '<?xml version="1.0" encoding="utf-8"?>';
		
		private static var _resources:Vector.<SWFData> = new Vector.<SWFData>();
		
		static public function get resources():Vector.<SWFData>
		{
			return _resources;
		}
		
		static public function getRequiredClasses():Vector.<String>
		{
			var classes:Vector.<String> = new Vector.<String>();
			
			for each(var swf:SWFData in _resources)
			{
				swf.pushRequiredClasses(classes);
			}
			
			return classes;
		}
		
		private var _target:File;
		private var _file:File;
		private var _debug:File;
		private var _shapes:Vector.<ShapeData>;
		private var _atlasGenerator:AtlasGenerator;
		private var _corrections:Dictionary;
		private var _name:String;
		private var _hash:String;
		private var _dataFiles:Vector.<File>;
		
		private var _swf:SWFData;
		
		public function get swf():SWFData
		{
			return _swf;
		}
		
		public function get shapesDirectory():File
		{
			return _debug.resolvePath("shapes");
		}
		
		public function get fontsDirectory():File
		{
			return _debug.resolvePath("fonts");
		}
		
		public function ResourcesConverter(file:File, debug:File, name:String, target:File)
		{
			super("Convert Resources '" + name + "'");
			
			_file = file;
			_debug = debug;
			_name = name;
			_target = target;
			
			_dataFiles = new Vector.<File>();
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			_target = null;
			_file = null;
			_debug = null;
			_corrections = null;
			_name = null;
			
			_dataFiles = null;
			
			if (_swf)
			{
				_swf.dispose();
				_swf = null;
			}
			
			if (_shapes)
			{
				for each(var data:ShapeData in _shapes)
				{
					data.dispose();
				}
				
				_shapes = null;
			}
			
			if (_atlasGenerator)
			{
				_atlasGenerator.dispose();
				_atlasGenerator = null;
			}
			
			_resources.length = 0;
		}
		
		override public function start(completeHandler:Function, progressHandler:Function):void
		{
			super.start(completeHandler, progressHandler);
			
			_corrections = new Dictionary();
			
			Converter.output.log("Init Converter");
			
			tasks.addTask(new Task(readSwf));
			tasks.addTask(new Task(initDirectories));
			tasks.addTask(new Task(readCorrections));
			tasks.start(initExportComplete, initExportProogress);
		}
		
		public function updateShapes():Boolean
		{
			var shapeTags:Vector.<Tag> = _swf.getTagsByTypes(
				[
					TagType.DEFINE_SHAPE,
					TagType.DEFINE_SHAPE_2,
					TagType.DEFINE_SHAPE_3,
					TagType.DEFINE_SHAPE_4
				],
				true
			);
			
			var library:Dictionary = new Dictionary();
			
			for each(var shape:DefineShape in shapeTags)
			{
				library[shape.id] = shape;
			}
			
			for each(var data:ShapeData in _shapes)
			{
				shape = library[data.id];
				
				if (shape)
				{
					shape.bounds = data.bounds;
					shape.map = data.map;
					shape.atlas = data.atlas;
					shape.color = data.color;
				}
			}
			
			return true;
		}
		
		private function initExportProogress(value:Number):void
		{
			progress(0.1 * value);
		}
		
		private function initExportComplete():void
		{
			Converter.output.log("Init Export Shapes");
			
			if (_swf)
			{
				exportShapes();
			}
			else
			{
				complete();
			}
		}
		
		private function exportShapes():void
		{
			Converter.output.log("Start Export Shapes");
			
			var bitmapTags:Vector.<Tag> = _swf.getTagsByTypes(
				[
					TagType.JPEG_TABLES,
					TagType.DEFINE_BITS,
					TagType.DEFINE_BITS_JPEG_2,
					TagType.DEFINE_BITS_JPEG_3,
					TagType.DEFINE_BITS_JPEG_4,
					TagType.DEFINE_BITS_LOSS_LESS,
					TagType.DEFINE_BITS_LOSS_LESS_2,
				],
				true
			);
			
			var shapeTags:Vector.<Tag> = _swf.getTagsByTypes(
				[
					TagType.DEFINE_SHAPE,
					TagType.DEFINE_SHAPE_2,
					TagType.DEFINE_SHAPE_3,
					TagType.DEFINE_SHAPE_4
				],
				true
			);
			
			_shapes = new Vector.<ShapeData>();
			
			tasks.removeTasks();
			
			for each(var tag:DefineShape in shapeTags)
			{
				var shape:ShapeData = new ShapeData();
				shape.id = tag.id;
				
				shape.scale = tag.maxScale * Converter.resources.shapeScale * getCorrection(tag.id);
				
				_shapes.push(shape);
				
				var exporter:ShapeExporter = new ShapeExporter(tag, shape, shapesDirectory, bitmapTags);
				
				tasks.addTask(new Task(exporter.exportShape));
				tasks.addTask(new Task(exporter.analyzeShape));
				tasks.addTask(new Task(exporter.analyzeShapeComplete));
				tasks.addTask(new Task(exporter.dispose));
			}
			
			tasks.start(exportShapesComplete, exportShapesProogress);
		}
		
		private function exportShapesProogress(value:Number):void
		{
			progress(0.1 + 0.6 * value);
		}
		
		private function exportShapesComplete():void
		{
			Converter.output.log("Export Shapes Complete");
			
			generateAtlases();
		}
		
		private function generateAtlases():void
		{
			Converter.output.log("Start Generate Atlases");
			
			_atlasGenerator = new AtlasGenerator(_shapes, _file);
			
			tasks.removeTasks();
			
			tasks.addTask(new Task(_atlasGenerator.createAtlases));
			tasks.addTask(new Task(_atlasGenerator.removeColorShapes));
			tasks.addTask(new Task(_atlasGenerator.generateBigAtlases));
			tasks.addTask(new Task(_atlasGenerator.correctShapes));
			tasks.addTask(new Task(_atlasGenerator.generateAtlas));
			
			tasks.start(generateAtlasesComplete, generateAtlasesProogress);
		}
		
		private function generateAtlasesProogress(value:Number):void
		{
			progress(0.8 + 0.1 * value);
		}
		
		private function generateAtlasesComplete():void
		{
			Converter.output.log("Generate Atlases Complete");
			
			tasks.removeTasks();
			
			for (var i:int = 0; i < _atlasGenerator.atlases.length; i++)
			{
				var atlas:AtlasData = _atlasGenerator.atlases[i];
				
				var exporter:AtlasExporter = new AtlasExporter(atlas, _name + "_" + i, _debug, _target);
				
				_dataFiles.push(_target.resolvePath(exporter.name));
				
				tasks.addTask(new Task(exporter.createBitmap));
				
				var items:int = exporter.numItems;
				
				while (items--)
				{
					tasks.addTask(new Task(exporter.loadItem));
					tasks.addTask(new Task(exporter.loadItemComplete));
					tasks.addTask(new Task(exporter.drawItemShape));
				}
				
				tasks.addTask(new Task(exporter.saveBitmap));
				tasks.addTask(new Task(exporter.dispose));
			}
			
			Converter.output.log("Start Export Atlases");
			
			tasks.start(exportAtlasesComplete, exportAtlasesProogress);
		}
		
		private function exportAtlasesProogress(value:Number):void
		{
			progress(0.9 + 0.1 * value);
		}
		
		private function exportAtlasesComplete():void
		{
			Converter.output.log("Export Atlases Complete");
			
			tasks.removeTasks();
			tasks.addTask(new Task(updateShapes));
			
			Converter.output.log("Start Export Sounds And Data");
			
			var soundTags:Vector.<Tag> = _swf.getTagsByTypes([TagType.DEFINE_SOUND], true);
			
			var index:int = 0;
			
			for each(var defineSound:DefineSound in soundTags)
			{
				tasks.addTask(new Task(exportSound, [defineSound, index++]));
			}
			
			tasks.addTask(new Task(exportSwfData));
			tasks.addTask(new Task(exportFonts));
			tasks.addTask(new Task(copySWF));
			tasks.addTask(new Task(exportZIP));
			tasks.start(exportSwfDataComplete);
		}
		
		private function exportFonts():Boolean
		{
			if (Converter.resources.custom.exportFonts.selected)
			{
				var tags:Vector.<Tag> = _swf.getTagsByTypes(
					[TagType.DEFINE_FONT, TagType.DEFINE_FONT_2, TagType.DEFINE_FONT_3, TagType.DEFINE_FONT_4],
					true
				);
				
				for each(var tag:DefineFont in tags)
				{
					if (tag.name && FontsExporter.fonts.indexOf(tag.name) == -1)
					{
						FontsExporter.fonts.push(tag.name);
					}
				}
			}
			
			return true;
		}
		
		private function exportZIP():Boolean
		{
			var bytes:ByteArray;
			var stream:FileStream;
			
			if (Converter.target.custom.exportDataInZIP.selected)
			{
				var zip:FZip = new FZip();
				
				for each(var file:File in _dataFiles)
				{
					bytes = new ByteArray();
					
					stream = new FileStream();
					stream.open(file, FileMode.READ);
					stream.readBytes(bytes, 0, stream.bytesAvailable);
					stream.close();
					
					zip.addFile(file.name, bytes);
				}
				
				var target:File = _target.resolvePath(_name + ".zip");
				
				bytes = new ByteArray();
				
				zip.serialize(bytes);
				
				stream = new FileStream();
				stream.open(target, FileMode.WRITE);
				stream.writeBytes(bytes, 0, bytes.length);
				stream.close();
			}
			
			return true;
		}
		
		private function copySWF():Boolean
		{
			if (Converter.target.custom.copyOriginalSWF.selected)
			{
				var target:File = _target.resolvePath(_name + ".swf");
				
				_file.copyTo(target, true);
				
				_dataFiles.push(target);
			}
			
			return true;
		}
		
		private function exportSound(defineSound:DefineSound, index:int):Boolean
		{
			if (defineSound.format == AudioCodingFormat.MP3)
			{
				defineSound.path = _name + "_" + index + ".mp3";
				
				var file:File = _target.resolvePath(defineSound.path);
				
				Converter.output.log("Export Sound: " + file.name + "(" + index + ")");
				
				var stream:FileStream = new FileStream();
				stream.open(file, FileMode.WRITE);
				stream.writeBytes(defineSound.bytes, 0, defineSound.bytes.length);
				stream.close();
			}
			
			return true;
		}
		
		private function exportSwfDataComplete():void
		{
			Converter.output.log("Export Sounds And Data Complete");
			
			complete();
		}
		
		private function getCorrection(id:int):Number
		{
			if (_corrections[id] != undefined)
			{
				return _corrections[id];
			}
			else
			{
				return 1;
			}
		}
		
		private function exportSwfData():Boolean
		{
			Converter.output.log("Export SWFData Data");
			
			var xml:XMLNode = _swf.toXML();
			
			xml.attributes.hash = _hash;
			
			xml.attributes.border = Converter.resources.custom.shapeBorder.value;
			
			var debugData:String = XML_HEADER + "\r\n" + XMLUtil.toMultilineString(xml);
			var data:String = XML_HEADER + xml.toString();
			
			var file:File = _debug.resolvePath(_name + ".xml");
			
			_dataFiles.push(file);
			
			var stream:FileStream = new FileStream();
			stream.open(file, FileMode.WRITE);
			stream.writeUTFBytes(debugData);
			stream.close();
			
			file = _target.resolvePath(_name + ".xml");
			
			stream = new FileStream();
			stream.open(file, FileMode.WRITE);
			stream.writeUTFBytes(Converter.target.custom.minify.selected ? data : debugData);
			stream.close();
			
			Converter.output.log("Export SWFData Data Complete");
			
			return true;
		}
		
		private function readSwf():Boolean
		{
			Converter.output.log("Read SWFData");
			
			var bytes:ByteArray = new ByteArray();
			
			var stream:FileStream = new FileStream();
			stream.open(_file, FileMode.READ);
			stream.readBytes(bytes, 0, stream.bytesAvailable);
			stream.close();
			
			_swf = SWFSerializator.read(bytes);
			
			_swf.correct();
			
			_resources.push(_swf);
			
			Converter.output.log("Read SWFData Complete");
			
			return true;
		}
		
		private function readCorrections():Boolean
		{
			if (!_swf) return true;
			
			Converter.output.log("Read Corrections");
			
			var file:File = _file.parent.resolvePath(_file.name.replace(".swf", ".txt"));
			
			if (file.exists)
			{
				var stream:FileStream = new FileStream();
				stream.open(file, FileMode.READ);
				
				var text:String = stream.readUTFBytes(stream.bytesAvailable);
				
				stream.close();
				
				var lines:Array = text.split("\n");
				
				for each(var line:String in lines)
				{
					var parts:Array = line.split(" ");
					
					if (parts.length == 2)
					{
						var id:int = int(parts[0]);
						var scale:Number = Number(parts[1]);
						
						_corrections[id] = scale;
					}
				}
				
				Converter.output.log("Read Corrections Complete");
			}
			
			return true;
		}
		
		private function initDirectories():Boolean
		{
			if (!_swf) return true;
			
			Converter.output.log("Init Directories");
			
			if (_debug.exists)
			{
				
			}
			else
			{
				_debug.createDirectory();
			}
			
			if (shapesDirectory.exists)
			{
				
			}
			else
			{
				shapesDirectory.createDirectory();
			}
			
			if (fontsDirectory.exists)
			{
				
			}
			else
			{
				fontsDirectory.createDirectory();
			}
			
			Converter.output.log("Init Directories Complete");
			
			return true;
		}
	}
}