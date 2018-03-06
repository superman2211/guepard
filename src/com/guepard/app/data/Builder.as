package com.guepard.app.data
{
	import com.guepard.tasks.TaskManager;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Builder
	{
		private var _progressHandler:Function;
		private var _completeHandler:Function;
		
		private var _name:String;
		
		public function get name():String
		{
			return _name;
		}
		
		private var _tasks:TaskManager;
		
		public function get tasks():TaskManager
		{
			return _tasks;
		}
		
		public function Builder(name:String)
		{
			_name = name;
			
			_tasks = new TaskManager();
		}
		
		public function start(completeHandler:Function, progressHandler:Function):void
		{
			_completeHandler = completeHandler;
			_progressHandler = progressHandler;
		}
		
		public function dispose():void
		{
			_progressHandler = null;
			_completeHandler = null;
			_name = null;
			
			if (_tasks)
			{
				_tasks.dispose();
				_tasks = null;
			}
		}
		
		public function progress(value:Number):void
		{
			if (_progressHandler != null)
			{
				_progressHandler(value);
			}
		}
		
		public function complete():void
		{
			if (_completeHandler != null)
			{
				_completeHandler();
			}
		}
		
		public function stop():void
		{
			_tasks.stop();
			_tasks.removeTasks();
		}
	}
}