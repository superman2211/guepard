(function ()
{
	"use strict";
	
	flash.createPackage("flash.xml");
	
	flash.xml.test = function ()
	{
		flash.trace("flash.xml.test");
		
		var child1 = new flash.xml.XMLNode(flash.xml.XMLNodeType.ELEMENT_NODE, "child1");
		
		var node = new flash.xml.XMLNode(flash.xml.XMLNodeType.ELEMENT_NODE, "test");
		node.get_attributes().field = "this is test field";
		node.appendChild(child1);
		node.appendChild(new flash.xml.XMLNode(flash.xml.XMLNodeType.ELEMENT_NODE, "child2"));
		node.appendChild(new flash.xml.XMLNode(flash.xml.XMLNodeType.ELEMENT_NODE, "child3"));
		
		var s = node.toString();
		flash.trace(s);
		
		child1.removeNode();
		
		flash.trace(node.toString(), child1.get_prefix());
		
		var xml = new flash.xml.XMLDocument();
		xml.parseXML(s);
		
		flash.trace();
		
		xml.parseXML(s);
		flash.trace("xml = " + xml);
		
		xml.parseXML("<root/>");
		flash.trace("xml = " + xml);
		
		xml.parseXML("<root><node/></root>");
		flash.trace("xml = " + xml);
		
		xml.parseXML("<root1/><root2/>");
		flash.trace("xml = " + xml);
		
		s = '<SWFData color="0xffffff" frameRate="30" height="400" version="10" width="600">';
		s += '<FileAttributes/>';
		s += '<Metadata/>';
		s += '<SetBackgroundColor/>';
		s += '<DefineScene>';
		s += '<Scene name="Scene 1" offset="0"/>';
		s += '</DefineScene>';
		
		s += '<DefineShape4 atlas="preloader_0.png" id="1">';
		s += '<Rectangle height="45" name="bounds" width="43.85" x="-21.9" y="-22.5"/>';
		s += '<Rectangle height="45" name="map" width="43.85" y="71"/>';
		s += '</DefineShape4>';
		
		s += '<DefineSprite frames="1" id="2">';
		s += '<PlaceObject2 depth="1" id="1"/>';
		s += '<ShowFrame index="1"/>';
		s += '<End/>';
		s += '</DefineSprite>';
		s += '</SWFData>';
		
		xml.parseXML(s);
		
		flash.trace("xml = " + xml);
		
		flash.trace();
	};
}
());