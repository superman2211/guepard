package com.guepard.compiler
{
	import com.guepard.app.Converter;
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.serialization.AS3Reader;
	import com.guepard.parser.serialization.CodeAnalyzator;
	import com.guepard.parser.serialization.JSWriter;
	import com.guepard.parser.token.Token;
	import com.guepard.utils.JSMinifierUtil;
	import com.guepard.utils.PathUtil;
	import com.guepard.utils.XMLUtil;
	
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	
	public class CompilerData
	{
		public var name:String;
		public var token:Token;
		public var source:File;
		public var targetFolder:File;
		public var debug:File;
		
		public var data:String;
		public var info:ClassInfo;
		public var core:Boolean;
		
		private var _target:File;
		
		public function get target():File
		{
			return _target;
		}
		
		public function CompilerData()
		{
			
		}
		
		public function read():Boolean
		{
			name = source.name.replace(".as", "");
			
			Converter.output.log("Read: " + name);
			
			var stream:FileStream = new FileStream();
			stream.open(source, FileMode.READ);
			data = stream.readUTFBytes(stream.bytesAvailable);
			stream.close();
			
			return true;
		}
		
		public function parse():Boolean
		{
			var xml:XMLNode;
			var xmlFile:File;
			
			Converter.output.log("Parse: " + name);
			
			if (data.length)
			{
				var reader:AS3Reader = new AS3Reader(data);
				reader.file = source;
				reader.read();
				
				token = reader.stream;
				
				//TODO: multiply classes
				if (reader.classes.length)
				{
					info = reader.classes[0];
					
					if (Converter.resources.custom.exportCodeTokens.selected || Converter.resources.custom.exportCodeTree.selected)
					{
						var stream:FileStream = new FileStream();
						stream.open(debug, FileMode.WRITE);
						stream.writeUTFBytes(data);
						stream.close();
						
						var correctedASFile:File = debug.parent.resolvePath(name + "_corrected.as");
						
						stream = new FileStream();
						stream.open(correctedASFile, FileMode.WRITE);
						stream.writeUTFBytes(token.toData(true));
						stream.close();
					}
					
					if (Converter.resources.custom.exportCodeTokens.selected)
					{
						xml = token.toXML();
						
						xmlFile = debug.parent.resolvePath(name + "_tokens.xml");
						
						stream = new FileStream();
						stream.open(xmlFile, FileMode.WRITE);
						stream.writeUTFBytes(XMLUtil.toMultilineString(xml));
						stream.close();
					}
					
					if (Converter.resources.custom.exportCodeTree.selected)
					{
						xml = info.toXML();
						
						xmlFile = debug.parent.resolvePath(name + "_info.xml");
						
						stream = new FileStream();
						stream.open(xmlFile, FileMode.WRITE);
						stream.writeUTFBytes(XMLUtil.toMultilineString(xml));
						stream.close();
					}
				}
			}
			
			return true;
		}
		
		public function optimize():Boolean
		{
			if (info)
			{
				Converter.output.log("Optimize: " + info.fullName);
				
				info.optimize();
			}
			
			return true;
		}
		
		public function analyze():Boolean
		{
			if (info)
			{
				CodeAnalyzator.analyzeClass(info);
			}
			
			return true;
		}
		
		public function correct():Boolean
		{
			if (info)
			{
				CodeAnalyzator.correctClass(info);
			}
			
			return true;
		}
		
		public function export():Boolean
		{
			if (info)
			{
				Converter.output.log("Export: " + info.fullName);
				
				info.optimize();
				
				var writer:JSWriter = new JSWriter(info);
				writer.write();
				
				var code:String = writer.output;
				
				if (!core && !info.appended)
				{
					var stream:FileStream;
					
					if (Converter.target.custom.minify.selected)
					{
						try
						{
							var minifier:JSMinifierUtil = new JSMinifierUtil(code);
							minifier.run();
						}
						catch (e:Error)
						{
							Converter.output.error("Java Script Minify Error: " + info.fullName);
						}
						
						code = minifier.output;
						
						_target = debug.parent.resolvePath(name + ".min.js");
					}
					else
					{
						_target = targetFolder.resolvePath(PathUtil.changeExtension(info.path, "js"));
					}
					
					stream = new FileStream();
					stream.open(_target, FileMode.WRITE);
					stream.writeUTFBytes(code);
					stream.close();
				}
				
				if (Converter.resources.custom.exportCodeTree.selected)
				{
					var xml:XMLNode = info.toXML();
					
					var xmlFile:File = debug.parent.resolvePath(name + "_final.xml");
					
					stream = new FileStream();
					stream.open(xmlFile, FileMode.WRITE);
					stream.writeUTFBytes(XMLUtil.toMultilineString(xml));
					stream.close();
				}
				
			}
			
			return true;
		}
		
		public function dispose():Boolean
		{
			name = null;
			token = null;
			
			data = null;
			info = null;
			
			source = null;
			targetFolder = null;
			debug = null;
			
			_target = null;
			
			return true;
		}
		
	}
	
}