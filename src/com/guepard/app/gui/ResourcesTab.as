package com.guepard.app.gui
{
	import com.guepard.app.Converter;
	import com.guepard.app.data.Builder;
	import com.guepard.converter.ResourcesConverter;
	
	import flash.display.MovieClip;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ResourcesTab extends TabController
	{
		public function get custom():ResourcesDesign
		{
			return ResourcesDesign(design);
		}
		
		public function get textureMaxSize():int
		{
			return Math.pow(2, custom.texturePowerMax.value);
		}
		
		public function get textureMinSize():int
		{
			return Math.pow(2, custom.texturePowerMin.value);
		}
		
		public function get textureBigSize():int
		{
			return Math.pow(2, custom.texturePowerBig.value);
		}
		
		public function get shapeScale():Number
		{
			return custom.shapeScale.value / 100;
		}
		
		public function get scaleMargin():Number
		{
			return 1 + custom.scaleMargin.value / 100;
		}
		
		public function get shapeScaleMin():Number
		{
			return custom.shapeScaleMin.value / 100;
		}
		
		public function ResourcesTab(design:MovieClip)
		{
			super(design);
			
			custom.texturePowerMax.minimum = 1;
			custom.texturePowerMax.maximum = 12;
			custom.texturePowerMax.value = 11;
			
			custom.texturePowerMin.minimum = 1;
			custom.texturePowerMin.maximum = 12;
			custom.texturePowerMin.value = 5;
			
			custom.compressDigits.minimum = 0;
			custom.compressDigits.maximum = 10;
			custom.compressDigits.value = 3;
			
			custom.shapeBorder.minimum = 0;
			custom.shapeBorder.maximum = 10;
			custom.shapeBorder.value = 2;
			
			custom.imageQuality.minimum = 0;
			custom.imageQuality.maximum = 100;
			custom.imageQuality.value = 80;
			
			custom.shapeScale.minimum = 0;
			custom.shapeScale.maximum = 10000;
			custom.shapeScale.value = 100;
			
			custom.shapeScaleMin.minimum = 0;
			custom.shapeScaleMin.maximum = 10000;
			custom.shapeScaleMin.value = 90;
			
			custom.scaleMargin.minimum = 0;
			custom.scaleMargin.maximum = 100;
			custom.scaleMargin.value = 5;
			
			custom.texturePowerBig.minimum = 1;
			custom.texturePowerBig.maximum = 12;
			custom.texturePowerBig.value = 11;
			
			getDefaults();
		}
		
		override public function addBuilders(builders:Vector.<Builder>):void
		{
			if (custom.exportResources.selected)
			{
				if (Converter.target.targetPath && Converter.source.swfPath)
				{
					var name:String = Converter.source.custom.projectName.text;
					
					var converter:ResourcesConverter = new ResourcesConverter(
						Converter.source.swfPath,
						Converter.settings.debugDataPath.resolvePath(name),
						name,
						Converter.target.targetDataPath
					);
					
					builders.push(converter);
				}
			}
		}
		
	}
}