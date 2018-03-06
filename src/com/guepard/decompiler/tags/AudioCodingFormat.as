package com.guepard.decompiler.tags
{
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class AudioCodingFormat
	{
		public static const UNCOMPRESSED_NATIVE_ENDIAN:uint = 0;
		public static const ADPCM:uint = 1;
		public static const MP3:uint = 2;
		public static const UNCOMPRESSED_LITTLE_ENDIAN:uint = 3;
		public static const NELLYMOSER_16:uint = 4;
		public static const NELLYMOSER_8:uint = 5;
		public static const NELLYMOSER:uint = 6;
		public static const SPEEX:uint = 11;
		
		public static function getFormatName(id:uint):String
		{
			switch (id)
			{
				case UNCOMPRESSED_NATIVE_ENDIAN:
					return "Uncompressed native-endian";
				case ADPCM:
					return "ADPCM";
				case MP3:
					return "MP3";
				case UNCOMPRESSED_LITTLE_ENDIAN:
					return "Uncompressed little-endian";
				case NELLYMOSER_16:
					return "Nellymoser 16kHz";
				case NELLYMOSER_8:
					return "Nellymoser 8kHz";
				case NELLYMOSER:
					return "Nellymoser";
				case SPEEX:
					return "Speex";
				default:
					return "undefined";
			}
		}
		
		static public function getRateName(rate:uint):String
		{
			switch (rate)
			{
				case 0:
					return "5.5 kHz";
				case 1:
					return "11 kHz";
				case 2:
					return "22 kHz";
				case 3:
					return "44 kHz";
				default:
					return "undefined";
			}
			
		}
		
	}
	
}