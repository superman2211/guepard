package com.guepard.parser.info
{
	import com.guepard.utils.XMLUtil;
	
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class MethodInfo extends MemberInfo
	{
		public var overrided:Boolean;
		public var methodType:String;
		public var parameters:Vector.<VariableInfo>;
		public var locals:Vector.<VariableInfo>;
		public var finalMethod:Boolean;
		public var bind:Boolean;
		
		public function get isProperty():Boolean
		{
			return methodType == MethodType.GETTER || methodType == MethodType.SETTER;
		}
		
		public function MethodInfo()
		{
			methodType = MethodType.FUNCTION;
			locals = new Vector.<VariableInfo>();
			bind = true;
		}
		
		override public function toXML(nodeName:String = null):XMLNode
		{
			var variable:VariableInfo;
			
			var node:XMLNode = super.toXML(methodType);
			
			if (overrided)
			{
				node.attributes["override"] = overrided;
			}
			
			if (finalMethod)
			{
				node.attributes["final"] = finalMethod;
			}
			
			if (parameters && parameters.length)
			{
				for each(variable in parameters)
				{
					node.appendChild(variable.toXML());
				}
			}
			
			if (locals && locals.length)
			{
				for each(variable in locals)
				{
					node.appendChild(variable.toXML());
				}
			}
			
			var bodyNode:XMLNode = XMLUtil.getNode(node, "body");
			
			if (bodyNode)
			{
				bodyNode.removeNode();
				
				node.appendChild(bodyNode);
			}
			
			return node;
		}
		
		public function getLocal(name:String):VariableInfo
		{
			if (locals)
			{
				for each(var local:VariableInfo in locals)
				{
					if (local.name == name) return local;
				}
			}
			
			return null;
		}
		
		public function getParameter(name:String):VariableInfo
		{
			if (locals)
			{
				for each(var parameter:VariableInfo in parameters)
				{
					if (parameter.name == name) return parameter;
				}
			}
			
			return null;
		}
		
	}
}