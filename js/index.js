const system = require("./system.js");
const turtle = require("./turtle.js");

var axiom = "F";
var rules = ["F->FF-[-FF+F]+[+F-F]"];

var primary = "#2C928D";
var secondary = "#F1F1F1";

var canvas;
var ctx;

var myTurtle;
var theta;

//Create a second set of variables to draw the background tree
var canvas2;
var ctx2;
var myTurtle2;

window.onload = function() {
    //For about page
    var counter = 0;
        
    var moment = document.querySelector(".moment");
    if (moment) {
        moment.onclick = function() {
            switch (counter) {
                case 0:
                    moment.innerHTML = "\"oh, wow\"";
                    break;
                case 1:
                    moment.innerHTML = "\"you're kidding me\"";
                    break;
                case 2:
                    moment.innerHTML = "\"that was cool\"";
                    moment.style.fontWeight = 300;
                    moment.id = "noMoreHelp";
                    break;
                case 3:
                    moment.innerHTML=  "\"stop clicking this\""
                    break;
                case 4:
                    moment.innerHTML=  "\"seriously\""
                    break;
                case 5:
                    moment.innerHTML=  "\"that means you <a style='font-weight: 600' href='http://lukaschulz.com'>Luka</a>\""
                    break;
            }
            ++counter;
        }
    }

    //Grab canvas information
    canvas = document.querySelector(".frontCanvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth / 5 * 2;
    ctx = canvas.getContext("2d");

    canvas2 = document.querySelector(".backCanvas");
    canvas2.height = window.innerHeight;
    canvas2.width = window.innerWidth;
    ctx2 = canvas2.getContext("2d");

    //Create and run the L System
    system.createSystem(axiom, rules);
    system.runCycles(5);

    //Create the turtle
    myTurtle = turtle.create(ctx, 100, canvas.height);
    theta = (Math.PI * 2) / 19;

    myTurtle2 = turtle.create(ctx2, 100, canvas2.height);

    //Rotate the turtle into position
    myTurtle.rotate(-Math.PI / 2);

    myTurtle2.rotate(-Math.PI / 2);

    drawTree(canvas, ctx, myTurtle, true);
    drawTree(canvas2, ctx2, myTurtle2, false);
}

window.onresize = function() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth / 5 * 2;

    canvas2.height = window.innerHeight;
    canvas2.width = window.innerWidth;

    drawTree(canvas, ctx, myTurtle, true);
    drawTree(canvas2, ctx2, myTurtle2, false);
}

function drawTree(cnv, context, turtle, fill) {

    //Do some canvas styling
    context.fillStyle = primary;
    context.lineWidth = 2;
    
    if (fill) {
        context.strokeStyle = secondary;
        context.fillRect(0, 0, cnv.width, cnv.height);
    } else {
        context.strokeStyle = primary;
        context.clearRect(0, 0, cnv.width, cnv.height);
    }

    //make sure the turtle starts at the correct location
    turtle.reset();

    //Loop through the axiom's letters and operate the turtle accordingly
    for (var i = 0; i < system.axiom.length; i++) {
        var letter = system.axiom.substring(i, i+1);

        if (letter == "F") { //Move forward drawing line
            turtle.penDown();
            turtle.move(12);
            turtle.penUp();
        } else if (letter == "+") { //Turn right by theta degrees
            turtle.rotate(-theta);
        } else if (letter == "-") { //Turn left by theta degrees
            turtle.rotate(theta);
        } else if (letter == "[") { //Push the current state of the turtle to a stack
            turtle.push();
        } else if (letter == "]") { //Pop the last state of the tutle from the stack
            turtle.pop();
        }
    }
}