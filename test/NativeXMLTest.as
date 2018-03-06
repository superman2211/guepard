package com.guepard.tests 
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class NativeXMLTest 
	{
		//native xmls
		private var xml1:XML = <test x='1' y="2" name="superman 'bla bla bla' \'symbol\' "/>;
		private var xml2:XML = <root name="superman">
									<!-- This Is XML Comment -->
									<item value="1"/>
									<item value="2">This is Text</item>
									<item value="3">
										<sub text=""></sub>
										<item value="2211"/>
									</item>
								</root>;
								
		public function NativeXMLTest() 
		{
			trace("xml1", xml1);
			trace("xml2", xml2);
			trace("xml1.toXMLString()", xml1.toXMLString());
			trace();
			trace("xml2.toXMLString()", xml2.toXMLString());
			trace();
			trace("xml1.@name", xml1.@name);
			trace("xml1.attributes()[0]", xml1.attributes()[0]);
			trace("xml1.attribute('name')", xml1.attribute('name'));
			trace("xml2.item[0].toXMLString()", xml2.item[0].toXMLString());
			trace("xml2.child('item')[0].@value", xml2.child('item')[0].@value);
			trace("xml2.item[0].@value", xml2.item[0].@value);
			trace("xml2..item[3].@value", xml2..item[3].@value);
			trace("xml2.descendants('item')[3].attribute('value')", xml2.descendants('item')[3].attribute('value'));
			
			var xml:XML = new XML("<root/>");
			xml.@test = 123;
			
			trace("xml.toXMLString()", xml.toXMLString());
			trace("xml.@test", xml.@test);
			
			testCondition();
		}
		
		private function testCondition():void 
		{
			var myXML:XML =  
				<order> 
					<item id='1'> 
						<menuName>burger</menuName> 
						<price>3.95</price> 
					</item> 
					<item id='2'> 
						<menuName>fries</menuName> 
						<price>1.45</price> 
					</item> 
				</order>
				
			trace("myXML.item[0].menuName", myXML.item[0].menuName); // OutputController: burger
			trace("myXML.item.(@id==2).menuName", myXML.item.(@id==2).menuName); // OutputController: fries
			trace("myXML.item.(menuName=='burger').price", myXML.item.(menuName=="burger").price); // OutputController: 3.95
		}
		
		public function testBug(ioXMLNode:XML):void
		{
			var dispose:int = 100;
			dispose <<= 2;
			
			var psName:String = ioXMLNode.properties.text.(@name=="name").text();
			trace("psName", psName);
			
			var pnDifficulty:int = int(ioXMLNode.properties.numeric.(@name=="difficulty").@value);
			trace("pnDifficulty", pnDifficulty);
			
			ioXMLNode = ioXMLNode.replace("data",<data><empty/></data>);
			trace("ioXMLNode", ioXMLNode);
			
			throw new Error("genHScrollBar error: constructor method position argument requires either \"top\" (genHScrollBar.TOP) or \"bottom\" (genHScrollBar.BOTTOM).");
		}
		
	}

}