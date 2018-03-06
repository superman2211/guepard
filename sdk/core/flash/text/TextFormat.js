/*class flash.text.TextFormat*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._align = null;
	d._blockIndent = null;
	d._bold = null;
	d._bullet = null;
	d._color = null;
	d._display = null;
	d._font = null;
	d._indent = null;
	d._italic = null;
	d._kerning = null;
	d._leading = null;
	d._leftMargin = null;
	d._letterSpacing = null;
	d._rightMargin = null;
	d._size = null;
	d._tabStops = null;
	d._target = null;
	d._underline = null;
	d._url = null;
	d._definefont = null;
	
	
	/*public*/
	d.get_align = function ()/*String*/
	{
		return this._align;
	};
	
	/*public*/
	d.set_align = function (value/*String*/)/*void*/
	{
		this._align = value;
		
		return value;
	};
	
	/*public*/
	d.get_blockIndent = function ()/*Object*/
	{
		return this._blockIndent;
	};
	
	/*public*/
	d.set_blockIndent = function (value/*Object*/)/*void*/
	{
		this._blockIndent = value;
		return value;
	};
	
	/*public*/
	d.get_bold = function ()/*Object*/
	{
		return this._bold;
	};
	
	/*public*/
	d.set_bold = function (value/*Object*/)/*void*/
	{
		this._bold = value;
		return value;
	};
	
	/*public*/
	d.get_bullet = function ()/*Object*/
	{
		return this._bullet;
	};
	
	/*public*/
	d.set_bullet = function (value/*Object*/)/*void*/
	{
		this._bullet = value;
		return value;
	};
	
	/*public*/
	d.get_color = function ()/*Object*/
	{
		return this._color;
	};
	
	/*public*/
	d.set_color = function (value/*Object*/)/*void*/
	{
		this._color = value;
		
		return value;
	};
	
	/*public*/
	d.get_display = function ()/*String*/
	{
		return this._display;
	};
	
	/*public*/
	d.set_display = function (value/*String*/)/*void*/
	{
		this._display = value;
		return value;
	};
	
	/*public*/
	d.get_font = function ()/*String*/
	{
		return this._font;
	};
	
	/*public*/
	d.set_font = function (value/*String*/)/*void*/
	{
		if (flash.text.TextFormat._embedFonts[ value ])
		{
			value = flash.text.TextFormat._embedFonts[ value ];
		}
		
		/*if(value.split("Arial_")>0) value="Arial";
		
		if(value=="Arial Black")
		{
			value="Arial";
			this._bold = true;
		}
		*/
		
		this._font = value;
		return value;
	};
	
	/*public*/
	d.get_indent = function ()/*Object*/
	{
		return this._indent;
	};
	
	/*public*/
	d.set_indent = function (value/*Object*/)/*void*/
	{
		this._indent = value;
		return value;
	};
	
	/*public*/
	d.get_italic = function ()/*Object*/
	{
		return this._italic;
	};
	
	/*public*/
	d.set_italic = function (value/*Object*/)/*void*/
	{
		this._italic = value;
		return value;
	};
	
	/*public*/
	d.get_kerning = function ()/*Object*/
	{
		return this._kerning;
	};
	
	/*public*/
	d.set_kerning = function (value/*Object*/)/*void*/
	{
		this._kerning = value;
		return value;
	};
	
	/*public*/
	d.get_leading = function ()/*Object*/
	{
		return this._leading;
	};
	
	/*public*/
	d.set_leading = function (value/*Object*/)/*void*/
	{
		this._leading = value;
		return value;
	};
	
	/*public*/
	d.get_leftMargin = function ()/*Object*/
	{
		return this._leftMargin;
	};
	
	/*public*/
	d.set_leftMargin = function (value/*Object*/)/*void*/
	{
		this._leftMargin = value;
		return value;
	};
	
	/*public*/
	d.get_letterSpacing = function ()/*Object*/
	{
		return this._letterSpacing;
	};
	
	/*public*/
	d.set_letterSpacing = function (value/*Object*/)/*void*/
	{
		this._letterSpacing = value;
		return value;
	};
	
	/*public*/
	d.get_rightMargin = function ()/*Object*/
	{
		return this._rightMargin;
	};
	
	/*public*/
	d.set_rightMargin = function (value/*Object*/)/*void*/
	{
		this._rightMargin = value;
		return value;
	};
	
	/*public*/
	d.get_size = function ()/*Object*/
	{
		return this._size;
	};
	
	/*public*/
	d.set_size = function (value/*Object*/)/*void*/
	{
		this._size = Number(value);
		
		return value;
	};
	
	/*public*/
	d.get_tabStops = function ()/*Array*/
	{
		return this._tabStops;
	};
	
	/*public*/
	d.set_tabStops = function (value/*Array*/)/*void*/
	{
		this._tabStops = value;
		return value;
	};
	
	/*public*/
	d.get_target = function ()/*String*/
	{
		return this._target;
	};
	
	/*public*/
	d.set_target = function (value/*String*/)/*void*/
	{
		this._target = value;
		return value;
	};
	
	/*public*/
	d.get_underline = function ()/*Object*/
	{
		return this._underline;
	};
	
	/*public*/
	d.set_underline = function (value/*Object*/)/*void*/
	{
		this._underline = value;
		return value;
	};
	
	/*public*/
	d.get_url = function ()/*String*/
	{
		return this._url;
	};
	
	/*public*/
	d.set_url = function (value/*String*/)/*void*/
	{
		this._url = value;
		return value;
	};
	
	
	/*public*/
	d.TextFormat = function (font/*String*/, size/*Object*/, color/*Object*/, bold/*Object*/, italic/*Object*/, underline/*Object*/, url/*String*/, target/*String*/, align/*String*/, leftMargin/*Object*/, rightMargin/*Object*/, indent/*Object*/, leading/*Object*/)
	{
		if (font == undefined) font = null;
		if (size == undefined) size = null;
		if (color == undefined) color = null;
		if (bold == undefined) bold = null;
		if (italic == undefined) italic = null;
		if (underline == undefined) underline = null;
		if (url == undefined) url = null;
		if (target == undefined) target = null;
		if (align == undefined) align = null;
		if (leftMargin == undefined) leftMargin = null;
		if (rightMargin == undefined) rightMargin = null;
		if (indent == undefined) indent = null;
		if (leading == undefined) leading = null;
		
		
		if (font != null)
		{
			this.set_font(font);
			
		}
		
		if (size != null)
		{
			this.set_size(size);
			
		}
		
		if (color != null)
		{
			this.set_color(color);
			
		}
		
		if (bold != null)
		{
			this.set_bold(bold);
			
		}
		
		if (italic != null)
		{
			this.set_italic(italic);
			
		}
		
		if (underline != null)
		{
			this.set_underline(underline);
			
		}
		
		if (url != null)
		{
			this.set_url(url);
			
		}
		
		if (target != null)
		{
			this.set_target(target);
			
		}
		
		if (align != null)
		{
			this.set_align(align);
			
		}
		
		if (leftMargin != null)
		{
			this.set_leftMargin(leftMargin);
			
		}
		
		if (rightMargin != null)
		{
			this.set_rightMargin(rightMargin);
			
		}
		
		if (indent != null)
		{
			this.set_indent(indent);
			
		}
		
		if (leading != null)
		{
			this.set_leading(leading);
			
		}
		
	};
	
	d.clone = function ()
	{
		return new flash.text.TextFormat(this._font,
			this._size/*Object*/,
			this._color/*Object*/,
			this._bold/*Object*/,
			this._italic/*Object*/,
			this._underline/*Object*/,
			this._url/*String*/,
			this._target/*String*/,
			this._align/*String*/,
			this._leftMargin/*Object*/,
			this._rightMargin/*Object*/,
			this._indent/*Object*/,
			this._leading/*Object*/);
	}
	
	d.toString = function ()
	{
		return "[object TextFormat(font: " + this._font + ", size: " + this._size + ", color: " + this._color + ")]";
	};
	
	var s = {};
	
	s._formatFont = function (name, size)
	{
		var font = "";
		
		if (name.indexOf(" Bold") != -1)
		{
			name = name.replace(" Bold", "");
			font += "bold ";
		}
		
		if (name.indexOf(" Italic") != -1)
		{
			name = name.replace(" Italic", "");
			font += "italic ";
		}
		
		font += size + "px " + name;
		
		return font;
	}
	
	s.__init__ = function ()
	{
		this._embedFonts = {};
	};
	
	
	flash.addDescription("flash.text.TextFormat", d, null, s, null);
	
}
());
