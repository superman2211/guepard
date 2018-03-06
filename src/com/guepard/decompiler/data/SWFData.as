package com.guepard.decompiler.data
{
	import com.guepard.decompiler.abc.info.ClassInfo;
	import com.guepard.decompiler.abc.info.InstanceInfo;
	import com.guepard.decompiler.tags.*;
	
	import flash.geom.Rectangle;
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class SWFData extends TagList
	{
		public var version:uint;
		public var frameRate:Number;
		public var frameCount:uint;
		public var compressed:Boolean;
		public var size:Rectangle;
		
		public function get avm2():Boolean
		{
			var tag:FileAttributes = FileAttributes(getFirstTagByTypes([TagType.FILE_ATTRIBUTES]));
			
			if (tag)
			{
				return tag.avm2;
			}
			else
			{
				return false;
			}
		}
		
		public function get mainClassName():String
		{
			var tag:SymbolClass = SymbolClass(getFirstTagByTypes([TagType.SYMBOL_CLASS]));
			
			if (tag)
			{
				return tag.mainClassName;
			}
			else
			{
				return null;
			}
		}
		
		public function set mainClassName(value:String):void
		{
			var tag:SymbolClass = SymbolClass(getFirstTagByTypes([TagType.SYMBOL_CLASS]));
			
			if (tag)
			{
				tag.mainClassName = value;
			}
		}
		
		public function get backgroundColor():uint
		{
			var tag:SetBackgroundColor = SetBackgroundColor(getFirstTagByTypes([TagType.SET_BACKGROUND_COLOR]));
			
			if (tag)
			{
				return tag.color;
			}
			else
			{
				return 0;
			}
		}
		
		public function set backgroundColor(value:uint):void
		{
			var tag:SetBackgroundColor = SetBackgroundColor(getFirstTagByTypes([TagType.SET_BACKGROUND_COLOR]));
			
			if (tag)
			{
				tag.color = value;
			}
		}
		
		public function SWFData()
		{
			super();
		}
		
		public override function dispose():void
		{
			super.dispose();
			
			size = null;
		}
		
		public function getDoABCFromClassName(className:String):DoABC
		{
			var tags:Vector.<Tag> = getTagsByTypes([TagType.DO_ABC]);
			
			for each (var tag:DoABC in tags)
			{
				var instance:InstanceInfo = tag.abc.getInstance(className);
				
				if (instance != null)
				{
					return tag;
				}
			}
			
			return null;
		}
		
		public function toString():String
		{
			return "SWFData (version:" + version + ", fps:" + frameRate + ")";
		}
		
		public function getInfo():String
		{
			var s:String = "SWFData Information :";
			s += "\n\tVersion = " + version;
			s += "\n\tMovie Size = " + size.width + "x" + size.height;
			s += "\n\tBackground ColorUtil = 0x" + backgroundColor.toString(16);
			s += "\n\tFrame Rate = " + frameRate;
			s += "\n\tFrames Count = " + frameCount;
			s += "\n\tCompressed = " + compressed;
			s += "\n\tMain Class Name = " + mainClassName;
			s += "\n\tTags ( " + numTags + " )";
			
			for (var i:uint = 0; i < numTags; i++)
			{
				s += "\n\t\t" + i + "\t" + getTagAt(i);
			}
			
			return s;
		}
		
		public function toXML():XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "SWFData");
			
			node.attributes.version = version;
			node.attributes.width = size.width;
			node.attributes.height = size.height;
			node.attributes.frameRate = frameRate;
			node.attributes.color = "0x" + backgroundColor.toString(16);
			
			for (var i:int = 0; i < numTags; i++)
			{
				node.appendChild(getTagAt(i).toXML());
			}
			
			return node;
		}
		
		public function getFontTagById(id:uint):DefineFont
		{
			var tags:Vector.<Tag> = getTagsByTypes(
				[TagType.DEFINE_FONT, TagType.DEFINE_FONT_2, TagType.DEFINE_FONT_3, TagType.DEFINE_FONT_4],
				true
			);
			
			for each (var tag:Tag in tags)
			{
				if (tag.id == id) return DefineFont(tag);
			}
			
			return null;
		}
		
		public function correct():void
		{
			var defines:Object = {};
			
			var parameters:CorrectParameters = new CorrectParameters(this, this, defines, 1, true);
			
			correctTags(parameters);
			
			for each(var tag:Tag in defines)
			{
				if (tag is DefineSprite && !tag.scaleCorrected)
				{
					tag.correct(new CorrectParameters(this, null, defines, 1, true));
				}
			}
		}
		
		public function findClassName(value:String):String
		{
			var tags:Vector.<Tag> = getTagsByTypes([TagType.SYMBOL_CLASS], true);
			
			for each(var symbol:SymbolClass in tags)
			{
				var name:String = symbol.findClassName(value);
				
				if (name) return name;
			}
			
			return null;
		}
		
		public function pushRequiredClasses(classes:Vector.<String>):void
		{
			var tags:Vector.<Tag> = getTagsByTypes([TagType.DO_ABC], true);
			
			for each(var doABC:DoABC in tags)
			{
				for each(var abcClass:ClassInfo in doABC.abc.classes)
				{
					classes.push(abcClass.fullName);
				}
			}
		}
	}
	
}