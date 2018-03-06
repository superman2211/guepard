package com.guepard.parser.info
{
	import com.guepard.parser.token.Token;
	
	import flash.utils.Dictionary;
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class VariableInfo extends MemberInfo
	{
		public var variableType:String;
		public var constant:Boolean;
		public var multiply:Boolean;
		public var index:int;
		public var symbolName:String;
		public var parameters:Dictionary;
		public var getter:MethodInfo;
		public var setter:MethodInfo;
		
		public function get hasDefaultValue():Boolean
		{
			if (body && body.length == 1 && type)
			{
				var token:Token = body[0].token;
				
				if (token && token.data == defaultValue)
				{
					return true;
				}
			}
			
			return false;
		}
		
		public function get defaultValue():String
		{
			switch (String(type))
			{
				case "Number":
				case "int":
				case "uint":
					return "0";
				
				case "Boolean":
					return "false";
				
				default:
					return "null";
			}
		}
		
		public function VariableInfo()
		{
			variableType = VariableType.LOCAL;
		}
		
		override public function toXML(nodeName:String = null):XMLNode
		{
			var node:XMLNode = super.toXML(variableType);
			
			if (constant)
			{
				node.attributes["const"] = constant;
			}
			
			if (multiply)
			{
				node.attributes["multiply"] = multiply;
			}
			
			if (parameters)
			{
				var parametersNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "parameters");
				
				for (var property:String in parameters)
				{
					parametersNode.attributes[property] = parameters[property];
				}
				
				node.appendChild(parametersNode);
			}
			
			return node;
		}
	}
	
}