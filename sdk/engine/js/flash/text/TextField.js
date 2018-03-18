/*class flash.text.TextField*/
/*
import flash.display.*;
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._textureInfo = null;
	
	d._alwaysShowSelection = false;
	d._antiAliasType = "";
	d._autoSize = "";
	d._background = false;
	d._backgroundColor = 0;
	d._border = false;
	d._borderColor = 0;
	d._condenseWhite = false;
	d._displayAsPassword = false;
	
	d._embedFonts = false;
	
	d._gridFitType = "";
	d._htmlText = '';
	d._maxChars = 0;
	d._mouseWheelEnabled = true;
	
	d._restrict = null;
	d._scrollH = 0;
	d._scrollV = 1;
	d._selectable = true;
	d._sharpness = 0;
	d._styleSheet = null;
	
	d._textColor = 0;
	
	d._thickness = 0;
	d._type = null;
	d._useRichTextClipboard = false;
	d._wordWrap = false;
	
	d._defaultTextFormat = null;
	d._multiline = false;
	d._bottomScrollV = 1;
	
	d._maxScrollH = 0;
	d._maxScrollV = 0;
	
	d._selectionBeginIndex = -1;
	d._selectionEndIndex = -1;
	
	d._caretIndex = 0;
	d._text = '';
	
	d._bitmapData = null;
	
	d._textFormats = null;
	d._formatedtext = null;
	
	d._dataUpdated = false;
	d._canvasUpdated = false;
	
	d._textureRect = null;
	d._bounds = null;
	d._realBounds = null;
	
	d._scaleCorrection = 1;
	
	d._textWidth = 0;
	d._textHeight = 0;
	
	d._checkTouch_matrix = null;
	d._checkTouch_point = null;
	
	d._input = null;
	
	d._linesMetrics = null;
	d._lines = null;
	
	d._checkInteractiveEvent = function (data)
	{
		var bounds;
		
		if (this._autoSize == flash.text.TextFieldAutoSize.NONE)
		{
			bounds = this._bounds;
		}
		else
		{
			bounds = this._bounds.clone();
			
			bounds.width = this.get_width();
			bounds.height = this.get_height();
		}
		
		this._checkTouch_point.x = data.localX;
		this._checkTouch_point.y = data.localY;
		
		this._checkTouch_point = this.globalToLocal(this._checkTouch_point);
		
		if (bounds.containsPoint(this._checkTouch_point))
		{
			return this._checkTouch_point;
		}
		
		return null;
	};
	
	d.get_displayAsPassword = function ()
	{
		return this._displayAsPassword;
	}
	
	d.set_displayAsPassword = function (value)
	{
		this._displayAsPassword = value;
		
		return value;
	}
	
	d.get_autoSize = function ()
	{
		return this._autoSize;
	}
	
	d.set_autoSize = function (value)
	{
		if (this._autoSize == value) return;
		
		this._autoSize = value;
		
		this._updateData(true);
		
		return value;
	}
	
	d.get_border = function ()
	{
		return this._border;
	}
	
	d.set_border = function (value)
	{
		if (this._border == value) return;
		
		this._border = value;
		
		this._canvasUpdated = false;
		
		return value;
	}
	
	d.get_borderColor = function ()
	{
		return this._borderColor;
	}
	
	d.set_borderColor = function (value)
	{
		if (this._borderColor == value) return;
		
		this._borderColor = value;
		
		this._canvasUpdated = false;
		
		return value;
	}
	
	d.get_background = function ()
	{
		return this._background;
	}
	
	d.set_background = function (value)
	{
		if (this._background == value) return;
		
		this._background = value;
		
		this._canvasUpdated = false;
		
		return value;
	}
	
	d.get_backgroundColor = function ()
	{
		return this._backgroundColor;
	}
	
	d.set_backgroundColor = function (value)
	{
		if (this._backgroundColor == value) return;
		
		this._backgroundColor = value;
		
		this._canvasUpdated = false;
		
		return value;
	}
	
	d.get_gridFitType = function ()
	{
		return this._gridFitType;
	}
	
	d.set_gridFitType = function (value)
	{
		this._gridFitType = value;
		
		return value;
	}
	
	d.get_embedFonts = function ()
	{
		return this._embedFonts;
	}
	
	d.set_embedFonts = function (value)
	{
		this._embedFonts = true;
		
		return value;
	}
	
	d.get_antiAliasType = function ()
	{
		return this._antiAliasType;
	}
	
	d.set_antiAliasType = function (value)
	{
		this._antiAliasType = value;
		return value;
	}
	
	d.get_restrict = function ()/*String*/
	{
		return this._restrict;
	};
	
	d.set_restrict = function (value/*String*/)/*void*/
	{
		this._restrict = value;
	}
	
	d.get_text = function ()/*String*/
	{
		return this._text;
	};
	
	d.set_text = function (value/*String*/)/*void*/
	{
		if (value == null || value == undefined)
		{
			throw new Error("Error #2007: Parameter text must be non-null.");
		}
		
		value = String(value);
		
		this._clear();
		
		this.appendText(value);
		
		if (this._input && this._input.value != value)
		{
			this._input.value = value;
		}
	};
	
	d.get_multiline = function ()
	{
		return this._multiline;
	};
	
	d.set_multiline = function (value)
	{
		if (this._multiline == value) return;
		
		this._updateData(true);
		
		this._multiline = value;
	};
	
	d.get_caretIndex = function ()/*int*/
	{
		return 0;
	};
	
	d.get_bottomScrollV = function ()/*int*/
	{
		return 0;
	};
	
	d.get_defaultTextFormat = function ()/*TextFormat*/
	{
		return this._defaultTextFormat.clone();
	};
	
	d.set_defaultTextFormat = function (format/*TextFormat*/)/*void*/
	{
		if (format) format = format.clone();
		
		this._textColor = format._color;
		
		if (this.styleSheet == null)
		{
			this._defaultTextFormat = format;
		}
		else
		{
			console.error("This method cannot be used on a text field with a style sheet.");
		}
		
		this._updateData(true);
	};
	
	d.get_length = function ()/*int*/
	{
		return this._text.length;
	};
	
	
	d.get_maxScrollH = function ()/*int*/
	{
		return 0;
	};
	
	d.get_maxScrollV = function ()/*int*/
	{
		var lineHeight = this._getLineHeight();
		
		var lines = Math.ceil(lineHeight > 0 ? this._bounds.height / lineHeight : this.get_numLines());
		
		var value = this.get_numLines() - lines;
		
		return (value > 0 ? value + 2 : 1);
	};
	
	d.get_numLines = function ()/*int*/
	{
		return this._lines.length;
	};
	
	d.get_scrollH = function ()/*int*/
	{
		return 0;
	};
	
	d.set_scrollH = function (value/*int*/)/*void*/
	{
		return 0;
	};
	
	d.get_scrollV = function ()/*int*/
	{
		return this._scrollV;
	};
	
	d.set_scrollV = function (value/*int*/)/*void*/
	{
		if (value < 1)
		{
			value = 1;
		}
		else if (value > this.get_maxScrollV())
		{
			value = this.get_maxScrollV();
		}
		
		if (this._scrollV == value) return;
		
		this._scrollV = value;
		
		this._canvasUpdated = false;
	};
	
	d.get_selectable = function ()/*Boolean*/
	{
		return this._selectable;
	};
	
	d.set_selectable = function (value/*Boolean*/)/*void*/
	{
		this._selectable = value;
	};
	
	d.get_selectedText = function ()/*String*/
	{
		if (this._selectionBeginIndex != -1 && this._selectionEndIndex != -1)
		{
			return this._text.substring(this._selectionBeginIndex, this._selectionEndIndex);
		}
		
		return null;
	};
	
	d.get_selectionBeginIndex = function ()/*int*/
	{
		return this._selectionBeginIndex;
	};
	
	d.set_selectionBeginIndex = function (value/*int*/)/*void*/
	{
		this._selectionBeginIndex = value;
		
		return this._selectionBeginIndex;
	};
	
	d.get_selectionEndIndex = function ()/*int*/
	{
		return this._selectionEndIndex;
	};
	
	d.set_selectionEndIndex = function (value/*int*/)/*void*/
	{
		this._selectionEndIndex = value;
		
		return this._selectionEndIndex;
	};
	
	d.get_textColor = function ()/*uint*/
	{
		return this._textColor;
	};
	
	d.set_textColor = function (value/*uint*/)/*void*/
	{
		this._textColor = value;
		
		for (var i in this._textFormats)
		{
			this._textFormats[ i ].set_color(value);
		}
		
		this._canvasUpdated = false;
	};
	
	d.get_textHeight = function ()/*Number*/
	{
		return this._textHeight;
	};
	
	d.get_textWidth = function ()/*Number*/
	{
		return this._textWidth;
	};
	
	d.get_thickness = function ()/*Number*/
	{
		return this._thickness;
	};
	
	d.set_thickness = function (value/*Number*/)/*void*/
	{
		this._thickness = value;
		
		return this._thickness;
	};
	
	d.get_type = function ()/*String*/
	{
		return this._type;
	};
	
	d.set_type = function (value/*String*/)/*void*/
	{
		this._type = value;
		
		return this._type;
	};
	
	d.get_useRichTextClipboard = function ()/*Boolean*/
	{
		return this._useRichTextClipboard;
	};
	
	d.set_useRichTextClipboard = function (value/*Boolean*/)/*void*/
	{
		this._useRichTextClipboard = value;
		
		return this._useRichTextClipboard;
	};
	
	d.get_wordWrap = function ()/*Boolean*/
	{
		return this._wordWrap;
	};
	
	d.set_wordWrap = function (value/*Boolean*/)/*void*/
	{
		if (this._wordWrap == value) return;
		
		this._wordWrap = value;
		
		this._updateData(true);
		
		return this._wordWrap;
	};
	
	d.get_width = function ()
	{
		return this._textureRect.width / this._scaleCorrection;
	}
	
	d.get_height = function ()
	{
		return this._textureRect.height / this._scaleCorrection;
	}
	
	d.set_width = function (value)
	{
		if (value)
		{
			this._bounds.width = value;
		}
		
		this._updateData(true);
		
		return this.get_width();
	}
	
	d.set_height = function (value)
	{
		if (value)
		{
			this._bounds.height = value;
		}
		
		this._updateData(true);
		
		return this.get_height();
	}
	
	d.TextField = function ()
	{
		this.InteractiveObject_constructor();
		
		this._checkTouch_point = new flash.geom.Point();
		this._checkTouch_matrix = new flash.geom.Matrix();
		this._antiAliasType = flash.text.AntiAliasType.NORMAL;
		this._autoSize = flash.text.TextFieldAutoSize.NONE;
		this._type = flash.text.TextFieldType.DYNAMIC;
		this._backgroundColor = 0xFFFFFF;
		this._gridFitType = flash.text.GridFitType.PIXEL;
		this._defaultTextFormat = new flash.text.TextFormat("Times New Roman", 12, 0x000000, false, false, false, "", "", "left", 0, 0, 0, 0);
		
		this._textureRect = new flash.geom.Rectangle(0, 0, 100, 100);
		this._bounds = new flash.geom.Rectangle(0, 0, 100, 100);
		this._realBounds = new flash.geom.Rectangle(0, 0, 100, 100);
		
		this._linesMetrics = [];
		this._lines = [];
		
		this._clear();
	};
	
	d._clear = function ()
	{
		this._text = "";
		this._formatedtext = [];
	}
	
	d._render_ = function (render)/*Boolean*/
	{
		this.__updateTransform__();
		
		var matrix = this._transform._concatenatedMatrix;
		
		if (this._type == flash.text.TextFieldType.DYNAMIC)
		{
			this._updateData();
			this._updateCanvas();
			
			render.drawBitmapData(
				this._bitmapData,
				this._textureRect,
				this._realBounds,
				matrix,
				this._transform._concatenatedColorTransform,
				this._blendMode,
				this._concatenatedFilters,
				true
			);
		}
		else if (this._type == flash.text.TextFieldType.INPUT)
		{
			this._upateInput(matrix);
		}
	};
	
	d._getLineHeight = function ()/*Number*/
	{
		return this._linesMetrics && this._linesMetrics.length ? this._linesMetrics[ 0 ].height : 0;
	}
	
	d._upateInput = function (matrix/*Matrix*/)/*void*/
	{
		var stage = this.get_stage();
		
		if (!stage) return;
		
		if (!this._input)
		{
			this._input = document.createElement("input");
			this._input.type = this._displayAsPassword ? "password" : "text";
			this._input.value = this.get_text();
			this._input.style.position = "absolute";
			this._input.style.border = "none";
			this._input.style.borderWidth = "0px";
			this._input.style.outline = "none";
			this._input.style.direction = this._defaultTextFormat.get_align() == "right" ? "rtl" : "ltr";
			
			if (flash.getInternetExplorerVersion() == -1)
			{
				this._input.style.background = "none";
			}
			
			var that = this;
			
			this._input.onfocus = function (e)
			{
				that.dispatchEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_IN));
			}
			
			this._input.onblur = function (e)
			{
				that.dispatchEvent(new flash.events.FocusEvent(flash.events.FocusEvent.FOCUS_OUT));
				
				flash.minimize();
				
				that.setSelection(-1, -1);
			}
			
			this._input.onclick = function (e)
			{
				that.dispatchEvent(new flash.events.MouseEvent(flash.events.MouseEvent.CLICK, true, false, 0, 0, that));
			}
			
			this._input.onmousedown = function (e)
			{
				that.dispatchEvent(new flash.events.MouseEvent(flash.events.MouseEvent.MOUSE_DOWN, true, false, 0, 0, that));
			}
			
			this._input.onmouseup = function (e)
			{
				that.dispatchEvent(new flash.events.MouseEvent(flash.events.MouseEvent.MOUSE_UP, true, false, 0, 0, that));
			}
			
			this._input.onkeydown = function (e)
			{
				that.setSelection(-1, -1);
				
				that.dispatchEvent(new flash.events.KeyboardEvent(flash.events.KeyboardEvent.KEY_DOWN, true, false, e.charCode, e.keyCode));
			}
			
			this._input.onkeyup = function (e)
			{
				that.dispatchEvent(new flash.events.KeyboardEvent(flash.events.KeyboardEvent.KEY_UP, true, false, e.charCode, e.keyCode));
			}
		}
		
		if (this.get_visible())
		{
			var textFormat = this.get_defaultTextFormat();
			
			var stageMatrix = stage._render._baseMatrix;
			
			var ratio = 1 / flash.getPixelRation();
			
			var left = ratio * (stageMatrix.tx + stageMatrix.a * matrix.tx + this._bounds.x * stageMatrix.a * matrix.a);
			var top = ratio * (stageMatrix.ty + stageMatrix.d * matrix.ty + this._bounds.y * stageMatrix.d * matrix.d);
			var width = ratio * this._bounds.width * stageMatrix.a * matrix.a;
			var size = ratio * textFormat.get_size() * stageMatrix.a * matrix.a;
			
			this._setStyleProperty(this._input, "left", left + "px");
			this._setStyleProperty(this._input, "top", top + "px");
			this._setStyleProperty(this._input, "width", width + "px");
			this._setStyleProperty(this._input, "fontSize", size + "px");
			this._setStyleProperty(this._input, "fontFamily", textFormat.get_font());
			this._setStyleProperty(this._input, "textAlign", textFormat.get_align());
			this._setStyleProperty(this._input, "color", flash.numberToColor(textFormat.get_color()));
			
			if (this._input.value != this.get_text())
			{
				this._checkRestrict();
				
				this.set_text(this._input.value);
			}
			
			if (this._selectionBeginIndex != -1 && this._selectionEndIndex != -1)
			{
				this._input.setSelectionRange(this._selectionBeginIndex, this._selectionEndIndex);
			}
			
			flash.text.TextField.__addInput__(this._input);
		}
	}
	
	d._setStyleProperty = function (object, property, value)
	{
		if (object.style[ property ] != value)
		{
			object.style[ property ] = value;
		}
	};
	
	d._checkRestrict = function ()
	{
		if (this._input && this._restrict)
		{
			var source = this._input.value;
			var target = "";
			
			for (var i = 0; i < source.length; i++)
			{
				var c = source[ i ];
				
				if (this._restrict.indexOf(c) != -1)
				{
					target += c;
				}
			}
			
			this._input.value = target;
		}
	}
	
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
			this._dataUpdated = false;
		}
	}
	
	d._updateData = function (force)
	{
		this._checkScaleCorrection();
		
		if (force)
		{
			this._dataUpdated = false;
		}
		
		if (!this._dataUpdated)
		{
			this._dataUpdated = true;
			
			if (!this._formatedtext.length)
			{
				this._textureRect.width = this._bounds.width * this._scaleCorrection;
				this._textureRect.height = this._bounds.height * this._scaleCorrection;
				
				this._realBounds.x = this._bounds.x;
				this._realBounds.y = this._bounds.y;
				this._realBounds.width = this.get_width();
				this._realBounds.height = this.get_height();
				
				this._canvasUpdated = false;
				
				this._lines = [];
				
				return;
			}
			
			var formatedtext = this._getFormattedLetters(this._formatedtext);
			
			var w = this._bounds.width;
			var h = this._bounds.height;
			
			var lineIndex = 0;
			
			var i = formatedtext.length - 1;
			
			var lineWidth = 0;
			var lineHeight = 0;
			
			var text = "";
			
			var currentFormat = null;
			var currentDefineFont = null;
			
			var letters = [];
			var nextLetter = null;
			
			var color = 0;
			var size = 0;
			var fontName = '';
			var ascent = 0;
			var descent = 0;
			var leading = 0;
			var format = null;
			
			for (var i = 0; i < formatedtext.length; i++)
			{
				if (typeof formatedtext[ i ] == "string")
				{
					var letter = formatedtext[ i ];
					
					if (color != currentFormat._color)
					{
						color = currentFormat._color;
					}
					
					if (size != currentFormat._size)
					{
						size = currentFormat._size;
					}
					
					if (fontName != currentFormat._font && currentFormat._font != "")
					{
						fontName = currentFormat._font;
					}
					
					nextLetter = typeof formatedtext[ i + 1 ] == "string" ? formatedtext[ i + 1 ] : formatedtext[ i + 2 ];
					
					var advance = 0;
					var step = 0;
					
					if (currentDefineFont)
					{
						advance = currentDefineFont.getCharsAdvance(letter, nextLetter, fontName, size);
					}
					
					step = advance * size / 1024;
					
					letters.push({
						letter: letter,
						size: size,
						advance: step,
						color: color,
						fontName: fontName,
						ascent: ascent * size,
						descent: descent * size,
						leading: leading,
						format: currentFormat
					});
					
				}
				else
				{
					currentFormat = formatedtext[ i ];
					currentDefineFont = currentFormat._definefont;
					
					if (!currentDefineFont)
					{
						var findedFont = flash.system.ApplicationDomain.get_currentDomain()._getFont(currentFormat._font);
						
						if (findedFont)
						{
							currentDefineFont = findedFont._definefont;
						}
						
					}
					
					if (currentDefineFont)
					{
						ascent = (currentDefineFont.ascent) / 1024;
						descent = (currentDefineFont.descent) / 1024;
						leading = (currentDefineFont.leading) / 1024;
					}
				}
			}
			
			var lines = this._getLines(letters);
			
			if (this._wordWrap)
			{
				for (var i = 0; i < lines.length; i++)
				{
					lines[ i ] = this._getWords(lines[ i ][ 0 ]);
				}
				
				lines = this._wrapWords(lines);
			}
			
			var cw = 0;
			var ch = 0;
			
			var textBounds = this._getTextBounds(lines);
			
			var lineHeight = this._getLineHeight();
			
			if (this._autoSize == flash.text.TextFieldAutoSize.NONE)
			{
				cw = this._bounds.width;
				ch = this._bounds.height > lineHeight ? this._bounds.height : lineHeight;
			}
			else
			{
				cw = textBounds.width;
				ch = textBounds.height;
			}
			
			this._textureRect.width = Number(cw) * this._scaleCorrection;
			this._textureRect.height = Number(ch) * this._scaleCorrection;
			
			this._lines = lines;
			
			this._realBounds.x = this._bounds.x;
			this._realBounds.y = this._bounds.y;
			this._realBounds.width = this.get_width();
			this._realBounds.height = this.get_height();
			
			this._canvasUpdated = false;
		}
	};
	
	d._updateCanvas = function ()
	{
		if (!this._canvasUpdated)
		{
			this._canvasUpdated = true;
			
			var textureWidth = flash.getTextureSize(this._textureRect.width);
			var textureHeight = flash.getTextureSize(this._textureRect.height);
			
			if (!this._bitmapData)
			{
				this._bitmapData = new flash.display.BitmapData(textureWidth, textureHeight, true, 0);
			}
			else
			{
				this._bitmapData._setSize(textureWidth, textureHeight);
			}
			
			var context = this._bitmapData._context2d;
			
			//context.beginPath();
			//context.rect(0, 0, this._virtualcanvas.width -1, this._virtualcanvas.height - 1);
			//context.lineWidth = 2;
			//context.strokeStyle = 'black';
			//context.stroke();
			
			var scroll = this._scrollV - 1;
			
			for (var i = scroll; i < this._lines.length; i++)
			{
				this._renderLine(this._lines[ i ], i - scroll, context);
			}
		}
	}
	
	d._renderLine = function (line, index, context)
	{
		if (!line.length) return;
		
		var lineletters = [];
		var lineLength = line.length;
		var wordLength = 0;
		
		var wordI = 0;
		var charI = 0;
		
		var linesMetrics = this._linesMetrics;
		var lineMetrics = this._linesMetrics[ index ];
		
		line = this._correctRightToLeft(line);
		
		while (wordI < lineLength)
		{
			wordLength = line[ wordI ].length;
			charI = 0;
			
			while (charI < wordLength)
			{
				lineletters.push(line[ wordI ][ charI ]);
				charI++;
			}
			
			wordI++;
		}
		
		var x = 0;
		
		var space = 0;
		
		var lineletterslength = lineletters.length;
		var lineMetricswidth = lineMetrics.width;
		
		if (!lineletterslength) return;
		
		while (lineletters[ lineletterslength - 1 ].letter == " ")
		{
			lineMetricswidth -= lineletters[ lineletterslength - 1 ].advance;
			lineletterslength--;
		}
		
		if (this._autoSize == flash.text.TextFieldAutoSize.NONE)
		{
			if (lineletters[ 0 ].format._align == "right")
			{
				x = this._bounds.width - lineMetricswidth;
			}
			
			if (lineletters[ 0 ].format._align == "center")
			{
				x = (this._bounds.width - lineMetricswidth) / 2;
			}
			
			if (lineletters[ 0 ].format._align == "justify")
			{
				if (lineMetrics != linesMetrics[ linesMetrics.length - 1 ])
				{
					if (this._bounds.width * 0.8 < lineMetricswidth)
					{
						space = (this._bounds.width - lineMetricswidth) / lineletters.length;
						
					}
				}
			}
		}
		else
		{
			x = 0;
		}
		
		var y = 0;
		
		for (var i = 0; i < index; i++)
		{
			y += linesMetrics[ i ].height;
		}
		
		var charsCount = lineletters.length;
		var c = 0;
		var currentformat = null;
		var size = 0;
		var font = "";
		var color = 0;
		var letter = "";
		
		x = x * this._scaleCorrection;
		y = y * this._scaleCorrection;
		
		space = space * this._scaleCorrection;
		
		while (c < charsCount)
		{
			letter = lineletters[ c ];
			
			if (letter.fontName != font || letter.size != size || letter.color != color)
			{
				var size = letter.size * this._scaleCorrection;
				var font = letter.fontName;
				var color = letter.color;
				
				context.textBaseline = "top";
				context.font = flash.text.TextFormat._formatFont(font, size);
				context.fillStyle = flash.numberToHex(color);
			}
			
			context.fillText(letter.letter, x, y);
			
			x += letter.advance * this._scaleCorrection + space;
			
			c++;
		}
	}
	
	d._correctRightToLeft = function (source/*Array*/)
	{
		var blocks = [];
		
		var block;
		
		var rightWords = 0;
		
		for (var i in source)
		{
			var word = source[ i ];
			
			var rightToLeft = false;
			
			if (word.length)
			{
				var letter = word[ 0 ];
				var code = letter.letter.charCodeAt(0);
				
				if (code > 0x590 && code < 0x5FF)
				{
					word.reverse();
					
					while (word[ 0 ].letter == " ")
					{
						word.push(word.shift());
					}
					
					var last = word[ word.length - 1 ];
					
					if (last.letter != " ")
					{
						var space = {};
						
						for (var j in last)
						{
							space[ j ] = last[ j ];
						}
						
						space.letter = " ";
						
						word.push(space);
					}
					
					this._updateAdvancedInWord(word);
					
					rightWords++;
					
					rightToLeft = true;
				}
			}
			
			if (!block || block.rightToLeft != rightToLeft)
			{
				block = {words: [], rightToLeft: rightToLeft};
				blocks.push(block);
			}
			
			block.words.push(word);
		}
		
		if (rightWords)
		{
			blocks.reverse();
		}
		
		var target = [];
		
		for (i in blocks)
		{
			block = blocks[ i ];
			
			if (block.rightToLeft)
			{
				block.words.reverse();
			}
			
			for (var j in block.words)
			{
				word = block.words[ j ];
				target.push(word);
			}
		}
		
		return target;
	}
	
	d._updateAdvancedInWord = function (word)
	{
		for (var i = 0; i < word.length; i++)
		{
			var current = word[ i ];
			
			var font = current.format._definefont;
			
			var size = current.format._size;
			
			var j = i + 1;
			
			var next = j < word.length ? word[ j ] : null;
			
			current.advance = 0;
			
			if (next)
			{
				var pairs = font.kerningsPairs[ current.letter ];
				
				if (pairs)
				{
					current.advance = pairs[ next.letter ] ? pairs[ next.letter ] : 0;
				}
				else
				{
					current.advance = 0;
				}
				
				if (font.chars[ current.letter ])
				{
					current.advance = ((current.advance + font.chars[ current.letter ]) * size) / 1024;
				}
			}
			else
			{
				current.advance = (font.chars[ current.letter ] * size) / 1024;
			}
		}
	}
	
	d._calculateTextBounds = function ()
	{
		return new flash.geom.Rectangle(
			this._bounds.x,
			this._bounds.y,
			this.get_width(),
			this.get_height()
		);
	}
	
	d._getTextBounds = function (lines)
	{
		var width = 0;
		var height = 0;
		var textHeight = 0;
		
		var linesLength = lines.length;
		var lineLength = 0;
		var wordLength = 0;
		
		var line = [];
		var word = [];
		
		var lineWidth = 0;
		
		var biggestCharSize = 0;
		var lineHeight = 0;
		
		while (linesLength > 0)
		{
			linesLength--;
			
			line = lines[ linesLength ];
			
			lineLength = line.length;
			
			while (lineLength > 0)
			{
				lineLength--;
				
				word = line[ lineLength ];
				wordLength = word.length;
				
				while (wordLength > 0)
				{
					wordLength--;
					
					lineWidth += word[ wordLength ].advance;
					
					lineHeight = word[ wordLength ].ascent + word[ wordLength ].leading + word[ wordLength ].descent
					
					if (biggestCharSize < lineHeight)
					{
						biggestCharSize = lineHeight;
						
					}
				}
			}
			
			if (lineWidth > width)
			{
				width = new Number(lineWidth);
			}
			
			this._linesMetrics.push({height: biggestCharSize, width: lineWidth});
			
			height += biggestCharSize;
			
			lineWidth = 0;
		}
		
		this._linesMetrics.reverse()
		
		this._textWidth = width;
		this._textHeight = biggestCharSize;
		
		return {width: width, height: height};
	}
	
	d._getWordWidth = function (word)
	{
		var wl = word.length;
		var width = 0;
		
		while (wl)
		{
			wl--;
			width += word[ wl ].advance;
			
		}
		if (!width) width = 1;
		
		return width;
	}
	
	d._wrapWords = function (lines)
	{
		var wLines = [];
		
		var w = this._bounds.width;
		var h = this._bounds.heigth;
		
		var linesLength = lines.length;
		
		var line = [];
		var word = [];
		
		var textWidth = 0;
		var wordWidth = 0;
		var l = [];
		var lLength = 0;
		
		for (var i = 0; i < linesLength; i++)
		{
			textWidth = 0;
			wordWidth = 0;
			
			l = lines[ i ];
			lLength = l.length;
			
			var i1 = 0;
			
			while (i1 < lLength)
			{
				word = l[ i1 ];
				
				wordWidth = this._getWordWidth(word);
				
				if (textWidth + wordWidth <= w)
				{
					textWidth += wordWidth;
					line.push(word);
					i1++;
				}
				else
				{
					wLines.push(line);
					var line = [];
					
					if (wordWidth > this._bounds.width)
					{
						var splittedWord = [];
						
						var newWordWidth = 0;
						
						var splitIndex = word.length - 1;
						
						var newWordAdvance = 0;
						
						while (wordWidth > this._bounds.width)
						{
							wordWidth -= word[ splitIndex ].advance;
							
						}
						
						wLines.push([ word.splice(0, splitIndex) ])
						
					}
					
					textWidth = 0;
					
				}
				
				if (i1 == lLength)
				{
					wLines.push(line);
					var line = [];
					textWidth = 0;
				}
			}
		}
		
		return wLines;
	}
	
	d._getWords = function (line)
	{
		var word = null;
		var words = [];
		
		for (var i = 0; i < line.length; i++)
		{
			var letter = line[ i ];
			
			if (!word)
			{
				word = [];
				words.push(word);
			}
			
			word.push(letter);
			
			if (letter.letter == " ")
			{
				word = null;
			}
		}
		
		return words;
	}
	
	d._getLines = function (letters)
	{
		var lettersLength = letters.length;
		
		var lines = [];
		var line = [];
		
		for (var i = 0; i < lettersLength; i++)
		{
			var object = letters[ i ];
			
			if (object.letter == "\n" || object.letter == "\r")
			{
				lines.push([ line ]);
				
				line = [];
			}
			else
			{
				line.push(object);
			}
		}
		
		lines.push([ line ]);
		
		return lines;
		
	}
	
	
	d._getFormattedLetters = function (text)
	{
		var textLength = text.length;
		
		var context = this._context2d;
		
		var formatedLetters = [];
		
		
		var currentFormat = null;
		var currentFormatLength = 0;
		var format = [];
		
		var mixedformat = null;
		
		var formatLength = 0;
		var formatsCounter = 0;
		
		var newformat = false;
		
		currentFormat = text[ 0 ].textformats;
		currentFormatLength = currentFormat.length;
		
		format = text[ 0 ].textformats;
		formatLength = format.length;
		
		mixedformat = this._getMixedFormat(format, formatLength);
		
		formatedLetters.push(mixedformat);
		formatedLetters.push(text[ 0 ].character);
		
		for (var i = 1; i < textLength; i++)
		{
			newformat = false;
			
			if (currentFormatLength == formatLength)
			{
				
				while (currentFormatLength)
				{
					if (currentFormat[ currentFormatLength ] != format[ currentFormatLength ])
					{
						newformat = true;
						break;
					}
					currentFormatLength--;
				}
				
				
			}
			
			if (newformat == true)
			{
				mixedformat = this._getMixedFormat(format, formatLength);
				formatedLetters.push(mixedformat);
			}
			
			formatedLetters.push(text[ i ].character);
			
		}
		
		return formatedLetters;
		
	}
	
	d._getMixedFormat = function (format, formatLength)
	{
		
		var mixedFormat = new flash.text.TextFormat();
		
		for (var i = 0; i < formatLength; i++)
		{
			if (format[ i ]._font != null) mixedFormat._font = format[ i ]._font;
			if (format[ i ]._definefont != null) mixedFormat._definefont = format[ i ]._definefont;
			if (format[ i ]._size != null) mixedFormat._size = format[ i ]._size;
			if (format[ i ]._color != null) mixedFormat._color = format[ i ]._color;
			if (format[ i ]._bold != null) mixedFormat._bold = format[ i ]._bold;
			if (format[ i ]._italic != null) mixedFormat._italic = format[ i ]._italic;
			if (format[ i ]._underline != null) mixedFormat._underline = format[ i ]._underline;
			if (format[ i ]._url != null) mixedFormat._url = format[ i ]._url;
			if (format[ i ]._target != null) mixedFormat._target = format[ i ]._target;
			if (format[ i ]._align != null) mixedFormat._align = format[ i ]._align;
			if (format[ i ]._leftMargin != null) mixedFormat._leftMargin = format[ i ]._leftMargin;
			if (format[ i ]._rightMargin != null) mixedFormat._rightMargin = format[ i ]._rightMargin;
			if (format[ i ]._indent != null) mixedFormat._indent = format[ i ]._indent;
			if (format[ i ]._leading != null) mixedFormat._leading = format[ i ]._leading;
		}
		
		return mixedFormat;
		
	}
	
	d.appendText = function (newText)
	{
		this._text += newText;
		
		for (var i in newText)
		{
			this._formatedtext.push({character: newText[ i ], textformats: [ this._defaultTextFormat ]});
		}
		
		this._updateData(true);
	}
	
	d.setTextFormat = function (format, beginIndex, endIndex)
	{
		if (format) format = format.clone();
		
		
		this._textColor = format._color;
		if (!beginIndex) var beginIndex = -1;
		if (!endIndex) var endIndex = -1;
		
		
		if (this.styleSheet != null)
		{
			console.error("This method cannot be used on a text field with a style sheet.");
			return;
		}
		
		if (beginIndex > this._formatedtext.length ||
			beginIndex < -1 ||
			endIndex < -1 ||
			endIndex > this._formatedtext.length)
		{
			console.error("The beginIndex or endIndex specified is out of range.");
			return;
		}
		
		if (this._formatedtext.length == 0)
		{
			return;
		}
		
		if (beginIndex == -1)
		{
			beginIndex = 0;
			endIndex = this._formatedtext.length;
		}
		
		if (endIndex == -1)
		{
			endIndex = beginIndex + 1;
		}
		
		for (var i = beginIndex; i < endIndex; i++)
		{
			this._formatedtext[ i ].textformats.push(format);
		}
		
		this._updateData(true);
	}
	
	d.copyRichText = function ()/*String*/
	{
		return null;
		
	};
	
	d.getCharBoundaries = function (charIndex/*int*/)/*Rectangle*/
	{
		return null;
	};
	
	d.getCharIndexAtPoint = function (x/*Number*/, y/*Number*/)/*int*/
	{
		return -1;
	};
	
	d.getFirstCharInParagraph = function (charIndex/*int*/)/*int*/
	{
	
	};
	
	d.getImageReference = function (id/*String*/)/*DisplayObject*/
	{
	
	};
	
	d.getLineIndexAtPoint = function (x/*Number*/, y/*Number*/)/*int*/
	{
	
	};
	
	d.getLineIndexOfChar = function (charIndex/*int*/)/*int*/
	{
	
	};
	
	d.getLineLength = function (lineIndex/*int*/)/*int*/
	{
		
	};
	
	d.getLineMetrics = function (lineIndex/*int*/)/*TextLineMetrics*/
	{
		
	};
	
	d.getLineOffset = function (lineIndex/*int*/)/*int*/
	{
		
	};
	
	d.getLineText = function (lineIndex/*int*/)/*String*/
	{
		
	};
	
	d.getParagraphLength = function (charIndex/*int*/)/*int*/
	{
	
	};
	
	d.getRawText = function ()/*String*/
	{
	
	};
	
	d.getTextFormat = function (beginIndex/*int*/, endIndex/*int*/)/*TextFormat*/
	{
		return this._defaultTextFormat;
	};
	
	d.getTextRuns = function (beginIndex/*int*/, endIndex/*int*/)/*Array*/
	{
	
	};
	
	d.getXMLText = function (beginIndex/*int*/, endIndex/*int*/)/*String*/
	{
	
	};
	
	d.insertXMLText = function (beginIndex/*int*/, endIndex/*int*/, richText/*String*/, pasting/*Boolean*/)/*void*/
	{
	
	};
	
	d.pasteRichText = function (richText/*String*/)/*Boolean*/
	{
		return true;
	};
	
	d.replaceSelectedText = function (value/*String*/)/*void*/
	{
	
	};
	
	d.replaceText = function (beginIndex/*int*/, endIndex/*int*/, newText/*String*/)/*void*/
	{
	
	};
	
	d.setSelection = function (beginIndex/*int*/, endIndex/*int*/)/*void*/
	{
		this._selectionBeginIndex = beginIndex;
		this._selectionEndIndex = endIndex;
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.InteractiveObject_constructor = this.__base__;
		
		this.richTextFields/*Array*/ = [ "font", "size", "color", "bold", "italic", "underline", "url", "target", "align", "leftMargin", "rightMargin", "indent", "leading", "blockIndent", "kerning", "letterSpacing", "display" ];
		
		this._oldInputs = [];
		this._inputs = [];
	};
	
	s.__addInput__ = function (input)
	{
		if (this._inputs.indexOf(input) == -1)
		{
			this._inputs.push(input);
		}
	}
	
	s.__clear__ = function ()
	{
		this._oldInputs.length = 0;
		
		if (this._inputs.length)
		{
			while (this._inputs.length)
			{
				this._oldInputs.push(this._inputs.pop());
			}
		}
	}
	
	s.__update__ = function ()
	{
		var i;
		var input;
		
		for (i in this._oldInputs)
		{
			input = this._oldInputs[ i ];
			
			if (this._inputs.indexOf(input) == -1 && input.parentNode)
			{
				document.body.removeChild(input);
			}
		}
		
		for (i in this._inputs)
		{
			input = this._inputs[ i ];
			
			if (!input.parentNode)
			{
				document.body.appendChild(input);
			}
		}
	}
	
	s.__blur__ = function ()
	{
		var i;
		var input;
		
		for (i in this._oldInputs)
		{
			input = this._oldInputs[ i ];
			input.blur();
		}
		
		for (i in this._inputs)
		{
			input = this._inputs[ i ];
			input.blur();
		}
	}
	
	
	flash.addDescription("flash.text.TextField", d, "flash.display.InteractiveObject", s, null);
	
}
());
