package
{
	
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.FocusEvent;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	
	public class Main extends Sprite
	{
		var output:TextField;
		var sprite:Sprite;
		
		var down:Boolean = false;
		var over:Boolean = false;
		
		var eventStageX:Number = 0;
		var eventStageY:Number = 0;
		
		var eventLocalX:Number = 0;
		var eventLocalY:Number = 0;
		
		public function Main()
		{
			output = new TextField();
			output.defaultTextFormat = new TextFormat("arial", 15);
			output.autoSize = TextFieldAutoSize.LEFT;
			addChild(output);
			
			sprite = new Sprite();
			
			sprite.x = 200;
			sprite.y = 200;
			sprite.rotation = 30;
			
			sprite.graphics.beginFill(0x009900);
			sprite.graphics.drawRect(0,0,100,100);
			
			sprite.addEventListener(MouseEvent.MOUSE_MOVE, mouseMove);
			sprite.addEventListener(MouseEvent.MOUSE_DOWN, mouseDown);
			sprite.addEventListener(MouseEvent.MOUSE_UP, mouseUp);
			sprite.addEventListener(MouseEvent.MOUSE_OVER, mouseOver);
			sprite.addEventListener(MouseEvent.MOUSE_OUT, mouseOut);
			
			addChild(sprite);
			
			addEventListener(Event.ENTER_FRAME, update);
		}
		
		private function update(event:Event):void
		{
			output.text = [
				"Down: " + down,
				"Over: " + over,
				"",
				"event.localX: " + eventLocalX,
				"event.localY: " + eventLocalY,
				"sprite.mouseX: " + sprite.mouseX,
				"sprite.mouseY: " + sprite.mouseY,
				"",
				"event.stageX: " + eventStageX,
				"event.stageY: " + eventStageY,
				"stage.mouseX: " + stage.mouseX,
				"stage.mouseY: " + stage.mouseY,
			].join("\n");
		}
		
		private function mouseOut(event:MouseEvent):void
		{
			sprite.alpha = 1;
			
			over = false;
		}
		
		private function mouseOver(event:MouseEvent):void
		{
			sprite.alpha = 0.5;
			
			over = true;
		}
		
		private function mouseUp(event:MouseEvent):void
		{
			down = false;
		}
		
		private function mouseDown(event:MouseEvent):void
		{
			down = true;
		}
		
		private function mouseMove(event:MouseEvent):void
		{
			eventLocalX = event.localX;
			eventLocalY = event.localY;
			
			eventStageX = event.stageX;
			eventStageY = event.stageY;
		}
	}
}
