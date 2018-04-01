package
{
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	public class Main extends Sprite
	{
		public function Main()
		{
			stage.frameRate = 60;
			
			var sprite:Sprite = new Sprite();
			sprite.useHandCursor = sprite.buttonMode = true;
			sprite.addEventListener(MouseEvent.MOUSE_DOWN, spriteMouseDown);
			addChild(sprite);
			
			var graphics:Graphics = sprite.graphics;
			
			// rectangle
			graphics.beginFill(0xff0000, 0.5);
			graphics.lineStyle(3, 0x000000, 1);
			graphics.drawRect(100, 100, 200, 150);
			graphics.endFill();
			
			// rounded rectangle
			graphics.beginFill(0x0000ff, 0.5);
			graphics.lineStyle(3, 0x009900);
			graphics.drawRoundRect(10, 10, 100, 70, 20, 20);
			graphics.endFill();
			
			// circle
			graphics.beginFill(0x00ff00, 0.5);
			graphics.lineStyle(5, 0x0000ff);
			graphics.drawCircle(250, 250, 70);
			graphics.endFill();
			
			// path
			graphics.beginFill(0x0000ff, 0.3);
			graphics.lineStyle(10, 0x000000);
			graphics.moveTo(125, 125);
			graphics.lineTo(225, 150);
			graphics.lineTo(275, 300);
			graphics.lineStyle(5, 0x0000ff);
			graphics.lineTo(145, 350);
			graphics.endFill();
			
			// cross
			graphics.beginFill(0x00ff00, 0.5);
			graphics.lineStyle(3);
			graphics.moveTo(320, 70);
			graphics.lineTo(420, 50);
			graphics.lineTo(370, 140);
			graphics.moveTo(320, 140);
			graphics.lineTo(420, 160);
			graphics.lineTo(370, 80);
			graphics.endFill();
			
			// curve
			graphics.lineStyle(10, 0xff00ff);
			graphics.moveTo(50,50);
			graphics.curveTo(100,10, 200,100);
			graphics.cubicCurveTo(200, 200, 0, 200, 40, 300);
			graphics.endFill();
			
			// fill
			graphics.lineStyle();
			graphics.beginFill(0x999999);
			graphics.moveTo(350, 250);
			graphics.lineTo(450, 250);
			graphics.beginFill(0xff9999);
			graphics.lineTo(450, 350);
			graphics.lineTo(350, 350);
			graphics.endFill();
		}
		
		private function spriteMouseDown(event:MouseEvent):void
		{
			var sprite:Sprite = event.currentTarget as Sprite;
			
			sprite.startDrag();
			
			stage.addEventListener(MouseEvent.MOUSE_UP, stageMouseUp);
		}
		
		private function stageMouseUp(event:MouseEvent):void
		{
			var sprite:Sprite = Sprite(getChildAt(0));
			sprite.stopDrag();
			
			stage.removeEventListener(MouseEvent.MOUSE_UP, stageMouseUp);
		}
	}
}
