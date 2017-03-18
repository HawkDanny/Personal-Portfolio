const system = require("./system.js");
const turtle = require("./turtle.js");

window.onload = function() {
    //Grab canvas information
    let canvas = document.querySelector("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let ctx = canvas.getContext("2d");

    //Create and run the L System
    //F->F[+F--F+++F-----F]FF[+F-F]
    //F->++F--F++F[-----F]

    system.createSystem("F", ["F->FF[FF--FFF]+FF"]);
    system.runCycles(5);

    //Create the turtle
    let myTurtle = turtle.create(ctx, canvas.width / 2 - 30, (canvas.height / 5) * 4);
    let theta = (Math.PI * 2) / 25.7;

    //Do some canvas styling
    ctx.fillStyle = "#EEEEEE";
    ctx.strokeStyle = "#222222";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(system.axiom);
    //Loop through the axiom's letters and operate the turtle accordingly
    for (let i = 0; i < system.axiom.length; i++) {
        let letter = system.axiom.substring(i, i+1);

        if (letter == "F") { //Move forward drawing line
            myTurtle.penDown();
            myTurtle.move(20);
            myTurtle.penUp();
        } else if (letter == "+") { //Turn right by theta degrees
            myTurtle.rotate(-theta);
        } else if (letter == "-") { //Turn left by theta degrees
            myTurtle.rotate(theta);
        } else if (letter == "[") { //Push the current state of the turtle to a stack
            myTurtle.push();
        } else if (letter == "]") { //Pop the last state of the tutle from the stack
            myTurtle.pop();
        }
    }
}