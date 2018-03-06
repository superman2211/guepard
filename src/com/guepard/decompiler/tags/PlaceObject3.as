package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.serialization.SWFStream;
	import com.guepard.utils.GeomUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.filters.BitmapFilter;
	import flash.utils.ByteArray;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class PlaceObject3 extends PlaceObject
	{
		public function PlaceObject3()
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
			filters = null;
			blendMode = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			stream.synchBits();
			
			var hasActions:Boolean = stream.readBoolBit();
			var hasMask:Boolean = stream.readBoolBit();
			var hasName:Boolean = stream.readBoolBit();
			var hasRatio:Boolean = stream.readBoolBit();
			var hasColorTransform:Boolean = stream.readBoolBit();
			var hasMatrix:Boolean = stream.readBoolBit();
			var hasCharacter:Boolean = stream.readBoolBit();
			move = stream.readBoolBit();
			
			var reserved:Boolean = stream.readBoolBit();
			var hasOpaqueBackground:Boolean = stream.readBoolBit();
			var hasVisible:Boolean = stream.readBoolBit();
			var hasImage:Boolean = stream.readBoolBit();
			var hasClassName:Boolean = stream.readBoolBit();
			var hasCacheAsBitmap:Boolean = stream.readBoolBit();
			var hasBlendMode:Boolean = stream.readBoolBit();
			var hasFilterList:Boolean = stream.readBoolBit();
			
			stream.synchBits();
			
			depth = stream.byteArray.readUnsignedShort();
			
			if (hasClassName || (hasImage && hasCharacter))
			{
				className = stream.readString();
			}
			
			id = hasCharacter ? stream.byteArray.readUnsignedShort() : -1;
			matrix = hasMatrix ? stream.readMatrix() : null;
			colorTransform = hasColorTransform ? stream.readColorTransform() : null;
			ratio = hasRatio ? stream.byteArray.readUnsignedShort() : -1;
			name = hasName ? stream.readString() : null;
			mask = hasMask ? stream.byteArray.readUnsignedShort() : -1;
			
			if (hasFilterList)
			{
				filters = new Vector.<BitmapFilter>();
				
				stream.readFilterList(filters);
			}
			
			if (hasBlendMode)
			{
				blendMode = stream.readBlendMode();
			}
			
			if (hasCacheAsBitmap)
			{
				if (stream.byteArray.bytesAvailable)
				{
					cacheAsBitmap = stream.byteArray.readUnsignedByte() > 0;
				}
			}
			
			if (hasVisible)
			{
				visible = stream.byteArray.readUnsignedByte() > 0;
			}
			
			if (hasOpaqueBackground)
			{
				opaqueBackground = stream.readRGBA();
			}
			
			if (hasActions)
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
				//TODO add matrix serialization
				//stream.writeSwfMatrix(matrix);
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
				stream.writeChars(name.split());
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
			if (className) node.attributes["class"] = className;
			if (blendMode) node.attributes.blendMode = blendMode;
			if (!visible) node.attributes.visible = visible;
			if (cacheAsBitmap) node.attributes.cacheAsBitmap = cacheAsBitmap;
			if (opaqueBackground) node.attributes.opaqueBackground = opaqueBackground;
			
			if (matrix && !GeomUtil.isEmpty(matrix))
			{
				node.appendChild(XMLUtil.toXML(matrix));
			}
			
			if (colorTransform && !GeomUtil.isEmpty(colorTransform))
			{
				node.appendChild(XMLUtil.toXML(colorTransform));
			}
			
			if (filters)
			{
				for each(var filter:BitmapFilter in filters)
				{
					node.appendChild(XMLUtil.toXML(filter));
				}
			}
			
			return node;
		}
	}
}