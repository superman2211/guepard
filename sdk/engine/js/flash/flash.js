(function ()
{
	"use strict";
	
	window.flash = {};
	
	flash.classes = {};
	flash.descriptions = {};
	
	flash.minimize = function ()
	{
		window.scrollTo(0, 0);
	}
	
	flash.setPixelRatio = function ()
	{
		if (window.hasOwnProperty("devicePixelRatio"))
		{
			var meta = document.createElement("meta");
			meta.name = "viewport";
			meta.content = "parameters-densitydpi=device-dpi, user-scalable=0, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no, minimal-ui";
			
			document.getElementsByTagName("head")[ 0 ].appendChild(meta)
		}
		else
		{
			
		}
	};
	
	flash.correctTopLevel = function ()
	{
		if (!window.console)
		{
			window.console = {};
			window.console.log = function ()
			{
			};
			window.console.error = function ()
			{
			};
		}
		
		//window.XML = function () { };
		//window.XMLList = function () { };
		
		window.SecurityError = function ()
		{
		};
	}
	
	flash.correctTypedArrays = function ()
	{
		try
		{
			var a = new Uint8Array(1);
			
			return;
		}
		catch (e)
		{
		}
		
		function subarray(start, end)
		{
			return this.slice(start, end);
		}
		
		function set_(array, offset)
		{
			if (arguments.length < 2) offset = 0;
			
			for (var i = 0, n = array.length; i < n; ++i, ++offset)
			{
				this[ offset ] = array[ i ] & 0xFF;
			}
		}
		
		// we need typed arrays
		function TypedArray(arg1)
		{
			var result;
			
			if (arg1 != undefined)
			{
				if (typeof arg1 === "number")
				{
					result = new Array(arg1);
					
					for (var i = 0; i < arg1; ++i)
					{
						result[ i ] = 0;
					}
				}
				else
				{
					result = Array.prototype.slice.call(arg1, 0);
				}
			}
			else
			{
				result = new Array();
			}
			
			result.subarray = subarray;
			result.buffer = result;
			result.byteLength = result.length;
			result.set = set_;
			
			if (typeof arg1 === "object" && arg1.buffer)
			{
				result.buffer = arg1.buffer;
			}
			
			return result;
		}
		
		window.ArrayBuffer = TypedArray;
		window.Uint8Array = TypedArray;
		window.Uint32Array = TypedArray;
		window.Int32Array = TypedArray;
		window.Float32Array = TypedArray;
		window.Float64Array = TypedArray;
	};
	
	flash.correctArray = function ()
	{
		Array.CASEINSENSITIVE = 1;
		Array.DESCENDING = 2;
		Array.NUMERIC = 16;
		Array.RETURNINDEXEDARRAY = 8;
		Array.UNIQUESORT = 4;
		
		if (!Array.prototype.indexOf)
		{
			var indexOf = function (find, i)
			{
				if (i === undefined) i = 0;
				if (i < 0) i += this.length;
				if (i < 0) i = 0;
				
				for (var n = this.length; i < n; i++)
				{
					if (i in this && this[ i ] === find)
					{
						return i;
					}
				}
				
				return -1;
			};
			
			flash.defineProperty(Array.prototype, "indexOf", function ()
			{
				return indexOf;
			}, null, false);
		}
		
		if (!Array.prototype.sortOn)
		{
			var sortOnMethod = function (ar, propName, options)
			{
				var sortFunction = function (o1, o2)
				{
					var v1 = (o1[ propName ] != undefined) ? o1[ propName ].valueOf() : "";
					var v2 = (o2[ propName ] != undefined) ? o2[ propName ].valueOf() : "";
					
					function noCase()
					{
						if (typeof (v1) == "string" || v1 instanceof String)
						{
							v1 = v1.toLowerCase();
						}
						if (typeof (v2) == "string" || v2 instanceof String)
						{
							v2 = v2.toLowerCase();
						}
					}
					
					function numeric()
					{
						v1 = Number(v1);
						v2 = Number(v2);
						v1 = isNaN(v1) ? 0 : v1;
						v2 = isNaN(v2) ? 0 : v2;
					}
					
					function reverse()
					{
						var tmp = v1;
						v1 = v2;
						v2 = tmp;
					}
					
					switch (options)
					{
						case Array.CASEINSENSITIVE:
						case Array.CASEINSENSITIVE | Array.RETURNINDEXEDARRAY:
						{
							noCase();
							break;
						}
						case Array.NUMERIC:
						case Array.NUMERIC | Array.RETURNINDEXEDARRAY:
						{
							numeric();
							break;
						}
						case Array.DESCENDING:
						case Array.DESCENDING | Array.RETURNINDEXEDARRAY:
						{
							reverse();
							break;
						}
						case Array.CASEINSENSITIVE | Array.DESCENDING:
						case Array.CASEINSENSITIVE | Array.DESCENDING | Array.RETURNINDEXEDARRAY:
						{
							noCase();
							reverse();
							break;
						}
						case Array.NUMERIC | Array.DESCENDING:
						case Array.NUMERIC | Array.DESCENDING | Array.RETURNINDEXEDARRAY:
						{
							numeric();
							reverse();
							break;
						}
						case Array.UNIQUESORT:
						{
							if (v1 == v2)
								return;
							break
						}
					}
					if (v1 < v2)
					{
						return -1;
					}
					else if (v1 > v2)
					{
						return 1;
					}
					else
					{
						return 0;
					}
				}
				switch (options)
				{
					case Array.RETURNINDEXEDARRAY:
					case Array.RETURNINDEXEDARRAY | Array.NUMERIC:
					case Array.RETURNINDEXEDARRAY | Array.CASEINSENSITIVE:
					case Array.RETURNINDEXEDARRAY | Array.NUMERIC | Array.DESCENDING:
					case Array.RETURNINDEXEDARRAY | Array.CASEINSENSITIVE | Array.DESCENDING:
					{
						var tmp = [].concat(ar);
						tmp.sort(sortFunction);
						var result = [];
						var l = ar.length;
						for (var i = 0; i < l; i++)
						{
							var index = tmp.indexOf(ar[ i ]);
							result.push(index);
						}
						return result;
					}
					default:
					{
						return ar.sort(sortFunction);
					}
				}
			};
			
			var sortOn = function (name, parameters)
			{
				sortOnMethod(this, name, parameters);
			};
			
			flash.defineProperty(Array.prototype, "sortOn", function ()
			{
				return sortOn;
			}, null, false);
		}
	};
	
	flash.int = function (value)
	{
		if (value == undefined) return 0;
		if (isNaN(value)) return 0;
		
		return parseInt(value);
	}
	
	flash.uint = function (value)
	{
		if (value == undefined) return 0;
		if (isNaN(value)) return 0;
		
		return parseInt(value);
	}
	
	flash.getInternetExplorerVersion = function ()
		// Returns the version of Internet Explorer or a -1
		// (indicating the use of another browser).
	{
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer')
		{
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat(RegExp.$1);
		}
		return rv;
	}
	
	flash.toString = function ()
	{
		return "[package flash]";
	}
	
	flash.trace = function ()
	{
		if (window.console)
		{
			window.console.log(Array.prototype.join.call(arguments, " "));
		}
	};
	
	flash.createPackage = function (packageName, object, parentName)
	{
		if (object == undefined) object = window;
		
		if (packageName && packageName.length)
		{
			var path = packageName.split(".");
			
			var name = path.shift();
			
			var fullName = (parentName ? parentName + "." : "") + name;
			
			if (!object[ name ])
			{
				object[ name ] = {};
				object[ name ].toString = function ()
				{
					return "[package " + fullName + "]";
				}
			}
			
			flash.createPackage(path.join("."), object[ name ], fullName);
		}
	};
	
	flash.getNamespace = function (packageName, object)
	{
		if (object == undefined) object = window;
		
		if (packageName && packageName.length)
		{
			var path = packageName.split(".");
			
			var name = path.shift();
			
			if (object[ name ])
			{
				return flash.getNamespace(path.join("."), object[ name ]);
			}
			else
			{
				return null;
			}
		}
		else
		{
			return object;
		}
	};
	
	flash.bindFunction = function (instance, method)
	{
		if (!method)
		{
			//throw new Error("Incorrect parameters for Bind function");
			return null;
		}
		
		if (!instance)
		{
			return method;
		}
		
		if (method.__method__)
		{
			return method;
		}
		
		var result;
		
		if (method.bind != undefined)
		{
			result = method.bind(instance);
		}
		else
		{
			result = function ()
			{
				return method.apply(instance, arguments);
			}
		}
		
		result.__instance__ = instance;
		result.__method__ = method;
		
		return result;
	};
	
	flash.equalsFunction = function (method1, method2)
	{
		if (method1 == method2) return true;
		
		return method1 == method2 ||
			method1.__method__ == method2 ||
			method1 == method2.__method__ ||
			method1.__method__ == method2.__method__;
	};
	
	flash.extendsClass = function (ChildClass, ParentClass)
	{
		var PrototypeClass = function ()
		{
			
		};
		
		PrototypeClass.prototype = ParentClass.prototype;
		
		ChildClass.prototype = new PrototypeClass();
	};
	
	flash.defineProperties = function (object)
	{
		var getter = null;
		var setter = null;
		var name = null;
		var property = null;
		
		for (property in object)
		{
			var begin = property.substring(0, 4);
			
			if (begin == "get_")
			{
				name = property.substring(4);
				
				getter = object[ "get_" + name ];
				
				if (object[ "set_" + name ] != undefined)
				{
					setter = object[ "set_" + name ];
				}
			}
			else if (begin == "set_")
			{
				name = property.substring(4);
				
				if (!object[ "get_" + name ] != undefined)
				{
					setter = object[ "set_" + name ];
				}
			}
			
			if (getter || setter)
			{
				flash.defineProperty(object, name, getter, setter);
			}
		}
	}
	
	flash.defineProperty = function (object, name, getter, setter, enumerable)
	{
		if (Object.defineProperty != undefined)
		{
			var attributes = {enumerable: enumerable != undefined ? enumerable : true, configurable: true};
			
			if (getter) attributes.get = getter;
			if (setter) attributes.set = setter;
			
			Object.defineProperty(object, name, attributes);
		}
		else
		{
			if (getter && object.__defineGetter__ != undefined)
			{
				object.__defineGetter__(name, getter);
			}
			
			if (setter && object.__defineSetter__ != undefined)
			{
				object.__defineSetter__(name, setter);
			}
		}
	}
	
	flash.createClass = function (fullClassName, description, base, statical, implementation, embed)
	{
		var nameParts = fullClassName.split(".");
		var className = nameParts.pop();
		var packageName = nameParts.join(".");
		
		flash.createPackage(packageName);
		
		var constructor;
		
		if (description)
		{
			constructor = description[ className ];
			
			if (!embed && !description.hasOwnProperty("toString"))
			{
				description.toString = function ()
				{
					return "[object " + className + "]";
				};
			}
			;
		}
		;
		
		if (!constructor)
		{
			constructor = function ()
			{
				if (constructor.__base__)
				{
					constructor.__base__.apply(this, arguments);
				}
			};
		}
		;
		
		constructor.toString = function ()
		{
			return "[class " + className + "]";
		};
		
		if (base)
		{
			flash.extendsClass(constructor, base);
			
			constructor.__base__ = base;
		}
		
		constructor.prototype.__class__ = constructor;
		constructor.__name__ = fullClassName;
		
		if (constructor.prototype.getProperty == undefined)
		{
			constructor.prototype.getProperty = function (name)
			{
				if (this[ name ] == undefined)
				{
					return this[ "get_" + name ]();
				}
				else
				{
					return this[ name ];
				}
			}
		}
		
		if (implementation)
		{
			constructor.__implements__ = implementation;
		}
		
		if (description)
		{
			flash.copyProperties(description, constructor.prototype);
		}
		
		if (statical)
		{
			flash.copyProperties(statical, constructor);
		}
		
		flash.defineProperties(constructor.prototype);
		flash.defineProperties(constructor);
		
		var packageObject = flash.getNamespace(packageName);
		packageObject[ className ] = constructor;
		flash.classes[ fullClassName ] = constructor;
		
		return constructor;
	};
	
	flash.addDescription = function (fullClassName, description, base, statical, implementation, requiredClasses)
	{
		flash.descriptions[ fullClassName ] = {
			fullClassName: fullClassName,
			description: description,
			base: base,
			statical: statical,
			implementation: implementation,
			requiredClasses: requiredClasses
		}
	};
	
	flash.initDescription = function (fullClassName)
	{
		if (!fullClassName || flash.classes[ fullClassName ] || window[ fullClassName ]) return;
		
		var description = flash.descriptions[ fullClassName ];
		
		if (description)
		{
			flash.initDescription(description.base);
			
			var base = flash.classes[ description.base ] || window[ description.base ];
			
			var implementation = null;
			
			if (description.implementation)
			{
				implementation = [];
				
				for (var i in description.implementation)
				{
					var interfaceName = description.implementation[ i ];
					
					if (!(interfaceName instanceof Function))
					{
						flash.initDescription(interfaceName);
						
						implementation.push(flash.classes[ interfaceName ] || window[ description.base ]);
					}
				}
			}
			
			flash.createClass(
				fullClassName,
				description.description,
				base,
				description.statical,
				implementation
			)
		}
		else
		{
			if (!window[ fullClassName ])
			{
				throw new Error("Class description not found: " + fullClassName);
			}
		}
	};
	
	flash.initDescriptions = function ()
	{
		for (var i in flash.descriptions)
		{
			flash.initDescription(i);
		}
	};
	
	flash.initStatics = function ()
	{
		for (var i in flash.classes)
		{
			flash.initStatic(i);
		}
	}
	
	flash.initStatic = function (fullClassName)
	{
		var description = flash.classes[ fullClassName ];
		
		if (!description)
		{
			if (window[ fullClassName ])
			{
				return;
			}
			else
			{
				throw new Error("Description '" + fullClassName + "' not found");
			}
		}
		
		if (description.__inited) return;
		
		description.__inited = true;
		
		var requiredClasses = flash.descriptions[ fullClassName ].requiredClasses;
		
		if (requiredClasses)
		{
			for (var i in requiredClasses)
			{
				var requiredClass = requiredClasses[ i ];
				
				if (!(requiredClass instanceof Function))
				{
					flash.initStatic(requiredClass);
				}
			}
		}
		
		if (description.__base__)
		{
			flash.copyProperties(description.__base__, description, [ "__init__", "__embed__" ], false);
		}
		
		if (description.__init__ instanceof Function)
		{
			description.__init__();
		}
	}
	
	flash.init = function ()
	{
		flash.initDescriptions();
		flash.initStatics();
	};
	
	flash.embed = function ()
	{
		for (var i in flash.classes)
		{
			var description = flash.classes[ i ];
			
			if (description.__embed__ instanceof Function)
			{
				description.__embed__();
			}
		}
	};
	
	flash.copyProperties = function (source, target, ignored, override)
	{
		if (override == undefined) override = true;
		
		for (var i in source)
		{
			if (!ignored || ignored.indexOf(i) == -1)
			{
				if (override || target[ i ] == undefined)
				{
					target[ i ] = source[ i ];
				}
			}
		}
		;
	};
	
	flash.numberToColor = function (n)
	{
		var r = (n >> 16) & 0xff;
		var g = (n >> 8) & 0xff;
		var b = n & 0xff;
		
		return "rgb(" + r + ", " + g + ", " + b + ")";
	};
	
	flash.numberToHex = function (n)
	{
		var hex = n.toString(16);
		
		while (hex.length < 6)
		{
			hex = "0" + hex;
		}
		
		if (hex.length > 6)
		{
			hex = hex.substring(hex.length - 6);
		}
		
		return "#" + hex;
	};
	
	flash.getTextureSize = function (value)
	{
		for (var i = 5; i < 8; i++)
		{
			var size = Math.pow(2, i);
			
			if (value <= size)
			{
				return size;
			}
		}
		
		return Math.ceil(value / 256) * 256;
	};
	
	flash.createExtendsClass = function (fullClassName, base)
	{
		var nameParts = fullClassName.split(".");
		var className = nameParts.pop();
		var packageName = nameParts.join(".");
		
		if (base)
		{
			var description = {};
			
			description.__superConstructor__ = base;
			
			description[ className ] = function ()
			{
				this.__superConstructor__();
			};
		}
		
		return flash.createClass(fullClassName, description, base, null, null, true);
	};
	
	flash.createEmbedClass = function (fullClassName, resourcePath, fontName)
	{
		if (fontName)
		{
			flash.text.TextFormat._embedFonts[ fontName ] = resourcePath;
		}
		
		var ClassObject = flash.classes[ fullClassName ];
		
		if (!ClassObject)
		{
			var className = fullClassName.split(".").pop();
			
			var domain = flash.system.ApplicationDomain.get_currentDomain();
			var defineId = domain._getLinkageId(fullClassName);
			
			if (!defineId && resourcePath)
			{
				var imageId = resourcePath.split("_")[ 1 ].split(".")[ 0 ];
				
				defineId = domain._getLinkageId(imageId, true);
			}
			
			if (defineId)
			{
				var define = domain._getDefine(defineId);
				
				if (define)
				{
					if (define.baseClass)
					{
						var description = {};
						
						description.__superConstructor__ = define.baseClass;
						
						description[ className ] = function ()
						{
							this.__superConstructor__();
						};
						
						ClassObject = flash.createClass(fullClassName, description, define.baseClass, null, null, true);
						
						ClassObject.__linkageId = defineId;
						
						if (define instanceof flash.swf.DefineBits && resourcePath)
						{
							define.atlas = resourcePath;
							define.setImages(domain);
						}
					}
					else
					{
						throw new Error("Undefined base class for embed class '" + fullClassName + "'");
					}
				}
				else
				{
					throw new Error("Define not found for class '" + fullClassName + "' by id '" + defineId + "'");
				}
			}
		}
		
		return ClassObject;
	};
	
	flash.linkage = function (object, ignore1, ignore2)
	{
		var ClassObject = object.__class__;
		
		if (ClassObject &&
			(!ignore1 || ignore1 != ClassObject) &&
			(!ignore2 || ignore2 != ClassObject))
		{
			if (ClassObject.__linkageId)
			{
				var define = flash.system.ApplicationDomain.get_currentDomain()._getDefine(ClassObject.__linkageId);
				
				if (define)
				{
					define.linkage(object);
				}
				else
				{
					throw new Error("Define '" + ClassObject.__linkageId + "' not founded");
				}
			}
		}
	};
	
	flash._base64key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	
	flash.encode64 = function (input)
	{
		var output = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;
		var keyStr = flash._base64key;
		
		do
		{
			chr1 = input[ i++ ];
			chr2 = input[ i++ ];
			chr3 = input[ i++ ];
			
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			
			if (isNaN(chr2))
			{
				enc3 = enc4 = 64;
			}
			else if (isNaN(chr3))
			{
				enc4 = 64;
			}
			
			output = output +
				keyStr.charAt(enc1) +
				keyStr.charAt(enc2) +
				keyStr.charAt(enc3) +
				keyStr.charAt(enc4);
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		}
		while (i < input.length);
		
		return output;
	}
	
	flash.decode64 = function (input)
	{
		var output = [];
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;
		var keyStr = flash._base64key;
		
		var base64test = /[^A-Za-z0-9\+\/\=]/g;
		
		if (base64test.exec(input))
		{
			throw new Error("There were invalid base64 characters in the input text");
		}
		
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		
		do
		{
			enc1 = keyStr.indexOf(input.charAt(i++));
			enc2 = keyStr.indexOf(input.charAt(i++));
			enc3 = keyStr.indexOf(input.charAt(i++));
			enc4 = keyStr.indexOf(input.charAt(i++));
			
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			
			output.push(chr1);
			
			if (enc3 != 64)
			{
				output.push(chr2);
			}
			
			if (enc4 != 64)
			{
				output.push(chr3);
			}
			
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		}
		while (i < input.length);
		
		return output;
	}
	
	flash.is = function (instance, ClassObject)
	{
		if (instance != null)
		{
			var type = typeof instance;
			
			switch (type)
			{
				case "boolean":
					return Boolean == ClassObject;
				
				case "number":
					return Number == ClassObject;
				
				case "string":
					return String == ClassObject;
				
				case "function":
					return Function == ClassObject;
				
				case "object":
					return instance instanceof ClassObject;
			}
		}
		
		return false;
	};
	
	flash.getProperty = function (object, name)
	{
		var accessor = "get_" + name;
		
		if (object[ accessor ] != undefined)
		{
			return object[ accessor ]();
		}
		else
		{
			return object[ name ];
		}
	}
	
	flash.setProperty = function (object, name, value)
	{
		var accessor = "set_" + name;
		
		if (object[ accessor ] != undefined)
		{
			return object[ accessor ](value);
		}
		else
		{
			return object[ name ] = value;
		}
	}
	
	flash.correctTopLevel();
	flash.correctTypedArrays();
	flash.correctArray();
	flash.setPixelRatio();
	
})();
