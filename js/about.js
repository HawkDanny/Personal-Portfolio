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
    var cnv = createCanvas(window.innerWidth * 0.6, window.innerHeight);
    cnv.parent("sketchHolder");

    //Create the physics engine
    engine = Engine.create();
    world = engine.world;
    world.gravity.scale = -0.0001;

    createBounds();

    //Start the simulation that runs at 60 frames per second
    Engine.run(engine);

    setupSkills();

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
    stroke(unhex(["00", "00", "00"]));

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

        //Check if bodies are off the canvas
        if (objects[i].body.position.y + objects[i].radius < 0) {
            objects[i].translate(0, height + 120);
        }

        objects[i].show();
        objects[i].showText();
    }

    //Draw text
    //for (var i = 0; i < objects.length; i++) {
    //}
}

function setupSkills() {
    /**
     * 1: 20, A0A1B0
     * 2: 30, 898BB0
     * 3: 40, 686CB0
     * 4: 50, 4C51B0
     * 5: 60, 2C33B0
     */

    var skill1 = 20;
    var skill2 = 30;
    var skill3 = 40;
    var skill4 = 50;
    var skill5 = 60;
    var interest1 = unhex(["A0", "A1", "B0"]);
    var interest2 = unhex(["89", "8B", "B0"]);
    var interest3 = unhex(["68", "6C", "B0"]);
    var interest4 = unhex(["4C", "51", "B0"]);
    var interest5 = unhex(["2C", "33", "B0"]);

    spawnSkill("C#", skill5, interest5); //0
    spawnSkill("C++", skill3, interest3); //1
    spawnSkill("javaScript", skill5, interest5); //2
    spawnSkill("CSS", skill5, interest3); //3
    spawnSkill("HTML", skill5, interest3); //4
    spawnSkill("Canvas", skill4, interest3); //5
    spawnSkill("Processing", skill4, interest3); //6
    spawnSkill("Cinder", skill1, interest1); //7
    spawnSkill("Java", skill4, interest3); //8
    spawnSkill("MonoGame", skill3, interest3); //9
    spawnSkill("jQuery", skill3, interest2); //10
    spawnSkill("Bootstrap", skill2, interest3); //11
    spawnSkill("Node", skill3, interest3); //12
    spawnSkill("Ink", skill3, interest3); //13
    spawnSkill("Unity", skill4, interest5); //14
    spawnSkill("Git", skill4, interest5); //15
    spawnSkill("Maya", skill2, interest2); //16
    spawnSkill("Visual Studio", skill4, interest3); //17
    spawnSkill("VS Code", skill4, interest3); //18
    spawnSkill("Photoshop", skill2, interest3); //19
    spawnSkill("Twine", skill3, interest2); //20
    spawnSkill("HTC Vive", skill4, interest3); //21
    spawnSkill("ARKit", skill2, interest2); //22
    spawnSkill("UE4", skill2, interest3); //23
    spawnSkill("p5.js", skill4, interest3); //24
    spawnSkill("matter.js", skill3, interest3); //25
    spawnSkill("d3.js", skill1, interest2); //26
    spawnSkill("gulp", skill2, interest3); //27
    spawnSkill("browserify", skill2, interest3); //28

    var connectorWidth = 250;
    var connectorStrength = 0.00005;

    //c#
    //connectSkills(objects[0], objects[9], connectorWidth, connectorStrength);
    //connectSkills(objects[0], objects[14], connectorWidth, connectorStrength);
    //connectSkills(objects[0], objects[15], connectorWidth, connectorStrength);
    //connectSkills(objects[0], objects[17], connectorWidth, connectorStrength);
    //connectSkills(objects[0], objects[18], connectorWidth, connectorStrength);

    //c++
    //connectSkills(objects[1], objects[7], connectorWidth, connectorStrength);
    //connectSkills(objects[1], objects[17], connectorWidth, connectorStrength);

    //javaScript
    //connectSkills(objects[2], objects[5], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[10], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[12], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[15], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[18], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[24], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[25], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[26], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[27], connectorWidth, connectorStrength);
    //connectSkills(objects[2], objects[28], connectorWidth, connectorStrength);

    //CSS
    //connectSkills(objects[3], objects[4], connectorWidth, connectorStrength);
    //connectSkills(objects[3], objects[11], connectorWidth, connectorStrength);
    //connectSkills(objects[3], objects[18], connectorWidth, connectorStrength);

    //HTML
    //connectSkills(objects[4], objects[11], connectorWidth, connectorStrength);
    //connectSkills(objects[4], objects[18], connectorWidth, connectorStrength);

    //Processing
    //connectSkills(objects[6], objects[8], connectorWidth, connectorStrength);
}

function spawnSkill(label, size, color) {
    var spawn = randomSpawn(25);

    objects.push(new Skill(spawn.x, spawn.y, size, color, label) );
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
    var randY = random(buffer, height - buffer);

    return {
        x: randX,
        y: randY
    }
}

//Resize the canvas and reset the boundaries on window resize
function windowResized() {
    resizeCanvas(window.innerWidth * 0.6, window.innerHeight);

    World.remove(world, leftWall);
    World.remove(world, rightWall);
    //World.remove(world, floor);
    //World.remove(world, ceiling);

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
    //floor = Bodies.rectangle(width / 2, height + 50, width, 100, {isStatic: true});

    //Ceiling
    //ceiling = Bodies.rectangle(width / 2, -50, width, 100, {isStatic: true});

    //Walls
    leftWall = Bodies.rectangle(-10, height / 2, 20, height * 2, {isStatic: true});
    rightWall = Bodies.rectangle(width + 10, height / 2, 20, height * 2, {isStatic: true});

    World.add(world, [leftWall, rightWall]);
}