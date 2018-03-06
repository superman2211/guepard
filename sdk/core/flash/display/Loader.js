/*class flash.display.Loader*/
/*
import flash.errors.*;
import flash.net.*;
import flash.system.*;
import flash.utils.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	d._content = null;
	
	d._contentLoaderInfo = null;
	
	d._imageObj = null;
	d._urlLoader;
	
	d.BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;
	
	d._imagePath = null;
	d._font = null;
	
	d._defineSprite = null;
	
	d._defineFont = null;
	
	d._render_ = function (render)
	{
		this.__updateTransform__();
		
		if (this._content != null)
		{
			this._content._render_(render);
		}
	}
	
	/*public*/
	d.get_content = function ()/*DisplayObject*/
	{
		return this._content;
		
	};
	
	/*public*/
	d.get_contentLoaderInfo = function ()/*LoaderInfo*/
	{
		return this._contentLoaderInfo;
	};
	
	/*public*/
	d.Loader = function ()
	{
		this.DisplayObjectContainer_constructor();
		
		this._contentLoaderInfo = new flash.display.LoaderInfo();
	};
	
	/*public*/
	d.close = function ()/*void*/
	{
	
	};
	
	/*public*/
	d.load = function (request/*URLRequest*/, context/*LoaderContext*/)/*void*/
	{
		if (context == undefined) context = null;
		
		flash.trace("load", request.get_url());
		
		if (request.get_extension() == "swf")
		{
			request.set_extension("xml");
		}
		
		this._contentLoaderInfo._url = request.get_url();
		
		if (!this._contentLoaderInfo._url)
		{
			this._contentLoaderInfo.dispatchEvent(new flash.events.IOErrorEvent(flash.events.IOErrorEvent.IO_ERROR));
			return;
		}
		
		var extension = request.get_extension().toLowerCase();
		
		if (extension == "jpg" || extension == "png" || extension == "gif")
		{
			this._loadImage(request.get_url());
		}
		else
		{
			this._urlLoader = new flash.net.URLLoader();
			this._urlLoader.dataFormat = flash.net.URLLoaderDataFormat.BINARY;
			
			this._urlLoader.addEventListener(flash.events.Event.COMPLETE, flash.bindFunction(this, this._complete));
			this._urlLoader.load(request);
		}
	};
	
	d._arrayBufferToDataUri = function (arrayBuffer)
	{
		var base64 = '',
			encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
			bytes = new Uint8Array(arrayBuffer), byteLength = bytes.byteLength,
			byteRemainder = byteLength % 3, mainLength = byteLength - byteRemainder,
			a, b, c, d, chunk;
		
		for (var i = 0; i < mainLength; i = i + 3)
		{
			chunk = (bytes[ i ] << 16) | (bytes[ i + 1 ] << 8) | bytes[ i + 2 ];
			a = (chunk & 16515072) >> 18;
			b = (chunk & 258048) >> 12;
			c = (chunk & 4032) >> 6;
			d = chunk & 63;
			base64 += encodings[ a ] + encodings[ b ] + encodings[ c ] + encodings[ d ];
		}
		
		if (byteRemainder == 1)
		{
			chunk = bytes[ mainLength ];
			a = (chunk & 252) >> 2;
			b = (chunk & 3) << 4;
			base64 += encodings[ a ] + encodings[ b ] + '==';
		}
		else if (byteRemainder == 2)
		{
			chunk = (bytes[ mainLength ] << 8) | bytes[ mainLength + 1 ];
			a = (chunk & 16128) >> 8;
			b = (chunk & 1008) >> 4;
			c = (chunk & 15) << 2;
			base64 += encodings[ a ] + encodings[ b ] + encodings[ c ] + '=';
		}
		
		return "data:image/jpg;base64," + base64;
	};
	
	d._arayBufferToString = function (buffer)
	{
		var array = new Uint8Array(buffer);
		
		var result = "";
		
		for (var i = 0; i < array.length; i++)
		{
			result += String.fromCharCode(array[ i ]);
		}
		
		return result;
	};
	
	d._progress = function (value)
	{
		this._contentLoaderInfo._bytesLoaded = Math.round(value * this._contentLoaderInfo.get_bytesTotal());
		
		this._contentLoaderInfo.dispatchEvent(
			new flash.events.ProgressEvent(
				flash.events.ProgressEvent.PROGRESS,
				false,
				false,
				this._contentLoaderInfo.get_bytesLoaded(),
				this._contentLoaderInfo.get_bytesTotal()
			)
		);
	}
	
	d._complete = function (e)
	{
		flash.trace("_complete");
		
		this._urlLoader.removeEventListener(flash.events.Event.COMPLETE, flash.bindFunction(this, this._complete));
		
		this._progress(0.1);
		
		var data = this._urlLoader.data;
		
		if (data instanceof ArrayBuffer)
		{
			data = this._arayBufferToString(data);
		}
		
		if (this._ifSWF(data))
		{
			this._parseSWF(data);
		}
		else
		{
			data = this._arrayBufferToDataUri(this._urlLoader.data);
			
			this._loadImage(data);
		}
	};
	
	d._loadImage = function (source)
	{
		this._imageObj = new Image();
		this._imageObj.onload = flash.bindFunction(this, this._addBitmapObject);
		this._imageObj.src = source;
	};
	
	d._ifSWF = function (data)
	{
		return data.indexOf("<SWFData") != -1;
	}
	
	d._getFolder = function ()
	{
		var parts = this._contentLoaderInfo._url.split("/");
		
		parts.pop();
		
		if (parts.length)
		{
			return parts.join("/") + "/";
		}
		else
		{
			return "";
		}
	};
	
	d._parseSWF = function (data)
	{
		flash.swf.Tag._baseId = this._urlLoader._request.get_name() + "_";
		
		var xml = new flash.xml.XMLDocument();
		xml.ignoreWhite = true;
		xml.parseXML(data);
		
		if (xml.firstChild.nodeName == "parsererror")
		{
			console.error("Parse XML Error: " + String(xml));
		}
		
		var attributes = xml.firstChild.get_attributes();
		
		this._contentLoaderInfo._frameRate = Number(attributes.frameRate);
		this._contentLoaderInfo._width = Number(attributes.width);
		this._contentLoaderInfo._height = Number(attributes.height);
		
		if (attributes.border)
		{
			flash.swf.DefineShape._border = Number(attributes.border);
		}
		else
		{
			flash.swf.DefineShape._border = 2;
		}
		
		
		var domain = flash.system.ApplicationDomain._currentDomain = this._contentLoaderInfo._applicationDomain;
		
		this._defineSprite = new flash.swf.DefineSprite();
		this._defineSprite.id = flash.swf.Tag._baseId + "0";
		this._defineSprite.fromXML(xml.firstChild);
		
		flash.embed();
		
		domain._setDefine(this._defineSprite);
		domain._initAudio(this._getFolder());
		
		flash.trace("swf images = " + domain._images);
		
		this._loadSWFImage();
	};
	
	d._loadSWFImage = function ()
	{
		this._progress(0.1 + 0.9 * flash.system.ApplicationDomain.get_currentDomain()._getloadInagesProgress());
		
		this._imagePath = flash.system.ApplicationDomain.get_currentDomain()._getImageForLoad();
		
		
		if (this._imagePath)
		{
			var path = this._getFolder() + this._imagePath + "?rnd=" + Math.random();
			
			var request = new flash.net.URLRequest(path);
			
			var loader = new flash.display.Loader();
			loader.get_contentLoaderInfo().addEventListener(flash.events.Event.COMPLETE, flash.bindFunction(this, this._loadSWFImageComplete));
			loader.load(request);
			
		}
		else
		{
			//return;
			this._loadSWFFont();
		}
		
	}
	
	d._loadSWFImageComplete = function (e)
	{
		var bitmap = e._target._content.get_bitmapData();
		
		this._contentLoaderInfo._applicationDomain._setImage(this._imagePath, bitmap);
		
		this._loadSWFImage();
	}
	
	d._loadSWFFont = function ()
	{
		this._font = flash.system.ApplicationDomain.get_currentDomain()._getFontForLoad();
		
		if (this._font)
		{
			if (this._font._path)
			{
				var path = this._getFolder() + this._font._path;
				var loader = new flash.text.CssFontLoader(path, this._font);
				loader.addEventListener(flash.events.Event.COMPLETE, flash.bindFunction(this, this._loadSWFFontComplete));
			}
			else
			{
				this._loadSWFFontComplete();
			}
		}
		else
		{
			this.addEventListener(flash.events.Event.ENTER_FRAME, flash.bindFunction(this, this._loadSWFContentComplete));
		}
		
		
	}
	
	d._loadSWFFontComplete = function (e)
	{
		this._font._loaded = true;
		this._loadSWFFont();
	}
	
	d._loadSWFContentComplete = function (e)
	{
		flash.embed();
		
		this.removeEventListener(flash.events.Event.ENTER_FRAME, flash.bindFunction(this, this._loadSWFContentComplete));
		
		this._content = this._defineSprite.createDisplayObject();
		
		this.DisplayObjectContainer_addChildAt(this._content, 0);
		
		this._contentLoaderInfo.set_content(this._content);
	}
	
	d._addBitmapObject = function ()
	{
		var bitmapData = new flash.display.BitmapData(this._imageObj.width, this._imageObj.height, true, 0x00000000);
		var bitmapdata_Context = bitmapData._virtualcanvas.getContext('2d');
		
		bitmapdata_Context.drawImage(this._imageObj, 0, 0);
		
		try
		{
			bitmapData._initData();
		}
		catch (e)
		{
			this._contentLoaderInfo.dispatchEvent(new flash.events.SecurityErrorEvent(flash.events.SecurityErrorEvent.SECURITY_ERROR));
		}
		
		this._contentLoaderInfo._width = this._imageObj.width;
		this._contentLoaderInfo._height = this._imageObj.height;
		
		this._content = new flash.display.Bitmap(bitmapData);
		
		this.DisplayObjectContainer_addChildAt(this._content, 0);
		
		this._progress(1);
		
		this._contentLoaderInfo.set_content(this._content);
		
		flash.trace("image loaded");
	};
	
	/*public*/
	d.loadBytes = function (bytes/*ByteArray*/, context/*LoaderContext*/)/*void*/
	{
		if (context == undefined) context = null;
		
		
	};
	
	/*public*/
	d.unload = function ()/*void*/
	{
	
	};
	
	/*override*/
	/*public*/
	d.addChild = function (child/*DisplayObject*/)/*DisplayObject*/
	{
		throw new Error(flash.errors.IllegalOperationError, 2069);
	};
	
	/*override*/
	/*public*/
	d.addChildAt = function (child/*DisplayObject*/, index/*int*/)/*DisplayObject*/
	{
		throw new Error(flash.errors.IllegalOperationError, 2069);
	};
	
	/*override*/
	/*public*/
	d.removeChild = function (child/*DisplayObject*/)/*DisplayObject*/
	{
		//throw new Error(flash.errors.IllegalOperationError, 2069);
		
	};
	
	/*override*/
	/*public*/
	d.removeChildAt = function (index/*int*/)/*DisplayObject*/
	{
		throw new Error(flash.errors.IllegalOperationError, 2069);
		
	};
	
	/*override*/
	/*public*/
	d.setChildIndex = function (child/*DisplayObject*/, index/*int*/)/*void*/
	{
		throw new Error(flash.errors.IllegalOperationError, 2069);
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.DisplayObjectContainer_constructor = this.__base__;
		/*super*/
		/*public*/
		this.prototype.DisplayObjectContainer_addChildAt = this.__base__.prototype.addChildAt;
	};
	
	flash.addDescription("flash.display.Loader", d, "flash.display.DisplayObjectContainer", s, null);
	
}
());
