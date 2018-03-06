(function ()
{
	"use strict";
	
	flash.createPackage("flash.display");
	
	flash.display.test = function ()
	{
		flash.trace("flash.display.test");
		
		var object = new flash.display.DisplayObject();
		var interactive = new flash.display.InteractiveObject();
		var container = new flash.display.DisplayObjectContainer();
		var bitmap = new flash.display.Bitmap();
		var shape = new flash.display.Shape();
		var sprite = new flash.display.Sprite();
		var clip = new flash.display.MovieClip();
		var bitmapData = new flash.display.BitmapData(100, 100);
		
		var clone = bitmapData.clone();
		
		var transformedData = bitmapData._getColorTransfomedData(25, 25, 50, 50, [ 0.5, 0.5, 0.5, 100, 100, 100 ]);
		
		var loader = new flash.display.Loader();
		loader.get_contentLoaderInfo().addEventListener(flash.events.Event.COMPLETE, loadImageComplete);
		loader.load(new flash.net.URLRequest("data/bouncing-balls_0.png"));
		
		
		flash.trace(object);
		flash.trace(interactive);
		flash.trace(container);
		flash.trace(bitmap);
		flash.trace(shape);
		flash.trace(sprite);
		flash.trace(bitmapData);
		flash.trace(clone);
		flash.trace(transformedData);
		flash.trace(loader);
		flash.trace();
		
		function loadImageComplete(e)
		{
			flash.trace("loadImageComplete", e);
		}
	};
	
	flash.display.testBounds = function ()
	{
		var container = new flash.display.Sprite();
		container.get_graphics().beginFill(0x999999);
		container.get_graphics().drawCircle(0, 0, 30);
		container.get_graphics().endFill();
		
		container.get_graphics().beginFill(0x000000);
		container.get_graphics().drawRect(0, 0, 30, 2);
		container.get_graphics().endFill();
		stage.addChild(container);
		
		var shape = new flash.display.Shape();
		shape.get_graphics().beginFill(0x00ff00, 0.5);
		shape.get_graphics().drawRect(0, 0, 100, 100);
		shape.get_graphics().endFill();
		container.addChild(shape);
		
		var sprite = new flash.display.Sprite();
		sprite.get_graphics().beginFill(0xff0000);
		sprite.get_graphics().drawRect(-50, -50, 100, 100);
		sprite.get_graphics().endFill();
		sprite.get_graphics().lineStyle(3, 0x0000ff);
		sprite.get_graphics().moveTo(-10, 0);
		sprite.get_graphics().lineTo(10, 0);
		sprite.get_graphics().moveTo(0, -10);
		sprite.get_graphics().lineTo(0, 10);
		sprite.set_x(200);
		sprite.set_y(200);
		sprite.set_width(200);
		sprite.set_rotation(200);
		stage.addChild(sprite);
		
		var spriteShape = new flash.display.Shape();
		spriteShape.get_graphics().beginFill(0x0000ff);
		spriteShape.get_graphics().drawRect(-20, -20, 40, 40);
		spriteShape.get_graphics().endFill();
		sprite.addChild(spriteShape);
		
		var shapeBounds = new flash.display.Shape();
		stage.addChild(shapeBounds);
		
		flash.trace("sprite.getBounds(sprite) = " + sprite.getBounds(sprite));
		flash.trace("sprite.getBounds(stage) = " + sprite.getBounds(stage));
		
		showBounds();
		
		stage.addEventListener(flash.events.Event.ENTER_FRAME, enterFrame);
		
		function enterFrame(e)
		{
			sprite.set_rotation(sprite.get_rotation() + 1);
			
			spriteShape.set_x(50 * Math.cos(-r * 5));
			spriteShape.set_y(50 * Math.sin(-r * 5));
			spriteShape.set_rotation(spriteShape.get_rotation() + 2);
			
			r += 0.01;
			container.set_x(100 + 50 * Math.cos(r));
			container.set_y(100 + 50 * Math.sin(r));
			container.set_rotation(container.get_rotation() - 0.5);
			
			showBounds();
		}
		
		var r = 0;
		
		function showBounds()
		{
			var bounds = sprite.getBounds(container);
			
			shape.set_x(bounds.x);
			shape.set_y(bounds.y);
			shape.set_width(bounds.width);
			shape.set_height(bounds.height);
			
			// shapeBounds.get_graphics().clear();
			// shapeBounds.get_graphics().beginFill(0x00ffff, 0.5);
			// shapeBounds.get_graphics().drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
			// shapeBounds.get_graphics().endFill();
		}
	};
}
());