package utils 
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Random
	{
		public static function randomNumber(min:Number = 0, max:Number = 1):Number
		{
			return min + Math.random() * (max - min);
		}
		
		public static function randomUint(min:uint = 0, max:uint = 100):uint
		{
			return uint(Math.round(min + Math.random() * (max - min)));
		}
		
		public static function randomInt(min:int = 0, max:int = 100):int
		{
			return int(Math.round(min + Math.random() * (max - min)));
		}
		
		public static function chance(number:Number = 0.5):Boolean
		{
			return Math.random() < number;
		}
		
		static public function select(... args):Object
		{
			var rnd:uint = randomUint(0, args.length - 1);
			return args[rnd];
		}
		
		static public function selectFromArray(array:Array):Object 
		{
			var rnd:uint = randomUint(0, array.length - 1);
			return array[rnd];
		}
		
		static public function selectFromVector(vector:Object):Object
		{
			var rnd:uint = randomUint(0, vector.length - 1);
			return vector[rnd];
		}
		
		static public function randomSign():Number
		{
			return Math.random() < 0.5 ? 1 : -1;
		}
		
		
	}
}