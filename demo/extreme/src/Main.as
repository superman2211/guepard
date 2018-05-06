package {

import flash.display.Sprite;
import flash.text.TextField;

public class Main extends Sprite {
    public function Main() {
        var textField = new TextField()
        textField.text = "Hello, World"
        addChild(textField)
        
        // easy type resolving
        var integerNumber = 1
        var floatNumber = 3.1415
        var text = "test"
        var booleanValue = true
        
	    // hard type resolving
        var transformObject = transform
        var matrix = transformObject.matrix;
        var a = matrix.a
        
        var compareValues = integerNumber > 1 && floatNumber < 1
        var numberValue = integerNumber / floatNumber;
        var stringValue = integerNumber * floatNumber + text;
        
        var summValue = summ(1, 2, 3);
        
	    log(compareValues);
	    log(numberValue);
	    log(stringValue);
	    log(summValue);
    }
    
    function log(object)
    {
        var output = getChildAt(0)
        
        output.appendText("\n" + object)
    }
    
    function summ(a, b, c)
    {
        var aa:Number = a
        var bb = b + 1;
        var cc = c * c
        return aa + bb + cc
    }
}
}
