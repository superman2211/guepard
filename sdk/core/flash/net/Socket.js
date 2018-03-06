/*class flash.net.Socket*/
/*
import flash.events.*;
import flash.utils.*;
*/
(function ()
{
	"use strict";
	
	var d = {};
	
	
	/*public*/
	d.get_bytesAvailable = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.get_connected = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.get_endian = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.set_endian = function (type/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.get_objectEncoding = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.set_objectEncoding = function (version/*uint*/)/*void*/
	{
		
	};
	
	
	/*public*/
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
	
	/*public*/
	d.close = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.connect = function (host/*String*/, port/*int*/)/*void*/
	{
		
	};
	
	/*public*/
	d.flush = function ()/*void*/
	{
		
	};
	
	/*public*/
	d.readBoolean = function ()/*Boolean*/
	{
		
	};
	
	/*public*/
	d.readByte = function ()/*int*/
	{
		
	};
	
	/*public*/
	d.readBytes = function (bytes/*ByteArray*/, offset/*uint*/, length/*uint*/)/*void*/
	{
		
	};
	
	/*public*/
	d.readDouble = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.readFloat = function ()/*Number*/
	{
		
	};
	
	/*public*/
	d.readInt = function ()/*int*/
	{
		
	};
	
	/*public*/
	d.readMultiByte = function (length/*uint*/, charSet/*String*/)/*String*/
	{
		
	};
	
	/*public*/
	d.readObject = function ()
	{
		
	};
	
	/*public*/
	d.readShort = function ()/*int*/
	{
		
	};
	
	/*public*/
	d.readUTF = function ()/*String*/
	{
		
	};
	
	/*public*/
	d.readUTFBytes = function (length/*uint*/)/*String*/
	{
		
	};
	
	/*public*/
	d.readUnsignedByte = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.readUnsignedInt = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.readUnsignedShort = function ()/*uint*/
	{
		
	};
	
	/*public*/
	d.writeBoolean = function (value/*Boolean*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeByte = function (value/*int*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeBytes = function (bytes/*ByteArray*/, offset/*uint*/, length/*uint*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeDouble = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeFloat = function (value/*Number*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeInt = function (value/*int*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeMultiByte = function (value/*String*/, charSet/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeObject = function (object/*null*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeShort = function (value/*int*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeUTF = function (value/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeUTFBytes = function (value/*String*/)/*void*/
	{
		
	};
	
	/*public*/
	d.writeUnsignedInt = function (value/*uint*/)/*void*/
	{
		
	};
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*/
		/*public*/
		this.prototype.EventDispatcher_constructor = this.__base__;
	}
	
	
	flash.addDescription("flash.net.Socket", d, "flash.events.EventDispatcher", null, [ "flash.utils.IDataInput", "flash.utils.IDataOutput" ]);
	
}
());
