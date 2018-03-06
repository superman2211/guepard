(function ()
{
	"use strict";
	
	flash.createPackage("flash.events");
	
	flash.events.test = function ()
	{
		flash.trace("flash.events.test");
		
		var obj = {};
		
		obj.enterFrame = function (e)
		{
			flash.trace("enterFrame", e);
		};
		
		var event = new flash.events.Event(flash.events.Event.ENTER_FRAME);
		
		var dispatcher = new flash.events.EventDispatcher();
		dispatcher.addEventListener(flash.events.Event.ENTER_FRAME, flash.bindFunction(obj, obj.enterFrame));
		dispatcher.dispatchEvent(event);
		
		flash.trace(event);
		flash.trace(dispatcher);
		flash.trace();
	};
	
	flash.events.testMouseEvents = function (stage)
	{
		stage.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, function (e)
		{
			//flash.trace("stage mouse down: ", e.get_target(), e.get_currentTarget());
		});
		
		var button = new flash.display.Sprite();
		button.set_name("button");
		button.get_graphics().beginFill(0x999999);
		button.get_graphics().drawRect(0, 0, 200, 200);
		button.get_graphics().endFill();
		button.set_mouseEnabled(true);
		button.set_mouseChildren(true);
		button.set_x(50);
		button.set_y(50);
		button.set_scaleX(1.5);
		button.set_rotation(30);
		button.set_useHandCursor(false);
		button.set_buttonMode(true);
		button.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, function (e)
		{
			flash.trace("button mouse down: ", e.get_target().get_name(), e.get_currentTarget().get_name());
			
			/*var point = new flash.display.Shape();
			point.get_graphics().beginFill(0x00ff00);
			point.get_graphics().drawRect(-2, -2, 4, 4);
			point.get_graphics().endFill();
			point.set_x(e.get_localX());
			point.set_y(e.get_localY());
			button.addChild(point);//*/
		});
		
		button.addEventListener(flash.events.MouseEvent.MOUSE_OVER, function (e)
		{
			flash.trace("button mouse over: ", e.get_target().get_name(), e.get_currentTarget().get_name());
			
			e.get_target().set_alpha(0.5);
		});
		
		button.addEventListener(flash.events.MouseEvent.MOUSE_OUT, function (e)
		{
			flash.trace("button mouse out: ", e.get_target().get_name(), e.get_currentTarget().get_name());
			
			e.get_target().set_alpha(1);
		});
		stage.addChild(button);
		
		var circle = new flash.display.Sprite();
		circle.set_name("circle");
		circle.get_graphics().beginFill(0xff99ff);
		circle.get_graphics().drawCircle(200, 200, 50);
		circle.get_graphics().endFill();
		circle.addEventListener(flash.events.MouseEvent.CLICK, function (e)
		{
			flash.trace("circle mouse click: ", e.get_target().get_name(), e.get_currentTarget().get_name());
			
			var point = new flash.display.Shape();
			point.get_graphics().beginFill(0xff0000);
			point.get_graphics().drawRect(-4, -4, 8, 8);
			point.get_graphics().endFill();
			point.set_x(e.get_localX());
			point.set_y(e.get_localY());
			circle.addChild(point);
		});
		button.addChild(circle);
		
	}
}
());