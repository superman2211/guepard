package com.guepard.decompiler.abc
{
	import com.guepard.decompiler.abc.info.ClassInfo;
	import com.guepard.decompiler.abc.info.ConstantPool;
	import com.guepard.decompiler.abc.info.InstanceInfo;
	import com.guepard.decompiler.abc.info.MetaData;
	import com.guepard.decompiler.abc.info.MethodBody;
	import com.guepard.decompiler.abc.info.MethodInfo;
	import com.guepard.decompiler.abc.info.ScriptInfo;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class ABCData
	{
		public var minorVersion:uint;
		public var majorVersion:uint;
		
		public var constantPool:ConstantPool;
		
		public var methodInfos:Array;
		public var metadataInfos:Array;
		public var instanceInfos:Array;
		public var classes:Array;
		public var scripts:Array;
		public var bodies:Array;
		
		public function ABCData()
		{
			
		}
		
		public function dispose():void
		{
			if (constantPool)
			{
				constantPool.dispose();
				constantPool = null;
			}
			
			if (methodInfos)
			{
				for each(var method:MethodInfo in methodInfos)
				{
					method.dispose();
				}
				
				methodInfos = null;
			}
			
			if (metadataInfos)
			{
				for each(var metadata:MetaData in metadataInfos)
				{
					metadata.dispose();
				}
				
				metadataInfos = null;
			}
			
			if (instanceInfos)
			{
				for each(var instance:InstanceInfo in instanceInfos)
				{
					instance.dispose();
				}
				
				instanceInfos = null;
			}
			
			if (classes)
			{
				for each(var classInfo:ClassInfo in classes)
				{
					classInfo.dispose();
				}
				
				classes = null;
			}
			
			if (scripts)
			{
				for each(var script:ScriptInfo in scripts)
				{
					script.dispose();
				}
				
				scripts = null;
			}
			
			if (bodies)
			{
				for each(var body:MethodBody in bodies)
				{
					body.dispose();
				}
				
				bodies = null;
			}
		}
		
		public function getInstance(name:String):InstanceInfo
		{
			for each(var instance:InstanceInfo in instanceInfos)
			{
				if (instance.classPath == name) return instance;
			}
			
			return null;
		}
		
		public function getClass(name:String):ClassInfo
		{
			var instance:InstanceInfo = getInstance(name);
			
			if (instance)
			{
				for each(var abcClass:ClassInfo in classes)
				{
					if (abcClass.instanceReference == instance) return abcClass;
				}
			}
			
			return null;
		}
		
		public function append(abc:ABCData):void
		{
			constantPool.append(abc.constantPool);
			
			var value:Object;
			
			for each (value in abc.methodInfos)
			{
				methodInfos.push(value);
			}
			
			for each (value in abc.metadataInfos)
			{
				metadataInfos.push(value);
			}
			
			for each (value in abc.instanceInfos)
			{
				instanceInfos.push(value);
			}
			
			for each (value in abc.classes)
			{
				classes.push(value);
			}
			
			for each (value in abc.scripts)
			{
				scripts.push(value);
			}
			
			for each (value in abc.bodies)
			{
				bodies.push(value);
			}
		}
		
		public function toString():String
		{
			return "ABCData (version:" + minorVersion + "." + majorVersion + ")";
		}
	}
}