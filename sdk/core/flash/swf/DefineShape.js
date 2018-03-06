(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.atlas = null;
	d.bounds = null;
	d.realBounds = null;
	d.map = null;
	d.color = -1;
	d.bitmap = null;
	
	d.DefineShape = function ()
	{
		this.Tag_constructor();
		
		this.baseClass = flash.display.Shape;
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
		
		if (attributes.color)
		{
			this.color = Number(attributes.color);
		}
		
		var childNodes = node.get_childNodes();
		
		for (var i = 0; i < childNodes.length; i++)
		{
			var child = childNodes[ i ];
			
			attributes = child.get_attributes();
			
			if (child.nodeName == "Rectangle")
			{
				if (attributes.name == "bounds")
				{
					this.bounds = this.parseRectangle(child);
				}
				else if (attributes.name == "map")
				{
					this.map = this.parseRectangle(child);
				}
			}
		}
		
		this.realBounds = this.bounds.clone();
		
		if (this.color == -1)
		{
			var border = flash.swf.DefineShape._border;
			
			this.realBounds.inflate(-border, -border);
		}
	};
	
	d.setImages = function (domain)
	{
		if (this.atlas)
		{
			domain._setImage(this.atlas, null);
		}
	};
	
	/*override*/
	d.createDisplayObject = function ()
	{
		var shape = new flash.display.Shape();
		
		this.linkage(shape);
		
		return shape;
	};
	
	/*override*/
	d.linkage = function (shape)
	{
		if (!this.bitmap)
		{
			if (this.color != -1)
			{
				this.bitmap = new flash.display.BitmapData(1, 1, true, this.color);
			}
			else if (this.atlas)
			{
				this.bitmap = flash.system.ApplicationDomain.get_currentDomain()._getImage(this.atlas);
			}
		}
		
		if (this.bitmap)
		{
			if (!this.map)
			{
				this.map = new flash.geom.Rectangle(0, 0, this.bitmap.get_width(), this.bitmap.get_height());
			}
			
			shape.get_graphics()._textureInfo = this;
		}
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
		this._border = 2;
	}
	
	flash.addDescription("flash.swf.DefineShape", d, "flash.swf.Tag", s, null);
	
}
());