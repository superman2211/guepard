/*class flash.text.StaticText*/
/*
import flash.display.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._textRecords = null;
	d._bitmapData = null;
	d._textureRect = null;
	d._bounds = null;
	d._matrix = null;
	d._checkTouch_point = null;
	
	d._render_ = function (render)
	{
		this.__updateTransform__();
		
		if (!this._bitmapData)
		{
			this._updateCanvas();
		}
		
		render.drawBitmapData(
			this._bitmapData,
			this._textureRect,
			this._bounds,
			this._transform._concatenatedMatrix,
			this._transform._concatenatedColorTransform,
			this._blendMode,
			this._concatenatedFilters
		);
	};
	
	/*public*/
	d.get_text = function ()/*String*/
	{
		var text = "";
		
		if (this._textRecords)
		{
			for (var i in this._textRecords)
			{
				text += this._textRecords[ i ].text;
			}
		}
		
		return text;
	};
	
	d._updateCanvas = function ()
	{
		if (this._bitmapData) return;
		
		var textureWidth = flash.getTextureSize(this._bounds.width);
		var textureHeight = flash.getTextureSize(this._bounds.height);
		
		this._bitmapData = new flash.display.BitmapData(textureWidth, textureHeight, true, 0);
		
		this._textureRect = this._bounds.clone();
		this._textureRect.x = this._textureRect.y = 0;
		
		var context = this._bitmapData._context2d;
		
		if (this._matrix)
		{
			var m = this._matrix;
			
			context.setTransform(
				m.a,
				m.b,
				m.c,
				m.d,
				m.tx,
				m.ty
			);
		}
		
		var fontName = "";
		var color = 0;
		var fontSize = 0;
		
		var x = 0;
		var y = 0;
		
		var xShift = this._bounds.x;
		var yShift = this._bounds.y;
		
		for (var i = 0; i < this._textRecords.length; i++)
		{
			var record = this._textRecords[ i ];
			
			var text = record.text.split("");
			
			var glyphEntrys = record.glyphEntrys;
			
			if (record.fontSize != undefined)
			{
				fontSize = Number(record.fontSize);
			}
			
			if (record.fontName != undefined)
			{
				fontName = record.fontName;
			}
			
			if (record.color != undefined)
			{
				color = Number(record.color);
			}
			
			context.font = fontSize + "px " + fontName;
			context.fillStyle = flash.numberToHex(color);
			
			if (record.x != undefined)
			{
				x = Number(record.x);
			}
			else
			{
				if (record.y != undefined)
				{
					x = 0;
				}
			}
			
			if (record.y != undefined)
			{
				y = Number(record.y);
			}
			else
			{
				if (record.x != undefined)
				{
					x = 0;
					y = record.x;
				}
			}
			
			for (var j = 0; j < text.length; j++)
			{
				context.fillText(
					text[ j ],
					x - xShift,
					y - yShift
				);
				
				x += glyphEntrys[ j ];
			}
		}
	};
	
	d._checkInteractiveEvent = function (data)
	{
		if (!this._checkTouch_point)
		{
			this._checkTouch_point = new flash.geom.Point();
		}
		
		this._checkTouch_point.x = data.localX;
		this._checkTouch_point.y = data.localY;
		
		this._checkTouch_point = this.globalToLocal(this._checkTouch_point);
		
		if (this._bounds.containsPoint(this._checkTouch_point))
		{
			return this._checkTouch_point;
		}
		else
		{
			return null;
		}
	};
	
	/*public*/
	d.StaticText = function ()
	{
		this.DisplayObject_constructor();
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.DisplayObject_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.text.StaticText", d, "flash.display.DisplayObject", s, null);
	
}
());
