package 
{
	import flash.display.Loader;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.display.StageQuality;
	import flash.events.Event;
	import flash.events.TimerEvent;
	import flash.net.URLRequest;
	import flash.utils.Timer;
	import game.Cell;
	import game.Table;
	import resources.ResourceItem;
	import resources.ResourcesManager;
	import utils.Random;
	
	/**
	 * ...
	 * @author Sergey Antonov
	 */
	public class Main extends Sprite 
	{
		private var _table:Table;
		private var _background:MovieClip;
		
		public function Main():void 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			// entry point
			
			//stage.quality = StageQuality.LOW;
			
			loadResouces();
		}
		
		private function loadResouces():void 
		{
			ResourcesManager.addItem(new ResourceItem("design/items.swf"));
			ResourcesManager.addItem(new ResourceItem("design/background.swf"));
			ResourcesManager.load(loadResoucesComplete, loadResoucesProgress, loadResoucesError);
		}
		
		private function loadResoucesProgress(value:Number):void 
		{
			
		}
		
		private function loadResoucesError(message:String):void 
		{
			
		}
		
		private function loadResoucesComplete():void 
		{
			initGame();
		}
		
		private function initGame():void 
		{
			var item:ResourceItem = ResourcesManager.getItem("design/background.swf");
			
			_background = item.movieClip;
			addChild(_background);
			
			_table = new Table(6, 10, 40, 0.5);
			addChild(_table);
			
			_table.x = (stage.stageWidth - _table.width) / 2;
			_table.y = (stage.stageHeight - _table.height) / 2;
			
			//_table.generateCellsByType(3, 0);
			_table.generate(true);
			_table.updateLayout();
			
			startEyeTimer();
		}
		
		private function startEyeTimer():void 
		{
			var timer:Timer = new Timer(Random.randomUint(5000, 10000));
			timer.addEventListener(TimerEvent.TIMER, onEyeTimer);
			timer.start();
		}
		
		private function onEyeTimer(e:TimerEvent):void 
		{
			var timer:Timer = Timer(e.target);
			timer.removeEventListener(TimerEvent.TIMER, onEyeTimer);
			timer.stop();
			
			var cell:Cell = _table.getRandomCell();
			
			if (cell) cell.eyeAnimation();
			
			trace("onEyeTimer", cell);
			
			startEyeTimer();
		}
		
	}
	
}