package com.guepard.parser.token
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class MergeData
	{
		public var join:Boolean;
		public var data:String;
		public var type:String;
		public var end:Array;
		public var begin:Array;
		public var ignore:Array;
		
		public function MergeData(begin:Array, end:Array, type:String, data:String, join:Boolean, ignore:Array)
		{
			this.join = join;
			this.data = data;
			this.type = type;
			this.end = end;
			this.begin = begin;
			this.ignore = ignore;
		}
	}
}