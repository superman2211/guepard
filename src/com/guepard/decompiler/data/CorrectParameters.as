package com.guepard.decompiler.data
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class CorrectParameters
	{
		public var swf:SWFData;
		public var list:TagList;
		public var defines:Object;
		public var scale:Number;
		public var stage:Boolean;
		
		public function CorrectParameters(swf:SWFData, list:TagList, defines:Object, scale:Number, stage:Boolean)
		{
			this.swf = swf;
			this.list = list;
			this.defines = defines;
			this.scale = scale;
			this.stage = stage;
		}
		
		public function clone():CorrectParameters
		{
			return new CorrectParameters(swf, list, defines, scale, stage);
		}
	}
	
}