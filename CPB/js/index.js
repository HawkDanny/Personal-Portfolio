var STATE = {
    START: 0,
    LOADING: 1,
    CONTENT: 2,
    IMAGES: 3
};
Object.freeze(STATE);

var IMAGE_STATE = {
    CPB: 0,
    ME: 1
};
Object.freeze(IMAGE_STATE);

//The masterString that contains all of the text to be drawn at the end.
var masterString;
var currentString;
var content;
var contentIndex;

//Track the space bar
var spaceIsPressed;
var spaceWasPressed;

//An array of the images used
var images;
var imageData;
var areImagesLoaded;
var numImagesLoaded;
var areImagesPrepped;

//Application states
var masterState;
var imageState;

//canvas infomation
var canvas;
var ctx;

//Dynamic information
var fontSizeMin;
var fontSizeMax;
var kerning;
var lineheight;

//Initialize the fields and call set up methods
function init() {
    content = [];
    populateWrittenContent();

    //canvas data
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = 960;
    canvas.height = 685;

    //Start the master stirng at nothing
    masterString = "";
    currentString = content[0];
    contentIndex = 0;

    //space bar data
    spaceIsPressed = false;
    spaceWasPressed = false;

    //Text styling data
    fontSizeMin = 10;
    fontSizeMax = 32;
    kerning = 2;
    lineheight = 6;

    images = [];
    areImagesLoaded = false;
    numImagesLoaded = 0;
    loadImages();
    imageData = [];
    areImagesPrepped = false;

    masterState = STATE.START;
    imageState = 0;

    //Start the update loop
    update();
}

//Sets all of the data in the lyric array
function populateWrittenContent() {
    content[0] = "Hi. ";
    content[1] = "My name is Danny Hawk. ";
    content[2] = "I'm from Rochester NY ";
    content[3] = "(I've lived there my entire life). ";
    content[4] = "Here are a few things that I like, in no particular order: ";
    content[5] = "rock climbing, ";
    content[6] = "human-computer interaction, ";
    content[7] = "Love On Top - Beyoncé, ";
    content[8] = "conversations, ";
    content[9] = "movie trailers, ";
    content[10] = "pumpkin bread, ";
    content[11] = "sharing what I'm passionate about, ";
    content[12] = "people sharing what they're passionate about with me, ";
    content[13] = "summer, ";
    content[14] = "khakis, ";
    content[15] = "dogs, ";
    content[16] = "shag rugs, ";
    content[17] = "learning, ";
    content[18] = "Twitter, ";
    content[19] = "sweaters, ";
    content[20] = "programming, ";
    content[21] = "bonfires, ";
    content[22] = "gifs, ";
    content[23] = "laughing, ";
    content[24] = "whiteboards, ";
    content[25] = "people. ";
    content[26] = "I'm a developer! ";
    content[27] = "A creative developer. ";
    content[28] = "A web developer. ";
    content[29] = "A game developer. ";
    content[30] = "I'm also a designer! ";
    content[31] = "An interaction designer. ";
    content[32] = "A game designer. ";
    content[33] = "A (budding) ux designer. ";
    content[34] = "When you mash all of those together, you get ";
    content[35] = "'Creative Technology Fellow' ";
    content[36] = "which is me this summer! ";
    content[37] = "And this summer I'm going to ";
    content[38] = "prototype, ";
    content[39] = "iterate, ";
    content[40] = "ideate, ";
    content[41] = "fall in love with ideas, ";
    content[42] = "throw out those ideas, ";
    content[43] = "and come up with new ideas. ";
    content[44] = "But most importantly, ";
    content[45] = "I'm going to crush it ";
    content[46] = "all while keeping it creative. "
}

//Loads in all of the images used for the song
function loadImages() {
    images[0] = new Image();
    images[0].src = "media/cpb.jpg"
    images[1] = new Image();
    images[1].src = "media/me.jpg";
    

    //Add an event listener to increment numImagesLoaded when each image loads
    for (var i = 0; i < images.length; i++) {
        images[i].width = 960;
        images[i].height = 685;

        images[i].addEventListener('load', function() {
            ++numImagesLoaded;
        });
    }
}

//Populates the imageData array with pixel data from each image loaded into the images array
function populateImageData() {

    //In order to get the image data, you have to create a temporary canvas in memory,
    //draw the image to the canvas, and then take the canvas data
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        var tempCanvas = document.createElement('canvas');
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        tempContext.drawImage(img, 0, 0 );
        var temp = tempContext.getImageData(0, 0, img.width, img.height);
        var temp2 = [];
        //loop through the pixel data and chunk it into objects that contain the rgba data
        for (var j = 0; j < temp.data.length; j+=4) {
            temp2[j / 4] = {
                r: temp.data[j],
                g: temp.data[j + 1], 
                b: temp.data[j + 2],
                a: temp.data[j + 3]
            };
        }
        imageData[i] = temp2;
    }

    areImagesPrepped = true;
}

//Checks if all of the images are loaded, and if they are, kicks off populateImageData
function checkImages() {
    if (numImagesLoaded === images.length) {
        areImagesLoaded = true;
    } else { return; }


    //If the images have been loaded in, then get their data
    if (areImagesLoaded && !areImagesPrepped) {
        populateImageData();
    }
}

//Called once per frame
function update() {
    //Call update once per frame
    window.requestAnimationFrame(update);

    //Clear the screen at the beginning of each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //handle spacebar
    updateSpace();

    //Check the current state, and run the appropriate code per frame
    switch (masterState) {
        case STATE.START:
            updateTitle();
        break;
        case STATE.LOADING:
            updateLoading();
        break;
        case STATE.CONTENT:
            updateContent();
        break;
        case STATE.IMAGES:
            updateImages();
        break;
    }
}

//Called by update when the title screen is the current state
function updateTitle() {
    ctx.baseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("Keep Pressing Space", canvas.width / 2, canvas.height / 2);

    checkImages();

    //Move to the next state
    if (spaceWasPressed && !spaceIsPressed) {
        if (areImagesPrepped) {
            masterState = STATE.CONTENT;
        } else {
            masterState = STATE.LOADING;
        }
    }
};

//Called only if the images are not done loading when exiting the title state
function updateLoading() {
    ctx.baseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("LOADING", canvas.width / 2, canvas.height / 2);

    checkImages();

    //If the images have been prepped, then change state
    if (areImagesPrepped) {
        masterState = STATE.CONTENT;
    }
}

//Called by update when the content is the current state
function updateContent() {
    ctx.textAlign = "left";

    //The starting coordinates for the text to be drawn
    var x = 0;
    var y = 16;
    var letterCounter = 0;
    ctx.font = "21px Open Sans";
    ctx.fillStyle = "#DDD";

    //loop through each character in the string and draw it to the screen
    for (var i = 0; i < masterString.length; i++) {
        var currentLetter = masterString[i];

        ctx.fillText(currentLetter, x, y);

        var letterWidth = ctx.measureText(currentLetter).width + kerning;

        x = x + letterWidth;

        //handle linebreaks
        if (x >= canvas.width)
        {
            x = 0;
            y = y + 25; //new line
        }
    }




    //Draw the current string in the center
    ctx.textAlign = "center";
    ctx.baseline = "middle";
    ctx.font = "32px Open Sans";
    ctx.fillStyle = "#ec008c";

    ctx.fillText(currentString, canvas.width / 2, canvas.height / 2);

    //If space is released, update the master string and get the next string
    if (spaceWasPressed && !spaceIsPressed) {
        masterString += currentString;
        currentString = content[++contentIndex];
    }

    if (currentString === undefined) {
        masterState = STATE.IMAGES;
    }
};

//Called by update when the 
function updateImages() {
    switch(imageState) {
        case (IMAGE_STATE.CPB):
            renderTextAsImage(images[imageState], imageData[imageState]);
            break;
        case (IMAGE_STATE.ME):
            renderTextAsImage(images[imageState], imageData[imageState]);
            break;
    }

    if (spaceWasPressed) {
        ++imageState;
    }
}

//Update the variables and information related to the spacebar
function updateSpace() {
    var currentSpaceState = myKeys.keydown[32];

    //If spaceIsPressed is still true from the previous frame,
    //but space isn't actually down, then set spaceWasDown
    if (spaceIsPressed && !currentSpaceState) {
        spaceWasPressed = true;
    }
    else {
        spaceWasPressed = false;
    }

    spaceIsPressed = myKeys.keydown[32];
}

//Take in an image and its data, and render it using the masterString as the pixels
function renderTextAsImage(img, imgDat) {
    ctx.textAlign = "left";

    //The starting coordinates for the text to be drawn
    var x = 0;
    var y = 15;
    var letterCounter = 0;


    while (y < canvas.height) {
        //Get the pixel data from the image based on 
        var imgX = map_range(x, 0, canvas.width, 0, img.width);
        var imgY = map_range(y, 0, canvas.height, 0, img.height);

        //Create an object that contains the pixel's data
        var c = imgDat[imgY * img.width + Math.floor(imgX)];

        var grayValue = Math.floor((c.r * 0.222) + (c.g * 0.707) + (c.b * 0.071));

        //Get the font size from the minimum and maximum font size, controleld by the music
        var fontSize = map_range(grayValue, 0, 255, fontSizeMin, fontSizeMax);
        fontSize = Math.max(fontSize, 1); //Make sure the text is there

        ctx.font = fontSize + "px Open Sans";
        ctx.fillStyle = "rgb(" + c.r + ", " + c.g + ", " +  c.b + ")";

        var currentLetter = getCurrentLetter(letterCounter);

        ctx.fillText(currentLetter, x, y);

        var letterWidth = ctx.measureText(currentLetter).width + kerning;

        x = x + letterWidth;

        //handle linebreaks
        if (x >= canvas.width)
        {
            x = 0;
            y = y + lineheight; //new line
        }

        ++letterCounter;
    }
}

//Returns the current letter in the master string, where counter is an int increasing once per frame
function getCurrentLetter(counter) {
    return masterString[counter % masterString.length];
}

//Function from stack overflow, URL http://stackoverflow.com/questions/5649803/remap-or-map-function-in-javascript
function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}



//Start the project on window load.
//Init calls the first frame of update
window.onload = init;