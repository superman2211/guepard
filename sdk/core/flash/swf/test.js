(function ()
{
	"use strict";
	
	flash.createPackage("flash.swf");
	
	flash.swf.test = function ()
	{
		flash.trace("flash.swf.test");
		
		var tag = new flash.swf.Tag();
		var symbol = new flash.swf.SymbolClass();
		var remove = new flash.swf.RemoveObject();
		var place = new flash.swf.PlaceObject();
		var frame = new flash.swf.FrameLabel();
		var text = new flash.swf.DefineText();
		var sprite = new flash.swf.DefineSprite();
		var sound = new flash.swf.DefineSound();
		var shape = new flash.swf.DefineShape();
		var scene = new flash.swf.DefineScene();
		var edit = new flash.swf.DefineEditText();
		
		flash.trace(tag);
		flash.trace(symbol);
		flash.trace(remove);
		flash.trace(place);
		flash.trace(frame);
		flash.trace(text);
		flash.trace(sprite);
		flash.trace(sound);
		flash.trace(shape);
		flash.trace(scene);
		flash.trace(edit);
		flash.trace();
		
		var loader = new flash.display.Loader();
		//loader.load(new flash.net.URLRequest("data/preloader.xml"));
		loader.load(new flash.net.URLRequest("data/bouncing-balls.xml"));
	};
}
());