package com.guepard.app.gui
{
	import flash.display.MovieClip;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ParametersTab extends TabController
	{
		public function get custom():TargetDesign
		{
			return TargetDesign(design);
		}
		
		public function ParametersTab(design:MovieClip)
		{
			super(design);
			
			custom.frameRate.minimum = 1;
			custom.frameRate.maximum = 60;
			custom.frameRate.value = 30;
			
			custom.appWidth.minimum = 1;
			custom.appWidth.maximum = 4096;
			custom.appWidth.value = 640;
			
			custom.appHeight.minimum = 1;
			custom.appHeight.maximum = 4096;
			custom.appHeight.value = 480;
			
			getDefaults();
		}
	}
	
}