/*class flash.text.StyleSheet*/
/*
import flash.events.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._css/*Object*/ = null;
	
	d.get__styles = function ()/*Object*/
	{
		
	};
	
	d.set__styles = function (styles/*Object*/)/*void*/
	{
		
	};
	
	d.get_styleNames = function ()/*Array*/
	{
		
		var _loc_1/*Array*/ = null;
		var _loc_2/*Object*/ = null;
		_loc_1 = [];
		
		for (_loc_2 in this._css)
		{
			_loc_1.push(_loc_2);
			
		}
		return _loc_1;
		
	};
	
	
	d.StyleSheet = function ()
	{
		this.EventDispatcher_constructor();
		this._css =
			{};
		this.set__styles(
			{}
		);
		return;
		
	};
	
	d._copy = function (o/*Object*/)/*Object*/
	{
		
		var _loc_2/*Object*/ = null;
		var _loc_3/*Object*/ = null;
		
		if (typeof(o) != "object")
		{
			return null;
			
		}
		_loc_2 =
			{};
		
		for (_loc_3 in o)
		{
			_loc_2[ _loc_3 ] = o[ _loc_3 ];
			
		}
		return _loc_2;
		
	};
	
	d._parseCSSFontFamily = function (fontFamily/*String*/)/*String*/
	{
		
	};
	
	d._parseCSSInternal = function (cssText/*String*/)/*Object*/
	{
		
	};
	
	d._parseColor = function (color/*String*/)/*uint*/
	{
		
	};
	
	d._update = function ()/*void*/
	{
		
	};
	
	d.clear = function ()/*void*/
	{
		this._css =
			{};
		this.set__styles(
			{}
		);
		this._update();
		return;
		
	};
	
	d.doTransform = function (n/*String*/)/*void*/
	{
		
		var _loc_2/*TextFormat*/ = null;
		_loc_2 = this.transform(this._css[ n ]);
		this.get__styles()[ n ] = _loc_2;
		return;
		
	};
	
	d.getStyle = function (styleName/*String*/)/*Object*/
	{
		return this._copy(this._css[ styleName.toLowerCase() ]);
		
	};
	
	d.parseCSS = function (CSSText/*String*/)/*void*/
	{
		
		var _loc_2/*Object*/ = null;
		var _loc_3/*String*/ = null;
		_loc_2 = this._parseCSSInternal(CSSText);
		
		if (typeof(_loc_2) == "null")
		{
			return;
			
		}
		
		for (_loc_3 in _loc_2)
		{
			this._css[ _loc_3 ] = this._copy(_loc_2[ _loc_3 ]);
			this.doTransform(_loc_3);
			
		}
		this._update();
		return;
		
	};
	
	d.setStyle = function (styleName/*String*/, styleObject/*Object*/)/*void*/
	{
		
		var _loc_3/*String*/ = null;
		_loc_3 = styleName.toLowerCase();
		this._css[ _loc_3 ] = this._copy(styleObject);
		this.doTransform(_loc_3);
		this._update();
		return;
		
	};
	
	d.transform = function (formatObject/*Object*/)/*TextFormat*/
	{
		
		var _loc_2/*TextFormat*/ = null;
		var _loc_3/* * */ = undefined;
		
		if (formatObject == null)
		{
			return null;
			
		}
		_loc_2 = new flash.text.TextFormat();
		_loc_3 = formatObject.textAlign;
		
		if (_loc_3)
		{
			_loc_2.set_align(_loc_3);
			
		}
		_loc_3 = formatObject.fontSize;
		
		if (_loc_3)
		{
			_loc_3 = parseInt(_loc_3);
			
			if (_loc_3 > 0)
			{
				_loc_2.set_size(_loc_3);
				
			}
			
		}
		_loc_3 = formatObject.textDecoration;
		
		if (_loc_3 == "none")
		{
			_loc_2.set_underline(false);
			
		}
		else if (_loc_3 == "underline")
		{
			_loc_2.set_underline(true);
			
		}
		_loc_3 = formatObject.marginLeft;
		
		if (_loc_3)
		{
			_loc_2.set_leftMargin(parseInt(_loc_3));
			
		}
		_loc_3 = formatObject.marginRight;
		
		if (_loc_3)
		{
			_loc_2.set_rightMargin(parseInt(_loc_3));
			
		}
		_loc_3 = formatObject.leading;
		
		if (_loc_3)
		{
			_loc_2.set_leading(parseInt(_loc_3));
			
		}
		_loc_3 = formatObject.kerning;
		
		if (_loc_3 == "true")
		{
			_loc_2.set_kerning(1);
			
		}
		else if (_loc_3 == "false")
		{
			_loc_2.set_kerning(0);
			
		}
		else
		{
			_loc_2.set_kerning(parseInt(_loc_3));
			
		}
		_loc_3 = formatObject.letterSpacing;
		
		if (_loc_3)
		{
			_loc_2.set_letterSpacing(parseFloat(_loc_3));
			
		}
		_loc_3 = formatObject.fontFamily;
		
		if (_loc_3)
		{
			_loc_2.set_font(this._parseCSSFontFamily(_loc_3));
			
		}
		_loc_3 = formatObject.display;
		
		if (_loc_3)
		{
			_loc_2.set_display(_loc_3);
			
		}
		_loc_3 = formatObject.fontWeight;
		
		if (_loc_3 == "bold")
		{
			_loc_2.set_bold(true);
			
		}
		else if (_loc_3 == "normal")
		{
			_loc_2.set_bold(false);
			
		}
		_loc_3 = formatObject.fontStyle;
		
		if (_loc_3 == "italic")
		{
			_loc_2.set_italic(true);
			
		}
		else if (_loc_3 == "normal")
		{
			_loc_2.set_italic(false);
			
		}
		_loc_3 = formatObject.textIndent;
		
		if (_loc_3)
		{
			_loc_2.set_indent(parseInt(_loc_3));
			
		}
		_loc_3 = formatObject.color;
		
		if (_loc_3)
		{
			_loc_3 = this._parseColor(_loc_3);
			
			if (_loc_3 != null)
			{
				_loc_2.set_color(_loc_3);
				
			}
			
		}
		return _loc_2;
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.text.StyleSheet", d, "flash.events.EventDispatcher", s, null);
	
}
());
