package com.guepard.parser.serialization
{
	import com.guepard.app.Converter;
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.info.MemberInfo;
	import com.guepard.parser.token.Token;
	import com.guepard.parser.token.Tokenizer;
	
	import flash.filesystem.File;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class CodeReader
	{
		public var file:File;
		
		protected var _stream:Token;
		
		public function get stream():Token
		{
			return _stream;
		}
		
		protected var _classes:Vector.<ClassInfo>;
		
		public function get classes():Vector.<ClassInfo>
		{
			return _classes;
		}
		
		protected var _source:String;
		
		public function get source():String
		{
			return _source;
		}
		
		public function CodeReader(source:String)
		{
			_source = source;
		}
		
		public function dispose():void
		{
			_classes = null;
			_source = null;
			_stream = null;
		}
		
		public function read():void
		{
			_stream = Tokenizer.tokenize(_source);
		}
		
		protected function errorMessage(message:String, member:MemberInfo, error:Boolean):void
		{
			var data:String = message + (member ? " In member: '" + member.name + "'" : "") + (file ? " In file: '" + file.nativePath + "'" : "");
			
			if (error)
			{
				Converter.output.error(data);
			}
			else
			{
				Converter.output.warning(data);
			}
		}
	}
	
}