var TreeType = {
    LOW: 0,
    MED: 1,
    HIGH: 2
};
Object.freeze(TreeType);

var app = app || {};
"use strict";

var main = function() {
window.onload = init;
var canvas;
var topCanvas;
var topCtx;
var ctx;
var audio;
var trees = new Array();
var treeTypes = new Array();
var numTreesInGroup = 3; //There are 3 groups of trees, so with numTreesInGroup = 2, the total number of trees is 6
var furthestDistanceFromCenter = 150; //distance from the center of the tree group, in pixels
var distanceFromCenter = 0;
var angle = 0;
var aad;
var mousePos;
var timeAtMouseDown;
var dummyTree;
var dummyTreeType;
var treeGrowthSpeed = 150;
var maxBranchAngle;
var isFrequency = true;
var doDrawSun;
var sunHeight;
var sunX;
var doDrawSky;
var groundColor;
var doDrawGround;
var doDrawGroundWaveform; //not implemented
var doDrawHills;
var hillColor1, hillColor2, hillColor3;
var doDrawText = true;
var doInvert = false;

//brushes
var lowTreeBrush = true;
var medTreeBrush = false;
var highTreeBrush = false;

//global colors
var gRED, gORANGE, gYELLOW, gGREEN, gBLUE, gINDIGO, gVIOLET, gPINK, sunColor; 

//event toggles
var mouseDown = false;
var mouseMove = false;

//Initializes all of the data necessary for the program
function init() {
    canvas = document.querySelector("#drawCanvas");
    ctx = canvas.getContext("2d");
    topCanvas = document.querySelector("#topCanvas");
    topCtx = topCanvas.getContext("2d");

    //resize the height and width of the canvas
    drawResize = new app.Resize(canvas);
    topResize = new app.Resize(topCanvas);
    drawResize.resizeWidth(canvas);
    drawResize.resizeHeight(canvas);
    topResize.resizeWidth(topCanvas);
    topResize.resizeHeight(topCanvas);

    audio = new app.AudioManager();

    proColor.init();

    calcGlobalColors();

    groundColor = proColor.darkest(ColorRange.ORANGE);
    hillColor1 = proColor.darkest(ColorRange.GREEN);
    hillColor2 = proColor.darkest(ColorRange.GREEN);
    hillColor3 = proColor.darkest(ColorRange.GREEN);

    document.querySelector("#waveformDataType").addEventListener("click", changeDataType);
    document.querySelector("#frequencyDataType").addEventListener("click", changeDataType);
    document.querySelector("#lowTreeBrush").addEventListener("click", changeBrush);
    document.querySelector("#medTreeBrush").addEventListener("click", changeBrush);
    document.querySelector("#highTreeBrush").addEventListener("click", changeBrush);

    draw();
}

//Deprecated
function constructCircularTrees() {
    for (var i = 0; i < numTreesInGroup * 3; i++) {
        if (i % 3 == 0) {
            trees[i] = new app.Tree(canvas, 0, 0, proColor.colorFromRange(ColorRange.INDIGO), 120);
            treeTypes[i] = TreeType.LOW;
        } else if (i % 3 == 1) {
            trees[i] = new app.Tree(canvas, 0, 0, proColor.colorFromRange(ColorRange.PINK), 90);
            treeTypes[i] = TreeType.MED;
        } else {
            trees[i] = new app.Tree(canvas, 0, 0, proColor.colorFromRange(ColorRange.ORANGE), 60);
            treeTypes[i] = TreeType.HIGH;
        } 
    }
}

//Deprecated
function drawCircularTrees() {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    for (var i = 0; i < trees.length; i++) {
        ctx.save();
        ctx.rotate(i * ( (Math.PI * 2)/ (numTreesInGroup * 3) ) );
        ctx.translate(0, -1 * distanceFromCenter);
        trees[i].draw();
        ctx.restore();
    }
}

//Deprecated
function updateCircularTrees(audioData) {
    var aad = averageAudioData(audioData);

    //set the visual values that change based on audio
    distanceFromCenter = map_range(aad.average, 0, 256, 0, furthestDistanceFromCenter);
    
    for (var i = 0; i < numTreesInGroup * 3; i++) {
        if (i % 3 == 0) {
            trees[i].setAngle(map_range(aad.lowAverage, 0, 256, 0, Math.PI / 2));
        } else if (i % 3 == 1) {
            trees[i].setAngle(map_range(aad.medAverage, 0, 256, 0, Math.PI / 2));
        } else {
            trees[i].setAngle(map_range(aad.highAverage, 0, 256, 0, Math.PI / 2));
        }
    }
}

//Constructs a new tree on the floor of the canvas and adds it to the list of trees
function plantTree(x, y) {
    var index = trees.length;

    if (lowTreeBrush) {
        trees[index] = new app.Tree(canvas, x, y, proColor.colorFromRange(ColorRange.ORANGE), 120);
        treeTypes[index] = TreeType.LOW;
    } else if (medTreeBrush) {
        trees[index] = new app.Tree(canvas, x, y, proColor.colorFromRange(ColorRange.BLUE), 90);
        treeTypes[index] = TreeType.MED;
    } else if (highTreeBrush) {
        trees[index] = new app.Tree(canvas, x, y, proColor.colorFromRange(ColorRange.PINK), 60);
        treeTypes[index] = TreeType.HIGH;
    }
}

//Updates the thetas of the planted trees
function updatePlantedTrees(audioData) {
    //iterate through the trees and adjust their angles based on tiers of audio
    for (var i = 0; i < trees.length; i++) {
        if (treeTypes[i] == TreeType.LOW) {
            trees[i].setAngle(map_range(aad.lowAverage, 0, 256, 0, maxBranchAngle));
        } else if (treeTypes[i] == TreeType.MED) {
            trees[i].setAngle(map_range(aad.medAverage, 0, 256, 0, maxBranchAngle));
        } else if (treeTypes[i] == TreeType.HIGH) {
            trees[i].setAngle(map_range(aad.highAverage, 0, 256, 0, maxBranchAngle));
        }
    }
}

//Draws the planted trees
function drawPlantedTrees() {
    for (var i = 0; i < trees.length; i++) {
        trees[i].draw();
    }
}

//Calls all of the tree type's draw calls
function drawTrees() {
    ctx.save();
    if (doDrawGround) {
        ctx.translate(0, -25);
    }

    drawPlantedTrees();

    ctx.restore();
}

//Updates the audio data
function updateAudio() {
    //get the newest data from the audio source
    audio.update(isFrequency);
    var data = audio.getData();

    //audio.setDelay(document.querySelector("#delaySlider").value);

    calcAverageAudioData(data);

    updatePlantedTrees(data);
}

//retrieves the values from the html form and assigns them to variables
function updateFormValues() {
    treeGrowthSpeed = document.querySelector("#growthSpeedSlider").value;
    maxBranchAngle = map_range(document.querySelector("#branchAngleSlider").value, 0, 100, 0, Math.PI / 2);
    if (!doDrawSun) {
        sunColor = proColor.lightest(ColorRange.YELLOW);
    }
    //doDrawSun = document.querySelector("#sunCheckbox").checked;
    //var sunHeightSliderValue = document.querySelector("#sunHeightSlider").value;
    //sunHeight = map_range(sunHeightSliderValue, 0, 100, canvas.height, 50);
    //sunX = map_range(sunHeightSliderValue * sunHeightSliderValue, 0, 10000, canvas.width - 50, canvas.width / 2);
    //doDrawSky = document.querySelector("#skyCheckbox").checked;
    //doDrawGround = document.querySelector("#groundCheckbox").checked;
    //doDrawHills = document.querySelector("#hillsCheckbox").checked;
    //doInvert = document.querySelector("#inverseCheckbox").checked;
}

//Called once every frame, draws the canvas
function draw() {
    requestAnimationFrame(draw);

    updateAudio();
    updateFormValues();
    clear(ctx);
    if (doDrawSky) {
        drawSky();
    }
    if (doDrawSun) {
        drawSun();
    }
    if (doDrawHills) {
        drawHills();
    }
    if (doDrawGround) {
        drawGround();
    }
    if (doDrawText) {
        drawText();
    }
    drawTrees();
    if (mouseDown) {
        drawTopCanvas();
    }
    if (doInvert) {
        imageInverse();
    }
}

//draws the tree to the top canvas taht will be cleared on mouse release
function drawTempTree(x, y) {
    topCtx.save();
    if (doDrawGround) {
        topCtx.translate(0, -25);
    }

    dummyTree;
    var timeDifference = performance.now() - timeAtMouseDown;
    var treeHeight = 20 + timeDifference / (150 - treeGrowthSpeed);

    //every half of a second, the tree changes frequency range, until it gets to the lowest range
    if (highTreeBrush) {
        dummyTree = new app.Tree(topCanvas, x, y, gPINK, treeHeight);
        dummyTree.setAngle(map_range(aad.highAverage, 0, 256, 0, maxBranchAngle));
        dummyTreeType = TreeType.HIGH;
    } else if (medTreeBrush) {
        dummyTree = new app.Tree(topCanvas, x, y, gBLUE, treeHeight);
        dummyTree.setAngle(map_range(aad.medAverage, 0, 256, 0, maxBranchAngle));
        dummyTreeType = TreeType.MED;
    } else if (lowTreeBrush) {
        dummyTree = new app.Tree(topCanvas, x, y, gORANGE, treeHeight);
        dummyTree.setAngle(map_range(aad.lowAverage, 0, 256, 0, maxBranchAngle));
        dummyTreeType = TreeType.LOW;
    }

    dummyTree.draw();

    topCtx.restore();
}

//draws the top canvas
function drawTopCanvas() {
    clear(topCtx);

    drawTempTree(mousePos.x, topCanvas.height);
}

//draws the starting text
function drawText() {
    ctx.save();

    ctx.shadowColor = "#AAAAAA";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 15;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillStyle = gBLUE;
    ctx.font = "40pt fira_sansregular"
    ctx.fillText("Hold down mouse for a tree, scroll down for options", canvas.width / 2, canvas.height / 2);

    ctx.restore();
}

//draws the sun at a dynamic position
function drawSun() {
    ctx.save();

    ctx.fillStyle = sunColor;
    ctx.beginPath();
    ctx.arc(sunX, sunHeight, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

//draws the sky according to the suns positions
function drawSky() {
    ctx.save();
    var fillStyle = "blue";

    if (sunHeight > 0) {
        var sunHeightMapped = map_range(sunHeight, canvas.height, 50, 1, 0);
        var myGradient = ctx.createLinearGradient(canvas.width / 2, 0, canvas.width / 2, canvas.height);
        myGradient.addColorStop(0, "black");
        myGradient.addColorStop(Math.max(sunHeightMapped - 0.4, 0), "black");
        myGradient.addColorStop(Math.max(sunHeightMapped - 0.3, 0), "#a40000");
        myGradient.addColorStop(Math.max(sunHeightMapped - 0.2, 0), "red");
        myGradient.addColorStop(Math.max(sunHeightMapped - 0.1, 0), "orange");
        myGradient.addColorStop(sunHeightMapped, "yellow");
        myGradient.addColorStop(sunHeightMapped, "#77B1AB");
        myGradient.addColorStop(1, "#77B1AB"); 
        fillStyle = myGradient;
    }

    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.restore();
}

//draws the ground
function drawGround() {
    ctx.save();

    ctx.fillStyle = groundColor;
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

    ctx.restore();
}

//draws the bezier hills
function drawHills() {
    ctx.save();
    if (doDrawGround) {
        ctx.translate(0, -25);
    }

    //draw middle hill
    ctx.beginPath();
    ctx.fillStyle = hillColor1;
    ctx.moveTo( (canvas.width / 3) - 50, canvas.height);
    ctx.bezierCurveTo(canvas.width / 6, (canvas.height / 3) * 2, (canvas.width / 12) * 7, canvas.height / 2, (canvas.width / 3) * 2 + 50, canvas.height);
    ctx.closePath();
    ctx.fill();

    //draw left hill
    ctx.beginPath();
    ctx.fillStyle = hillColor2;
    ctx.moveTo(-50, canvas.height);
    ctx.quadraticCurveTo( canvas.width / 4, (canvas.height / 3) * 2, canvas.width / 2, canvas.height);
    ctx.closePath();
    ctx.fill();

    //draw right hill
    ctx.beginPath();
    ctx.fillStyle = hillColor3;
    ctx.moveTo((canvas.width / 2) - 75, canvas.height);
    ctx.quadraticCurveTo( (canvas.width / 4) * 3, (canvas.height / 3) * 2 + 20, canvas.width + 50, canvas.height);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}

//Gets the image data of the bottom and top canvas's, and inverts it
function imageInverse() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var data = imageData.data;
	var length = data.length;
	var width = imageData.width;

    var topImageData = topCtx.getImageData(0, 0, topCanvas.width, topCanvas.height);

    var topData = topImageData.data;
	var topLength = topData.length;
	var topWidth = topImageData.width;


    for (var i = 0; i < length; i += 4) {
        var red = data[i], green = data[i + 1], blue = data[i + 2];

		data[i] = 255 - red;
		data[i + 1] = 255 - green;
		data[i + 2] = 255 - blue;
    }
    for (var i = 0; i < topLength; i += 4) {
        var red = topData[i], green = topData[i + 1], blue = topData[i + 2];

		topData[i] = 255 - red;
		topData[i + 1] = 255 - green;
		topData[i + 2] = 255 - blue;
    }

    ctx.putImageData(imageData, 0, 0);
    topCtx.putImageData(topImageData, 0, 0);
}

//Returns the average frequency data, and average of the lowest, middlest, and highest thirds of the frequency data
function calcAverageAudioData(audioData) {
    var thirdDataLength = audioData.length / 3;

    //get the average values from the data
    var total = lowTotal = medTotal = highTotal = 0;
    //Loop through the data and retrieve totals
    for (var i = 0; i < audioData.length; i++) {
        if (i < thirdDataLength) {
            lowTotal += audioData[i];
        } else if (i > thirdDataLength && i < (thirdDataLength * 2)) {
            medTotal += audioData[i];
        } else {
            highTotal += audioData[i];
        }

        total += audioData[i];
    }
    var _average = total / audioData.length;
    var _lowAverage = lowTotal / thirdDataLength;
    var _medAverage = medTotal / thirdDataLength;
    var _highAverage = highTotal / thirdDataLength;


    aad = {
        lowAverage: _lowAverage,
        medAverage: _medAverage,
        highAverage: _highAverage,
        average: _average
    };
}

//swaps the brush used to draw the tree on mouse down
function changeBrush() {
    lowTreeBrush = document.querySelector("#lowTreeBrush").checked;
    medTreeBrush = document.querySelector("#medTreeBrush").checked;
    highTreeBrush = document.querySelector("#highTreeBrush").checked;
}

//changes the frequency / waveform data type
function changeDataType() {
    isFrequency = document.querySelector("#frequencyDataType").checked;
}

//calculates the global colors to be used until mousedown
function calcGlobalColors() {
    gRED = proColor.colorFromRange(ColorRange.RED);
    gORANGE = proColor.colorFromRange(ColorRange.ORANGE);
    gYELLOW = proColor.colorFromRange(ColorRange.YELLOW);
    gGREEN = proColor.colorFromRange(ColorRange.GREEN);
    gBLUE = proColor.colorFromRange(ColorRange.BLUE);
    gINDIGO = proColor.colorFromRange(ColorRange.INDIGO);
    gVIOLET = proColor.colorFromRange(ColorRange.VIOLET);
    gPINK = proColor.colorFromRange(ColorRange.PINK);
}

//Function from stack overflow, URL http://stackoverflow.com/questions/5649803/remap-or-map-function-in-javascript
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

//Returns the mouse position in (x, y)
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

//Clears the screen at (0, 0)
function clear(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//"Plant" a tree when the mouse is clicked
document.addEventListener("click", function(evt) {
    if (mousePos.y > canvas.height) {
        return;
    }

    mousePos = getMousePos(canvas, evt);
    trees[trees.length] = new app.Tree(canvas, dummyTree.getX(), dummyTree.getY(), dummyTree.getStrokeStyle(), dummyTree.getStartingLength());
    treeTypes[trees.length - 1] = dummyTreeType;
});

//Resizes the canvas when the window is resized
document.addEventListener("resize", function(evt) {
    drawResize.resizeWidth(canvas);
    drawResize.resizeHeight(canvas);
    topResize.resizeWidth(topCanvas);
    topResize.resizeHeight(topCanvas);
});

//calculates the global colors when false, sets mouse position
document.addEventListener("mousedown", function(evt) {
    if (mousePos.y > canvas.height) {
        return;
    }

    //runs if this is the first frame that the mouse is down
    if (mouseDown == false) {
        calcGlobalColors();
    }

    mouseDown = true;
    doDrawText = false;
    timeAtMouseDown = performance.now();
    mousePos = getMousePos(canvas, evt);
});

//clear the top canvas, sets mousedown to false
document.addEventListener("mouseup", function(evt) {
    mouseDown = false;
    clear(topCtx);
});

document.addEventListener("mousemove", function(evt) {
    mousePos = getMousePos(canvas, evt);
    if (mouseDown) {
        if (mousePos.y > canvas.height) {
            return;
        }
        drawTopCanvas();
    }
});

}();