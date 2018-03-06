(function ()
{
	"use strict";
	
	var d = {};
	
	d._canvas = null;
	d._context = null;
	d._canvasRect = null;
	
	d._maskCanvas = null;
	d._maskContext = null;
	
	d._maskedCanvas = null;
	d._maskedCanvasContext = null;
	
	d._currentcontext = null;
	
	d._width = 0;
	d._height = 0;
	
	d._baseMatrix = null;
	d._tempMatrix = null;
	d._invertedMatrix = null;
	
	d.Render2d = function (canvasId, width, height)
	{
		this._canvas = canvasId ? document.getElementById(canvasId) : document.createElement('canvas');
		
		if (!this._canvas.getContext) return;
		
		this._context = this._canvas.getContext("2d");
		
		this._baseMatrix = new flash.geom.Matrix();
		this._tempMatrix = new flash.geom.Matrix();
		this._invertedMatrix = new flash.geom.Matrix();
		
		this._maskCanvas = document.createElement('canvas');
		this._maskContext = this._maskCanvas.getContext("2d");
		
		this._maskedCanvas = document.createElement('canvas');
		this._maskedCanvasContext = this._maskedCanvas.getContext("2d");
		
		this._canvas.onselectstart = function ()
		{
			return false;
		}
		
		this._currentcontext = this._context;
		
		this.setSize(width, height);
	};
	
	d.setSize = function (width, height)
	{
		this._width = width;
		this._height = height;
		
		this._canvas.width = width;
		this._canvas.height = height;
		
		this._maskCanvas.width = width;
		this._maskCanvas.height = height;
		
		this._maskedCanvas.width = width;
		this._maskedCanvas.height = height;
		
		this._clearMasks = true;
	}
	
	d.setCanvas = function (canvas, context, width, height)
	{
		this._canvas = canvas;
		this._context = context;
		
		this._context.globalAlpha = 1;
		
		this.setSize(width, height);
		
		this._currentcontext = this._context;
		
		this.setTransform(1, 0, 0, 1, 0, 0);
		
		this.clear();
	}
	
	d.setMatrix = function (matrix, roundPosition)
	{
		this.setTransform(
			matrix.a,
			matrix.b,
			matrix.c,
			matrix.d,
			matrix.tx,
			matrix.ty,
			roundPosition
		);
	}
	
	d.setTransform = function (a, b, c, d, tx, ty, roundPosition)
	{
		this._tempMatrix.a = a;
		this._tempMatrix.b = b;
		this._tempMatrix.c = c;
		this._tempMatrix.d = d;
		this._tempMatrix.tx = tx;
		this._tempMatrix.ty = ty;
		
		this._tempMatrix.concat(this._baseMatrix);
		
		if (roundPosition)
		{
			tx = Math.round(this._tempMatrix.tx);
			ty = Math.round(this._tempMatrix.ty);
		}
		else
		{
			tx = this._tempMatrix.tx;
			ty = this._tempMatrix.ty;
		}
		
		this._currentcontext.setTransform(
			this._tempMatrix.a,
			this._tempMatrix.b,
			this._tempMatrix.c,
			this._tempMatrix.d,
			tx,
			ty
		);
	}
	
	d.clear = function ()
	{
		this._context.setTransform(1, 0, 0, 1, 0, 0);
		this._context.clearRect(0, 0, this._width, this._height);
		
		this._currentcontext = this._context;
	}
	
	d.drawBitmapData = function (bitmapData, map, bounds, matrix, colorTransform, blendMode, filters, roundPosition)
	{
		this.setMatrix(matrix, roundPosition);
		
		var imageData;
		
		if (colorTransform.isEmptyColor() && !filters.length)
		{
			imageData = bitmapData._virtualcanvas;
			
			var alpha = colorTransform.alphaMultiplier;
			if (alpha > 1) alpha = 1;
			else if (alpha < 0) alpha = 0;
			
			this._currentcontext.globalAlpha = alpha;
		}
		else
		{
			imageData = bitmapData._getTransfomedCanvas(map, colorTransform, filters);
			
			this._currentcontext.globalAlpha = 1;
		}
		
		this._currentcontext.drawImage(
			imageData,
			
			map.x,
			map.y,
			map.width,
			map.height,
			
			bounds.x,
			bounds.y,
			bounds.width,
			bounds.height
		);
	};
	
	d.startMask = function (mask)
	{
		this.stopMask();
		
		this._maskBounds = mask.getBounds(null);
		
		this._maskBounds.x = this._baseMatrix.tx + this._maskBounds.x * this._baseMatrix.a;
		this._maskBounds.y = this._baseMatrix.ty + this._maskBounds.y * this._baseMatrix.d;
		this._maskBounds.width = this._maskBounds.width * this._baseMatrix.a;
		this._maskBounds.height = this._maskBounds.height * this._baseMatrix.d;
		
		this._currentcontext = this._maskContext;
		
		mask._render_(this);
		
		this._maskedCanvasContext.globalCompositeOperation = 'source-over';
		
		this._currentcontext = this._maskedCanvasContext;
	}
	
	d.stopMask = function ()
	{
		if (this._currentcontext == this._maskedCanvasContext)
		{
			if (this._maskBounds.get_left() < 0) this._maskBounds.set_left(0);
			if (this._maskBounds.get_top() < 0) this._maskBounds.set_top(0);
			if (this._maskBounds.get_right() > this._width) this._maskBounds.set_right(this._width);
			if (this._maskBounds.get_bottom() > this._height) this._maskBounds.set_bottom(this._height);
			
			var mx = Math.round(this._maskBounds.x);
			var my = Math.round(this._maskBounds.y);
			var mw = Math.round(this._maskBounds.width);
			var mh = Math.round(this._maskBounds.height);
			
			//draw
			this._maskedCanvasContext.globalAlpha = 1;
			this._maskedCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
			this._maskedCanvasContext.globalCompositeOperation = 'destination-in';
			this._maskedCanvasContext.drawImage(this._maskCanvas, mx, my, mw, mh, mx, my, mw, mh);
			
			this._context.globalAlpha = 1;
			this._context.setTransform(1, 0, 0, 1, 0, 0);
			
			this._context.drawImage(this._maskedCanvas, mx, my, mw, mh, mx, my, mw, mh);
			
			//clear
			this._maskContext.globalAlpha = 1;
			this._maskContext.setTransform(1, 0, 0, 1, 0, 0);
			this._maskContext.clearRect(mx, my, mw, mh);
			
			this._maskedCanvasContext.globalAlpha = 1;
			this._maskedCanvasContext.setTransform(1, 0, 0, 1, 0, 0);
			this._maskedCanvasContext.clearRect(mx, my, mw, mh);
			
			this._currentcontext = this._context;
		}
	}
	
	flash.addDescription("flash.display.Render2d", d, null, null, null);
	
}
());