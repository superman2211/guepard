(function ()
{
	"use strict";
	
	var d = {};
	
	d.scenes = null;
	d.labels = null;
	
	d.DefineScene = function ()
	{
		this.Tag_constructor();
	}
	
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		this.scenes = [];
		this.labels = [];
		
		var nodes = node.get_childNodes();
		
		for (var i = 0; i < nodes.length; i++)
		{
			var child = nodes[ i ];
			
			var attributes = child.get_attributes();
			
			if (child.nodeName == "Scene")
			{
				this.scenes.push(
					{
						offset: Number(attributes.offset),
						name: attributes.name
					}
				);
			}
			else if (child.nodeName == "FrameLabel")
			{
				this.labels.push(
					{
						frame: Number(attributes.frame),
						name: attributes.name
					}
				);
			}
		}
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.DefineScene", d, "flash.swf.Tag", s, null);
	
}
());