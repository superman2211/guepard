package flash.text
{
	import flash.display.*;
	import flash.geom.*;
	
	public class TextField extends InteractiveObject
	{
		public function get maxScrollH():int
		{
		}
		
		public function get numLines():int
		{
		}
		
		public function get scrollH():int
		{
		}
		
		public function set scrollH(value:int):void
		{
		}
		
		public function get caretIndex():int
		{
		}
		
		public function get maxScrollV():int
		{
		}
		
		public function get scrollV():int
		{
		}
		
		public function set scrollV(value:int):void
		{
		}
		
		public function get border():Boolean
		{
		}
		
		public function set border(value:Boolean):void
		{
		}
		
		public function get text():String
		{
		}
		
		public function set text(value:String):void
		{
		}
		
		public function get background():Boolean
		{
		}
		
		public function set background(value:Boolean):void
		{
		}
		
		public function get type():String
		{
		}
		
		public function set type(value:String):void
		{
		}
		
		public function get alwaysShowSelection():Boolean
		{
		}
		
		public function set alwaysShowSelection(value:Boolean):void
		{
		}
		
		public function get sharpness():Number
		{
		}
		
		public function set sharpness(value:Number):void
		{
		}
		
		public function get textColor():uint
		{
		}
		
		public function set textColor(value:uint):void
		{
		}
		
		public function get condenseWhite():Boolean
		{
		}
		
		public function set condenseWhite(value:Boolean):void
		{
		}
		
		public function get autoSize():String
		{
		}
		
		public function set autoSize(value:String):void
		{
		}
		
		public function get styleSheet():StyleSheet
		{
		}
		
		public function set styleSheet(value:StyleSheet):void
		{
		}
		
		public function get displayAsPassword():Boolean
		{
		}
		
		public function set displayAsPassword(value:Boolean):void
		{
		}
		
		public function get antiAliasType():String
		{
		}
		
		public function set antiAliasType(antiAliasType:String):void
		{
		}
		
		public function get selectionEndIndex():int
		{
		}
		
		public function get selectedText():String
		{
			
		}
		
		public function get thickness():Number
		{
		}
		
		public function set thickness(value:Number):void
		{
		}
		
		public function get selectionBeginIndex():int
		{
		}
		
		public function get bottomScrollV():int
		{
		}
		
		public function get htmlText():String
		{
		}
		
		public function set htmlText(value:String):void
		{
		}
		
		public function get selectable():Boolean
		{
		}
		
		public function set selectable(value:Boolean):void
		{
		}
		
		public function get borderColor():uint
		{
		}
		
		public function set borderColor(value:uint):void
		{
		}
		
		public function get textWidth():Number
		{
		}
		
		public function get wordWrap():Boolean
		{
		}
		
		public function set wordWrap(value:Boolean):void
		{
		}
		
		public function get useRichTextClipboard():Boolean
		{
		}
		
		public function set useRichTextClipboard(value:Boolean):void
		{
		}
		
		public function get defaultTextFormat():TextFormat
		{
		}
		
		public function set defaultTextFormat(format:TextFormat):void
		{
		}
		
		public function get multiline():Boolean
		{
		}
		
		public function set multiline(value:Boolean):void
		{
		}
		
		public function get embedFonts():Boolean
		{
		}
		
		public function set embedFonts(value:Boolean):void
		{
		}
		
		public function get textHeight():Number
		{
		}
		
		public function get mouseWheelEnabled():Boolean
		{
		}
		
		public function set mouseWheelEnabled(value:Boolean):void
		{
		}
		
		public function get restrict():String
		{
		}
		
		public function set restrict(value:String):void
		{
		}
		
		public function get gridFitType():String
		{
		}
		
		public function set gridFitType(gridFitType:String):void
		{
		}
		
		public function get backgroundColor():uint
		{
		}
		
		public function set backgroundColor(value:uint):void
		{
		}
		
		public function get maxChars():int
		{
		}
		
		public function set maxChars(value:int):void
		{
		}
		
		public function get length():int
		{
		}
		
		public function TextField()
		{
			
		}
		
		public function replaceText(beginIndex:int, endIndex:int, newText:String):void
		{
		}
		
		public function getImageReference(id:String):DisplayObject
		{
		}
		
		public function getCharBoundaries(charIndex:int):Rectangle
		{
		}
		
		public function getFirstCharInParagraph(charIndex:int):int
		{
		}
		
		public function replaceSelectedText(value:String):void
		{
		}
		
		public function getRawText():String
		{
		}
		
		public function getLineIndexAtPoint(x:Number, y:Number):int
		{
		}
		
		public function appendText(newText:String):void
		{
			
		}
		
		public function getLineIndexOfChar(charIndex:int):int
		{
		}
		
		public function setSelection(beginIndex:int, endIndex:int):void
		{
		}
		
		public function getTextFormat(beginIndex:int = -1, endIndex:int = -1):TextFormat
		{
		}
		
		public function setTextFormat(format:TextFormat, beginIndex:int = -1, endIndex:int = -1):void
		{
		}
		
		public function getTextRuns(beginIndex:int = 0, endIndex:int = 2147483647):Array
		{
		}
		
		public function getLineOffset(lineIndex:int):int
		{
		}
		
		public function getXMLText(beginIndex:int = 0, endIndex:int = 2147483647):String
		{
			
		}
		
		public function getLineText(lineIndex:int):String
		{
		}
		
		public function getParagraphLength(charIndex:int):int
		{
		}
		
		public function getCharIndexAtPoint(x:Number, y:Number):int
		{
		}
		
		public function insertXMLText(beginIndex:int, endIndex:int, richText:String, pasting:Boolean = false):void
		{
		}
		
		public function getLineMetrics(lineIndex:int):TextLineMetrics
		{
		}
		
		public function getLineLength(lineIndex:int):int
		{
		}
		
	}
}
