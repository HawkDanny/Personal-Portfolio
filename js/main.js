//Aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Vertices = Matter.Vertices;

//Global engine reference
var engine;
var world;
var floor;

var objects = [];

//DOM element
var article;
var scrollPos;

//Cards
var characterCard;
var eventCard;
var willCard;

//Instagram
var rockPic;

//Sidebar
var isSidebarExpanded;

function setup() {
    article = document.querySelector(".content");
    scrollPos = 0;

    //Make the canvas and tell p5 about it
    var cnv = createCanvas(window.innerWidth, window.innerHeight);
    cnv.parent("sketch");

    //Create the physics engine
    engine = Engine.create();
    world = engine.world;

    createBounds();

    createHTMLEvents();

    //Start the simulation that runs at 60 frames per second
    Engine.run(engine);
}

//Called every frame
function draw() {
    background(unhex(["FD", "FD", "FD"]));
    noStroke();

    for (var i = 0; i < objects.length; i++) {
        objects[i].show();


        //If an object manages to get off screen, delete it to keep processing light
        if (objects[i].isOffScreen()) {
            objects[i].removeFromWorld();
            objects.splice(i, 1);
            --i;
        }
    }

    if (scrollPos !== article.scrollTop) {

        translateCanvas(scrollPos - article.scrollTop);
        
        scrollPos = article.scrollTop;
    }
}

function spawnCircle(color) {
    var pos = randomSpawn(25);
    objects.push(new Circle(pos.x, pos.y, 50, color)); 
}

function boostUpward(force) {
    for (var i = 0; i < objects.length; i++) {
        //Don't boost it if it isn't in contact with the floor
        if (objects[i].body.position.y < window.innerHeight - objects[i].radius){
            continue;
        }
        objects[i].applyForce(objects[i].body.position, {x: 0, y: force});
    }
}

function translateCanvas(yTranslation) {
    
    //Prevent the objects from tunneling, by keeping yTranslation between -90 and 90
    yTranslation = Math.min(yTranslation, 75)
    yTranslation = Math.max(yTranslation, -75);

    if (yTranslation > 0) {
        boostUpward(yTranslation * -0.005);
    }

    Composite.translate(world, {x: 0, y: yTranslation});

    resetBorders();
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
    resizeCanvas(window.innerWidth, window.innerHeight);

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


//Called at setup to link canvas events to html Elements
function createHTMLEvents() {
    var red = unhex(["FE", "00", "00"]); //FE0000
    var orange = unhex(["FF", "88", "00"]); //FF8800
    var yellow = unhex(["FD", "FE", "02"]); //FDFE02
    var green = unhex(["0B", "FF", "01"]); //0BFF01
    var blue = unhex(["01", "1E", "FE"]); //011EFE
    var purple = unhex(["88", "00", "88"]); //880088

    var palette11 = unhex(["D4", "00", "4F"]); //d4004f
    var palette12 = unhex(["48", "4E", "A5"]); //484ea5
    var palette13 = unhex(["00", "70", "A7"]); //0070a7
    var palette14 = unhex(["0A", "91", "90"]); //0a9190
    var palette15 = unhex(["F8", "D7", "39"]); //f8d739

    var palette21 = unhex(["FF", "9D", "DF"]); //ff9ddf
    var palette22 = unhex(["89", "28", "BE"]); //8928be
    var palette23 = unhex(["99", "D5", "F7"]); //99d5f7
    var palette24 = unhex(["91", "FD", "6A"]); //91fd6a
    var palette25 = unhex(["CE", "F6", "B7"]); //cef6b7

    var palette31 = unhex(["4C", "ED", "C5"]); //4cedc5
    var palette32 = unhex(["FE", "B4", "DF"]); //feb4df
    var palette33 = unhex(["6A", "85", "F7"]); //6a85f7
    var palette34 = unhex(["00", "CA", "FA"]); //00cafa
    var palette35 = unhex(["00", "EE", "FD"]); //00eefd

    var palette41 = unhex(["EF", "00", "6C"]); //ef006c
    var palette42 = unhex(["FF", "2A", "90"]); //ff2a90
    var palette43 = unhex(["F7", "CC", "44"]); //f7cc44
    var palette44 = unhex(["E9", "6A", "3C"]); //e96a3c
    var palette45 = unhex(["E9", "3C", "2C"]); //e93c2c

    var palette51 = unhex(["2A", "7F", "7D"]); //2a7f7d
    var palette52 = unhex(["D1", "00", "5F"]); //d1005f
    var palette53 = unhex(["49", "66", "A6"]); //4966a6
    var palette54 = unhex(["E3", "99", "59"]); //e39959
    var palette55 = unhex(["DD", "D4", "C8"]); //ddd4c8

    document.querySelector("#narwhal").addEventListener("mouseenter", function() {spawnCircle(palette51)});
    document.querySelector("#boop").addEventListener("mouseenter", function() {spawnCircle(palette52)});
    document.querySelector("#beautiful").addEventListener("mouseenter", function() {spawnCircle(palette53)});
    document.querySelector("#dog").addEventListener("mouseenter", function() {spawnCircle(palette54)});
    document.querySelector("#rocks").addEventListener("mouseenter", function() {spawnCircle(palette55)});
    //document.querySelector("#todo").addEventListener("mouseenter", function() {spawnCircle(blue)});
    //document.querySelector("#montague").addEventListener("mouseenter", function() {spawnCircle(purple)});


    document.querySelector("#boop").addEventListener("click", function() {window.location.href="./boop.html"});
    document.querySelector("#narwhal").addEventListener("click", function() {window.location.href="./narwhal.html"});
    document.querySelector("#beautiful").addEventListener("click", function() {window.location.href="./beautiful.html"});
    document.querySelector("#dog").addEventListener("click", function() {window.location.href="./dog.html"});
    document.querySelector("#rocks").addEventListener("click", function() {window.location.href="./litrocks.html"});
    //document.querySelector("#todo").addEventListener("click", function() {window.location.href="http://puppyproductivity.club"});
    //document.querySelector("#montague").addEventListener("click", function() {window.location.href="./montague.html"});
}