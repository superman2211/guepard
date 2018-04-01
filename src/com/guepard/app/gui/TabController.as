package com.guepard.app.gui
{
	import com.guepard.app.Converter;
	import com.guepard.app.data.Builder;
	
	import fl.controls.CheckBox;
	import fl.controls.ComboBox;
	import fl.controls.TextInput;
	
	import flash.display.DisplayObject;
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.filesystem.File;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TabController extends Controller
	{
		private var _defaults:Object;
		
		public function TabController(design:MovieClip)
		{
			super(design);
			
			for (var i:int = 0; i < design.numChildren; i++)
			{
				var child:DisplayObject = design.getChildAt(i);
				
				if (child.name.substring(0, 8) != "instance")
				{
					child.addEventListener(Event.CHANGE, change);
				}
			}
		}
		
		public function getDefaults():void
		{
			_defaults = getData();
		}
		
		public function resetDefaults():void
		{
			setData(_defaults);
		}
		
		public function addBuilders(builders:Vector.<Builder>):void
		{
			
		}
		
		public function getData():Object
		{
			var data:Object = {};
			
			for (var i:int = 0; i < design.numChildren; i++)
			{
				var child:Object = design.getChildAt(i);
				
				if (child.name.substring(0, 8) != "instance")
				{
					if (child is TextInput)
					{
						data[child.name] = TextInput(child).text;
					}
					else if (child is CheckBox)
					{
						data[child.name] = CheckBox(child).selected;
					}
					else if (child is ComboBox)
					{
						data[child.name] = ComboBox(child).selectedIndex;
					}
					else if (child.hasOwnProperty("value"))
					{
						data[child.name] = child.value;
					}
				}
			}
			
			return data;
		}
		
		public function setData(data:Object):void
		{
			if (data)
			{
				for (var i:int = 0; i < design.numChildren; i++)
				{
					var child:Object = design.getChildAt(i);
					
					if (child.name.substring(0, 8) != "instance")
					{
						if (data[child.name] != undefined)
						{
							if (child is TextInput)
							{
								TextInput(child).text = data[child.name];
							}
							else if (child is CheckBox)
							{
								CheckBox(child).selected = data[child.name];
							}
							else if (child is ComboBox)
							{
								ComboBox(child).selectedIndex = int(data[child.name]);
							}
							else if (child.hasOwnProperty("value"))
							{
								child.value = Number(data[child.name]);
							}
						}
					}
				}
			}
		}
		
		protected function getFile(path:String):File
		{
			try
			{
				return new File(path);
			}
			catch (error:Error)
			{
				
			}
			
			return null;
		}
		
		protected function resolvePath(file:File, path:String):File
		{
			if (file && path)
			{
				return file.resolvePath(path);
			}
			else
			{
				return null;
			}
		}
		
		protected function change(e:Event):void
		{
			Converter.changeProject();
		}
	}
	
}