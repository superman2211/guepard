package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.serialization.SWFStream;
	import com.guepard.utils.GeomUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class PlaceObject2 extends PlaceObject
	{
		public function PlaceObject2()
		{
			id = -1;
			depth = -1;
			ratio = -1;
			mask = -1;
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			matrix = null;
			colorTransform = null;
			name = null;
			actions = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.synchBits();
			
			var hasClipActions:Boolean = stream.readBoolBit();
			var isClipBracket:Boolean = stream.readBoolBit();
			var hasName:Boolean = stream.readBoolBit();
			var hasRatio:Boolean = stream.readBoolBit();
			var hasColorTransform:Boolean = stream.readBoolBit();
			var hasMatrix:Boolean = stream.readBoolBit();
			var hasCharacter:Boolean = stream.readBoolBit();
			move = stream.readBoolBit();
			
			stream.synchBits();
			
			depth = stream.byteArray.readUnsignedShort();
			id = hasCharacter ? stream.byteArray.readUnsignedShort() : -1;
			matrix = hasMatrix ? stream.readMatrix() : null;
			colorTransform = hasColorTransform ? stream.readColorTransform() : null;
			ratio = hasRatio ? stream.byteArray.readUnsignedShort() : -1;
			name = hasName ? stream.readString() : null;
			mask = isClipBracket ? stream.byteArray.readUnsignedShort() : -1;
			
			if (hasClipActions)
			{
				actions = new Vector.<uint>();
				
				do
				{
					actions.push(bytes.readUnsignedByte());
				}
				while (bytes.bytesAvailable)
			}
		}
		
		public override function write():void
		{
			bytes = new ByteArray();
			
			var stream:SWFStream = new SWFStream(bytes);
			
			var hasActions:Boolean = actions != null && actions.length > 0;
			var hasMask:Boolean = mask != -1;
			var hasRatio:Boolean = ratio != -1;
			var hasColorTransform:Boolean = colorTransform != null;
			var hasMatrix:Boolean = matrix != null;
			var hasName:Boolean = name != null && name.length > 0;
			var hasCharacter:Boolean = id != -1;
			
			stream.flushBits();
			
			stream.writeBoolBit(hasActions);
			stream.writeBoolBit(hasMask);
			stream.writeBoolBit(hasName);
			stream.writeBoolBit(hasRatio);
			stream.writeBoolBit(hasColorTransform);
			stream.writeBoolBit(hasMatrix);
			stream.writeBoolBit(hasCharacter);
			stream.writeBoolBit(move);
			
			stream.flushBits();
			
			stream.byteArray.writeShort(depth);
			
			if (hasCharacter)
			{
				stream.byteArray.writeShort(id);
			}
			
			if (hasMatrix)
			{
				stream.writeMatrix(matrix);
			}
			
			if (hasColorTransform)
			{
				stream.writeColorTransform(colorTransform);
			}
			
			if (hasRatio)
			{
				stream.byteArray.writeShort(ratio);
			}
			
			if (hasName)
			{
				stream.writeString(name);
			}
			
			if (hasMask)
			{
				stream.byteArray.writeShort(mask);
			}
			
			if (hasActions)
			{
				for (var i:uint = 0; i < actions.length; i++)
				{
					stream.byteArray.writeByte(actions[i]);
				}
			}
		}
		
		override public function toString():String
		{
			return tagName + " (length:" + bytes.length + ", id:" + id + " depth:" + depth + ")";
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			if (id != -1) node.attributes.id = id;
			if (name) node.attributes.name = name;
			if (depth != -1) node.attributes.depth = depth;
			if (mask != -1) node.attributes.mask = mask;
			if (ratio != -1) node.attributes.ratio = ratio;
			if (move) node.attributes.move = move;
			
			if (matrix && !GeomUtil.isEmpty(matrix))
			{
				node.appendChild(XMLUtil.toXML(matrix));
			}
			
			if (colorTransform && !GeomUtil.isEmpty(colorTransform))
			{
				node.appendChild(XMLUtil.toXML(colorTransform));
			}
			
			return node;
		}
	}
}