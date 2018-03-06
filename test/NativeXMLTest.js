/*class  com.guepard.tests.NativeXMLTest*/
(function ()
{
	"use strict";
	
	
	var d = {};
	
	/*private*/d/*var*/.xml1/*XML*/ = null;
	/*private*/d/*var*/.xml2/*XML*/ = null;
	
	
	/*public*/d.NativeXMLTest = function ()
	{
		this.xml1 = new XML("<test x='1' y=\"2\" name=\"superman 'bla bla bla' \'symbol\' \"/>");
		this.xml2 = new XML("<root name=\"superman\">									<!-- This Is XML Comment -->									<item value=\"1\"/>									<item value=\"2\">This is Text</item>									<item value=\"3\">										<sub text=\"\"></sub>										<item value=\"2211\"/>									</item>								</root>");
		
		var xml/*XML*/ = null;
		
		flash.trace("xml1", this.xml1);
		flash.trace("xml2", this.xml2);
		flash.trace("xml1.toXMLString()", this.xml1.toXMLString());
		flash.trace();
		flash.trace("xml2.toXMLString()", this.xml2.toXMLString());
		flash.trace();
		flash.trace("xml1.@name", this.xml1.attribute('name'));
		flash.trace("xml1.attributes()[0]", this.xml1.attributes()[0]);
		flash.trace("xml1.attribute('name')", this.xml1.attribute('name'));
		flash.trace("xml2.item[0].toXMLString()", this.xml2.child("item")[0].toXMLString());
		flash.trace("xml2.child('item')[0].@value", this.xml2.child('item')[0].attribute('value'));
		flash.trace("xml2.item[0].@value", this.xml2.child("item")[0].attribute('value'));
		flash.trace("xml2..item[3].@value", this.xml2.descendants('item')[3].attribute('value'));
		flash.trace("xml2.descendants('item')[3].attribute('value')", this.xml2.descendants('item')[3].attribute('value'));
		xml = new XML("<root/>");
		xml.attribute('test', 123);
		flash.trace("xml.toXMLString()", xml.toXMLString());
		flash.trace("xml.@test", xml.attribute('test'));
		this.testCondition();
		
	};
	
	/*private*/d.testCondition = function ()/*void*/
	{
		var myXML/*XML*/ = null;
		
		myXML = new XML("<order> 					<item id='1'> 						<menuName>burger</menuName> 						<price>3.95</price> 					</item> 					<item id='2'> 						<menuName>fries</menuName> 						<price>1.45</price> 					</item> 				</order>");
		flash.trace("myXML.item[0].menuName", myXML.child("item")[0].child("menuName"));
		flash.trace("myXML.item.(@id==2).menuName", myXML.child("item").__find__(function (t0/*XML*/)/*Boolean*/
		{
			return /*int*/flash.int(t0.attribute('id')) == 2;
			
		}
		).child("menuName"));
		flash.trace("myXML.item.(menuName=='burger').price", myXML.child("item").__find__(function (t0/*XML*/)/*Boolean*/
		{
			return String(t0.child("menuName")) == "burger";
			
		}
		).child("price"));
		
	};
	
	/*public*/d.testBug = function (ioXMLNode/*XML*/)/*void*/
	{
		var dispose/*int*/ = 0;
		var psName/*String*/ = null;
		var pnDifficulty/*int*/ = 0;
		
		dispose = 100;
		dispose <<= 2;
		psName = ioXMLNode.child("properties").child("text").__find__(function (t0/*XML*/)/*Boolean*/
		{
			return String(t0.attribute('name')) == "name";
			
		}
		).text();
		flash.trace("psName", psName);
		pnDifficulty = /*int*/flash.int(ioXMLNode.child("properties").child("numeric").__find__(function (t0/*XML*/)/*Boolean*/
		{
			return String(t0.attribute('name')) == "difficulty";
			
		}
		).attribute('value'));
		flash.trace("pnDifficulty", pnDifficulty);
		ioXMLNode = ioXMLNode.replace("data", new XML("<data><empty/></data>"));
		flash.trace("ioXMLNode", ioXMLNode);
		throw new Error("genHScrollBar error: constructor method position argument requires either \"top\" (genHScrollBar.TOP) or \"bottom\" (genHScrollBar.BOTTOM).");
		
	};
	
	
	
	
	
	flash.addDescription("com.guepard.tests.NativeXMLTest", d, null, null, null, null);
	
}
());
