package com.guepard.parser.info
{
	import by.blooddy.crypto.MD5;
	
	import com.guepard.app.Converter;
	
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class EmbedInfo
	{
		static public var projectName:String;
		static public var targetFolder:File;
		
		private static var _list:Dictionary = new Dictionary();
		
		static public function get list():Dictionary
		{
			return _list;
		}
		
		static public function addEmbed(file:File):EmbedInfo
		{
			var id:String = MD5.hash(file.nativePath);
			
			var embed:EmbedInfo = _list[id];
			
			if (!embed)
			{
				embed = new EmbedInfo();
				embed.file = file;
				embed.id = id;
				embed.name = projectName + "_" + id + "." + file.extension;
				
				_list[id] = embed;
			}
			
			return embed;
		}
		
		static public function getVector():Vector.<EmbedInfo>
		{
			var vector:Vector.<EmbedInfo> = new Vector.<EmbedInfo>();
			
			for each(var embed:EmbedInfo in _list)
			{
				vector.push(embed);
			}
			
			return vector;
		}
		
		public var file:File;
		public var id:String;
		public var name:String;
		
		public function EmbedInfo()
		{
			
		}
		
		public function export():Boolean
		{
			if (file.exists)
			{
				var bytes:ByteArray = new ByteArray();
				
				var stream:FileStream = new FileStream();
				stream.open(file, FileMode.READ);
				stream.readBytes(bytes, 0, stream.bytesAvailable);
				stream.close();
				
				var target:File = targetFolder.resolvePath(name);
				
				stream = new FileStream();
				stream.open(target, FileMode.WRITE);
				stream.writeBytes(bytes, 0, bytes.length);
				stream.close();
			}
			else
			{
				Converter.output.warning("Embed file   '" + file.nativePath + "'   is not exist");
			}
			
			return true;
		}
	}
}