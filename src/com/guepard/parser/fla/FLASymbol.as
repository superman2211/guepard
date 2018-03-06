package com.guepard.parser.fla
{
	import com.guepard.app.Converter;
	import com.guepard.converter.ResourcesConverter;
	import com.guepard.decompiler.data.SWFData;
	import com.guepard.parser.info.AccessType;
	import com.guepard.parser.info.ClassInfo;
	import com.guepard.parser.info.ExpressionInfo;
	import com.guepard.parser.info.ExpressionType;
	import com.guepard.parser.info.MethodInfo;
	import com.guepard.parser.info.NamespaceInfo;
	import com.guepard.parser.info.VariableInfo;
	import com.guepard.parser.info.VariableType;
	import com.guepard.parser.serialization.AS3Reader;
	import com.guepard.parser.serialization.AS3Writer;
	import com.guepard.parser.token.Token;
	import com.guepard.parser.token.TokenType;
	import com.guepard.parser.token.Tokenizer;
	import com.guepard.utils.PathUtil;
	import com.guepard.utils.StringUtil;
	import com.guepard.utils.XMLUtil;
	
	import deng.fzip.FZipFile;
	
	import flash.filesystem.File;
	import flash.filesystem.FileMode;
	import flash.filesystem.FileStream;
	import flash.utils.Dictionary;
	import flash.xml.XMLDocument;
	import flash.xml.XMLNode;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class FLASymbol
	{
		public var hasLinkage:Boolean;
		public var scriptsData:String;
		public var scripts:Dictionary;
		public var xml:XMLDocument;
		public var source:FZipFile;
		public var targetFolder:File;
		public var symbols:Vector.<String>;
		public var sounds:Vector.<String>;
		public var fla:FLA;
		public var info:ClassInfo;
		public var name:String;
		public var numScripts:int;
		public var numPropertyParameters:int;
		
		private var _target:File;
		
		public function get target():File
		{
			return _target;
		}
		
		public function get path():String
		{
			return source.filename;
		}
		
		public function get enabled():Boolean
		{
			return numScripts || numPropertyParameters || hasLinkage;
		}
		
		public function get isSound():Boolean
		{
			return info.extendsInfo && info.extendsInfo.data == "flash.media.Sound";
		}
		
		public function FLASymbol(source:FZipFile, packageName:String, defaultName:String = null)
		{
			this.source = source;
			
			symbols = new Vector.<String>();
			sounds = new Vector.<String>();
			
			info = new ClassInfo();
			info.name = defaultName;
			info.packageInfo = packageName ? new NamespaceInfo(packageName) : null;
			info.methodsInfo = new Vector.<MethodInfo>();
			info.variablesInfo = new Vector.<VariableInfo>();
			info.importsInfo = new Vector.<NamespaceInfo>();
			
			name = defaultName;
			numScripts = 0;
			numPropertyParameters = 0;
			scriptsData = "";
			scripts = new Dictionary();
			
			if (source)
			{
				source.content.position = 0;
				
				var data:String = source.content.readUTFBytes(source.content.length);
				
				xml = new XMLDocument();
				xml.ignoreWhite = true;
				xml.parseXML(data);
				
				readBase();
				readSymbols();
				readSounds();
			}
		}
		
		public function parse():Boolean
		{
			Converter.output.log("Parse Symbol: " + name);
			
			readTimelines();
			
			if (info.extendsInfo)
			{
				info.importsInfo.push(info.extendsInfo);
			}
			
			return true;
		}
		
		public function export():Boolean
		{
			var path:String;
			var stream:FileStream;
			
			if (enabled)
			{
				Converter.output.log("Export Symbol: " + name);
				
				correctProperties();
				insertConstructor();
				
				path = info.fullName.replace(/\./g, "/");
				
				var writer:AS3Writer = new AS3Writer(info);
				writer.write();
				
				_target = targetFolder.resolvePath(path + ".as");
				
				stream = new FileStream();
				stream.open(_target, FileMode.WRITE);
				stream.writeUTFBytes(writer.output);
				stream.close();
				
				if (Converter.resources.custom.exportCodeTokens.selected || Converter.resources.custom.exportCodeTree.selected)
				{
					var debugFile:File = targetFolder.resolvePath(path + "_scripts.as");
					
					stream = new FileStream();
					stream.open(debugFile, FileMode.WRITE);
					stream.writeUTFBytes(scriptsData);
					stream.close();
				}
				
				if (Converter.resources.custom.exportCodeTokens.selected)
				{
					var tokensFile:File = targetFolder.resolvePath(path + "_tokens.xml");
					
					var token:Token = Tokenizer.tokenize(scriptsData);
					token.data = name;
					
					stream = new FileStream();
					stream.open(tokensFile, FileMode.WRITE);
					stream.writeUTFBytes(XMLUtil.toMultilineString(token.toXML()));
					stream.close();
				}
				
				if (Converter.resources.custom.exportCodeTree.selected)
				{
					var infoFile:File = targetFolder.resolvePath(path + "_info.xml");
					
					stream = new FileStream();
					stream.open(infoFile, FileMode.WRITE);
					stream.writeUTFBytes(XMLUtil.toMultilineString(info.toXML()));
					stream.close();
				}
			}
			else if (isSound)
			{
				stream = new FileStream();
				stream.open(Converter.settings.extendsTemplatePath, FileMode.READ);
				var data:String = stream.readUTFBytes(stream.bytesAvailable);
				stream.close();
				
				data = data.replace(new RegExp("{package name}", 'g'), info.packageInfo ? info.packageInfo.data : "");
				data = data.replace(new RegExp("{class name}", 'g'), info.name);
				data = data.replace(new RegExp("{extends class name}", 'g'), info.extendsInfo ? " extends " + info.extendsInfo.data : "");
				data = data.replace(new RegExp("{dynamic}", 'g'), "dynamic ");
				
				path = info.fullName.replace(/\./g, "/");
				
				_target = targetFolder.resolvePath(path + ".as");
				
				stream = new FileStream();
				stream.open(_target, FileMode.WRITE);
				stream.writeUTFBytes(data);
				stream.close();
			}
			
			return true;
		}
		
		public function dispose():void
		{
			source = null;
			fla = null;
			targetFolder = null;
			symbols = null;
			sounds = null;
			xml = null;
		}
		
		private function insertConstructor():void
		{
			if (info.extendsInfo)
			{
				var constructor:MethodInfo = new MethodInfo();
				constructor.access = AccessType.PUBLIC;
				constructor.name = info.name;
				constructor.body = new Vector.<ExpressionInfo>();
				info.methodsInfo.unshift(constructor);
				
				writeAddFrameScript();
				writePropertyParameters();
			}
		}
		
		private function writePropertyParameters():void
		{
			if (numPropertyParameters)
			{
				for each(var variableInfo:VariableInfo in info.variablesInfo)
				{
					if (variableInfo.parameters)
					{
						var methodName:String = "_setComponentProperties_" + variableInfo.name;
						
						var runFunction:ExpressionInfo = new ExpressionInfo();
						runFunction.type = ExpressionType.RUN;
						runFunction.body = new Vector.<ExpressionInfo>();
						
						var endLine:ExpressionInfo = new ExpressionInfo();
						endLine.type = ExpressionType.EXPRESSION;
						endLine.token = new Token(TokenType.OPERATOR, ";");
						
						var setComponentProperties:ExpressionInfo = new ExpressionInfo();
						setComponentProperties.type = ExpressionType.GET;
						setComponentProperties.token = new Token(TokenType.UNKNOWN, methodName);
						setComponentProperties.child = runFunction;
						info.constructor.body.push(setComponentProperties);
						info.constructor.body.push(endLine);
						
						var method:MethodInfo = new MethodInfo();
						method.name = methodName;
						method.type = new NamespaceInfo("void");
						method.access = AccessType.PRIVATE;
						method.body = new Vector.<ExpressionInfo>();
						
						info.methodsInfo.push(method);
						
						writeSetProperty(method.body, variableInfo.name, "componentInspectorSetting", true);
						
						for (var property:String in variableInfo.parameters)
						{
							var value:Object = variableInfo.parameters[property];
							
							writeSetProperty(method.body, variableInfo.name, property, value);
						}
						
						writeSetProperty(method.body, variableInfo.name, "componentInspectorSetting", false);
					}
				}
			}
		}
		
		private function writeSetProperty(body:Vector.<ExpressionInfo>, name:String, property:String, value:Object):void
		{
			var endLine:ExpressionInfo = new ExpressionInfo();
			endLine.type = ExpressionType.EXPRESSION;
			endLine.token = new Token(TokenType.OPERATOR, ";");
			
			var getVariable:ExpressionInfo = new ExpressionInfo();
			getVariable.type = ExpressionType.GET;
			getVariable.token = new Token(TokenType.UNKNOWN, name);
			body.push(getVariable);
			body.push(endLine);
			
			var getProperty:ExpressionInfo = new ExpressionInfo();
			getProperty.type = ExpressionType.GET;
			getProperty.token = new Token(TokenType.UNKNOWN, property);
			getVariable.child = getProperty;
			
			var setValue:ExpressionInfo = new ExpressionInfo();
			setValue.type = ExpressionType.SET;
			setValue.token = new Token(TokenType.OPERATOR, "=");
			setValue.body = new Vector.<ExpressionInfo>();
			getProperty.child = setValue;
			
			var valueExpression:ExpressionInfo = new ExpressionInfo();
			valueExpression.token = new Token(getLiteralType(value), String(value));
			setValue.child = valueExpression;
		}
		
		private function getLiteralType(value:Object):String
		{
			if (value is Boolean) return TokenType.BOOLEAN;
			else if (value is Number) return TokenType.NUMBER;
			else return TokenType.STRING;
		}
		
		private function writeAddFrameScript():void
		{
			if (numScripts)
			{
				var runFunction:ExpressionInfo = new ExpressionInfo();
				runFunction.type = ExpressionType.RUN;
				runFunction.body = new Vector.<ExpressionInfo>();
				
				for (var i:String in scripts)
				{
					var frameIndex:ExpressionInfo = new ExpressionInfo();
					frameIndex.type = ExpressionType.EXPRESSION;
					frameIndex.token = new Token(TokenType.NUMBER, i);
					runFunction.body.push(frameIndex);
					
					var frameMethod:ExpressionInfo = new ExpressionInfo();
					frameMethod.type = ExpressionType.GET;
					frameMethod.token = new Token(TokenType.UNKNOWN, scripts[i]);
					runFunction.body.push(frameMethod);
				}
				
				var endLine:ExpressionInfo = new ExpressionInfo();
				endLine.type = ExpressionType.EXPRESSION;
				endLine.token = new Token(TokenType.OPERATOR, ";");
				
				var addFrameScript:ExpressionInfo = new ExpressionInfo();
				addFrameScript.type = ExpressionType.GET;
				addFrameScript.token = new Token(TokenType.UNKNOWN, "addFrameScript");
				addFrameScript.child = runFunction;
				info.constructor.body.push(addFrameScript);
				info.constructor.body.push(endLine);
			}
		}
		
		private function correctProperties():void
		{
			if (enabled)
			{
				for each(var variableInfo:VariableInfo in info.variablesInfo)
				{
					variableInfo.body = null;
					
					if (variableInfo.symbolName)
					{
						var symbol:FLASymbol = fla.symbols[variableInfo.symbolName];
						
						if (symbol && symbol.info)
						{
							if (symbol.hasLinkage)
							{
								variableInfo.type = new NamespaceInfo(symbol.info.fullName);
							}
						}
					}
					
					if (variableInfo.type)
					{
						info.importsInfo.push(variableInfo.type);
					}
				}
			}
		}
		
		private function readSymbols():void
		{
			var symbolsNode:XMLNode = XMLUtil.getNode(xml.firstChild, "symbols");
			
			if (symbolsNode)
			{
				for each(var symbolNode:XMLNode in symbolsNode.childNodes)
				{
					if (symbolNode.nodeName == "Include")
					{
						symbols.push(String(symbolNode.attributes.href));
					}
				}
			}
		}
		
		private function readSounds():void
		{
			var mediaNode:XMLNode = XMLUtil.getNode(xml.firstChild, "media");
			
			if (mediaNode)
			{
				for each(var soundNode:XMLNode in mediaNode.childNodes)
				{
					if (soundNode.nodeName == "DOMSoundItem" && soundNode.attributes.linkageClassName)
					{
						sounds.push(String(soundNode.attributes.linkageClassName));
					}
				}
			}
		}
		
		private function readBase():void
		{
			if (xml.firstChild.attributes.name)
			{
				name = xml.firstChild.attributes.name;
			}
			
			if (xml.firstChild.attributes.linkageClassName)
			{
				info.name = xml.firstChild.attributes.linkageClassName;
				
				if (info.name.indexOf(".") != -1)
				{
					info.packageInfo = new NamespaceInfo(info.name);
					
					info.name = info.packageInfo.name;
					
					info.packageInfo = info.packageInfo.parent;
				}
				else
				{
					info.packageInfo = null;
				}
				
				hasLinkage = true;
			}
			else
			{
				info.name = PathUtil.getName(name).replace(new RegExp(" ", "g"), "");
				
				if (ResourcesConverter.resources.length)
				{
					var swf:SWFData = ResourcesConverter.resources[0];
					
					var fullName:String = swf.findClassName(info.fullName + "_");
					
					if (fullName)
					{
						var fullNameParts:Array = fullName.split(".");
						
						info.name = fullNameParts[fullNameParts.length - 1];
					}
				}
			}
			
			if (xml.firstChild.attributes.linkageBaseClass)
			{
				info.extendsInfo = new NamespaceInfo(xml.firstChild.attributes.linkageBaseClass);
				
				hasLinkage = true;
			}
		}
		
		private function readTimelines():void
		{
			if (xml)
			{
				var timelinesNode:XMLNode = XMLUtil.getNode(xml.firstChild, "timelines");
				
				if (timelinesNode)
				{
					for each(var timelineNode:XMLNode in timelinesNode.childNodes)
					{
						readTimeLine(timelineNode);
					}
					
					if (!info.extendsInfo)
					{
						info.extendsInfo = new NamespaceInfo("flash.display.MovieClip");
					}
				}
				
				timelineNode = XMLUtil.getNode(xml.firstChild, "timeline");
				
				if (timelineNode)
				{
					readTimeLine(timelineNode.firstChild);
					
					if (!info.extendsInfo)
					{
						info.extendsInfo = new NamespaceInfo("flash.display.MovieClip");
					}
				}
			}
		}
		
		private function readTimeLine(timelineNode:XMLNode):void
		{
			var layersNode:XMLNode = XMLUtil.getNode(timelineNode, "layers");
			
			if (layersNode)
			{
				for each(var layerNode:XMLNode in layersNode.childNodes)
				{
					var framesNode:XMLNode = XMLUtil.getNode(layerNode, "frames");
					
					if (framesNode)
					{
						for each(var frameNode:XMLNode in framesNode.childNodes)
						{
							var actionscriptNode:XMLNode = XMLUtil.getNode(frameNode, "Actionscript");
							
							if (actionscriptNode)
							{
								var scriptNode:XMLNode = XMLUtil.getNode(actionscriptNode, "script");
								
								if (scriptNode)
								{
									var script:String = String(scriptNode.firstChild);
									
									script = StringUtil.correctHTMLText(script);
									
									var index:int = int(frameNode.attributes.index);
									
									var frameName:String = "frame" + (index + 1);
									
									scriptsData += "//////////// " + frameName + " //////////////\n" + script + "\n\n";
									
									scripts[index] = frameName;
									
									var reader:AS3Reader = new AS3Reader(script);
									reader.readScript(script, frameName, info);
									
									numScripts++;
									
									if (!info.name)
									{
										info.name = name;
									}
								}
							}
							
							readProperties(frameNode);
						}
					}
				}
			}
		}
		
		private function readProperties(parentNode:XMLNode, elementsNodeName:String = "elements"):void
		{
			var elementsNode:XMLNode = XMLUtil.getNode(parentNode, elementsNodeName);
			
			if (elementsNode)
			{
				for each(var elementNode:XMLNode in elementsNode.childNodes)
				{
					var variableType:NamespaceInfo = null;
					
					switch (elementNode.nodeName)
					{
						case "DOMSymbolInstance":
							variableType = new NamespaceInfo("flash.display.MovieClip");
							break;
						
						case "DOMComponentInstance":
							variableType = new NamespaceInfo("flash.display.MovieClip");
							break;
						
						case "DOMDynamicText":
							variableType = new NamespaceInfo("flash.text.TextField");
							break;
						
						case "DOMGroup":
							readProperties(elementNode, "members");
							break;
					}
					
					if (variableType && elementNode.attributes.name)
					{
						var variableInfo:VariableInfo = new VariableInfo();
						variableInfo.name = elementNode.attributes.name;
						variableInfo.variableType = VariableType.VARIABLE;
						variableInfo.access = AccessType.PUBLIC;
						variableInfo.symbolName = elementNode.attributes.libraryItemName;
						variableInfo.type = variableType;
						info.variablesInfo.push(variableInfo);
						
						switch (elementNode.nodeName)
						{
							case "DOMSymbolInstance":
								
								break;
							
							case "DOMComponentInstance":
								
								break;
							
							case "DOMDynamicText":
								
								break;
						}
						
						var parametersNode:XMLNode = XMLUtil.getNode(elementNode, "parametersAsXML");
						
						if (parametersNode)
						{
							var xml:XMLDocument = new XMLDocument();
							xml.ignoreWhite = true;
							xml.parseXML("<root>" + parametersNode.firstChild.nodeValue + "</root>");
							
							variableInfo.parameters = new Dictionary();
							
							for each(var propertyNode:XMLNode in xml.firstChild.childNodes)
							{
								if (propertyNode.nodeName == "property")
								{
									var inspectableNode:XMLNode = XMLUtil.getNode(propertyNode, "Inspectable");
									
									if (inspectableNode)
									{
										var name:String = inspectableNode.attributes.name;
										var type:String = inspectableNode.attributes.type;
										var value:String = inspectableNode.attributes.defaultValue;
										
										switch (type)
										{
											case "Number":
											case "int":
											case "uint":
												variableInfo.parameters[name] = Number(value);
												break;
											
											case "ColorUtil":
												variableInfo.parameters[name] = Number(value.replace("#", "0x"));
												break;
											
											case "Boolean":
												variableInfo.parameters[name] = value.toLowerCase() == "true";
												break;
											
											default:
												variableInfo.parameters[name] = value;
												break;
										}
										
										numPropertyParameters++;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}