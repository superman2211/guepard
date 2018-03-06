package com.guepard.decompiler.data
{
	import com.guepard.decompiler.tags.DefineShape;
	import com.guepard.decompiler.tags.DefineSprite;
	import com.guepard.decompiler.tags.PlaceObject;
	
	/**
	 * ...
	 * @author Antonov Sergey
	 */
	public class TagList
	{
		private var _tags:Vector.<Tag>;
		
		public function get numTags():int
		{
			return _tags.length;
		}
		
		public function TagList()
		{
			_tags = new Vector.<Tag>();
		}
		
		public function dispose():void
		{
			if (_tags)
			{
				for each(var tag:Tag in _tags)
				{
					tag.dispose();
				}
				
				_tags = null;
			}
		}
		
		public function getTagAt(index:int):Tag
		{
			if (index >= 0 && index < _tags.length)
			{
				return _tags[index];
			}
			else
			{
				return null;
			}
		}
		
		public function getFirstTagByTypes(types:Array):Tag
		{
			for each (var tag:Tag in _tags)
			{
				if (types.indexOf(tag.type) != -1)
				{
					return tag;
				}
			}
			
			return null;
		}
		
		public function getTagsByTypes(types:Array, recursive:Boolean = false):Vector.<Tag>
		{
			var list:Vector.<Tag> = new Vector.<Tag>();
			
			for each (var tag:Tag in _tags)
			{
				if (types.indexOf(tag.type) != -1)
				{
					list.push(tag);
				}
				
				if (recursive && tag is DefineSprite)
				{
					var tags:Vector.<Tag> = DefineSprite(tag).tags.getTagsByTypes(types, recursive);
					
					list.concat(tags);
				}
			}
			
			return list;
		}
		
		public function getTagIndex(tag:Tag):int
		{
			return _tags.indexOf(tag);
		}
		
		public function getTagIndexByType(type:uint):int
		{
			var tags:Vector.<Tag> = getTagsByTypes([type]);
			
			if (tags.length)
			{
				return _tags.indexOf(tags[0]);
			}
			else
			{
				return -1;
			}
		}
		
		public function getFirstTagIndexByType(type:int):int
		{
			for (var i:int = 0; i < _tags.length; i++)
			{
				if (_tags[i].type == type)
				{
					return i;
				}
			}
			
			return -1;
		}
		
		public function getNextHightestDepth():uint
		{
			var tags:Vector.<Tag> = getTagsByTypes([TagType.PLACE_OBJECT, TagType.PLACE_OBJECT_2, TagType.PLACE_OBJECT_3]);
			
			var depth:uint = 0;
			
			for each(var tag:Tag in tags)
			{
				if (tag is PlaceObject)
				{
					var place:PlaceObject = PlaceObject(tag);
					
					if (depth < place.depth)
					{
						depth = place.depth;
					}
				}
			}
			
			depth++;
			
			return depth;
		}
		
		public function getNextFreeSpriteId():uint
		{
			var tags:Vector.<Tag> = getTagsByTypes([TagType.DEFINE_SPRITE]);
			
			var id:uint = 0;
			
			for each(var tag:DefineSprite in tags)
			{
				if (id < tag.id)
				{
					id = tag.id;
				}
			}
			
			id++;
			
			return id;
		}
		
		public function containsTag(tag:Tag):Boolean
		{
			return _tags.indexOf(tag) != -1;
		}
		
		public function addTag(tag:Tag):void
		{
			_tags.push(tag);
		}
		
		public function addTagAt(tag:Tag, index:int):void
		{
			if (index >= 0 && index <= _tags.length)
			{
				_tags.splice(index, 0, tag);
			}
		}
		
		public function addTagsAt(tags:Vector.<Tag>, index:int):void
		{
			if (index >= 0 && index <= _tags.length)
			{
				for each(var tag:Tag in tags)
				{
					_tags.splice(index, 0, tag);
					
					index++;
				}
			}
		}
		
		public function removeTag(tag:Tag):void
		{
			var index:int = _tags.indexOf(tag);
			
			if (index != -1)
			{
				_tags.splice(index, 1);
			}
		}
		
		public function setTagAt(tag:Tag, index:int):void
		{
			if (index >= 0 && index < _tags.length)
			{
				_tags[index] = tag;
			}
		}
		
		public function correctTags(parameters:CorrectParameters):void
		{
			for each (var tag:Tag in _tags)
			{
				var tagParameters:CorrectParameters = parameters.clone();
				
				if (tagParameters.stage)
				{
					tagParameters.stage = !(tag is DefineSprite || tag is DefineShape);
				}
				
				tag.correct(tagParameters);
			}
		}
		
		public function getIdByDepth(place:PlaceObject):int
		{
			var i:int = _tags.indexOf(place);
			
			if (i == -1)
			{
				trace("tag index not found");
			}
			
			while (i-- > 0)
			{
				var tag:Tag = _tags[i];
				
				if (tag is PlaceObject && tag.id != -1 && PlaceObject(tag).depth == place.depth)
				{
					return tag.id;
				}
			}
			
			trace("id not found", place.depth);
			
			return -1;
		}
	}
	
}