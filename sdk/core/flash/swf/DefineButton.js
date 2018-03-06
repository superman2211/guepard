(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.records = null;
	
	d.DefineButton = function ()
	{
		this.Tag_constructor();
		
	}
	
	/*override*/
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var attributes = node.get_attributes();
		
		this.records = [];
		
		var childNodes = node.get_childNodes();
		
		for (var i = 0; i < childNodes.length; i++)
		{
			var child = childNodes[ i ];
			
			attributes = child.get_attributes();
			
			if (child.nodeName == "ButtonRecord")
			{
				var record = {};
				
				record.id = flash.swf.Tag._baseId + attributes.id;
				record.depth = Number(attributes.depth);
				
				record.stateUp = attributes.stateUp == "true";
				record.stateDown = attributes.stateDown == "true";
				record.stateOver = attributes.stateOver == "true";
				record.stateHitTest = attributes.stateHitTest == "true";
				
				var subNodes = child.get_childNodes();
				
				for (var j = 0; j < subNodes.length; j++)
				{
					var sub = subNodes[ j ];
					
					if (sub.nodeName == "Matrix")
					{
						record.matrix = this.parseMatrix(sub);
					}
					
					if (sub.nodeName == "ColorTransform")
					{
						record.colorTransform = this.parseColorTransform(sub);
					}
				}
				
				this.records.push(record);
			}
		}
	}
	
	/*override*/
	d.createDisplayObject = function (/*loaderInfo*/)
	{
		var up = this.createState("stateUp");
		var down = this.createState("stateDown");
		var over = this.createState("stateOver");
		var hitTest = this.createState("stateHitTest");
		
		var button = new flash.display.SimpleButton(up, over, down, hitTest);
		
		return button;
	}
	
	d.createState = function (name)
	{
		var sprite = new flash.display.Sprite();
		
		var frame = {};
		frame.places = [];
		
		for (var i = 0; i < this.records.length; i++)
		{
			var record = this.records[ i ];
			
			if (record[ name ])
			{
				frame.places[ record.depth ] = record;
			}
		}
		
		sprite.__constructChildren__(frame, true, true, true);
		sprite.__updateNames__();
		
		return sprite;
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.DefineButton", d, "flash.swf.Tag", s, null);
	
}
());