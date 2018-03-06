package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.CorrectParameters;
	import com.guepard.decompiler.data.Tag;
	
	import flash.filters.BitmapFilter;
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class PlaceObject extends Tag
	{
		public var className:String;
		public var filters:Vector.<BitmapFilter>;
		public var move:Boolean;
		public var depth:int;
		public var matrix:Matrix;
		public var colorTransform:ColorTransform;
		public var ratio:int;
		public var name:String;
		public var mask:int;
		public var actions:Vector.<uint>;
		public var blendMode:String;
		public var cacheAsBitmap:Boolean;
		public var visible:Boolean;
		public var opaqueBackground:uint;
		
		public function PlaceObject()
		{
			
		}
		
		override public function correct(parameters:CorrectParameters):void
		{
			if (parameters.stage)
			{
				var id:int = this.id;
				
				if (id == -1 && parameters.list)
				{
					id = parameters.list.getIdByDepth(this);
				}
				
				var tag:Tag = parameters.defines[id];
				
				if (tag)
				{
					var scale:Number = matrix ? Math.max(matrix.a, matrix.b, matrix.c, matrix.d) : 1;
					
					parameters = parameters.clone();
					parameters.scale *= scale;
					
					tag.scaleCorrected = true;
					tag.correct(parameters);
				}
				else
				{
					trace("tag not found", id);
				}
			}
		}
	}
	
}