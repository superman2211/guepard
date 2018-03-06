/*class flash.net.NetStream*/
/*
import flash.events.*;
import flash.media.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.get_audioCodec = function ()/*uint*/
	{
		
	};
	
	d.get_bufferLength = function ()/*Number*/
	{
		
	};
	
	d.get_bufferTime = function ()/*Number*/
	{
		
	};
	
	d.set_bufferTime = function (bufferTime/*Number*/)/*void*/
	{
		
	};
	
	d.get_bytesLoaded = function ()/*uint*/
	{
		
	};
	
	d.get_bytesTotal = function ()/*uint*/
	{
		
	};
	
	d.get_checkPolicyFile = function ()/*Boolean*/
	{
		
	};
	
	d.set_checkPolicyFile = function (state/*Boolean*/)/*void*/
	{
		
	};
	
	d.get_client = function ()/*Object*/
	{
		
	};
	
	d.set_client = function (object/*Object*/)/*void*/
	{
		
	};
	
	d.get_currentFPS = function ()/*Number*/
	{
		
	};
	
	d.get_decodedFrames = function ()/*uint*/
	{
		
	};
	
	d.get_liveDelay = function ()/*Number*/
	{
		
	};
	
	d.get_objectEncoding = function ()/*uint*/
	{
		
	};
	
	d.get_soundTransform = function ()/*SoundTransform*/
	{
		
	};
	
	d.set_soundTransform = function (sndTransform/*SoundTransform*/)/*void*/
	{
		
	};
	
	d.get_time = function ()/*Number*/
	{
		
	};
	
	d.get_videoCodec = function ()/*uint*/
	{
		
	};
	
	
	d.NetStream = function (connection/*NetConnection*/)
	{
		this.EventDispatcher_constructor();
		
		
	};
	
	d.attachAudio = function (microphone/*Microphone*/)/*void*/
	{
		
		
	};
	
	d.attachCamera = function (theCamera/*Camera*/, snapshotMilliseconds/*int*/)/*void*/
	{
		if (snapshotMilliseconds == undefined) snapshotMilliseconds = -1;
		snapshotMilliseconds = /*int*/Math.floor(snapshotMilliseconds);
		
		
	};
	
	d.call = function (stream/*NetStream*/, command/*String*/, responder/*Responder*/)/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 3);
		
		
	};
	
	d.close = function ()/*void*/
	{
		
	};
	
	d.construct = function (connection/*NetConnection*/)/*void*/
	{
		
	};
	
	d.invoke = function (index/*uint*/)
	{
		
	};
	
	d.invokeWithArgsArray = function (index/*uint*/, p_arguments/*Array*/)
	{
		
	};
	
	d.onResult = function (streamId/*int*/)/*void*/
	{
		
	};
	
	d.onStatus = function (info/*null*/)/*void*/
	{
		
	};
	
	d.pause = function ()/*void*/
	{
		
		
	};
	
	d.play = function ()/*void*/
	{
		
	};
	
	d.publish = function (name/*String*/, type/*String*/)/*void*/
	{
		if (name == undefined) name = null;
		if (type == undefined) type = null;
		
		
	};
	
	d.receiveAudio = function (flag/*Boolean*/)/*void*/
	{
		
	};
	
	d.receiveVideo = function (flag/*Boolean*/)/*void*/
	{
		
	};
	
	d.receiveVideoFPS = function (FPS/*Number*/)/*void*/
	{
		
	};
	
	d.resume = function ()/*void*/
	{
		
	};
	
	d.seek = function (offset/*Number*/)/*void*/
	{
		
	};
	
	d.send = function (handlerName/*String*/)/*void*/
	{
		var args/*Array*/ = Array.prototype.slice.call(arguments, 1);
		
	};
	
	d.togglePause = function ()/*void*/
	{
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
		
		this.kAttachAudio/*uint*/ = 1;
		this.kAttachVideo/*uint*/ = 2;
		this.kCall/*uint*/ = 202;
		this.kClose/*uint*/ = 0;
		this.kGetAudioCodecID/*uint*/ = 313;
		this.kGetBufferLength/*uint*/ = 303;
		this.kGetBufferTime/*uint*/ = 302;
		this.kGetBytesLoaded/*uint*/ = 305;
		this.kGetBytesTotal/*uint*/ = 306;
		this.kGetCurrentFps/*uint*/ = 301;
		this.kGetLiveDelay/*uint*/ = 304;
		this.kGetTime/*uint*/ = 300;
		this.kGetTotalFrames/*uint*/ = 307;
		this.kGetVideoCodecID/*uint*/ = 311;
		this.kSend/*uint*/ = 3;
		this.kSetAudioCodecID/*uint*/ = 314;
		this.kSetBufferTime/*uint*/ = 4;
		this.kSetTotalFrames/*uint*/ = 308;
		this.kSetVideoCodecID/*uint*/ = 312;
		
	};
	
	
	flash.addDescription("flash.net.NetStream", d, "flash.events.EventDispatcher", s, null);
	
}
());
