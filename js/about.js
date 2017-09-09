//Aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Vertices = Matter.Vertices;

//Global engine reference
var engine;
var world;
var floor;

var objects = [];
var connections = [];

//DOM element
var article;
var scrollPos;

//Mouse input
var mConstraint;
var mouse;

//Skills
var skills = [];

function setup() {
    article = document.querySelector("article");
    scrollPos = 0;

    //Make a canvas that is half of the window, TODO: Make it resize
    var cnv = createCanvas(window.innerWidth * 0.4, window.innerHeight);
    cnv.parent("sketchHolder");

    //Create the physics engine
    engine = Engine.create();
    world = engine.world;
    world.gravity.scale = 0;

    createBounds();

    //Start the simulation that runs at 60 frames per second
    Engine.run(engine);

    //spawnSkill("I'm a Circle!", 20, unhex(["96", "78", "78"]));
    //spawnSkill("I'm a Circle too!", 20, unhex(["96", "78", "78"]));

    //connectSkills(objects[0], objects[1], 100, 0.01);

    //Handle mouse Input
    var mouse = Mouse.create(cnv.elt);
    mouse.pixelRatio = pixelDensity(); //Handle high density screens
    mConstraint = MouseConstraint.create(engine, {
        mouse: mouse
    });

    World.add(world, mConstraint);
}

//Called every frame
function draw() {
    background(unhex(["EE", "E4", "E4"]));
    stroke(unhex(["96", "78", "78"]));

    //Draw lines
    for (var i = 0; i < connections.length; i++) {
        var aPos = {
            x: connections[i].A.body.position.x,
            y: connections[i].A.body.position.y
        };

        var bPos = {
            x: connections[i].B.body.position.x,
            y: connections[i].B.body.position.y
        };

        line(aPos.x, aPos.y, bPos.x, bPos.y);
    }

    noStroke();

    //Draw bodies
    for (var i = 0; i < objects.length; i++) {
        objects[i].show();
    }

    //Draw text
    for (var i = 0; i < objects.length; i++) {
        objects[i].showText();
    }
}

function loadSkills() {

}

function spawnSkill(label, size, color) {
    objects.push(new Skill(width / 2, height / 2, size, color, label) );
}

function connectSkills(skillA, skillB, length, stiffness) {

    //Add the two bodies to an array of connections so that lines can be drawn
    connections.push({
        A: skillA,
        B: skillB
    });

    var options = {
        bodyA: skillA.body,
        bodyB: skillB.body,
        length: length,
        stiffness: stiffness
    }

    var c = Constraint.create(options);

    World.add(world, c);
}

//A function that returns a random spawn point in the top half of the canvas
function randomSpawn(buffer) {
    var randX = random(buffer, width - buffer);
    var randY = random(buffer, (height / 2) - buffer);

    return {
        x: randX,
        y: randY
    }
}

//Resize the canvas and reset the boundaries on window resize
function windowResized() {
    resizeCanvas(window.innerWidth * 0.4, window.innerHeight);

    World.remove(world, leftWall);
    World.remove(world, rightWall);
    World.remove(world, floor);
    World.remove(world, ceiling);

    createBounds();
}

function resetBorders() {

    World.remove(world, leftWall);
    World.remove(world, rightWall);
    World.remove(world, floor);
    World.remove(world, ceiling);

    createBounds();
}

//Create the floor and walls out of static rectangles
function createBounds() {
    //Floor
    floor = Bodies.rectangle(width / 2, height + 50, width, 100, {isStatic: true});

    //Ceiling
    ceiling = Bodies.rectangle(width / 2, -50, width, 100, {isStatic: true});

    //Walls
    leftWall = Bodies.rectangle(-10, height / 2, 20, height + 40, {isStatic: true});
    rightWall = Bodies.rectangle(width + 10, height / 2, 20, height + 40, {isStatic: true});

    World.add(world, [floor, ceiling, leftWall, rightWall]);
}