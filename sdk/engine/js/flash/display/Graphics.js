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
	
	d._maxThickness = 0;
	
	d._checkTouch_point = null;
	d._checkTouch_matrix = null;
	d._checkTouch_pix = 0;
	
	d._scaleCorrection = 1;
	
	d._textureInfo = null;
	
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
			this._needsRender = false;
			
			this._canvasRect = this._getBoundingBox();
			
			if (this._canvasRect != null)
			{
				var scale = this._scaleCorrection;
				
				var textureWidth = flash.getTextureSize(this._canvasRect.width * scale);
				var textureHeight = flash.getTextureSize(this._canvasRect.height * scale);
				
				if (!this._bitmapData)
				{
					this._bitmapData = new flash.display.BitmapData(textureWidth, textureHeight, true, 0);
				}
				else
				{
					this._bitmapData._setSize(textureWidth, textureHeight);
				}
				
				this._textureRect = this._canvasRect.clone();
				this._textureRect.x = 0;
				this._textureRect.y = 0;
				this._textureRect.width *= scale;
				this._textureRect.height *= scale;
				
				var context = this._bitmapData._context2d;
				
				var xShift = -this._canvasRect.x;
				var yShift = -this._canvasRect.y;
				
				var stroke = null;
				var solidFill = null;
				var gradientFill = null;
				var bitmapFill = null;
				
				for (var i = 0; i < this._data.length; i++)
				{
					var item = this._data[ i ];
					
					if (item instanceof flash.display.GraphicsStroke)
					{
						stroke = item;
					}
					else if (item instanceof flash.display.GraphicsSolidFill)
					{
						solidFill = item;
					}
					else if (item instanceof flash.display.GraphicsGradientFill)
					{
						gradientFill = item;
					}
					else if (item instanceof flash.display.GraphicsBitmapFill)
					{
						bitmapFill = item;
					}
					else if (item instanceof flash.display.GraphicsEndFill)
					{
						solidFill = null;
						gradientFill = null;
						bitmapFill = null;
						;
					}
					else if (item instanceof flash.display.GraphicsPath)
					{
						context.setTransform(scale, 0, 0, scale, 0, 0);
						context.beginPath();
						
						var index = 0;
						
						var currentData = item.data;
						
						var fillEnabled = solidFill || gradientFill || bitmapFill;
						
						var move = null;
						
						for (var j = 0; j < item.commands.length; j++)
						{
							var command = item.commands[ j ];
							
							switch (command)
							{
								case flash.display.GraphicsPathCommand.MOVE_TO:
									if (fillEnabled && move)
									{
										context.lineTo(
											move.x,
											move.y
										);
									}
									
									move = {
										x: currentData[ index++ ] + xShift,
										y: currentData[ index++ ] + yShift
									};
									
									context.moveTo(
										move.x,
										move.y
									);
									break;
								
								case flash.display.GraphicsPathCommand.LINE_TO:
									context.lineTo(
										currentData[ index++ ] + xShift,
										currentData[ index++ ] + yShift
									);
									break;
								
								case flash.display.GraphicsPathCommand.CURVE_TO:
									context.quadraticCurveTo(
										currentData[ index++ ] + xShift,
										currentData[ index++ ] + yShift,
										currentData[ index++ ] + xShift,
										currentData[ index++ ] + yShift
									);
									break;
								
								case flash.display.GraphicsPathCommand.WIDE_MOVE_TO:
									context.moveTo(
										currentData[ index++ ] + xShift,
										currentData[ index++ ] + yShift
									);
									break;
								
								case flash.display.GraphicsPathCommand.WIDE_LINE_TO:
									context.lineTo(
										currentData[ index++ ] + xShift,
										currentData[ index++ ] + yShift
									);
									break;
								
								case flash.display.GraphicsPathCommand.CUBIC_CURVE_TO:
									context.bezierCurveTo(
										currentData[ index++ ] + xShift,
										currentData[ index++ ] + yShift,
										currentData[ index++ ] + xShift,
										currentData[ index++ ] + yShift,
										currentData[ index++ ] + xShift,
										currentData[ index++ ] + yShift
									);
									break;
							}
						}
						
						if (fillEnabled && move)
						{
							context.lineTo(
								move.x,
								move.y
							);
						}
						
						if (solidFill)
						{
							context.globalAlpha = solidFill.alpha;
							context.fillStyle = flash.numberToHex(solidFill.color);
							context.fill();
						}
						else if (gradientFill)
						{
						
						}
						else if (bitmapFill)
						{
							context.save();
							
							context.setTransform(
								bitmapFill.matrix.a * scale,
								bitmapFill.matrix.b * scale,
								bitmapFill.matrix.c * scale,
								bitmapFill.matrix.d * scale,
								bitmapFill.matrix.tx * scale - xShift * scale,
								bitmapFill.matrix.ty * scale - yShift * scale
							);
							
							context.fillStyle = context.createPattern(
								bitmapFill.bitmapData._virtualcanvas,
								bitmapFill.repeat ? "repeat" : "no-repeat"
							);
							
							context.fill();
							
							context.restore();
						}
						
						if (stroke && stroke.thickness)
						{
							context.globalAlpha = stroke.fill.alpha;
							context.lineWidth = stroke.thickness;
							context.strokeStyle = flash.numberToHex(stroke.fill.color);
							context.lineCap = stroke.get_caps();
							context.lineJoin = stroke.get_joints();
							context.stroke();
						}
					}
				}
			}
		}
	};
	
	d.copyFrom = function (sourceGraphics)
	{
		this._textureInfo = null;
		
		var sourceData = source._data;
		
		for (var i = 0; i < sourceData.length; i++)
		{
			this._data.push(sourceData[ i ].clone());
		}
	}
	
	d.beginBitmapFill = function (bitmap/*BitmapData*/, matrix/*Matrix*/, repeat/*Boolean*/, smooth/*Boolean*/)/*void*/
	{
		this._textureInfo = null;
		
		if (matrix == undefined) matrix = new flash.geom.Matrix();
		if (repeat == undefined) repeat = true;
		if (smooth == undefined) smooth = false;
		
		if (bitmap)
		{
			this._data.push(new flash.display.GraphicsBitmapFill(bitmap, matrix, repeat, smooth));
			this._needsRender = true;
		}
	};
	
	d.beginFill = function (color/*uint*/, alpha/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (color == undefined) color = 0x000000;
		if (alpha == undefined) alpha = 1;
		
		this._data.push(new flash.display.GraphicsSolidFill(color, alpha));
		this._needsRender = true;
	};
	
	d.beginGradientFill = function (type/*String*/, colors/*Array*/, alphas/*Array*/, ratios/*Array*/, matrix/*Matrix*/, spreadMethod/*String*/, interpolationMethod/*String*/, focalPointRatio/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (matrix == undefined) matrix = null;
		if (spreadMethod == undefined) spreadMethod = "pad";
		if (interpolationMethod == undefined) interpolationMethod = "rgb";
		if (focalPointRatio == undefined) focalPointRatio = 0;
		
		//TODO: Implement Gradient Fill
	};
	
	d.clear = function ()/*void*/
	{
		this._textureInfo = null;
		this._path = null;
		this._data = [];
		this._needsRender = true;
	};
	
	d.curveTo = function (controlX/*Number*/,
	                      controlY/*Number*/,
	                      anchorX/*Number*/,
	                      anchorY/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		this._createPath();
		
		this._path.commands.push(flash.display.GraphicsPathCommand.CURVE_TO);
		this._path.data.push(controlX, controlY, anchorX, anchorY);
		
		this._needsRender = true;
	};
	
	d.cubicCurveTo = function (controlX1/*Number*/,
	                           controlY1/*Number*/,
	                           controlX2/*Number*/,
	                           controlY2/*Number*/,
	                           anchorX/*Number*/,
	                           anchorY/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		this._createPath();
		
		this._path.commands.push(flash.display.GraphicsPathCommand.CUBIC_CURVE_TO);
		this._path.data.push(controlX1, controlY1, controlX2, controlY2, anchorX, anchorY);
		
		this._needsRender = true;
	};
	
	d.drawCircle = function (x/*Number*/, y/*Number*/, radius/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		var size = radius * 2;
		
		this.drawEllipse(x - radius, y - radius, size, size);
	};
	
	d.drawEllipse = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		var k = .5522848;
		var ox = (width / 2) * k;
		var oy = (height / 2) * k;
		var xe = x + width;
		var ye = y + height;
		var xm = x + width / 2;
		var ym = y + height / 2;
		
		this._createPath(true);
		
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
	};
	
	d.drawRect = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		this._createPath(true);
		
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
	
	d.drawRoundRect = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/, ellipseWidth/*Number*/, ellipseHeight/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (ellipseWidth == undefined) ellipseWidth = 0;
		if (ellipseHeight == undefined) ellipseHeight = ellipseWidth;
		
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
		
		this._createPath(true);
		
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
	};
	
	d.drawRoundRectComplex = function (x/*Number*/, y/*Number*/, width/*Number*/, height/*Number*/, topLeftRadius/*Number*/, topRightRadius/*Number*/, bottomLeftRadius/*Number*/, bottomRightRadius/*Number*/)/*void*/
	{
		// TODO: Implement this method
		
		this.drawRoundRect(x, y, width, height, topLeftRadius, bottomRightRadius);
	};
	
	d.endFill = function ()/*void*/
	{
		this._textureInfo = null;
		
		this._path = null;
		
		this._data.push(new flash.display.GraphicsEndFill());
		
		this._needsRender = true;
	};
	
	d.lineGradientStyle = function (type/*String*/, colors/*Array*/, alphas/*Array*/, ratios/*Array*/, matrix/*Matrix*/, spreadMethod/*String*/, interpolationMethod/*String*/, focalPointRatio/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (matrix == undefined) matrix = null;
		if (spreadMethod == undefined) spreadMethod = "pad";
		if (interpolationMethod == undefined) interpolationMethod = "rgb";
		if (focalPointRatio == undefined) focalPointRatio = 0;
		
		// TODO: Implement this method
	};
	
	d.lineStyle = function (thickness/*Number*/, color/*uint*/, alpha/*Number*/, pixelHinting/*Boolean*/, scaleMode/*String*/, caps/*String*/, joints/*String*/, miterLimit/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		if (thickness == undefined) thickness = 0;
		if (color == undefined) color = 0;
		if (alpha == undefined) alpha = 1;
		if (pixelHinting == undefined) pixelHinting = false;
		if (scaleMode == undefined) scaleMode = "normal";
		if (caps == undefined) caps = flash.display.CapsStyle.ROUND;
		if (joints == undefined) joints = flash.display.JointStyle.ROUND;
		if (miterLimit == undefined) miterLimit = 3;
		
		color = /*uint*/Math.floor(color);
		
		var fill = new flash.display.GraphicsSolidFill(color, alpha);
		
		var stroke = new flash.display.GraphicsStroke(
			thickness,
			pixelHinting,
			scaleMode,
			caps,
			joints,
			miterLimit,
			fill
		);
		
		if (this._maxThickness < stroke.thickness)
		{
			this._maxThickness = stroke.thickness;
		}
		
		this._data.push(stroke);
		
		this._needsRender = true;
	};
	
	d.lineTo = function (x/*Number*/, y/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		this._createPath();
		
		this._path.commands.push(flash.display.GraphicsPathCommand.LINE_TO);
		this._path.data.push(x, y);
		
		this._needsRender = true;
	};
	
	d._createPath = function (clear)
	{
		if (clear || !this._path)
		{
			this._path = new flash.display.GraphicsPath();
			this._data.push(this._path);
		}
	};
	
	d.moveTo = function (x/*Number*/, y/*Number*/)/*void*/
	{
		this._textureInfo = null;
		
		this._createPath();
		
		this._path.commands.push(flash.display.GraphicsPathCommand.MOVE_TO);
		this._path.data.push(x, y);
		
		this._needsRender = true;
	};
	
	d._getBitmapData = function (scaleCorrection)
	{
		if (this._scaleCorrection != scaleCorrection)
		{
			this._scaleCorrection = scaleCorrection;
			
			this._needsRender = true;
		}
		
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
			
			for (var i = 0; i < this._data.length; i++)
			{
				var item = this._data[ i ];
				
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
					
					if (this._maxThickness)
					{
						bounds.inflate(this._maxThickness, this._maxThickness);
					}
					
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
					
					var color = this._textureInfo.bitmap.getPixel32(bitmapX, bitmapY);
					
					this._checkTouch_pix = (color >> 24) & 0xff;//textureData.data[index];
				}
				else if (this._bitmapData)
				{
					var scale = this._scaleCorrection;
					
					var bitmapX = Math.floor((this._checkTouch_point.x - bounds.x) * scale);
					var bitmapY = Math.floor((this._checkTouch_point.y - bounds.y) * scale);
					
					var color = this._bitmapData.getPixel32(bitmapX, bitmapY);
					
					this._checkTouch_pix = (color >> 24) & 0xff;
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
	
	flash.addDescription("flash.display.Graphics", d, null, null, null);
	
}
());
