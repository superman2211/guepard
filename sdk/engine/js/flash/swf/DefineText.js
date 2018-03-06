(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.bounds = null;
	d.matrix = null;
	
	d._textRecords = null;
	d._lastRecord = null;
	
	
	d.DefineText = function ()
	{
		this.Tag_constructor();
		
	}
	
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var childNodes = node.get_childNodes();
		this._textRecords = [];
		
		var recordCounter = 0;
		
		for (var i = 0; i < childNodes.length; i++)
		{
			var child = childNodes[ i ];
			
			if (child.nodeName == "Rectangle")
			{
				this.bounds = this.parseRectangle(child);
				this.bounds.inflate(2, 2);
			}
			
			if (child.nodeName == "Matrix")
			{
				this.matrix = this.parseMatrix(child);
			}
			
			if (child.nodeName == "TextRecord")
			{
				this._defineText(child, recordCounter);
				recordCounter++;
			}
		}
	}
	
	d._defineText = function (node, recordCounter)
	{
		var attributes = node.get_attributes();
		
		var childNodes = node.get_childNodes();
		
		var width = 0;
		var height = 0;
		var glyphEntrys = [];
		var glyphEntryAttr = null;
		
		for (var i = 0; i < childNodes.length; i++)
		{
			var child = childNodes[ i ];
			
			if (child.nodeName == "GlyphEntry")
			{
				glyphEntryAttr = child.get_attributes();
				
				glyphEntrys.push((Number(glyphEntryAttr.advance)) / 20);
				
			}
			
		}
		
		var record = {
			x: attributes.x,
			y: attributes.y,
			text: unescape(attributes.text),
			glyphEntrys: glyphEntrys,
			fontId: flash.swf.Tag._baseId + attributes.fontId,
			fontName: attributes.font,
			fontSize: attributes.height,
			color: attributes.color
		};
		
		
		this._textRecords.push(record);
		
		
	}
	
	
	/*override*/
	d.createDisplayObject = function ()
	{
		
		
		var textField = new flash.text.StaticText();
		
		textField._textRecords = this._textRecords;
		textField._bounds = this.bounds;
		
		if (this.matrix)
		{
			textField._matrix = this.matrix;
		}
		
		return textField;
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.DefineText", d, "flash.swf.Tag", s, null);
	
}
());