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
	d._scaleCorrection = 1;
	d._canvasUpdated = false;
	
	d._render_ = function (render)
	{
		this.__updateTransform__();
		
		this._updateCanvas();
		
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
	
	d._checkScaleCorrection = function ()
	{
		var currentMatrix = this.get_transform().get_concatenatedMatrix();
		
		var currentCorrection = Math.max(
			Math.abs(currentMatrix.a),
			Math.abs(currentMatrix.b),
			Math.abs(currentMatrix.c),
			Math.abs(currentMatrix.d)
		);
		
		var stage = this.get_stage();
		
		if (stage)
		{
			var stageMatrix = stage._render._baseMatrix;
			
			currentCorrection *= Math.max(stageMatrix.a, stageMatrix.d);
		}
		
		if (this._scaleCorrection != currentCorrection)
		{
			this._scaleCorrection = currentCorrection;
			this._canvasUpdated = false;
		}
	}
	
	d._updateCanvas = function ()
	{
		this._checkScaleCorrection();
		
		if (this._canvasUpdated) return;
		
		this._canvasUpdated = true;
		
		var textureWidth = flash.getTextureSize(this._bounds.width * this._scaleCorrection);
		var textureHeight = flash.getTextureSize(this._bounds.height * this._scaleCorrection);
		
		if (this._bitmapData && this._bitmapData.width == textureWidth && this._bitmapData.height == textureHeight)
		{
			this._bitmapData.fillRect(0, 0, this._bitmapData.width, this._bitmapData.height, 0);
		}
		else
		{
			this._bitmapData = new flash.display.BitmapData(textureWidth, textureHeight, true, 0);
		}
		
		this._textureRect = this._bounds.clone();
		this._textureRect.x = this._textureRect.y = 0;
		this._textureRect.width = this._bounds.width * this._scaleCorrection;
		this._textureRect.height = this._bounds.height * this._scaleCorrection;
		
		var context = this._bitmapData._context2d;
		
		if (this._matrix)
		{
			var m = this._matrix;
			
			context.setTransform(
				m.a * this._scaleCorrection,
				m.b,
				m.c,
				m.d * this._scaleCorrection,
				m.tx * this._scaleCorrection,
				m.ty * this._scaleCorrection
			);
		}
		else
		{
			context.setTransform(
				this._scaleCorrection,
				0,
				0,
				this._scaleCorrection,
				0,
				0
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
			
			context.font = flash.text.TextFormat._formatFont(fontName, fontSize);
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
	
	d.StaticText = function ()
	{
		this.DisplayObject_constructor();
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.DisplayObject_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.text.StaticText", d, "flash.display.DisplayObject", s, null);
	
}
());
