package com.guepard.app.gui
{
	import flash.display.InteractiveObject;
	import flash.events.Event;
	import flash.events.FileListEvent;
	import flash.events.MouseEvent;
	import flash.filesystem.File;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class BrowseController
	{
		private var _textField:Object;
		private var _button:InteractiveObject;
		private var _filters:Array;
		private var _multiply:Boolean;
		
		public function BrowseController(textField:Object, button:InteractiveObject, filters:Array = null, multiply:Boolean = false)
		{
			_multiply = multiply;
			_filters = filters;
			_button = button;
			_textField = textField;
			
			_button.addEventListener(MouseEvent.CLICK, click);
		}
		
		private function click(e:MouseEvent):void
		{
			var file:File = new File();
			
			if (_textField.text && _textField.text != "")
			{
				try
				{
					file.nativePath = _textField.text;
				}
				catch (error:Error)
				{
					
				}
			}
			
			if (_filters)
			{
				if (_multiply)
				{
					file.addEventListener(FileListEvent.SELECT_MULTIPLE, selectMultiple);
					file.browseForOpenMultiple("Select Files", _filters);
				}
				else
				{
					file.addEventListener(Event.SELECT, select);
					file.browseForOpen("Select File", _filters);
				}
			}
			else
			{
				file.addEventListener(Event.SELECT, select);
				file.browseForDirectory("Select Directory");
			}
		}
		
		private function select(e:Event):void
		{
			var file:File = File(e.target);
			file.removeEventListener(Event.SELECT, select);
			
			_textField.text = file.nativePath;
			_textField.dispatchEvent(new Event(Event.CHANGE));
		}
		
		private function selectMultiple(e:FileListEvent):void
		{
			var file:File = File(e.target);
			file.removeEventListener(Event.SELECT, selectMultiple);
			
			var files:Array = [];
			
			for each(var f:File in e.files)
			{
				files.push(f.nativePath);
			}
			
			_textField.text = files.join(";");
			_textField.dispatchEvent(new Event(Event.CHANGE));
		}
		
	}
	
}