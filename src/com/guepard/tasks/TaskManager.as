package com.guepard.tasks
{
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	import flash.utils.getTimer;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TaskManager
	{
		private var _tasks:Vector.<Task>;
		private var _progressHandler:Function;
		private var _completeHandler:Function;
		private var _timer:Timer;
		
		private var _totalTasks:int;
		
		public function get totalTasks():int
		{
			return _totalTasks;
		}
		
		private var _delay:Number;
		
		public function get delay():Number
		{
			return _timer.delay;
		}
		
		public function set delay(value:Number):void
		{
			_timer.delay = value;
		}
		
		public function get currentTask():Task
		{
			if (_tasks.length)
			{
				return _tasks[0];
			}
			else
			{
				return null;
			}
		}
		
		public function get lastTask():Task
		{
			if (_tasks.length)
			{
				return _tasks[_tasks.length - 1];
			}
			else
			{
				return null;
			}
		}
		
		public function get numTasks():uint
		{
			return _tasks.length;
		}
		
		public function TaskManager(delay:Number = 30)
		{
			_delay = delay;
			
			_tasks = new Vector.<Task>();
			
			_timer = new Timer(1);
			_timer.addEventListener(TimerEvent.TIMER, update);
		}
		
		public function containsByName(name:String):Boolean
		{
			for each(var task:Task in _tasks)
			{
				if (task.name == name)
				{
					return true;
				}
			}
			
			return false;
		}
		
		public function addTask(task:Task, urgent:Boolean = false):void
		{
			if (urgent)
			{
				_tasks.unshift(task);
			}
			else
			{
				_tasks.push(task);
			}
		}
		
		public function getTaskAt(index:uint):Task
		{
			if (index < _tasks.length)
			{
				return _tasks[index];
			}
			else
			{
				return null;
			}
		}
		
		public function getTaskByName(name:String):Task
		{
			for each(var task:Task in _tasks)
			{
				if (task.name == name)
				{
					return task;
				}
			}
			
			return null;
		}
		
		public function removeTask(task:Task):void
		{
			var index:int = _tasks.indexOf(task);
			
			if (index != -1)
			{
				_tasks.splice(index, 1);
			}
		}
		
		public function removeTaskAt(index:uint):void
		{
			if (index < _tasks.length)
			{
				_tasks.splice(index, 1);
			}
		}
		
		public function removeTaskByName(name:String):void
		{
			for (var i:int = 0; i < _tasks.length; i++)
			{
				var task:Task = _tasks[i];
				
				if (task.name == name)
				{
					_tasks.splice(i, 1);
					return;
				}
			}
		}
		
		public function removeTasks():void
		{
			_tasks.length = 0;
		}
		
		public function start(completeHandler:Function = null, progressHandler:Function = null):void
		{
			_completeHandler = completeHandler;
			_progressHandler = progressHandler;
			
			if (_tasks.length)
			{
				_totalTasks = _tasks.length;
				
				_timer.start();
			}
			else
			{
				if (_completeHandler != null)
				{
					_completeHandler();
				}
			}
		}
		
		public function stop():void
		{
			_timer.stop();
		}
		
		public function dispose():void
		{
			if (_tasks)
			{
				for each(var task:Task in _tasks)
				{
					task.dispose();
				}
				
				_tasks.length = 0;
				_tasks = null;
			}
			
			if (_timer)
			{
				_timer.stop();
				_timer.removeEventListener(TimerEvent.TIMER, update);
				_timer = null;
			}
		}
		
		private function update(e:TimerEvent):void
		{
			_timer.stop();
			
			var time:int = getTimer();
			
			while (getTimer() - time < _delay)
			{
				var task:Task = currentTask;
				
				if (task.execute())
				{
					task.complete();
					
					removeTask(task);
					
					task.dispose();
					
					if (_progressHandler != null)
					{
						_progressHandler(1 - _tasks.length / _totalTasks);
					}
					
					task = currentTask;
					
					if (task)
					{
						task.start();
					}
					else
					{
						stop();
						
						if (_completeHandler != null)
						{
							_completeHandler();
						}
						
						return;
					}
				}
			}
			
			_timer.start();
		}
	}
}