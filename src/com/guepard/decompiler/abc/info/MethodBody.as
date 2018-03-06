package com.guepard.decompiler.abc.info
{
	import com.guepard.decompiler.abc.codes.Code;
	import com.guepard.decompiler.abc.traits.Trait;
	
	import flash.utils.ByteArray;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class MethodBody
	{
		public var method:MethodInfo;
		public var maxStack:uint;
		public var localCount:uint;
		public var initScopeDepth:uint;
		public var maxScopeDepth:uint;
		public var byteCode:ByteArray;
		public var exceptions:Array;
		public var traits:Array;
		public var code:Array;
		
		public var changed:Boolean = false;
		
		public function MethodBody()
		{
			
		}
		
		public function dispose():void
		{
			method = null;
			byteCode = null;
			exceptions = null;
			traits = null;
			code = null;
		}
		
		public function getCodeIndex(op:uint):int
		{
			var abcCode:Code;
			for (var i:uint = 0; i < code.length; i++)
			{
				abcCode = Code(code[i]);
				if (abcCode.operation == op)
				{
					return i;
				}
			}
			
			return -1;
		}
		
		public function insertCode(ind:uint, abcCode:Code):void
		{
			code.splice(ind, 0, abcCode);
		}
		
		public function removeCode(begin:uint, end:uint):Array
		{
			return code.splice(begin, end - begin);
		}
		
		public function clone():MethodBody
		{
			var body:MethodBody = new MethodBody();
			
			body.method = method;
			body.maxStack = maxStack
			body.localCount = localCount;
			body.initScopeDepth = initScopeDepth;
			body.maxScopeDepth = maxScopeDepth;
			body.byteCode = byteCode;
			body.exceptions = exceptions;
			body.traits = traits;
			
			body.code = [];
			for each(var abcCode:Code in code)
			{
				body.code.push(abcCode);
			}
			
			return body;
		}
		
		public function getInfo(tab:String = ""):String
		{
			var ret:String = "";
			
			if (traits && traits.length > 0)
			{
				ret += tab + "//traits";
				for each(var trait:Trait in traits)
				{
					ret += "\n" + tab + trait;
				}
			}
			
			if (code && code.length > 0)
			{
				ret += "\n\n" + tab + "//code";
				for each(var line:String in code)
				{
					ret += "\n" + tab + line;
				}
			}
			
			if (ret != "") ret += "\n" + tab;
			
			return ret;
		}
		
	}
	
}