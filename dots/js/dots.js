
//var raster = new Raster(url); //also possible to upload image
var raster = new Raster('image3'); // take the image with ID #image from the DOM 
//other images: image0,image1,image2,image3,image4
raster.position = view.center; // Move the raster to the center of the view
raster.visible = false; // Hide the raster

var elementNum = 40;
var gridSize = 25; // The size of our grid cells:
var spacing = 1;
var clr = '#000'; //'#d6aa5e';

//size of elements min/max
var maxSize = gridSize/1.5; //gridSize/2 is the available space: control how circles overlap each others
var minSize = 5;

paths = [];



// As the web is asynchronous, we need to wait for the raster to load before we can perform any operation on its pixels.
raster.on('load', function() {
    // The size of the image will be also the number of elements we are going to draw
    raster.size = new Size(elementNum, elementNum);

    for (var y = 0; y < raster.height; y++) {
        for(var x = 0; x < raster.width; x++) {
            // Get the color of the pixel:
            var color = raster.getPixel(x, y);

            var path = new Path.Circle({
                center: new Point(x, y) * gridSize,
                radius: scaleNum(color.brightness,1,0,minSize, maxSize),
                fillColor: clr
            })
            path.origClr = color;
            paths.push(path);
        }
    }
    raster.remove()
    project.activeLayer.position = view.center;
});


function scaleNum(oldValue,oldMax,oldMin,newMax,newMin){
    oldRange = oldMax - oldMin
    newRange = newMax - newMin

    newValue = ((oldValue - oldMin) * newRange / oldRange) + newMin
    return newValue;
}

// Move the active layer to the center of the view:
project.activeLayer.position = view.center;   