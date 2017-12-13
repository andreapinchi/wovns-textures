var width, height, center;
var elNum = 40; //elements
var spacing = 10;
// var crossSize = 5;
// var strokeClr = '#000';//'#d6aa5e';
// var strokeWidth = 1;
var strength = .35; //.35
var paths = [];
var n;
var p1;
var p2;

var paths = [];

//create the cross 
// var frm = new Point(0, crossSize/2);
// var to = new Point(crossSize, crossSize/2);
// var path1 = new Path.Line(frm, to);
// path1.strokeColor = strokeClr;
// path1.strokeWidth = strokeWidth;
// var frm = new Point(crossSize/2, 0);
// var to = new Point(crossSize/2, crossSize);
// var path2 = new Path.Line(frm, to);
// path2.strokeColor = strokeClr;
// path2.strokeWidth = strokeWidth;

// var g = new Group();
// g.addChild(path1);
// g.addChild(path2);
var circ = new Path.Circle(new Point(0,0),2)
circ.fillColor = '#000'

// Create a symbol definition from the path:
var circSymbol = new SymbolDefinition(circ);

var debugP1;
var debugP2;
var debugPath;

placeElements();

function placeElements() {
    for (var y = 0; y < elNum; y++) {
        for(var x = 0; x < elNum; x++) {
            
            
            var sy = circSymbol.place();
            sy.position = new Point(x, y) * spacing

            sy.destination = sy.position;
            paths.push(sy)
        }
    }
    project.activeLayer.position = view.center;
    for (var i = 0; i < paths.length; i++) {
        var vector = paths[i].destination = paths[i].position;
    }
}

function move(){
    v = p2-p1;
    for (var i = 0; i < paths.length; i++) {
        var vectorRelativeStart = paths[i].position-p1;
        var vectorRelativeEnd = paths[i].position-p2;

        paths[i].destination = paths[i].position + (vectorRelativeStart.length-vectorRelativeEnd.length)*strength;
        
    }
    debugPath.remove()
    //project.activeLayer.position = view.center;
}


function onMouseDown(event) {
    p1 = event.point;
    debugPath = new Path.Line(p1,p1);
    debugPath.selected = true
}

function onMouseDrag(event) {
    debugPath.segments[1].point = event.point;
}

function onMouseUp(event) {
    debugPath.segments[1].point = event.point;
    p2 = event.point;
    move();
}

function onFrame(event) {
    if(paths.length > 0){
        for (var i = 0; i < paths.length; i++) {
            var vector = paths[i].destination - paths[i].position;
            paths[i].position += vector / 10;
        }
    }
}


// Move the composition to the center of the view:
//project.activeLayer.position = view.center; 



