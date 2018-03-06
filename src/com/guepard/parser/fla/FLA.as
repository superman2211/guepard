package com.guepard.parser.fla
{
	import com.guepard.parser.info.NamespaceInfo;
	import com.guepard.utils.StringUtil;
	
	import deng.fzip.FZip;
	import deng.fzip.FZipFile;
	
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.utils.ByteArray;
	import flash.utils.Dictionary;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class FLA
	{
		public static function correctName(name:String):String
		{
			name = StringUtil.replace(name, " ", "_");
			name = StringUtil.replace(name, "-", "_");
			name = StringUtil.replace(name, ".", "_");
			
			return name;
		}
		
		public var zip:FZip;
		public var file:File;
		public var symbols:Dictionary;
		
		public function FLA(file:File)
		{
			this.file = file;
		}
		
		public function read():void
		{
			symbols = new Dictionary();
			
			var bytes:ByteArray = new ByteArray();
			
			var stream:FileStream = new FileStream();
			stream.open(file, FileMode.READ);
			stream.readBytes(bytes);
			stream.close();
			
			bytes.position = 0;
			
			zip = new FZip();
			zip.loadBytes(bytes);
			
			parse();
		}
		
		public function dispose():void
		{
			zip = null;
			file = null;
			
			if (symbols)
			{
				for each(var symbol:FLASymbol in symbols)
				{
					symbol.dispose();
				}
				
				symbols = null;
			}
		}
		
		private function parse():void
		{
			var symbol:FLASymbol;
			var packageName:String = correctName(file.name);
			
			var domFile:FZipFile = zip.getFileByName("DOMDocument.xml");
			
			if (domFile)
			{
				var domSymbol:FLASymbol = new FLASymbol(domFile, packageName, "MainTimeline");
				domSymbol.fla = this;
				symbols[domSymbol.name] = domSymbol;
				
				for each(var path:String in domSymbol.symbols)
				{
					var symbolFile:FZipFile = zip.getFileByName("LIBRARY/" + path);
					
					symbol = new FLASymbol(symbolFile, packageName);
					symbol.fla = this;
					symbols[symbol.name] = symbol;
				}
				
				for each(var soundClass:String in domSymbol.sounds)
				{
					symbol = new FLASymbol(null, null, soundClass);
					symbol.fla = this;
					symbol.info.extendsInfo = new NamespaceInfo("flash.media.Sound");
					symbols[symbol.name] = symbol;
				}
			}
		}
	}
	
}