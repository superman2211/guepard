/*class flash.display.Bitmap*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._bitmapData = null;
	d._pixelSnapping = null;
	d._smoothing = false;
	d._checkTouch_point = null;
	
	d._render_ = function (render)
	{
		this.__updateTransform__();
		
		var rect = this._bitmapData.get_rect();
		
		render.drawBitmapData(
			this._bitmapData,
			rect,
			rect,
			this._transform._concatenatedMatrix,
			this._transform._concatenatedColorTransform,
			this._blendMode,
			this._concatenatedFilters
		);
	};
	
	/*public*/
	d.get_bitmapData = function ()/*BitmapData*/
	{
		return this._bitmapData;
	};
	
	/*public*/
	d.set_bitmapData = function (value/*BitmapData*/)/*void*/
	{
		this._bitmapData = value;
		
		return value;
	};
	
	/*public*/
	d.get_pixelSnapping = function ()/*String*/
	{
		return this._pixelSnapping;
	};
	
	/*public*/
	d.set_pixelSnapping = function (value/*String*/)/*void*/
	{
		this._pixelSnapping = value;
		
		return value;
	};
	
	/*public*/
	d.get_smoothing = function ()/*Boolean*/
	{
		return this._smoothing;
	};
	
	/*public*/
	d.set_smoothing = function (value/*Boolean*/)/*void*/
	{
		this._smoothing = value;
		
		return value;
	};
	
	/*public*/
	d.Bitmap = function (bitmapData/*BitmapData*/, pixelSnapping/*String*/, smoothing/*Boolean*/)
	{
		if (bitmapData == undefined) bitmapData = null;
		if (pixelSnapping == undefined) pixelSnapping = flash.display.PixelSnapping.AUTO;
		if (smoothing == undefined) smoothing = false;
		
		this.DisplayObject_constructor();
		
		this.set_bitmapData(bitmapData);
		this.set_pixelSnapping(pixelSnapping);
		this.set_smoothing(smoothing);
		
		flash.linkage(this, flash.display.Bitmap);
	};
	
	d._checkInteractiveEvent = function (data)
	{
		if (!this._checkTouch_point) this._checkTouch_point = new flash.geom.Point();
		
		this._checkTouch_point.x = data.localX;
		this._checkTouch_point.y = data.localY;
		
		this._checkTouch_point = this.globalToLocal(this._checkTouch_point);
		
		if (this._bitmapData.get_rect().containsPoint(this._checkTouch_point))
		{
			return this._checkTouch_point;
		}
		
		return null;
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.DisplayObject_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.display.Bitmap", d, "flash.display.DisplayObject", s, null);
}
());
