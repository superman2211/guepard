/*class flash.display.GraphicsStroke*/
(function ()
{
	"use strict";
	
	var d = {};
	
	/*private*/
	d/*var*/._caps/*String*/ = null;
	/*private*/
	d/*var*/._joints/*String*/ = null;
	/*private*/
	d/*var*/._scaleMode/*String*/ = null;
	/*public*/
	d/*var*/.fill/*IGraphicsFill*/ = 0;
	/*uint*/
	/*public*/
	d/*var*/.miterLimit/*Number*/ = 0;
	/*public*/
	d/*var*/.pixelHinting/*Boolean*/ = false;
	/*public*/
	d/*var*/.thickness/*Number*/ = 0;
	
	/*public*/
	d.get_caps = function ()/*String*/
	{
		return this._caps;
		
	};
	
	/*public*/
	d.set_caps = function (value/*String*/)/*void*/
	{
		this._caps = value;
		
		return value;
		
	};
	
	/*public*/
	d.get_joints = function ()/*String*/
	{
		return this._joints;
		
	};
	
	/*public*/
	d.set_joints = function (value/*String*/)
	{
		
		this._joints = value;
		
		return value;
		
	};
	
	/*public*/
	d.get_scaleMode = function ()/*String*/
	{
		return this._scaleMode;
		
	};
	
	/*public*/
	d.set_scaleMode = function (value/*String*/)/*void*/
	{
		
		this._scaleMode = value;
		
		return value;
		
	};
	
	
	/*public*/
	d.GraphicsStroke = function (thickness/*Number*/, pixelHinting/*Boolean*/, scaleMode/*String*/, caps/*String*/, joints/*String*/, miterLimit/*Number*/, fill/*IGraphicsFill*/)
	{
		if (thickness == undefined) thickness = 0;
		if (pixelHinting == undefined) pixelHinting = false;
		if (scaleMode == undefined) scaleMode = "normal";
		if (caps == undefined) caps = "none";
		if (joints == undefined) joints = "round";
		if (miterLimit == undefined) miterLimit = 3;
		if (fill == undefined) fill = 0;
		
		this.thickness = thickness;
		this.pixelHinting = pixelHinting;
		this._caps = caps;
		this._joints = joints;
		this.miterLimit = miterLimit;
		this._scaleMode = scaleMode;
		this.fill = fill;
		
	};
	
	
	flash.addDescription("flash.display.GraphicsStroke", d, null, null, [ "flash.display.IGraphicsStroke", "flash.display.IGraphicsData" ]);
	
}
());
