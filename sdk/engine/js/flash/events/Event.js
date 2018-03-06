/*class flash.events.Event*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	d._target = null;
	d._type = null;
	d._bubbles = false;
	d._cancelable = false;
	
	d.get_bubbles = function ()/*Boolean*/
	{
		return this._bubbles;
		
	};
	
	d.get_cancelable = function ()/*Boolean*/
	{
		return this._cancelable;
		
	};
	
	d.get_currentTarget = function ()/*Object*/
	{
		return this._target;
		
	};
	
	d.get_eventPhase = function ()/*uint*/
	{
		return 0;
		
	};
	
	d.get_target = function ()/*Object*/
	{
		return this._target;
		
	};
	
	d.get_type = function ()/*String*/
	{
		return this._type;
	};
	
	
	d.Event = function (type/*String*/, bubbles/*Boolean*/, cancelable/*Boolean*/)
	{
		if (bubbles == undefined) bubbles = false;
		if (cancelable == undefined) cancelable = false;
		
		this._type = type;
		this._bubbles = bubbles;
		this._cancelable = cancelable;
	};
	
	d.clone = function ()/*Event*/
	{
		return new flash.events.Event(this.get_type(), this.get_bubbles(), this.get_cancelable());
		
	};
	
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
	
	d.isDefaultPrevented = function ()/*Boolean*/
	{
		return false;
		
	};
	
	d.preventDefault = function ()/*void*/
	{
		
	};
	
	d.stopImmediatePropagation = function ()/*void*/
	{
		
	};
	
	d.stopPropagation = function ()/*void*/
	{
		
	};
	
	d.toString = function ()/*String*/
	{
		return this.formatToString("Event", "type", "bubbles", "cancelable", "eventPhase");
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.ACTIVATE/*String*/ = "activate";
		this.ADDED/*String*/ = "added";
		this.ADDED_TO_STAGE/*String*/ = "addedToStage";
		this.CANCEL/*String*/ = "cancel";
		this.CHANGE/*String*/ = "change";
		this.CHANNEL_MESSAGE/*String*/ = "channelMessage";
		this.CHANNEL_STATE/*String*/ = "channelState";
		this.CLEAR/*String*/ = "clear";
		this.CLOSE/*String*/ = "close";
		this.COMPLETE/*String*/ = "complete";
		this.CONNECT/*String*/ = "connect";
		this.CONTEXT3D_CREATE/*String*/ = "context3DCreate";
		this.COPY/*String*/ = "copy";
		this.CUT/*String*/ = "cut";
		this.DEACTIVATE/*String*/ = "deactivate";
		this.ENTER_FRAME/*String*/ = "enterFrame";
		this.EXIT_FRAME/*String*/ = "exitFrame";
		this.FRAME_CONSTRUCTED/*String*/ = "frameConstructed";
		this.FRAME_LABEL/*String*/ = "frameLabel";
		this.FULLSCREEN/*String*/ = "fullScreen";
		this.ID3/*String*/ = "id3";
		this.INIT/*String*/ = "init";
		this.MOUSE_LEAVE/*String*/ = "mouseLeave";
		this.OPEN/*String*/ = "open";
		this.PASTE/*String*/ = "paste";
		this.REMOVED/*String*/ = "removed";
		this.REMOVED_FROM_STAGE/*String*/ = "removedFromStage";
		this.RENDER/*String*/ = "render";
		this.RESIZE/*String*/ = "resize";
		this.SCROLL/*String*/ = "scroll";
		this.SELECT/*String*/ = "select";
		this.SELECT_ALL/*String*/ = "selectAll";
		this.SOUND_COMPLETE/*String*/ = "soundComplete";
		this.SUSPEND/*String*/ = "suspend";
		this.TAB_CHILDREN_CHANGE/*String*/ = "tabChildrenChange";
		this.TAB_ENABLED_CHANGE/*String*/ = "tabEnabledChange";
		this.TAB_INDEX_CHANGE/*String*/ = "tabIndexChange";
		this.TEXTURE_READY/*String*/ = "textureReady";
		this.TEXT_INTERACTION_MODE_CHANGE/*String*/ = "textInteractionModeChange";
		this.UNLOAD/*String*/ = "unload";
		this.VIDEO_FRAME/*String*/ = "videoFrame";
		this.WORKER_STATE/*String*/ = "workerState";
		
	};
	
	
	flash.addDescription("flash.events.Event", d, null, s, null);
	
}
());
