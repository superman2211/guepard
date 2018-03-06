package com.guepard.decompiler.abc
{
	import com.guepard.decompiler.abc.codes.*;
	import com.guepard.decompiler.abc.info.ClassInfo;
	import com.guepard.decompiler.abc.info.ConstantPool;
	import com.guepard.decompiler.abc.info.ConstantsInfo;
	import com.guepard.decompiler.abc.info.ExceptionInfo;
	import com.guepard.decompiler.abc.info.InstanceInfo;
	import com.guepard.decompiler.abc.info.ItemInfo;
	import com.guepard.decompiler.abc.info.MetaData;
	import com.guepard.decompiler.abc.info.MethodBody;
	import com.guepard.decompiler.abc.info.MethodInfo;
	import com.guepard.decompiler.abc.info.MultinameInfo;
	import com.guepard.decompiler.abc.info.NamespaceInfo;
	import com.guepard.decompiler.abc.info.NamespaceSetInfo;
	import com.guepard.decompiler.abc.info.OptionInfo;
	import com.guepard.decompiler.abc.info.ParameterInfo;
	import com.guepard.decompiler.abc.info.ScriptInfo;
	import com.guepard.decompiler.abc.traits.*;
	import com.guepard.decompiler.serialization.*;
	
	import flash.utils.ByteArray;
	
	/**
	 * @author Antonov Sergey
	 */
	public class ABCSerializator
	{
		public static function read(byteArray:ByteArray):ABCData
		{
			var stream:SWFStream = new SWFStream(byteArray);
			var abc:ABCData = new ABCData();
			abc.minorVersion = stream.byteArray.readUnsignedShort();
			abc.majorVersion = stream.byteArray.readUnsignedShort();
			abc.constantPool = readConstantPool(stream);
			abc.methodInfos = readMethodInfos(stream, abc.constantPool);
			abc.metadataInfos = readMetadataInfos(stream, abc.constantPool);
			abc.instanceInfos = readInstanceInfos(stream, abc);
			abc.classes = readClasses(stream, abc);
			abc.scripts = readScripts(stream, abc);
			abc.bodies = readBodies(stream, abc);
			return abc;
		}
		
		public static function readMultiname(stream:SWFStream, constantsPool:ConstantPool):MultinameInfo
		{
			var multiname:MultinameInfo = new MultinameInfo();
			multiname.kind = stream.byteArray.readUnsignedByte();
			switch (multiname.kind)
			{
				case ConstantsInfo.CONSTANT_Qname:
				case ConstantsInfo.CONSTANT_QnameA:
					multiname.namespaceLink = constantsPool.namespaces[stream.readVarUint32()];
					multiname.name = constantsPool.strings[stream.readVarUint32()];
					return multiname;
				case ConstantsInfo.CONSTANT_RTQname:
				case ConstantsInfo.CONSTANT_RTQnameA:
					multiname.name = constantsPool.strings[stream.readVarUint32()];
					return multiname;
				case ConstantsInfo.CONSTANT_RTQnameL:
				case ConstantsInfo.CONSTANT_RTQnameLA:
					return multiname;
				case ConstantsInfo.CONSTANT_NameL:
				case ConstantsInfo.CONSTANT_NameLA:
					multiname.namespaceLink = new NamespaceInfo();
					return multiname;
				case ConstantsInfo.CONSTANT_Multiname:
				case ConstantsInfo.CONSTANT_MultinameA:
					multiname.name = constantsPool.strings[stream.readVarUint32()];
					multiname.namespaceSet = constantsPool.namespaceSets[stream.readVarUint32()];
					return multiname;
				case ConstantsInfo.CONSTANT_MultinameL:
				case ConstantsInfo.CONSTANT_MultinameLA:
					multiname.namespaceSet = constantsPool.namespaceSets[stream.readVarUint32()];
					return multiname;
				case ConstantsInfo.CONSTANT_TypeName:
					multiname.multinameLink = constantsPool.multinames[stream.readVarUint32()];
					multiname.types = [];
					var count:uint = stream.readVarUint32();
					while (count > 0)
					{
						multiname.types.push(constantsPool.multinames[stream.readVarUint32()]);
						count--;
					}
					return multiname;
				default:
					throw new Error("invalid multiname kind : " + multiname.kind.toString(16));
			}
		}
		
		public static function readNamespaceSet(stream:SWFStream, constantsPool:ConstantPool):NamespaceSetInfo
		{
			var count:uint = stream.readVarUint32();
			var nss:NamespaceSetInfo = new NamespaceSetInfo();
			nss.namespaces = [];
			while (count > 0)
			{
				nss.namespaces.push(constantsPool.namespaces[stream.readVarUint32()]);
				count--;
			}
			return nss;
		}
		
		public static function readNamespace(stream:SWFStream, constantsPool:ConstantPool):NamespaceInfo
		{
			var ns:NamespaceInfo = new NamespaceInfo();
			ns.kind = stream.byteArray.readUnsignedByte();
			var nameIndex:uint = stream.readVarUint32();
			ns.info = constantsPool.strings[nameIndex];
			switch (ns.kind)
			{
				case ConstantsInfo.CONSTANT_Namespace:
				case ConstantsInfo.CONSTANT_ExplicitNamespace:
				case ConstantsInfo.CONSTANT_PackageNamespace:
				case ConstantsInfo.CONSTANT_PackageInternalNs:
					ns.name = ns.info;
					return ns;
				case ConstantsInfo.CONSTANT_ProtectedNamespace:
				case ConstantsInfo.CONSTANT_StaticProtectedNs:
					ns.name = "protected";
					return ns;
				case ConstantsInfo.CONSTANT_PrivateNs:
					ns.name = "private";
					return ns;
			}
			return null;
		}
		
		public static function write(abc:ABCData):ByteArray
		{
			var byteArray:ByteArray = new ByteArray();
			var stream:SWFStream = new SWFStream(byteArray);
			stream.byteArray.writeShort(abc.minorVersion);
			stream.byteArray.writeShort(abc.majorVersion);
			writeConstantPool(stream, abc);
			writeMethodInfos(stream, abc);
			writeMetadataInfos(stream, abc);
			writeInstancesInfos(stream, abc);
			writeClasses(stream, abc);
			writeScripts(stream, abc);
			writeBodies(stream, abc);
			return byteArray;
		}
		
		static public function writeCode(code:Array, abc:ABCData):ByteArray
		{
			var byteArray:ByteArray = new ByteArray();
			var stream:SWFStream = new SWFStream(byteArray);
			var abcCode:Code;
			var i:uint;
			for (var j:uint = 0; j < code.length; j++)
			{
				abcCode = Code(code[j]);
				stream.byteArray.writeByte(abcCode.operation);
				switch (abcCode.operation)
				{
					case CodeOperations.DEBUGFILE:
						stream.writeVarUint32(abc.constantPool.strings.indexOf(abcCode.data));
						break;
					case CodeOperations.PUSHSTRING:
						stream.writeVarUint32(abc.constantPool.strings.indexOf(abcCode.data));
						break;
					case CodeOperations.PUSHNAMESPACE:
						stream.writeVarUint32(abc.constantPool.namespaces.indexOf(abcCode.data));
						break;
					case CodeOperations.PUSHINT:
						stream.writeVarUint32(abc.constantPool.integers.indexOf(abcCode.data));
						break;
					case CodeOperations.PUSHUINT:
						stream.writeVarUint32(abc.constantPool.uintegers.indexOf(abcCode.data));
						break;
					case CodeOperations.PUSHDOUBLE:
						stream.writeVarUint32(abc.constantPool.doubles.indexOf(abcCode.data));
						break;
					case CodeOperations.GETSUPER:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.SETSUPER:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.GETPROPERTY:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.INITPROPERTY:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.SETPROPERTY:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.GETLEX:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.FINDPROPSTRICT:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.FINDPROPERTY:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.FINDDEF:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.DELETEPROPERTY:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.ISTYPE:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.COERCE:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.ASTYPE:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.GETDESCENDANTS:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						break;
					case CodeOperations.CONSTRUCTPROP:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						stream.writeVarUint32(abcCode.argumentCount);
						break;
					case CodeOperations.CALLPROPERTY:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						stream.writeVarUint32(abcCode.argumentCount);
						break;
					case CodeOperations.CALLPROPLEX:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						stream.writeVarUint32(abcCode.argumentCount);
						break;
					case CodeOperations.CALLSUPER:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						stream.writeVarUint32(abcCode.argumentCount);
						break;
					case CodeOperations.CALLSUPERVOID:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						stream.writeVarUint32(abcCode.argumentCount);
						break;
					case CodeOperations.CALLPROPVOID:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(abcCode.data));
						stream.writeVarUint32(abcCode.argumentCount);
						break;
					case CodeOperations.NEWFUNCTION:
						stream.writeVarUint32(abc.methodInfos.indexOf(abcCode.methodInfo));
						break;
					case CodeOperations.CALLSTATIC:
						stream.writeVarUint32(abc.methodInfos.indexOf(abcCode.methodInfo));
						stream.writeVarUint32(abcCode.argumentCount);
						break;
					case CodeOperations.NEWCLASS:
						stream.writeVarUint32(abc.instanceInfos.indexOf(abcCode.data));
						break;
					case CodeOperations.LOOKUPSWITCH:
						stream.writeS24(abcCode.switchDefault);
						stream.writeVarUint32(abcCode.switchMaxIndex);
						for (i = 0; i < abcCode.switchValues.length; i++)
						{
							stream.writeS24(abcCode.switchValues[i]);
						}
						break;
					case CodeOperations.JUMP:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFTRUE:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFFALSE:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFEQ:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFNE:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFGE:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFNGE:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFGT:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFNGT:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFLE:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFNLE:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFLT:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFNLT:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFSTRICTEQ:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.IFSTRICTNE:
						stream.writeS24(int(abcCode.data));
						break;
					case CodeOperations.INCLOCAL:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.DECLOCAL:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.INCLOCAL_I:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.DECLOCAL_I:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.GETLOCAL:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.KILL:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.SETLOCAL:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.DEBUGLINE:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.GETGLOBALSLOT:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.GETSLOT:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.SETGLOBALSLOT:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.SETSLOT:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.PUSHSHORT:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.NEWCATCH:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.DEBUG:
						stream.byteArray.writeByte(abcCode.debugType);
						stream.writeVarUint32(abcCode.debugIndex);
						stream.byteArray.writeByte(abcCode.debugRegisterIndex);
						stream.writeVarUint32(abcCode.debugExtra);
						break;
					case CodeOperations.NEWOBJECT:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.NEWARRAY:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.CALL:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.CONSTRUCT:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.CONSTRUCTSUPER:
						stream.writeVarUint32(uint(abcCode.data));
						break;
					case CodeOperations.PUSHBYTE:
						stream.byteArray.writeByte(int(abcCode.data));
						break;
					case CodeOperations.GETSCOPEOBJECT:
						stream.byteArray.writeByte(int(abcCode.data));
						break;
					case CodeOperations.HASNEXT2:
						stream.writeVarUint32(abcCode.hasnext2ObjectRegister);
						stream.writeVarUint32(abcCode.hasnext2IndexRegister);
						break;
					case CodeOperations.RETURNVOID:
					case CodeOperations.GETLOCAL0:
					case CodeOperations.GETLOCAL1:
					case CodeOperations.GETLOCAL2:
					case CodeOperations.GETLOCAL3:
					case CodeOperations.SETLOCAL0:
					case CodeOperations.SETLOCAL1:
					case CodeOperations.SETLOCAL2:
					case CodeOperations.SETLOCAL3:
					case CodeOperations.PUSHSCOPE:
					case CodeOperations.NEWACTIVATION:
					case CodeOperations.DUP:
					case CodeOperations.SWAP:
					case CodeOperations.POPSCOPE:
					case CodeOperations.MULTIPLY:
					case CodeOperations.CONVERT_I:
					case CodeOperations.CONVERT_U:
					case CodeOperations.CONVERT_D:
					case CodeOperations.CONVERT_B:
					case CodeOperations.CONVERT_O:
					case CodeOperations.LABEL:
					case CodeOperations.ADD:
					case CodeOperations.RETURNVALUE:
					case CodeOperations.NEGATE:
					case CodeOperations.PUSHTRUE:
					case CodeOperations.PUSHFALSE:
					case CodeOperations.BKPT:
					case CodeOperations.NOP:
					case CodeOperations.THROW:
					case CodeOperations.DXNS:
					case CodeOperations.DXNSLATE:
					case CodeOperations.PUSHWITH:
					case CodeOperations.NEXTNAME:
					case CodeOperations.HASNEXT:
					case CodeOperations.PUSHNULL:
					case CodeOperations.PUSHUNDEFINED:
					case CodeOperations.PUSHCONSTANT:
					case CodeOperations.NEXTVALUE:
					case CodeOperations.PUSHNAN:
					case CodeOperations.POP:
					case CodeOperations.CALLMETHOD:
					case CodeOperations.CALLSUPERID:
					case CodeOperations.CALLINTERFACE:
					case CodeOperations.GETGLOBALSCOPE:
					case CodeOperations.GETOUTERSCOPE:
					case CodeOperations.SETPROPERTYLATE:
					case CodeOperations.DELETEPROPERTYLATE:
					case CodeOperations.CONVERT_S:
					case CodeOperations.ESC_XELEM:
					case CodeOperations.ESC_XATTR:
					case CodeOperations.COERCE_B:
					case CodeOperations.COERCE_A:
					case CodeOperations.COERCE_I:
					case CodeOperations.COERCE_D:
					case CodeOperations.COERCE_S:
					case CodeOperations.ASTYPELATE:
					case CodeOperations.COERCE_U:
					case CodeOperations.COERCE_O:
					case CodeOperations.INCREMENT:
					case CodeOperations.DECREMENT:
					case CodeOperations.TYPEOF:
					case CodeOperations.NOT:
					case CodeOperations.BITNOT:
					case CodeOperations.CONCAT:
					case CodeOperations.ADD_D:
					case CodeOperations.SUBTRACT:
					case CodeOperations.DIVIDE:
					case CodeOperations.MODULO:
					case CodeOperations.LSHIFT:
					case CodeOperations.RSHIFT:
					case CodeOperations.URSHIFT:
					case CodeOperations.BITAND:
					case CodeOperations.BITOR:
					case CodeOperations.BITXOR:
					case CodeOperations.EQUALS:
					case CodeOperations.STRICTEQUALS:
					case CodeOperations.LESSTHAN:
					case CodeOperations.LESSEQUALS:
					case CodeOperations.GREATERTHAN:
					case CodeOperations.GREATEREQUALS:
					case CodeOperations.INSTANCEOF:
					case CodeOperations.ISTYPELATE:
					case CodeOperations.IN:
					case CodeOperations.INCREMENT_I:
					case CodeOperations.DECREMENT_I:
					case CodeOperations.NEGATE_I:
					case CodeOperations.ADD_I:
					case CodeOperations.SUBTRACT_I:
					case CodeOperations.MULTIPLY_I:
					case CodeOperations.BKPTLINE:
						break;
				}
			}
			return byteArray;
		}
		
		static private function readBodies(stream:SWFStream, abc:ABCData):Array
		{
			var bodies:Array = [];
			var count:uint = stream.readVarUint32();
			var body:MethodBody;
			var method:MethodInfo;
			var exceptionsCount:uint;
			var exception:ExceptionInfo;
			var codeLength:uint;
			while (count > 0)
			{
				body = new MethodBody();
				method = MethodInfo(abc.methodInfos[stream.readVarUint32()]);
				method.body = body;
				body.method = method;
				body.maxStack = stream.readVarUint32();
				body.localCount = stream.readVarUint32();
				body.initScopeDepth = stream.readVarUint32();
				body.maxScopeDepth = stream.readVarUint32();
				codeLength = stream.readVarUint32();
				body.byteCode = new ByteArray();
				stream.byteArray.readBytes(body.byteCode, 0, codeLength);
				body.code = readCode(body.byteCode, abc);
				exceptionsCount = stream.readVarUint32();
				body.exceptions = [];
				while (exceptionsCount > 0)
				{
					exception = new ExceptionInfo();
					exception.from = stream.readVarUint32();
					exception.to = stream.readVarUint32();
					exception.target = stream.readVarUint32();
					exception.type = abc.constantPool.strings[stream.readVarUint32()];
					exception.name = abc.constantPool.strings[stream.readVarUint32()];
					body.exceptions.push(exception);
					exceptionsCount--;
				}
				body.traits = readTraits(stream, abc);
				bodies.push(body);
				count--;
			}
			return bodies;
		}
		
		static private function readCode(byteCode:ByteArray, abc:ABCData):Array
		{
			var stream:SWFStream = new SWFStream(byteCode);
			var code:Array = [];
			var abcCode:Code;
			var i:uint;
			while (stream.byteArray.bytesAvailable > 0)
			{
				abcCode = new Code();
				abcCode.operation = stream.byteArray.readUnsignedByte();
				switch (abcCode.operation)
				{
					case CodeOperations.DEBUGFILE:
						abcCode.data = abc.constantPool.strings[stream.readVarUint32()];
						abcCode.description = "debugfile " + abcCode.data;
						break;
					case CodeOperations.PUSHSTRING:
						abcCode.data = abc.constantPool.strings[stream.readVarUint32()];
						abcCode.description = "pushstring " + abcCode.data;
						break;
					case CodeOperations.PUSHNAMESPACE:
						abcCode.data = abc.constantPool.namespaces[stream.readVarUint32()];
						abcCode.description = "pushnamespace " + abcCode.data;
						break;
					case CodeOperations.PUSHINT:
						abcCode.data = abc.constantPool.integers[stream.readVarUint32()];
						abcCode.description = "pushint " + abcCode.data;
						break;
					case CodeOperations.PUSHUINT:
						abcCode.data = abc.constantPool.uintegers[stream.readVarUint32()];
						abcCode.description = "pushuint " + abcCode.data;
						break;
					case CodeOperations.PUSHDOUBLE:
						abcCode.data = abc.constantPool.doubles[stream.readVarUint32()];
						abcCode.description = "pushdouble " + abcCode.data;
						break;
					case CodeOperations.GETSUPER:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "getsuper " + abcCode.data;
						break;
					case CodeOperations.SETSUPER:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "setsuper " + abcCode.data;
						break;
					case CodeOperations.GETPROPERTY:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "getproperty " + abcCode.data;
						break;
					case CodeOperations.INITPROPERTY:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "initproperty " + abcCode.data;
						break;
					case CodeOperations.SETPROPERTY:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "setproperty " + abcCode.data;
						break;
					case CodeOperations.GETLEX:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "getlex " + abcCode.data;
						break;
					case CodeOperations.FINDPROPSTRICT:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "findpropstrict " + abcCode.data;
						break;
					case CodeOperations.FINDPROPERTY:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "findproperty " + abcCode.data;
						break;
					case CodeOperations.FINDDEF:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "finddef " + abcCode.data;
						break;
					case CodeOperations.DELETEPROPERTY:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "deleteproperty " + abcCode.data;
						break;
					case CodeOperations.ISTYPE:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "istype " + abcCode.data;
						break;
					case CodeOperations.COERCE:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "coerce " + abcCode.data;
						break;
					case CodeOperations.ASTYPE:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "astype " + abcCode.data;
						break;
					case CodeOperations.GETDESCENDANTS:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.description = "getdescendants " + abcCode.data;
						break;
					case CodeOperations.CONSTRUCTPROP:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.argumentCount = stream.readVarUint32();
						abcCode.description = "constructprop " + abcCode.data + " " + abcCode.argumentCount;
						break;
					case CodeOperations.CALLPROPERTY:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.argumentCount = stream.readVarUint32();
						abcCode.description = "callproperty " + abcCode.data + " " + abcCode.argumentCount;
						break;
					case CodeOperations.CALLPROPLEX:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.argumentCount = stream.readVarUint32();
						abcCode.description = "callproplex " + abcCode.data + " " + abcCode.argumentCount;
						break;
					case CodeOperations.CALLSUPER:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.argumentCount = stream.readVarUint32();
						abcCode.description = "callsuper " + abcCode.data + " " + abcCode.argumentCount;
						break;
					case CodeOperations.CALLSUPERVOID:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.argumentCount = stream.readVarUint32();
						abcCode.description = "callsupervoid " + abcCode.data + " " + abcCode.argumentCount;
						break;
					case CodeOperations.CALLPROPVOID:
						abcCode.data = abc.constantPool.multinames[stream.readVarUint32()];
						abcCode.argumentCount = stream.readVarUint32();
						abcCode.description = "callpropvoid " + abcCode.data + " " + abcCode.argumentCount;
						break;
					case CodeOperations.NEWFUNCTION:
						abcCode.methodInfo = MethodInfo(abc.methodInfos[stream.readVarUint32()]);
						abcCode.description = "newfunction " + abcCode.methodInfo.name + abcCode.methodInfo;
						break;
					case CodeOperations.CALLSTATIC:
						abcCode.methodInfo = abc.methodInfos[stream.readVarUint32()];
						abcCode.argumentCount = stream.readVarUint32();
						abcCode.description = "callstatic " + abcCode.methodInfo.name + " " + abcCode.argumentCount;
						break;
					case CodeOperations.NEWCLASS:
						abcCode.data = abc.instanceInfos[stream.readVarUint32()];
						abcCode.description = "newclass " + abcCode.data.name;
						break;
					case CodeOperations.LOOKUPSWITCH:
						abcCode.switchDefault = stream.readS24();
						abcCode.switchMaxIndex = stream.readVarUint32();
						abcCode.description = "lookupswitch maxindex " + abcCode.switchMaxIndex;
						abcCode.description += "\nlookupswitch default " + abcCode.switchDefault;
						abcCode.switchValues = [];
						for (i = 0; i <= abcCode.switchMaxIndex; i++)
						{
							abcCode.switchValues.push(stream.readS24());
							abcCode.description += "\nlookupswitch " + i + " " + abcCode.switchValues[i];
						}
						break;
					case CodeOperations.JUMP:
						abcCode.data = stream.readS24();
						abcCode.description = "label jump " + abcCode.data;
						break;
					case CodeOperations.IFTRUE:
						abcCode.data = stream.readS24();
						abcCode.description = "label iftrue " + abcCode.data;
						break;
					case CodeOperations.IFFALSE:
						abcCode.data = stream.readS24();
						abcCode.description = "label iffalse " + abcCode.data;
						break;
					case CodeOperations.IFEQ:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifeq " + abcCode.data;
						break;
					case CodeOperations.IFNE:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifne " + abcCode.data;
						break;
					case CodeOperations.IFGE:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifge " + abcCode.data;
						break;
					case CodeOperations.IFNGE:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifnge " + abcCode.data;
						break;
					case CodeOperations.IFGT:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifgt " + abcCode.data;
						break;
					case CodeOperations.IFNGT:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifngt " + abcCode.data;
						break;
					case CodeOperations.IFLE:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifle " + abcCode.data;
						break;
					case CodeOperations.IFNLE:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifnle " + abcCode.data;
						break;
					case CodeOperations.IFLT:
						abcCode.data = stream.readS24();
						abcCode.description = "label iflt " + abcCode.data;
						break;
					case CodeOperations.IFNLT:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifnlt " + abcCode.data;
						break;
					case CodeOperations.IFSTRICTEQ:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifstricteq " + abcCode.data;
						break;
					case CodeOperations.IFSTRICTNE:
						abcCode.data = stream.readS24();
						abcCode.description = "label ifstrictne " + abcCode.data;
						break;
					case CodeOperations.INCLOCAL:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "inclocal " + abcCode.data;
						break;
					case CodeOperations.DECLOCAL:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "declocal " + abcCode.data;
						break;
					case CodeOperations.INCLOCAL_I:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "inclocal_i " + abcCode.data;
						break;
					case CodeOperations.DECLOCAL_I:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "declocal_i " + abcCode.data;
						break;
					case CodeOperations.GETLOCAL:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "getlocal " + abcCode.data;
						break;
					case CodeOperations.KILL:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "kill " + abcCode.data;
						break;
					case CodeOperations.SETLOCAL:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "setlocal " + abcCode.data;
						break;
					case CodeOperations.DEBUGLINE:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "debugline " + abcCode.data;
						break;
					case CodeOperations.GETGLOBALSLOT:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "getglobalslot " + abcCode.data;
						break;
					case CodeOperations.GETSLOT:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "getslot " + abcCode.data;
						break;
					case CodeOperations.SETGLOBALSLOT:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "setglobalslot " + abcCode.data;
						break;
					case CodeOperations.SETSLOT:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "setslot " + abcCode.data;
						break;
					case CodeOperations.PUSHSHORT:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "pushshort " + abcCode.data;
						break;
					case CodeOperations.NEWCATCH:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "newcatch " + abcCode.data;
						break;
					case CodeOperations.DEBUG:
						abcCode.debugType = stream.byteArray.readUnsignedByte();
						abcCode.debugIndex = stream.readVarUint32();
						abcCode.debugRegisterIndex = stream.byteArray.readUnsignedByte();
						abcCode.debugExtra = stream.readVarUint32();
						abcCode.description = "debug type " + abcCode.debugType;
						abcCode.description += "\ndebug index " + abcCode.debugIndex;
						abcCode.description += "\ndebug register index " + abcCode.debugRegisterIndex;
						abcCode.description += "\ndebug extra " + abcCode.debugExtra;
						break;
					case CodeOperations.NEWOBJECT:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "newobject " + abcCode.data;
						break;
					case CodeOperations.NEWARRAY:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "newarray " + abcCode.data;
						break;
					case CodeOperations.CALL:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "call " + abcCode.data;
						break;
					case CodeOperations.CONSTRUCT:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "construct " + abcCode.data;
						break;
					case CodeOperations.CONSTRUCTSUPER:
						abcCode.data = stream.readVarUint32();
						abcCode.description = "constructsuper " + abcCode.data;
						break;
					case CodeOperations.PUSHBYTE:
						abcCode.data = stream.byteArray.readByte();
						abcCode.description = "pushbyte " + abcCode.data;
						break;
					case CodeOperations.GETSCOPEOBJECT:
						abcCode.data = stream.byteArray.readByte();
						abcCode.description = "getscopeobject " + abcCode.data;
						break;
					case CodeOperations.HASNEXT2:
						abcCode.hasnext2ObjectRegister = stream.readVarUint32();
						abcCode.hasnext2IndexRegister = stream.readVarUint32();
						abcCode.description = "hasnext2 " + abcCode.hasnext2ObjectRegister + " " + abcCode.hasnext2IndexRegister;
						break;
					case CodeOperations.RETURNVOID:
						abcCode.description = "returnvoid";
						break;
					case CodeOperations.GETLOCAL0:
						abcCode.description = "getlocal0";
						break;
					case CodeOperations.GETLOCAL1:
						abcCode.description = "getlocal1";
						break;
					case CodeOperations.GETLOCAL2:
						abcCode.description = "getlocal2";
						break;
					case CodeOperations.GETLOCAL3:
						abcCode.description = "getlocal3";
						break;
					case CodeOperations.SETLOCAL0:
						abcCode.description = "setlocal0";
						break;
					case CodeOperations.SETLOCAL1:
						abcCode.description = "setlocal1";
						break;
					case CodeOperations.SETLOCAL2:
						abcCode.description = "setlocal2";
						break;
					case CodeOperations.SETLOCAL3:
						abcCode.description = "setlocal3";
						break;
					case CodeOperations.PUSHSCOPE:
						abcCode.description = "pushscope";
						break;
					case CodeOperations.NEWACTIVATION:
						abcCode.description = "newactivation";
						break;
					case CodeOperations.DUP:
						abcCode.description = "dup";
						break;
					case CodeOperations.SWAP:
						abcCode.description = "swap";
						break;
					case CodeOperations.POPSCOPE:
						abcCode.description = "popscope";
						break;
					case CodeOperations.MULTIPLY:
						abcCode.description = "multiply";
						break;
					case CodeOperations.CONVERT_I:
						abcCode.description = "convert_i";
						break;
					case CodeOperations.CONVERT_U:
						abcCode.description = "convert_u";
						break;
					case CodeOperations.CONVERT_D:
						abcCode.description = "convert_d";
						break;
					case CodeOperations.CONVERT_B:
						abcCode.description = "convert_b";
						break;
					case CodeOperations.CONVERT_O:
						abcCode.description = "convert_o";
						break;
					case CodeOperations.LABEL:
						abcCode.description = "label";
						break;
					case CodeOperations.ADD:
						abcCode.description = "add";
						break;
					case CodeOperations.RETURNVALUE:
						abcCode.description = "returnvalue";
						break;
					case CodeOperations.NEGATE:
						abcCode.description = "negate";
						break;
					case CodeOperations.PUSHTRUE:
						abcCode.description = "pushtrue";
						break;
					case CodeOperations.PUSHFALSE:
						abcCode.description = "pushfalse";
						break;
					case CodeOperations.BKPT:
						abcCode.description = "BKPT";
						break;
					case CodeOperations.NOP:
						abcCode.description = "nop";
						break;
					case CodeOperations.THROW:
						abcCode.description = "throw";
						break;
					case CodeOperations.DXNS:
						abcCode.description = "dxns";
						break;
					case CodeOperations.DXNSLATE:
						abcCode.description = "dxnslate";
						break;
					case CodeOperations.PUSHWITH:
						abcCode.description = "pushwith";
						break;
					case CodeOperations.NEXTNAME:
						abcCode.description = "nextname";
						break;
					case CodeOperations.HASNEXT:
						abcCode.description = "hasnext";
						break;
					case CodeOperations.PUSHNULL:
						abcCode.description = "pushnull";
						break;
					case CodeOperations.PUSHUNDEFINED:
						abcCode.description = "pushundefined";
						break;
					case CodeOperations.PUSHCONSTANT:
						abcCode.description = "pushconstant";
						break;
					case CodeOperations.NEXTVALUE:
						abcCode.description = "nextvalue";
						break;
					case CodeOperations.PUSHNAN:
						abcCode.description = "pushnan";
						break;
					case CodeOperations.POP:
						abcCode.description = "pop";
						break;
					case CodeOperations.CALLMETHOD:
						abcCode.description = "callmethod";
						break;
					case CodeOperations.CALLSUPERID:
						abcCode.description = "callsuperid";
						break;
					case CodeOperations.CALLINTERFACE:
						abcCode.description = "callinterface";
						break;
					case CodeOperations.GETGLOBALSCOPE:
						abcCode.description = "getglobalscope";
						break;
					case CodeOperations.GETOUTERSCOPE:
						abcCode.description = "getouterscope";
						break;
					case CodeOperations.SETPROPERTYLATE:
						abcCode.description = "setpropertylate";
						break;
					case CodeOperations.DELETEPROPERTYLATE:
						abcCode.description = "deletepropertylate";
						break;
					case CodeOperations.CONVERT_S:
						abcCode.description = "convert_s";
						break;
					case CodeOperations.ESC_XELEM:
						abcCode.description = "esc_xelem";
						break;
					case CodeOperations.ESC_XATTR:
						abcCode.description = "esc_xattr";
						break;
					case CodeOperations.COERCE_B:
						abcCode.description = "coerce_b";
						break;
					case CodeOperations.COERCE_A:
						abcCode.description = "coerce_a";
						break;
					case CodeOperations.COERCE_I:
						abcCode.description = "coerce_i";
						break;
					case CodeOperations.COERCE_D:
						abcCode.description = "coerce_d";
						break;
					case CodeOperations.COERCE_S:
						abcCode.description = "coerce_s";
						break;
					case CodeOperations.ASTYPELATE:
						abcCode.description = "astypelate";
						break;
					case CodeOperations.COERCE_U:
						abcCode.description = "coerce_u";
						break;
					case CodeOperations.COERCE_O:
						abcCode.description = "coerce_o";
						break;
					case CodeOperations.INCREMENT:
						abcCode.description = "increment";
						break;
					case CodeOperations.DECREMENT:
						abcCode.description = "decrement";
						break;
					case CodeOperations.TYPEOF:
						abcCode.description = "typeof";
						break;
					case CodeOperations.NOT:
						abcCode.description = "not";
						break;
					case CodeOperations.BITNOT:
						abcCode.description = "bitnot";
						break;
					case CodeOperations.CONCAT:
						abcCode.description = "concat";
						break;
					case CodeOperations.ADD_D:
						abcCode.description = "add_d";
						break;
					case CodeOperations.SUBTRACT:
						abcCode.description = "subtract";
						break;
					case CodeOperations.DIVIDE:
						abcCode.description = "divide";
						break;
					case CodeOperations.MODULO:
						abcCode.description = "modulo";
						break;
					case CodeOperations.LSHIFT:
						abcCode.description = "lshift";
						break;
					case CodeOperations.RSHIFT:
						abcCode.description = "rshift";
						break;
					case CodeOperations.URSHIFT:
						abcCode.description = "urshift";
						break;
					case CodeOperations.BITAND:
						abcCode.description = "bitand";
						break;
					case CodeOperations.BITOR:
						abcCode.description = "bitor";
						break;
					case CodeOperations.BITXOR:
						abcCode.description = "bitxor";
						break;
					case CodeOperations.EQUALS:
						abcCode.description = "equals";
						break;
					case CodeOperations.STRICTEQUALS:
						abcCode.description = "strictequals";
						break;
					case CodeOperations.LESSTHAN:
						abcCode.description = "lessthan";
						break;
					case CodeOperations.LESSEQUALS:
						abcCode.description = "lessequals";
						break;
					case CodeOperations.GREATERTHAN:
						abcCode.description = "greaterthan";
						break;
					case CodeOperations.GREATEREQUALS:
						abcCode.description = "greaterequals";
						break;
					case CodeOperations.INSTANCEOF:
						abcCode.description = "instanceof";
						break;
					case CodeOperations.ISTYPELATE:
						abcCode.description = "istypelate";
						break;
					case CodeOperations.IN:
						abcCode.description = "in";
						break;
					case CodeOperations.INCREMENT_I:
						abcCode.description = "increment_i";
						break;
					case CodeOperations.DECREMENT_I:
						abcCode.description = "decrement_i";
						break;
					case CodeOperations.NEGATE_I:
						abcCode.description = "negate_i";
						break;
					case CodeOperations.ADD_I:
						abcCode.description = "add_i";
						break;
					case CodeOperations.SUBTRACT_I:
						abcCode.description = "subtract_i";
						break;
					case CodeOperations.MULTIPLY_I:
						abcCode.description = "multiply_i";
						break;
					case CodeOperations.BKPTLINE:
						abcCode.description = "bkptline";
						break;
					default:
						abcCode.description = "unknown opcode " + "0x" + abcCode.operation.toString(16).toUpperCase();
						break;
				}
				code.push(abcCode);
			}
			return code;
		}
		
		static private function readScripts(stream:SWFStream, abc:ABCData):Array
		{
			var scripts:Array = [];
			var count:uint = stream.readVarUint32();
			var script:ScriptInfo;
			while (count > 0)
			{
				script = new ScriptInfo();
				script.initMethod = abc.methodInfos[stream.readVarUint32()];
				script.traits = readTraits(stream, abc);
				scripts.push(script);
				count--;
			}
			return scripts;
		}
		
		static private function readClasses(stream:SWFStream, abc:ABCData):Array
		{
			var classes:Array = [];
			var count:uint = abc.instanceInfos.length;
			var clss:ClassInfo;
			for (var i:uint = 0; i < count; i++)
			{
				clss = new ClassInfo();
				clss.instanceReference = abc.instanceInfos[i];
				clss.instanceReference.classReference = clss;
				clss.initMethod = abc.methodInfos[stream.readVarUint32()];
				clss.traits = readTraits(stream, abc);
				classes.push(clss);
			}
			return classes;
		}
		
		static private function readInstanceInfos(stream:SWFStream, abc:ABCData):Array
		{
			var instances:Array = [];
			var count:uint = stream.readVarUint32();
			var instance:InstanceInfo;
			var countInt:uint;
			while (count > 0)
			{
				instance = new InstanceInfo();
				instance.name = abc.constantPool.multinames[stream.readVarUint32()];
				instance.superName = abc.constantPool.multinames[stream.readVarUint32()];
				instance.flags = stream.byteArray.readUnsignedByte();
				instance.isFinal = Boolean(instance.flags & ConstantsInfo.CONSTANT_ClassFinal);
				instance.isInterface = Boolean(instance.flags & ConstantsInfo.CONSTANT_ClassInterface);
				instance.isProtectedNamespace = Boolean(instance.flags & ConstantsInfo.CONSTANT_ClassProtectedNs);
				instance.isSealed = Boolean(instance.flags & ConstantsInfo.CONSTANT_ClassSealed);
				if (instance.isProtectedNamespace)
				{
					instance.protectedNamespace = abc.constantPool.namespaces[stream.readVarUint32()];
				}
				countInt = stream.readVarUint32();
				instance.interfaces = [];
				while (countInt > 0)
				{
					instance.interfaces.push(abc.constantPool.multinames[stream.readVarUint32()]);
					countInt--;
				}
				instance.initMethod = abc.methodInfos[stream.readVarUint32()];
				instance.traits = readTraits(stream, abc);
				instances.push(instance);
				count--;
			}
			return instances;
		}
		
		static private function readTraits(stream:SWFStream, abc:ABCData):Array
		{
			var countTraits:uint = stream.readVarUint32();
			var traits:Array = [];
			var trait:Trait;
			var dummy:uint;
			while (countTraits > 0)
			{
				var nameIndex:uint = stream.readVarUint32();
				var traitName:MultinameInfo = abc.constantPool.multinames[nameIndex];
				var kind:uint = stream.byteArray.readUnsignedByte();
				var id:uint = stream.readVarUint32();
				
				switch (kind & 0x0f)
				{
					/* primitive var & const properties */
					case ConstantsInfo.TRAIT_Slot:
					case ConstantsInfo.TRAIT_Const:
						trait = new TraitSlotAndConst();
						trait.name = traitName;
						trait.kind = kind;
						trait.id = id;
						TraitSlotAndConst(trait).type = abc.constantPool.multinames[stream.readVarUint32()];
						TraitSlotAndConst(trait).valueIndex = stream.readVarUint32();
						if (TraitSlotAndConst(trait).valueIndex == 0)
						{
							TraitSlotAndConst(trait).value = null;
						}
						else
						{
							TraitSlotAndConst(trait).valueKind = stream.byteArray.readUnsignedByte();
							TraitSlotAndConst(trait).value = getDefaultValue(TraitSlotAndConst(trait).valueKind, TraitSlotAndConst(trait).valueIndex, abc.constantPool);
						}
						break;
					case ConstantsInfo.TRAIT_Class:
						trait = new TraitClass();
						trait.name = traitName;
						trait.kind = kind;
						trait.id = id;
						TraitClass(trait).classLink = abc.classes[stream.readVarUint32()];
						break;
					/* methodInfos */
					case ConstantsInfo.TRAIT_Function:
					case ConstantsInfo.TRAIT_Method:
					case ConstantsInfo.TRAIT_Getter:
					case ConstantsInfo.TRAIT_Setter:
						trait = new TraitMethod();
						trait.name = traitName;
						trait.kind = kind;
						trait.id = id;
						TraitMethod(trait).method = abc.methodInfos[stream.readVarUint32()];
						break;
				}
				if ((trait.kind >> 4) & ConstantsInfo.ATTR_metadata)
				{
					trait.metadata = [];
					dummy = stream.readVarUint32();
					while (dummy)
					{
						trait.metadata.push(abc.metadataInfos[stream.readVarUint32()]);
						dummy--;
					}
				}
				trait.finalAttr = Boolean((trait.kind >> 4) & ConstantsInfo.ATTR_final);
				trait.overrideAttr = Boolean((trait.kind >> 4) & ConstantsInfo.ATTR_override);
				trait.publicAttr = Boolean((trait.kind >> 4) & ConstantsInfo.ATTR_public);
				traits.push(trait);
				countTraits--;
			}
			return traits;
		}
		
		static private function readMetadataInfos(stream:SWFStream, constantPool:ConstantPool):Array
		{
			var metadataInfos:Array = [];
			var count:uint = stream.readVarUint32();
			var md:MetaData;
			var itemInfo:ItemInfo;
			while (count > 0)
			{
				md = new MetaData();
				md.name = constantPool.strings[stream.readVarUint32()];
				var valuesCount:int = stream.readVarUint32();
				md.itemInfos = [];
				while (valuesCount > 0)
				{
					itemInfo = new ItemInfo();
					itemInfo.keyIndex = stream.readVarUint32();
					itemInfo.valueIndex = stream.readVarUint32();
					md.itemInfos.push(itemInfo);
					valuesCount--;
				}
				metadataInfos.push(md);
				count--;
			}
			return metadataInfos;
		}
		
		static private function readMethodInfos(stream:SWFStream, constantPool:ConstantPool):Array
		{
			var methodInfos:Array = [];
			var count:uint = stream.readVarUint32();
			var methodInfo:MethodInfo;
			var typeIndex:uint;
			var i:uint;
			var paramCount:uint;
			var optionCount:uint;
			var option:OptionInfo;
			var paramInfo:ParameterInfo;
			while (count > 0)
			{
				methodInfo = new MethodInfo();
				paramCount = stream.readVarUint32();
				methodInfo.returnType = constantPool.multinames[stream.readVarUint32()];
				methodInfo.paramTypes = [];
				for (i = 0; i < paramCount; i++)
				{
					methodInfo.paramTypes.push(constantPool.multinames[stream.readVarUint32()]);
				}
				methodInfo.name = constantPool.strings[stream.readVarUint32()];
				methodInfo.flags = stream.byteArray.readUnsignedByte();
				if (methodInfo.flags & ConstantsInfo.HAS_OPTIONAL)
				{
					methodInfo.optionInfos = [];
					optionCount = stream.readVarUint32();
					for (i = 0; i < optionCount; i++)
					{
						option = new OptionInfo();
						option.valueIndex = stream.readVarUint32();
						option.kind = stream.byteArray.readUnsignedByte();
						if (option.valueIndex == 0)
						{
							option.value = null;
						}
						else
						{
							option.value = getDefaultValue(option.kind, option.valueIndex, constantPool);
						}
						methodInfo.optionInfos.push(option);
					}
				}
				if (methodInfo.flags & ConstantsInfo.HAS_ParamNames)
				{
					methodInfo.paramInfos = [];
					for (i = 0; i < paramCount; i++)
					{
						paramInfo = new ParameterInfo();
						paramInfo.name = constantPool.strings[stream.readVarUint32()];
						methodInfo.paramInfos.push(paramInfo);
					}
				}
				methodInfos.push(methodInfo);
				count--;
			}
			return methodInfos;
		}
		
		static private function getDefaultValue(kind:uint, index:uint, constantPool:ConstantPool):Object
		{
			switch (kind)
			{
				case ConstantsInfo.CONSTANT_Utf8:
					return constantPool.strings[index];
				case ConstantsInfo.CONSTANT_Int:
					return constantPool.integers[index];
				case ConstantsInfo.CONSTANT_UInt:
					return constantPool.uintegers[index];
				case ConstantsInfo.CONSTANT_Double:
					return constantPool.doubles[index];
				case ConstantsInfo.CONSTANT_Namespace:
				case ConstantsInfo.CONSTANT_PrivateNs:
				case ConstantsInfo.CONSTANT_PackageNamespace:
				case ConstantsInfo.CONSTANT_PackageInternalNs:
				case ConstantsInfo.CONSTANT_ProtectedNamespace:
				case ConstantsInfo.CONSTANT_ExplicitNamespace:
				case ConstantsInfo.CONSTANT_StaticProtectedNs:
					return constantPool.namespaces[index];
				case ConstantsInfo.CONSTANT_False:
					return false;
				case ConstantsInfo.CONSTANT_True:
					return true;
				case ConstantsInfo.CONSTANT_Null:
					return null;
			}
			return undefined;
		}
		
		static private function readConstantPool(stream:SWFStream):ConstantPool
		{
			var cp:ConstantPool = new ConstantPool();
			var count:uint = stream.readVarUint32();
			cp.integers = [];
			cp.integers.push(0);
			while (count > 1)
			{
				cp.integers.push(stream.readVarUint32());
				count--;
			}
			count = stream.readVarUint32();
			cp.uintegers = [];
			cp.uintegers.push(0);
			while (count > 1)
			{
				cp.uintegers.push(stream.readVarUint32());
				count--;
			}
			count = stream.readVarUint32();
			cp.doubles = [];
			cp.doubles.push(0);
			while (count > 1)
			{
				cp.doubles.push(stream.byteArray.readDouble());
				count--;
			}
			count = stream.readVarUint32();
			cp.strings = [];
			cp.strings.push(null);
			while (count > 1)
			{
				cp.strings.push(stream.byteArray.readUTFBytes(stream.readVarUint32()));
				count--;
			}
			count = stream.readVarUint32();
			cp.namespaces = [];
			cp.namespaces.push(null);
			while (count > 1)
			{
				cp.namespaces.push(readNamespace(stream, cp));
				count--;
			}
			count = stream.readVarUint32();
			cp.namespaceSets = [];
			cp.namespaceSets.push(null);
			while (count > 1)
			{
				cp.namespaceSets.push(readNamespaceSet(stream, cp));
				count--;
			}
			count = stream.readVarUint32();
			cp.multinames = [];
			cp.multinames.push(null);
			while (count > 1)
			{
				cp.multinames.push(readMultiname(stream, cp));
				count--;
			}
			return cp;
		}
		
		static private function writeBodies(stream:SWFStream, abc:ABCData):void
		{
			stream.writeVarUint32(abc.bodies.length);
			var body:MethodBody;
			var method:MethodInfo;
			var exception:ExceptionInfo;
			for (var i:uint = 0; i < abc.bodies.length; i++)
			{
				body = MethodBody(abc.bodies[i]);
				stream.writeVarUint32(abc.methodInfos.indexOf(body.method));
				stream.writeVarUint32(body.maxStack);
				stream.writeVarUint32(body.localCount);
				stream.writeVarUint32(body.initScopeDepth);
				stream.writeVarUint32(body.maxScopeDepth);
				if (body.changed)
				{
					body.byteCode = writeCode(body.code, abc);
				}
				stream.writeVarUint32(body.byteCode.length);
				stream.byteArray.writeBytes(body.byteCode);
				stream.writeVarUint32(body.exceptions.length);
				for (var j:uint = 0; j < body.exceptions.length; j++)
				{
					exception = ExceptionInfo(body.exceptions[j]);
					stream.writeVarUint32(exception.from);
					stream.writeVarUint32(exception.to);
					stream.writeVarUint32(exception.target);
					stream.writeVarUint32(abc.constantPool.strings.indexOf(exception.type));
					stream.writeVarUint32(abc.constantPool.strings.indexOf(exception.name));
				}
				writeTraits(stream, body.traits, abc);
			}
		}
		
		static private function writeScripts(stream:SWFStream, abc:ABCData):void
		{
			stream.writeVarUint32(abc.scripts.length);
			var script:ScriptInfo;
			for (var i:uint = 0; i < abc.scripts.length; i++)
			{
				script = ScriptInfo(abc.scripts[i]);
				stream.writeVarUint32(abc.methodInfos.indexOf(script.initMethod));
				writeTraits(stream, script.traits, abc);
			}
		}
		
		static private function writeClasses(stream:SWFStream, abc:ABCData):void
		{
			var clss:ClassInfo;
			for (var i:uint = 0; i < abc.classes.length; i++)
			{
				clss = ClassInfo(abc.classes[i]);
				stream.writeVarUint32(abc.methodInfos.indexOf(clss.initMethod));
				writeTraits(stream, clss.traits, abc);
			}
		}
		
		static private function writeInstancesInfos(stream:SWFStream, abc:ABCData):void
		{
			stream.writeVarUint32(abc.instanceInfos.length);
			var instance:InstanceInfo;
			var i:uint;
			var j:uint;
			for (i = 0; i < abc.instanceInfos.length; i++)
			{
				instance = InstanceInfo(abc.instanceInfos[i]);
				stream.writeVarUint32(abc.constantPool.multinames.indexOf(instance.name));
				stream.writeVarUint32(abc.constantPool.multinames.indexOf(instance.superName));
				stream.byteArray.writeByte(instance.flags);
				if (instance.isProtectedNamespace)
				{
					stream.writeVarUint32(abc.constantPool.namespaces.indexOf(instance.protectedNamespace));
				}
				stream.writeVarUint32(instance.interfaces.length);
				for (j = 0; j < instance.interfaces.length; j++)
				{
					stream.writeVarUint32(abc.constantPool.multinames.indexOf(instance.interfaces[j]));
				}
				stream.writeVarUint32(abc.methodInfos.indexOf(instance.initMethod));
				writeTraits(stream, instance.traits, abc);
			}
		}
		
		static private function writeTraits(stream:SWFStream, traits:Array, abc:ABCData):void
		{
			stream.writeVarUint32(traits.length);
			var trait:Trait;
			var dummy:uint;
			for (var i:uint = 0; i < traits.length; i++)
			{
				trait = Trait(traits[i]);
				
				stream.writeVarUint32(abc.constantPool.multinames.indexOf(trait.name));
				stream.byteArray.writeByte(trait.kind);
				stream.writeVarUint32(trait.id);
				
				switch (trait.kind & 0x0f)
				{
					case ConstantsInfo.TRAIT_Slot:
					case ConstantsInfo.TRAIT_Const:
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(TraitSlotAndConst(trait).type));
						stream.writeVarUint32(TraitSlotAndConst(trait).valueIndex);
						if (TraitSlotAndConst(trait).valueIndex > 0)
						{
							stream.byteArray.writeByte(TraitSlotAndConst(trait).valueKind);
						}
						break;
					case ConstantsInfo.TRAIT_Class:
						stream.writeVarUint32(abc.classes.indexOf(TraitClass(trait).classLink));
						break;
					
					case ConstantsInfo.TRAIT_Function:
					case ConstantsInfo.TRAIT_Method:
					case ConstantsInfo.TRAIT_Getter:
					case ConstantsInfo.TRAIT_Setter:
						stream.writeVarUint32(abc.methodInfos.indexOf(TraitMethod(trait).method));
						break;
				}
				if ((trait.kind >> 4) & ConstantsInfo.ATTR_metadata)
				{
					stream.writeVarUint32(trait.metadata.length);
					for (var j:uint = 0; j < trait.metadata.length; j++)
					{
						stream.writeVarUint32(abc.metadataInfos.indexOf(trait.metadata[j]));
					}
				}
			}
		}
		
		static private function writeMetadataInfos(stream:SWFStream, abc:ABCData):void
		{
			stream.writeVarUint32(abc.metadataInfos.length);
			
			var md:MetaData;
			var itemInfo:ItemInfo;
			var i:uint;
			var j:uint;
			
			for (i = 0; i < abc.metadataInfos.length; i++)
			{
				md = MetaData(abc.metadataInfos[i]);
				stream.writeVarUint32(abc.constantPool.strings.indexOf(md.name));
				stream.writeVarUint32(md.itemInfos.length);
				for (j = 0; j < md.itemInfos.length; j++)
				{
					itemInfo = ItemInfo(md.itemInfos[j]);
					stream.writeVarUint32(itemInfo.keyIndex);
					stream.writeVarUint32(itemInfo.valueIndex);
				}
			}
		}
		
		static private function writeMethodInfos(stream:SWFStream, abc:ABCData):void
		{
			stream.writeVarUint32(abc.methodInfos.length);
			var methodInfos:Array = [];
			var methodInfo:MethodInfo;
			var typeIndex:uint;
			var i:uint;
			var paramCount:uint;
			var optionCount:uint;
			var option:OptionInfo;
			var paramInfo:ParameterInfo;
			for (var j:uint = 0; j < abc.methodInfos.length; j++)
			{
				methodInfo = MethodInfo(abc.methodInfos[j]);
				stream.writeVarUint32(methodInfo.paramTypes.length);
				stream.writeVarUint32(abc.constantPool.multinames.indexOf(methodInfo.returnType));
				for (i = 0; i < methodInfo.paramTypes.length; i++)
				{
					stream.writeVarUint32(abc.constantPool.multinames.indexOf(methodInfo.paramTypes[i]));
				}
				stream.writeVarUint32(abc.constantPool.strings.indexOf(methodInfo.name));
				stream.byteArray.writeByte(methodInfo.flags)
				if (methodInfo.flags & ConstantsInfo.HAS_OPTIONAL)
				{
					stream.writeVarUint32(methodInfo.optionInfos.length);
					for (i = 0; i < methodInfo.optionInfos.length; i++)
					{
						option = OptionInfo(methodInfo.optionInfos[i]);
						stream.writeVarUint32(option.valueIndex);
						stream.writeVarUint32(option.kind);
					}
				}
				if (methodInfo.flags & ConstantsInfo.HAS_ParamNames)
				{
					for (i = 0; i < methodInfo.paramTypes.length; i++)
					{
						paramInfo = ParameterInfo(methodInfo.paramInfos[i]);
						stream.writeVarUint32(abc.constantPool.strings.indexOf(paramInfo.name));
					}
				}
			}
		}
		
		static private function writeConstantPool(stream:SWFStream, abc:ABCData):void
		{
			var cp:ConstantPool = abc.constantPool;
			var i:uint;
			if (cp.integers.length <= 1)
			{
				stream.writeVarUint32(0);
			}
			else
			{
				stream.writeVarUint32(cp.integers.length);
				for (i = 1; i < cp.integers.length; i++)
				{
					stream.writeVarUint32(int(cp.integers[i]));
				}
			}
			if (cp.uintegers.length <= 1)
			{
				stream.writeVarUint32(0);
			}
			else
			{
				stream.writeVarUint32(cp.uintegers.length);
				for (i = 1; i < cp.uintegers.length; i++)
				{
					stream.writeVarUint32(uint(cp.uintegers[i]));
				}
			}
			if (cp.doubles.length <= 1)
			{
				stream.writeVarUint32(0);
			}
			else
			{
				stream.writeVarUint32(cp.doubles.length);
				for (i = 1; i < cp.doubles.length; i++)
				{
					stream.byteArray.writeDouble(Number(cp.doubles[i]));
				}
			}
			if (cp.strings.length <= 1)
			{
				stream.writeVarUint32(0);
			}
			else
			{
				var stringByteArray:ByteArray;
				stream.writeVarUint32(cp.strings.length);
				for (i = 1; i < cp.strings.length; i++)
				{
					var str:String = String(cp.strings[i]);
					stringByteArray = new ByteArray();
					stringByteArray.writeUTFBytes(str);
					stream.writeVarUint32(stringByteArray.length);
					stream.byteArray.writeUTFBytes(str);
				}
			}
			if (cp.namespaces.length <= 1)
			{
				stream.writeVarUint32(0);
			}
			else
			{
				stream.writeVarUint32(cp.namespaces.length);
				for (i = 1; i < cp.namespaces.length; i++)
				{
					writeNamespace(stream, NamespaceInfo(cp.namespaces[i]), abc);
				}
			}
			if (cp.namespaceSets.length <= 1)
			{
				stream.writeVarUint32(0);
			}
			else
			{
				stream.writeVarUint32(cp.namespaceSets.length);
				for (i = 1; i < cp.namespaceSets.length; i++)
				{
					writeNamespaceSet(stream, NamespaceSetInfo(cp.namespaceSets[i]), abc);
				}
			}
			if (cp.multinames.length <= 1)
			{
				stream.writeVarUint32(0);
			}
			else
			{
				stream.writeVarUint32(cp.multinames.length);
				for (i = 1; i < cp.multinames.length; i++)
				{
					writeMultiname(stream, MultinameInfo(cp.multinames[i]), abc);
				}
			}
		}
		
		static private function writeMultiname(stream:SWFStream, multiname:MultinameInfo, abc:ABCData):void
		{
			stream.writeVarUint32(multiname.kind);
			switch (multiname.kind)
			{
				case ConstantsInfo.CONSTANT_Qname:
				case ConstantsInfo.CONSTANT_QnameA:
					stream.writeVarUint32(abc.constantPool.namespaces.indexOf(multiname.namespaceLink));
					stream.writeVarUint32(abc.constantPool.strings.indexOf(multiname.name));
					return;
				case ConstantsInfo.CONSTANT_RTQname:
				case ConstantsInfo.CONSTANT_RTQnameA:
					stream.writeVarUint32(abc.constantPool.strings.indexOf(multiname.name));
					return;
				case ConstantsInfo.CONSTANT_RTQnameL:
				case ConstantsInfo.CONSTANT_RTQnameLA:
					return;
				case ConstantsInfo.CONSTANT_NameL:
				case ConstantsInfo.CONSTANT_NameLA:
					return;
				case ConstantsInfo.CONSTANT_Multiname:
				case ConstantsInfo.CONSTANT_MultinameA:
					stream.writeVarUint32(abc.constantPool.strings.indexOf(multiname.name));
					stream.writeVarUint32(abc.constantPool.namespaceSets.indexOf(multiname.namespaceSet));
					return;
				case ConstantsInfo.CONSTANT_MultinameL:
				case ConstantsInfo.CONSTANT_MultinameLA:
					stream.writeVarUint32(abc.constantPool.namespaceSets.indexOf(multiname.namespaceSet));
					return;
				case ConstantsInfo.CONSTANT_TypeName:
					stream.writeVarUint32(abc.constantPool.multinames.indexOf(multiname.multinameLink));
					stream.writeVarUint32(multiname.types.length);
					for (var i:uint = 0; i < multiname.types.length; i++)
					{
						stream.writeVarUint32(abc.constantPool.multinames.indexOf(multiname.types[i]));
					}
					return;
				default:
					throw new Error("invalid multiname kind : " + multiname.kind.toString(16));
			}
		}
		
		static private function writeNamespaceSet(stream:SWFStream, nss:NamespaceSetInfo, abc:ABCData):void
		{
			stream.writeVarUint32(nss.namespaces.length);
			for (var i:uint = 0; i < nss.namespaces.length; i++)
			{
				stream.writeVarUint32(abc.constantPool.namespaces.indexOf(nss.namespaces[i]));
			}
		}
		
		static private function writeNamespace(stream:SWFStream, ns:NamespaceInfo, abc:ABCData):void
		{
			stream.byteArray.writeByte(ns.kind);
			stream.writeVarUint32(abc.constantPool.strings.indexOf(ns.info));
		}
	}
}