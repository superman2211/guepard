package
{
	
	public dynamic class Object
	{
		public static var prototype:Object;
		
		public function Object()
		{
		}
		
		public function hasOwnProperty(V:Object = null):Boolean
		{
			return false;
		}
		
		public function isPrototypeOf(V:Object = null):Boolean
		{
			return false;
		}
		
		public function propertyIsEnumerable(V:Object = null):Boolean
		{
			return false;
		}
		
		public function setPropertyIsEnumerable(name:String, isEnum:Boolean = true):void
		{
			
		}
		
		public function toLocaleString():String
		{
			return null;
		}
		
		public function toString():String
		{
			return null;
		}
		
		public function valueOf():Object
		{
			return null;
		}
	}
}
