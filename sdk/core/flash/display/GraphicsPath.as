package flash.display
{
	
	final public class GraphicsPath extends Object implements IGraphicsPath, IGraphicsData
	{
		public var commands:Vector.<int>;
		public var data:Vector.<Number>;
		
		public function get winding():String
		{
		}
		
		public function set winding(param1:String):void
		{
		}
		
		public function GraphicsPath(param1:Vector.<int> = null, param2:Vector.<Number> = null, param3:String = "evenOdd")
		{
		}
		
		public function moveTo(param1:Number, param2:Number):void
		{
		}
		
		public function lineTo(param1:Number, param2:Number):void
		{
		}
		
		public function curveTo(param1:Number, param2:Number, param3:Number, param4:Number):void
		{
		}
		
		public function cubicCurveTo(param1:Number, param2:Number, param3:Number, param4:Number, param5:Number, param6:Number):void
		{
		}
		
		public function wideLineTo(param1:Number, param2:Number):void
		{
		}
		
		public function wideMoveTo(param1:Number, param2:Number):void
		{
		}
		
	}
}
