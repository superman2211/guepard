/*class flash.events.TouchEvent*/
/*
import flash.display.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/.m_altKey/*Boolean*/ = false;
	/*private*/
	d/*var*/.m_ctrlKey/*Boolean*/ = false;
	/*private*/
	d/*var*/.m_isPrimaryTouchPoint/*Boolean*/ = false;
	/*private*/
	d/*var*/.m_isRelatedObjectInaccessible/*Boolean*/ = false;
	/*private*/
	d/*var*/.m_pressure/*Number*/ = 0;
	/*private*/
	d/*var*/.m_relatedObject/*InteractiveObject*/ = null;
	/*private*/
	d/*var*/.m_shiftKey/*Boolean*/ = false;
	/*private*/
	d/*var*/.m_sizeX/*Number*/ = 0;
	/*private*/
	d/*var*/.m_sizeY/*Number*/ = 0;
	/*private*/
	d/*var*/.m_touchPointID/*int*/ = 0;
	
	/*public*/
	d.get_altKey = function ()/*Boolean*/
	{
		return this.m_altKey;
		
	};
	
	/*public*/
	d.set_altKey = function (param1/*Boolean*/)/*void*/
	{
		this.m_altKey = param1;
		return;
		
	};
	
	/*public*/
	d.get_ctrlKey = function ()/*Boolean*/
	{
		return this.m_ctrlKey;
		
	};
	
	/*public*/
	d.set_ctrlKey = function (param1/*Boolean*/)/*void*/
	{
		this.m_ctrlKey = param1;
		return;
		
	};
	
	/*public*/
	d.get_isPrimaryTouchPoint = function ()/*Boolean*/
	{
		return this.m_isPrimaryTouchPoint;
		
	};
	
	/*public*/
	d.set_isPrimaryTouchPoint = function (param1/*Boolean*/)/*void*/
	{
		this.m_isPrimaryTouchPoint = param1;
		return;
		
	};
	
	/*public*/
	d.get_isRelatedObjectInaccessible = function ()/*Boolean*/
	{
		return this.m_isRelatedObjectInaccessible;
		
	};
	
	/*public*/
	d.set_isRelatedObjectInaccessible = function (param1/*Boolean*/)/*void*/
	{
		this.m_isRelatedObjectInaccessible = param1;
		return;
		
	};
	
	/*public*/
	d.get_localX = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_localX = function (param1/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_localY = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_localY = function (param1/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_pressure = function ()/*Number*/
	{
		return this.m_pressure;
		
	};
	
	/*public*/
	d.set_pressure = function (param1/*Number*/)/*void*/
	{
		this.m_pressure = param1;
		return;
		
	};
	
	/*public*/
	d.get_relatedObject = function ()/*InteractiveObject*/
	{
		return this.m_relatedObject;
		
	};
	
	/*public*/
	d.set_relatedObject = function (param1/*InteractiveObject*/)/*void*/
	{
		this.m_relatedObject = param1;
		return;
		
	};
	
	/*public*/
	d.get_target = function ()/*InteractiveObject*/
	{
		return this.get_relatedObject() ? this.get_relatedObject() : this.get_target();
		
	};
	
	/*public*/
	d.get_shiftKey = function ()/*Boolean*/
	{
		return this.m_shiftKey;
		
	};
	
	/*public*/
	d.set_shiftKey = function (param1/*Boolean*/)/*void*/
	{
		this.m_shiftKey = param1;
		return;
		
	};
	
	/*public*/
	d.get_sizeX = function ()/*Number*/
	{
		return this.m_sizeX;
		
	};
	
	/*public*/
	d.set_sizeX = function (param1/*Number*/)/*void*/
	{
		this.m_sizeX = param1;
		return;
		
	};
	
	/*public*/
	d.get_sizeY = function ()/*Number*/
	{
		return this.m_sizeY;
		
	};
	
	/*public*/
	d.set_sizeY = function (param1/*Number*/)/*void*/
	{
		this.m_sizeY = param1;
		return;
		
	};
	
	/*public*/
	d.get_stageX = function ()/*Number*/
	{
		
		if (!isNaN(this.get_localX()))
		{
			isNaN(this.get_localX());
			
		}
		
		if (isNaN(this.get_localY()))
		{
			return Number.NaN;
			
		}
		return this.getStageX();
		
	};
	
	/*public*/
	d.get_stageY = function ()/*Number*/
	{
		
		if (!isNaN(this.get_localX()))
		{
			isNaN(this.get_localX());
			
		}
		
		if (isNaN(this.get_localY()))
		{
			return Number.NaN;
			
		}
		return this.getStageY();
		
	};
	
	/*public*/
	d.get_touchPointID = function ()/*int*/
	{
		return this.m_touchPointID;
		
	};
	
	/*public*/
	d.set_touchPointID = function (param1/*int*/)/*void*/
	{
		param1 = /*int*/Math.floor(param1);
		
		this.m_touchPointID = param1;
		return;
		
	};
	
	
	/*public*/
	d.TouchEvent = function (param1/*String*/, param2/*Boolean*/, param3/*Boolean*/, param4/*int*/, param5/*Boolean*/, param6/*Number*/, param7/*Number*/, param8/*Number*/, param9/*Number*/, param10/*Number*/, param11/*InteractiveObject*/, param12/*Boolean*/, param13/*Boolean*/, param14/*Boolean*/)
	{
		if (param2 == undefined) param2 = true;
		if (param3 == undefined) param3 = false;
		if (param4 == undefined) param4 = 0;
		param4 = /*int*/Math.floor(param4);
		if (param5 == undefined) param5 = false;
		if (param6 == undefined) param6 = NaN;
		if (param7 == undefined) param7 = NaN;
		if (param8 == undefined) param8 = NaN;
		if (param9 == undefined) param9 = NaN;
		if (param10 == undefined) param10 = NaN;
		if (param11 == undefined) param11 = null;
		if (param12 == undefined) param12 = false;
		if (param13 == undefined) param13 = false;
		if (param14 == undefined) param14 = false;
		
		this.Event_constructor(param1, param2, param3);
		this.m_touchPointID = param4;
		this.m_isPrimaryTouchPoint = param5;
		this.set_localX(param6);
		this.set_localY(param7);
		this.m_sizeX = param8;
		this.m_sizeY = param9;
		this.m_pressure = param10;
		this.m_relatedObject = param11;
		this.m_ctrlKey = param12;
		this.m_altKey = param13;
		this.m_shiftKey = param14;
		return;
		
	};
	
	/*override*/
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.TouchEvent(this.get_type(), this.get_bubbles(), this.get_cancelable(), this.m_touchPointID, this.m_isPrimaryTouchPoint, this.get_localX(), this.get_localY(), this.m_sizeX, this.m_sizeY, this.m_pressure, this.m_relatedObject, this.m_ctrlKey, this.m_altKey, this.m_shiftKey);
		
	};
	
	/*private*/
	d.getStageX = function ()/*Number*/
	{
		
	};
	
	/*private*/
	d.getStageY = function ()/*Number*/
	{
		
	};
	
	/*override*/
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("TouchEvent", "type", "bubbles", "cancelable", "eventPhase", "touchPointID", "isPrimaryTouchPoint", "localX", "localY", "stageX", "stageY", "sizeX", "sizeY", "pressure", "relatedObject", "ctrlKey", "altKey", "shiftKey");
		
	};
	
	/*public*/
	d.updateAfterEvent = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Event_constructor = this.__base__;
		
		/*public*/
		this/*const*/.PROXIMITY_BEGIN/*String*/ = "proximityBegin";
		/*public*/
		this/*const*/.PROXIMITY_END/*String*/ = "proximityEnd";
		/*public*/
		this/*const*/.PROXIMITY_MOVE/*String*/ = "proximityMove";
		/*public*/
		this/*const*/.PROXIMITY_OUT/*String*/ = "proximityOut";
		/*public*/
		this/*const*/.PROXIMITY_OVER/*String*/ = "proximityOver";
		/*public*/
		this/*const*/.PROXIMITY_ROLL_OUT/*String*/ = "proximityRollOut";
		/*public*/
		this/*const*/.PROXIMITY_ROLL_OVER/*String*/ = "proximityRollOver";
		/*public*/
		this/*const*/.TOUCH_BEGIN/*String*/ = "touchBegin";
		/*public*/
		this/*const*/.TOUCH_END/*String*/ = "touchEnd";
		/*public*/
		this/*const*/.TOUCH_MOVE/*String*/ = "touchMove";
		/*public*/
		this/*const*/.TOUCH_OUT/*String*/ = "touchOut";
		/*public*/
		this/*const*/.TOUCH_OVER/*String*/ = "touchOver";
		/*public*/
		this/*const*/.TOUCH_ROLL_OUT/*String*/ = "touchRollOut";
		/*public*/
		this/*const*/.TOUCH_ROLL_OVER/*String*/ = "touchRollOver";
		/*public*/
		this/*const*/.TOUCH_TAP/*String*/ = "touchTap";
		
	};
	
	
	flash.addDescription("flash.events.TouchEvent", d, "flash.events.Event", s, null);
	
}
());
