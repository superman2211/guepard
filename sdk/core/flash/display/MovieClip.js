/*class flash.display.MovieClip*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._scripts = null;//[];
	d._frames = null;//[];
	d._scenes = null;//[];
	
	d._oldFrame = -1;
	d._updatedFrame = -1;
	d._currentFrame = -1;
	d._targetFrame = -1;
	
	d._async = false;
	d._framesLoaded = 0;
	
	d._isPlaying = true;
	
	d._enabled = true;
	
	d._mcId = -1;
	
	
	/*public*/
	d.get_currentFrame = function ()/*int*/
	{
		var scene = this.get_currentScene();
		
		if (scene)
		{
			return this._currentFrame + 1 - scene._offset;
		}
		else
		{
			return this._currentFrame + 1;
		}
	};
	
	/*public*/
	d.get_currentFrameLabel = function ()/*String*/
	{
		var scene = this.get_currentScene();
		
		if (scene)
		{
			var currentFrame = this.get_currentFrame();
			
			var labels = scene.get_labels();
			
			for (var i = 0; i < labels.length; i++)
			{
				var label = labels[ i ];
				
				if (label.frame == currentFrame)
				{
					return label.name;
				}
			}
		}
		
		return null;
	};
	
	/*public*/
	d.get_currentLabel = function ()/*String*/
	{
		var scene = this.get_currentScene();
		
		var name = null;
		
		if (scene)
		{
			var currentFrame = this.get_currentFrame();
			
			var labels = scene.get_labels();
			
			for (var i = 0; i < labels.length; i++)
			{
				var label = labels[ i ];
				
				if (label.frame <= currentFrame)
				{
					name = label.name;
				}
				else
				{
					break;
				}
			}
		}
		
		return name;
	};
	
	/*public*/
	d.get_currentLabels = function ()/*Array*/
	{
		var scene = this.get_currentScene();
		
		if (scene)
		{
			return scene.get_labels();
		}
		else
		{
			return null;
		}
	};
	
	/*public*/
	d.get_currentScene = function ()/*Scene*/
	{
		for (var i = 0; i < this._scenes.length; i++)
		{
			var scene = this._scenes[ i ];
			
			if (scene._offset <= this._currentFrame &&
				this._currentFrame < scene._offset + scene.get_numFrames())
			{
				return scene;
			}
		}
		
		return null;
	};
	
	/*public*/
	d.get_enabled = function ()/*Boolean*/
	{
		return this._enabled;
	};
	
	/*public*/
	d.set_enabled = function (value/*Boolean*/)/*void*/
	{
		this._enabled = value;
	};
	
	/*public*/
	d.get_framesLoaded = function ()/*int*/
	{
		return this._framesLoaded;
	};
	
	/*public*/
	d.get_scenes = function ()/*Array*/
	{
		return this._scenes;
	};
	
	/*public*/
	d.get_totalFrames = function ()/*int*/
	{
		return this._frames.length;
	};
	
	/*public*/
	d.get_trackAsMenu = function ()/*Boolean*/
	{
		return false;
	};
	
	/*public*/
	d.set_trackAsMenu = function (value/*Boolean*/)/*void*/
	{
		return value;
	};
	
	/*public*/
	d.get_isPlaying = function ()/*Boolean*/
	{
		return this._isPlaying;
	};
	
	
	/*public*/
	d.MovieClip = function ()
	{
		this._mcId = flash.display.MovieClip._lastId++;
		
		this._scenes = [];
		this._scripts = [];
		this._frames = [];
		
		//flash.display.MovieClip.__addObject__(this);
		
		this._currentFrame = 0;
		
		this.Sprite_constructor();
	};
	
	d.__nextFrame__ = function ()
	{
		//TODO
		if (this._framesLoaded < this._frames.length)
		{
			this._framesLoaded++;
		}
		
		
		if (this._isPlaying && this._frames.length)
		{
			this._currentFrame++;
			
			if (this._currentFrame >= this._frames.length)
			{
				this._currentFrame = 0;
				
				this.__frameConstruct__(true, true, true);
			}
		}
	};
	
	d.__frameProcessing__ = function ()
	{
		while (this._oldFrame != this._currentFrame)
		{
			this.__updateNames__();
			
			this._oldFrame = this._currentFrame;
			
			if (this.hasEventListener(flash.events.Event.FRAME_CONSTRUCTED))
			{
				this.dispatchEvent(new flash.events.Event(flash.events.Event.FRAME_CONSTRUCTED));
			}
			
			this._async = true;
			
			this._runFrameScript();
			
			this._async = false;
			
			if (this._targetFrame != -1)
			{
				this._currentFrame = this._targetFrame;
				this._targetFrame = -1;
				
				this.__frameConstruct__(true, true, true);
				
				this.__updateNames__();
			}
		}
	};
	
	d.__frameConstruct__ = function (remove, add, jump)
	{
		if (this._frames.length)
		{
			if (this._currentFrame < 0) this._currentFrame = 0;
			else if (this._currentFrame > this._frames.length - 1) this._currentFrame = this._frames.length - 1;
			
			if (this._updatedFrame != this._currentFrame)
			{
				this._updatedFrame = this._currentFrame;
				
				var frame = this._frames[ this._currentFrame ];
				
				this.__constructChildren__(frame, remove, add, jump);
			}
		}
	}
	
	d.__findByDepth__ = function (depth, property)
	{
		for (var j = this._currentFrame; j >= 0; j--)
		{
			var frame = this._frames[ j ];
			
			for (var i = 0; i < frame.places.length; i++)
			{
				var place = frame.places[ i ];
				
				if (place && place.depth == depth && place[ property ])
				{
					return place[ property ];
				}
			}
		}
		
		return null;
	};
	
	/*protected*/
	d.__updateMovieClipList__ = function ()
	{
		this.Sprite___updateMovieClipList__();
		
		flash.display.MovieClip.__addObject__(this);
	}
	
	/*public*/
	d.addFrameScript = function ()/*void*/
	{
		for (var i = 0; i < arguments.length; i += 2)
		{
			var frame = Math.floor(arguments[ i ]);
			var script = arguments[ i + 1 ];
			
			if (script != undefined)
			{
				this._scripts[ frame ] = script;
			}
		}
	};
	
	d._runFrameScript = function ()
	{
		var script = this._scripts[ this._currentFrame ];
		
		if (script)
		{
			script();
		}
	};
	
	/*public*/
	d.gotoAndPlay = function (frame/*Object*/, scene/*String*/)/*void*/
	{
		this._gotoFrame(frame, scene);
		
		this._isPlaying = true;
	};
	
	/*public*/
	d.gotoAndStop = function (frame/*Object*/, scene/*String*/)/*void*/
	{
		this._gotoFrame(frame, scene);
		
		this._isPlaying = false;
	};
	
	/*public*/
	d.nextFrame = function ()/*void*/
	{
		if (this._frames.length)
		{
			this._targetFrame = this._currentFrame + 1;
			
			if (this._targetFrame >= this._frames.length)
			{
				this._targetFrame = 0;
			}
		}
		
		this._checkFrameChange();
	};
	
	/*public*/
	d.nextScene = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.play = function ()/*void*/
	{
		this._isPlaying = true;
	};
	
	/*public*/
	d.prevFrame = function ()/*void*/
	{
		if (this._frames.length)
		{
			this._targetFrame = this._currentFrame - 1;
			
			if (this._targetFrame < 0)
			{
				this._targetFrame = this._frames.length - 1;
			}
		}
		
		this._checkFrameChange();
	};
	
	/*public*/
	d.prevScene = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.stop = function ()/*void*/
	{
		this._isPlaying = false;
	};
	
	d._getScene = function (sceneName)
	{
		for (var i = 0; i < this._scenes.length; i++)
		{
			var scene = this._scenes[ i ];
			
			if (scene.get_name() == sceneName) return scene;
		}
		
		return null;
	};
	
	d._gotoFrame = function (frame/*Object*/, sceneName/*String*/)/*void*/
	{
		var frameType = String(typeof(frame)).toLowerCase();
		
		if (frameType == "number" && Math.floor(frame) != frame)
		{
			frame = 1;
		}
		
		this._targetFrame = -1;
		var scene = null;
		var label = null;
		
		if (sceneName)
		{
			scene = this._getScene(sceneName);
			
			if (scene)
			{
				if (frameType == "number")
				{
					this._targetFrame = scene._offset + frame - 1;
				}
				else if (frameType == "string")
				{
					label = scene._getLabel(frame);
					
					if (label)
					{
						this._targetFrame = scene._offset + label.frame - 1;
					}
					else
					{
						throw new Error("FrameLabel " + frame + " was not found in Scene " + sceneName + ".");
					}
				}
			}
			else
			{
				throw new Error("Scene " + sceneName + " was not found.");
			}
		}
		else
		{
			scene = this.get_currentScene();
			
			if (frameType == "number")
			{
				this._targetFrame = (scene ? scene._offset : 0) + frame - 1;
			}
			else if (frameType == "string")
			{
				if (scene)
				{
					label = scene._getLabel(frame);
					
					if (label)
					{
						this._targetFrame = scene._offset + label.frame - 1;
					}
					else
					{
						throw new Error("FrameLabel " + frame + " was not found in currentScene " + scene.name + ".");
					}
				}
				else
				{
					this._targetFrame = this._getLabelFrame(frame);
					
					if (this._targetFrame == -1)
					{
						throw new Error("FrameLabel " + frame + " was not found.");
					}
				}
			}
		}
		
		this._checkFrameChange();
		
	};
	
	d._getLabelFrame = function (label)
	{
		for (var i = 0; i < this._frames.length; i++)
		{
			var frame = this._frames[ i ];
			
			if (frame.labels.indexOf(label) != -1)
			{
				return i;
			}
		}
		
		return -1;
	};
	
	d._checkFrameChange = function ()
	{
		if (this._targetFrame != -1 && this._currentFrame != this._targetFrame && !this._async)
		{
			this._currentFrame = this._targetFrame;
			this._targetFrame = -1;
			
			this.__frameConstruct__(true, true, true);
			
			this.__frameProcessing__();
		}
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.Sprite_constructor = this.__base__;
		/*super*/
		/*public*/
		this.prototype.Sprite___updateMovieClipList__ = this.__base__.prototype.__updateMovieClipList__;
		
		this.__movieClips = {};
		
		this._lastId = 0;
	};
	
	s.__clear__ = function ()
	{
		var objects = this.__movieClips;
		
		for (var i in objects)
		{
			var object = objects[ i ];
			
			object.__remove = true;
		}
	}
	
	s.__nextFrame__ = function ()
	{
		var objects = this.__movieClips;
		
		for (var i in objects)
		{
			var object = objects[ i ];
			
			object.__nextFrame__();
		}
	};
	
	s.__frameProcessing__ = function ()
	{
		var objects = this.__movieClips;
		
		for (var i in objects)
		{
			var object = objects[ i ];
			
			object.__frameProcessing__();
		}
	};
	
	s.__frameConstruct__ = function ()
	{
		var objects = this.__movieClips;
		
		for (var i in objects)
		{
			var object = objects[ i ];
			
			if (object.__remove)
			{
				this.__removeObject__(object);
			}
			else
			{
				object.__frameConstruct__(true, true, false);
			}
		}
	};
	
	s.__removeObject__ = function (object)
	{
		delete this.__movieClips[ object._mcId ];
	};
	
	s.__addObject__ = function (object)
	{
		object.__remove = false;
		
		this.__movieClips[ object._mcId ] = object;
	};
	
	flash.addDescription("flash.display.MovieClip", d, "flash.display.Sprite", s, null);
	
}
());
