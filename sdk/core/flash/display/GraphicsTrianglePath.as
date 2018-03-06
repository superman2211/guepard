package flash.display
{
	
	final public class GraphicsTrianglePath extends Object implements IGraphicsPath, IGraphicsData
	{
		public var indices:Vector.<int>;
		public var vertices:Vector.<Number>;
		public var uvtData:Vector.<Number>;
		
		public function get culling():String
		{
		}
		
		public function set culling(param1:String):void
		{
		}
		
		public function GraphicsTrianglePath(param1:Vector.<Number> = null, param2:Vector.<int> = null, param3:Vector.<Number> = null, param4:String = "none")
		{
		}
		
	}
}
