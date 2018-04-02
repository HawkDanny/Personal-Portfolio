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

//Screen info
var halfWidth = window.innerWidth / 2;
var halfHeight = window.innerHeight / 2;

function setup() {
    article = document.querySelector("article");
    scrollPos = 0;

    //Make a canvas that is half of the window, TODO: Make it resize
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent("sketch");

    //Create the physics engine
    engine = Engine.create();
    world = engine.world;
    world.gravity.scale = 0;

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

    document.querySelector("#sketch").addEventListener("mousedown", function() {setAboutMePointerEvents(false);});
    document.querySelector("#sketch").addEventListener("mouseup", function() {setAboutMePointerEvents(true);});

    World.add(world, mConstraint);
}

//Called every frame
function draw() {
    background(unhex(["FD", "FD", "FD"]));

    noStroke();

    //Draw bodies
    for (var i = 0; i < objects.length; i++) {

        //Check if bodies are off the canvas
        if (objects[i].body.position.y + objects[i].radius < 0) {
            objects[i].translate(0, height + 120);
        }

        //Add a circular force
        var position = objects[i].body.position;
        var upperForce = 0.002;
        var constantForce = 0.001;

        if (position.x < halfWidth && position.y < halfHeight) //top left
        {
            var yForce = map(position.x, 0, halfWidth, upperForce, 0);
            Body.applyForce(objects[i].body, objects[i].body.position, {x: -constantForce, y: yForce});
        }
        else if (position.x < halfWidth && position.y > halfHeight) //bottom left
        {
            var xForce = map(position.y, halfHeight, window.innerHeight, 0, upperForce);
            Body.applyForce(objects[i].body, objects[i].body.position, {x: xForce, y: constantForce});
        }
        else if (position.x > halfWidth && position.y > halfHeight) //bottom right
        {
            var yForce = map(position.x, halfWidth, window.innerWidth, 0, -upperForce);
            Body.applyForce(objects[i].body, objects[i].body.position, {x: constantForce, y: yForce});
        }
        else if (position.x > halfWidth && position.y < halfHeight) //top right
        {
            var xForce = map(position.y, 0, halfHeight, -upperForce, 0);
            Body.applyForce(objects[i].body, objects[i].body.position, {x: xForce, y: -constantForce});
        }

        objects[i].show();
        objects[i].showText();
    }
}

function setupSkills() {
    var skill1 = 20;
    var skill2 = 30;
    var skill3 = 40;
    var skill4 = 50;
    var skill5 = 60;
    var interest1 = unhex(["C2", "C2", "C2"]);
    var interest2 = unhex(["92", "92", "92"]);
    var interest3 = unhex(["62", "62", "62"]);
    var interest4 = unhex(["32", "32", "32"]);
    var interest5 = unhex(["02", "02", "02"]);

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
    spawnSkill("Git", skill4, interest4); //15
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
    spawnSkill("Arduino", skill3, interest4); //29

    var connectorWidth = 250;
    var connectorStrength = 0.00005;
}

function spawnSkill(label, size, color) {
    var spawn = randomSpawn(25);

    objects.push(new Skill(spawn.x, spawn.y, size, color, label) );
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
    resizeCanvas(window.innerWidth, window.innerHeight);

    World.remove(world, leftWall);
    World.remove(world, rightWall);


    createBounds();
}

//Create the floor and walls out of static rectangles
function createBounds() {
    //Floor
    floor = Bodies.rectangle(width / 2, height + 50, width, 100, {isStatic: true});

    //Ceiling
    ceiling = Bodies.rectangle(width / 2, -50, width, 100, {isStatic: true});

    //Walls
    leftWall = Bodies.rectangle(-10, height / 2, 20, height * 2, {isStatic: true});
    rightWall = Bodies.rectangle(width + 10, height / 2, 20, height * 2, {isStatic: true});

    World.add(world, [floor, ceiling, leftWall, rightWall]);
}

//Val is a boolean, true = pointer-events: all
function setAboutMePointerEvents(val) {
    var me = document.querySelector(".me");
    var nav = document.querySelector("nav");

    if(val)
    {
        me.style.pointerEvents = "all";
        nav.style.pointerEvents = "all";
    }
    else
    {
        me.style.pointerEvents = "none";
        nav.style.pointerEvents = "none";
    }
}