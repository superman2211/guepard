package com.guepard.converter.atlas
{
	import com.guepard.app.Converter;
	import com.guepard.converter.shape.ShapeData;
	import com.guepard.utils.TextureUtil;
	
	import flash.filesystem.File;
	import flash.geom.Rectangle;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class AtlasGenerator
	{
		private var _shapes:Vector.<ShapeData>;
		private var _file:File;
		private var _atlases:Vector.<AtlasData>;
		
		public function get atlases():Vector.<AtlasData>
		{
			return _atlases;
		}
		
		public function AtlasGenerator(shapes:Vector.<ShapeData>, file:File)
		{
			_file = file;
			_shapes = shapes.slice();
			
			_shapes.sort(sortShapes);
		}
		
		public function createAtlases():Boolean
		{
			_atlases = new Vector.<AtlasData>();
			
			return true;
		}
		
		public function removeColorShapes():Boolean
		{
			for (var i:int = 0; i < _shapes.length; i++)
			{
				var shape:ShapeData = _shapes[i];
				
				if (shape.color != -1)
				{
					_shapes.splice(i, 1);
					i--;
				}
			}
			
			return true;
		}
		
		public function generateBigAtlases():Boolean
		{
			for (var i:int = 0; i < _shapes.length; i++)
			{
				var shape:ShapeData = _shapes[i];
				
				if (shape.width >= Converter.resources.textureBigSize || shape.height >= Converter.resources.textureBigSize)
				{
					_shapes.splice(i, 1);
					i--;
					
					var atlas:AtlasData = new AtlasData();
					atlas.width = TextureUtil.getTextureSize(shape.width);
					atlas.height = TextureUtil.getTextureSize(shape.height);
					
					atlas.shape = shape;
					
					if (Converter.resources.custom.shapeBigScale.selected)
					{
						shape.scaleX = atlas.bounds.width / shape.bounds.width;
						shape.scaleY = atlas.bounds.height / shape.bounds.height;
						
						shape.map = atlas.bounds;
					}
					else
					{
						shape.scaleX = shape.width > atlas.bounds.width ? atlas.bounds.width / shape.bounds.width : shape.scaleX;
						shape.scaleY = shape.height > atlas.bounds.height ? atlas.bounds.height / shape.bounds.height : shape.scaleY;
						
						shape.map = new Rectangle(0, 0, shape.width, shape.height);
					}
					
					_atlases.push(atlas);
					
					return false;
				}
			}
			
			return true;
		}
		
		public function correctShapes():Boolean
		{
			var border:Number = Converter.resources.custom.shapeBorder.value;
			
			for each(var shape:ShapeData in _shapes)
			{
				if (!shape.transparent && shape.color == -1)
				{
					shape.bounds.inflate(border, border);
				}
			}
			
			return true;
		}
		
		public function generateAtlas():Boolean
		{
			var shape:ShapeData;
			var atlas:AtlasData;
			
			if (!_shapes.length) return true;
			
			var square:Number = calculateSquare();
			var size:Number = Math.sqrt(square);
			var targetSize:Number = TextureUtil.getTextureSize(size);
			
			for each(shape in _shapes)
			{
				shape.scale = shape.baseScale;
				
				if (shape.width > targetSize)
				{
					targetSize = TextureUtil.getTextureSize(shape.width);
				}
				
				if (shape.height > targetSize)
				{
					targetSize = TextureUtil.getTextureSize(shape.height);
				}
			}
			
			var scale:Number = targetSize / size * Converter.resources.scaleMargin;
			
			if (scale < Converter.resources.shapeScaleMin)
			{
				scale = Converter.resources.shapeScaleMin;
			}
			
			while (true)
			{
				atlas = new AtlasData();
				atlas.width = targetSize;
				atlas.height = targetSize;
				
				var shapes:Vector.<ShapeData> = _shapes.slice();
				
				for each(shape in _shapes)
				{
					shape.scale = shape.baseScale * scale;
				}
				
				for (var i:int = 0; i < shapes.length; i++)
				{
					shape = shapes[i];
					
					if (insertShape(atlas, shape))
					{
						shapes.splice(i, 1);
						i--;
					}
				}
				
				if (!shapes.length || scale <= Converter.resources.shapeScaleMin)
				{
					break;
				}
				else
				{
					scale -= 0.01;
				}
			}
			
			_atlases.push(atlas);
			
			_shapes = shapes;
			
			return _shapes.length == 0;
		}
		
		public function dispose():void
		{
			_file = null;
			
			if (_shapes)
			{
				for each(var data:ShapeData in _shapes)
				{
					data.dispose();
				}
				
				_shapes = null;
			}
			
			if (_atlases)
			{
				for each(var atlas:AtlasData in _atlases)
				{
					atlas.dispose();
				}
				
				_atlases = null;
			}
		}
		
		private function sortShapes(shape0:ShapeData, shape1:ShapeData):int
		{
			if (shape0.sortValue < shape1.sortValue)
			{
				return 1;
			}
			else if (shape0.sortValue > shape1.sortValue)
			{
				return -1;
			}
			else
			{
				return 0;
			}
		}
		
		private function insertShape(data:AtlasData, shape:ShapeData):AtlasData
		{
			if (data.left && data.right)
			{
				var node:AtlasData = insertShape(data.left, shape);
				
				if (node)
				{
					return node;
				}
				else
				{
					return insertShape(data.right, shape);
				}
			}
			else
			{
				if (data.shape) return null;
				
				if (shape.width > data.width || shape.height > data.height) return null;
				
				if (shape.width == data.width && shape.height == data.height)
				{
					data.shape = shape;
					shape.map = data.bounds;
					return data;
				}
				
				data.left = new AtlasData();
				data.right = new AtlasData();
				
				var dw:Number = data.width - shape.width;
				var dh:Number = data.height - shape.height;
				
				if (dw > dh)
				{
					data.left.bounds.x = data.x;
					data.left.bounds.y = data.y;
					data.left.bounds.width = shape.width;
					data.left.bounds.height = data.height;
					
					data.right.bounds.x = data.x + shape.width;
					data.right.bounds.y = data.y;
					data.right.bounds.width = data.width - shape.width;
					data.right.bounds.height = data.height;
				}
				else
				{
					data.left.bounds.x = data.x;
					data.left.bounds.y = data.y;
					data.left.bounds.width = data.width;
					data.left.bounds.height = shape.height;
					
					data.right.bounds.x = data.x;
					data.right.bounds.y = data.y + shape.height;
					data.right.bounds.width = data.width;
					data.right.bounds.height = data.height - shape.height;
				}
				
				return insertShape(data.left, shape);
			}
		}
		
		private function calculateSquare():Number
		{
			var value:Number = 0;
			
			for each(var shape:ShapeData in _shapes)
			{
				value += shape.square;
			}
			
			return value;
		}
	}
}