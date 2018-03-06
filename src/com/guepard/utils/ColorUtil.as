package com.guepard.utils
{
	/**
	 *
	 * @author Sergey Antonov
	 */
	public class ColorUtil
	{
		public static const BLACK:ColorUtil = new ColorUtil(0x000000, 1);
		public static const WHITE:ColorUtil = new ColorUtil(0xffffff, 1);
		public static const RED:ColorUtil = new ColorUtil(0xff0000, 1);
		public static const GREEN:ColorUtil = new ColorUtil(0x00ff00, 1);
		public static const BLUE:ColorUtil = new ColorUtil(0x0000ff, 1);
		public static const TRANSPARENT:ColorUtil = new ColorUtil(0x000000, 0);
		
		public static function interpolate(color1:ColorUtil, color2:ColorUtil, value:Number = 0.5):ColorUtil
		{
			return ColorUtil.fromARGB(
				color1.a + (color2.a - color1.a) * value,
				color1.r + (color2.r - color1.r) * value,
				color1.g + (color2.g - color1.g) * value,
				color1.b + (color2.b - color1.b) * value
			);
		}
		
		public static function fromNumbers(alpha:Number = 1, red:Number = 1, green:Number = 1, blue:Number = 1):ColorUtil
		{
			var color:ColorUtil = new ColorUtil();
			color.alpha = alpha;
			color.red = red;
			color.green = green;
			color.blue = blue;
			return color;
		}
		
		public static function fromRGB(r:uint = 0xff, g:uint = 0xff, b:uint = 0xff):ColorUtil
		{
			var color:ColorUtil = new ColorUtil();
			color.r = r;
			color.g = g;
			color.b = b;
			return color;
		}
		
		public static function fromARGB(a:uint = 0xff, r:uint = 0xff, g:uint = 0xff, b:uint = 0xff):ColorUtil
		{
			var color:ColorUtil = new ColorUtil();
			color.a = a;
			color.r = r;
			color.g = g;
			color.b = b;
			return color;
		}
		
		private var _a:uint;
		
		public function get a():uint
		{
			return _a;
		}
		
		public function set a(value:uint):void
		{
			if (value > 0xff) value = 0xff;
			_a = value;
		}
		
		private var _r:uint;
		
		public function get r():uint
		{
			return _r;
		}
		
		public function set r(value:uint):void
		{
			if (value > 0xff) value = 0xff;
			_r = value;
		}
		
		private var _g:uint;
		
		public function get g():uint
		{
			return _g;
		}
		
		public function set g(value:uint):void
		{
			if (value > 0xff) value = 0xff;
			_g = value;
		}
		
		private var _b:uint;
		
		public function get b():uint
		{
			return _b;
		};
		
		public function set b(value:uint):void
		{
			if (value > 0xff) value = 0xff;
			_b = value;
		}
		
		public function get transparent():Boolean
		{
			return _a == 0;
		}
		
		public function set transparent(value:Boolean):void
		{
			if (value) _a = 0;
		}
		
		public function get alpha():Number
		{
			return a / 0xff;
		}
		
		public function set alpha(value:Number):void
		{
			if (value < 0) value = 0;
			if (value > 1) value = 1;
			a = value * 0xff;
		}
		
		public function get red():Number
		{
			return r / 0xff;
		}
		
		public function set red(value:Number):void
		{
			if (value < 0) value = 0;
			if (value > 1) value = 1;
			r = value * 0xff;
		}
		
		public function get green():Number
		{
			return g / 0xff;
		}
		
		public function set green(value:Number):void
		{
			if (value < 0) value = 0;
			if (value > 1) value = 1;
			g = value * 0xff;
		}
		
		public function get blue():Number
		{
			return b / 0xff;
		}
		
		public function set blue(value:Number):void
		{
			if (value < 0) value = 0;
			if (value > 1) value = 1;
			b = value * 0xff;
		}
		
		public function get rgb():uint
		{
			return (r << 16) | (g << 8) | b;
		}
		
		public function set rgb(value:uint):void
		{
			r = (value >> 16) & 0xff;
			g = (value >> 8) & 0xff;
			b = value & 0xff;
		}
		
		public function get argb():uint
		{
			return (a << 24) | (r << 16) | (g << 8) | b;
		}
		
		public function set argb(value:uint):void
		{
			a = (value >> 24) & 0xff;
			r = (value >> 16) & 0xff;
			g = (value >> 8) & 0xff;
			b = value & 0xff;
		}
		
		public function get hue():uint
		{
			var r:Number = this.red;
			var g:Number = this.green;
			var b:Number = this.blue;
			
			var v:Number;
			var m:Number;
			var vm:Number;
			
			var r2:Number;
			var g2:Number;
			var b2:Number;
			
			var h:Number = 0;
			var s:Number = 0;
			var l:Number = 0;
			
			v = Math.max(r, g);
			v = Math.max(v, b);
			m = Math.min(r, g);
			m = Math.min(m, b);
			
			l = (m + v) / 2;
			
			if (l <= 0)
			{
				return h;
			}
			
			vm = v - m;
			s = vm;
			
			if (s > 0.0)
			{
				s /= (l <= 0.5) ? (v + m) : (2.0 - v - m);
			}
			else
			{
				return h;
			}
			
			r2 = (v - r) / vm;
			g2 = (v - g) / vm;
			b2 = (v - b) / vm;
			
			if (r == v)
			{
				h = (g == m ? 5.0 + b2 : 1.0 - g2);
			}
			else if (g == v)
			{
				h = (b == m ? 1.0 + r2 : 3.0 - b2);
			}
			else
			{
				h = (r == m ? 3.0 + g2 : 5.0 - r2);
			}
			
			h /= 6;
			
			return h;
		}
		
		public function get saturation():Number
		{
			var r:Number = this.red;
			var g:Number = this.green;
			var b:Number = this.blue;
			
			var v:Number;
			var m:Number;
			var vm:Number;
			
			var r2:Number;
			var g2:Number;
			var b2:Number;
			
			var h:Number = 0;
			var s:Number = 0;
			var l:Number = 0;
			
			v = Math.max(r, g);
			v = Math.max(v, b);
			m = Math.min(r, g);
			m = Math.min(m, b);
			
			l = (m + v) / 2;
			
			if (l <= 0)
			{
				return s;
			}
			
			vm = v - m;
			s = vm;
			
			if (s > 0.0)
			{
				s /= (l <= 0.5) ? (v + m) : (2.0 - v - m);
			}
			else
			{
				return s;
			}
			
			r2 = (v - r) / vm;
			g2 = (v - g) / vm;
			b2 = (v - b) / vm;
			
			if (r == v)
			{
				h = (g == m ? 5.0 + b2 : 1.0 - g2);
			}
			else if (g == v)
			{
				h = (b == m ? 1.0 + r2 : 3.0 - b2);
			}
			else
			{
				h = (r == m ? 3.0 + g2 : 5.0 - r2);
			}
			
			h /= 6;
			
			return s;
		}
		
		public function get brightness():Number
		{
			var r:Number = this.red;
			var g:Number = this.green;
			var b:Number = this.blue;
			
			var v:Number;
			var m:Number;
			var vm:Number;
			
			var r2:Number;
			var g2:Number;
			var b2:Number;
			
			var h:Number = 0;
			var s:Number = 0;
			var l:Number = 0;
			
			v = Math.max(r, g);
			v = Math.max(v, b);
			m = Math.min(r, g);
			m = Math.min(m, b);
			
			l = (m + v) / 2;
			
			if (l <= 0)
			{
				return l;
			}
			
			vm = v - m;
			s = vm;
			
			if (s > 0.0)
			{
				s /= (l <= 0.5) ? (v + m) : (2.0 - v - m);
			}
			else
			{
				return l;
			}
			
			r2 = (v - r) / vm;
			g2 = (v - g) / vm;
			b2 = (v - b) / vm;
			
			if (r == v)
			{
				h = (g == m ? 5.0 + b2 : 1.0 - g2);
			}
			else if (g == v)
			{
				h = (b == m ? 1.0 + r2 : 3.0 - b2);
			}
			else
			{
				h = (r == m ? 3.0 + g2 : 5.0 - r2);
			}
			
			h /= 6;
			
			return l;
		}
		
		public function ColorUtil(rgb:uint = 0xffffff, alpha:uint = 1)
		{
			this.rgb = rgb;
			this.alpha = alpha;
		}
		
		public function clone():ColorUtil
		{
			return new ColorUtil(rgb, alpha);
		}
		
		public function invert():void
		{
			r = 0xff - r;
			g = 0xff - g;
			b = 0xff - b;
		}
		
		public function equals(value:ColorUtil):Boolean
		{
			return a == value.a && r == value.r && g == value.g && b == value.b;
		}
		
		/**
		 * Строковое представление цвета.
		 * @return Строковое представление цвета.
		 */
		public function toString():String
		{
			return "ColorUtil{a:" + a + ", r:" + r + ", g:" + g + ", b:" + b + "}";
		}
	}
	
}