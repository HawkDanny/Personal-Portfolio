const system = require("./system.js");
const turtle = require("./turtle.js");

let primary = "#2C928D";
let secondary = "#F1F1F1";

let canvas;
let ctx;

let myTurtle;
let theta;

//Create a second set of variables to draw the background tree
let canvas2;
let ctx2;
let myTurtle2;

window.onload = function() {
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
    system.createSystem("F", ["F->FF-[-FF+F]+[+F-F]"]);
    system.runCycles(5);

    //Create the turtle
    myTurtle = turtle.create(ctx, 200, canvas.height);
    theta = (Math.PI * 2) / 13.5;

    myTurtle2 = turtle.create(ctx2, 200, canvas2.height);

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
    for (let i = 0; i < system.axiom.length; i++) {
        let letter = system.axiom.substring(i, i+1);

        if (letter == "F") { //Move forward drawing line
            turtle.penDown();
            turtle.move(6);
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