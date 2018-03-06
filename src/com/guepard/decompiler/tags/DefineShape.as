package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.CorrectParameters;
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	import com.guepard.utils.GeomUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.geom.Rectangle;
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineShape extends Tag
	{
		public var data:ByteArray;
		
		public var bounds:Rectangle;
		public var map:Rectangle;
		public var atlas:String;
		public var color:Number;
		public var scales:Array;
		
		public function get maxScale():Number
		{
			if (scales && scales.length)
			{
				scales.sort(Array.NUMERIC | Array.DESCENDING);
				
				return scales[0];
			}
			
			return 1;
		}
		
		public function DefineShape()
		{
			super();
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			data = null;
		}
		
		override public function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			id = stream.byteArray.readUnsignedShort();
			
			data = new ByteArray();
			
			stream.byteArray.readBytes(data, 0, stream.byteArray.bytesAvailable);
		}
		
		override public function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.byteArray.writeShort(id);
			
			stream.byteArray.writeBytes(data, 0, data.length);
		}
		
		override public function correct(parameters:CorrectParameters):void
		{
			parameters.defines[id] = this;
			
			if (parameters.stage)
			{
				if (!scales) scales = [];
				
				scales.push(parameters.scale);
			}
		}
		
		override public function toString():String
		{
			return tagName + " (id:" + id + ", data.length:" + data.length + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			node.attributes.id = id;
			
			if (atlas)
			{
				node.attributes.atlas = atlas;
			}
			
			if (!isNaN(color) && color != -1)
			{
				node.attributes.color = "0x" + color.toString(16);
			}
			
			if (bounds && !GeomUtil.isEmpty(bounds))
			{
				node.appendChild(XMLUtil.toXML(bounds, "bounds"));
			}
			
			if (map && !GeomUtil.isEmpty(map))
			{
				node.appendChild(XMLUtil.toXML(map, "map"));
			}
			
			return node;
		}
		
	}
	
}