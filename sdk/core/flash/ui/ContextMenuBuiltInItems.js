/*class flash.ui.ContextMenuBuiltInItems*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.forwardAndBack/*Boolean*/ = true;
	/*public*/
	d/*var*/.loop/*Boolean*/ = true;
	/*public*/
	d/*var*/.play/*Boolean*/ = true;
	/*public*/
	d/*var*/.print/*Boolean*/ = true;
	/*public*/
	d/*var*/.quality/*Boolean*/ = true;
	/*public*/
	d/*var*/.rewind/*Boolean*/ = true;
	/*public*/
	d/*var*/.save/*Boolean*/ = true;
	/*public*/
	d/*var*/.zoom/*Boolean*/ = true;
	
	
	/*public*/
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
	
	/*public*/
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
