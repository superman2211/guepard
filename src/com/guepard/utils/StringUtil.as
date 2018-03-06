package com.guepard.utils
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class StringUtil
	{
		public static const KILO:String = "k";
		public static const MEGA:String = "M";
		
		public static function get currentTimeString():String
		{
			var date:Date = new Date();
			
			var hours:String = date.hours.toString();
			if (hours.length < 2) hours = "0" + hours;
			
			var minutes:String = date.minutes.toString();
			if (minutes.length < 2) minutes = "0" + minutes;
			
			var seconds:String = date.seconds.toString();
			if (seconds.length < 2) seconds = "0" + seconds;
			
			var miliseconds:String = date.milliseconds.toString();
			while (miliseconds.length < 3) miliseconds = "0" + miliseconds;
			
			return hours + ":" + minutes + ":" + seconds + ":" + miliseconds;
		}
		
		public static function generateAdvancedTimeText(seconds:Number,
		                                                dayAppend:String = "d",
		                                                hourAppend:String = "h",
		                                                minuteAppend:String = "m",
		                                                secondsAppend:String = "s",
		                                                delimiter:String = " "):String
		{
			var minutes:Number = Math.floor(seconds / 60);
			var hours:Number = Math.floor(seconds / 60 / 60);
			var days:Number = Math.floor(seconds / 60 / 60 / 24);
			
			seconds = seconds % 60;
			minutes = minutes % 60;
			hours = hours % 24;
			days = days % 365;
			
			var secondsString:String = seconds.toString() + secondsAppend;
			var minutesString:String = minutes.toString() + minuteAppend;
			var hoursString:String = hours.toString() + hourAppend;
			var daysString:String = days.toString() + dayAppend;
			
			var text:String = "";
			
			if (days)
			{
				if (hours)
				{
					text = daysString + delimiter + hoursString;
				}
				else
				{
					text = daysString;
				}
			}
			else if (hours)
			{
				if (minutes)
				{
					text = hoursString + delimiter + minutesString;
				}
				else
				{
					text = hoursString;
				}
			}
			else if (minutes)
			{
				if (seconds)
				{
					text = minutesString + delimiter + secondsString;
				}
				else
				{
					text = minutesString;
				}
			}
			else
			{
				text = secondsString;
			}
			
			return text;
		}
		
		public static function generateTimeText(seconds:Number, delimiter:String = " : "):String
		{
			var minutes:Number = Math.floor(seconds / 60);
			var hours:Number = Math.floor(seconds / 60 / 60);
			
			seconds = seconds % 60;
			minutes = minutes % 60;
			//hours = hours % 24;
			
			var secondsString:String = seconds.toString();
			var minutesString:String = minutes.toString();
			var hoursString:String = hours.toString();
			
			if (secondsString.length == 1 && minutes) secondsString = "0" + secondsString;
			if (minutesString.length == 1 && hours) minutesString = "0" + minutesString;
			
			var text:String = "";
			
			if (hours) text += hoursString + delimiter + minutesString + delimiter + secondsString;
			else if (minutes) text += minutesString + delimiter + secondsString;
			else text += secondsString;
			
			return text;
		}
		
		public static function decompressNumber(value:String):Number
		{
			if (value.indexOf(MEGA) != -1)
			{
				return Number(value.replace(MEGA, "")) * 1000000;
			}
			else if (value.indexOf(KILO) != -1)
			{
				return Number(value.replace(KILO, "")) * 1000;
			}
			else
			{
				return Number(value);
			}
		}
		
		public static function compressNumber(value:Number, kilo:Number = 999, mega:Number = 999999):String
		{
			if (value > mega)
			{
				return Math.round(value / 1000000) + MEGA;
			}
			else if (value > kilo)
			{
				return Math.round(value / 1000) + KILO;
			}
			else
			{
				return Math.round(value).toString();
			}
		}
		
		static public function translit(source:String):String
		{
			var output:String = "";
			
			for (var i:int = 0; i < source.length; i++)
			{
				var char:String = source[i];
				
				switch (char)
				{
					case "А":
						output += "A";
						break;
					case "а":
						output += "a";
						break;
					case "Б":
						output += "B";
						break;
					case "б":
						output += "b";
						break;
					case "В":
						output += "V";
						break;
					case "в":
						output += "v";
						break;
					case "Г":
						output += "G";
						break;
					case "г":
						output += "g";
						break;
					case "Д":
						output += "D";
						break;
					case "д":
						output += "d";
						break;
					case "Е":
						output += "E";
						break;
					case "е":
						output += "e";
						break;
					case "Ё":
						output += "YO";
						break;
					case "ё":
						output += "yo";
						break;
					case "Ж":
						output += "G";
						break;
					case "ж":
						output += "g";
						break;
					case "З":
						output += "Z";
						break;
					case "з":
						output += "z";
						break;
					case "И":
						output += "I";
						break;
					case "и":
						output += "i";
						break;
					case "Й":
						output += "Y";
						break;
					case "й":
						output += "y";
						break;
					case "К":
						output += "K";
						break;
					case "к":
						output += "k";
						break;
					case "Л":
						output += "L";
						break;
					case "л":
						output += "l";
						break;
					case "М":
						output += "M";
						break;
					case "м":
						output += "m";
						break;
					case "Н":
						output += "N";
						break;
					case "н":
						output += "n";
						break;
					case "О":
						output += "O";
						break;
					case "о":
						output += "o";
						break;
					case "П":
						output += "P";
						break;
					case "п":
						output += "p";
						break;
					case "Р":
						output += "R";
						break;
					case "р":
						output += "r";
						break;
					case "С":
						output += "C";
						break;
					case "с":
						output += "c";
						break;
					case "Т":
						output += "T";
						break;
					case "т":
						output += "t";
						break;
					case "У":
						output += "U";
						break;
					case "у":
						output += "u";
						break;
					case "Ф":
						output += "F";
						break;
					case "ф":
						output += "f";
						break;
					case "Х":
						output += "H";
						break;
					case "х":
						output += "h";
						break;
					case "Ц":
						output += "TC";
						break;
					case "ц":
						output += "tc";
						break;
					case "Ч":
						output += "CH";
						break;
					case "ч":
						output += "ch";
						break;
					case "Ш":
						output += "SH";
						break;
					case "ш":
						output += "sh";
						break;
					case "Щ":
						output += "SH";
						break;
					case "щ":
						output += "sh";
						break;
					case "Ъ":
						output += "";
						break;
					case "ъ":
						output += "";
						break;
					case "Ы":
						output += "I";
						break;
					case "ы":
						output += "i";
						break;
					case "Ь":
						output += "";
						break;
					case "ь":
						output += "";
						break;
					case "Э":
						output += "E";
						break;
					case "э":
						output += "e";
						break;
					case "Ю":
						output += "YU";
						break;
					case "ю":
						output += "yu";
						break;
					case "Я":
						output += "YA";
						break;
					case "я":
						output += "ya";
						break;
					default:
						output += char;
						break;
				}
			}
			
			return output;
		}
		
		static public function replace(source:String, oldText:String, newText:String):String
		{
			if (source && oldText && newText)
			{
				while (source.indexOf(oldText) != -1)
				{
					source = source.replace(oldText, newText);
				}
			}
			
			return source;
		}
		
		public static function correctHTMLText(text:String):String
		{
			text = replace(text, "&amp;", "&");
			text = replace(text, "&gt;", ">");
			text = replace(text, "&lt;", "<");
			text = replace(text, "&quot;", '"');
			text = replace(text, "&apos;", "'");
			
			return text;
		}
		
		public static function correctText(text:String):String
		{
			text = text.replace(new RegExp("\n", 'g'), "&#13;");
			text = text.replace(new RegExp("\r", 'g'), "&#10;");
			text = text.replace(new RegExp("\"", 'g'), "&quot;");
			text = text.replace(new RegExp("'", 'g'), "&apos;");
			
			return text;
		}
		
		static public function toRomanString(value:int):String
		{
			switch (value)
			{
				case 0:
					return "";
				case 1:
					return "I";
				case 2:
					return "II";
				case 3:
					return "III";
				case 4:
					return "IV";
				case 5:
					return "V";
				case 6:
					return "VI";
				case 7:
					return "VII";
				case 8:
					return "VIII";
				case 9:
					return "IX";
				case 10:
					return "X";
			}
			
			return value.toString();
		}
		
	}
	
}