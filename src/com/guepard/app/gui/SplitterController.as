package com.guepard.app.gui
{
	import com.guepard.app.Converter;
	
	import fl.core.UIComponent;
	
	import flash.events.MouseEvent;
	
	/**
	 * ...
	 * @author
	 */
	public class SplitterController
	{
		private var _top:Number;
		private var _bottom:Number;
		private var _oldY:Number;
		private var _changeHandler:Function;
		
		private var _design:UIComponent;
		
		public function get design():UIComponent
		{
			return _design;
		}
		
		public function SplitterController(design:UIComponent, top:Number, bottom:Number, changeHandler:Function)
		{
			_changeHandler = changeHandler;
			_design = design;
			_top = top;
			_bottom = bottom;
			
			_design.addEventListener(MouseEvent.MOUSE_DOWN, mouseDown);
		}
		
		private function mouseDown(e:MouseEvent):void
		{
			_oldY = _design.stage.mouseY;
			
			_design.stage.addEventListener(MouseEvent.MOUSE_UP, stageMouseUp);
			_design.stage.addEventListener(MouseEvent.MOUSE_MOVE, stageMouseMove);
		}
		
		private function stageMouseMove(e:MouseEvent):void
		{
			var height:Number = _design.stage.stageHeight / Converter.zoom;
			
			_design.y += (_design.stage.mouseY - _oldY) / Converter.zoom;
			
			if (_design.y > height - _bottom)
			{
				_design.y = height - _bottom;
			}
			
			if (_design.y < _top)
			{
				_design.y = _top;
			}
			
			_oldY = _design.stage.mouseY;
			
			if (_changeHandler != null)
			{
				_changeHandler();
			}
		}
		
		private function stageMouseUp(e:MouseEvent):void
		{
			_design.stage.removeEventListener(MouseEvent.MOUSE_UP, stageMouseUp);
			_design.stage.removeEventListener(MouseEvent.MOUSE_MOVE, stageMouseMove);
		}
		
	}
	
}