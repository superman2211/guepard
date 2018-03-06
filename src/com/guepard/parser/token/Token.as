package com.guepard.parser.token
{
	import com.guepard.parser.serialization.CodeWriter;
	import com.guepard.utils.StringUtil;
	
	import flash.xml.XMLNode;
	import flash.xml.XMLNodeType;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class Token
	{
		public var begin:int;
		
		public var data:String;
		public var type:String;
		
		private var _tokens:Vector.<Token>;
		private var _position:int;
		
		public function get position():int
		{
			return _position;
		}
		
		public function set position(value:int):void
		{
			_position = value;
		}
		
		public function get lastTokensData():String
		{
			var n:int = 10;
			
			var data:String = "";
			
			if (_tokens && _tokens.length)
			{
				var i:int = _tokens.length;
				
				while (n-- && i--)
				{
					data = _tokens[i].data + " " + data;
				}
			}
			
			return data;
		}
		
		public function get currentToken():Token
		{
			if (_tokens.length && _position < _tokens.length)
			{
				return _tokens[_position];
			}
			
			return null;
		}
		
		public function get currentTokenEnvironment():String
		{
			var count:int = 5;
			
			var min:int = Math.max(0, _position - count);
			var max:int = Math.min(_position + count, _tokens.length);
			
			var data:String = "";
			
			for (var i:int = min; i < max; i++)
			{
				data += _tokens[i].data + ",";
			}
			
			return data;
		}
		
		public function get lastToken():Token
		{
			if (_tokens.length)
			{
				return _tokens[_tokens.length - 1];
			}
			
			return null;
		}
		
		public function get firstToken():Token
		{
			if (_tokens.length)
			{
				return _tokens[0];
			}
			
			return null;
		}
		
		public function get length():int
		{
			return _tokens ? _tokens.length : 0;
		}
		
		public function set length(value:int):void
		{
			if (_tokens)
			{
				_tokens.length = value;
			}
		}
		
		public function get tokensAvailable():int
		{
			return _tokens ? _tokens.length - _position : 0;
		}
		
		public function Token(type:String = "", data:String = "", begin:int = -1)
		{
			this.type = type;
			this.data = data;
			this.begin = begin;
		}
		
		public function readToken(previous:Boolean = false):Token
		{
			var token:Token;
			
			if (previous)
			{
				if (_tokens && _position > 0)
				{
					stepPrevious();
					
					token = _tokens[_position];
					
					return token;
				}
				else
				{
					throw new Error("Read token error: End of stream");
				}
			}
			else
			{
				if (_tokens && _position < _tokens.length)
				{
					token = _tokens[_position];
					
					stepNext();
					
					return token;
				}
				else
				{
					throw new Error("Read token error: End of stream");
				}
			}
		}
		
		public function writeToken(token:Token):Token
		{
			init();
			
			_tokens.push(token);
			
			return token;
		}
		
		public function writeSymbol(...datas:Array):void
		{
			for each(var data:String in datas)
			{
				writeToken(new Token(TokenType.UNKNOWN, data));
			}
		}
		
		public function addTokens(source:Vector.<Token>):void
		{
			init();
			
			for each(var token:Token in source)
			{
				_tokens.push(token);
			}
		}
		
		public function insertToken(token:Token):void
		{
			_tokens.splice(_position, 0, token);
		}
		
		public function writeTokens(source:Token):void
		{
			init();
			
			while (source.tokensAvailable)
			{
				writeToken(source.readToken());
			}
		}
		
		public function stepNext(step:int = 1):void
		{
			_position += step;
		}
		
		public function stepPrevious(step:int = 1):void
		{
			_position -= step;
		}
		
		public function gotoBegin():void
		{
			_position = 0;
		}
		
		public function split(data:String, type:String):void
		{
			if (!length) return;
			
			gotoBegin();
			
			for (var i:int = 0; i < _tokens.length; i++)
			{
				var token:Token = _tokens[i];
				
				if (token.type == TokenType.UNKNOWN)
				{
					var index:int = token.data.indexOf(data);
					
					if (index != -1)
					{
						var dataBefore:String = token.data.substr(0, index);
						var dataAfter:String = token.data.substr(index + data.length);
						
						_tokens.splice(i, 1);
						
						if (dataBefore != "")
						{
							_tokens.splice(i, 0, new Token(token.type, dataBefore, token.begin));
							i++;
						}
						
						_tokens.splice(i, 0, new Token(type, data, token.begin + index));
						i++;
						
						if (dataAfter != "")
						{
							_tokens.splice(i, 0, new Token(token.type, dataAfter, token.begin + index + data.length));
							i--;
						}
					}
				}
			}
		}
		
		public function merge(...mergeDatas):void
		{
			if (!length) return;
			
			gotoBegin();
			
			for (var i:int = 0; i < _tokens.length; i++)
			{
				var token:Token = _tokens[i];
				
				for each(var data:MergeData in mergeDatas)
				{
					if (containsTokenInArray(token, data.begin))
					{
						var group:Token = new Token(data.type, data.data, token.begin);
						
						var j:int = getNextTokenIndex(i + 1, data.end, data.ignore);
						
						group.addTokens(_tokens.splice(i, j + 1 - i));
						
						if (data.join)
						{
							group.join();
						}
						
						_tokens.splice(i, 0, group);
						break;
					}
				}
			}
		}
		
		public function join():void
		{
			data = "";
			
			for each(var token:Token in _tokens)
			{
				data += token.data;
			}
			
			_tokens = null;
		}
		
		public function mergeRecursive(...mergeData):void
		{
			if (!length) return;
			
			gotoBegin();
			
			_tokens = getRecursiveTokens(this, mergeData, []);
		}
		
		public function pop():Token
		{
			return length ? _tokens.pop() : null;
		}
		
		public function shift():Token
		{
			return length ? _tokens.shift() : null;
		}
		
		public function getNextTokenIndex(from:int, datas:Array, ignore:Array):int
		{
			var previous:Token;
			
			for (var i:int = from; i < _tokens.length; i++)
			{
				var token:Token = _tokens[i];
				
				if (containsTokenInArray(token, datas))
				{
					if (previous && ignore.indexOf(previous.data + token.data) != -1)
					{
					
					}
					else
					{
						return i;
					}
				}
				
				previous = token;
			}
			
			return i;
		}
		
		public function mark(data:String, type:String):void
		{
			if (!length) return;
			
			for each(var token:Token in _tokens)
			{
				if (token.data == data)
				{
					token.type = type;
				}
			}
		}
		
		public function markBeginWith(datas:Array, type:String):void
		{
			if (!length) return;
			
			for each(var token:Token in _tokens)
			{
				if (token.type == TokenType.UNKNOWN && datas.indexOf(token.data.charAt(0)) != -1)
				{
					token.type = type;
				}
			}
		}
		
		public function toXML():XMLNode
		{
			var node:XMLNode = new XMLNode(XMLNodeType.ELEMENT_NODE, type);
			
			if (data && data.length)
			{
				node.attributes.data = StringUtil.correctText(data);
			}
			
			if (_tokens && _tokens.length)
			{
				for each(var token:Token in _tokens)
				{
					node.appendChild(token.toXML());
				}
			}
			
			return node;
		}
		
		public function readPreviousTokensToType(...types):Vector.<Token>
		{
			var tokens:Vector.<Token> = new Vector.<Token>();
			
			while (position > 0)
			{
				var token:Token = readToken(true);
				
				if (types.indexOf(token.type) != -1)
				{
					break;
				}
				else
				{
					tokens.push(token);
				}
			}
			
			return tokens;
		}
		
		public function readPreviousTokenByType(type:String, ignore:Array):Token
		{
			var tokens:Vector.<Token> = new Vector.<Token>();
			
			while (position > 0)
			{
				var token:Token = readToken(true);
				
				if (ignore.indexOf(token.type) != -1)
				{
				
				}
				else if (token.type == type)
				{
					return token;
				}
				else
				{
					break;
				}
			}
			
			return null;
		}
		
		public function readTokenByType(...types):Token
		{
			while (tokensAvailable)
			{
				var token:Token = readToken();
				
				if (types.indexOf(token.type) != -1) return token;
			}
			
			return null;
		}
		
		public function readTokenByData(...datas:Array):Token
		{
			while (tokensAvailable)
			{
				var token:Token = readToken();
				
				if (!token) return null;
				
				if (datas.indexOf(token.data) != -1) return token;
			}
			
			return null;
		}
		
		public function readTokenIgnoreType(...types:Array):Token
		{
			while (tokensAvailable)
			{
				var token:Token = readToken();
				
				if (types.indexOf(token.type) == -1) return token;
			}
			
			return null;
		}
		
		public function removeTokens(begin:int, end:int):void
		{
			if (length) _tokens.splice(begin, end - begin);
		}
		
		public function removeTokensByType(...types):void
		{
			if (!length) return;
			
			for (var i:int = 0; i < _tokens.length; i++)
			{
				var token:Token = _tokens[i];
				
				token.removeTokensByType.apply(token, types);
				
				if (types.indexOf(token.type) != -1)
				{
					_tokens.splice(i, 1);
					i--;
				}
			}
		}
		
		public function readTokens(target:Token):void
		{
			if (!length) return;
			
			while (tokensAvailable)
			{
				target.writeToken(readToken());
			}
		}
		
		public function mergeSequence(sequence:Array, type:String):void
		{
			if (!length) return;
			
			for (var i:int = 0; i < _tokens.length; i++)
			{
				_tokens[i].mergeSequence(sequence, type);
				
				if (i + sequence.length - 1 < _tokens.length)
				{
					var enabled:Boolean = true;
					
					var data:String = "";
					
					var begin:int = -1;
					
					for (var j:int = 0; j < sequence.length; j++)
					{
						var source:Token = _tokens[i + j];
						var target:Token = sequence[j];
						
						if (source.type != target.type)
						{
							enabled = false;
							break;
						}
						
						if (target.data && target.data != source.data)
						{
							enabled = false;
							break;
						}
						
						data += source.data;
						
						if (begin == -1)
						{
							begin = source.begin;
						}
					}
					
					if (enabled)
					{
						_tokens.splice(i, sequence.length, new Token(type, data, begin));
					}
				}
			}
		}
		
		public function clone(ignoreChildren:Boolean = false):Token
		{
			var token:Token = new Token(type, data, begin);
			
			if (length && !ignoreChildren)
			{
				for each(var child:Token in _tokens)
				{
					token.writeToken(child.clone());
				}
			}
			
			return token;
		}
		
		public function getTokens(begin:int, end:int):Vector.<Token>
		{
			if (!length) return new Vector.<Token>();
			
			return _tokens.slice(begin, end);
		}
		
		public function readTokensToData(...datas:Array):Vector.<Token>
		{
			var tokens:Vector.<Token> = new Vector.<Token>();
			
			while (tokensAvailable)
			{
				var token:Token = readToken();
				
				if (datas.indexOf(token.data) != -1)
				{
					stepPrevious();
					break;
				}
				else
				{
					tokens.push(token);
				}
			}
			
			return tokens;
		}
		
		public function readStreamToToken(label:Token):Token
		{
			var stream:Token = new Token();
			
			while (tokensAvailable)
			{
				var token:Token = readToken();
				
				if (label.type == token.type && label.data == token.data)
				{
					break;
				}
				else
				{
					stream.writeToken(token);
				}
			}
			
			return stream;
		}
		
		public function toString():String
		{
			return (data ? data : "") + (_tokens ? "(" + _tokens + ")" : "");
		}
		
		public function toData(onlyChildren:Boolean = false):String
		{
			var stream:Vector.<String> = toStrings(onlyChildren);
			
			return CodeWriter.writeStrings(stream, "");
		}
		
		public function toStrings(onlyChildren:Boolean = false):Vector.<String>
		{
			var stream:Vector.<String> = new Vector.<String>();
			
			if (onlyChildren)
			{
				writeChildrenToStream(stream);
			}
			else
			{
				writeToStream(stream);
			}
			
			return stream;
		}
		
		public function writeToStream(stream:Vector.<String>):void
		{
			switch (type)
			{
				case TokenType.NUMBER:
				case TokenType.BOOLEAN:
				
				case TokenType.SPACE:
				case TokenType.ENTER:
				
				case TokenType.UNKNOWN:
				case TokenType.KEYWORD:
				case TokenType.OPERATOR:
					stream.push(data);
					break;
				
				case TokenType.STRING:
					stream.push('"' + data.replace(new RegExp('"', 'g'), '\"') + '"');
					break;
				
				case TokenType.COMMENT:
					stream.push("/*" + data + "*/");
					break;
				
				case TokenType.BLOCK:
					stream.push(data);
					
					writeChildrenToStream(stream);
					
					switch (data)
					{
						case "{":
							stream.push("}");
							break;
						
						case "[":
							stream.push("]");
							break;
						
						case "(":
							stream.push(")");
							break;
						
						case ".<":
							stream.push(">");
							break;
					}
					break;
			}
		}
		
		public function insertSplitter(splitter:Token, labelType:String, pairs:Array, ignore:Array):void
		{
			for (var i:int = 0; i < _tokens.length; i++)
			{
				var label:Token = _tokens[i];
				
				if (label.length)
				{
					label.insertSplitter(splitter, labelType, pairs, ignore);
				}
				
				if (label.type == labelType)
				{
					var token0:Token = getSplitterToken(_tokens, i, ignore, -1);
					var token1:Token = getSplitterToken(_tokens, i, ignore, +1);
					
					if (token0 && token1 && !token0.equals(splitter) && !token1.equals(splitter))
					{
						var pair:Array = getSplitterPair(token0, token1, pairs);
						
						if (pair)
						{
							var enabled:Boolean = true;
							
							if (pair.length == 3)
							{
								var elementPrepend:Object = pair[2];
								
								var index0:int = _tokens.indexOf(token0);
								
								var tokenPrepend:Token = getSplitterToken(_tokens, index0 - 1, ignore, -1);
								
								if (tokenPrepend && isSplitterElement(tokenPrepend, elementPrepend))
								{
									enabled = false;
								}
							}
							
							if (enabled)
							{
								_tokens.splice(i, 0, splitter);
							}
						}
					}
				}
			}
		}
		
		public function equals(token:Token):Boolean
		{
			return data == token.data && type == token.type;
		}
		
		public function startWith(string:String):Boolean
		{
			return data.substring(0, string.length) == string;
		}
		
		public function endWith(string:String):Boolean
		{
			return data.substring(data.length - string.length, data.length) == string;
		}
		
		public function writeString(data:String):void
		{
			writeSymbol("\"" + data.replace(new RegExp("\"", 'g'), "\\\"") + "\"");
		}
		
		public function getTokenAt(index:int):Token
		{
			return _tokens[index];
		}
		
		private function init():void
		{
			if (!_tokens) _tokens = new Vector.<Token>();
		}
		
		private function getRecursiveTokens(stream:Token, mergeDatas:Array, startedDatas:Array):Vector.<Token>
		{
			var tokens:Vector.<Token> = new Vector.<Token>();
			
			while (stream.tokensAvailable)
			{
				var token:Token = stream.readToken();
				
				var merged:Boolean = false;
				
				var data:MergeData;
				
				for each(data in mergeDatas)
				{
					if (containsTokenInArray(token, data.begin))
					{
						startedDatas.push(data);
						
						var group:Token = new Token(data.type, data.data, token.begin);
						group._tokens = getRecursiveTokens(stream, mergeDatas, startedDatas);
						
						if (data.join)
						{
							group.join();
						}
						
						tokens.push(group);
						merged = true;
						break;
					}
				}
				
				if (!merged)
				{
					tokens.push(token);
				}
				
				for each(data in startedDatas)
				{
					if (containsTokenInArray(token, data.end))
					{
						startedDatas.splice(startedDatas.indexOf(data), 1);
						
						tokens.pop();
						
						return tokens;
					}
				}
			}
			
			return tokens;
		}
		
		private function containsTokenInArray(token:Token, array:Array):Boolean
		{
			for each(var t:Token in array)
			{
				if (t.type == token.type && t.data == token.data) return true;
			}
			
			return false;
		}
		
		private function containsTokenInDatas(token:Token, array:Array):Boolean
		{
			for each(var data:MergeData in array)
			{
				if (containsTokenInArray(token, data.begin)) return true;
			}
			
			return false;
		}
		
		private function writeChildrenToStream(stream:Vector.<String>):void
		{
			for each(var token:Token in _tokens)
			{
				token.writeToStream(stream);
			}
		}
		
		private function getSplitterToken(tokens:Vector.<Token>, start:int, ignore:Array, iteration:int):Token
		{
			for (var i:int = start; i >= 0 && i < _tokens.length; i += iteration)
			{
				var token:Token = _tokens[i];
				
				if (ignore.indexOf(token.type) == -1)
				{
					return token;
				}
			}
			
			return null;
		}
		
		private function getSplitterPair(token0:Token, token1:Token, pairs:Array):Array
		{
			for each(var pair:Array in pairs)
			{
				if (isSplitterElement(token0, pair[0]) && isSplitterElement(token1, pair[1]))
				{
					return pair;
				}
			}
			
			return null;
		}
		
		private function isSplitterElement(token:Token, element:Object):Boolean
		{
			if (element is Token)
			{
				var elementToken:Token = Token(element);
				
				return token.type == elementToken.type && token.data == elementToken.data;
			}
			else if (element is Array)
			{
				return element.indexOf(token.type) != -1;
			}
			else
			{
				return token.type == String(element);
			}
		}
		
	}
	
}