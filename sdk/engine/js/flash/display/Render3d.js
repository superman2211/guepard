(function ()
{
	"use strict";
	
	var d = {};
	
	d._canvas = null;
	d._gl = null;
	d._shaderProgram = null;
	d._canvasRect = null;
	d._width = 0;
	d._height = 0;
	d._projectionMatrix;
	d._matrix;
	d._usermatrix;
	d._identy_matrix;
	d._rect1x1;
	d._imageCache = null;
	d._textureCache = null;
	d._texture;
	d._cacheIndex = -1;
	d._vertexPositionBuffer;
	d._vertexIndexBuffer;
	d._texCoordBuffer;
	d._vertexIndices = null;
	d._vertices = null;
	d._positionLocation;
	d._texCoordLocation;
	d._flipYLocation;
	d._fbo = null;
	d._fboUniform = null;
	
	d._maskFbo = null;
	d._maskTexture = null;
	
	d._u_imageLocation;
	d._u_maskLocation;
	d._maskMode;
	
	d._textfields = null;
	d._colorTransform;
	d._colorTransformMatrix = null;
	d._batch = null;
	d._batchVertexPositionBuffer = null;
	d._currentBitmapSource = null;
	d._batchAmount = 0;
	d._batchindices_offset = 0;
	d._currentColorTransform = null;
	d._currentColorTransformchanged = false;
	
	d._currentObjectType = "";
	d._maskRender = null;
	
	
	d.Render3d = function (canvasId, width, height)
	{
		
		this._width = width
		this._height = height;
		
		this._canvas = document.getElementById(canvasId);
		
		this._gl = this._initWebGL(this._canvas);
		
		
		if (this._gl == null)
		{
			
			return null;
			
		}
		
		this._maskRender = new flash.display.Render2d(null, width, height, true);
		
		this._imageCache = [];
		this._textureCache = [];
		this._textfields = [];
		this._vertexIndices = [];
		this._vertices = [];
		
		this._colorTransformMatrix = [ 1, 1, 1,
			1, 0, 0,
			0, 0, 0 ];
		
		this._batch = {
			vertexIndexBuffer: [],
			vertexPositionBuffer: [],
			texCoordBuffer: []
		};
		
		this._currentColorTransform = [];
		
		
		this._canvas.onselectstart = function ()
		{
			return false;
		}
		
		var gl = this._gl;
		
		this._canvasRect = this._canvas.getBoundingClientRect();
		
		gl.viewportWidth = this._width;
		gl.viewportHeight = this._height;
		
		this._rect1x1 = new Float32Array([ 0, 0, 1, 0, 0, 1, 1, 1 ]);
		
		gl.disable(gl.DEPTH_TEST);
		gl.disable(gl.CULL_FACE);
		gl.enable(gl.BLEND);
		
		
		gl.colorMask(true, true, true, true);
		
		this._initShaders();
		
		
		this._initBuffers();
		
		this._initMaskFramebufferTexture();
		
		this._u_imageLocation = gl.getUniformLocation(this._shaderProgram, "u_image");
		this._u_maskLocation = gl.getUniformLocation(this._shaderProgram, "u_mask");
		
		gl.uniform1i(this._u_imageLocation, 0);
		gl.uniform1i(this._u_maskLocation, 1);
		
		this._maskMode = gl.getUniformLocation(this._shaderProgram, "u_maskmode");
		gl.uniform1f(this._maskMode, 0);
		
		
		this._colorTransform = gl.getUniformLocation(this._shaderProgram, "u_colortransform");
		gl.uniformMatrix3fv(this._colorTransform, false, this._colorTransformMatrix);
		
		this._positionLocation = gl.getAttribLocation(this._shaderProgram, "a_position");
		gl.enableVertexAttribArray(this._positionLocation);
		
		this._matrixLocation = gl.getUniformLocation(this._shaderProgram, "u_matrix");
		
		this._flipYLocation = gl.getUniformLocation(this._shaderProgram, "u_flipY");
		gl.uniform1f(this._flipYLocation, 1);
		
		this._projectionMatrix = gl.getUniformLocation(this._shaderProgram, "pMatrix");
		gl.uniformMatrix4fv(this._projectionMatrix, false, [ 2.0 / this._width, 0, 0, 0, 0, -2.0 / this._height, 0, 0, 0, 0, 1.0, 1.0, -1.0, 1.0, 0, 0 ]);
		
		this._texCoordLocation = gl.getAttribLocation(this._shaderProgram, "a_texCoord");
		
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
		gl.enableVertexAttribArray(this._texCoordLocation);
		gl.vertexAttribPointer(this._texCoordLocation, 2, gl.FLOAT, false, 0, 0);
		
		
		gl.bufferData(gl.ARRAY_BUFFER, this._rect1x1, gl.STATIC_DRAW);
		
		
		gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		
		this._identy_matrix = [ 1, 0, 0,
			0, 1, 0,
			0, 0, 1 ];
		
		this._matrix = [ 1, 0, 0,
			0, 1, 0,
			0, 0, 1 ];
		
		this._usermatrix = [ 1, 0, 0,
			0, 1, 0,
			0, 0, 1 ];
		
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, this._rect1x1, gl.STATIC_DRAW);
		gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([ 0, 1, 3, 0, 3, 2 ]), gl.STATIC_DRAW);
		this._vertexIndexBuffer.itemSize = 1;
		this._vertexIndexBuffer.numItems = 6;
		
		
	};
	
	d._initShaders = function ()
	{
		
		var gl = this._gl;
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, this._getVertexShaderSource());
		gl.compileShader(vertexShader);
		
		if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
		{
			throw "Could not compile " +
			" shader:\n\n" + gl.getShaderInfoLog(s);
		}
		
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, this._getFragmentShaderSource());
		gl.compileShader(fragmentShader);
		
		if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
		{
			throw "Could not compile " +
			" shader:\n\n" + gl.getShaderInfoLog(fragmentShader);
		}
		
		this._shaderProgram = gl.createProgram();
		console.log(this._shaderProgram, fragmentShader, vertexShader)
		gl.attachShader(this._shaderProgram, fragmentShader);
		gl.attachShader(this._shaderProgram, vertexShader);
		gl.linkProgram(this._shaderProgram);
		gl.useProgram(this._shaderProgram);
		
	}
	
	d._initBuffers = function ()
	{
		var gl = this._gl;
		
		this._fbo = gl.createFramebuffer();
		this._maskFbo = gl.createFramebuffer();
		
		this._vertexIndexBuffer = gl.createBuffer();
		
		this._vertexPositionBuffer = gl.createBuffer();
		
		this._texCoordBuffer = gl.createBuffer();
		
		this._batchVertexIndexBuffer = gl.createBuffer();
		this._batchVertexPositionBuffer = gl.createBuffer();
		this._batchTexCoordBuffer = gl.createBuffer();
	}
	
	d._getFragmentShaderSource = function ()
	{
		
		var fsSource = [
			"precision mediump float;",
			"uniform sampler2D u_image;",
			"uniform sampler2D u_mask;",
			"uniform float u_maskmode;",
			"uniform mat3 u_colortransform;",
			"varying vec2 v_texCoord;",
			"varying vec2 v_maskCoord;",
			"void main(void) {",
			"vec4 color = texture2D(u_image, v_texCoord);",
			"vec4 mask = texture2D(u_mask, v_maskCoord);",
			"vec4 mult = vec4(u_colortransform[0][0], u_colortransform[0][1], u_colortransform[0][2],u_colortransform[1][0]);",
			"vec4 offset = vec4(u_colortransform[1][1], u_colortransform[1][2], u_colortransform[2][0], u_colortransform[2][1]);",
			"if (u_maskmode == 1.0) color.a=color.a*mask.a;",
			"gl_FragColor = (color*mult)+offset;",
			"}"
		].join("\n");
		
		return fsSource;
		
	};
	
	d._getVertexShaderSource = function ()
	{
		
		var vsSource = [
			"uniform mat4 pMatrix;",
			"attribute vec2 a_position;",
			"attribute vec2 a_texCoord;",
			"varying vec2 v_texCoord;",
			"varying vec2 v_maskCoord;",
			"uniform float u_flipY;",
			"uniform mat3 u_matrix;",
			"void main(void) {",
			"vec4 position = pMatrix * vec4(u_matrix * vec3(a_position.x, a_position.y*u_flipY, 1.0),1.0);",
			"vec4 m_position = pMatrix * vec4(vec3(a_position.x, a_position.y, 1.0),1.0);",
			"v_maskCoord = vec2((m_position.x+1.0)/2.0,(1.0-m_position.y)/2.0);",
			"gl_Position = position;",
			"v_texCoord = a_texCoord;",
			"}" ].join("\n");
		
		return vsSource;
	};
	
	
	d._initWebGL = function (canvas)
	{
		
		this._gl = null;
		var gl = null;
		
		try
		{
			gl = canvas.getContext("webgl", {
				antialias: true,
				premultipliedAlpha: false,
				stencil: true
			}) || canvas.getContext("experimental-webgl", {
				antialias: true,
				premultipliedAlpha: false,
				stencil: true
			});
		}
		catch (e)
		{
		}
		
		if (!gl)
		{
			
			return null;
			
		}
		else
		{
			return gl;
		}
		
		
	}
	
	
	d.setTransform = function (a, b, c, d, tx, ty)
	{
		var matrix = this._matrix;
		matrix[ 0 ] = a;
		matrix[ 1 ] = b;
		matrix[ 2 ] = 0.0;
		matrix[ 3 ] = c;
		matrix[ 4 ] = d;
		matrix[ 5 ] = 0.0;
		matrix[ 6 ] = tx;
		matrix[ 7 ] = ty;
		matrix[ 8 ] = 1.0;
	}
	
	d.setColorTransform = function (ctransform)
	{
		
		var transform = [ ctransform.redMultiplier,
			ctransform.greenMultiplier,
			ctransform.blueMultiplier,
			ctransform.alphaMultiplier,
			ctransform.redOffset,
			ctransform.greenOffset,
			ctransform.blueOffset,
			ctransform.alphaOffset ];
		
		var currentColorTransform = this._currentColorTransform;
		var currentColorTransformchanged = false;
		
		for (var i = 0; i < 8; i++)
		{
			if (currentColorTransform[ i ] != transform[ i ])
			{
				currentColorTransformchanged = true;
				
			}
			
		}
		
		if (currentColorTransformchanged == true)
		{
			
			if (this._batchAmount != 0)
			{
				this._renderBatch();
			}
			this._currentColorTransform = transform;
			
			var colorTransformMatrix = this._colorTransformMatrix;
			
			colorTransformMatrix[ 0 ] = transform[ 0 ]
			colorTransformMatrix[ 1 ] = transform[ 1 ]
			colorTransformMatrix[ 2 ] = transform[ 2 ]
			colorTransformMatrix[ 3 ] = transform[ 3 ]
			colorTransformMatrix[ 4 ] = transform[ 4 ] / 255;
			colorTransformMatrix[ 5 ] = transform[ 5 ] / 255;
			colorTransformMatrix[ 6 ] = transform[ 6 ] / 255;
			colorTransformMatrix[ 7 ] = transform[ 7 ] / 255;
			
			this._gl.uniformMatrix3fv(this._colorTransform, false, colorTransformMatrix);
			
		}
		
	}
	
	d._renderMasks = function (masks)
	{
		
		var masksLength = masks.length;
		
		
		if (masksLength == 0)
		{
			//this._gl.uniform1f(this._maskMode, 0.0);
			return;
		}
		
		if (this._batchAmount != 0)
		{
			this._renderBatch();
		}
		
		
		var context = this._maskRender._context;
		context.globalCompositeOperation = "source-over";
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.fillRect(0, 0, this._width, this._height);
		context.globalCompositeOperation = "source-in";
		
		for (var i = 0; i < masksLength; i++)
		{
			masks[ i ]._render_(this._maskRender);
		}
		
		var gl = this._gl;
		var w = this._width;
		var h = this._height;
		
		var img = this._maskRender._canvas;
		//
		
		if (this._maskTexture == null)
		{
			gl.activeTexture(gl.TEXTURE1);
			this._maskTexture = this._createGLTexture(img);
			gl.activeTexture(gl.TEXTURE0);
			
		}
		else
		{
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, this._maskTexture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
			gl.activeTexture(gl.TEXTURE0);
			
		}
		
		gl.uniform1f(this._maskMode, 1.0);
		
	}
	
	
	d.startMask = function ()
	{
		
		/*var gl = this._gl;
		if(this._batchAmount!=0)
		{
			this._renderBatch();
		}
		
		gl.uniform1f(this._maskMode, 0);
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._maskFbo);
		gl.clear(gl.COLOR_BUFFER_BIT );//*/
		
	}
	
	
	d.stopMask = function ()
	{
		
		/*if(this._batchAmount!=0)
		{
			this._renderBatch();
		}
		
		this._gl.uniform1f(this._maskMode, 0);//*/
		
	}
	
	d.applyMask2d = function ()
	{
		if (this._batchAmount != 0)
		{
			this._renderBatch();
		}
		
		this._gl.uniform1f(this._maskMode, 0.0);
		
	}
	
	
	d.clear = function ()
	{
		var gl = this._gl;
		gl.uniform1f(this._maskMode, 0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
	}
	
	
	d.drawTextureInfo = function (child, childMatrix)
	{
		
		var textureInfo = child._graphics._textureInfo;
		var bounds = textureInfo.bounds;
		var imageObject = textureInfo.bitmap._virtualcanvas;
		
		//if(this._checkBounds(bounds.x,
		//					bounds.y,
		//					bounds.width,
		//					bounds.height,
		//					childMatrix
		//					)==false)
		//{
		//	return;
		//}
		
		if (imageObject == this._currentBitmapSource)
		{
			this._addToBatch(textureInfo);
		}
		else
		{
			if (this._currentBitmapSource == null)
			{
				
				this._currentBitmapSource = imageObject;
				this._addToBatch(textureInfo);
			}
			else
			{
				this._renderBatch();
				this._currentBitmapSource = imageObject;
				this._addToBatch(textureInfo);
			}
			
		}
		
		this._currentObjectType = "mc";
		
	}
	
	d._addToBatch = function (textureInfo)
	{
		var img = this._currentBitmapSource;
		var map = textureInfo.map;
		
		var x = textureInfo.bounds.x;
		var y = textureInfo.bounds.y;
		var w = textureInfo.bounds.width;
		var h = textureInfo.bounds.height;
		
		var x = textureInfo.bounds.x;
		var y = textureInfo.bounds.y;
		var w = textureInfo.bounds.width;
		var h = textureInfo.bounds.height;
		
		var x0 = x;
		var y0 = y;
		var x1 = x + w;
		var y1 = y + h;
		
		var p0 = this._transformPoint(x0, y0);
		var p1 = this._transformPoint(x1, y0);
		var p2 = this._transformPoint(x0, y1);
		var p3 = this._transformPoint(x1, y1);
		
		this._batch.vertexPositionBuffer.push(
			p0[ 0 ], p0[ 1 ],
			p1[ 0 ], p1[ 1 ],
			p2[ 0 ], p2[ 1 ],
			p3[ 0 ], p3[ 1 ]
		);
		
		var tx0 = map.x / img.width;
		var ty0 = map.y / img.height;
		var tx1 = (map.width + map.x) / img.width;
		var ty1 = (map.height + map.y) / img.height;
		
		this._batch.texCoordBuffer.push(tx0, ty0, tx1, ty0,
			tx0, ty1, tx1, ty1);
		
		var batchindices_offset = this._batchindices_offset;
		
		this._batch.vertexIndexBuffer.push(0 + batchindices_offset, 1 + batchindices_offset, 3 + batchindices_offset,
			0 + batchindices_offset, 3 + batchindices_offset, 2 + batchindices_offset);
		
		this._batchindices_offset += 4;
		
		this._batchAmount++;
		
	}
	
	d._drawText = function (child)
	{
		
		
		if (this._batchAmount != 0)
		{
			this._renderBatch();
		}
		
		var gl = this._gl;
		var textfield = child._get3DtextField(gl);
		
		
		this._initTextFramebuffer(textfield);
		
		
		var w = textfield.width;
		var h = textfield.height;
		
		gl.uniformMatrix4fv(this._projectionMatrix, false, [ 2.0 / w, 0, 0, 0, 0, -2.0 / h, 0, 0, 0, 0, 1.0, 1.0, -1.0, 1.0, 0, 0 ]);
		
		gl.viewport(0, 0, w, h);
		
		
		this._texture = textfield.fontTexture;
		
		gl.bindTexture(gl.TEXTURE_2D, this._texture);
		this._cacheIndex = -1;
		
		var usermatrix = this._usermatrix;
		var matrix = this._matrix;
		
		usermatrix[ 0 ] = matrix[ 0 ];
		usermatrix[ 1 ] = matrix[ 1 ];
		
		usermatrix[ 3 ] = matrix[ 3 ];
		usermatrix[ 4 ] = matrix[ 4 ];
		
		usermatrix[ 6 ] = matrix[ 6 ];
		usermatrix[ 7 ] = matrix[ 7 ];
		
		this._initTextBuffers(textfield);
		
		gl.uniformMatrix3fv(this._matrixLocation, false, this._identy_matrix);
		
		gl.drawElements(gl.TRIANGLES, textfield.fontVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		
		gl.bindTexture(gl.TEXTURE_2D, textfield.fboTexture);
		
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
		gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
		gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
		gl.enableVertexAttribArray(this._texCoordLocation);
		gl.vertexAttribPointer(this._texCoordLocation, 2, gl.FLOAT, false, 0, 0);
		gl.colorMask(true, true, true, true);
		
		this._drawFramebuffer(textfield);
		
		
	}
	
	d._initTextFramebuffer = function (textfield)
	{
		var gl = this._gl;
		var w = textfield.width;
		var h = textfield.height;
		
		var fboTexture = textfield.fboTexture;
		
		gl.bindTexture(gl.TEXTURE_2D, fboTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._fbo);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fboTexture, 0);
		
		
	}
	
	d._initTextBuffers = function (textfield)
	{
		
		var gl = this._gl;
		
		var fontVertexIndexBuffer = textfield.fontVertexIndexBuffer == null ? gl.createBuffer() : textfield.fontVertexIndexBuffer;
		textfield.fontVertexIndexBuffer = fontVertexIndexBuffer;
		
		var fontVertexPositionBuffer = textfield.fontVertexPositionBuffer == null ? gl.createBuffer() : textfield.fontVertexPositionBuffer;
		textfield.fontVertexPositionBuffer = fontVertexPositionBuffer;
		
		var textFieldTexCoordBuffer = textfield.textFieldTexCoordBuffer == null ? gl.createBuffer() : textfield.textFieldTexCoordBuffer;
		textfield.textFieldTexCoordBuffer = textFieldTexCoordBuffer;
		
		gl.bindBuffer(gl.ARRAY_BUFFER, textFieldTexCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, textfield.textureVertices, gl.STATIC_DRAW);
		textFieldTexCoordBuffer.itemSize = 2;
		textFieldTexCoordBuffer.numItems = textfield.charsAmount * 2;
		
		gl.enableVertexAttribArray(this._texCoordLocation);
		gl.vertexAttribPointer(this._texCoordLocation, 2, gl.FLOAT, false, 0, 0);
		
		
		gl.bindBuffer(gl.ARRAY_BUFFER, fontVertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, textfield.fontVertices, gl.STATIC_DRAW);
		fontVertexPositionBuffer.itemSize = 2;
		fontVertexPositionBuffer.numItems = textfield.charsAmount * 2;
		gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, fontVertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, textfield.fontVertexIndices, gl.STATIC_DRAW);
		fontVertexIndexBuffer.itemSize = 1;
		fontVertexIndexBuffer.numItems = textfield.charsAmount * 6;
		
	}
	
	d._drawFramebuffer = function (textField)
	{
		
		var w = textField.width;
		var h = textField.height;
		var gl = this._gl;
		gl.bindTexture(gl.TEXTURE_2D, textField.fboTexture);
		gl.uniform1f(this._flipYLocation, -1);
		gl.viewport(0, 0, this._width, this._height);
		
		gl.uniformMatrix4fv(this._projectionMatrix, false, [ 2.0 / this._width, 0, 0, 0, 0, -2.0 / this._height, 0, 0, 0, 0, 1.0, 1.0, -1.0, 1.0, 0, 0 ]);
		
		var x = 0;
		var y = h;
		var usermatrix = this._usermatrix;
		var matrix = this._matrix;
		
		usermatrix[ 0 ] = matrix[ 0 ] * w;
		usermatrix[ 1 ] = matrix[ 1 ] * w;
		
		usermatrix[ 3 ] = matrix[ 3 ] * h;
		usermatrix[ 4 ] = matrix[ 4 ] * h;
		
		usermatrix[ 6 ] = matrix[ 6 ] + x * matrix[ 0 ] + y * matrix[ 3 ];
		usermatrix[ 7 ] = matrix[ 7 ] + x * matrix[ 1 ] + y * matrix[ 4 ];
		
		gl.uniformMatrix3fv(this._matrixLocation, false, usermatrix);
		
		gl.drawElements(gl.TRIANGLES, this._vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		
		gl.uniform1f(this._flipYLocation, 1);
		
	}
	
	
	d.drawGraphics = function (child, childMatrix)
	{
		var imageObject = child._graphics._renderData();
		
		if (imageObject.rect.width > 0 && imageObject.rect.height > 0)
		{
			
			var rect = imageObject.rect;
			var x = rect.x;
			var y = rect.y;
			var w = rect.width;
			var h = rect.height;
			
			//if(this._checkBounds(x,	y,w,h,childMatrix)==false)
			//{
			//	return;
			//}
			
			if (this._batchAmount != 0)
			{
				this._renderBatch();
			}
			
			////render////
			
			var gl = this._gl;
			
			if (this._currentObjectType == "mc")
			{
				gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
				gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
				
				gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
				gl.enableVertexAttribArray(this._texCoordLocation);
				gl.vertexAttribPointer(this._texCoordLocation, 2, gl.FLOAT, false, 0, 0);
				this._currentObjectType = "image";
			}
			
			var cacheIndex = this._imageCache.indexOf(imageObject.img);
			
			if (cacheIndex != -1)
			{
				if (cacheIndex != this._cacheIndex)
				{
					this._cacheIndex = cacheIndex;
					this._texture = this._textureCache[ cacheIndex ];
					gl.bindTexture(gl.TEXTURE_2D, this._texture);
				}
			}
			else
			{
				this._imageCache.push(imageObject.img);
				this._texture = this._createGLTexture(imageObject.img);
				gl.bindTexture(gl.TEXTURE_2D, this._texture);
			}
			
			var usermatrix = this._usermatrix;
			var matrix = this._matrix;
			
			usermatrix[ 0 ] = matrix[ 0 ] * w;
			usermatrix[ 1 ] = matrix[ 1 ] * w;
			
			usermatrix[ 3 ] = matrix[ 3 ] * h;
			usermatrix[ 4 ] = matrix[ 4 ] * h;
			
			usermatrix[ 6 ] = matrix[ 6 ] + x * matrix[ 0 ] + y * matrix[ 3 ];
			usermatrix[ 7 ] = matrix[ 7 ] + x * matrix[ 1 ] + y * matrix[ 4 ];
			
			gl.uniformMatrix3fv(this._matrixLocation, false, usermatrix);
			
			gl.drawElements(gl.TRIANGLES, this._vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
			
		}
	}
	
	d.drawBitmap = function (bitmapData)
	{
		if (!bitmapData) return;
		
		if (this._batchAmount != 0)
		{
			this._renderBatch();
		}
		var gl = this._gl;
		
		
		var w = bitmapData._width;
		var h = bitmapData._height;
		
		
		if (this._currentObjectType == "mc")
		{
			gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexPositionBuffer);
			gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._vertexIndexBuffer);
			
			gl.bindBuffer(gl.ARRAY_BUFFER, this._texCoordBuffer);
			gl.enableVertexAttribArray(this._texCoordLocation);
			gl.vertexAttribPointer(this._texCoordLocation, 2, gl.FLOAT, false, 0, 0);
			this._currentObjectType = "image";
		}
		
		var img = bitmapData._get_Texture(gl);
		
		if (img)
		{
			gl.bindTexture(gl.TEXTURE_2D, img);
		}
		
		
		var usermatrix = this._usermatrix;
		var matrix = this._matrix;
		
		usermatrix[ 0 ] = matrix[ 0 ] * w;
		usermatrix[ 1 ] = matrix[ 1 ] * w;
		
		usermatrix[ 3 ] = matrix[ 3 ] * h;
		usermatrix[ 4 ] = matrix[ 4 ] * h;
		
		usermatrix[ 6 ] = matrix[ 6 ];
		usermatrix[ 7 ] = matrix[ 7 ];
		
		gl.uniformMatrix3fv(this._matrixLocation, false, usermatrix);
		
		gl.drawElements(gl.TRIANGLES, this._vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		
	};
	
	d._renderBatch = function ()
	{
		
		var batch = this._batch;
		var gl = this._gl;
		var batchTexCoordBuffer = this._batchTexCoordBuffer;
		var batchVertexIndexBuffer = this._batchVertexIndexBuffer;
		var batchVertexPositionBuffer = this._batchVertexPositionBuffer;
		var batchAmount = this._batchAmount;
		
		if (batch.vertexIndexBuffer.length == 0)
		{
			return;
		}
		
		var img = this._currentBitmapSource;
		
		var cacheIndex = this._imageCache.indexOf(img);
		
		if (cacheIndex != -1)
		{
			
			this._cacheIndex = cacheIndex;
			this._texture = this._textureCache[ cacheIndex ];
			gl.bindTexture(gl.TEXTURE_2D, this._texture);
			
		}
		else
		{
			this._imageCache.push(img);
			this._texture = this._createGLTexture(img);
			gl.bindTexture(gl.TEXTURE_2D, this._texture);
			this._cacheIndex = this._textureCache[ this._textureCache.length - 1 ];
		}
		
		
		gl.bindBuffer(gl.ARRAY_BUFFER, batchTexCoordBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(batch.texCoordBuffer), gl.STATIC_DRAW);
		batchTexCoordBuffer.itemSize = 2;
		batchTexCoordBuffer.numItems = batchAmount * 2;
		
		gl.enableVertexAttribArray(this._texCoordLocation);
		gl.vertexAttribPointer(this._texCoordLocation, 2, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, batchVertexPositionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(batch.vertexPositionBuffer), gl.STATIC_DRAW);
		batchVertexPositionBuffer.itemSize = 2;
		batchVertexPositionBuffer.numItems = batchAmount * 2;
		
		
		gl.vertexAttribPointer(this._positionLocation, 2, gl.FLOAT, false, 0, 0);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, batchVertexIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(batch.vertexIndexBuffer), gl.STATIC_DRAW);
		batchVertexIndexBuffer.itemSize = 1;
		batchVertexIndexBuffer.numItems = batchAmount * 6;
		
		
		gl.uniformMatrix3fv(this._matrixLocation, false, this._identy_matrix);
		gl.drawElements(gl.TRIANGLES, batchVertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
		
		
		/*clear*/
		this._batch.vertexIndexBuffer = [];
		this._batch.vertexPositionBuffer = [];
		this._batch.texCoordBuffer = [];
		this._batchAmount = 0;
		this._batchindices_offset = 0;
		
		
	}
	
	d._initMaskFramebufferTexture = function ()
	{
		var gl = this._gl;
		
		gl.activeTexture(gl.TEXTURE1);
		
		if (this._maskTexture == null)
		{
			this._maskTexture = gl.createTexture();
		}
		
		gl.bindTexture(gl.TEXTURE_2D, this._maskTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._width, this._height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindFramebuffer(gl.FRAMEBUFFER, this._maskFbo);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._maskTexture, 0);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.activeTexture(gl.TEXTURE0);
		
	}
	
	d._createGLTexture = function (img)
	{
		var gl = this._gl;
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this._textureCache.push(texture);
		return texture;
		
	}
	d._transformPoint = function (x, y)
	{
		
		var tx = this._matrix[ 0 ] * x + this._matrix[ 3 ] * y + this._matrix[ 6 ];
		var ty = this._matrix[ 4 ] * y + this._matrix[ 1 ] * x + this._matrix[ 7 ];
		return [ tx, ty ]
	};
	
	d._checkBounds = function (x, y, width, height, matrix)
	{
		
		var minX = 0;
		var minY = 0;
		var maxX = this._width;
		var maxY = this._height;
		
		var left = 0;
		var right = 0;
		var top = 0;
		var bottom = 0;
		
		//top left
		var px = x;
		var py = y;
		
		var tx = matrix.a * px + matrix.c * py + matrix.tx;
		var ty = matrix.d * py + matrix.b * px + matrix.ty;
		
		if (tx < minX) left++;
		if (tx > maxX) right++;
		
		if (ty < minY) top++;
		if (ty > maxY) bottom++;
		
		//top right
		px = x + width;
		py = y;
		
		tx = matrix.a * px + matrix.c * py + matrix.tx;
		ty = matrix.d * py + matrix.b * px + matrix.ty;
		
		if (tx < minX) left++;
		if (tx > maxX) right++;
		
		if (ty < minY) top++;
		if (ty > maxY) bottom++;
		
		//bottom left
		px = x;
		py = y + height;
		
		tx = matrix.a * px + matrix.c * py + matrix.tx;
		ty = matrix.d * py + matrix.b * px + matrix.ty;
		
		if (tx < minX) left++;
		if (tx > maxX) right++;
		
		if (ty < minY) top++;
		if (ty > maxY) bottom++;
		
		//bottom right
		px = x + width;
		py = y + height;
		
		tx = matrix.a * px + matrix.c * py + matrix.tx;
		ty = matrix.d * py + matrix.b * px + matrix.ty;
		
		if (tx < minX) left++;
		if (tx > maxX) right++;
		
		if (ty < minY) top++;
		if (ty > maxY) bottom++;
		
		return left != 4 && right != 4 && top != 4 && bottom != 4;
	}
	
	d.setSize = function (w, h)
	{
		
		this._width = this._canvas.width = w;
		this._height = this._canvas.height = h;
		
		this._gl.viewport(0, 0, w, h);
		this._gl.viewportWidth = w;
		this._gl.viewportHeight = h;
		
		this._maskRender.setSize(w, h);
		
		this._gl.uniformMatrix4fv(this._projectionMatrix, false, [ 2.0 / w, 0, 0, 0, 0, -2.0 / h, 0, 0, 0, 0, 1.0, 1.0, -1.0, 1.0, 0, 0 ]);
		
		
	}
	
	
	flash.addDescription("flash.display.Render3d", d, null, null, null);
	
}
());