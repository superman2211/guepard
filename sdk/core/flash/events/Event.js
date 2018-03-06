/*class flash.events.Event*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._target = null;
	d._type = null;
	d._bubbles = false;
	d._cancelable = false;
	
	/*public*/
	d.get_bubbles = function ()/*Boolean*/
	{
		return this._bubbles;
		
	};
	
	/*public*/
	d.get_cancelable = function ()/*Boolean*/
	{
		return this._cancelable;
		
	};
	
	/*public*/
	d.get_currentTarget = function ()/*Object*/
	{
		return this._target;
		
	};
	
	/*public*/
	d.get_eventPhase = function ()/*uint*/
	{
		return 0;
		
	};
	
	/*public*/
	d.get_target = function ()/*Object*/
	{
		return this._target;
		
	};
	
	/*public*/
	d.get_type = function ()/*String*/
	{
		return this._type;
	};
	
	
	/*public*/
	d.Event = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		
		this._type = type;
		this._bubbles = bubbles;
		this._cancelable = cancelable;
	};
	
	/*public*/
	d.clone = function ()/*Event*/
	{
		return new flash.events.Event(this.get_type(), this.get_bubbles(), this.get_cancelable());
		
	};
	
	/*public*/
	d.formatToString = function (className/*String*/)/*String*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 1);
		
		
		var data/*String*/ = "";
		data += "object " + className + "(";
		
		for /*each*/(var t0 in args)
		{
			var argument/*Object*/ = args[ t0 ];
			
			data += " " + argument + ": " + this.getProperty(argument) + ",";
			
		}
		data = data.substring(0, data.length - 1) + " ";
		data += ")";
		return data;
		
	};
	
	/*public*/
	d.isDefaultPrevented = function ()/*Boolean*/
	{
		return false;
		
	};
	
	/*public*/
	d.preventDefault = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.stopImmediatePropagation = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.stopPropagation = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.toString = function ()/*String*/
	{
		return this.formatToString("Event", "type", "bubbles", "cancelable", "eventPhase");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*public*/
		this/*const*/.ACTIVATE/*String*/ = "activate";
		/*public*/
		this/*const*/.ADDED/*String*/ = "added";
		/*public*/
		this/*const*/.ADDED_TO_STAGE/*String*/ = "addedToStage";
		/*public*/
		this/*const*/.CANCEL/*String*/ = "cancel";
		/*public*/
		this/*const*/.CHANGE/*String*/ = "change";
		/*public*/
		this/*const*/.CHANNEL_MESSAGE/*String*/ = "channelMessage";
		/*public*/
		this/*const*/.CHANNEL_STATE/*String*/ = "channelState";
		/*public*/
		this/*const*/.CLEAR/*String*/ = "clear";
		/*public*/
		this/*const*/.CLOSE/*String*/ = "close";
		/*public*/
		this/*const*/.COMPLETE/*String*/ = "complete";
		/*public*/
		this/*const*/.CONNECT/*String*/ = "connect";
		/*public*/
		this/*const*/.CONTEXT3D_CREATE/*String*/ = "context3DCreate";
		/*public*/
		this/*const*/.COPY/*String*/ = "copy";
		/*public*/
		this/*const*/.CUT/*String*/ = "cut";
		/*public*/
		this/*const*/.DEACTIVATE/*String*/ = "deactivate";
		/*public*/
		this/*const*/.ENTER_FRAME/*String*/ = "enterFrame";
		/*public*/
		this/*const*/.EXIT_FRAME/*String*/ = "exitFrame";
		/*public*/
		this/*const*/.FRAME_CONSTRUCTED/*String*/ = "frameConstructed";
		/*public*/
		this/*const*/.FRAME_LABEL/*String*/ = "frameLabel";
		/*public*/
		this/*const*/.FULLSCREEN/*String*/ = "fullScreen";
		/*public*/
		this/*const*/.ID3/*String*/ = "id3";
		/*public*/
		this/*const*/.INIT/*String*/ = "init";
		/*public*/
		this/*const*/.MOUSE_LEAVE/*String*/ = "mouseLeave";
		/*public*/
		this/*const*/.OPEN/*String*/ = "open";
		/*public*/
		this/*const*/.PASTE/*String*/ = "paste";
		/*public*/
		this/*const*/.REMOVED/*String*/ = "removed";
		/*public*/
		this/*const*/.REMOVED_FROM_STAGE/*String*/ = "removedFromStage";
		/*public*/
		this/*const*/.RENDER/*String*/ = "render";
		/*public*/
		this/*const*/.RESIZE/*String*/ = "resize";
		/*public*/
		this/*const*/.SCROLL/*String*/ = "scroll";
		/*public*/
		this/*const*/.SELECT/*String*/ = "select";
		/*public*/
		this/*const*/.SELECT_ALL/*String*/ = "selectAll";
		/*public*/
		this/*const*/.SOUND_COMPLETE/*String*/ = "soundComplete";
		/*public*/
		this/*const*/.SUSPEND/*String*/ = "suspend";
		/*public*/
		this/*const*/.TAB_CHILDREN_CHANGE/*String*/ = "tabChildrenChange";
		/*public*/
		this/*const*/.TAB_ENABLED_CHANGE/*String*/ = "tabEnabledChange";
		/*public*/
		this/*const*/.TAB_INDEX_CHANGE/*String*/ = "tabIndexChange";
		/*public*/
		this/*const*/.TEXTURE_READY/*String*/ = "textureReady";
		/*public*/
		this/*const*/.TEXT_INTERACTION_MODE_CHANGE/*String*/ = "textInteractionModeChange";
		/*public*/
		this/*const*/.UNLOAD/*String*/ = "unload";
		/*public*/
		this/*const*/.VIDEO_FRAME/*String*/ = "videoFrame";
		/*public*/
		this/*const*/.WORKER_STATE/*String*/ = "workerState";
		
	};
	
	
	flash.addDescription("flash.events.Event", d, null, s, null);
	
}
());
