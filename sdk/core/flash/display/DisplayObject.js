/*class flash.display.DisplayObject*/
/*
import flash.accessibility.*;
import flash.events.EventDispatcher;
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._name = null;
	
	d._mask = null;
	d._isMask = false;
	
	d._loaderInfo = null;
	
	d._blendMode = null;
	d._visible = true;
	d._parent = null;
	d._transform = null;
	d._filters = null;
	d._concatenatedFilters = null;
	
	d.__depth__ = -1;
	d.__id__ = -1;
	d.__maskDepth__ = -1;
	
	d.get_loaderInfo = function ()
	{
		return this._loaderInfo;
	};
	
	d.get_mask = function ()
	{
		return this._mask;
	};
	
	d.set_mask = function (value)
	{
		if (this._mask)
		{
			this._mask._isMask = false;
		}
		
		this._mask = value;
		
		if (this._mask)
		{
			this._mask._isMask = true;
		}
		
		return value;
	};
	
	/*public*/
	d.DisplayObject = function ()
	{
		this.EventDispatcher_constructor();
		
		this._transform = new flash.geom.Transform(this);
		
		this._filters = [];
		this._concatenatedFilters = [];
		
		this._loaderInfo = new flash.display.LoaderInfo();
		
		this._name = "instance" + (flash.display.DisplayObject.__instanceIndex++);
		
	};
	
	/*public*/
	d.get_name = function ()/*String*/
	{
		return this._name;
		
	};
	
	/*public*/
	d.set_name = function (value/*String*/)/*void*/
	{
		this._name = value;
		
		return value;
		
	};
	
	/*public*/
	d.get_alpha = function ()/*Number*/
	{
		return this._transform._colorTransform.alphaMultiplier;
		
	};
	
	/*public*/
	d.set_alpha = function (value/*Number*/)/*void*/
	{
		this._transform._colorTransform.alphaMultiplier = value;
		
		return value;
		
	};
	
	
	/*public*/
	d.get_transform = function ()/*Transform*/
	{
		return this._transform;
		
	};
	
	/*public*/
	d.set_transform = function (value/*Transform*/)/*void*/
	{
		this._transform = value;
		
		return value;
		
	};
	
	
	/*public*/
	d.get_x = function ()/*Number*/
	{
		return this._transform._matrix.tx;
		
	};
	
	/*public*/
	d.set_x = function (value/*Number*/)/*void*/
	{
		this._transform._matrix.tx = value;
		return value;
	};
	
	
	/*public*/
	d.get_y = function ()/*Number*/
	{
		return this._transform._matrix.ty;
		
	};
	
	/*public*/
	d.set_y = function (value/*Number*/)/*void*/
	{
		this._transform._matrix.ty = value;
		return value;
		
	};
	
	
	/*public*/
	d.get_rotation = function ()/*Number*/
	{
		var m = this._transform._matrix;
		
		return Math.atan2(m.b, m.a) * 180 / Math.PI;
		
	};
	
	/*public*/
	d.set_rotation = function (value/*Number*/)/*void*/
	{
		var angle = value - this.get_rotation();
		
		if (angle != 0)
		{
			var m = this._transform._matrix;
			var tx = m.tx;
			var ty = m.ty;
			m.rotate(angle / 180 * Math.PI);
			m.tx = tx;
			m.ty = ty;
		}
		
		return value;
	};
	
	/*public*/
	d.get_scaleX = function ()/*Number*/
	{
		var m = this._transform._matrix;
		var scale = m.a * m.d - m.b * m.c;
		return Math.sqrt(m.a * m.a + m.b * m.b) * (scale > 0 ? 1 : -1);
		
	};
	
	/*public*/
	d.set_scaleX = function (value/*Number*/)/*void*/
	{
		
		var m = this._transform._matrix;
		
		var scale = this.get_scaleX();
		
		if (scale != 0)
		{
			scale = value / scale;
			
			m.a *= scale;
			m.b *= scale;
		}
		else
		{
			m.a = value;
			m.b = 0;
		}
		
		return value;
	};
	
	
	/*public*/
	d.get_scaleY = function ()/*Number*/
	{
		var m = this._transform._matrix;
		
		return Math.sqrt(m.c * m.c + m.d * m.d);
		
	};
	
	/*public*/
	d.set_scaleY = function (value/*Number*/)/*void*/
	{
		var m = this._transform._matrix;
		
		var scale = this.get_scaleY();
		
		if (scale != 0)
		{
			scale = value / scale;
			
			m.c *= scale;
			m.d *= scale;
		}
		else
		{
			m.c = 0;
			m.d = value;
		}
		
		return value;
	};
	
	/*public*/
	d.get_parent = function ()/*DisplayObjectContainer*/
	{
		return this._parent;
		
	};
	
	/*public*/
	d.get_root = function ()/*DisplayObject*/
	{
		if (this._parent && !(this._parent instanceof flash.display.Stage))
		{
			return this._parent.get_root();
		}
		else
		{
			return this;
		}
		
	};
	
	/*public*/
	d.get_stage = function ()/*Stage*/
	{
		if (this._parent)
		{
			return this._parent.get_stage();
		}
		else if (this instanceof flash.display.Stage)
		{
			return this;
		}
		else
		{
			return null;
		}
	};
	
	d.get_mousePoint = function ()
	{
		return this.globalToLocal(
			new flash.geom.Point(
				flash.display.Stage.__current__._mouseX,
				flash.display.Stage.__current__._mouseY
			)
		);
	}
	
	d.get_mouseX = function ()
	{
		return this.get_mousePoint().x;
	}
	
	d.get_mouseY = function ()
	{
		return this.get_mousePoint().y;
	}
	
	/*public*/
	d.globalToLocal = function (point/*Point*/)/*Point*/
	{
		var m = this._transform.get_concatenatedMatrix();
		m.invert();
		return m.transformPoint(point);
		
	};
	
	/*public*/
	d.localToGlobal = function (point)
	{
		var m = this._transform.get_concatenatedMatrix();
		
		return m.transformPoint(point);
	}
	
	/*public*/
	d.get_visible = function ()/*Boolean*/
	{
		return this._visible;
		
	};
	
	/*public*/
	d.set_visible = function (value/*Boolean*/)/*void*/
	{
		this._visible = value;
		
		return value;
	};
	
	/*public*/
	d.get_blendMode = function ()/*String*/
	{
		return this._blendMode;
		
	};
	
	/*public*/
	d.set_blendMode = function (value/*String*/)/*void*/
	{
		this._blendMode = value;
		
		return value;
	};
	
	/*public*/
	d.get_cacheAsBitmap = function ()/*Boolean*/
	{
		return false;
		
	};
	
	/*public*/
	d.set_cacheAsBitmap = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_filters = function ()/*Array*/
	{
		return this._filters;
		
	};
	
	/*public*/
	d.set_filters = function (value/*Array*/)/*void*/
	{
		this._filters = value;
		
		return;
	};
	
	/*public*/
	d.get_opaqueBackground = function ()/*Object*/
	{
		return null;
		
	};
	
	/*public*/
	d.set_opaqueBackground = function (value/*Object*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_scale9Grid = function ()/*Rectangle*/
	{
		return null;
		
	};
	
	/*public*/
	d.set_scale9Grid = function (innerRectangle/*Rectangle*/)/*void*/
	{
		
	};
	
	
	/*public*/
	d.get_scrollRect = function ()/*Rectangle*/
	{
		return null;
		
	};
	
	/*public*/
	d.set_scrollRect = function (value/*Rectangle*/)/*void*/
	{
		
	};
	
	
	/*public*/
	d.get_width = function ()/*Number*/
	{
		var bounds = this.getBounds(this);
		
		return bounds.width * this.get_scaleX();
		
	};
	
	/*public*/
	d.set_width = function (value/*Number*/)/*void*/
	{
		var bounds = this.getBounds(this);
		
		if (bounds.width * this.get_scaleX() != value)
		{
			this.set_scaleX(value / bounds.width);
		}
		
		return value;
	};
	
	/*public*/
	d.get_height = function ()/*Number*/
	{
		var bounds = this.getBounds(this);
		
		return bounds.height * this.get_scaleY();
		
	};
	
	/*public*/
	d.set_height = function (value/*Number*/)/*void*/
	{
		var bounds = this.getBounds(this);
		
		if (bounds.height * this.get_scaleY() != value)
		{
			this.set_scaleY(value / bounds.height);
		}
		
		return value;
	};
	
	/*private*/
	d._getGraphicsBounds = function (targetCoordinateSpace/*DisplayObject*/)/*Rectangle*/
	{
		var localBounds;
		
		if (this.get_graphics)
		{
			localBounds = this.get_graphics()._getBounds();
		}
		
		if (this._bitmapData)
		{
			localBounds = this._bitmapData.get_rect();
		}
		
		if (this._text && this._calculateTextBounds)
		{
			localBounds = this._calculateTextBounds();
		}
		
		if (localBounds && !localBounds.isEmpty())
		{
			var matrix = this.get_transform().get_concatenatedMatrix();
			
			if (targetCoordinateSpace)
			{
				var targetMatrix = targetCoordinateSpace.get_transform().get_concatenatedMatrix();
				targetMatrix.invert();
				
				matrix.concat(targetMatrix);
			}
			
			var limits = {
				minX: Number.MAX_VALUE,
				minY: Number.MAX_VALUE,
				
				maxX: -Number.MAX_VALUE,
				maxY: -Number.MAX_VALUE
			};
			
			this._expandLimits(limits, matrix, localBounds.get_topLeft());
			this._expandLimits(limits, matrix, localBounds.get_bottomRight());
			this._expandLimits(limits, matrix, new flash.geom.Point(localBounds.x, localBounds.y + localBounds.height));
			this._expandLimits(limits, matrix, new flash.geom.Point(localBounds.x + localBounds.width, localBounds.y));
			
			return new flash.geom.Rectangle(
				limits.minX,
				limits.minY,
				limits.maxX - limits.minX,
				limits.maxY - limits.minY
			);
		}
		
		return new flash.geom.Rectangle();
	}
	
	/*private*/
	d._expandLimits = function (limits, matrix, point)
	{
		point = matrix.transformPoint(point);
		
		if (limits.minX > point.x) limits.minX = point.x;
		if (limits.maxX < point.x) limits.maxX = point.x;
		
		if (limits.minY > point.y) limits.minY = point.y;
		if (limits.maxY < point.y) limits.maxY = point.y;
	};
	
	d.__updateTransform__ = function ()
	{
		var transform = this.get_transform();
		
		transform._concatenatedMatrix.copyFrom(transform._matrix);
		transform._concatenatedColorTransform.copyFrom(transform._colorTransform);
		
		if (this._filters.length)
		{
			this._concatenatedFilters = this._filters.slice();
		}
		else if (this._concatenatedFilters.length)
		{
			this._concatenatedFilters.length = 0;
		}
		
		var parent = this.get_parent();
		
		if (parent)
		{
			transform._concatenatedMatrix.concat(parent._transform._concatenatedMatrix);
			transform._concatenatedColorTransform.concat(parent._transform._concatenatedColorTransform);
			
			if (parent._concatenatedFilters.length)
			{
				this._concatenatedFilters = this._concatenatedFilters.concat(parent._concatenatedFilters);
			}
		}
		
		transform._invertedConcatenatedMatrix.copyFrom(transform._concatenatedMatrix);
		transform._invertedConcatenatedMatrix.invert();
	};
	
	/*protected*/
	d.__updateMovieClipList__ = function ()
	{
		
	}
	
	/*public*/
	d.getBounds = function (targetCoordinateSpace/*DisplayObject*/)/*Rectangle*/
	{
		return this._getGraphicsBounds(targetCoordinateSpace);
	};
	
	/*public*/
	d.getRect = function (targetCoordinateSpace/*DisplayObject*/)/*Rectangle*/
	{
		//TODO - see documentation
		return this.getBounds(targetCoordinateSpace);
		
	};
	
	/*public*/
	d.hitTestObject = function (obj/*DisplayObject*/)/*Boolean*/
	{
		return false;
		
	};
	
	/*override*/
	/*public*/
	d.addEventListener = function (type/*String*/, listener/*Function*/, useCapture/*Boolean*/, priority/*int*/, useWeakReference/*Boolean*/)/*void*/
	{
		if (type == flash.events.Event.ENTER_FRAME)
		{
			var index = flash.display.DisplayObject.__enterFrameObjects.indexOf(this);
			
			if (index == -1)
			{
				flash.display.DisplayObject.__enterFrameObjects.push(this);
			}
		}
		else if (type == flash.events.Event.EXIT_FRAME)
		{
			var index = flash.display.DisplayObject.__exitFrameObjects.indexOf(this);
			
			if (index == -1)
			{
				flash.display.DisplayObject.__exitFrameObjects.push(this);
			}
		}
		
		this.EventDispatcher_addEventListener(type, listener, useCapture, priority, useWeakReference);
	};
	
	/*override*/
	/*public*/
	d.removeEventListener = function (type/*String*/, listener/*Function*/, useCapture/*Boolean*/)/*void*/
	{
		if (type == flash.events.Event.ENTER_FRAME)
		{
			var index = flash.display.DisplayObject.__enterFrameObjects.indexOf(this);
			
			if (index != -1)
			{
				flash.display.DisplayObject.__enterFrameObjects.splice(index, 1);
			}
		}
		else if (type == flash.events.Event.EXIT_FRAME)
		{
			var index = flash.display.DisplayObject.__exitFrameObjects.indexOf(this);
			
			if (index != -1)
			{
				flash.display.DisplayObject.__exitFrameObjects.splice(index, 1);
			}
		}
		
		this.EventDispatcher_removeEventListener(type, listener, useCapture);
	};
	
	d._updateInteractiveEvent = function (data, dispatch)
	{
		if (!this._visible) return null;
		
		return this._checkInteractiveEvent(data);
	};
	
	d._checkInteractiveEvent = function (data)
	{
		return null;
	};
	
	d._dispatchInteractiveEvent = function (data, x, y, target, type)
	{
		if (!type)
		{
			type = data.type;
		}
		
		if (this.hasEventListener(type))
		{
			var event = null;
			
			if (data.isMouseEvent)
			{
				event = new flash.events.MouseEvent(
					type,
					data.bubbles,
					data.cancelable,
					x,
					y,
					target,
					data.ctrlKey,
					data.altKey,
					data.shiftKey,
					data.buttonDown,
					data.delta,
					data.commandKey,
					data.controlKey,
					data.clickCount
				);
			}
			else
			{
				event = new flash.events.TouchEvent(
					type,
					data.bubbles,
					data.cancelable,
					data.touchPointID,
					data.isPrimaryTouchPoint,
					x,
					y,
					data.sizeX,
					data.sizeY,
					data.pressure,
					target,
					data.ctrlKey,
					data.altKey,
					data.shiftKey,
					data.commandKey,
					data.controlKey,
					data.timestamp,
					data.touchIntent,
					data.isTouchPointCanceled
				);
			}
			
			this.dispatchEvent(event);
		}
		
		if (type == flash.events.MouseEvent.MOUSE_DOWN)
		{
			flash.display.DisplayObject.__pressedObjects.push(this);
		}
		else if (type == flash.events.MouseEvent.MOUSE_UP && flash.display.DisplayObject.__pressedObjects.indexOf(this) != -1)
		{
			this._dispatchInteractiveEvent(data, x, y, target, flash.events.MouseEvent.CLICK);
		}
	};
	
	var s = {};
	
	s.__enterFrame__ = function ()
	{
		//flash.trace("flash.display.DisplayObject.__enterFrame__");
		
		var objects = this.__enterFrameObjects;
		
		for (var i = 0; i < objects.length; i++)
		{
			var object = objects[ i ];
			
			object.dispatchEvent(new flash.events.Event(flash.events.Event.ENTER_FRAME));
		}
	};
	
	s.__exitFrame__ = function ()
	{
		//flash.trace("flash.display.DisplayObject.__exitFrame__");
		
		var objects = this.__exitFrameObjects;
		
		for (var i = 0; i < objects.length; i++)
		{
			var object = objects[ i ];
			
			object.dispatchEvent(new flash.events.Event(flash.events.Event.EXIT_FRAME));
		}
	};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_addEventListener = this.__base__.prototype.addEventListener;
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_removeEventListener = this.__base__.prototype.removeEventListener;
		
		this.__pressedObjects = [];
		this.__enterFrameObjects = [];
		this.__exitFrameObjects = [];
		this.__instanceIndex = 0;
	};
	
	
	flash.addDescription("flash.display.DisplayObject", d, "flash.events.EventDispatcher", s, [ "flash.display.IBitmapDrawable" ]);
	
}
());
