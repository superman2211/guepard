package com.guepard.app
{
	import com.guepard.app.data.Builder;
	import com.guepard.app.data.Project;
	import com.guepard.app.gui.OutputController;
	import com.guepard.app.gui.ParametersTab;
	import com.guepard.app.gui.ResourcesTab;
	import com.guepard.app.gui.SettingsTab;
	import com.guepard.app.gui.SourceTab;
	import com.guepard.app.gui.SplitterController;
	import com.guepard.app.gui.TargetTab;
	
	import flash.desktop.NativeApplication;
	import flash.display.NativeMenu;
	import flash.display.NativeMenuItem;
	import flash.display.NativeWindow;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.TimerEvent;
	import flash.filesystem.File;
	import flash.net.FileFilter;
	import flash.net.SharedObject;
	import flash.system.Capabilities;
	import flash.utils.Timer;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Converter extends Sprite
	{
		public static var app:Converter;
		public static var zoom:Number = 1;
		public static var source:SourceTab;
		public static var parameters:ParametersTab;
		public static var resources:ResourcesTab;
		public static var target:TargetTab;
		public static var settings:SettingsTab;
		public static var output:OutputController;
		public static var project:Project;
		private static var _instance:Converter;
		
		private static var _sharedObject:SharedObject;
		
		static public function get sharedObject():SharedObject
		{
			return _sharedObject;
		}
		
		public static function get enabled():Boolean
		{
			return source.enabled;
		}
		
		public static function set enabled(value:Boolean):void
		{
			source.enabled = value;
			parameters.enabled = value;
			resources.enabled = value;
			target.enabled = value;
			settings.enabled = value;
		}
		
		public static function changeProject():void
		{
			if (project)
			{
				project.changed = true;
				
				_instance.updateTitle();
			}
		}
		
		public static function getBuilders():Vector.<Builder>
		{
			var builders:Vector.<Builder> = new Vector.<Builder>();
			
			source.addBuilders(builders);
			parameters.addBuilders(builders);
			resources.addBuilders(builders);
			target.addBuilders(builders);
			settings.addBuilders(builders);
			
			return builders;
		}
		
		private var _design:ConverterDesign;
		private var _start:StartDesign;
		private var _recent:NativeMenu;
		private var _splitter:SplitterController;
		
		public function Converter()
		{
			super();
			
			_instance = this;
			
			addEventListener(Event.ADDED_TO_STAGE, init);
			
			_sharedObject = SharedObject.getLocal("GuepardConverter", "/");
			
			if (!isNaN(_sharedObject.data.zoom))
			{
				zoom = _sharedObject.data.zoom;
				
				if (zoom < 1) zoom = 1;
			}
			else
			{
				_sharedObject.data.zoom = zoom;
			}
			
			if (_sharedObject.data.recent == undefined)
			{
				_sharedObject.data.recent = [];
				_sharedObject.flush();
			}
		}
		
		public function closeProject():void
		{
			project = null;
			
			_design.visible = false;
			_start.visible = true;
			
			updateTitle();
		}
		
		public function saveProject():void
		{
			if (project && project.changed)
			{
				getParametersFromGUI();
				
				project.changed = false;
				
				project.write();
				
				updateTitle();
				
				if (settings.sdkPath && settings.sdkPath.exists)
				{
					_sharedObject.data.sdkPath = settings.custom.sdkPath.text;
					_sharedObject.flush();
				}
			}
		}
		
		public function openProject(file:File):void
		{
			addRecent(file.nativePath);
			
			project = new Project();
			project.file = file;
			project.changed = false;
			project.read();
			
			setParametersToGUI();
			
			_design.visible = true;
			_start.visible = false;
			
			updateTitle();
			
			_design.sourceButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
			
			output.clear();
		}
		
		public function createProject(file:File):void
		{
			if (file.extension != "json")
			{
				file = file.parent.resolvePath(file.name + ".json");
			}
			
			addRecent(file.nativePath);
			
			resetDefaults();
			
			source.custom.projectName.text = file.name.replace(".json", "");
			
			project = new Project();
			project.changed = true;
			project.file = file;
			
			if (_sharedObject.data.sdkPath)
			{
				settings.custom.sdkPath.text = _sharedObject.data.sdkPath;
			}
			
			getParametersFromGUI();
			
			project.write();
			
			_design.visible = true;
			_start.visible = false;
			
			updateTitle();
			
			if (!settings.sdkPath || !settings.sdkPath.exists)
			{
				_design.settingsButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
			}
			else
			{
				_design.sourceButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
				
				output.clear();
			}
		}
		
		private function openRecentProject():void
		{
			closeProject();
			
			if (_sharedObject.data.recent.length)
			{
				var file:File = new File();
				
				try
				{
					file.nativePath = _sharedObject.data.recent[0];
				}
				catch (error:Error)
				{
				
				}
				
				if (file.exists)
				{
					openProject(file);
				}
			}
			
		}
		
		private function updateRecentMenu():void
		{
			_recent.removeAllItems();
			
			for each(var name:String in _sharedObject.data.recent)
			{
				var file:File = new File();
				
				try
				{
					file.nativePath = name;
					
					if (file.exists)
					{
						var item:NativeMenuItem = new NativeMenuItem(file.name);
						item.data = name;
						item.addEventListener(Event.SELECT, recentItemSelect);
						_recent.addItem(item);
					}
				}
				catch (error:Error)
				{
				
				}
			}
		}
		
		private function initTimer():void
		{
			var timer:Timer = new Timer(1000);
			timer.addEventListener(TimerEvent.TIMER, onSecondTimer);
			timer.start();
		}
		
		private function updateTitle():void
		{
			var text:String = "Guepard Converter";
			
			if (project)
			{
				text += " - " + project.name;
				
				if (project.changed)
				{
					text += "*";
				}
			}
			
			stage.nativeWindow.title = text;
		}
		
		private function initMenu():void
		{
			var menu:NativeMenu = new NativeMenu();
			
			if (NativeApplication.supportsMenu)
			{
				NativeApplication.nativeApplication.menu = menu;
			}
			else if (NativeWindow.supportsMenu)
			{
				stage.nativeWindow.menu = menu;
			}
			
			var fileMenu:NativeMenu = new NativeMenu();
			menu.addSubmenu(fileMenu, "File");
			
			var viewMenu:NativeMenu = new NativeMenu();
			menu.addSubmenu(viewMenu, "View");
			
			var helpMenu:NativeMenu = new NativeMenu();
			menu.addSubmenu(helpMenu, "Help");
			
			var newProject:NativeMenuItem = new NativeMenuItem("New Project...");
			newProject.addEventListener(Event.SELECT, newProjectSelect);
			fileMenu.addItem(newProject);
			
			var openProject:NativeMenuItem = new NativeMenuItem("Open Project...");
			openProject.addEventListener(Event.SELECT, openProjectSelect);
			fileMenu.addItem(openProject);
			
			_recent = new NativeMenu();
			fileMenu.addSubmenu(_recent, "Recent Projects");
			
			var zoomInItem:NativeMenuItem = new NativeMenuItem("Zoom In");
			zoomInItem.addEventListener(Event.SELECT, zoomInItemSelect);
			viewMenu.addItem(zoomInItem);
			
			var zoomOutItem:NativeMenuItem = new NativeMenuItem("Zoom Out");
			zoomOutItem.addEventListener(Event.SELECT, zoomOutItemSelect);
			viewMenu.addItem(zoomOutItem);
		}
		
		private function initGUI():void
		{
			_start = new StartDesign();
			_start.createButton.addEventListener(MouseEvent.CLICK, createProjectClick);
			_start.createButton.useHandCursor = true;
			_start.createButton.buttonMode = true;
			_start.openButton.addEventListener(MouseEvent.CLICK, openProjectClick);
			_start.openButton.useHandCursor = true;
			_start.openButton.buttonMode = true;
			addChild(_start);
			
			_design = new ConverterDesign();
			addChild(_design);
			
			source = new SourceTab(_design.sourceTab);
			parameters = new ParametersTab(_design.parametersTab);
			resources = new ResourcesTab(_design.resourcesTab);
			target = new TargetTab(_design.targetTab);
			settings = new SettingsTab(_design.settingsTab);
			
			output = new OutputController(_design.outputPanel);
			
			_design.sourceButton.addEventListener(MouseEvent.CLICK, tabClick);
			_design.parametersButton.addEventListener(MouseEvent.CLICK, tabClick);
			_design.resourceslButton.addEventListener(MouseEvent.CLICK, tabClick);
			_design.targetButton.addEventListener(MouseEvent.CLICK, tabClick);
			_design.settingsButton.addEventListener(MouseEvent.CLICK, tabClick);
			
			_design.sourceButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK));
			
			_splitter = new SplitterController(_design.splitter, 200, 150, stageResize);
		}
		
		private function addRecent(file:String):void
		{
			var array:Array = _sharedObject.data.recent;
			
			var index:int = array.indexOf(file);
			
			if (index != -1)
			{
				array.splice(index, 1);
			}
			
			array.unshift(file);
			
			_sharedObject.flush();
			
			updateRecentMenu();
		}
		
		private function resetDefaults():void
		{
			source.resetDefaults();
			parameters.resetDefaults();
			resources.resetDefaults();
			target.resetDefaults();
			settings.resetDefaults();
		}
		
		private function getParametersFromGUI():void
		{
			if (project)
			{
				project.data.source = source.getData();
				project.data.parameters = parameters.getData();
				project.data.resources = resources.getData();
				project.data.settings = settings.getData();
				project.data.target = target.getData();
			}
		}
		
		private function setParametersToGUI():void
		{
			if (project)
			{
				source.setData(project.data.source);
				parameters.setData(project.data.parameters);
				resources.setData(project.data.resources);
				settings.setData(project.data.settings);
				target.setData(project.data.target);
			}
		}
		
		private function init(e:Event):void
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			stage.nativeWindow.width = 1024;
			stage.nativeWindow.height = 768;
			
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			stage.addEventListener(Event.RESIZE, stageResize);
			
			stage.nativeWindow.x = (Capabilities.screenResolutionX - stage.nativeWindow.width) / 2;
			stage.nativeWindow.y = (Capabilities.screenResolutionY - stage.nativeWindow.height) / 2;
			
			updateTitle();
			
			initGUI();
			initMenu();
			
			updateRecentMenu();
			
			stageResize();
			
			openRecentProject();
			
			initTimer();
			
			//setTimeout(Test.run, 1000);
		}
		
		private function recentItemSelect(e:Event):void
		{
			var item:NativeMenuItem = NativeMenuItem(e.target);
			
			var file:File = new File();
			
			try
			{
				file.nativePath = String(item.data);
			}
			catch (error:Error)
			{
				return;
			}
			
			if (!file.exists) return;
			
			closeProject();
			
			openProject(file);
		}
		
		private function onSecondTimer(e:TimerEvent):void
		{
			saveProject();
		}
		
		private function zoomInItemSelect(event:Event):void
		{
			zoom += 0.1;
			
			if (zoom > 3) zoom = 3;
			
			_sharedObject.data.zoom = zoom;
			_sharedObject.flush();
			
			stageResize();
		}
		
		private function zoomOutItemSelect(event:Event):void
		{
			zoom -= 0.1;
			
			if (zoom < 1) zoom = 1;
			
			_sharedObject.data.zoom = zoom;
			_sharedObject.flush();
			
			stageResize();
		}
		
		private function openProjectSelect(e:Event):void
		{
			var file:File = new File();
			file.addEventListener(Event.SELECT, openProjectFileSelect);
			file.browseForOpen("Open Project", [new FileFilter("Guepard Project (*.json)", "*.json")]);
		}
		
		private function openProjectFileSelect(e:Event):void
		{
			var file:File = File(e.target);
			file.removeEventListener(Event.SELECT, openProjectFileSelect);
			
			openProject(file);
		}
		
		private function newProjectSelect(e:Event):void
		{
			var file:File = new File();
			file.addEventListener(Event.SELECT, createProjectFileSelect);
			file.browseForSave("Save Project");
		}
		
		private function createProjectFileSelect(e:Event):void
		{
			var file:File = File(e.target);
			file.removeEventListener(Event.SELECT, createProjectFileSelect);
			
			createProject(file);
		}
		
		private function openProjectClick(event:MouseEvent):void
		{
			openProjectSelect(null);
		}
		
		private function createProjectClick(event:MouseEvent):void
		{
			newProjectSelect(null);
		}
		
		private function tabClick(e:MouseEvent):void
		{
			var button:Object = e.currentTarget;
			
			_design.sourceButton.selected = button == _design.sourceButton;
			_design.parametersButton.selected = button == _design.parametersButton;
			_design.resourceslButton.selected = button == _design.resourceslButton;
			_design.targetButton.selected = button == _design.targetButton;
			_design.settingsButton.selected = button == _design.settingsButton;
			
			source.design.visible = button == _design.sourceButton;
			parameters.design.visible = button == _design.parametersButton;
			resources.design.visible = button == _design.resourceslButton;
			target.design.visible = button == _design.targetButton;
			settings.design.visible = button == _design.settingsButton;
		}
		
		private function stageResize(e:Event = null):void
		{
			var width:Number = stage.stageWidth / zoom;
			var height:Number = stage.stageHeight / zoom;
			
			if (_design)
			{
				_design.scaleX = _design.scaleY = zoom;
				
				_design.back.width = width;
				
				output.design.y = _splitter.design.y;
				output.width = width;
				output.height = height - _splitter.design.y;
				
				_splitter.design.width = width;
				_splitter.design.drawNow();
			}
			
			if (_start)
			{
				_start.scaleX = _start.scaleY = zoom;
				
				_start.x = stage.stageWidth * 0.5;
				_start.y = stage.stageHeight * 0.5;
			}
		}
	}
	
}