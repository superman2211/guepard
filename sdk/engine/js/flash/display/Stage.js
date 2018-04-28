/// <reference path="../flash.js"/>
/// <reference path="StageScaleMode.js"/>
/// <reference path="StageAlign.js"/>

/*class flash.display.Stage*/
/*
import flash.accessibility.*;
import flash.errors.IllegalOperationError;
import flash.events.*;
import flash.geom.*;
import flash.text.*;
import flash.ui.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._parent = null;
	
	d._render = null;
	d._canvas = null;
	d._frameRate = 24;
	d.mapTouchToMouse = true;
	d._interval = null;
	
	d._transform = null;
	
	d._mouseX = 0;
	d._mouseY = 0;
	d._clickCount = 0;
	d._buttonDown = false;
	
	d._scaleMode = null;
	d._align = null;
	
	d._rendermode = "";
	
	d._bindedRAFC = null;
	d._bindedRender = null;
	
	d._simulatedEvent = null;
	
	d._originalWidth = 0;
	d._originalHeight = 0;
	
	d._width = 0;
	d._height = 0;
	
	d._frames = 100;
	
	d._renderId = 0;
	d._requestId = 0;
	
	var _requestAnimationFrame = null;
	
	d.get_render = function ()
	{
		return this._render;
	}
	
	d.Stage = function (canvasId, rendermode, width, height)
	{
		flash.display.Stage.__current__ = this;
		
		this._parent = null;
		this.DisplayObjectContainer_constructor();
		_requestAnimationFrame = this._getRequestAnimationFrame();
		
		this.set_scaleMode("");
		this.set_align("");
		
		this._bindedRAFC = flash.bindFunction(this, this._requestAnimationFrameComplete);
		this._bindedRender = flash.bindFunction(this, this._renderFrame);
		
		this._originalWidth = width;
		this._originalHeight = height;
		
		this._width = width;
		this._height = height;
		
		this._transform = new flash.geom.Transform(this);
		this._transform._matrix = this._transform._concatenatedMatrix;
		this._rendermode = rendermode;
		
		if (this._rendermode != "2d" && this._rendermode != "3d")
		{
			var canvas = document.getElementById(canvasId);
			
			var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			
			this._rendermode = gl ? "3d" : "2d";
		}
		
		if (this._rendermode != "2d")
		{
			console.warn("Render 3d is not supported");
			
			this._rendermode == "2d";
		}
		
		if (this._rendermode == "2d")
		{
			this._render = new flash.display.Render2d(canvasId, width, height);
		}
		else if (this._rendermode == "3d")
		{
			this._render = new flash.display.Render3d(canvasId, width, height);
		}
		
		this._render._stage = this;
		
		this._canvas = this._render._canvas;
		
		this._initEvents();
		
		this._bindedRender();
	};
	
	d._getRequestAnimationFrame = function ()
	{
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback, element)
			{
				setTimeout(callback, 1);
			};
	};
	
	d._renderFrame = function ()
	{
		//if (this._frames-- <= 0) return;
		//flash.trace("render");
		
		if (this._renderId != this._requestId) return;
		
		this._renderId++;
		
		this._time = new Date().getTime();
		
		flash.text.TextField.__clear__();
		
		flash.display.MovieClip.__clear__();
		this.__updateMovieClipList__();
		flash.display.MovieClip.__frameConstruct__();
		flash.display.DisplayObject.__enterFrame__();
		flash.display.MovieClip.__frameProcessing__();
		flash.display.DisplayObject.__exitFrame__();
		
		_requestAnimationFrame(this._bindedRAFC, this._render._canvas);
	}
	
	d._requestAnimationFrameComplete = function ()
	{
		this._requestId++;
		
		this._updateStageMatrix(this._render._baseMatrix, this._scaleMode, this._align);
		
		this._render._invertedMatrix.copyFrom(this._render._baseMatrix);
		this._render._invertedMatrix.invert();
		
		this._render.setTransform(1, 0, 0, 1, 0, 0);
		this._render.clear();
		
		var children = this.get_numChildren();
		
		for (var i = 0; i < children; i++)
		{
			var child = this.getChildAt(i);
			
			if (child._visible)
			{
				child._render_(this._render);
			}
		}
		
		if (this._render._batchAmount)
		{
			if (this._render._batchAmount != 0)
			{
				this._render._renderBatch();
			}
		}
		
		flash.text.TextField.__update__();
		
		flash.display.MovieClip.__nextFrame__();
		
		var now = new Date().getTime();
		
		var renderTime = now - this._time;
		
		var frameTime = 1000 / this._frameRate;
		
		var timeout = frameTime - renderTime;
		
		if (timeout < 1) timeout = 1;
		
		setTimeout(this._bindedRender, timeout);
	};
	
	d._updateStageMatrix = function (matrix, scaleMode, align)
	{
		var scaleX = this._width / this._originalWidth;
		var scaleY = this._height / this._originalHeight;
		
		switch (scaleMode)
		{
			case flash.display.StageScaleMode.EXACT_FIT:
				matrix.a = scaleX;
				matrix.d = scaleY;
				break;
			
			case flash.display.StageScaleMode.NO_BORDER:
				matrix.a = matrix.d = Math.max(scaleX, scaleY);
				break;
			
			case flash.display.StageScaleMode.NO_SCALE:
				matrix.a = matrix.d = 1;
				break;
			
			case flash.display.StageScaleMode.SHOW_ALL:
			default:
				matrix.a = matrix.d = Math.min(scaleX, scaleY);
				break;
		}
		
		var sizeX = this._originalWidth * matrix.a;
		var sizeY = this._originalHeight * matrix.d;
		
		switch (align)
		{
			case flash.display.StageAlign.TOP:
				matrix.tx = (this._width - sizeX) / 2;
				matrix.ty = 0;
				break;
			
			case flash.display.StageAlign.BOTTOM:
				matrix.tx = (this._width - sizeX) / 2;
				matrix.ty = this._height - sizeY;
				break;
			
			case flash.display.StageAlign.LEFT:
				matrix.tx = 0;
				matrix.ty = (this._height - sizeY) / 2;
				break;
			
			case flash.display.StageAlign.RIGHT:
				matrix.tx = this._width - sizeX;
				matrix.ty = (this._height - sizeY) / 2;
				break;
			
			case flash.display.StageAlign.TOP_LEFT:
				matrix.tx = 0;
				matrix.ty = 0;
				break;
			
			case flash.display.StageAlign.TOP_RIGHT:
				matrix.tx = this._width - sizeX;
				matrix.ty = 0;
				break;
			
			case flash.display.StageAlign.BOTTOM_LEFT:
				matrix.tx = 0;
				matrix.ty = this._height - sizeY;
				break;
			
			case flash.display.StageAlign.BOTTOM_RIGHT:
				matrix.tx = this._width - sizeX;
				matrix.ty = this._height - sizeY;
				break;
			
			default:
				matrix.tx = (this._width - sizeX) / 2;
				matrix.ty = (this._height - sizeY) / 2;
				break;
		}
	};
	
	d._cursorStyle = function (cursor)
	{
		this._canvas.style.cursor = cursor;
	}
	
	d._initEvents = function ()
	{
		this._simulatedEvent = document.createEvent("MouseEvent");
		
		if (this._canvas)
		{
			this._canvas.addEventListener('mousemove', flash.bindFunction(this, this._mousevent), false);
			this._canvas.addEventListener('mousedown', flash.bindFunction(this, this._mousevent), false);
			this._canvas.addEventListener('mouseup', flash.bindFunction(this, this._mousevent), false);
			
			if ('onwheel' in document)
			{
				this._canvas.addEventListener("wheel", flash.bindFunction(this, this._mousevent), false);
			}
			else if ('onmousewheel' in document)
			{
				this._canvas.addEventListener("mousewheel", flash.bindFunction(this, this._mousevent), false);
			}
			
			this._canvas.addEventListener("touchend", flash.bindFunction(this, this._mousevent), false);
			this._canvas.addEventListener("touchstart", flash.bindFunction(this, this._mousevent), false);
			this._canvas.addEventListener("touchcancel", flash.bindFunction(this, this._mousevent), false);
			this._canvas.addEventListener("touchmove", flash.bindFunction(this, this._mousevent), false);
			
			window.addEventListener("keydown", flash.bindFunction(this, this._keyevent), false);
			window.addEventListener("keyup", flash.bindFunction(this, this._keyevent), false);
		}
	};
	
	d._clearClicks = function ()
	{
		this._clickCount = 0;
	}
	
	d._getMousePoint = function (x, y)
	{
		return this._render._invertedMatrix.transformPoint(new flash.geom.Point(x, y));
	}
	
	d._keyevent = function (e)
	{
		if (!e) e = window.event;
		
		var eventType = null;
		
		switch (e.type)
		{
			case 'keydown':
				eventType = flash.events.KeyboardEvent.KEY_DOWN;
				break;
			
			case 'keyup':
				eventType = flash.events.KeyboardEvent.KEY_UP;
				break;
		}
		
		if (eventType)
		{
			if (this.hasEventListener(eventType))
			{
				this.dispatchEvent(new flash.events.KeyboardEvent(
					eventType,
					true,
					false,
					e.charCode,
					e.keyCode,
					e.keyLocation,
					e.ctrlKey,
					e.altKey,
					e.shiftKey
				));
			}
		}
	}
	
	d._mousevent = function (e)
	{
		if (!e) e = window.event;
		
		var ratio = flash.getPixelRatio();
		
		var mouseType = null;
		var touchType = null;
		
		switch (e.type)
		{
			case 'mouseup':
				mouseType = flash.events.MouseEvent.MOUSE_UP;
				
				flash.text.TextField.__blur__();

                this._buttonDown = false;
				break;
			
			case 'mousedown':
				mouseType = flash.events.MouseEvent.MOUSE_DOWN;
				
				flash.text.TextField.__blur__();
				
				flash.display.DisplayObject.__pressedObjects.length = 0;

                this._buttonDown = true;
				break;
			
			case 'mousemove':
				mouseType = flash.events.MouseEvent.MOUSE_MOVE;
				break;
			
			case 'mousewheel':
			case 'wheel':
				mouseType = flash.events.MouseEvent.MOUSE_WHEEL;
				break;
			
			case 'touchstart':
				touchType = flash.events.TouchEvent.TOUCH_BEGIN;
				mouseType = flash.events.MouseEvent.MOUSE_DOWN;

				this._buttonDown = true;
				break;
			
			case 'touchend':
				touchType = flash.events.TouchEvent.TOUCH_END;
				mouseType = flash.events.MouseEvent.MOUSE_UP;

                this._buttonDown = false;
				break;
			
			case 'touchmove':
				touchType = flash.events.TouchEvent.TOUCH_MOVE;
				mouseType = flash.events.MouseEvent.MOUSE_MOVE;
				break;
			
			default:
				return;
		}
		
		var data = {
			bubbles: false,
			cancelable: false,
			localX: 0,
			localY: 0,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			buttonDown: false,
			delta: 0,
			commandKey: false,
			controlKey: false,
			clickCount: 1
		};
		
		var p;
		
		var canvasRect = this._canvas.getBoundingClientRect();
		
		if (touchType)
		{
			var touches = e.changedTouches;
			
			var firstTouch = touches[ 0 ];
			
			p = this._getMousePoint(
				firstTouch.clientX * ratio - canvasRect.left,
				firstTouch.clientY * ratio - canvasRect.top
			);
			
			this._mouseX = p.x;
			this._mouseY = p.y;
			
			if (this.mapTouchToMouse)
			{
				this._simulatedEvent.initMouseEvent(
					mouseType.toLowerCase(),
					true,
					true,
					window,
					1,
					firstTouch.screenX,
					firstTouch.screenY,
					firstTouch.clientX,
					firstTouch.clientY,
					false,
					false,
					false,
					false,
					0,
					null
				);
				
				this._mousevent(this._simulatedEvent);
			}
			else
			{
				for (var i = 0; i < touches.length; i++)
				{
					p = this._getMousePoint(
						touches[ i ].clientX * ratio - canvasRect.left,
						touches[ i ].clientY * ratio - canvasRect.top
					);
					
					data.type = touchType;
					data.bubbles = false;
					data.cancelable = false;
					data.pressure = touches[ i ].force;
					data.touchPointID = touches[ i ].identifier;
					data.isPrimaryTouchPoint = false;
					data.localX = p.x;
					data.localY = p.y;
                    data.globalX = p.x;
                    data.globalY = p.y;
					data.sizeX = touches[ i ].radiusX;
					data.sizeY = touches[ i ].radiusY;
					data.ctrlKey = e.ctrlKey;
					data.altKey = e.altKey;
					data.shiftKey = e.shiftKey;
					data.commandKey = false;
					data.controlKey = false;
					data.timestamp = new Date().getTime();
					data.touchIntent = 0;
					data.isTouchPointCanceled = false;
					
					this._updateInteractiveEvent(data, true);
				}
			}
		}
		else
		{
			var delta = 0;
			
			if (mouseType == flash.events.MouseEvent.MOUSE_WHEEL)
			{
				delta = -e.deltaY || e.detail || e.wheelDelta;
			}
			
			p = this._getMousePoint(
				e.clientX * ratio - canvasRect.left,
				e.clientY * ratio - canvasRect.top
			);
			
			this._mouseX = p.x;
			this._mouseY = p.y;
			
			data.isMouseEvent = true;
			data.type = mouseType;
			data.bubbles = true;
			data.cancelable = false;
			data.localX = this._mouseX;
			data.localY = this._mouseY;
            data.globalX = p.x;
            data.globalY = p.y;
			data.ctrlKey = e.ctrlKey;
			data.altKey = e.altKey;
			data.shiftKey = e.shiftKey;
			data.buttonDown = this._buttonDown;
			data.delta = delta;
			data.commandKey = false;
			data.controlKey = false;
			data.clickCount = this._clickCount;
			
			this._updateInteractiveEvent(data, true);
		}
		
		e.preventDefault();
	};
	
	d._checkInteractiveEvent = function (data)
	{
		return {x: data.localX, y: data.localY};
	};
	
	d.updateSize = function (width, height)
	{
		var ratio = flash.getPixelRatio();
		
		this._height = height * ratio;
		this._width = width * ratio;
		
		this._render.setSize(width, height);
		
		this.dispatchEvent(new flash.events.Event(flash.events.Event.RESIZE));
	};
	
	/*override*/
	d.set_accessibilityImplementation = function (value/*AccessibilityImplementation*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_accessibilityProperties = function (value/*AccessibilityProperties*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_blendMode = function (value/*String*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_cacheAsBitmap = function (value/*Boolean*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_contextMenu = function (value/*ContextMenu*/)/*void*/
	{
		
		return;
		
	};
	
	d.get_displayState = function ()/*String*/
	{
		return null;
		
	};
	
	d.set_displayState = function (value/*String*/)/*void*/
	{
		
	};
	
	/*override*/
	d.set_filters = function (value/*Array*/)/*void*/
	{
		
		return;
		
	};
	
	d.get_wmodeGPU = function ()/*Boolean*/
	{
		return this._rendermode == "3d";
		
	};
	
	d.get_focus = function ()/*InteractiveObject*/
	{
		return null;
		
	};
	
	d.set_focus = function (newFocus/*InteractiveObject*/)/*void*/
	{
		
	};
	
	/*override*/
	d.set_focusRect = function (value/*Object*/)/*void*/
	{
		
		return;
		
	};
	
	d.get_frameRate = function ()/*Number*/
	{
		return this._frameRate;
		
	};
	
	d.set_frameRate = function (value/*Number*/)/*void*/
	{
		this._frameRate = value;
		
		return value;
	};
	
	d.get_fullScreenHeight = function ()/*uint*/
	{
		return 0;
		
	};
	
	d.get_fullScreenSourceRect = function ()/*Rectangle*/
	{
		return null;
		
	};
	
	d.set_fullScreenSourceRect = function (value/*Rectangle*/)/*void*/
	{
		
	};
	
	d.get_fullScreenWidth = function ()/*uint*/
	{
		return 0;
		
	};
	
	/*override*/
	d.set_height = function (value/*Number*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_mask = function (value/*DisplayObject*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_mouseEnabled = function (value/*Boolean*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_name = function (value/*String*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_opaqueBackground = function (value/*Object*/)/*void*/
	{
		
		return;
		
	};
	
	d.get_quality = function ()/*String*/
	{
		return null;
		
	};
	
	d.set_quality = function (value/*String*/)/*void*/
	{
		
	};
	
	d.get_color = function ()/*uint*/
	{
		return this._color;
		
	};
	
	d.set_color = function (value/*uint*/)/*void*/
	{
		this._color = value;
		
		return value;
	};
	
	/*override*/
	d.set_rotation = function (value/*Number*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_scale9Grid = function (value/*Rectangle*/)/*void*/
	{
		
		return;
		
	};
	
	d.get_scaleMode = function ()/*String*/
	{
		return this._scaleMode;
		
	};
	
	d.set_scaleMode = function (value/*String*/)/*void*/
	{
		this._scaleMode = value;
		
		switch (this._scaleMode)
		{
			case flash.display.StageScaleMode.EXACT_FIT:
			case flash.display.StageScaleMode.NO_BORDER:
			case flash.display.StageScaleMode.NO_SCALE:
			case flash.display.StageScaleMode.SHOW_ALL:
				break;
			
			default:
				this._scaleMode = flash.display.StageScaleMode.SHOW_ALL;
				break;
		}
		
		return this._scaleMode;
	};
	
	d.get_align = function ()/*String*/
	{
		return this._align;
		
	};
	
	d.set_align = function (value/*String*/)/*void*/
	{
		this._align = value;
		
		switch (this._align)
		{
			case flash.display.StageAlign.TOP:
			case flash.display.StageAlign.BOTTOM:
			case flash.display.StageAlign.LEFT:
			case flash.display.StageAlign.RIGHT:
			case flash.display.StageAlign.TOP_LEFT:
			case flash.display.StageAlign.TOP_RIGHT:
			case flash.display.StageAlign.BOTTOM_LEFT:
			case flash.display.StageAlign.BOTTOM_RIGHT:
				break;
			
			default:
				this._align = "";
				break;
		}
		
		return this._align;
	};
	
	/*override*/
	d.set_scaleX = function (value/*Number*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_scaleY = function (value/*Number*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_scrollRect = function (value/*Rectangle*/)/*void*/
	{
		
		return;
		
	};
	
	d.get_showDefaultContextMenu = function ()/*Boolean*/
	{
		return false;
		
	};
	
	d.set_showDefaultContextMenu = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	d.get_stageFocusRect = function ()/*Boolean*/
	{
		return false;
		
	};
	
	d.set_stageFocusRect = function (on/*Boolean*/)/*void*/
	{
		
	};
	
	d.get_stageHeight = function ()/*int*/
	{
		if (this._scaleMode == flash.display.StageScaleMode.NO_SCALE)
		{
			return this._height;
		}
		else
		{
			return this._originalHeight;
		}
		
	};
	
	d.get_stageWidth = function ()/*int*/
	{
		if (this._scaleMode == flash.display.StageScaleMode.NO_SCALE)
		{
			return this._width;
		}
		else
		{
			return this._originalWidth;
		}
	};
	
	/*override*/
	d.set_tabEnabled = function (value/*Boolean*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_tabIndex = function (value/*int*/)/*void*/
	{
		value = /*int*/Math.floor(value);
		
		
		return;
		
	};
	
	/*override*/
	d.get_textSnapshot = function ()/*TextSnapshot*/
	{
		
		return null;
		
	};
	
	/*override*/
	d.set_transform = function (value/*Transform*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_visible = function (value/*Boolean*/)/*void*/
	{
		
		return;
		
	};
	
	
	/*override*/
	d.set_width = function (value/*Number*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_x = function (value/*Number*/)/*void*/
	{
		
		return;
		
	};
	
	/*override*/
	d.set_y = function (value/*Number*/)/*void*/
	{
		
		return;
		
	};
	
	d.invalidate = function ()/*void*/
	{
		this.dispatchEvent(new flash.events.Event(flash.events.Event.RENDER));
	};
	
	d.isFocusInaccessible = function ()/*Boolean*/
	{
		return false;
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.DisplayObjectContainer_constructor = this.__base__;
		
		this.__current__ = null;
		
		this.__frameSquare = 0;
		
		this._corrections = {};
	};
	
	flash.addDescription("flash.display.Stage", d, "flash.display.DisplayObjectContainer", s, null);
	
}
());

