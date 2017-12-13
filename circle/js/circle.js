//very similar to waves textures, just changing the shape: poligon instead of line

var width, height, center;
var points = 15;
var repeat = 80;
var delta = 10;
var strokeColor = '#d6aa5e';
strokeWidth = 2;
var paths = [];

initializePath();


function initializePath() {
    center = view.center;
    width = view.size.width;
    height = view.size.height / 2;
    var path = new Path.RegularPolygon({
                    center: center,
                    sides: 20,
                    radius: 120
                })

    path.strokeColor = strokeColor;
    path.strokeWidth = strokeWidth;
    paths.push(path);
    repeatPaths()
}


function repeatPaths(){
    for(var i=0; i<repeat; i++){
        newPath = paths[paths.length-1].clone();
        
        for (var h = 0; h < newPath.segments.length; h ++) {
            newPath.segments[h].point.y += Math.random()*delta
            newPath.segments[h].point.x += Math.random()*delta-Math.random()*delta
            newPath.scale(1.001)
        }

        paths.push(newPath);       
    }
}





function scaleNum(oldValue,oldMax,oldMin,newMax,newMin){
    oldRange = oldMax - oldMin
    newRange = newMax - newMin

    newValue = ((oldValue - oldMin) * newRange / oldRange) + newMin
    return newValue;
}

// Move the active layer to the center of the view:
project.activeLayer.position = view.center;