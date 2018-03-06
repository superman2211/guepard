package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SymbolClass extends Tag
	{
		public var symbols:Array;
		
		public function get mainClassName():String
		{
			for each(var symbol:SymbolData in symbols)
			{
				if (symbol.id == 0)
				{
					return symbol.name;
				}
			}
			
			return null;
		}
		
		public function set mainClassName(value:String):void
		{
			for each(var symbol:SymbolData in symbols)
			{
				if (symbol.id == 0)
				{
					symbol.name = value;
					return;
				}
			}
		}
		
		public function SymbolClass()
		{
			
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			symbols = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			var count:uint = stream.byteArray.readUnsignedShort();
			
			symbols = [];
			
			while (count--)
			{
				var symbol:SymbolData = new SymbolData();
				symbol.id = stream.byteArray.readUnsignedShort();
				symbol.name = stream.readString();
				symbols.push(symbol);
			}
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(symbols.length);
			
			for each(var symbol:SymbolData in symbols)
			{
				stream.byteArray.writeShort(symbol.id);
				stream.writeString(symbol.name);
			}
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			for each(var symbol:SymbolData in symbols)
			{
				node.appendChild(symbol.toXML());
			}
			
			return node;
		}
		
		public function findClassName(value:String):String
		{
			for each(var symbol:SymbolData in symbols)
			{
				if (symbol.name.length >= value.length && symbol.name.substring(0, value.length) == value)
				{
					return symbol.name;
				}
			}
			
			return null;
		}
		
		public function pushRequiredClasses(classes:Vector.<String>):void
		{
			for each(var symbol:SymbolData in symbols)
			{
				if (classes.indexOf(symbol.name) == -1)
				{
					classes.push(symbol.name);
				}
			}
		}
	}
	
}