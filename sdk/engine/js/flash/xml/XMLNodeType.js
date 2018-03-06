/*class flash.xml.XMLNodeType*/
(function ()
{
	"use strict";
	
	var s = {};
	
	s.__init__ = function ()
	{
		this.CDATA_NODE/*uint*/ = 4;
		this.COMMENT_NODE/*uint*/ = 8;
		this.DOCUMENT_TYPE_NODE/*uint*/ = 10;
		this.ELEMENT_NODE/*uint*/ = 1;
		this.PROCESSING_INSTRUCTION_NODE/*uint*/ = 7;
		this.TEXT_NODE/*uint*/ = 3;
		this.XML_DECLARATION/*uint*/ = 13;
		
	};
	
	flash.addDescription("flash.xml.XMLNodeType", null, null, s, null);
	
}
());
