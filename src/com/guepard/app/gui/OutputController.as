package com.guepard.app.gui
{
	import com.guepard.app.Converter;
	import com.guepard.app.data.Builder;
	import com.guepard.utils.StringUtil;
	import com.guepard.utils.XMLUtil;
	
	import fl.controls.ProgressBarMode;
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.utils.getTimer;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class OutputController extends Controller
	{
		private var _builderIndex:int = 0;
		private var _datas:Array;
		private var _errors:int;
		private var _logs:int;
		private var _warnings:int;
		private var _bottomBorder:Number;
		private var _buildStartTime:int;
		
		override public function get width():Number
		{
			return custom.back.width;
		}
		
		override public function set width(value:Number):void
		{
			custom.convertButton.x = value - custom.convertButton.width - (custom.back.width - custom.convertButton.x - custom.convertButton.width);
			
			custom.progressField.width = custom.convertButton.x - custom.progressField.x;
			custom.progressField.drawNow();
			
			custom.progressBar.width = value - (custom.back.width - custom.progressBar.width);
			custom.progressBar.drawNow();
			
			custom.outputField.width = value - (custom.back.width - custom.outputField.width);
			custom.outputField.drawNow();
			
			custom.back.width = value;
		}
		
		override public function get height():Number
		{
			return custom.back.height;
		}
		
		override public function set height(value:Number):void
		{
			custom.back.height = value;
			
			custom.outputField.height = value - custom.outputField.y - _bottomBorder;
			custom.outputField.drawNow();
		}
		
		private var _builders:Vector.<Builder>;
		
		public function get builders():Vector.<Builder>
		{
			return _builders;
		}
		
		public function get currentBuilder():Builder
		{
			return _builders[_builderIndex];
		}
		
		public function get custom():OutputDesign
		{
			return OutputDesign(design);
		}
		
		public function OutputController(design:MovieClip)
		{
			super(design);
			
			custom.progressBar.mode = ProgressBarMode.MANUAL;
			custom.progressBar.minimum = 0;
			custom.progressBar.maximum = 100;
			custom.progressBar.value = 50;
			
			custom.convertButton.addEventListener(MouseEvent.CLICK, convertButtonClick);
			
			custom.logsButton.addEventListener(MouseEvent.CLICK, logButtonClick);
			custom.errorsButton.addEventListener(MouseEvent.CLICK, logButtonClick);
			custom.warningsButton.addEventListener(MouseEvent.CLICK, logButtonClick);
			
			_bottomBorder = custom.back.height - custom.outputField.y - custom.outputField.height;
			
			resetProgress();
			
			_datas = [];
			
			updateButtons();
		}
		
		public function log(...args):void
		{
			var data:String = String(args);
			_datas.push(data);
			
			if (custom.logsButton.selected)
			{
				append(data);
			}
			
			_logs++;
			
			updateButtons();
		}
		
		public function error(...args):void
		{
			var data:String = "ERROR: " + args;
			_datas.push(data);
			
			if (custom.errorsButton.selected)
			{
				append(data);
			}
			
			_errors++;
			
			updateButtons();
		}
		
		public function warning(...args):void
		{
			var data:String = "WARNING: " + args;
			_datas.push(data);
			
			if (custom.errorsButton.selected)
			{
				append(data);
			}
			
			_warnings++;
			
			updateButtons();
		}
		
		private function disposeBuilders():void
		{
			_builderIndex = 0;
			
			if (_builders)
			{
				for each(var builder:Builder in _builders)
				{
					builder.dispose();
				}
				
				_builders = null;
			}
		}
		
		private function startNextBuild():void
		{
			if (_builderIndex < _builders.length)
			{
				log(currentBuilder.name);
				
				currentBuilder.start(buildComplete, buildProgress);
			}
			else
			{
				var time:int = (getTimer() - _buildStartTime) / 1000;
				var message:String = "Build Complete, Elapsed time: " + StringUtil.generateAdvancedTimeText(time);
				
				log(message);
				
				disposeBuilders();
				
				Converter.enabled = true;
				
				custom.convertButton.label = "Convert";
				
				custom.progressField.text = message;
			}
		}
		
		private function append(object:Object):void
		{
			custom.outputField.appendText(object + "\n");
			custom.outputField.verticalScrollPosition = custom.outputField.maxVerticalScrollPosition;
		}
		
		private function clear():void
		{
			_datas.length = 0;
			
			custom.outputField.text = "";
			custom.outputField.verticalScrollPosition = 0;
			
			_errors = 0;
			_logs = 0;
			_warnings = 0;
			
			updateButtons();
		}
		
		private function updateButtons():void
		{
			custom.logsButton.label = "Logs" + (_logs ? " (" + _logs + ")" : "");
			custom.errorsButton.label = "Errors" + (_errors ? " (" + _errors + ")" : "");
			custom.warningsButton.label = "Warnings" + (_warnings ? " (" + _warnings + ")" : "");
		}
		
		private function buildProgress(value:Number):void
		{
			custom.progressField.text = currentBuilder.name + " - " + Math.round(value * 100) + "%";
			custom.progressBar.value = value * 100;
		}
		
		private function buildComplete():void
		{
			_builderIndex++;
			
			resetProgress();
			
			startNextBuild();
		}
		
		private function resetProgress():void
		{
			custom.progressField.text = "";
			custom.progressBar.value = 0;
		}
		
		private function logButtonClick(e:MouseEvent):void
		{
			var text:String = "";
			
			for each(var data:String in _datas)
			{
				var begin:String = data.substring(0, 5);
				
				if ((begin == "WARNI" && custom.warningsButton.selected) ||
					(begin == "ERROR" && custom.errorsButton.selected) ||
					(begin != "WARNI" && begin != "ERROR" && custom.logsButton.selected))
				{
					text += data + "\n";
				}
			}
			
			custom.outputField.text = text;
			custom.outputField.verticalScrollPosition = custom.outputField.maxVerticalScrollPosition;
		}
		
		private function convertButtonClick(e:MouseEvent):void
		{
			if (custom.convertButton.label == "Convert")
			{
				Converter.enabled = false;
				custom.convertButton.label = "Stop";
				
				XMLUtil.COMPRESS_VALUE = Math.pow(10, Converter.resources.custom.compressDigits.value);
				
				clear();
				
				_builders = Converter.getBuilders();
				_builderIndex = 0;
				
				_buildStartTime = getTimer();
				
				startNextBuild();
			}
			else
			{
				error("Build Stopped");
				
				Converter.enabled = true;
				custom.convertButton.label = "Convert";
				
				currentBuilder.stop();
				
				disposeBuilders();
				
				resetProgress();
			}
		}
		
	}
	
}