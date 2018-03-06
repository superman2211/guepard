/*class flash.geom.Matrix*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*public*/
	d/*var*/.a/*Number*/ = 0;
	/*public*/
	d/*var*/.b/*Number*/ = 0;
	/*public*/
	d/*var*/.c/*Number*/ = 0;
	/*public*/
	d/*var*/.d/*Number*/ = 0;
	/*public*/
	d/*var*/.tx/*Number*/ = 0;
	/*public*/
	d/*var*/.ty/*Number*/ = 0;
	
	/*public*/
	d.Matrix = function (a/*Number*/, b/*Number*/, c/*Number*/, d/*Number*/, tx/*Number*/, ty/*Number*/)
	{
		this.a = a == undefined ? 1 : a;
		this.b = b == undefined ? 0 : b;
		this.c = c == undefined ? 0 : c;
		this.d = d == undefined ? 1 : d;
		
		this.tx = tx == undefined ? 0 : tx;
		this.ty = ty == undefined ? 0 : ty;
	};
	
	/*public*/
	d.clone = function ()/*Matrix*/
	{
		return new flash.geom.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
		
	};
	
	/*public*/
	d.concat = function (m/*Matrix*/)/*void*/
	{
		if (m.a == 1 &&
			m.b == 0 &&
			m.c == 0 &&
			m.d == 1 &&
			m.tx == 0 &&
			m.ty == 0) return;
		
		var na/*Number*/ = this.a;
		var nb/*Number*/ = this.b;
		var nc/*Number*/ = this.c;
		var nd/*Number*/ = this.d;
		var nx/*Number*/ = this.tx;
		var ny/*Number*/ = this.ty;
		this.a = m.a * na + m.c * nb;
		this.b = m.b * na + m.d * nb;
		this.c = m.a * nc + m.c * nd;
		this.d = m.b * nc + m.d * nd;
		this.tx = m.a * nx + m.c * ny + m.tx;
		this.ty = m.b * nx + m.d * ny + m.ty;
		
	};
	
	/*public*/
	d.createBox = function (scaleX/*Number*/, scaleY/*Number*/, rotation/*Number*/, tx/*Number*/, ty/*Number*/)/*void*/
	{
		if (rotation == undefined) rotation = 0;
		if (tx == undefined) tx = 0;
		if (ty == undefined) ty = 0;
		
		this.identity();
		this.rotate(rotation);
		this.scale(scaleX, scaleY);
		this.tx = tx;
		this.ty = ty;
		
	};
	
	/*public*/
	d.createGradientBox = function (width/*Number*/, height/*Number*/, rotation/*Number*/, tx/*Number*/, ty/*Number*/)/*void*/
	{
		if (rotation == undefined) rotation = 0;
		if (tx == undefined) tx = 0;
		if (ty == undefined) ty = 0;
		
		this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
		
	};
	
	/*public*/
	d.deltaTransformPoint = function (point/*Point*/)/*Point*/
	{
		return new flash.geom.Point(this.a * point.x + this.c * point.y, this.d * point.y + this.b * point.x);
		
	};
	
	/*public*/
	d.identity = function ()/*void*/
	{
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;
		
	};
	
	/*public*/
	d.invert = function ()/*void*/
	{
		
		var determinant/*Number*/ = this.a * this.d - this.b * this.c;
		
		if (determinant)
		{
			determinant = 1 / determinant;
			var ma/*Number*/ = this.a;
			var mb/*Number*/ = this.b;
			var mc/*Number*/ = this.c;
			var md/*Number*/ = this.d;
			var mx/*Number*/ = this.tx;
			var my/*Number*/ = this.ty;
			this.a = md * determinant;
			this.b = -mb * determinant;
			this.c = -mc * determinant;
			this.d = ma * determinant;
			this.tx = (mc * my - mx * md) * determinant;
			this.ty = (mx * mb - ma * my) * determinant;
			
		}
		else
		{
			this.identity();
		}
	};
	
	/*public*/
	d.rotate = function (angle/*Number*/)/*void*/
	{
		if (angle == 0) return;
		
		var cos/*Number*/ = Math.cos(angle);
		var sin/*Number*/ = Math.sin(angle);
		this.concat(new flash.geom.Matrix(cos, sin, -sin, cos, 0, 0));
		
	};
	
	/*public*/
	d.scale = function (sx/*Number*/, sy/*Number*/)/*void*/
	{
		if (sx == 1 && sy == 1) return;
		
		this.concat(new flash.geom.Matrix(sx, 0, 0, sy, 0, 0));
		
	};
	
	/*public*/
	d.toString = function ()/*String*/
	{
		return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
		
	};
	
	/*public*/
	d.transformPoint = function (point/*Point*/)/*Point*/
	{
		return new flash.geom.Point(
			this.a * point.x + this.c * point.y + this.tx,
			this.d * point.y + this.b * point.x + this.ty
		);
	};
	
	/*public*/
	d.translate = function (dx/*Number*/, dy/*Number*/)/*void*/
	{
		this.tx += dx;
		this.ty += dy;
		
	};
	
	d.copyFrom = function (m)
	{
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.tx = m.tx;
		this.ty = m.ty;
	};
	
	
	flash.addDescription("flash.geom.Matrix", d, null, null, null);
	
}
());
