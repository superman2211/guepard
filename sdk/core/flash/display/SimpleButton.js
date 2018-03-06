/*class flash.display.SimpleButton*/
/*
import flash.media.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._enabled = true;
	d._soundTransform = null;
	d._trackAsMenu = false;
	d._useHandCursor = true;
	
	d._downState = null;
	d._hitTestState = null;
	d._overState = null;
	d._upState = null;
	
	d._currentState = null;
	
	d._render_ = function (render)
	{
		if (this._currentState && this._currentState._visible)
		{
			this.__updateTransform__();
			
			this._currentState._parent = this;
			
			this._currentState._render_(render);
		}
	};
	
	/*public*/
	d.get_downState = function ()/*DisplayObject*/
	{
		return this._downState;
	};
	
	/*public*/
	d.set_downState = function (value/*DisplayObject*/)/*void*/
	{
		this._downState = value;
		
		return value;
	};
	
	/*public*/
	d.get_enabled = function ()/*Boolean*/
	{
		return this._enabled;
	};
	
	/*public*/
	d.set_enabled = function (value/*Boolean*/)/*void*/
	{
		this._enabled = value;
		
		return value;
	};
	
	/*public*/
	d.get_hitTestState = function ()/*DisplayObject*/
	{
		return this._hitTestState;
	};
	
	/*public*/
	d.set_hitTestState = function (value/*DisplayObject*/)/*void*/
	{
		if (this._hitTestState == value) return;
		
		if (this._hitTestState)
		{
			this._hitTestState._parent = null;
			
			this._hitTestState.removeEventListener(flash.events.MouseEvent.MOUSE_OVER, flash.bindFunction(this, this._mouseOver));
			this._hitTestState.removeEventListener(flash.events.MouseEvent.MOUSE_OUT, flash.bindFunction(this, this._mouseOut));
			this._hitTestState.removeEventListener(flash.events.MouseEvent.MOUSE_DOWN, flash.bindFunction(this, this._mouseDown));
			this._hitTestState.removeEventListener(flash.events.MouseEvent.MOUSE_UP, flash.bindFunction(this, this._mouseUp));
		}
		
		this._hitTestState = value;
		
		if (this._hitTestState)
		{
			this._hitTestState._parent = this;
			
			this._hitTestState.addEventListener(flash.events.MouseEvent.MOUSE_OVER, flash.bindFunction(this, this._mouseOver));
			this._hitTestState.addEventListener(flash.events.MouseEvent.MOUSE_OUT, flash.bindFunction(this, this._mouseOut));
			this._hitTestState.addEventListener(flash.events.MouseEvent.MOUSE_DOWN, flash.bindFunction(this, this._mouseDown));
			this._hitTestState.addEventListener(flash.events.MouseEvent.MOUSE_UP, flash.bindFunction(this, this._mouseUp));
		}
		
		return value;
	};
	
	/*public*/
	d.get_overState = function ()/*DisplayObject*/
	{
		return this._overState;
	};
	
	/*public*/
	d.set_overState = function (value/*DisplayObject*/)/*void*/
	{
		this._overState = value;
		
		return value;
	};
	
	/*public*/
	d.get_soundTransform = function ()/*SoundTransform*/
	{
		return this._soundTransform;
	};
	
	/*public*/
	d.set_soundTransform = function (sndTransform/*SoundTransform*/)/*void*/
	{
		this._soundTransform = value;
		
		return value;
	};
	
	/*public*/
	d.get_trackAsMenu = function ()/*Boolean*/
	{
		return this._trackAsMenu;
	};
	
	/*public*/
	d.set_trackAsMenu = function (value/*Boolean*/)/*void*/
	{
		this._trackAsMenu = value;
		
		return value;
	};
	
	/*public*/
	d.get_upState = function ()/*DisplayObject*/
	{
		return this._upState;
	};
	
	/*public*/
	d.set_upState = function (value/*DisplayObject*/)/*void*/
	{
		this._upState = value;
		
		return value;
	};
	
	/*public*/
	d.get_useHandCursor = function ()/*Boolean*/
	{
		return this._useHandCursor;
	};
	
	/*public*/
	d.set_useHandCursor = function (value/*Boolean*/)/*void*/
	{
		this._useHandCursor = value;
		
		return value;
	};
	
	
	/*public*/
	d.SimpleButton = function (upState/*DisplayObject*/, overState/*DisplayObject*/, downState/*DisplayObject*/, hitTestState/*DisplayObject*/)
	{
		this.InteractiveObject_constructor();
		
		if (upState == undefined) upState = null;
		if (overState == undefined) overState = null;
		if (downState == undefined) downState = null;
		if (hitTestState == undefined) hitTestState = null;
		
		if (upState)
		{
			this.set_upState(upState);
		}
		
		if (overState)
		{
			this.set_overState(overState);
		}
		
		if (downState)
		{
			this.set_downState(downState);
		}
		
		if (hitTestState)
		{
			this.set_hitTestState(hitTestState);
		}
		
		this._currentState = this._upState;
		
		if (!this.get_hitTestState()) this.set_hitTestState(this._upState);
		
	};
	
	/*override*/
	/*public*/
	d.getBounds = function (targetCoordinateSpace/*DisplayObject*/)/*Rectangle*/
	{
		if (this._hitTestState)
		{
			this._hitTestState._parent = this;
			
			return this._hitTestState.getBounds(targetCoordinateSpace);
		}
		else
		{
			return new flash.geom.Rectangle();
		}
	};
	
	d._mouseOver = function (e)
	{
		this._currentState = this._overState;
	};
	
	d._mouseOut = function (e)
	{
		this._currentState = this._upState;
	};
	
	d._mouseDown = function (e)
	{
		this._currentState = this._downState;
	};
	
	d._mouseUp = function (e)
	{
		this._currentState = this._overState;
	};
	
	d._updateInteractiveEvent = function (data, dispatch)
	{
		if (!this._visible) return null;
		
		var point = null;
		
		if (this._hitTestState)
		{
			this._hitTestState._parent = this;
			
			point = this._hitTestState._updateInteractiveEvent(data, dispatch);
		}
		
		if (this._mouseEnabled)
		{
			if (point && dispatch)
			{
				this._dispatchInteractiveEvent(data, point.x, point.y, this);
			}
			
			this._updateMoveEvent(point, data, dispatch);
		}
		
		return point;
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.InteractiveObject_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.display.SimpleButton", d, "flash.display.InteractiveObject", s, null);
}
());
