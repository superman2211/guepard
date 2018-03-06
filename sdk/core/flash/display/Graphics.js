/*class flash.display.Graphics*/
/*
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._data = null;
	d._path = null;
	d._needsRender = false;
	
	d._bitmapData = null;
	d._canvasRect = null;
	d._textureRect = null;
	
	d._lineStyle = null;
	d._maxThickness = 0;
	
	d._checkTouch_point = null;
	d._checkTouch_matrix = null;
	d._checkTouch_pix = 0;
	
	d._textureInfo = null;
	
	/*public*/
	d.Graphics = function ()
	{
		this._data = [];
		
		this._checkTouch_point = new flash.geom.Point();
		this._checkTouch_matrix = new flash.geom.Matrix();
		
	};
	
	d.dispose = function ()
	{
		if (this._bitmapData)
		{
			this._bitmapData.dispose();
			this._bitmapData = null;
		}
		
		this._needsRender = true;
	};
	
	d._renderData = function ()
	{
		if (this._needsRender)
		{
			this._canvasRect = this._getBoundingBox();
			
			if (this._canvasRect != null)
			{
				var textureWidth = flash.getTextureSize(this._canvasRect.width);
				var textureHeight = flash.getTextureSize(this._canvasRect.height);
				
				if (!this._bitmapData)
				{
					this._bitmapData = new flash.display.BitmapData(textureWidth, textureHeight, true, 0);
				}
				else
				{
					this._bitmapData._setSize(textureWidth, textureHeight);
				}
				
				this._textureRect = this._canvasRect.clone();
				this._textureRect.x = this._textureRect.y = 0;
				
				var context = this._bitmapData._context2d;
				
				var xShift = -this._canvasRect.x;
				var yShift = -this._canvasRect.y;
				
				for (var i = 0; i < this._data.length; i++)
				{
					var item = this._data[ i ];
					
					if (item instanceof flash.display.GraphicsSolidFill)
					{
						context.globalAlpha = item.alpha;
						context.fillStyle = flash.numberToHex(item.color);
						
					}
					else if (item instanceof flash.display.GraphicsBitmapFill)
					{
						context.setTransform(
							item.matrix.a,
							item.matrix.b,
							item.matrix.c,
							item.matrix.d,
							item.matrix.tx - this._canvasRect.x,
							item.matrix.ty - this._canvasRect.y
						);
						
						context.fillStyle = context.createPattern(
							item.bitmapData._virtualcanvas,
							item.repeat ? "repeat" : "no-repeat"
						);
					}
					
					if (item instanceof flash.display.GraphicsStroke)
					{
						this._lineStyle = item.lineStyle;
						context.lineWidth = item.lineStyle.thickness;
						context.strokeStyle = flash.numberToHex(item.lineStyle.fill);
						context.lineCap = "round";
						context.lineJoin = "round";
					}
					
					if (item instanceof flash.display.GraphicsEndFill)
					{
						context.restore();
						context.fill(this._data[ i - 1 ]._winding);
					}
					
					context.save();
					
					if (item.commands)
					{
						context.setTransform(1, 0, 0, 1, 0, 0);
						context.beginPath();
						
						var dataIndex = 0;
						
						for (var i1 = 0; i1 < item.commands.length; i1++)
						{
							var command = item.commands[ i1 ];
							var currentData = item.data;
							
							switch (command)
							{
								case flash.display.GraphicsPathCommand.MOVE_TO:
									context.moveTo(
										currentData[ dataIndex ] + xShift,
										currentData[ dataIndex + 1 ] + yShift
									);
									dataIndex += 2;
									break;
								
								case flash.display.GraphicsPathCommand.LINE_TO:
									context.lineTo(
										currentData[ dataIndex ] + xShift,
										currentData[ dataIndex + 1 ] + yShift
									);
									dataIndex += 2;
									break;
								
								case flash.display.GraphicsPathCommand.CURVE_TO:
									context.quadraticCurveTo(
										currentData[ dataIndex ] + xShift,
										currentData[ dataIndex + 1 ] + yShift,
										currentData[ dataIndex + 2 ] + xShift,
										currentData[ dataIndex + 3 ] + yShift
									);
									dataIndex += 4;
									break;
								
								case flash.display.GraphicsPathCommand.WIDE_MOVE_TO:
									context.moveTo(
										currentData[ dataIndex ] + xShift,
										currentData[ dataIndex + 1 ] + yShift
									);
									dataIndex += 4;
									break;
								
								case flash.display.GraphicsPathCommand.WIDE_LINE_TO:
									context.lineTo(
										currentData[ dataIndex ] + xShift,
										currentData[ dataIndex + 1 ] + yShift
									);
									dataIndex += 4;
									break;
								
								case flash.display.GraphicsPathCommand.CUBIC_CURVE_TO:
									context.bezierCurveTo(
										currentData[ dataIndex ] + xShift,
										currentData[ dataIndex + 1 ] + yShift,
										currentData[ dataIndex + 2 ] + xShift,
										currentData[ dataIndex + 3 ] + yShift,
										currentData[ dataIndex + 4 ] + xShift,
										currentData[ dataIndex + 5 ] + yShift
									);
									dataIndex += 6;
									
									break;
								case flash.display.GraphicsPathCommand.CIRCLE:
									context.arc(
										currentData[ dataIndex ] + xShift,
										currentData[ dataIndex + 1 ] + yShift,
										currentData[ dataIndex + 2 ] - currentData[ dataIndex ],
										0,
										2 * Math.PI
									);
									dataIndex += 6;
									break;
							}
						}
						
						if (i == this._data.length - 1)
						{
							context.restore();
							context.fill(item._winding);
						}
					}
					
					if (this._lineStyle)
					{
						context.globalAlpha = this._lineStyle.alpha;
						context.stroke();
						context.restore();
					}
				}
				
				this._needsRender = false;
				
			}
		}
	};
	
	d.copyFrom = function (sourceGraphics)
	{
		this._textureInfo = null;
		var sourceData = source._data;
		var sourceDataLength = sourceGraphics.data.length;
		for (var i = 0; i < sourceDataLength; i++)
		{
			this._data.push(sourceData[ i ].clone());
		}
	}
	
	/*public*/
	d.beginBitmapFill = function (bitmap/*BitmapData*/, matrix/*Matrix*/, repeat/*Boolean*/, smooth/*Boolean*/)/*void*/
	{
		this._textureInfo = null;
		
		if (matrix == undefined) matrix = new flash.geom.Matrix();
		;
		if (repeat == undefined) repeat = true;
		if (smooth == undefined) smooth = false;
		
		if (bitmap)
		{
			this._data.push(new flash.display.GraphicsBitmapFill(bitmap, matrix, repeat, smooth));
			this._path = new flash.display.GraphicsPath();
			this._path.lineStyle = this._lineStyle;
			this._data.push(this._path);
			this._needsRender = true;
		}
		
		
	};
	
	/*public*/
	d.beginFill = function (color/*uint*/, alpha/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (!color)
		{
			
			color = 0x000000;
			
		}
		
		if (!alpha)
		{
			
			alpha = 1;
			
		}
		
		
		this._data.push(new flash.display.GraphicsSolidFill(color, alpha));
		
		this._path = new flash.display.GraphicsPath();
		this._path.lineStyle = this._lineStyle;
		this._data.push(this._path);
		this._needsRender = true;
		
		
	};
	
	/*public*/
	d.beginGradientFill = function (type/*String*/, colors/*Array*/, alphas/*Array*/, ratios/*Array*/, matrix/*Matrix*/, spreadMethod/*String*/, interpolationMethod/*String*/, focalPointRatio/*Number*/)/*void*/
	{
		
		if (matrix == undefined) matrix = null;
		if (spreadMethod == undefined) spreadMethod = "pad";
		if (interpolationMethod == undefined) interpolationMethod = "rgb";
		if (focalPointRatio == undefined) focalPointRatio = 0;
		
		/*TODO GRADIENT FILL*/
		
		this._textureInfo = null;
		
		this._data.push(new flash.display.GraphicsSolidFill(colors[ 0 ], alphas[ 0 ]));
		
		this._path = new flash.display.GraphicsPath();
		this._path.lineStyle = this._lineStyle;
		this._data.push(this._path);
		this._needsRender = true;
		
	};
	
	/*public*/
	d.clear = function ()/*void*/
	{
		this._textureInfo = null;
		this._path = null;
		this._data = [];
		this._needsRender = true;
	};
	
	/*public*/
	d.curveTo = function (controlX/*Number*/, controlY/*Number*/, anchorX/*Number*/, anchorY/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (this._path != null)
		{
			this._path.commands.push(flash.display.GraphicsPathCommand.CURVE_TO);
			this._path.data.push(controlX, controlY, anchorX, anchorY);
			this._needsRender = true;
		}
	};
	
	/*public*/
	d.drawCircle = function (x/*Number*/, y/*Number*/, radius/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (this._path != null)
		{
			this._path.commands.push(flash.display.GraphicsPathCommand.CIRCLE);
			this._path.data.push(x, y, x + radius, y + radius, x - radius, y - radius);
			this._needsRender = true;
		}
		
	};
	
	/*public*/
	d.drawEllipse = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (this._path != null)
		{
			
			var k = .5522848;
			var ox = (w / 2) * k;
			var oy = (h / 2) * k;
			var xe = x + w;
			var ye = y + h;
			var xm = x + w / 2;
			var ym = y + h / 2;
			
			this._path.commands.push(flash.display.GraphicsPathCommand.MOVE_TO);
			this._path.data.push(x, ym);
			this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
			this._path.data.push(x, ym - oy, xm - ox, y, xm, y);
			this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
			this._path.data.push(xm + ox, y, xe, ym - oy, xe, ym);
			this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
			this._path.data.push(xe, ym + oy, xm + ox, ye, xm, ye);
			this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
			this._path.data.push(xm - ox, ye, x, ym + oy, x, ym);
			
			this._needsRender = true;
			
		}
		
	};
	
	/*public*/
	d.drawRect = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		this._path.commands.push(flash.display.GraphicsPathCommand.MOVE_TO);
		this._path.data.push(x, y);
		this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this._path.data.push(x + width, y);
		this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this._path.data.push(x + width, y + height);
		this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this._path.data.push(x, y + height);
		this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this._path.data.push(x, y);
		this._needsRender = true;
	};
	
	/*public*/
	d.drawRoundRect = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/, ellipseWidth/*Number*/, ellipseHeight/*Number*/)/*void*/
	{
		if (ellipseWidth == undefined) ellipseWidth = 0;
		
		if (ellipseHeight == undefined) ellipseHeight = ellipseWidth;
		
		this._textureInfo = null;
		
		var w = ellipseWidth * 2;
		var h = ellipseHeight * 2;
		
		var k = 0.5522848;
		
		var ox = (w / 2) * k;
		var oy = (h / 2) * k;
		
		var xe = x + w;
		var ye = y + h;
		
		var xm = x + w / 2;
		var ym = y + h / 2;
		
		var dx = width - w;
		var dy = height - h;
		
		this._path.commands.push(flash.display.GraphicsPathCommand.MOVE_TO);
		this._path.data.push(
			x,
			ym
		);
		
		this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
		this._path.data.push(
			x,
			ym - oy,
			xm - ox,
			y,
			xm,
			y
		);
		
		this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this._path.data.push(
			xm + dx,
			y
		);
		
		this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
		this._path.data.push(
			xm + ox + dx,
			y,
			xe + dx,
			ym - oy,
			xe + dx,
			ym
		);
		
		this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this._path.data.push(
			xe + dx,
			ym + dy
		);
		
		this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
		this._path.data.push(
			xe + dx,
			ym + oy + dy,
			xm + ox + dx,
			ye + dy,
			xm + dx,
			ye + dy
		);
		
		this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this._path.data.push(
			xm,
			ye + dy
		);
		
		this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
		this._path.data.push(
			xm - ox,
			ye + dy,
			x,
			ym + oy + dy,
			x,
			ym + dy
		);
		
		this._needsRender = true;
		
		this._needsRender = true;
	};
	
	/*public*/
	d.drawRoundRectComplex = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/, topLeftRadius/*Number*/, topRightRadius/*Number*/, bottomLeftRadius/*Number*/, bottomRightRadius/*Number*/)/*void*/
	{
		this._textureInfo = null;
	};
	
	/*public*/
	d.endFill = function ()/*void*/
	{
		this._textureInfo = null;
		
		this._path = null;
		this._data.push(new flash.display.GraphicsEndFill());
		this._needsRender = true;
	};
	
	/*public*/
	d.lineGradientStyle = function (type/*String*/, colors/*Array*/, alphas/*Array*/, ratios/*Array*/, matrix/*Matrix*/, spreadMethod/*String*/, interpolationMethod/*String*/, focalPointRatio/*Number*/)/*void*/
	{
		if (matrix == undefined) matrix = null;
		if (spreadMethod == undefined) spreadMethod = "pad";
		if (interpolationMethod == undefined) interpolationMethod = "rgb";
		if (focalPointRatio == undefined) focalPointRatio = 0;
		this._textureInfo = null;
	};
	
	/*public*/
	d.lineStyle = function (thickness/*Number*/, color/*uint*/, alpha/*Number*/, pixelHinting/*Boolean*/, scaleMode/*String*/, caps/*String*/, joints/*String*/, miterLimit/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (thickness == undefined) thickness = 0;
		if (color == undefined) color = 0;
		color = /*uint*/Math.floor(color);
		if (alpha == undefined) alpha = 1;
		if (pixelHinting == undefined) pixelHinting = false;
		if (scaleMode == undefined) scaleMode = "normal";
		if (caps == undefined) caps = null;
		if (joints == undefined) joints = null;
		if (miterLimit == undefined) miterLimit = 3;
		
		
		var lineStyle = new flash.display.GraphicsStroke(thickness, pixelHinting, scaleMode, caps, joints, miterLimit, color);
		
		if (lineStyle.thickness > this._maxThickness)
		{
			
			this._maxThickness = lineStyle.thickness;
			
		}
		
		if (this.path != null)
		{
			
			this._path.lineStyle = lineStyle;
			
		}
		
		this._lineStyle = lineStyle;
		
	};
	
	/*public*/
	d.lineTo = function (x/*Number*/, y/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (this._path != null)
		{
			this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
			this._path.data.push(x, y);
			this._needsRender = true;
		}
		
	};
	
	/*public*/
	d.moveTo = function (x/*Number*/, y/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (this._path != null)
		{
			this._path.commands.push(flash.display.GraphicsPathCommand.MOVE_TO);
			this._path.data.push(x, y);
			this._needsRender = true;
		}
		else
		{
			this._path = new flash.display.GraphicsPath();
			this._path.lineStyle = this._lineStyle;
			this._data.push(this._path);
			this._path.commands.push(flash.display.GraphicsPathCommand.MOVE_TO);
			this._path.data.push(x, y);
		}
	};
	
	d._getBitmapData = function ()
	{
		if (this._textureInfo)
		{
			return this._textureInfo.bitmap;
		}
		else
		{
			this._renderData();
			
			return this._bitmapData;
		}
	};
	
	d._getMap = function ()
	{
		if (this._textureInfo)
		{
			return this._textureInfo.map;
		}
		else
		{
			return this._textureRect;
		}
	};
	
	d._getBoundingBox = function ()
	{
		if (this._data.length)
		{
			var xMax = -Number.MAX_VALUE;
			var yMax = -Number.MAX_VALUE;
			
			var xMin = Number.MAX_VALUE;
			var yMin = Number.MAX_VALUE;
			
			var thickness = 0;
			
			for (var i = 0; i < this._data.length; i++)
			{
				var item = this._data[ i ];
				
				if (item.lineStyle && thickness < item.lineStyle.thickness)
				{
					thickness = item.lineStyle.thickness;
				}
				
				if (item.data)
				{
					var coords = item.data;
					
					for (var j = 0; j < coords.length; j += 2)
					{
						var x = coords[ j ];
						var y = coords[ j + 1 ];
						
						if (x < xMin) xMin = x;
						if (x > xMax) xMax = x;
						if (y < yMin) yMin = y;
						if (y > yMax) yMax = y;
					}
				}
			}
			
			if (xMax != -Number.MAX_VALUE && yMax != -Number.MAX_VALUE &&
				xMin != Number.MAX_VALUE && yMin != Number.MAX_VALUE)
			{
				var width = xMax - xMin;
				var height = yMax - yMin;
				
				if (width != 0 || height != 0)
				{
					var bounds = new flash.geom.Rectangle(
						xMin,
						yMin,
						width,
						height
					);
					
					if (thickness) bounds.inflate(thickness, thickness);
					
					return bounds;
				}
			}
		}
		
		return null;
	}
	
	d._getDisplayBounds = function ()
	{
		if (this._textureInfo)
		{
			return this._textureInfo.bounds;
		}
		else
		{
			if (!this._canvasRect)
			{
				this._canvasRect = this._getBoundingBox();
			}
			
			return this._canvasRect;
		}
	};
	
	d._getBounds = function ()
	{
		if (this._textureInfo)
		{
			return this._textureInfo.realBounds;
		}
		else
		{
			if (!this._canvasRect)
			{
				this._canvasRect = this._getBoundingBox();
			}
			
			return this._canvasRect;
		}
	};
	
	d._checkTouch = function (x, y, displayObject)
	{
		var bounds = null;
		
		if (this._textureInfo)
		{
			bounds = this._textureInfo.bounds;
		}
		else
		{
			bounds = this._canvasRect;
		}
		
		if (bounds)
		{
			this._checkTouch_point.x = x;
			this._checkTouch_point.y = y;
			
			this._checkTouch_point = displayObject.globalToLocal(this._checkTouch_point);
			
			if (bounds.containsPoint(this._checkTouch_point))
			{
				if (this._textureInfo)
				{
					var map = this._textureInfo.map;
					
					var bitmapX = Math.floor(map.x + (this._checkTouch_point.x - bounds.x) / bounds.width * map.width);
					var bitmapY = Math.floor(map.y + (this._checkTouch_point.y - bounds.y) / bounds.height * map.height);
					
					//var textureData = this._textureInfo.bitmap._getData();
					
					//var index = (bitmapX + bitmapY * this._textureInfo.bitmap.get_width()) * 4 + 3;
					
					var color = this._textureInfo.bitmap.getPixel32(bitmapX, bitmapY);
					
					this._checkTouch_pix = (color >> 24) & 0xff;//textureData.data[index];
				}
				else if (this._bitmapData)
				{
					//var textureData = this._bitmapData._getData();
					
					var bitmapX = Math.floor(this._checkTouch_point.x - bounds.x);
					var bitmapY = Math.floor(this._checkTouch_point.y - bounds.y);
					
					//var index = (bitmapX + bitmapY * this._bitmapData.get_width()) * 4 + 3;
					
					//this._checkTouch_pix = textureData.data[index];
					
					var color = this._bitmapData.getPixel32(bitmapX, bitmapY);
					
					this._checkTouch_pix = (color >> 24) & 0xff;//textureData.data[index];
				}
				
				if (this._checkTouch_pix)
				{
					return this._checkTouch_point;
				}
				else
				{
					return null;
				}
			}
			
			return null;
		}
		
		return null;
	}
	
	d._getColorTransfomedData = function (transform)
	{
		if (!this._cTransformedvirtualcanvas)
		{
			this._cTransformedvirtualcanvas = document.createElement('canvas');
			this._cTransformedcontext2d = this._cTransformedvirtualcanvas.getContext('2d');
			this._cTransformedvirtualcanvas.width = this._canvasRect.width;
			this._cTransformedvirtualcanvas.height = this._canvasRect.height;
			this._colorTransfomedImgData = this._cTransformedcontext2d.createImageData(_canvasRect.width, _canvasRect.height);
		}
		
		if (this._colorTransfomedData[ 0 ] == transform[ 0 ] &
			this._colorTransfomedData[ 1 ] == transform[ 1 ] &
			this._colorTransfomedData[ 2 ] == transform[ 2 ] &
			this._colorTransfomedData[ 3 ] == transform[ 4 ] &
			this._colorTransfomedData[ 4 ] == transform[ 5 ] &
			this._colorTransfomedData[ 5 ] == transform[ 6 ]
		)
		{
			
			return this._cTransformedvirtualcanvas;
		}
		else
		{
			
			
			if (this._colorTransfomedImgData.width != this._canvasRect.width || this._colorTransfomedImgData.height != this._canvasRect.height)
			{
				this._cTransformedcontext2d.width = this._canvasRect.width;
				this._cTransformedcontext2d.height = this._canvasRect.height;
				this._colorTransfomedImgData = this._cTransformedcontext2d.createImageData(this._canvasRect.width, this._canvasRect.height);
				
			}
			else
			{
				this._cTransformedcontext2d.clearRect(0, 0, this._canvasRect.width, this._canvasRect.height);
			}
			
			this._colorTransfomedImgData.data.set(this._canvasImageData);
			
			this._colorTransfomedData = [ transform[ 0 ], transform[ 1 ], transform[ 2 ], transform[ 4 ], transform[ 5 ], transform[ 6 ] ];
			
			var colorTransfomedImgDataData = this._colorTransfomedImgData.data;
			
			for (var i = 0; i < _colorTransfomedImgData.data.length; i += 4)
			{
				colorTransfomedImgDataData[ i ] = (colorTransfomedImgDataData[ i ] * this._colorTransfomedData[ 0 ]) + this._colorTransfomedData[ 3 ];
				colorTransfomedImgDataData[ i + 1 ] = (colorTransfomedImgDataData[ i + 1 ] * this._colorTransfomedData[ 1 ]) + this._colorTransfomedData[ 4 ];
				colorTransfomedImgDataData[ i + 2 ] = (colorTransfomedImgDataData[ i + 2 ] * this._colorTransfomedData[ 2 ]) + this._colorTransfomedData[ 5 ];
			}
			
			this._cTransformedcontext2d.putImageData(this._colorTransfomedImgData, 0, 0);
			return this._cTransformedvirtualcanvas;
		}
		
		
	}
	
	flash.addDescription("flash.display.Graphics", d, null, null, null);
	
}
());
