/*class  Main*/
/*
import flash.display.Sprite;
import flash.text.TextField;
*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	
	/*public*/d.Main = function ()
	{
		
		var textField/*flash.text.TextField*/ = null;
		var integerNumber/*int*/ = 0;
		var floatNumber/*Number*/ = 0;
		var text/*String*/ = null;
		var booleanValue/*Boolean*/ = false;
		var transformObject/*flash.geom.Transform*/ = null;
		var matrix/*flash.geom.Matrix*/ = null;
		var a/*Number*/ = 0;
		var compareValues/*Boolean*/ = false;
		var numberValue/*Number*/ = 0;
		var stringValue/*Number*/ = 0;
		var summValue/*Number*/ = 0;
		
		this.Sprite_constructor();
		textField = new flash.text.TextField();
		textField.set_text("Hello, World");
		this.addChild(textField);
		integerNumber = 1;
		floatNumber = 3.1415;
		text = "test";
		booleanValue = true;
		transformObject = this.get_transform();
		matrix = transformObject.get_matrix();
		a = matrix.a;
		compareValues = integerNumber > 1 && floatNumber < 1;
		numberValue = integerNumber / floatNumber;
		stringValue = integerNumber * floatNumber + text;
		summValue = this.summ(1, 2, 3);
		this.log(compareValues);
		this.log(numberValue);
		this.log(stringValue);
		this.log(summValue);
		
	};
	
	/*internal*/d.log = function (object/*null*/)/*void*/
	{
		var output/*flash.display.DisplayObject*/ = null;
		
		output = this.getChildAt(0);
		output.appendText("\n" + object);
		
	};
	
	/*internal*/d.summ = function (a/*null*/, b/*null*/, c/*null*/)/*Number*/
	{
		var aa/*Number*/ = 0;
		var bb/*int*/ = 0;
		var cc/*Number*/ = 0;
		
		aa = a;
		bb = b + 1;
		cc = c * c;
		return aa + bb + cc;
		
	};
	
	
	var s = {};
	
	s.__init__ = function ()
	{
		/*super*//*public*/this.prototype.Sprite_constructor = this.__base__;
		
		
	};
	
	
	
	
	flash.addDescription("Main", d, "flash.display.Sprite", s, null, ["flash.text.TextField"]);
	
}
());
