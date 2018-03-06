/*class flash.display.Shape*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._graphics = null;
	
	d._render_ = function (render)
	{
		this.__updateTransform__();
		
		var bitmapData = this._graphics._getBitmapData();
		
		if (bitmapData)
		{
			render.drawBitmapData(
				bitmapData,
				this._graphics._getMap(),
				this._graphics._getDisplayBounds(),
				this._transform._concatenatedMatrix,
				this._transform._concatenatedColorTransform,
				this._blendMode,
				this._concatenatedFilters
			);
		}
	}
	
	d.get_graphics = function ()/*Graphics*/
	{
		return this._graphics;
	};
	
	d.Shape = function ()
	{
		this._graphics = new flash.display.Graphics();
		
		this.DisplayObject_constructor();
		
		flash.linkage(this, flash.display.Shape);
	};
	
	d._checkInteractiveEvent = function (data)
	{
		return this._graphics._checkTouch(data.localX, data.localY, this);
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.DisplayObject_constructor = this.__base__;
	};
	
	flash.addDescription("flash.display.Shape", d, "flash.display.DisplayObject", s, null);
	
}
());
