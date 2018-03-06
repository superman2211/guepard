/*class flash.display.DisplayObjectContainer*/
/*
import flash.geom.*;
import flash.text.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._mouseChildren = true;
	d._tabChildren = true;
	
	d._children = null;
	d._cursorStyle;
	
	d.get_mouseChildren = function ()
	{
		return this._mouseChildren;
		
	};
	
	d.set_mouseChildren = function (value)
	{
		this._mouseChildren = value;
		
		return value;
	};
	
	d.get_tabChildren = function ()
	{
		return this._tabChildren;
		
	};
	
	d.set_tabChildren = function (value)
	{
		this._tabChildren = value;
		
		return value;
	};
	
	
	/*public*/
	d.get_numChildren = function ()/*int*/
	{
		return this._children.length;
		
	};
	
	
	/*public*/
	d.DisplayObjectContainer = function ()
	{
		this.InteractiveObject_constructor();
		
		this._children = [];
	};
	
	/*public*/
	d.addChild = function (child/*DisplayObject*/)/*DisplayObject*/
	{
		return this.addChildAt(child, this._children.length);
	};
	
	/*public*/
	d.addChildAt = function (child/*DisplayObject*/, index/*int*/)/*DisplayObject*/
	{
		index = /*int*/Math.floor(index);
		
		if (index < 0 || index > this._children.length)
		{
			console.error("index is outside the container children");
		}
		
		if (child == null)
		{
			console.error("add the object should not be null");
		}
		
		if (child == this)
		{
			console.error("can not add an object to itself");
		}
		
		if (this.contains(child))
		{
			return child;
		}
		
		
		if (child == this.parent)
		{
			console.error("add the object should not be a parent container");
		}
		
		
		if (child._parent != null)
		{
			child._parent.removeChild(child);
			
		}
		
		child._parent = this;
		
		if (index == this._children.length)
		{
			this._children.push(child);
		}
		else
		{
			this._children.splice(index, 0, child);
		}
		
		child.dispatchEvent(new flash.events.Event(flash.events.Event.ADDED));
		
		if (this.get_stage())
		{
			child.dispatchEvent(new flash.events.Event(flash.events.Event.ADDED_TO_STAGE));
		}
		
		return child;
		
	};
	
	
	/*public*/
	d.contains = function (child/*DisplayObject*/)/*Boolean*/
	{
		if (child == null)
		{
			console.error("the object should not be null");
			
		}
		
		return child._parent == this;
		
	};
	
	/*public*/
	d.getChildAt = function (index/*int*/)/*DisplayObject*/
	{
		index = /*int*/Math.floor(index);
		
		if (index < 0 || index >= this._children.length)
		{
			console.error("index is outside the container children");
		}
		
		return this._children[ index ];
		
	};
	
	/*public*/
	d.getChildByName = function (name/*String*/)/*DisplayObject*/
	{
		for (var i = 0; i < this._children.length; i++)
		{
			var child = this._children[ i ];
			
			if (child._name == name)
			{
				return child;
			}
		}
		
		return null;
		
	};
	
	/*public*/
	d.getChildIndex = function (child/*DisplayObject*/)/*int*/
	{
		if (child == null)
		{
			console.error("the object should not be null");
		}
		
		if (this.contains(child))
		{
			return this._children.indexOf(child);
		}
		
		return -1;
		
	};
	
	/*public*/
	d.getObjectsUnderPoint = function (point/*Point*/)/*Array*/
	{
		return null;
		
	};
	
	/*public*/
	d.removeChild = function (child/*DisplayObject*/)/*DisplayObject*/
	{
		if (child == null)
		{
			console.error("remove object should not be null");
			return;
		}
		
		
		if (!this.contains(child))
		{
			console.error("remove object must contains in container");
			return;
		}
		
		var index = this.getChildIndex(child);
		
		this.removeChildAt(index);
		
		return child;
	};
	
	/*public*/
	d.removeChildAt = function (index/*int*/)/*DisplayObject*/
	{
		index = /*int*/Math.floor(index);
		
		if (index < 0 || index >= this._children.length)
		{
			console.error("index of remove object is outside the container children");
			return;
		}
		
		var child = this._children[ index ];
		
		child._parent = null;
		
		this._children.splice(index, 1);
		
		child.dispatchEvent(new flash.events.Event(flash.events.Event.REMOVED));
		
		if (this.get_stage())
		{
			child.dispatchEvent(new flash.events.Event(flash.events.Event.REMOVED_TO_STAGE));
		}
		
		return child;
		
	};
	
	/*public*/
	d.setChildIndex = function (child/*DisplayObject*/, index/*int*/)/*void*/
	{
		if (child == null)
		{
			console.error("the object should not be null");
		}
		
		if (index < 0 || index >= this._children.length)
		{
			console.error("index is outside the container children");
		}
		
		if (this.contains(child))
		{
			this._children.splice(this._children.indexOf(child), 1);
			
			this._children.splice(index, 0, child);
		}
		else
		{
			console.error("can not change the index of the object that does not contains in container");
		}
		
		
	};
	
	/*public*/
	d.swapChildren = function (child1/*DisplayObject*/, child2/*DisplayObject*/)/*void*/
	{
		if (child1 == null)
		{
			console.error("the object should not be null");
		}
		
		if (child2 == null)
		{
			console.error("the object should not be null");
		}
		
		if (!this.contains(child1))
		{
			console.error("can not change the index of the object that does not contains in container");
		}
		
		if (!this.contains(child2))
		{
			console.error("can not change the index of the object that does not contains in container");
		}
		
		swapChildrenAt(this.getChildIndex(child1), this.getChildIndex(child2));
	};
	
	/*public*/
	d.swapChildrenAt = function (index1/*int*/, index2/*int*/)/*void*/
	{
		index1 = /*int*/Math.floor(index1);
		index2 = /*int*/Math.floor(index2);
		
		if (index1 < 0 || index1 >= this._children.length)
		{
			console.error("index is outside the container children");
		}
		
		if (index2 < 0 || index2 >= this._children.length)
		{
			console.error("index is outside the container children");
		}
		
		child1 = this._children[ index1 ];
		child2 = this._children[ index2 ];
		
		this._children[ index1 ] = child2;
		this._children[ index2 ] = child1;
		
	};
	
	d.removeChildren = function ()
	{
		var child = null;
		
		for (var i = 0; i < this._children.length; i++)
		{
			child = this._children[ i ];
			child._parent = null;
			
			child.dispatchEvent(new flash.events.Event(flash.events.Event.REMOVED));
			
			//correct this !!!!!!!
			if (child.graphics) child.graphics.dispose();
			
			if (this.get_stage())
			{
				child.dispatchEvent(new flash.events.Event(flash.events.Event.REMOVED_TO_STAGE));
			}
		}
		
		this._children.length = 0;
	}
	
	
	/*override*/
	/*public*/
	d.getBounds = function (targetCoordinateSpace/*DisplayObject*/)/*Rectangle*/
	{
		var bounds = this.InteractiveObject_getBounds(targetCoordinateSpace);
		
		for (var i = 0; i < this._children.length; i++)
		{
			var child = this._children[ i ];
			
			var childBounds = child.getBounds(targetCoordinateSpace);
			
			if (!childBounds.isEmpty())
			{
				bounds = bounds.union(childBounds);
			}
		}
		
		return bounds;
	};
	
	/*protected*/
	d.__updateMovieClipList__ = function ()
	{
		this.InteractiveObject___updateMovieClipList__();
		
		for (var i = 0; i < this._children.length; i++)
		{
			var child = this._children[ i ];
			
			child.__updateMovieClipList__();
		}
	};
	
	/*override*/
	/*public*/
	d.dispatchEvent = function (event/*Event*/)/*Boolean*/
	{
		var type = event.get_type();
		
		if (type == flash.events.Event.ADDED_TO_STAGE ||
			type == flash.events.Event.REMOVED_TO_STAGE ||
			type == flash.events.Event.ADDED ||
			type == flash.events.Event.REMOVED ||
			type == flash.events.Event.RENDER)
		{
			for (var i = 0; i < this._children.length; i++)
			{
				var child = this._children[ i ];
				
				child.dispatchEvent(event);
			}
		}
		
		return this.InteractiveObject_dispatchEvent(event);
	};
	
	d._updateInteractiveEvent = function (data, dispatch)
	{
		if (!this._visible) return null;
		
		var point = null;
		
		if (this._mouseEnabled || this._mouseChildren)
		{
			var target = null;
			
			if (this._children.length)
			{
				var mouseChildren = dispatch && this._mouseChildren;
				
				var i = this._children.length;
				
				var complete = false;
				
				while (i--)
				{
					var child = this._children[ i ];
					
					if (complete)
					{
						if (child instanceof flash.display.InteractiveObject)
						{
							child._updateOverEvent(data);
						}
					}
					else
					{
						if (child._updateInteractiveEvent(data, mouseChildren))
						{
							target = child;
							
							complete = true;
						}
					}
				}
			}
			
			if (target)
			{
				point = this.get_mousePoint();
				
				if (dispatch)
				{
					this._dispatchInteractiveEvent(data, point.x, point.y, this._mouseChildren ? target : this);
				}
			}
			else
			{
				point = this.InteractiveObject__updateInteractiveEvent(data, dispatch, true);
			}
			
			this._updateMoveEvent(point, data, dispatch);
			
			return point;
		}
		
		return point;
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.InteractiveObject_constructor = this.__base__;
		/*super*/
		/*public*/
		this.prototype.InteractiveObject_getBounds = this.__base__.prototype.getBounds;
		/*super*/
		/*public*/
		this.prototype.InteractiveObject_dispatchEvent = this.__base__.prototype.dispatchEvent;
		/*super*/
		/*public*/
		this.prototype.InteractiveObject___updateMovieClipList__ = this.__base__.prototype.__updateMovieClipList__;
		/*super*/
		/*public*/
		this.prototype.InteractiveObject__updateInteractiveEvent = this.__base__.prototype._updateInteractiveEvent;
	}
	
	flash.addDescription("flash.display.DisplayObjectContainer", d, "flash.display.InteractiveObject", s, null);
	
}
());
