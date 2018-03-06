package com.guepard.tests 
{
	import flash.utils.setTimeout;
	
	/**
	 * ...
	 * @author 
	 */
	public class Vertex implements IExample
	{
		public var x:Number
		public var y:Number
		public var z:Number
		
		public function get example():Number
		{
			return x + y + z
		}
		
		public function set example(value:Number):void
		{
			x = y = z = value / 3
		}
		
		public function get length():Number
		{
			return Math.sqrt(x * x + y * y + z * z)
		}
		
		public function set length(value:Number):void
		{
			var l:Number = this.length;
			
			if (l != 0)
			{
				l = value / l;
				
				x *= l;
				y *= l;
				z *= l;
			}
		}
		
		public function Vertex(x:Number = 0, y:Number = 0, z:Number = 0) 
		{
			this.x = x
			this.y = y
			this.z = z
			
			setTimeout(function():void {
				this.x = 10;
			}, 1000);
		}
		
		public function add(vertex:Vertex):void
		{
			this.x += vertex.x
			this.y += vertex.y
			this.z += vertex.z
		}
		
		public function subtract(vertex:Vertex):void
		{
			this.x -= vertex.x
			this.y -= vertex.y
			this.z -= vertex.z
		}
		
		public static function distance(vertex0:Vertex, vertex1:Vertex):Number
		{
			var dx:Number = vertex0.x - vertex1.x
			var dy:Number = vertex0.y - vertex1.y
			var dz:Number = vertex0.z - vertex1.z
			
			return Math.sqrt(dx * dx + dy * dy + dz * dz)
		}
		
		public function test():void
		{
			var v1:Vertex = new Vertex(1, 2, 3)
			var v2:Vertex = new Vertex(4, 5, 6)
			var d:Number = Vertex.distance(v1, v2)
		}
	}

}