/*class flash.display.Sprite*/
/*
import flash.geom.*;
import flash.media.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._graphics = null;
	d._buttonMode = false;
	d._useHandCursor = true;
	
	d._addedChildren = null;
	d.__linkageEnabled = true;
	
	d._render_ = function (render)
	{
		this.__updateTransform__();
		
		var bitmapData = this._graphics._getBitmapData();
		
		if (bitmapData)
		{
			render.drawBitmapData(
				bitmapData,
				this._graphics._getMap(),
				this._graphics._getDisplayBounds(),
				this._transform._concatenatedMatrix,
				this._transform._concatenatedColorTransform,
				this._blendMode,
				this._concatenatedFilters
			);
		}
		
		var children = this.get_numChildren();
		
		var mask = null;
		
		for (var i = 0; i < children; i++)
		{
			var child = this.getChildAt(i);
			
			if (child.__maskDepth__ != -1)
			{
				render.startMask(child);
				
				mask = child;
			}
			else if (child._visible && !child._isMask)
			{
				if (mask && child.__depth__ != -1 && mask.__maskDepth__ <= child.__depth__)
				{
					render.stopMask();
					
					mask = null;
				}
				
				if (child._mask)
				{
					render.startMask(child._mask);
				}
				
				child._render_(render);
				
				if (child._mask)
				{
					render.stopMask();
				}
			}
		}
		
		if (mask)
		{
			render.stopMask();
		}
	};
	
	d.get_buttonMode = function ()
	{
		return this._buttonMode;
	};
	
	d.set_buttonMode = function (value)
	{
		this._buttonMode = value;
		
		return value;
	};
	
	d.get_useHandCursor = function ()
	{
		return this._useHandCursor;
	};
	
	d.set_useHandCursor = function (value)
	{
		this._useHandCursor = value;
		
		return value;
	};
	
	/*public*/
	d.Sprite = function ()
	{
		this._graphics = new flash.display.Graphics();
		
		this.DisplayObjectContainer_constructor();
		
		this._addedChildren = [];
		
		flash.linkage(this, flash.display.MovieClip, flash.display.Sprite);
	};
	
	d.__constructChildren__ = function (frame, remove, add, jump)
	{
		if (!frame)
		{
			throw new Error("Error: 'frame' must not be 'null'");
		}
		
		var j;
		var i;
		var id;
		var child;
		var place;
		var exist;
		var index;
		var define;
		
		if (remove)
		{
			for (j = 0; j < this.get_numChildren(); j++)
			{
				child = this.getChildAt(j);
				
				if (child.__depth__ != -1)
				{
					exist = false;
					
					for (i = 0; i < frame.places.length; i++)
					{
						place = frame.places[ i ];
						
						if (
							place &&
							place.depth == child.__depth__
						)
						{
							id = place.id;
							
							if (!id && jump)
							{
								id = this.__findByDepth__(place.depth, "id");
							}
							
							if (!id || id == child.__id__)
							{
								exist = true;
								break;
							}
						}
					}
					
					if (!exist)
					{
						if (this[ child.get_name() ] == child)
						{
							this[ child.get_name() ] = null;
						}
						
						this.removeChild(child);
						j--;
					}
				}
			}
		}
		
		if (add)
		{
			for (i = 0; i < frame.places.length; i++)
			{
				place = frame.places[ i ];
				
				if (place)
				{
					exist = false;
					
					index = 0;
					
					for (j = 0; j < this.get_numChildren(); j++)
					{
						child = this.getChildAt(j);
						
						if (!exist && child.__depth__ == place.depth)
						{
							if (place.matrix)
							{
								child._transform.set_matrix(place.matrix);
							}
							else if (jump)
							{
								var matrix = this.__findByDepth__(place.depth, "matrix");
								
								if (matrix)
								{
									child._transform.set_matrix(matrix);
								}
							}
							
							if (place.colorTransform)
							{
								child._transform.set_colorTransform(place.colorTransform);
							}
							else if (jump)
							{
								var colorTransform = this.__findByDepth__(place.depth, "colorTransform");
								
								if (colorTransform)
								{
									child._transform.set_colorTransform(colorTransform);
								}
							}
							
							if (place.filters)
							{
								child._filters = place.filters;
							}
							else if (jump)
							{
								var filters = this.__findByDepth__(place.depth, "filters");
								
								if (filters)
								{
									child._filters = filters;
								}
							}
							
							if (place.mask >= 0)
							{
								child.__maskDepth__ = place.mask;
							}
							
							exist = true;
						}
						
						if (child.__depth__ != -1 && child.__depth__ < place.depth)
						{
							index = j + 1;
						}
					}
					
					if (!exist)
					{
						id = place.id;
						
						if (!id && jump)
						{
							id = this.__findByDepth__(place.depth, "id");
						}
						
						if (id)
						{
							define = flash.system.ApplicationDomain.get_currentDomain()._getDefine(id);
							
							if (define)
							{
								child = define.createDisplayObject();
								child.__depth__ = place.depth;
								child.__id__ = id;
								
								if (place.name)
								{
									child.set_name(place.name);
									
									this._addedChildren.push(child);
								}
								
								if (place.matrix)
								{
									child._transform.set_matrix(place.matrix);
								}
								
								if (place.mask)
								{
									child.__maskDepth__ = place.mask;
								}
								
								if (place.colorTransform)
								{
									child._transform.set_colorTransform(place.colorTransform);
								}
								
								if (place.filters)
								{
									child._filters = place.filters;
								}
								
								this.addChildAt(child, index);
							}
						}
					}
				}
			}
		}
	};
	
	d.__updateNames__ = function ()
	{
		if (this._addedChildren.length)
		{
			for (var i in this._addedChildren)
			{
				var child = this._addedChildren[ i ];
				
				this[ child.get_name() ] = child;
			}
			
			this._addedChildren.length = 0;
		}
	};
	
	d.__findByDepth__ = function (depth)
	{
		return null;
	};
	
	/*public*/
	d.get_dropTarget = function ()/*DisplayObject*/
	{
		return null;
		
	};
	
	/*public*/
	d.get_graphics = function ()/*Graphics*/
	{
		return this._graphics;
		
	};
	
	/*public*/
	d.get_hitArea = function ()/*Sprite*/
	{
		return null;
		
	};
	
	/*public*/
	d.set_hitArea = function (value/*Sprite*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_soundTransform = function ()/*SoundTransform*/
	{
		return null;
		
	};
	
	/*public*/
	d.set_soundTransform = function (sndTransform/*SoundTransform*/)/*void*/
	{
		
	};
	
	
	/*public*/
	d.startDrag = function (lockCenter/*Boolean*/, bounds/*Rectangle*/)/*void*/
	{
		if (lockCenter == undefined) lockCenter = false;
		if (bounds == undefined) bounds = null;
		
		
	};
	
	/*public*/
	d.stopDrag = function ()/*void*/
	{
		
	};
	
	d._checkInteractiveEvent = function (data)
	{
		return this._graphics._checkTouch(data.localX, data.localY, this);
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.DisplayObjectContainer_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.display.Sprite", d, "flash.display.DisplayObjectContainer", s, null);
	
}
());
