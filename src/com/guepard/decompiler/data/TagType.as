package com.guepard.decompiler.data
{
	import com.guepard.decompiler.tags.CSMTextSettings;
	import com.guepard.decompiler.tags.DefineBinaryData;
	import com.guepard.decompiler.tags.DefineBits;
	import com.guepard.decompiler.tags.DefineBitsJPEG2;
	import com.guepard.decompiler.tags.DefineBitsJPEG3;
	import com.guepard.decompiler.tags.DefineBitsJPEG4;
	import com.guepard.decompiler.tags.DefineBitsLossless;
	import com.guepard.decompiler.tags.DefineBitsLossless2;
	import com.guepard.decompiler.tags.DefineButton2;
	import com.guepard.decompiler.tags.DefineEditText;
	import com.guepard.decompiler.tags.DefineFont;
	import com.guepard.decompiler.tags.DefineFont2;
	import com.guepard.decompiler.tags.DefineFont3;
	import com.guepard.decompiler.tags.DefineFont4;
	import com.guepard.decompiler.tags.DefineFontAlignZones;
	import com.guepard.decompiler.tags.DefineFontInfo;
	import com.guepard.decompiler.tags.DefineFontInfo2;
	import com.guepard.decompiler.tags.DefineFontName;
	import com.guepard.decompiler.tags.DefineScene;
	import com.guepard.decompiler.tags.DefineShape;
	import com.guepard.decompiler.tags.DefineShape2;
	import com.guepard.decompiler.tags.DefineShape3;
	import com.guepard.decompiler.tags.DefineShape4;
	import com.guepard.decompiler.tags.DefineSound;
	import com.guepard.decompiler.tags.DefineSprite;
	import com.guepard.decompiler.tags.DefineText;
	import com.guepard.decompiler.tags.DefineText2;
	import com.guepard.decompiler.tags.DoABC;
	import com.guepard.decompiler.tags.FileAttributes;
	import com.guepard.decompiler.tags.FrameLabel;
	import com.guepard.decompiler.tags.PlaceObject;
	import com.guepard.decompiler.tags.PlaceObject2;
	import com.guepard.decompiler.tags.PlaceObject3;
	import com.guepard.decompiler.tags.RemoveObject;
	import com.guepard.decompiler.tags.RemoveObject2;
	import com.guepard.decompiler.tags.SetBackgroundColor;
	import com.guepard.decompiler.tags.ShowFrame;
	import com.guepard.decompiler.tags.SoundStreamBlock;
	import com.guepard.decompiler.tags.SoundStreamHead;
	import com.guepard.decompiler.tags.SoundStreamHead2;
	import com.guepard.decompiler.tags.StartSound;
	import com.guepard.decompiler.tags.StartSound2;
	import com.guepard.decompiler.tags.SymbolClass;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TagType
	{
		public static const SHOW_FRAME:uint = 1;
		public static const FILE_ATTRIBUTES:uint = 69;
		public static const SET_BACKGROUND_COLOR:uint = 9;
		
		public static const PLACE_OBJECT:uint = 4;
		public static const PLACE_OBJECT_2:uint = 26;
		public static const PLACE_OBJECT_3:uint = 70;
		
		public static const REMOVE_OBJECT:uint = 5;
		public static const REMOVE_OBJECT_2:uint = 28;
		
		public static const DEFINE_BINARY_DATA:uint = 87;
		public static const DEFINE_SPRITE:uint = 39;
		
		public static const FRAME_LABEL:uint = 43;
		
		public static const DEFINE_SHAPE:uint = 2;
		public static const DEFINE_SHAPE_2:uint = 22;
		public static const DEFINE_SHAPE_3:uint = 32;
		public static const DEFINE_SHAPE_4:uint = 83;
		
		public static const DO_ABC:uint = 82;
		public static const SYMBOL_CLASS:uint = 76;
		
		public static const DEFINE_SCENE:uint = 86;
		
		public static const JPEG_TABLES:uint = 8;
		public static const DEFINE_BITS:uint = 6;
		public static const DEFINE_BITS_JPEG_2:uint = 21;
		public static const DEFINE_BITS_JPEG_3:uint = 35;
		public static const DEFINE_BITS_JPEG_4:uint = 90;
		public static const DEFINE_BITS_LOSS_LESS:uint = 20;
		public static const DEFINE_BITS_LOSS_LESS_2:uint = 36;
		
		public static const DEFINE_TEXT:uint = 11;
		public static const DEFINE_TEXT_2:uint = 33;
		public static const DEFINE_EDIT_TEXT:uint = 37;
		
		public static const CSM_TEXT_SETTINGS:uint = 74;
		
		public static const DEFINE_FONT:uint = 10;
		public static const DEFINE_FONT_INFO:uint = 13;
		public static const DEFINE_FONT_2:uint = 48;
		public static const DEFINE_FONT_INFO_2:uint = 62;
		public static const DEFINE_FONT_ALIGN_ZONES:uint = 73;
		public static const DEFINE_FONT_3:uint = 75;
		public static const DEFINE_FONT_NAME:uint = 88;
		public static const DEFINE_FONT_4:uint = 91;
		
		public static const DEFINE_SOUND:uint = 14;
		public static const START_SOUND:uint = 15;
		public static const START_SOUND_2:uint = 89;
		public static const SOUND_STREAM_HEAD:uint = 18;
		public static const SOUND_STREAM_HEAD_2:uint = 45;
		public static const SOUND_STREAM_BLOCK:uint = 19;
		static public const DEFINE_BUTTON_2:uint = 34;
		
		static public function getName(type:uint):String
		{
			switch (type)
			{
				case  0:
					return "End";
				
				case  1:
					return "ShowFrame";
				
				case  2:
					return "DefineShape";
				
				case  4:
					return "PlaceObject";
				
				case  5:
					return "RemoveObject";
				
				case  6:
					return "DefineBits";
				
				case  7:
					return "DefineButton";
				
				case  8:
					return "JPEGTables";
				
				case  9:
					return "SetBackgroundColor";
				
				case 10:
					return "DefineFont";
				
				case 11:
					return "DefineText";
				
				case 12:
					return "DoAction";
				
				case 13:
					return "DefineFontInfo";
				
				case 14:
					return "DefineSound";
				
				case 15:
					return "StartSound";
				
				case 17:
					return "DefineButtonSound";
				
				case 18:
					return "SoundStreamHead";
				
				case 19:
					return "SoundStreamBlock";
				
				case 20:
					return "DefineBitsLossless";
				
				case 21:
					return "DefineBitsJPEG2";
				
				case 22:
					return "DefineShape2";
				
				case 23:
					return "DefineButtonCxform";
				
				case 24:
					return "Protect";
				
				case 26:
					return "PlaceObject2";
				
				case 28:
					return "RemoveObject2";
				
				case 32:
					return "DefineShape3";
				
				case 33:
					return "DefineText2";
				
				case 34:
					return "DefineButton2";
				
				case 35:
					return "DefineBitsJPEG3";
				
				case 36:
					return "DefineBitsLossless2";
				
				case 37:
					return "DefineEditText";
				
				case 39:
					return "DefineSprite";
				
				case 43:
					return "FrameLabel";
				
				case 45:
					return "SoundStreamHead2";
				
				case 46:
					return "DefineMorphShape";
				
				case 48:
					return "DefineFont2";
				
				case 56:
					return "ExportAssets";
				
				case 57:
					return "ImoprtAssets";
				
				case 58:
					return "EnableDebugger";
				
				case 59:
					return "DoInitAction";
				
				case 60:
					return "DefineVideoStream";
				
				case 61:
					return "VideoStream";
				
				case 62:
					return "DefineFontInfo2";
				
				case 64:
					return "EnableDebugger2";
				
				case 65:
					return "ScriptLimits";
				
				case 66:
					return "SetTabIndex";
				
				case 69:
					return "FileAttributes";
				
				case 70:
					return "PlaceObject3";
				
				case 71:
					return "ImportAssets2";
				
				case 73:
					return "DefineFontAlignZones";
				
				case 74:
					return "CSMTextSettings";
				
				case 75:
					return "DefineFont3";
				
				case 76:
					return "SymbolClass";
				
				case 77:
					return "Metadata";
				
				case 78:
					return "DefineScalignGrid";
				
				case 82:
					return "DoABC";
				
				case 83:
					return "DefineShape4";
				
				case 84:
					return "DefineMorphShape2";
				
				case 86:
					return "DefineScene";
				
				case 87:
					return "DefineBinaryData";
				
				case 88:
					return "DefineFontName";
				
				case 89:
					return "StartSound2";
				
				case 90:
					return "DefineBitsJPEG4";
				
				case 91:
					return "DefineFont4";
				
				default :
					return "Unknown";
			}
		}
		
		static public function getClass(type:uint):Class
		{
			switch (type)
			{
				case SHOW_FRAME:
					return ShowFrame;
				
				case PLACE_OBJECT:
					return PlaceObject;
				case PLACE_OBJECT_2:
					return PlaceObject2;
				case PLACE_OBJECT_3:
					return PlaceObject3;
				
				case REMOVE_OBJECT:
					return RemoveObject;
				case REMOVE_OBJECT_2:
					return RemoveObject2;
				
				case DEFINE_SPRITE:
					return DefineSprite;
				case FRAME_LABEL:
					return FrameLabel;
				
				case DEFINE_SHAPE:
					return DefineShape;
				case DEFINE_SHAPE_2:
					return DefineShape2;
				case DEFINE_SHAPE_3:
					return DefineShape3;
				case DEFINE_SHAPE_4:
					return DefineShape4;
				
				case DO_ABC:
					return DoABC;
				case SYMBOL_CLASS:
					return SymbolClass;
				case FILE_ATTRIBUTES:
					return FileAttributes;
				case SET_BACKGROUND_COLOR:
					return SetBackgroundColor;
				case DEFINE_BINARY_DATA:
					return DefineBinaryData;
				
				case JPEG_TABLES:
					return Tag;
				case DEFINE_BITS:
					return DefineBits;
				case DEFINE_BITS_JPEG_2:
					return DefineBitsJPEG2;
				case DEFINE_BITS_JPEG_3:
					return DefineBitsJPEG3;
				case DEFINE_BITS_JPEG_4:
					return DefineBitsJPEG4;
				case DEFINE_BITS_LOSS_LESS:
					return DefineBitsLossless;
				case DEFINE_BITS_LOSS_LESS_2:
					return DefineBitsLossless2;
				
				case DEFINE_TEXT:
					return DefineText;
				case DEFINE_TEXT_2:
					return DefineText2;
				case DEFINE_EDIT_TEXT:
					return DefineEditText;
				
				case CSM_TEXT_SETTINGS:
					return CSMTextSettings;
				
				case DEFINE_FONT:
					return DefineFont;
				case DEFINE_FONT_INFO:
					return DefineFontInfo;
				case DEFINE_FONT_2:
					return DefineFont2;
				case DEFINE_FONT_INFO_2:
					return DefineFontInfo2;
				case DEFINE_FONT_ALIGN_ZONES:
					return DefineFontAlignZones;
				case DEFINE_FONT_3:
					return DefineFont3;
				case DEFINE_FONT_NAME:
					return DefineFontName;
				case DEFINE_FONT_4:
					return DefineFont4;
				
				case DEFINE_SCENE:
					return DefineScene;
				
				case DEFINE_SOUND:
					return DefineSound;
				case START_SOUND:
					return StartSound;
				case START_SOUND_2:
					return StartSound2;
				case SOUND_STREAM_HEAD:
					return SoundStreamHead;
				case SOUND_STREAM_HEAD_2:
					return SoundStreamHead2;
				case SOUND_STREAM_BLOCK:
					return SoundStreamBlock;
				
				case DEFINE_BUTTON_2:
					return DefineButton2;
				
				default:
					return Tag;
			}
		}
	}
	
}