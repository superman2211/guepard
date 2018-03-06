package com.guepard.decompiler.abc.codes
{
	import com.guepard.decompiler.abc.info.MethodInfo;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Code
	{
		public static function createCodeFromOperation(op:uint):Code
		{
			var code:Code = new Code();
			code.operation = op;
			code.description = "created operation " + op;
			return code;
		}
		
		public var operation:uint;
		public var description:String;
		public var data:Object;
		public var methodInfo:MethodInfo;
		public var argumentCount:uint;
		public var switchValues:Array;
		public var switchPosition:uint;
		public var switchMaxIndex:uint;
		public var switchDefault:uint;
		public var debugType:uint;
		public var debugIndex:uint;
		public var debugRegisterIndex:uint;
		public var debugExtra:uint;
		public var hasnext2ObjectRegister:uint;
		public var hasnext2IndexRegister:uint;
		
		public function Code()
		{
			
		}
		
		public function toString():String
		{
			return description;
		}
	}
	
}