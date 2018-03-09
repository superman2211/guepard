package flash.display
{
	import flash.filters.*;
	import flash.geom.*;
	import flash.utils.*;
	
	public class BitmapData implements IBitmapDrawable
	{
		
		public function get width():int
		{
		};
		
		public function get transparent():Boolean
		{
		}
		
		public function get rect():Rectangle
		{
			
		}
		
		public function get height():int
		{
		}
		
		public function BitmapData(width:int, height:int, transparent:Boolean = true, fillColor:uint = 4.29497e+009)
		
		public function copyPixels(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, alphaBitmapData:BitmapData = null, alphaPoint:Point = null, mergeAlpha:Boolean = false):void
		{
		}
		
		public function setPixel(x:int, y:int, color:uint):void
		{
		}
		
		public function hitTest(firstPoint:Point, firstAlphaThreshold:uint, secondObject:Object, secondBitmapDataPoint:Point = null, secondAlphaThreshold:uint = 1):Boolean
		{
		}
		
		public function colorTransform(rect:Rectangle, colorTransform:ColorTransform):void
		{
		}
		
		public function draw(source:IBitmapDrawable, matrix:Matrix = null, colorTransform:ColorTransform = null, blendMode:String = null, clipRect:Rectangle = null, smoothing:Boolean = false):void
		{
		}
		
		public function applyFilter(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, filter:BitmapFilter):void
		{
		}
		
		public function fillRect(rect:Rectangle, color:uint):void
		{
		}
		
		public function getPixel(x:int, y:int):uint
		{
		}
		
		public function generateFilterRect(sourceRect:Rectangle, filter:BitmapFilter):Rectangle
		{
		}
		
		public function unlock(changeRect:Rectangle = null):void
		{
		}
		
		public function scroll(x:int, y:int):void
		{
		}
		
		public function copyChannel(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, sourceChannel:uint, destChannel:uint):void
		{
		}
		
		public function pixelDissolve(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, randomSeed:int = 0, numPixels:int = 0, fillColor:uint = 0):int
		{
		}
		
		public function noise(randomSeed:int, low:uint = 0, high:uint = 255, channelOptions:uint = 7, grayScale:Boolean = false):void
		{
		}
		
		public function clone():BitmapData
		{
		}
		
		public function getColorBoundsRect(mask:uint, color:uint, findColor:Boolean = true):Rectangle
		{
		}
		
		public function dispose():void
		{
		}
		
		public function floodFill(x:int, y:int, color:uint):void
		{
		}
		
		public function setPixel32(x:int, y:int, color:uint):void
		{
		}
		
		public function compare(otherBitmapData:BitmapData):Object
		{
		}
		
		public function perlinNoise(baseX:Number, baseY:Number, numOctaves:uint, randomSeed:int, stitch:Boolean, fractalNoise:Boolean, channelOptions:uint = 7, grayScale:Boolean = false, offsets:Array = null):void
		{
		}
		
		public function paletteMap(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, redArray:Array = null, greenArray:Array = null, blueArray:Array = null, alphaArray:Array = null):void
		{
		}
		
		public function getPixels(rect:Rectangle):ByteArray
		{
		}
		
		public function threshold(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, operation:String, threshold:uint, color:uint = 0, mask:uint = 4.29497e+009, copySource:Boolean = false):uint
		{
		}
		
		public function getPixel32(x:int, y:int):uint
		{
		}
		
		public function lock():void
		{
		}
		
		public function setPixels(rect:Rectangle, inputByteArray:ByteArray):void
		{
		}
		
		public function merge(sourceBitmapData:BitmapData, sourceRect:Rectangle, destPoint:Point, redMultiplier:uint, greenMultiplier:uint, blueMultiplier:uint, alphaMultiplier:uint):void
		{
		}
		
	}
}
