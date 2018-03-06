/*class flash.net.Socket*/
/*
import flash.events.*;
import flash.utils.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	d.get_bytesAvailable = function ()/*uint*/
	{
		
	};
	
	d.get_connected = function ()/*Boolean*/
	{
		
	};
	
	d.get_endian = function ()/*String*/
	{
		
	};
	
	d.set_endian = function (type/*String*/)/*void*/
	{
		
	};
	
	d.get_objectEncoding = function ()/*uint*/
	{
		
	};
	
	d.set_objectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	
	d.Socket = function (host/*String*/, port/*int*/)
	{
		this.EventDispatcher_constructor();
		if (host == undefined) host = null;
		if (port == undefined) port = 0;
		port = /*int*/Math.floor(port);
		
		
		if (host != null)
		{
			this.connect(host, port);
			
		}
		return;
		
	};
	
	d.close = function ()/*void*/
	{
		
	};
	
	d.connect = function (host/*String*/, port/*int*/)/*void*/
	{
		
	};
	
	d.flush = function ()/*void*/
	{
		
	};
	
	d.readBoolean = function ()/*Boolean*/
	{
		
	};
	
	d.readByte = function ()/*int*/
	{
		
	};
	
	d.readBytes = function (bytes/*ByteArray*/, offset/*uint*/, length/*uint*/)/*void*/
	{
		
	};
	
	d.readDouble = function ()/*Number*/
	{
		
	};
	
	d.readFloat = function ()/*Number*/
	{
		
	};
	
	d.readInt = function ()/*int*/
	{
		
	};
	
	d.readMultiByte = function (length/*uint*/, charSet/*String*/)/*String*/
	{
		
	};
	
	d.readObject = function ()
	{
		
	};
	
	d.readShort = function ()/*int*/
	{
		
	};
	
	d.readUTF = function ()/*String*/
	{
		
	};
	
	d.readUTFBytes = function (length/*uint*/)/*String*/
	{
		
	};
	
	d.readUnsignedByte = function ()/*uint*/
	{
		
	};
	
	d.readUnsignedInt = function ()/*uint*/
	{
		
	};
	
	d.readUnsignedShort = function ()/*uint*/
	{
		
	};
	
	d.writeBoolean = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	d.writeByte = function (value/*int*/)/*void*/
	{
		
	};
	
	d.writeBytes = function (bytes/*ByteArray*/, offset/*uint*/, length/*uint*/)/*void*/
	{
		
	};
	
	d.writeDouble = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.writeFloat = function (value/*Number*/)/*void*/
	{
		
	};
	
	d.writeInt = function (value/*int*/)/*void*/
	{
		
	};
	
	d.writeMultiByte = function (value/*String*/, charSet/*String*/)/*void*/
	{
		
	};
	
	d.writeObject = function (object/*null*/)/*void*/
	{
		
	};
	
	d.writeShort = function (value/*int*/)/*void*/
	{
		
	};
	
	d.writeUTF = function (value/*String*/)/*void*/
	{
		
	};
	
	d.writeUTFBytes = function (value/*String*/)/*void*/
	{
		
	};
	
	d.writeUnsignedInt = function (value/*uint*/)/*void*/
	{
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	
	flash.addDescription("flash.net.Socket", d, "flash.events.EventDispatcher", null, [ "flash.utils.IDataInput", "flash.utils.IDataOutput" ]);
	
}
());
