package com.guepard.utils
{
	import flash.filters.BevelFilter;
	import flash.filters.BlurFilter;
	import flash.filters.ColorMatrixFilter;
	import flash.filters.ConvolutionFilter;
	import flash.filters.DropShadowFilter;
	import flash.filters.GlowFilter;
	import flash.filters.GradientBevelFilter;
	import flash.filters.GradientGlowFilter;
	import flash.geom.ColorTransform;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.xml.XMLDocument;
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class XMLUtil
	{
		static public var COMPRESS_VALUE:Number = 1000;
		
		public static function getPercent(xmlNode:XMLNode, attributeName:String):Number
		{
			var percent:String = String(xmlNode.attributes[attributeName]).replace(",", ".");
			return Number(percent.substr(0, percent.length - 1)) / 100;
		}
		
		public static function getString(xmlNode:XMLNode, attributeName:String):String
		{
			return String(xmlNode.attributes[attributeName]);
		}
		
		public static function getNumber(xmlNode:XMLNode, attributeName:String):Number
		{
			return Number(String(xmlNode.attributes[attributeName]).replace(",", "."));
		}
		
		public static function getInt(xmlNode:XMLNode, attributeName:String):int
		{
			return int(Number(String(xmlNode.attributes[attributeName]).replace(",", ".")));
		}
		
		public static function getUint(xmlNode:XMLNode, attributeName:String):uint
		{
			return uint(Number(String(xmlNode.attributes[attributeName]).replace(",", ".")));
		}
		
		public static function getBoolean(xmlNode:XMLNode, attributeName:String):Boolean
		{
			return String(xmlNode.attributes[attributeName]).toLowerCase() == "true";
		}
		
		static public function getObject(xmlNode:XMLNode, attributeName:String):Object
		{
			return xmlNode.attributes[attributeName];
		}
		
		public static function getNode(xmlNode:XMLNode, nodeName:String):XMLNode
		{
			for each(var node:XMLNode in xmlNode.childNodes)
			{
				if (node.nodeName == nodeName) return node;
			}
			
			return null;
		}
		
		static public function getNodeByAttribute(xmlNode:XMLNode, attribute:String, name:String):XMLNode
		{
			for each(var node:XMLNode in xmlNode.childNodes)
			{
				if (node.attributes[attribute] == name) return node;
			}
			
			return null;
		}
		
		public static function hasAttribute(xmlNode:XMLNode, attributeName:String):Boolean
		{
			return xmlNode.attributes.hasOwnProperty(attributeName);
		}
		
		static public function hasNode(xmlNode:XMLNode, nodeName:String):Boolean
		{
			for each(var node:XMLNode in xmlNode.childNodes)
			{
				if (node.nodeName == nodeName) return true;
			}
			
			return false;
		}
		
		public static function toMultilineString(xmlNode:XMLNode, tab:String = "\r\n", compact:Boolean = true):String
		{
			if (!xmlNode) return String(xmlNode);
			
			if (xmlNode is XMLDocument)
			{
				return toMultilineString(xmlNode.firstChild, tab, compact);
			}
			
			var data:String = "";
			
			if (xmlNode.nodeType == XMLNodeType.CDATA_NODE)
			{
				data += tab + "<![CDATA[" + tab + "\t" + xmlNode.nodeValue + tab + "]]>" + tab;
			}
			else if (xmlNode.nodeType == XMLNodeType.TEXT_NODE)
			{
				data += xmlNode.nodeValue;
			}
			else if (xmlNode.childNodes.length)
			{
				data += tab + "<" + xmlNode.nodeName + attributesToString(xmlNode) + ">";
				
				for each(var child:XMLNode in xmlNode.childNodes)
				{
					data += toMultilineString(child, tab + "\t", compact);
				}
				
				data += tab + "</" + xmlNode.nodeName + ">";
				data += tab;
			}
			else
			{
				if (compact)
				{
					data += tab + "<" + xmlNode.nodeName + attributesToString(xmlNode) + "/>";
				}
				else
				{
					data += tab + "<" + xmlNode.nodeName + attributesToString(xmlNode) + "></" + xmlNode.nodeName + ">";
				}
			}
			
			return data;
		}
		
		static public function toXML(object:Object, name:String = null, digits:uint = 3):XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "Object");
			
			if (object == null)
			{
				node.nodeName = "null";
			}
			else if (object is Number)
			{
				node.nodeName = "Number";
				
				node.attributes.value = compressNumber(Number(object));
			}
			else if (object is int)
			{
				node.nodeName = "int";
				
				node.attributes.value = object;
			}
			else if (object is uint)
			{
				node.nodeName = "uint";
				
				node.attributes.value = object;
			}
			else if (object is String)
			{
				node.nodeName = "String";
				
				node.attributes.value = object;
			}
			else if (object is Boolean)
			{
				node.nodeName = "Boolean";
				
				node.attributes.value = object;
			}
			else if (object is Point)
			{
				node.nodeName = "Point";
				
				var point:Point = Point(object);
				
				if (point.x != 0) node.attributes.x = compressNumber(point.x);
				if (point.y != 0) node.attributes.y = compressNumber(point.y);
			}
			else if (object is Rectangle)
			{
				node.nodeName = "Rectangle";
				
				var rectangle:Rectangle = Rectangle(object);
				
				if (rectangle.x != 0) node.attributes.x = compressNumber(rectangle.x);
				if (rectangle.y != 0) node.attributes.y = compressNumber(rectangle.y);
				if (rectangle.width != 0) node.attributes.width = compressNumber(rectangle.width);
				if (rectangle.height != 0) node.attributes.height = compressNumber(rectangle.height);
			}
			else if (object is Matrix)
			{
				node.nodeName = "Matrix";
				
				var matrix:Matrix = Matrix(object);
				
				if (matrix.a != 1) node.attributes.a = compressNumber(matrix.a);
				if (matrix.b != 0) node.attributes.b = compressNumber(matrix.b);
				if (matrix.c != 0) node.attributes.c = compressNumber(matrix.c);
				if (matrix.d != 1) node.attributes.d = compressNumber(matrix.d);
				
				if (matrix.tx != 0) node.attributes.tx = compressNumber(matrix.tx);
				if (matrix.ty != 0) node.attributes.ty = compressNumber(matrix.ty);
			}
			else if (object is ColorTransform)
			{
				node.nodeName = "ColorTransform";
				
				var colorTransform:ColorTransform = ColorTransform(object);
				
				if (colorTransform.redMultiplier != 1) node.attributes.redMultiplier = compressNumber(colorTransform.redMultiplier);
				if (colorTransform.greenMultiplier != 1) node.attributes.greenMultiplier = compressNumber(colorTransform.greenMultiplier);
				if (colorTransform.blueMultiplier != 1) node.attributes.blueMultiplier = compressNumber(colorTransform.blueMultiplier);
				if (colorTransform.alphaMultiplier != 1) node.attributes.alphaMultiplier = compressNumber(colorTransform.alphaMultiplier);
				
				if (colorTransform.redOffset != 0) node.attributes.redOffset = compressNumber(colorTransform.redOffset);
				if (colorTransform.greenOffset != 0) node.attributes.greenOffset = compressNumber(colorTransform.greenOffset);
				if (colorTransform.blueOffset != 0) node.attributes.blueOffset = compressNumber(colorTransform.blueOffset);
				if (colorTransform.alphaOffset != 0) node.attributes.alphaOffset = compressNumber(colorTransform.alphaOffset);
			}
			else if (object is Array)
			{
				node.nodeName = "Array";
				
				var array:Array = object as Array;
				
				for each(var item:Object in array)
				{
					node.appendChild(toXML(item));
				}
			}
			else if (object is DropShadowFilter)
			{
				node.nodeName = "DropShadowFilter";
				
				var dropShadowFilter:DropShadowFilter = DropShadowFilter(object);
				
				node.attributes.alpha = compressNumber(dropShadowFilter.alpha);
				node.attributes.angle = compressNumber(dropShadowFilter.angle);
				node.attributes.blurX = compressNumber(dropShadowFilter.blurX);
				node.attributes.blurY = compressNumber(dropShadowFilter.blurY);
				
				node.attributes.color = dropShadowFilter.color;
				
				node.attributes.distance = compressNumber(dropShadowFilter.distance);
				node.attributes.hideObject = dropShadowFilter.hideObject;
				
				node.attributes.inner = dropShadowFilter.inner;
				node.attributes.knockout = dropShadowFilter.knockout;
				node.attributes.quality = dropShadowFilter.quality;
				node.attributes.strength = compressNumber(dropShadowFilter.strength);
			}
			else if (object is BlurFilter)
			{
				node.nodeName = "BlurFilter";
				
				var blurFilter:BlurFilter = BlurFilter(object);
				
				node.attributes.blurX = compressNumber(blurFilter.blurX);
				node.attributes.blurY = compressNumber(blurFilter.blurY);
				node.attributes.quality = blurFilter.quality;
			}
			else if (object is GlowFilter)
			{
				node.nodeName = "GlowFilter";
				
				var glowFilter:GlowFilter = GlowFilter(object);
				
				node.attributes.alpha = compressNumber(glowFilter.alpha);
				node.attributes.blurX = compressNumber(glowFilter.blurX);
				node.attributes.blurY = compressNumber(glowFilter.blurY);
				
				node.attributes.color = glowFilter.color;
				
				node.attributes.inner = glowFilter.inner;
				node.attributes.knockout = glowFilter.knockout;
				node.attributes.quality = glowFilter.quality;
				node.attributes.strength = compressNumber(glowFilter.strength);
			}
			else if (object is BevelFilter)
			{
				node.nodeName = "BevelFilter";
				
				var bevelFilter:BevelFilter = BevelFilter(object);
				
				node.attributes.angle = compressNumber(bevelFilter.angle);
				node.attributes.blurX = compressNumber(bevelFilter.blurX);
				node.attributes.blurY = compressNumber(bevelFilter.blurY);
				node.attributes.distance = compressNumber(bevelFilter.distance);
				
				node.attributes.highlightAlpha = compressNumber(bevelFilter.highlightAlpha);
				node.attributes.highlightColor = bevelFilter.highlightColor;
				
				node.attributes.knockout = bevelFilter.knockout;
				node.attributes.quality = bevelFilter.quality;
				
				node.attributes.shadowAlpha = compressNumber(bevelFilter.shadowAlpha);
				node.attributes.shadowColor = bevelFilter.shadowColor;
				
				node.attributes.strength = compressNumber(bevelFilter.strength);
			}
			else if (object is GradientGlowFilter)
			{
				node.nodeName = "GradientGlowFilter";
				
				var gradientGlowFilter:GradientGlowFilter = GradientGlowFilter(object);
				
				node.attributes.angle = compressNumber(gradientGlowFilter.angle);
				node.attributes.blurX = compressNumber(gradientGlowFilter.blurX);
				node.attributes.blurY = compressNumber(gradientGlowFilter.blurY);
				node.attributes.distance = compressNumber(gradientGlowFilter.distance);
				node.attributes.knockout = gradientGlowFilter.knockout;
				
				node.attributes.quality = gradientGlowFilter.quality;
				
				node.attributes.strength = compressNumber(gradientGlowFilter.strength);
				
				node.attributes.alphas = gradientGlowFilter.alphas.join(",");
				node.attributes.colors = gradientGlowFilter.colors.join(",");
				node.attributes.ratios = gradientGlowFilter.ratios.join(",");
			}
			else if (object is ConvolutionFilter)
			{
				node.nodeName = "ConvolutionFilter";
				
				var convolutionFilter:ConvolutionFilter = ConvolutionFilter(object);
				
				node.attributes.alpha = compressNumber(convolutionFilter.alpha);
				node.attributes.bias = compressNumber(convolutionFilter.bias);
				node.attributes.clamp = convolutionFilter.clamp;
				node.attributes.color = convolutionFilter.color;
				node.attributes.divisor = compressNumber(convolutionFilter.divisor);
				
				node.attributes.matrixX = convolutionFilter.matrixX;
				node.attributes.matrixY = convolutionFilter.matrixY;
				
				node.attributes.preserveAlpha = convolutionFilter.preserveAlpha;
				
				node.attributes.matrix = convolutionFilter.matrix.join(",");
			}
			else if (object is ColorMatrixFilter)
			{
				node.nodeName = "ColorMatrixFilter";
				
				var colorMatrixFilter:ColorMatrixFilter = ColorMatrixFilter(object);
				
				node.attributes.matrix = colorMatrixFilter.matrix.join(",");
			}
			else if (object is GradientBevelFilter)
			{
				node.nodeName = "GradientBevelFilter";
				
				var gradientBevelFilter:GradientBevelFilter = GradientBevelFilter(object);
				
				node.attributes.angle = compressNumber(gradientBevelFilter.angle);
				node.attributes.blurX = compressNumber(gradientBevelFilter.blurX);
				node.attributes.blurY = compressNumber(gradientBevelFilter.blurY);
				
				node.attributes.distance = compressNumber(gradientBevelFilter.distance);
				node.attributes.knockout = gradientBevelFilter.knockout;
				node.attributes.quality = gradientBevelFilter.quality;
				
				node.attributes.strength = compressNumber(gradientBevelFilter.strength);
				node.attributes.type = gradientBevelFilter.type;
				
				node.attributes.alphas = gradientBevelFilter.alphas.join(",");
				node.attributes.colors = gradientBevelFilter.colors.join(",");
				node.attributes.ratios = gradientBevelFilter.ratios.join(",");
			}
			else
			{
				node.nodeName = "Object";
				
				for (var property:String in object)
				{
					node.attributes[property] = object[property];
				}
			}
			
			if (name)
			{
				node.attributes.name = name;
			}
			
			return node;
		}
		
		static private function attributesToString(xmlNode:XMLNode):String
		{
			var data:String = "";
			
			var list:Array = [];
			
			for (var name:String in xmlNode.attributes)
			{
				list.push({name: name, value: xmlNode.attributes[name]});
			}
			
			list.sortOn("name", Array.CASEINSENSITIVE);
			
			for each(var object:Object in list)
			{
				data += ' ' + object.name + '="' + object.value + '"';
			}
			
			return data;
		}
		
		static private function compressNumber(value:Number):String
		{
			if (value == 0) return "0";
			if (value == 1) return "1";
			
			return String(Math.round(value * COMPRESS_VALUE) / COMPRESS_VALUE);
		}
	}
	
}