/*class flash.text.CSSFontLoader*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._virtualcanvas = null;
	d._context2d = null;
	d._data = null;
	d._testChars = "";
	d._fontName = "";
	d._timer = null;
	
	
	d.CSSFontLoader = function (font)
	{
		
		this.EventDispatcher_constructor();
		
		this._testChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
		;
		
		var name = font._fontName;
		
		var data = [];
		data.push('\t@font-face {');
		data.push('\t\tfont-family:"' + name + '";');
		data.push('\t\tsrc: url("fonts/' + name + '.eot");');
		data.push('\t\tsrc: url("fonts/' + name + '.eot?#iefix") format("embedded-opentype"),');
		data.push('\t\turl("fonts/' + name + '.ttf") format("truetype"),');
		data.push('\t\turl("fonts/' + name + '.svg#' + name + '") format("svg");');
		data.push('\t\tfont-weight: normal;');
		data.push('\t\tfont-style: normal;');
		data.push('\t}');
		
		var css = data.join("\n");
		
		var head = document.getElementsByTagName('head')[ 0 ];
		
		var s = document.createElement('style');
		
		s.setAttribute('type', 'text/css');
		
		if (s.styleSheet)
		{   // IE
			s.styleSheet.cssText = css.toString();
		}
		else
		{                // the world
			s.appendChild(document.createTextNode(css));
		}
		
		head.appendChild(s);
		
		this._fontName = font._fontName;
		
		flash.trace("load font start: " + this._fontName);
		
		this.loadFont(font._fontName);
	}
	
	d.loadFont = function (name)
	{
		if (this._virtualcanvas == null)
		{
			
			this._virtualcanvas = document.createElement('canvas');
			this._virtualcanvas.width = 32;
			this._virtualcanvas.heigth = 32;
			this._context2d = this._virtualcanvas.getContext('2d');
			this._context2d.textBaseline = "top";
			this._context2d.textAlign = "left";
			this._timer = new flash.utils.Timer(100);
			this._timer.addEventListener("timer", flash.bindFunction(this, this._checkFont));
		}
		
		
		this._fontName = name;
		var context = this._context2d;
		context.clearRect(0, 0, 32, 32);
		context.font = "20px";
		context.textBaseline = "top";
		context.fillText(this._testChars, 0, 0);
		this._data = context.getImageData(0, 0, 32, 32);
		this._timer.start();
	}
	
	d._checkFont = function ()
	{
		var context = this._context2d;
		context.clearRect(0, 0, 32, 32);
		context.font = "20px " + this._fontName;
		context.textBaseline = "top";
		context.fillText(this._testChars, 0, 0);
		
		var current = context.getImageData(0, 0, 32, 32);
		
		var currentData = current.data;
		var testData = this._data.data;
		
		var i = currentData.length;
		
		while (currentData)
		{
			if (currentData[ i ] != testData[ i ])
			{
				flash.trace(currentData[ i ], testData[ i ], i);
				this.dispatchEvent(new flash.events.Event(flash.events.Event.COMPLETE, false, false));
				this._timer.removeEventListener("timer", flash.bindFunction(this, this._checkFont));
				this._timer.stop();
				
				flash.trace("load font complete: " + this._fontName)
				break;
			}
			i--;
		}
	}
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	};
	
	
	flash.addDescription("flash.text.CSSFontLoader", d, "flash.events.EventDispatcher", s, null);
	
	
}
());
