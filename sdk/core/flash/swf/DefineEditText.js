(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.atlas = null;
	d.bounds = null;
	d.map = null;
	d.color = 0;
	
	d.text = "";
	d.htmlText = "";
	
	d.html = false;
	d.multiline = false;
	d.textType = "";
	d.variable = "";
	d.wordWrap = false;
	d.textFormat;
	
	d.DefineEditText = function ()
	{
		this.Tag_constructor();
	}
	
	/*override*/
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var attributes = node.get_attributes();
		
		if (attributes.atlas)
		{
			this.atlas = attributes.atlas;
		}
		
		this.textFormat = new flash.text.TextFormat(
			attributes.fontName,
			attributes.fontSize ? Number(attributes.fontSize) : Number(attributes.height),
			Number(attributes.color),
			attributes.bold == "true",
			attributes.italic,
			attributes.underline,
			attributes.url,
			attributes.target,
			attributes.align,
			attributes.leftMargin,
			attributes.rightMargin,
			attributes.indent,
			attributes.leading
		);
		
		this.textFormat._definefont = flash.system.ApplicationDomain.get_currentDomain()._getDefine(
			flash.swf.Tag._baseId + attributes.fontId
		);
		
		this.html = attributes.html == "true";
		this.multiline = attributes.multiline == "true";
		this.textType = attributes.type;
		this.variable = attributes.variable;
		this.wordWrap = attributes.wordWrap == "true";
		
		var symbols = attributes.text;
		symbols = symbols.replace(new RegExp("uFFA0", 'g'), "u0020");
		
		this.text = unescape(symbols);
		
		var childNodes = node.get_childNodes();
		
		for (var i = 0; i < childNodes.length; i++)
		{
			var child = childNodes[ i ];
			
			if (child.nodeName == "Rectangle")
			{
				this.bounds = this.parseRectangle(child);
			}
		}
	}
	
	/*override*/
	d.createDisplayObject = function (/*loaderInfo*/)
	{
		var textField = new flash.text.TextField();
		
		textField._bounds.x = this.bounds.x;
		textField._bounds.y = this.bounds.y;
		
		textField.set_width(this.bounds.width);
		textField.set_height(this.bounds.height);
		textField.set_type(this.textType);
		textField.set_multiline(this.multiline);
		textField.set_wordWrap(this.wordWrap);
		textField.set_defaultTextFormat(this.textFormat);
		
		if (this.html)
		{
			textField.set_htmlText(this.text);
		}
		else
		{
			textField.set_text(this.text);
		}
		
		return textField;
		
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.DefineEditText", d, "flash.swf.Tag", s, null);
	
}
());