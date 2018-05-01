package
{
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.system.Capabilities;
	import flash.text.TextField;
	import flash.text.TextFormat;
	
	public class Main extends Sprite
	{
		private var output:TextField;
		
		public function Main()
		{
//			stage.scaleMode = StageScaleMode.NO_SCALE;
//			stage.align = StageAlign.TOP_LEFT;
			stage.addEventListener(Event.RESIZE, resize);
			
			output = new TextField();
			output.defaultTextFormat = new TextFormat("arial", 15);
			addChild(output);
			
			var employees:XML =
					<employees>
						<employee ssn="123-123-1234">
							<name first="John" last="Doe"/>
							<address>
								<street>11 Main St.</street>
								<city>San Francisco</city>
								<state>CA</state>
								<zip>98765</zip>
							</address>
						</employee>
						<employee ssn="789-789-7890">
							<name first="Mary" last="Roe"/>
							<address>
								<street>99 Broad St.</street>
								<city>Newton</city>
								<state>MA</state>
								<zip>01234</zip>
							</address>
						</employee>
					</employees>;
			
			log(1, String(employees.employee[0].address.zip));
			// 98765
			
			log(2, String(employees.employee[1].@ssn));
			// 789-789-7890
			
			log(3, String(employees..zip[0]));
			// 98765
			
			log(4, String(employees..@ssn[1]));
			// 789-789-7890
			
			log(5, String(employees..name));
			// <name first="John" last="Doe"/>
			// <name first="Mary" last="Roe"/>
			
			log(6, String(employees.employee[0].address.*));
			// <street>11 Main St.</street>
	        // <city>San Francisco</city>
	        // <state>CA</state>
	        // <zip>98765</zip>
			
			var attribute:String = "ssn";
			log(7, String(employees.employee[1].@[attribute]));
			// 789-789-7890
			
			var ssnList:XMLList = employees..@ssn;
			
			for  (var i = 0; i < ssnList.length(); i++)
			{
				var num:XML = ssnList[i];
				log(8, String(num));
				// 123-123-1234
				// 789-789-7890
			}
			
			var ssnToFind:String = "789-789-7890";
			log(9, employees.employee.(@ssn == ssnToFind).toXMLString());
			// <employee ssn="789-789-7890">
			// <name first="Mary" last="Roe"/>
			// <address>
			// <street>99 Broad St.</street>
			// <city>Newton</city>
			// <state>MA</state>
			// <zip>01234</zip>
			// </address>
			// </employee>
			
			resize();
		}
		
		private function log(...args):void
		{
			output.appendText(args.join(", ") + "\n");
		}
		
		private function resize(event:Event = null):void
		{
			output.width = stage.stageWidth;
			output.height = stage.stageHeight;
		}
	}
}
