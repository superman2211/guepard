package com.guepard.tests 
{
	/**
	 * ...
	 * @author 
	 */
	public class UnknownItem 
	{
		public var x, y, z, name, parameter;
		
		public function get length()
		{
			return Math.sqrt(x * x + y * y + z * z)
		}
		
		public function get unknown()
		{
			return null;
		}
		
		public function set unknown(value)
		{
			
		}
		
		public function UnknownItem(x = 0, y = 0, z = 0, name = "default", parameter = true) 
		{
			this.x = x;
			this.y = y;
			this.z = z;
			this.name = name;
			this.parameter = parameter;
		}
		
		public function clone()
		{
			return new UnknownItem(x, y, z);
		}
	}

}