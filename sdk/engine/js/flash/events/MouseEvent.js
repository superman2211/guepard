/*class flash.events.MouseEvent*/
/*
import flash.display.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d.m_altKey/*Boolean*/ = false;
	d.m_buttonDown/*Boolean*/ = false;
	d.m_ctrlKey/*Boolean*/ = false;
	d.m_delta/*int*/ = 0;
	d.m_localX/*Number*/ = 0;
	d.m_localY/*Number*/ = 0;
	d.m_relatedObject/*InteractiveObject*/ = null;
	d.m_shiftKey/*Boolean*/ = false;
	
	d.get_altKey = function ()/*Boolean*/
	{
		return this.m_altKey;
		
	};
	
	d.set_altKey = function (value/*Boolean*/)/*void*/
	{
		this.m_altKey = value;
		return value;
		
	};
	
	d.get_buttonDown = function ()/*Boolean*/
	{
		return this.m_buttonDown;
		
	};
	
	d.set_buttonDown = function (value/*Boolean*/)/*void*/
	{
		this.m_buttonDown = value;
		return value;
		
	};
	
	d.get_ctrlKey = function ()/*Boolean*/
	{
		return this.m_ctrlKey;
		
	};
	
	d.set_ctrlKey = function (value/*Boolean*/)/*void*/
	{
		this.m_ctrlKey = value;
		return value;
		
	};
	
	d.get_delta = function ()/*int*/
	{
		return this.m_delta;
		
	};
	
	d.set_delta = function (value/*int*/)/*void*/
	{
		value = /*int*/Math.floor(value);
		
		this.m_delta = value;
		return value;
		
	};
	
	d.get_localX = function ()/*Number*/
	{
		return this.m_localX;
		
	};
	
	d.set_localX = function (value/*Number*/)/*void*/
	{
		this.m_localX = value;
		return value;
		
	};
	
	d.get_localY = function ()/*Number*/
	{
		return this.m_localY;
		
	};
	
	d.set_localY = function (value/*Number*/)/*void*/
	{
		this.m_localY = value;
		return value;
		
	};
	
	d.get_relatedObject = function ()/*InteractiveObject*/
	{
		return this.m_relatedObject;
		
	};
	
	d.set_relatedObject = function (value/*InteractiveObject*/)/*void*/
	{
		this.m_relatedObject = value;
		return value;
		
	};
	
	d.get_target = function ()/*InteractiveObject*/
	{
		return this.get_relatedObject() ? this.get_relatedObject() : this.get_target();
		
	};
	
	d.get_shiftKey = function ()/*Boolean*/
	{
		return this.m_shiftKey;
		
	};
	
	d.set_shiftKey = function (value/*Boolean*/)/*void*/
	{
		this.m_shiftKey = value;
		return value;
		
	};
	
	d.get_stageX = function ()/*Number*/
	{
		
		if (!isNaN(this.m_localX))
		{
			isNaN(this.m_localX);
			
		}
		
		if (isNaN(this.m_localY))
		{
			return Number.NaN;
		}
		return this.getStageX(this.m_localX, this.m_localY);
		
	};
	
	d.get_stageY = function ()/*Number*/
	{
		
		if (!isNaN(this.m_localX))
		{
			isNaN(this.m_localX);
			
		}
		
		if (isNaN(this.m_localY))
		{
			return Number.NaN;
			
		}
		return this.getStageY(this.m_localX, this.m_localY);
		
	};
	
	
	d.MouseEvent = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/, localX/*Number*/, localY/*Number*/, relatedObject/*InteractiveObject*/, ctrlKey/*Boolean*/, altKey/*Boolean*/, shiftKey/*Boolean*/, buttonDown/*Boolean*/, delta/*int*/)
	{
		if (bubbles == undefined) bubbles = true;
		if (cancelable == undefined) cancelable = false;
		if (localX == undefined) localX = 0;
		if (localY == undefined) localY = 0;
		if (relatedObject == undefined) relatedObject = null;
		if (ctrlKey == undefined) ctrlKey = false;
		if (altKey == undefined) altKey = false;
		if (shiftKey == undefined) shiftKey = false;
		if (buttonDown == undefined) buttonDown = false;
		if (delta == undefined) delta = 0;
		delta = /*int*/Math.floor(delta);
		
		this.Event_constructor(type, bubbles, cancelable);
		this.m_localX = localX;
		this.m_localY = localY;
		this.m_relatedObject = relatedObject;
		this.m_ctrlKey = ctrlKey;
		this.m_altKey = altKey;
		this.m_shiftKey = shiftKey;
		this.m_buttonDown = buttonDown;
		this.m_delta = delta;
		return;
		
	};
	
	/*override*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.MouseEvent(
			this.get_type(),
			this.get_bubbles(),
			this.get_cancelable(),
			this.m_localX,
			this.m_localY,
			this.m_relatedObject,
			this.m_ctrlKey,
			this.m_altKey,
			this.m_shiftKey,
			this.m_buttonDown,
			this.m_delta
		);
		
	};
	
	d.getStageX = function (localX/*Number*/, localY/*Number*/)/*Number*/
	{
		
	};
	
	d.getStageY = function (localX/*Number*/, localY/*Number*/)/*Number*/
	{
		
	};
	
	/*override*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("MouseEvent", "type", "bubbles", "cancelable", "eventPhase", "localX", "localY", "stageX", "stageY", "relatedObject", "ctrlKey", "altKey", "shiftKey", "delta");
		
	};
	
	d.updateAfterEvent = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.Event_constructor = this.__base__;
		
		this.CLICK/*String*/ = "click";
		this.DOUBLE_CLICK/*String*/ = "doubleClick";
		this.MOUSE_DOWN/*String*/ = "mouseDown";
		this.MOUSE_MOVE/*String*/ = "mouseMove";
		this.MOUSE_OUT/*String*/ = "mouseOut";
		this.MOUSE_OVER/*String*/ = "mouseOver";
		this.MOUSE_UP/*String*/ = "mouseUp";
		this.MOUSE_WHEEL/*String*/ = "mouseWheel";
		this.ROLL_OUT/*String*/ = "rollOut";
		this.ROLL_OVER/*String*/ = "rollOver";
		
	};
	
	
	flash.addDescription("flash.events.MouseEvent", d, "flash.events.Event", s, null);
	
}
());
