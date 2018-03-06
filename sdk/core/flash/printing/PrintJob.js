/*class flash.printing.PrintJob*/
/*
import flash.display.*;
import flash.events.*;
import flash.geom.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_orientation = function ()/*String*/
	{
		return this.invoke(flash.printing.PrintJob.kGetOrientation);
		
	};
	
	/*public*/
	d.get_pageHeight = function ()/*int*/
	{
		return this.invoke(flash.printing.PrintJob.kGetPageHeight);
		
	};
	
	/*public*/
	d.get_pageWidth = function ()/*int*/
	{
		return this.invoke(flash.printing.PrintJob.kGetPageWidth);
		
	};
	
	/*public*/
	d.get_paperHeight = function ()/*int*/
	{
		return this.invoke(flash.printing.PrintJob.kGetPaperHeight);
		
	};
	
	/*public*/
	d.get_paperWidth = function ()/*int*/
	{
		return this.invoke(flash.printing.PrintJob.kGetPaperWidth);
		
	};
	
	
	/*public*/
	d.PrintJob = function ()
	{
		this.EventDispatcher_constructor();
		return;
		
	};
	
	/*private*/
	d._invoke = function (index/*null*/)
	{
		
	};
	
	/*public*/
	d.addPage = function (sprite/*Sprite*/, printArea/*Rectangle*/, options/*PrintJobOptions*/, frameNum/*int*/)/*void*/
	{
		if (printArea == undefined) printArea = null;
		if (options == undefined) options = null;
		if (frameNum == undefined) frameNum = 0;
		frameNum = /*int*/Math.floor(frameNum);
		
		
		var _loc_5/*Object*/ = null;
		_loc_5 = null;
		
		if (options != null)
		{
			_loc_5 =
				{
					printAsBitmap: options.printAsBitmap
				};
			
		}
		
		if (this._invoke(flash.printing.PrintJob.kAddPage, sprite, this.toClassicRectangle(printArea), _loc_5, frameNum > 0 ? (frameNum) : (-1)) == false)
		{
			throw new Error(2057);
			
		}
		return;
		
	};
	
	/*private*/
	d.invoke = function (index/*uint*/)
	{
		
	};
	
	/*public*/
	d.send = function ()/*void*/
	{
		this.invoke(flash.printing.PrintJob.kSend);
		return;
		
	};
	
	/*public*/
	d.start = function ()/*Boolean*/
	{
		return this.invoke(flash.printing.PrintJob.kStart) == true;
		
	};
	
	/*private*/
	d.toClassicRectangle = function (printArea/*Rectangle*/)
	{
		
		if (printArea != null)
		{
			var obj = {};
			
			obj.xMax = printArea.get_right();
			obj.xMin = printArea.get_left();
			obj.yMin = printArea.get_top();
			obj.yMax = printArea.get_bottom();
			
			return obj;
			
		}
		return null;
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
		
		/*private*/
		this/*const*/.kAddPage/*uint*/ = 101;
		/*private*/
		this/*const*/.kGetOrientation/*uint*/ = 9;
		/*private*/
		this/*const*/.kGetPageHeight/*uint*/ = 5;
		/*private*/
		this/*const*/.kGetPageWidth/*uint*/ = 7;
		/*private*/
		this/*const*/.kGetPaperHeight/*uint*/ = 1;
		/*private*/
		this/*const*/.kGetPaperWidth/*uint*/ = 3;
		/*private*/
		this/*const*/.kSend/*uint*/ = 102;
		/*private*/
		this/*const*/.kStart/*uint*/ = 100;
		
	};
	
	
	flash.addDescription("flash.printing.PrintJob", d, "flash.events.EventDispatcher", s, null);
	
}
());
