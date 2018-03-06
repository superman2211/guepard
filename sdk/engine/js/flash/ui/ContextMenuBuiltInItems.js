/*class flash.ui.ContextMenuBuiltInItems*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d.forwardAndBack/*Boolean*/ = true;
	d.loop/*Boolean*/ = true;
	d.play/*Boolean*/ = true;
	d.print/*Boolean*/ = true;
	d.quality/*Boolean*/ = true;
	d.rewind/*Boolean*/ = true;
	d.save/*Boolean*/ = true;
	d.zoom/*Boolean*/ = true;
	
	
	d.ContextMenuBuiltInItems = function ()
	{
		this.save = true;
		this.zoom = true;
		this.quality = true;
		this.play = true;
		this.loop = true;
		this.rewind = true;
		this.forwardAndBack = true;
		this.print = true;
		return;
		
	};
	
	d.clone = function ()/*ContextMenuBuiltInItems*/
	{
		
		var _loc_1/*ContextMenuBuiltInItems*/ = null;
		_loc_1 = new flash.ui.ContextMenuBuiltInItems();
		_loc_1.save = this.save;
		_loc_1.zoom = this.zoom;
		_loc_1.quality = this.quality;
		_loc_1.play = this.play;
		_loc_1.loop = this.loop;
		_loc_1.rewind = this.rewind;
		_loc_1.forwardAndBack = this.forwardAndBack;
		_loc_1.print = this.print;
		return _loc_1;
		
	};
	
	
	flash.addDescription("flash.ui.ContextMenuBuiltInItems", d, null, null, null);
	
}
());
