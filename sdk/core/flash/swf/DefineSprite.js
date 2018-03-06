(function ()
{
	"use strict";
	
	var d = {};
	
	d.id = null;
	d.frames = 0;
	d.tags = null;
	
	d.DefineSprite = function ()
	{
		this.Tag_constructor();
		
		this.baseClass = flash.display.MovieClip;
	}
	
	/*override*/
	d.fromXML = function (node)
	{
		this.Tag_fromXML(node);
		
		var attributes = node.get_attributes();
		
		if (attributes.frames) this.frames = Number(attributes.frames);
		
		var domain = flash.system.ApplicationDomain.get_currentDomain();
		
		var childNodes = node.get_childNodes();
		
		this.tags = new Array();
		
		for (var i = 0; i < childNodes.length; i++)
		{
			var child = childNodes[ i ];
			
			var TagClass = null;
			
			var isDefine = false;
			var isSymbol = false;
			var hasImage = false;
			var hasFont = false;
			
			switch (child.nodeName)
			{
				case "ShowFrame":
					TagClass = flash.swf.ShowFrame;
					break;
				
				case "End":
					TagClass = flash.swf.End;
					break;
				
				case "DefineShape":
				case "DefineShape2":
				case "DefineShape3":
				case "DefineShape4":
					TagClass = flash.swf.DefineShape;
					isDefine = true;
					hasImage = true;
					break;
				
				case "DefineText":
				case "DefineText2":
					TagClass = flash.swf.DefineText;
					isDefine = true;
					break;
				
				case "DefineSound":
					TagClass = flash.swf.DefineSound;
					isDefine = true;
					break;
				
				case "DefineEditText":
					TagClass = flash.swf.DefineEditText;
					isDefine = true;
					break;
				
				case "DefineSprite":
					TagClass = flash.swf.DefineSprite;
					isDefine = true;
					break;
				
				case "PlaceObject":
				case "PlaceObject2":
				case "PlaceObject3":
					TagClass = flash.swf.PlaceObject;
					break;
				
				case "RemoveObject":
				case "RemoveObject2":
					TagClass = flash.swf.RemoveObject;
					break;
				
				case "SymbolClass":
					TagClass = flash.swf.SymbolClass;
					isSymbol = true;
					break;
				
				case "DefineScene":
					TagClass = flash.swf.DefineScene;
					break;
				
				case "FrameLabel":
					TagClass = flash.swf.FrameLabel;
					break;
				
				case "DefineButton":
				case "DefineButton2":
					TagClass = flash.swf.DefineButton;
					isDefine = true;
					break;
				
				case "DefineBinaryData":
					TagClass = flash.swf.DefineBinaryData;
					isDefine = true;
					break;
				
				case "DefineBits":
				case "DefineBitsJPEG2":
				case "DefineBitsJPEG3":
				case "DefineBitsJPEG4":
				case "DefineBitsLossless":
				case "DefineBitsLossless2":
					TagClass = flash.swf.DefineBits;
					isDefine = true;
					break;
				
				case "DefineFont":
				case "DefineFont1":
				case "DefineFont2":
				case "DefineFont3":
					TagClass = flash.swf.DefineFont;
					isDefine = true;
					hasFont = true;
					break;
			}
			
			if (TagClass)
			{
				var tag = new TagClass();
				tag.fromXML(child);
				this.tags.push(tag);
				
				if (isDefine)
				{
					domain._setDefine(tag);
				}
				
				if (isSymbol)
				{
					domain._addLinkage(tag);
				}
				
				if (hasImage)
				{
					tag.setImages(domain);
				}
				
				if (hasFont)
				{
					tag.setFonts(domain);
					
				}
			}
		}
	}
	
	/*override*/
	d.createDisplayObject = function ()
	{
		var DisplayObjectClass;
		
		if (this.id)
		{
			var symbolClass = flash.system.ApplicationDomain.get_currentDomain()._getLinkage(this.id);
			
			if (symbolClass)
			{
				var className = symbolClass.getClassName(this.id);
				
				if (className)
				{
					DisplayObjectClass = flash.utils.getDefinitionByName(className);
					
					if (!DisplayObjectClass)
					{
						throw new Error("Class '" + className + "' could not be found");
					}
				}
			}
		}
		
		if (DisplayObjectClass)
		{
			DisplayObjectClass.prototype.get_stage = function ()
			{
				return flash.display.Stage.__current__;
			}
			
			return new DisplayObjectClass();
		}
		else
		{
			var movieClip = new flash.display.MovieClip();
			
			movieClip.get_stage = function ()
			{
				return flash.display.Stage.__current__;
			}
			
			this.linkage(movieClip);
			return movieClip;
		}
	}
	
	d.linkage = function (movieClip)
	{
		var frames = [];
		
		var frame = {};
		frame.places = [];
		frame.labels = [];
		frame.index = 1;
		
		var i;
		var j;
		var defineScene;
		
		for (i = 0; i < this.tags.length; i++)
		{
			var tag = this.tags[ i ];
			
			if (tag instanceof flash.swf.ShowFrame)
			{
				var places = frame.places.slice(0);
				var index = frame.index + 1;
				
				frames.push(frame);
				
				frame = new Object();
				frame.places = places;
				frame.labels = new Array();
				frame.index = index;
			}
			else if (tag instanceof flash.swf.End)
			{
				
			}
			else if (tag instanceof flash.swf.PlaceObject)
			{
				frame.places[ tag.depth ] = tag;
			}
			else if (tag instanceof flash.swf.RemoveObject)
			{
				frame.places[ tag.depth ] = null;
			}
			else if (tag instanceof flash.swf.DefineScene)
			{
				defineScene = tag;
			}
			else if (tag instanceof flash.swf.FrameLabel)
			{
				frame.labels.push(tag.name);
			}
		}
		
		if (frames.length)
		{
			var first = frames[ 0 ];
			
			for (j in first.places)
			{
				first.places[ j ].initDefaults();
			}
			
			movieClip.__constructChildren__(first, true, true, true);
			
			if (movieClip instanceof flash.display.MovieClip)
			{
				movieClip._updatedFrame = movieClip._currentFrame;
			}
			
			movieClip.__updateNames__();
		}
		
		if (movieClip instanceof flash.display.MovieClip)
		{
			if (defineScene)
			{
				d.initScenes(movieClip, defineScene);
			}
			
			movieClip._frames = frames;
			
			if (frames.length <= 1)
			{
				movieClip.stop();
			}
		}
	}
	
	d.initScenes = function (movieClip, defineScene)
	{
		var scenes = movieClip.get_scenes();
		
		for (var i = 0; i < defineScene.scenes.length; i++)
		{
			var sceneObject = defineScene.scenes[ i ];
			
			var numFrames;
			
			if (i + 1 < defineScene.scenes.length)
			{
				var next = defineScene.scenes[ i + 1 ];
				numFrames = next.offset - sceneObject.offset;
			}
			else
			{
				numFrames = movieClip.get_totalFrames() - sceneObject.offset;
			}
			
			var labels = [];
			
			for (var j = 0; j < defineScene.labels.length; j++)
			{
				var labelObject = defineScene.labels[ j ];
				
				if (sceneObject.offset <= labelObject.frame && labelObject.frame < sceneObject.offset + numFrames)
				{
					var frameLabel = new flash.display.FrameLabel(
						labelObject.name,
						labelObject.frame - sceneObject.offset + 1
					);
					
					labels.push(frameLabel);
				}
			}
			
			var scene = new flash.display.Scene(
				sceneObject.name,
				labels,
				numFrames
			);
			
			scene._offset = sceneObject.offset;
			
			scenes.push(scene);
		}
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.prototype.Tag_constructor = this.__base__;
		this.prototype.Tag_fromXML = this.__base__.prototype.fromXML;
		
	}
	
	flash.addDescription("flash.swf.DefineSprite", d, "flash.swf.Tag", s, null);
	
}
());