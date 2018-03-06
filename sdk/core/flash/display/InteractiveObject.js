/*class flash.display.InteractiveObject*/
/*
import flash.accessibility.*;
import flash.ui.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d._doubleClickEnabled = false;
	d._focusRect = {};// Object
	d._mouseEnabled = true; // Boolean
	d._tabEnabled = false; // Boolean
	d._tabIndex = 0; //int
	d._mouseOver = false;
	
	
	/*public*/
	d.get_doubleClickEnabled = function ()/*Boolean*/
	{
		return this._doubleClickEnabled;
		
	};
	
	/*public*/
	d.set_doubleClickEnabled = function (enabled/*Boolean*/)/*void*/
	{
		this._doubleClickEnabled = value;
		return this._doubleClickEnabled;
	};
	
	/*public*/
	d.get_focusRect = function ()/*Object*/
	{
		return this._focusRect;
		
	};
	
	/*public*/
	d.set_focusRect = function (focusRect/*Object*/)/*void*/
	{
		this._focusRect = focusRect;
		return this._focusRect;
	};
	
	/*public*/
	d.get_mouseEnabled = function ()/*Boolean*/
	{
		return this._mouseEnabled;
		
	};
	
	/*public*/
	d.set_mouseEnabled = function (enabled/*Boolean*/)/*void*/
	{
		this._mouseEnabled = enabled;
		return this._mouseEnabled;
	};
	
	/*public*/
	d.get_tabEnabled = function ()/*Boolean*/
	{
		
		return this._tabEnabled;
		
	};
	
	/*public*/
	d.set_tabEnabled = function (enabled/*Boolean*/)/*void*/
	{
		this._tabEnabled = enabled;
		return this._tabEnabled;
	};
	
	/*public*/
	d.get_tabIndex = function ()/*int*/
	{
		return this._tabIndex;
		
	};
	
	/*public*/
	d.set_tabIndex = function (index/*int*/)/*void*/
	{
		index = /*int*/Math.floor(index);
		this._tabIndex = index;
	};
	
	
	/*public*/
	d.InteractiveObject = function ()
	{
		this.DisplayObject_constructor();
		
	};
	
	d._updateInteractiveEvent = function (data, dispatch)
	{
		if (!this._visible) return null;
		
		var point = this._checkInteractiveEvent(data);
		
		if (this._mouseEnabled)
		{
			if (dispatch && point)
			{
				this._dispatchInteractiveEvent(data, point.x, point.y, this);
			}
			
			if (!(this instanceof flash.display.DisplayObjectContainer))
			{
				this._updateMoveEvent(point, data, dispatch);
			}
		}
		
		return point;
	};
	
	d._updateMoveEvent = function (point, data, dispatch)
	{
		if (dispatch && data.type == flash.events.MouseEvent.MOUSE_MOVE)
		{
			var useCursor = (this._buttonMode && this._useHandCursor) || this instanceof flash.display.SimpleButton;
			
			if (point)
			{
				if (useCursor)
				{
					this.get_stage()._cursorStyle("pointer");
				}
				
				if (!this._mouseOver)
				{
					this._dispatchInteractiveEvent(data, point.x, point.y, this, flash.events.MouseEvent.MOUSE_OVER);
					
					this._mouseOver = true;
				}
			}
			else
			{
				if (useCursor)
				{
					this.get_stage()._cursorStyle("default");
				}
				
				this._updateOverEvent(data);
			}
		}
	}
	
	d._updateOverEvent = function (data)
	{
		if (this._mouseOver)
		{
			this._dispatchInteractiveEvent(data, 0, 0, this, flash.events.MouseEvent.MOUSE_OUT);
			
			this._mouseOver = false;
		}
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.DisplayObject_constructor = this.__base__;
		/*super*/
		/*public*/
		this.prototype.DisplayObject__updateInteractiveEvent = this.__base__.prototype._updateInteractiveEvent;
	}
	
	
	flash.addDescription("flash.display.InteractiveObject", d, "flash.display.DisplayObject", s, null);
	
}
());
