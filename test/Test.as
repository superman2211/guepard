package com.guepard.tests
{
	import com.guepard.app.Converter;
	import com.guepard.app.Converter;
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.serialization.AS3Reader;
	import com.guepard.parser.serialization.CodeAnalyzator;
	import com.guepard.parser.serialization.JSWriter;
	import com.guepard.tests.compact.Compact;
	import com.guepard.utils.XMLUtil;
	
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	
	import flash.filesystem.FileStream;
	
	public class Test
	{
		public static function run():void
		{
			new Temp();
			new Vertex();
			new DictionaryTests();
			new NativeXMLTest();
			new Compact();
			//var m:Matrix3D;
			//var v:Vector3D;
			//new Unknown();
			
			var info:ClassInfo;
			var fileName:String;
			var stream:FileStream;
			
			var test:File = new File(File.applicationDirectory.nativePath).parent.resolvePath("src/com/guepard/tests");
			var sdk:File = Converter.settings.corePath;
			
			if (test.exists && sdk.exists)
			{
				Converter.output.log("Tests Start");
				
				readTestClasses(test, false);
				readTestClasses(sdk, true);
				
				var enabled:Boolean = true;
				var iterations:int = 0;
				
				while (enabled && ++iterations < CodeAnalyzator.ITERATIONS_MAX)
				{
					enabled = false;
					
					CodeAnalyzator.clear();
					
					for each(info in ClassInfo.classes)
					{
						CodeAnalyzator.analyzeClass(info);
					}
					
					for each(info in ClassInfo.classes)
					{
						CodeAnalyzator.correctClass(info);
					}
					
					if (CodeAnalyzator.hasErrors)
					{
						enabled = true;
					}
				}
				
				CodeAnalyzator.traceErrors();
				
				Converter.output.log("Analyze iterations: " + iterations);
				
				for each(info in ClassInfo.classes)
				{
					if (!info.base)
					{
						fileName = info.file.name.split(".")[0];
						
						stream = new FileStream();
						stream.open(info.file.parent.resolvePath(fileName + "_info.xml"), FileMode.WRITE);
						stream.writeUTFBytes(XMLUtil.toMultilineString(info.toXML()));
						stream.close();
						
						var writer:JSWriter = new JSWriter(info);
						writer.write();
						
						stream = new FileStream();
						stream.open(info.file.parent.resolvePath(fileName + ".js"), FileMode.WRITE);
						stream.writeUTFBytes(writer.output);
						stream.close();
					}
				}
				
				Converter.output.log("Tests Complete");
			}
		}
		
		private static function readTestClasses(folder:File, base:Boolean):void
		{
			var files:Array = folder.getDirectoryListing();
			
			for each(var file:File in files)
			{
				if (file.extension == "as")
				{
					var stream:FileStream = new FileStream();
					stream.open(file, FileMode.READ);
					var source:String = stream.readUTFBytes(stream.bytesAvailable);
					stream.close();
					
					var reader:AS3Reader = new AS3Reader(source);
					reader.file = file;
					reader.read();
					
					var fileName:String = file.name.split(".")[0];
					
					if (!base)
					{
						stream = new FileStream();
						stream.open(file.parent.resolvePath(fileName + "_tokens.xml"), FileMode.WRITE);
						stream.writeUTFBytes(XMLUtil.toMultilineString(reader.stream.toXML()));
						stream.close();
						
						//var tokens:Token = Tokenizer.parse(source);
						//Tokenizer.mergeStringsAndComments(tokens);
						//Tokenizer.mergeNumbers(tokens);
						//Tokenizer.mergeBlocks(tokens);
						//Tokenizer.insertSplitter(tokens);
						//Tokenizer.removeSpace(tokens);
						//
						//stream = new FileStream();
						//stream.open(file.parent.resolvePath(fileName + "_base.xml"), FileMode.WRITE);
						//stream.writeUTFBytes(XMLUtil.toMultilineString(tokens.toXML()));
						//stream.close();
					}
					
					for each(var info:ClassInfo in reader.classes)
					{
						info.base = base;
						info.file = file;
					}
				}
				
				if (file.isDirectory)
				{
					readTestClasses(file, base);
				}
			}
		}
	}
}
