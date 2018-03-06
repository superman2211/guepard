package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	import com.guepard.utils.GeomUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.filters.BitmapFilter;
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ButtonRecord
	{
		public var flags:uint;
		public var id:uint;
		public var depth:uint;
		public var colorTransform:ColorTransform;
		public var matrix:Matrix;
		public var filters:Vector.<BitmapFilter>;
		public var blendMode:String;
		
		public function get reserved1():Boolean
		{
			return Boolean(flags & 0x80);
		}
		
		public function get reserved2():Boolean
		{
			return Boolean(flags & 0x40);
		}
		
		public function get hasBlendMode():Boolean
		{
			return Boolean(flags & 0x20);
		}
		
		public function get hasFilterList():Boolean
		{
			return Boolean(flags & 0x10);
		}
		
		public function get stateHitTest():Boolean
		{
			return Boolean(flags & 0x08);
		}
		
		public function get stateDown():Boolean
		{
			return Boolean(flags & 0x04);
		}
		
		public function get stateOver():Boolean
		{
			return Boolean(flags & 0x02);
		}
		
		public function get stateUp():Boolean
		{
			return Boolean(flags & 0x01);
		}
		
		public function ButtonRecord()
		{
			
		}
		
		public function read(stream:SWFStream, define:Tag):void
		{
			flags = stream.byteArray.readUnsignedByte();
			
			id = stream.byteArray.readUnsignedShort();
			
			depth = stream.byteArray.readUnsignedShort();
			
			matrix = stream.readMatrix();
			
			if (define is DefineButton2)
			{
				colorTransform = stream.readColorTransform(true);
				
				if (hasFilterList)
				{
					filters = new Vector.<BitmapFilter>();
					stream.readFilterList(filters);
				}
				
				if (hasBlendMode)
				{
					blendMode = stream.readBlendMode();
				}
			}
		}
		
		public function write(stream:SWFStream, define:Tag):void
		{
			stream.byteArray.writeByte(flags);
			
			stream.byteArray.writeShort(id);
			
			stream.byteArray.writeShort(depth);
			
			stream.writeMatrix(matrix);
			
			if (define is DefineButton2)
			{
				stream.writeColorTransform(colorTransform, true);
				
				if (hasFilterList)
				{
					//TODO: add filter list serialization
					//stream.writeFilterList(filters);
				}
				
				if (hasBlendMode)
				{
					//TODO: add blend mode serialization
					//stream.writeBlendMode(blendMode);
				}
			}
		}
		
		public function toXML():XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "ButtonRecord");
			
			node.attributes.id = id;
			node.attributes.depth = depth;
			
			if (matrix && !GeomUtil.isEmpty(matrix))
			{
				node.appendChild(XMLUtil.toXML(matrix));
			}
			
			if (colorTransform && !GeomUtil.isEmpty(colorTransform))
			{
				node.appendChild(XMLUtil.toXML(colorTransform));
			}
			
			if (blendMode)
			{
				node.attributes.blendMode = blendMode;
			}
			
			if (stateHitTest) node.attributes.stateHitTest = true;
			if (stateDown) node.attributes.stateDown = true;
			if (stateOver) node.attributes.stateOver = true;
			if (stateUp) node.attributes.stateUp = true;
			
			return node;
		}
	}
	
}