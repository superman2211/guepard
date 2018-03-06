/*class flash.geom.ColorTransform*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.alphaMultiplier/*Number*/ = 0;
	/*public*/
	d/*var*/.alphaOffset/*Number*/ = 0;
	/*public*/
	d/*var*/.blueMultiplier/*Number*/ = 0;
	/*public*/
	d/*var*/.blueOffset/*Number*/ = 0;
	/*public*/
	d/*var*/.greenMultiplier/*Number*/ = 0;
	/*public*/
	d/*var*/.greenOffset/*Number*/ = 0;
	/*public*/
	d/*var*/.redMultiplier/*Number*/ = 0;
	/*public*/
	d/*var*/.redOffset/*Number*/ = 0;
	
	/*public*/
	d.get_color = function ()/*uint*/
	{
		return this.redOffset << 16 | this.greenOffset << 8 | this.blueOffset;
		
	};
	
	/*public*/
	d.set_color = function (value/*uint*/)/*void*/
	{
		value = /*uint*/Math.floor(value);
		
		this.redMultiplier = 0;
		this.greenMultiplier = 0;
		this.blueMultiplier = 0;
		
		this.redOffset = (value >> 16) & 0xff;
		this.greenOffset = (value >> 8) & 0xff;
		this.blueOffset = value & 0xff;
		
	};
	
	
	/*public*/
	d.ColorTransform = function (redMultiplier/*Number*/, greenMultiplier/*Number*/, blueMultiplier/*Number*/, alphaMultiplier/*Number*/, redOffset/*Number*/, greenOffset/*Number*/, blueOffset/*Number*/, alphaOffset/*Number*/)
	{
		this.redMultiplier = redMultiplier == undefined ? 1 : redMultiplier;
		this.greenMultiplier = greenMultiplier == undefined ? 1 : greenMultiplier;
		this.blueMultiplier = blueMultiplier == undefined ? 1 : blueMultiplier;
		this.alphaMultiplier = alphaMultiplier == undefined ? 1 : alphaMultiplier;
		this.redOffset = redOffset == undefined ? 0 : redOffset;
		this.greenOffset = greenOffset == undefined ? 0 : greenOffset;
		this.blueOffset = blueOffset == undefined ? 0 : blueOffset;
		this.alphaOffset = alphaOffset == undefined ? 0 : alphaOffset;
		
	};
	
	/*public*/
	d.concat = function (ct/*ColorTransform*/)/*void*/
	{
		this.redOffset = this.redOffset + this.redMultiplier * ct.redOffset;
		this.greenOffset = this.greenOffset + this.greenMultiplier * ct.greenOffset;
		this.blueOffset = this.blueOffset + this.blueMultiplier * ct.blueOffset;
		this.alphaOffset = this.alphaOffset + this.alphaMultiplier * ct.alphaOffset;
		this.redMultiplier = this.redMultiplier * ct.redMultiplier;
		this.greenMultiplier = this.greenMultiplier * ct.greenMultiplier;
		this.blueMultiplier = this.blueMultiplier * ct.blueMultiplier;
		this.alphaMultiplier = this.alphaMultiplier * ct.alphaMultiplier;
		
	};
	
	d.isEmpty = function ()/*Boolean*/
	{
		return this.redOffset == 0 &&
			this.greenOffset == 0 &&
			this.blueOffset == 0 &&
			this.alphaOffset == 0 &&
			
			this.redMultiplier == 1 &&
			this.greenMultiplier == 1 &&
			this.blueMultiplier == 1 &&
			this.alphaMultiplier == 1;
	};
	
	d.isEmptyColor = function ()/*Boolean*/
	{
		return this.redOffset == 0 &&
			this.greenOffset == 0 &&
			this.blueOffset == 0 &&
			
			this.redMultiplier == 1 &&
			this.greenMultiplier == 1 &&
			this.blueMultiplier == 1;
	};
	
	d.copyFrom = function (ct)
	{
		this.redOffset = ct.redOffset;
		this.greenOffset = ct.greenOffset;
		this.blueOffset = ct.blueOffset;
		this.alphaOffset = ct.alphaOffset;
		
		this.redMultiplier = ct.redMultiplier;
		this.greenMultiplier = ct.greenMultiplier;
		this.blueMultiplier = ct.blueMultiplier;
		this.alphaMultiplier = ct.alphaMultiplier;
	};
	
	d.equals = function (ct)
	{
		return this.redOffset == ct.redOffset &&
			this.greenOffset == ct.greenOffset &&
			this.blueOffset == ct.blueOffset &&
			this.alphaOffset == ct.alphaOffset &&
			
			this.redMultiplier == ct.redMultiplier &&
			this.greenMultiplier == ct.greenMultiplier &&
			this.blueMultiplier == ct.blueMultiplier &&
			this.alphaMultiplier == ct.alphaMultiplier;
	};
	
	d.equalsColor = function (ct)
	{
		return this.redOffset == ct.redOffset &&
			this.greenOffset == ct.greenOffset &&
			this.blueOffset == ct.blueOffset &&
			
			this.redMultiplier == ct.redMultiplier &&
			this.greenMultiplier == ct.greenMultiplier &&
			this.blueMultiplier == ct.blueMultiplier;
	};
	
	d.clone = function ()
	{
		return new flash.geom.ColorTransform(
			this.redMultiplier,
			this.greenMultiplier,
			this.blueMultiplier,
			this.alphaMultiplier,
			this.redOffset,
			this.greenOffset,
			this.blueOffset,
			this.alphaOffset
		);
	};
	
	/*public*/
	d._toValue = function ()/*String*/
	{
		return this.redMultiplier + "_" + this.greenMultiplier + "_" + this.blueMultiplier + "_" + this.alphaMultiplier + "_" + this.redOffset + "_" + this.greenOffset + "_" + this.blueOffset + "_" + this.alphaOffset;
		
	};
	
	
	/*public*/
	d.toString = function ()/*String*/
	{
		return "(redMultiplier=" + this.redMultiplier + ", greenMultiplier=" + this.greenMultiplier + ", blueMultiplier=" + this.blueMultiplier + ", alphaMultiplier=" + this.alphaMultiplier + ", redOffset=" + this.redOffset + ", greenOffset=" + this.greenOffset + ", blueOffset=" + this.blueOffset + ", alphaOffset=" + this.alphaOffset + ")";
		
	};
	
	
	flash.addDescription("flash.geom.ColorTransform", d, null, null, null);
	
}
());
