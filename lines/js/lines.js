
var raster = new Raster('image0'); // take the image with ID #image from the DOM 
//other images: image0,image1,image2,image3,image4
raster.position = view.center; // Move the raster to the center of the view
raster.visible = false; // Hide the raster 

var elementNum = 40; //how many elements
var lineLength = 3;
var gridSize = 20; // The size of our grid cells
var horizontal = true; //horizontal or vertical?
var alpha = .5; //elements opacity
var strokeWidth = 2;
var clrs = ['#d6aa5e', '#f0d8ad','#badbd3']; //colors used in the comp from darkest to lightest //['#d6aa5e', '#f0d8ad','#f7ead7']
//MINT: #badbd3
//LILY: #d6bee0
var tresholds = [.35, .55, .80]; //depends a lot on the image loaded, better with images with high contrast


var paths = [];



// Wait for the raster to load
raster.on('load', function() {
    // The size of the image will be also the number of elements we are going to draw
    raster.size = new Size(elementNum, elementNum); //resize the raster: the image is always converted into square

    for (var y = 0; y < raster.height; y++) {
        for(var x = 0; x < raster.width; x++) {
            // Get the color of the pixel:
            var color = raster.getPixel(x, y);
            if (color.brightness < tresholds[2]) { //ignore too bright colors to leave empty spaces
                clr = clrs[2];
                if(color.brightness < tresholds[1])  clr = clrs[1];
                if(color.brightness < tresholds[0])  clr = clrs[0];

                from = new Point(x, y)*gridSize
                to = new Point(x, y+lineLength)*gridSize
                //TODO lineLenght could be proportional using the brightness
                var path = new Path.Line(from, to)
                
                path.strokeColor = clr;
                path.strokeWidth = strokeWidth
                path.origClr = color; //store the original color inside the Path object
                path.opacity = alpha;
                if(horizontal)  path.rotate(90);
                paths.push(path);
            }                   
        }
    }
    raster.remove() //remove image or it appears inside the SVG

    // Move the active layer to the center of the view, so all 
    // the created paths in it appear centered.
    project.activeLayer.position = view.center
});