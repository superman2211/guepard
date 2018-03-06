(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.path = null;
	d.audio = null;
	
	d.DefineSound = function ()
	{
		this.Tag_constructor();
		
		this.baseClass = flash.media.Sound;
	}
	
	/*override*/
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var attributes = node.get_attributes();
		
		this.path = String(attributes.path);
	};
	
	d.init = function (folder)
	{
		var path = folder + this.path;
		
		if (!this._canPlayMP3())
		{
			path = path.replace(".mp3", ".wav");
		}
		
		flash.trace("init audio", path);
		
		this.audio = new Audio(path);
	};
	
	d._canPlayMP3 = function ()
	{
		var audio = document.createElement("audio");
		return (typeof audio.canPlayType === "function" && audio.canPlayType("audio/mpeg") !== "");
	};
	
	d.linkage = function (sound)
	{
		sound._audio = this.audio;
	}
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.DefineSound", d, "flash.swf.Tag", s, null);
	
}
());