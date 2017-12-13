var width, height, center;
var compSize = 25;
var crossSize = 10;
var strokeClr = '#000';
var strokeWidth = 1;
var forces = 4; //how many force point

var paths = [];

//create the cross 
var frm = new Point(0, crossSize/2);
var to = new Point(crossSize, crossSize/2);
var path1 = new Path.Line(frm, to);
path1.strokeColor = strokeClr;
path1.strokeWidth = strokeWidth;
var frm = new Point(crossSize/2, 0);
var to = new Point(crossSize/2, crossSize);
var path2 = new Path.Line(frm, to);
path2.strokeColor = strokeClr;
path2.strokeWidth = strokeWidth;

var g = new Group();
g.addChild(path1);
g.addChild(path2);

// Create a symbol definition from the path:
var crossSymbol = new SymbolDefinition(g);



placeElements();

function placeElements() {
    for (var y = 0; y < compSize; y++) {
        for(var x = 0; x < compSize; x++) {
            var p = Path.Circle(new Point(x, y) * compSize, 2);
            paths.push(p)
        }
    }  

    for (var k = 0; k < forces; k++) { //for each force point move all the elements
        move()
    }

    placeSymbol(crossSymbol)
}

function move(){
    var force = Point.random() * view.size;
    //debug
    //c = new Path.Circle(force, 15)
    //c.fillColor = '#FF0000'
    for (var i = 0; i < paths.length; i++) {
        var vector = paths[i].position-force;
        paths[i].position += vector*2/vector.length*8;
    }
    
}

function placeSymbol(s){
    for (var i = 0; i < paths.length; i++) {
        var symbol = s.place();
        symbol.position = paths[i].position;
        paths[i].remove()
    }
}



// Move the composition to the center of the view:
project.activeLayer.position = view.center;  