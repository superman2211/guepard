package game 
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import resources.ResourceItem;
	import resources.ResourcesManager;
	import utils.Animation;
	import utils.Random;
	/**
	 * ...
	 * @author Sergey Antonov
	 */
	public class Cell extends Sprite
	{	
		private var _type:int;
		private var _size:Number;
		private var _column:int;
		private var _row:int;
		private var _design:MovieClip;
		private var _targetY:Number;
		private var _amplitudeY:Number;
		
		public function get type():int 
		{
			return _type;
		}
		
		public function get size():Number 
		{
			return _size;
		}
		
		public function get column():int 
		{
			return _column;
		}
		
		public function set column(value:int):void 
		{
			_column = value;
		}
		
		public function get row():int 
		{
			return _row;
		}
		
		public function set row(value:int):void 
		{
			_row = value;
		}
		
		public function Cell(column:int, row:int, type:int, size:Number) 
		{
			_row = row;
			_column = column;
			
			_size = size;
			_type = type;
			
			draw();
			
			_targetY = 0;
		}
		
		private function draw():void 
		{
			var designName:String;
			
			switch(_type)
			{
				case 0:
					designName = "BeeDesign";
					break;
					
				case 1:
					designName = "DragonflyDesign";
					break;
					
				case 2:
					designName = "LadybirdDesign";
					break;
					
				case 3:
					designName = "MosquitoDesign";
					break;
			}
			
			var item:ResourceItem = ResourcesManager.getItem("design/items.swf");
			
			var DesignClass:Class = item.getClass(designName);
			
			_design = MovieClip(new DesignClass());
			_design.rotation = Random.randomNumber( -20, 20);
			_design.x = _size / 2 + Random.randomNumber(-3, 3);
			_design.y = _size / 2 + Random.randomNumber(-3, 3);
			addChild(_design);
			
			graphics.clear();
			graphics.beginFill(0, 0);
			graphics.drawEllipse(0, 0, _size, _size);
			
			_design.eyeRight.addFrameScript(0, function() {
				_design.eyeRight.stop();
			});
			
			_design.eyeLeft.addFrameScript(0, function() {
				_design.eyeLeft.stop();
			});
		}
		
		public function eyeAnimation():void
		{
			_design.eyeRight.play();
			_design.eyeLeft.play();
		}
		
		public function fall(targetY:Number, offset:int):void 
		{
			_targetY = targetY;
			
			if (y != _targetY)
			{
				_amplitudeY = (_targetY - y) / 5;
				
				if (_amplitudeY > 10) _amplitudeY = 10;
				
				Animation.stopByObject(this);
				Animation.animate(this, "y", _targetY + _amplitudeY, 20, Animation.FADE_OUT_SQUARE, 0, fallComplete);
				//Animation.animate(_design, "rotation", rotation + Random.randomNumber(-5, 5), 20, Animation.LINEAR);
			}
		}
		
		private function fallComplete(a:Animation):void 
		{
			_amplitudeY = -_amplitudeY / 2;
			
			if (Math.abs(_amplitudeY) < 1)
			{
				y = _targetY;
			}
			else
			{
				Animation.animate(this, "y", _targetY + _amplitudeY, 5, Animation.SOFT_SQUARE, 0, fallComplete);
			}
		}
	}
}