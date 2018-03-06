(function ()
{
	"use strict";
	
	var d = {};
	
	d.chars = null;
	d.id = null;
	d.ascent = 0;
	d.descent = 0;
	d.leading = 0;
	d.fontStyle = "";
	d.glyphs = ""
	d.name = "";
	d.path = "";
	d.font = null;
	d.kerningsPairs = null;
	
	d.DefineFont = function ()
	{
		this.Tag_constructor();
		this.baseClass = flash.text.Font;
	}
	
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var attributes = node.get_attributes();
		
		this.ascent = Number(attributes.ascent) / 20;
		this.descent = Number(attributes.descent) / 20;
		this.leading = Number(attributes.leading) / 20;
		
		this.name = attributes.name;
		this.path = attributes.path;
		
		var bold = attributes.bold == "true";
		var italic = attributes.italic == "true";
		
		this.kerningsPairs = {};
		this.chars = {};
		
		this.fontStyle = flash.text.FontStyle.REGULAR;
		
		if (bold && italic)
		{
			this.fontStyle = flash.text.FontStyle.BOLD_ITALIC;
		}
		else if (bold)
		{
			this.fontStyle = flash.text.FontStyle.BOLD;
		}
		else if (italic)
		{
			this.fontStyle = flash.text.FontStyle.ITALIC;
		}
		
		this.font = new flash.text.Font();
		this.font._fontName = this.name;
		this.font._fontType = "embedded";
		this.font._fontStyle = this.fontStyle;
		this.font._glyphs = this.glyphs;
		this.font._path = this.path;
		this.font._id = this.id;
		this.font._definefont = this;
	}
	
	d.setFonts = function (domain)
	{
		if (this.font)
		{
			domain._setFont(this.font);
		}
	};
	
	d.getCharWidth = function (char1, font, size)
	{
		var width = this.chars[ char1 ];
		
		if (width == undefined)
		{
			var context = flash.swf.DefineFont.__tempContext2d;
			//context.font = 1024 + "px " + font;
			context.font = flash.text.TextFormat._formatFont(font, 1024);
			
			this.chars[ char1 ] = width = context.measureText(char1).width;
		}
		
		return width;
	};
	
	d.getCharsAdvance = function (char1, char2, font, size)
	{
		var advance = 0;
		
		if (char1)
		{
			if (char2 && char2 != "\n" && char2 != " " && char2 != "\t")
			{
				var pair = this.kerningsPairs[ char1 ];
				
				if (!pair)
				{
					this.kerningsPairs[ char1 ] = pair = {};
				}
				
				advance = pair[ char2 ];
				
				if (advance == undefined)
				{
					var width1 = this.getCharWidth(char1, font, size);
					var width2 = this.getCharWidth(char2, font, size);
					
					var width = this.getCharWidth(char1 + char2, font, size);
					
					pair[ char2 ] = advance = width - width2;
				}
			}
			else
			{
				advance = this.getCharWidth(char1, font, size);
			}
		}
		
		return advance;
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
		var canvas = document.createElement('canvas');
		this.__tempContext2d = canvas.getContext("2d");
	}
	
	flash.addDescription("flash.swf.DefineFont", d, "flash.swf.Tag", s, null);
	
}
());