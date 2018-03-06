/*class  com.guepard.tests.UnknownExtends*/
/*
import flash.display.DisplayObject;
import flash.display.Sprite;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*override*//*public*/d.get_alpha = function ()/*Number*/
	{
		return this.Sprite_get_alpha();
		
	};
	
	/*override*//*public*/d.set_alpha = function (value/*Number*/)/*void*/
	{
		this.Sprite_set_alpha(value);
		
	};
	
	/*override*//*public*/d.get_width = function ()/*Number*/
	{
		return this.Sprite_get_width();
		
	};
	
	/*override*//*public*/d.set_width = function (value/*Number*/)/*void*/
	{
		this.Sprite_set_width(value);
		
	};
	
	
	/*public*/d.UnknownExtends = function ()
	{
		
		this.Sprite_constructor();
		
	};
	
	/*override*//*public*/d.addChild = function (child/*flash.display.DisplayObject*/)/*flash.display.DisplayObject*/
	{
		return this.Sprite_addChild(child);
		
	};
	
	/*override*//*public*/d.addEventListener = function (type/*String*/, listener/*Function*/, useCapture/*Boolean*/, priority/*int*/, useWeakReference/*Boolean*/)/*void*/
	{
		if (useCapture == undefined) useCapture = false;
		if (priority == undefined) priority = 0;
		priority = /*int*/flash.int(priority);
		if (useWeakReference == undefined) useWeakReference = false;
		
		this.Sprite_addEventListener(type, listener, useCapture, priority, useWeakReference);
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*//*public*/this.prototype.Sprite_constructor = this.__base__;
		/*super*//*public*/this.prototype.Sprite_addChild = this.__base__.prototype.addChild;
		/*super*//*public*/this.prototype.Sprite_addEventListener = this.__base__.prototype.addEventListener;
		/*super*//*public*/this.prototype.Sprite_get_alpha = this.__base__.prototype.get_alpha;
		/*super*//*public*/this.prototype.Sprite_set_alpha = this.__base__.prototype.set_alpha;
		/*super*//*public*/this.prototype.Sprite_get_width = this.__base__.prototype.get_width;
		/*super*//*public*/this.prototype.Sprite_set_width = this.__base__.prototype.set_width;
		
		
	};
	
	
	
	
	flash.addDescription("com.guepard.tests.UnknownExtends", d, "flash.display.Sprite", s, null, null);
	
}
());
