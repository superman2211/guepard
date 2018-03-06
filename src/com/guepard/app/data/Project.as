package com.guepard.app.data
{
	import com.guepard.app.Converter;
	
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Project
	{
		public var data:Object;
		public var file:File;
		public var changed:Boolean;
		
		public function get name():String
		{
			return file ? file.name : "Untilted";
		}
		
		public function Project()
		{
			data = {};
		}
		
		public function write():void
		{
			if (file)
			{
				var stream:FileStream = new FileStream();
				stream.open(file, FileMode.WRITE);
				
				stream.writeUTF(JSON.stringify(data, null, 2));
				
				stream.close();
				
				trace("save project");
			}
		}
		
		public function read():void
		{
			if (file && file.exists)
			{
				var text:String = null;
				
				try
				{
					var stream:FileStream = new FileStream();
					stream.open(file, FileMode.READ);
					text = stream.readUTF();
					stream.close();
				}
				catch (e:Error)
				{
					Converter.output.error("Read project error: " + e.message);
					
					return;
				}
				
				try
				{
					data = JSON.parse(text);
				}
				catch (e:Error)
				{
					Converter.output.error("Parse project error: " + e.message);
					
					return;
				}
			}
		}
	}
	
}