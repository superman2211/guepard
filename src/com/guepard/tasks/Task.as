package com.guepard.tasks
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Task
	{
		public var method:Function;
		public var parameters:Array;
		public var name:String;
		public var tag:Object;
		public var startCallback:Function;
		public var completeCallback:Function;
		
		public function Task(method:Function,
		                     parameters:Array = null,
		                     tag:Object = null,
		                     startCallback:Function = null,
		                     completeCallback:Function = null)
		{
			this.method = method;
			this.parameters = parameters;
			this.completeCallback = completeCallback;
			this.startCallback = startCallback;
			this.tag = tag;
		}
		
		public function dispose():void
		{
			completeCallback = null;
			startCallback = null;
			name = null;
			method = null;
			parameters = null;
			tag = null;
		}
		
		public function execute():Boolean
		{
			return method.apply(null, parameters);
		}
		
		public function toString():String
		{
			return name;
		}
		
		public function start():void
		{
			if (startCallback != null) startCallback(this);
		}
		
		public function complete():void
		{
			if (completeCallback != null) completeCallback(this);
		}
	}
}