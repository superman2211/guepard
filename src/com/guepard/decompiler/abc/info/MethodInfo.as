package com.guepard.decompiler.abc.info
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class MethodInfo
	{
		public var returnType:MultinameInfo;
		public var paramTypes:Array;
		public var name:String;
		public var flags:uint;
		public var optionInfos:Array;
		public var paramInfos:Array;
		public var body:MethodBody;
		
		public function MethodInfo()
		{
			
		}
		
		public function dispose():void
		{
			returnType = null;
			paramTypes = null;
			optionInfos = null;
			paramInfos = null;
			body = null;
		}
		
		public function clone():MethodInfo
		{
			var methodInfo:MethodInfo = new MethodInfo();
			methodInfo.returnType = returnType;
			methodInfo.paramTypes = paramTypes;
			methodInfo.name = name;
			methodInfo.flags = flags;
			methodInfo.optionInfos = optionInfos;
			methodInfo.paramInfos = paramInfos;
			methodInfo.body = body.clone();
			methodInfo.body.method = methodInfo;
			methodInfo.body.changed = true;
			return methodInfo;
		}
		
		public function getInfo(tab:String = ""):String
		{
			var s:String = tab + toString() + "\n";
			s += tab + "{\n";
			for each(var line:String in body.code)
			{
				s += tab + "\t" + line + "\n";
			}
			s += tab + "}";
			return s;
		}
		
		public function toString():String
		{
			var ret:String = "(";
			
			var mnm:MultinameInfo;
			var opt:OptionInfo;
			var di:uint;
			
			for (var i:uint = 0; i < paramTypes.length; i++)
			{
				if (paramInfos)
				{
					ret += paramInfos[i] + ":";
				}
				else
				{
					ret += "_loc" + i + ":";
				}
				
				mnm = MultinameInfo(paramTypes[i]);
				if (mnm)
				{
					ret += mnm.name;
				}
				else
				{
					ret += "null";
				}
				
				if (optionInfos && optionInfos.length > 0)
				{
					di = paramTypes.length - optionInfos.length;
					if (i >= di)
					{
						opt = OptionInfo(optionInfos[i - di]);
						if (opt.value is String)
						{
							ret += ' = "' + opt.value + '"';
						}
						else
						{
							ret += " = " + opt.value;
						}
					}
				}
				if (i < paramTypes.length - 1) ret += ", ";
			}
			
			if (returnType)
			{
				ret += "):" + returnType.name;
			}
			else
			{
				ret += "):void";
			}
			
			return ret;
		}
	}
	
}