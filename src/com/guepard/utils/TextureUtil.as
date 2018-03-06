package com.guepard.utils
{
	import com.guepard.app.Converter;
	
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.geom.Matrix;
	import flash.geom.Rectangle;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TextureUtil
	{
		public static function getTextureSize(value:Number):int
		{
			var power:int = Converter.resources.custom.texturePowerMin.value;
			
			var size:int = Math.pow(2, power);
			
			while (value > size)
			{
				power++;
				size = Math.pow(2, power);
				
				if (power == Converter.resources.custom.texturePowerMax.value) break;
			}
			
			return size;
		}
		
		public static function createBitmap(object:DisplayObject, bounds:Rectangle, width:int, height:int, transparent:Boolean):BitmapData
		{
			var max:int = Converter.resources.textureMaxSize;
			
			if (width < 1) width = 1;
			else if (width > max) width = max;
			
			if (height < 1) height = 1;
			else if (height > max) height = max;
			
			var matrix:Matrix = new Matrix();
			matrix.a = width / bounds.width;
			matrix.d = height / bounds.height;
			matrix.tx = -bounds.x * matrix.a;
			matrix.ty = -bounds.y * matrix.d;
			
			var bitmapData:BitmapData = new BitmapData(width, height, transparent, 0);
			bitmapData.draw(object, matrix);
			
			return bitmapData;
		}
	}
}