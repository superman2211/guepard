/// <reference path="../flash.js" />
/// <reference path="utils.js" />
/// <reference path="ByteArray.js" />
/// <reference path="Endian.js" />

(function ()
{
	"use strict";
	
	flash.createPackage("flash.utils");
	
	flash.utils.test = function ()
	{
		flash.trace("flash.utils.test");
		
		flash.trace("getTimer = " + flash.utils.getTimer());
		flash.trace("describeType = " + flash.utils.describeType(null));
		flash.trace("getDefinitionByName = " + flash.utils.getDefinitionByName("flash.utils.Timer"));
		flash.trace("getQualifiedClassName = " + flash.utils.getQualifiedClassName(new flash.utils.Timer()));
		flash.trace("getQualifiedSuperclassName = " + flash.utils.getQualifiedSuperclassName(new flash.utils.Timer()));
		
		/*var obj = {};
		
		obj.onTimer = function (e)
		{
			flash.trace("onTimer", e, e.get_target());
		}
		
		obj.onTimerComplete = function(e)
		{
			var parameters = e.get_target()
			
			flash.trace("onTimerComplete", e, parameters);
			
			flash.trace("has TIMER = " + parameters.hasEventListener(flash.events.TimerEvent.TIMER));
			flash.trace("has TIMER_COMPLETE = " + parameters.hasEventListener(flash.events.TimerEvent.TIMER_COMPLETE));
			
			parameters.removeEventListener(flash.events.TimerEvent.TIMER, flash.bindFunction(obj, obj.onTimer));
			parameters.removeEventListener(flash.events.TimerEvent.TIMER_COMPLETE, flash.bindFunction(obj, obj.onTimerComplete));
			
			flash.trace("has TIMER = " + parameters.hasEventListener(flash.events.TimerEvent.TIMER));
			flash.trace("has TIMER_COMPLETE = " + parameters.hasEventListener(flash.events.TimerEvent.TIMER_COMPLETE));
			
			flash.trace();
		}
		
		var timer = new flash.utils.Timer(1000, 5);
		timer.addEventListener(flash.events.TimerEvent.TIMER, flash.bindFunction(obj, obj.onTimer));
		timer.addEventListener(flash.events.TimerEvent.TIMER_COMPLETE, flash.bindFunction(obj, obj.onTimerComplete));
		flash.trace(timer);
		
		timer.start();//*/
		
		flash.trace();
		flash.trace("test byte");
		
		var bytes = new flash.utils.ByteArray();
		bytes.writeByte(64);
		bytes.writeByte(1000);
		bytes.writeByte(128);
		bytes.writeByte(255);
		bytes.writeByte(256);
		bytes.writeByte(-64);
		bytes.writeByte(200);
		bytes.writeByte(200);
		
		flash.trace("bytesAvailable = " + bytes.get_bytesAvailable());
		
		bytes.set_position(0);
		
		flash.trace("data = " + bytes._data);
		
		flash.trace("bytesAvailable = " + bytes.get_bytesAvailable());
		flash.trace("length = " + bytes.get_length());
		
		flash.trace(bytes.readByte());
		flash.trace(bytes.readByte());
		flash.trace(bytes.readByte());
		flash.trace(bytes.readByte());
		flash.trace(bytes.readByte());
		flash.trace(bytes.readByte());
		flash.trace(bytes.readByte());
		flash.trace(bytes.readUnsignedByte());
		
		flash.trace("bytesAvailable = " + bytes.get_bytesAvailable());
		
		flash.trace("length = " + bytes.get_length());
		
		bytes.set_position(bytes.get_position() - 1);
		
		bytes.writeByte(1);
		bytes.writeByte(1);
		
		flash.trace("length = " + bytes.get_length());
		flash.trace("data = " + bytes._data);
		
		flash.trace();
		flash.trace("test short");
		
		bytes.set_length(0);
		//bytes.set_endian(flash.utils.Endian.LITTLE_ENDIAN);
		
		bytes.writeShort(200);
		bytes.writeShort(50000);
		bytes.writeShort(-22222);
		
		flash.trace("data = " + bytes._data);
		flash.trace("length = " + bytes.get_length());
		
		bytes.set_position(0);
		
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		
		bytes.set_position(0);
		
		flash.trace(bytes.readUnsignedShort());
		flash.trace(bytes.readUnsignedShort());
		flash.trace(bytes.readUnsignedShort());
		
		bytes.set_position(0);
		
		flash.trace(bytes.readShort());
		flash.trace(bytes.readShort());
		flash.trace(bytes.readShort());
		
		flash.trace();
		flash.trace("test int");
		
		//bytes.set_endian(flash.utils.Endian.LITTLE_ENDIAN);
		bytes.set_length(0);
		
		bytes.writeUnsignedInt(-1000000);
		
		bytes.set_position(0);
		
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		
		bytes.set_position(0);
		
		flash.trace(bytes.readInt());
		
		bytes.set_position(0);
		
		flash.trace(bytes.readUnsignedInt());
		
		flash.trace();
		flash.trace("test boolean");
		
		bytes.set_length(0);
		
		bytes.writeBoolean(false);
		bytes.writeBoolean(true);
		
		bytes.set_position(0);
		
		flash.trace(bytes.readBoolean());
		flash.trace(bytes.readBoolean());
		
		flash.trace();
		flash.trace("test float");
		
		//bytes.set_endian(flash.utils.Endian.LITTLE_ENDIAN);
		bytes.set_length(0);
		
		bytes.writeFloat(1234.56789);
		
		bytes.set_position(0);
		
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		
		bytes.set_position(0);
		
		flash.trace(bytes.readFloat());
		
		flash.trace();
		flash.trace("test double");
		
		//bytes.set_endian(flash.utils.Endian.LITTLE_ENDIAN);
		bytes.set_length(0);
		
		bytes.writeDouble(-1234.56789);
		//bytes.writeDouble(0.5);
		
		bytes.set_position(0);
		
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		flash.trace(bytes.readUnsignedByte());
		
		bytes.set_position(0);
		
		flash.trace(bytes.readDouble());
	};
}
());