/*class flash.text.test*/
(function ()
{
	"use strict";
	
	flash.createPackage("flash.text");
	
	flash.text.test = function ()
	{
		var text = new flash.text.TextField();
		text.set_text("Test");
		text.set_mouseEnabled(false);
		
		var shape = new flash.display.Sprite();
		shape.get_graphics().beginFill(0xff0000);
		shape.get_graphics().drawRect(0, 0, 100, 100);
		shape.get_graphics().endFill();
		shape.set_mouseEnabled(false);
		
		var sprite = new flash.display.Sprite();
		sprite.addChild(text);
		//sprite.addChild(shape);
		sprite.addEventListener(flash.events.MouseEvent.CLICK, function (e)
		{
			flash.trace("sprite click " + Math.random());
		});
		//stage.addChild(sprite);
		
		var button = new flash.display.SimpleButton(sprite, sprite, sprite, sprite);
		button.set_x(100);
		button.set_y(100);
		button.addEventListener(flash.events.MouseEvent.CLICK, function (e)
		{
			flash.trace("button click " + Math.random());
		});
		stage.addChild(button);
	}
	
}
());
