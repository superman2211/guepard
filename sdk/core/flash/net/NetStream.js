/*class flash.net.NetStream*/
/*
import flash.events.*;
import flash.media.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_audioCodec = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.get_bufferLength = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.get_bufferTime = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.set_bufferTime = function (bufferTime/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_bytesLoaded = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.get_bytesTotal = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.get_checkPolicyFile = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.set_checkPolicyFile = function (state/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_client = function ()/*Object*/
	{
		
	};
	
	/*public*/
	d.set_client = function (object/*Object*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_currentFPS = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.get_decodedFrames = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.get_liveDelay = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.get_objectEncoding = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.get_soundTransform = function ()/*SoundTransform*/
	{
		
	};
	
	/*public*/
	d.set_soundTransform = function (sndTransform/*SoundTransform*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_time = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.get_videoCodec = function ()/*uint*/
	{
		
	};
	
	
	/*public*/
	d.NetStream = function (connection/*NetConnection*/)
	{
		this.EventDispatcher_constructor();
		
		
	};
	
	/*public*/
	d.attachAudio = function (microphone/*Microphone*/)/*void*/
	{
		
		
	};
	
	/*public*/
	d.attachCamera = function (theCamera/*Camera*/, snapshotMilliseconds/*int*/)/*void*/
	{
		if (snapshotMilliseconds == undefined) snapshotMilliseconds = -1;
		snapshotMilliseconds = /*int*/Math.floor(snapshotMilliseconds);
		
		
	};
	
	/*private*/
	d.call = function (stream/*NetStream*/, command/*String*/, responder/*Responder*/)/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 3);
		
		
	};
	
	/*public*/
	d.close = function ()/*void*/
	{
		
	};
	
	/*private*/
	d.construct = function (connection/*NetConnection*/)/*void*/
	{
		
	};
	
	/*private*/
	d.invoke = function (index/*uint*/)
	{
		
	};
	
	/*private*/
	d.invokeWithArgsArray = function (index/*uint*/, p_arguments/*Array*/)
	{
		
	};
	
	/*private*/
	d.onResult = function (streamId/*int*/)/*void*/
	{
		
	};
	
	/*private*/
	d.onStatus = function (info/*null*/)/*void*/
	{
		
	};
	
	/*public*/
	d.pause = function ()/*void*/
	{
		
		
	};
	
	/*public*/
	d.play = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.publish = function (name/*String*/, type/*String*/)/*void*/
	{
		if (name == undefined) name = null;
		if (type == undefined) type = null;
		
		
	};
	
	/*public*/
	d.receiveAudio = function (flag/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.receiveVideo = function (flag/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.receiveVideoFPS = function (FPS/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.resume = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.seek = function (offset/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.send = function (handlerName/*String*/)/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 1);
		
	};
	
	/*public*/
	d.togglePause = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
		
		/*private*/
		this/*const*/.kAttachAudio/*uint*/ = 1;
		/*private*/
		this/*const*/.kAttachVideo/*uint*/ = 2;
		/*private*/
		this/*const*/.kCall/*uint*/ = 202;
		/*private*/
		this/*const*/.kClose/*uint*/ = 0;
		/*private*/
		this/*const*/.kGetAudioCodecID/*uint*/ = 313;
		/*private*/
		this/*const*/.kGetBufferLength/*uint*/ = 303;
		/*private*/
		this/*const*/.kGetBufferTime/*uint*/ = 302;
		/*private*/
		this/*const*/.kGetBytesLoaded/*uint*/ = 305;
		/*private*/
		this/*const*/.kGetBytesTotal/*uint*/ = 306;
		/*private*/
		this/*const*/.kGetCurrentFps/*uint*/ = 301;
		/*private*/
		this/*const*/.kGetLiveDelay/*uint*/ = 304;
		/*private*/
		this/*const*/.kGetTime/*uint*/ = 300;
		/*private*/
		this/*const*/.kGetTotalFrames/*uint*/ = 307;
		/*private*/
		this/*const*/.kGetVideoCodecID/*uint*/ = 311;
		/*private*/
		this/*const*/.kSend/*uint*/ = 3;
		/*private*/
		this/*const*/.kSetAudioCodecID/*uint*/ = 314;
		/*private*/
		this/*const*/.kSetBufferTime/*uint*/ = 4;
		/*private*/
		this/*const*/.kSetTotalFrames/*uint*/ = 308;
		/*private*/
		this/*const*/.kSetVideoCodecID/*uint*/ = 312;
		
	};
	
	
	flash.addDescription("flash.net.NetStream", d, "flash.events.EventDispatcher", s, null);
	
}
());
