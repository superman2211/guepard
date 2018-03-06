package com.guepard.decompiler.tags
{
	import com.guepard.decompiler.data.Tag;
	import com.guepard.decompiler.serialization.SWFStream;
	
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class DefineScene extends Tag
	{
		public var scenes:Vector.<SceneData>;
		public var labels:Vector.<FrameLabelData>;
		
		public function DefineScene()
		{
			
		}
		
		override public function dispose():void
		{
			super.dispose();
			
			scenes = null;
		}
		
		public override function read():void
		{
			var stream:SWFStream = new SWFStream(bytes);
			
			scenes = new Vector.<SceneData>();
			
			var sceneCount:int = stream.readVarUint32();
			
			if (sceneCount)
			{
				while (sceneCount--)
				{
					var scene:SceneData = new SceneData();
					scene.offset = stream.readVarUint32();
					scene.name = stream.readString();
					scenes.push(scene);
				}
			}
			
			labels = new Vector.<FrameLabelData>();
			
			var labelsCount:int = stream.readVarUint32();
			
			if (labelsCount)
			{
				while (labelsCount--)
				{
					var label:FrameLabelData = new FrameLabelData();
					label.frame = stream.readVarUint32();
					label.name = stream.readString();
					labels.push(label);
				}
			}
		}
		
		override public function toXML():XMLNode
		{
			var node:XMLNode = super.toXML();
			
			for each(var scene:SceneData in scenes)
			{
				var sceneNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "Scene");
				sceneNode.attributes.name = scene.name;
				sceneNode.attributes.offset = scene.offset;
				node.appendChild(sceneNode);
			}
			
			for each(var label:FrameLabelData in labels)
			{
				var labelNode:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, "FrameLabel");
				labelNode.attributes.name = label.name;
				labelNode.attributes.frame = label.frame;
				node.appendChild(labelNode);
			}
			
			return node;
		}
	}
	
}