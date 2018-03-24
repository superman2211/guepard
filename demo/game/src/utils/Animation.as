package utils 
{
	import flash.display.Sprite;
	import flash.display.StageQuality;
	import flash.events.Event;
	
	/**
	 * ...
	 * @author 
	 */
	public class Animation
	{
		public static const LINEAR:uint = 0;
		
		public static const FADE_OUT_TRIG:uint = 1;
		public static const FADE_IN_TRIG:uint = 2;
		public static const SOFT_TRIG:uint = 3;
		
		public static const FADE_OUT_SQUARE:uint = 4;
		public static const FADE_IN_SQUARE:uint = 5;
		public static const SOFT_SQUARE:uint = 6;
		
		public static const FADE_OUT_CUBE:uint = 7;
		public static const FADE_IN_CUBE:uint = 8;
		public static const SOFT_CUBE:uint = 9;
		
		private static var _animations:Array;
		static private var _sprite:Sprite;
		
		private var _object:Object;
		private var _property:String;
		private var _value:Number;
		private var _frames:uint;
		private var _currentFrame:uint;
		private var _type:uint;
		private var _start:Number;
		private var _pause:Boolean;
		private var _offset:uint;
		private var _completeHandler:Function;
		private var _inited:Boolean;
		
		public function get pause():Boolean { return _pause; }
		
		public function set pause(value:Boolean):void 
		{
			_pause = value;
		}
		
		public function get object():Object { return _object; }
		
		public function get property():String { return _property; }
		
		public function get value():Number { return _value; }
		
		public function get frames():uint { return _frames; }
		
		public function get currentFrame():uint { return _currentFrame; }
		
		public function set currentFrame(value:uint):void 
		{
			_currentFrame = value;
		}
		
		public function get type():uint { return _type; }
		
		public function set type(value:uint):void 
		{
			_type = value;
		}
		
		public function get start():Number { return _start; }
		
		public function set start(value:Number):void 
		{
			_start = value;
		}
		
		public function get offset():uint { return _offset; }
		
		public function set offset(value:uint):void 
		{
			_offset = value;
		}
		
		public function get completeHandler():Function { return _completeHandler; }
		
		public function set completeHandler(value:Function):void 
		{
			_completeHandler = value;
		}
		
		public function Animation(object:Object, property:String, value:Number, frames:uint, type:uint, offset:uint, completeHandler:Function) 
		{
			if (!_animations) init();
			
			_frames = frames;
			_value = value;
			_property = property;
			_object = object;
			_type = type;
			_offset = offset;
			_completeHandler = completeHandler;
			
			_currentFrame = 0;
			_pause = false;
			
			initStart();
			
			_animations[_animations.length] = this;
		}
		
		private function initStart():void 
		{
			if (!_inited && !_offset)
			{
				_start = Number(_object[_property]);
				_inited = true;
			}
		}
		
		public static function animate(object:Object, property:String, value:Number, frames:uint = 100, type:uint = Animation.LINEAR, offset:uint = 0, completeHandler:Function = null):Animation
		{
			if (!object || !property) return null;
			
			return new Animation(object, property, value, frames, type, offset, completeHandler);
		}
		
		public static function stopByObjectProperty(object:Object, property:String):void
		{
			if (_animations)
			{
				for (var i:int = 0; i < _animations.length; i++) 
				{
					var animation:Animation = _animations[i];
					
					if (animation._object == object && animation._property == property)
					{
						animation.stop();
						i--;
					}
				}
			}
		}
		
		public static function stopByObject(object:Object):void
		{
			if (_animations)
			{
				for (var i:int = 0; i < _animations.length; i++) 
				{
					var animation:Animation = _animations[i];
					
					if (animation._object == object)
					{
						animation.stop();
						i--;
					}
				}
			}
		}
		
		public function stop():void
		{
			dispose();
			
			var index:int = _animations.indexOf(this);
			
			if (index != -1)
			{
				_animations.splice(index, 1);
			}
		}
		
		public static function stopAll():void
		{
			if (_animations)
			{
				for each(var animation:Animation in _animations)
				{
					animation.dispose();
				}
				
				_animations.length = 0;
			}
		}
		
		private function dispose():void 
		{
			_object = null;
			_property = null;
			_completeHandler = null;
		}
		
		public static function pauseAll():void
		{
			for each(var animation:Animation in _animations)
			{
				animation._pause = true;
			}
		}
		
		public static function resumeAll():void
		{
			for each(var animation:Animation in _animations)
			{
				animation._pause = false;
			}
		}
		
		static public function getAnimationByObject(object:Object):Animation
		{
			for each(var animation:Animation in _animations)
			{
				if (animation._object == object) return animation;
			}
			
			return null;
		}
		
		private static function init():void 
		{
			_animations = new Array();
			_sprite = new Sprite();
			_sprite.addEventListener(Event.ENTER_FRAME, enterFrame);
		}
		
		static private function enterFrame(e:Event):void 
		{
			for each(var animation:Animation in _animations)
			{
				animation.update();
			}
			
			/*if (_animations.length)
			{
				App.app.stage.quality = StageQuality.LOW;
			}
			else
			{
				App.app.stage.quality = StageQuality.HIGH;
			}//*/
		}
		
		private function update():void 
		{
			if (_pause) return;
			
			if(_offset)
			{
				_offset--;
				return;
			}
			
			initStart();
			
			_currentFrame++;
			
			if (_currentFrame <= _frames)
			{
				var procent:Number = _currentFrame / _frames;
				var distance:Number = _value - _start;
				
				switch(_type)
				{
					case LINEAR:
					_object[_property] = _start + distance * procent;
					break;
					
					case FADE_IN_TRIG:
					_object[_property] = _start + distance * Math.sin(procent * Math.PI * 0.5);
					break;
					
					case FADE_OUT_TRIG:
					_object[_property] = _start + distance * (1 - Math.sin((1 - procent) * Math.PI * 0.5));
					break;
					
					case SOFT_TRIG:
					_object[_property] = _start + distance * (1 - Math.cos(procent * Math.PI)) * 0.5;
					break;
					
					case FADE_IN_SQUARE:
					_object[_property] = _start + distance * (1 - (1 - procent) * (1 - procent));
					break;
					
					case FADE_OUT_SQUARE:
					_object[_property] = _start + distance * procent * procent;
					break;
					
					case SOFT_SQUARE:
					if (procent < 0.5)
					{
						_object[_property] = _start + distance * procent * procent * 2;
					}
					else
					{
						_object[_property] = _start + distance * (1 - (1 - procent) * (1 - procent) * 2);
					}
					break;
					
					case FADE_IN_CUBE:
					_object[_property] = _start + distance * (1 - (1 - procent) * (1 - procent) * (1 - procent));
					break;
					
					case FADE_OUT_CUBE:
					_object[_property] = _start + distance * procent * procent * procent;
					break;
					
					case SOFT_CUBE:
					if (procent < 0.5)
					{
						_object[_property] = _start + distance * procent * procent * procent * 4;
					}
					else
					{
						_object[_property] = _start + distance * (1 - (1 - procent) * (1 - procent) * (1 - procent) * 4);
					}
					break;
				}
			}
			else
			{
				if(_object) _object[_property] = _value;
				
				if (_completeHandler != null) _completeHandler(this);
				
				stop();
			}
		}
	}
}