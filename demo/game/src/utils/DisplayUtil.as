package utils 
{
	import flash.display.BitmapData;
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.SimpleButton;
	import flash.display.Sprite;
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	/**
	 * ...
	 * @author 
	 */
	public class DisplayUtil 
	{
		public static function roundPosition(object:DisplayObject):void 
		{
			if (object)
			{
				object.x = Math.round(object.x);
				object.y = Math.round(object.y);
			}
		}
		
		public static function stop(object:DisplayObject):void 
		{
			if (object is MovieClip) MovieClip(object).stop();
			
			if (object is DisplayObjectContainer)
			{
				for (var i:int = 0; i < DisplayObjectContainer(object).numChildren; i++) 
				{
					var child:DisplayObject = DisplayObjectContainer(object).getChildAt(i);
					stop(child);
				}
			}
			else if (object is SimpleButton)
			{
				stop(SimpleButton(object).downState);
				stop(SimpleButton(object).upState);
				stop(SimpleButton(object).overState);
				stop(SimpleButton(object).hitTestState);
			}
		}
		
		static public function clear(object:DisplayObject):void 
		{
			if (object is DisplayObjectContainer)
			{
				while (DisplayObjectContainer(object).numChildren)
				{
					clear(DisplayObjectContainer(object).removeChildAt(0));
				}
			}
			else if (object is SimpleButton)
			{
				clear(SimpleButton(object).downState);
				clear(SimpleButton(object).upState);
				clear(SimpleButton(object).overState);
				clear(SimpleButton(object).hitTestState);
				
				SimpleButton(object).downState = null;
				SimpleButton(object).upState = null;
				SimpleButton(object).overState = null;
				SimpleButton(object).hitTestState = null;
			}
		}
		
		static public function getVisibleBounds(object:DisplayObject, targetCoordinateSpace:DisplayObject, iterations:int):Rectangle
		{
			iterations--;
			
			if (iterations > 0)
			{
				if (object is DisplayObjectContainer)
				{
					var container:DisplayObjectContainer = DisplayObjectContainer(object);
					
					var result:Rectangle = null;
					
					for (var i:uint = 0; i < container.numChildren; i++) 
					{
						var child:DisplayObject = container.getChildAt(i);
						
						if (child.visible && child.alpha > 0)// && !isMask(child))
						{
							var bounds:Rectangle = getVisibleBounds(child, targetCoordinateSpace, iterations);
							if (bounds)
							{
								if (result) result = result.union(bounds);
								else result = bounds;
							}
						}
					}
					
					return result;
				}
				else
				{
					return object.getBounds(targetCoordinateSpace);
				}
			}
			else
			{
				return object.getBounds(targetCoordinateSpace);
			}
		}
		
		static public function isMask(displayObject:DisplayObject):Boolean
		{
			if (!displayObject.parent) return false;
			
			for (var i:uint = 0; i < displayObject.parent.numChildren; i++) 
			{
				var child:DisplayObject = displayObject.parent.getChildAt(i);
				if (child != displayObject && child.mask == displayObject) return true;
			}
			
			return false;
		}
		
		static public function nextFrame(object:DisplayObject):void 
		{
			if (object is MovieClip) 
			{
				var movieClip:MovieClip = MovieClip(object);
				
				if (movieClip.currentFrame == movieClip.totalFrames)
				{
					movieClip.gotoAndStop(1);
				}
				else
				{
					movieClip.nextFrame();
				}
			}
			
			if (object is DisplayObjectContainer)
			{
				for (var i:int = 0; i < DisplayObjectContainer(object).numChildren; i++) 
				{
					var child:DisplayObject = DisplayObjectContainer(object).getChildAt(i);
					nextFrame(child);
				}
			}
			else if (object is SimpleButton)
			{
				nextFrame(SimpleButton(object).downState);
				nextFrame(SimpleButton(object).upState);
				nextFrame(SimpleButton(object).overState);
				nextFrame(SimpleButton(object).hitTestState);
			}
		}
		
		static public function getTotalFrames(object:DisplayObject):uint
		{
			var totalFrames:uint = 0;
			
			if (object is MovieClip) totalFrames = MovieClip(object).totalFrames;
			
			if (object is DisplayObjectContainer)
			{
				for (var i:int = 0; i < DisplayObjectContainer(object).numChildren; i++) 
				{
					var child:DisplayObject = DisplayObjectContainer(object).getChildAt(i);
					totalFrames = Math.max(totalFrames, getTotalFrames(child));
				}
			}
			else if (object is SimpleButton)
			{
				totalFrames = Math.max(totalFrames, getTotalFrames(SimpleButton(object).downState));
				totalFrames = Math.max(totalFrames, getTotalFrames(SimpleButton(object).upState));
				totalFrames = Math.max(totalFrames, getTotalFrames(SimpleButton(object).overState));
				totalFrames = Math.max(totalFrames, getTotalFrames(SimpleButton(object).hitTestState));
			}
			
			return totalFrames;
		}
		
		public static function renderToBitmapData(
				source:DisplayObject, 
				border:Number = 2, 
				bounds:Rectangle = null, 
				transparent:Boolean = true, 
				backgroundColor:uint = 0, 
				scaleX:Number = 1, 
				scaleY:Number = 1, 
				colorTransform:ColorTransform = null):BitmapData
		{
			if (!bounds) bounds = source.getBounds(source);
			
			if (border)
			{
				bounds.x = Math.round(bounds.x - border);
				bounds.y = Math.round(bounds.y - border);
				bounds.width = Math.round(bounds.width + border * 2);
				bounds.height = Math.round(bounds.height + border * 2);
			}
			
			var bitmapData:BitmapData = new BitmapData(bounds.width * scaleX, bounds.height * scaleY, transparent, backgroundColor);
			bitmapData.draw(source, new Matrix(scaleX, 0, 0, scaleY, - bounds.x * scaleX, - bounds.y * scaleY), colorTransform);
			
			return bitmapData;
		}
		
		static public function renderToGraphics(
				graphics:Graphics, 
				source:DisplayObject, 
				border:Number = 2, 
				bounds:Rectangle = null, 
				transparent:Boolean = true, 
				backgroundColor:uint = 0, 
				scaleX:Number = 1, 
				scaleY:Number = 1, 
				colorTransform:ColorTransform = null,
				dx:Number = 0,
				dy:Number = 0):BitmapData 
		{
			if (!bounds) bounds = source.getBounds(source);
			
			if (border)
			{
				bounds.x = Math.round(bounds.x - border);
				bounds.y = Math.round(bounds.y - border);
				bounds.width = Math.round(bounds.width + border * 2);
				bounds.height = Math.round(bounds.height + border * 2);
			}
			
			var bitmap:BitmapData = renderToBitmapData(source, 0, bounds, transparent, backgroundColor, scaleX, scaleY, colorTransform);
			
			//graphics.lineStyle(1, 0xff0000);
			graphics.beginBitmapFill(bitmap, new Matrix(bounds.width / bitmap.width, 0, 0, bounds.height / bitmap.height, bounds.x + dx, bounds.y + dy), false, true);
			graphics.drawRect(bounds.x + dy, bounds.y + dx, bounds.width, bounds.height);
			graphics.endFill();
			
			return bitmap;
		}
		
		static public function isInstance(displayObject:DisplayObject):Boolean
		{
			return displayObject.name.length > 8 && displayObject.name.substr(0, 8) == "instance";
		}
		
		static public function play(displayObject:DisplayObject):void 
		{
			if (displayObject is MovieClip) MovieClip(displayObject).play();
			
			if (displayObject is DisplayObjectContainer)
			{
				var container:DisplayObjectContainer = DisplayObjectContainer(displayObject);
				
				for (var i:int = 0; i < container.numChildren; i++) 
				{
					var child:DisplayObject = container.getChildAt(i);
					play(child);
				}
			}
		}
		
		static public function setTextsVisible(displayObject:DisplayObject, visible:Boolean):void 
		{
			if (displayObject is TextField) TextField(displayObject).visible = visible;
			
			if (displayObject is DisplayObjectContainer)
			{
				var container:DisplayObjectContainer = DisplayObjectContainer(displayObject);
				
				for (var i:int = 0; i < container.numChildren; i++) 
				{
					var child:DisplayObject = container.getChildAt(i);
					setTextsVisible(child, visible);
				}
			}
		}
		
		static public function hasParent(object:DisplayObject, container:DisplayObjectContainer):Boolean
		{
			if (object)
			{
				if (object.parent == container)
				{
					return true;
				}
				else
				{
					return hasParent(object.parent, container);
				}
			}
			else
			{
				return false;
			}
		}
	}
}