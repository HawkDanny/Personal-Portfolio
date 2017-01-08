"use strict";

window.onload = init;

var ctx;
var canvas;

function init() {
    //Necessary setup for 2D canvas
    canvas = document.querySelector("#canvasHeader");
    ctx = canvas.getContext("2d");

    var h;
    var s;
    var l;
    recalculateProceduralColorPalette();
    

    //Adds an event that fires every time the mouse moves
    canvas.addEventListener('mousemove', function(event) {
        draw();
    }, false);

    document.getElementById('welcome').addEventListener('mousemove', draw, false);

    canvas.addEventListener('click', function(event) {
        recalculateProceduralColorPalette();
        draw();
    }, false);

    document.getElementById('welcome').addEventListener('click', function(event) {
        recalculateProceduralColorPalette();
        draw();
    });

    canvas.addEventListener('mousedown', function(event) {
        draw();
    }, false);
}

//Resets the hsl values
function recalculateProceduralColorPalette() {
    h = Math.random() * 360; //310 because the maximum that hRange can be is 50
    s = (Math.random() * 40) + 30; //A value from 30 to 70
    //l = 100 - s;  //Taken out so that the font is always readable on the colors
}

//Returns a string corresponding to an hsl value
function retrieveProceduralColorPalette(switchNum) {
    var hRange = 20 + (Math.random() * 40);

    switch (switchNum) {
        //Completely random
        case 0:
            return "hsl(" + Math.random() * 360 + "," + Math.random() * 100 + "%," + Math.random() * 100 + "%)";
        case 1:
            return "hsl(" + ((h + hRange) % 360) + "," + s + "%," + "60%)";
        case 2:
            return "hsl(" + Math.random() * 360 + ",70%," + Math.random() * 100 + "%)";
        default:
            console.log("Switch case default hit");
            break;
    }
}

//Clears the screen on call
function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function distance(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    var c = Math.sqrt(a * a + b * b);
    return c;
}

//Draws a "pyramid" of circles, each half the size of the previous until the radius drops below 5
function drawRecursiveCircle(x, y, radius) {

    //Draw the ellipse
    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
    ctx.fill();


    //Set the fill color for the next tier of circles
    ctx.fillStyle = retrieveProceduralColorPalette(1);

    var halfRadius = radius / 2;
    if (radius > 10) {
        drawRecursiveCircle(x + radius, y, halfRadius);
        drawRecursiveCircle(x - radius, y, halfRadius);
        drawRecursiveCircle(x, y + radius, halfRadius);
        drawRecursiveCircle(x, y - radius, halfRadius);
    }
}

function drawRecursiveSquare(x, y, radius) {

    //Set the fill color for the next tier of squares
    ctx.fillStyle = retrieveProceduralColorPalette(1);

    //Calculate half the "radius"
    var halfRadius = radius / 2;

    //Calculate the diameter (width) of the square
    var diameter = radius * 2; 

    //Draw the square
    //ctx.fillRect(x - radius, y - radius, diameter, diameter);
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x + radius, y);
    ctx.lineTo(x, y + radius);
    ctx.lineTo(x - radius, y);
    ctx.lineTo(x, y - radius);
    ctx.fill();

    if (radius > 20)
    {
        drawRecursiveSquare(x + radius, y, halfRadius);
        drawRecursiveSquare(x - radius, y, halfRadius);
        drawRecursiveSquare(x, y + radius, halfRadius);
        drawRecursiveSquare(x, y - radius, halfRadius);
    }
}

function draw() {
    clearScreen();
    var mousePos = getMousePos(canvas, event);

    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var distanceFromCenter = distance(centerX, centerY, mousePos.x, mousePos.y);

    if (distanceFromCenter * 1.5 < 15) {
        recalculateProceduralColorPalette();
    }

    drawRecursiveSquare(centerX, centerY, distanceFromCenter * 1.5);
}

//Returns the x and y coordinates of the mouse position as properties
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}