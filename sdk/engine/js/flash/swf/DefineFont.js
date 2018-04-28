(function ()
{
	"use strict";
	
	var d = {};

	d.id = null;
	d.ascent = 0;
	d.descent = 0;
	d.leading = 0;
	d.fontStyle = "";
	d.glyphs = ""
	d.name = "";
	d.path = "";
	d.font = null;
	
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
		
	};
	
	d.setFonts = function (domain)
	{
		if (this.font)
		{
			domain._setFont(this.font);
		}
	};

	var s = {};

    s.__getCharWidth = function (char, font)
    {
    	var key = font + "_" + char;

        var width = this.__chars[ key ];

        if (width == undefined)
        {
        	var meashureData = this.__measureText(char, font);

            this.__chars[ key ] = width = meashureData.width;
        }

        return width;
    };

    s.__measureText = function (text, font)
    {
        var context = this.__tempContext2d;

        context.font = flash.text.TextFormat._formatFont(font, 1024);

        return context.measureText(text);
    }

    s.__getCharsAdvance = function (char1, char2, font)
    {
        var advance = 0;

        if (char1)
        {
            if (char2 && char2 != "\n" && char2 != " " && char2 != "\t")
            {
                var key = font + " " + char1;

                var pair = this.__kerningsPairs[ key ];

                if (!pair)
                {
                    this.__kerningsPairs[ key ] = pair = {};
                }

                advance = pair[ char2 ];

                if (advance == undefined)
                {
                    var width1 = this.__getCharWidth(char1, font);
                    var width2 = this.__getCharWidth(char2, font);

                    var width = this.__getCharWidth(char1 + char2, font);

                    pair[ char2 ] = advance = width - width2;
                }
            }
            else
            {
                advance = this.__getCharWidth(char1, font);
            }
        }

        return advance;
    };

	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;

        this.__kerningsPairs = {};
        this.__chars = {};

		var canvas = document.createElement('canvas');
		this.__tempContext2d = canvas.getContext("2d");
	}
	
	flash.addDescription("flash.swf.DefineFont", d, "flash.swf.Tag", s, null);
	
}
());