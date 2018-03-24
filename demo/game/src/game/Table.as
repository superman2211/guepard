package game 
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import utils.Animation;
	import utils.Random;
	/**
	 * ...
	 * @author Sergey Antonov
	 */
	public class Table extends Sprite
	{
		private var _columns:int;
		private var _rows:int;
		private var _size:Number;
		
		private var _cells:Vector.<Vector.<Cell>>;
		private var _chance:Number;
		
		public function get columns():int 
		{
			return _columns;
		}
		
		public function get rows():int 
		{
			return _rows;
		}
		
		public override function get width():Number 
		{
			return _columns * _size;
		}
		
		public override function set width(value:Number):void 
		{
			
		}
		
		public override function get height():Number 
		{
			return _rows * _size;
		}
		
		public override function set height(value:Number):void 
		{
			
		}
		
		public function get chance():Number 
		{
			return _chance;
		}
		
		public function set chance(value:Number):void 
		{
			_chance = value;
		}
		
		public function get numCells():int
		{
			var num:int = 0;
			
			for (var ix:int = 0; ix < _columns; ix++) 
			{
				for (var iy:int = 0; iy < _rows; iy++) 
				{
					if (getCell(ix, iy))
					{
						num++;
					}
				}
			}
			
			return num;
		}
		
		public function Table(columns:int, rows:int, size:Number, chance:Number) 
		{
			_chance = chance;
			_size = size;
			_rows = rows;
			_columns = columns;
			
			_cells = new Vector.<Vector.<Cell>>(_columns);
			
			for (var ix:int = 0; ix < _columns; ix++) 
			{
				_cells[ix] = new Vector.<Cell>(_rows);
			}
			
			updateLayout();
		}
		
		public function setCell(column:int, row:int, cell:Cell):void
		{
			if (column < _columns && column >= 0 && row < _rows && row >= 0)
			{
				_cells[column][row] = cell;
			}
		}
		
		public function getCell(column:int, row:int):Cell
		{
			if (column < _columns && column >= 0 && row < _rows && row >= 0)
			{
				return _cells[column][row];
			}
			else
			{
				return null;
			}
		}
		
		public function getCellsByType(type:int):Vector.<Cell>
		{
			var cells:Vector.<Cell> = new Vector.<Cell>();
			
			for (var ix:int = 0; ix < _columns; ix++) 
			{
				for (var iy:int = 0; iy < _rows; iy++) 
				{
					var cell:Cell = getCell(ix, iy);
					
					if (cell && cell.type == type)
					{
						cells.push(cell);
					}
				}
			}
			
			return cells;
		}
		
		public function updateLayout(completeHandler:Function = null):void 
		{
			draw();
			
			for (var ix:int = 0; ix < _columns; ix++) 
			{
				for (var iy:int = 0; iy < _rows; iy++) 
				{
					var cell:Cell = getCell(ix, iy);
					
					if (cell)
					{
						/*Animation.stopByObject(cell);
						Animation.animate(cell, "x", ix * _size, 20, Animation.FADE_IN_CUBE);
						Animation.animate(cell, "y", iy * _size, 20, Animation.FADE_IN_CUBE);//*/
						
						cell.x = ix * _size;
						cell.fall(iy * _size, Random.randomInt(0, 10));
					}
				}
			}
			
			if (completeHandler != null)
			{
				Animation.animate(this, "alpha", 1, 20, Animation.LINEAR, 0, completeHandler);
			}
		}
		
		private function draw():void 
		{
			/*graphics.clear();
			
			for (var ix:int = 0; ix < _columns; ix++) 
			{
				for (var iy:int = 0; iy < _rows; iy++) 
				{
					graphics.lineStyle(1, 0x000000);
					graphics.drawRect(ix * _size, iy * _size, _size, _size);
				}
			}//*/
		}
		
		public function generateCellsByType(number:int, type:int):void 
		{	
			while (number)
			{
				var ix:int = Random.randomInt(1, _columns - 2);
				var iy:int = Random.randomInt(1, _rows - 4);
				
				if(!getCell(ix, iy))
				{
					var cell:Cell = new Cell(ix, iy, type, _size);
					cell.x = ix * _size;
					cell.y = - height * 2 + iy * _size;
					addCell(cell); 
					
					number--;
				}
			}
		}
		
		public function generate(first:Boolean = false):void 
		{
			for (var ix:int = 0; ix < _columns; ix++) 
			{
				for (var iy:int = 0; iy < _rows; iy++) 
				{
					if (!getCell(ix, iy))
					{
						var cell:Cell = new Cell(ix, iy, Random.randomInt(0, 3), _size);
						cell.x = ix * _size;
						
						if (first)
						{
							cell.y = - height * 2 + iy * _size;
						}
						else
						{
							cell.y = - _size * 2;
						}
						
						addCell(cell); 
					}
				}
			}
		}
		
		public function getRandomCell():Cell
		{
			return _cells[Random.randomInt(0, _columns - 1)][Random.randomInt(0, _rows - 1)];
		}
		
		private function addCell(cell:Cell):void 
		{
			/*if (cell.type > 0) */cell.addEventListener(MouseEvent.CLICK, cellClick);
			
			setCell(cell.column, cell.row, cell);
			
			addChild(cell);
		}
		
		private function removeCell(cell:Cell):void 
		{
			/*if (cell.type > 0) */cell.removeEventListener(MouseEvent.CLICK, cellClick);
			
			setCell(cell.column, cell.row, null);
			
			//removeChild(cell);
			
			setChildIndex(cell, numChildren - 1);
			
			Animation.stopByObject(cell);
			Animation.animate(cell, "x", width, 10, Animation.FADE_OUT_SQUARE, 0, removeCellComplete);
			Animation.animate(cell, "y", height, 10, Animation.FADE_OUT_SQUARE);
		}
		
		private function removeCellComplete(a:Animation):void 
		{
			var cell:Cell = Cell(a.object);
			removeChild(cell);
		}
		
		private function removeCells(cells:Vector.<Cell>):void 
		{
			for each(var cell:Cell in cells)
			{
				removeCell(cell);
			}
		}
		
		private function cellClick(e:MouseEvent):void 
		{
			var cell:Cell = Cell(e.currentTarget);
			
			var cells:Vector.<Cell> = new Vector.<Cell>();
			cells.push(cell);
			
			getNearCells(cell, cells);
			
			if (cells.length > 2)
			{
				removeCells(cells);
				fallCells();
				generate();
				updateLayout();
			}
		}
		
		private function fallCellsComplete(a:Animation):void 
		{
			//removeKeys();
			fallCells();
			
			/*if (numCells < _rows * _columns && getCellsByType(0).length < 3)
			{
				generateCellsByType(1, 0);
			}//*/
			
			generate();
			updateLayout();
		}
		
		private function removeKeys():void 
		{
			for (var ix:int = 0; ix < _columns; ix++) 
			{
				var cell:Cell = getCell(ix, _rows - 1);
				
				if (cell && cell.type == 0)
				{
					removeCell(cell);
				}
			}
		}
		
		private function getNearCells(cell:Cell, cells:Vector.<Cell>):void 
		{
			addNearCell(cell.column,     cell.row - 1, cell.type, cells);
			addNearCell(cell.column,     cell.row + 1, cell.type, cells);
			
			addNearCell(cell.column - 1, cell.row,     cell.type, cells);
			addNearCell(cell.column + 1, cell.row,     cell.type, cells);
		}
		
		private function addNearCell(column:int, row:int, type:int, cells:Vector.<Cell>):void 
		{
			var cell:Cell = getCell(column, row);
			
			if (cell && cell.type == type && cells.indexOf(cell) == -1)
			{
				cells.push(cell);
				getNearCells(cell, cells);
			}
		}
		
		private function fallCells():void 
		{
			for (var ix:int = 0; ix < _columns; ix++) 
			{
				for (var iy:int = _rows - 1; iy >= 0; iy--) 
				{
					if (!getCell(ix, iy))
					{
						var cell:Cell = getUpCell(ix, iy - 1);
						
						if (cell)
						{
							changeCell(cell, ix, iy);
						}
					}
				}
			}
		}
		
		private function changeCell(cell:Cell, column:int, row:int):void 
		{
			setCell(cell.column, cell.row, null);
			
			cell.column = column;
			cell.row = row;
			
			setCell(column, row, cell);
		}
		
		private function getUpCell(column:int, row:int):Cell
		{
			for (var iy:int = row; iy >= 0; iy--) 
			{
				var cell:Cell = getCell(column, iy);
				
				if (cell) return cell;
			}
			
			return null;
		}
	}
}