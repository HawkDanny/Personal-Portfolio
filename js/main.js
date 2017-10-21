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
    article = document.querySelector("article");
    scrollPos = 0;

    //The sidebar does not start out expanded
    isSidebarExpanded = false;

    //Load images
    characterCard = loadImage("media/character_small.jpg");
    eventCard = loadImage("media/event_small.jpg");
    willCard = loadImage("media/will_small.jpg");
    rockPic = loadImage("media/litrock.jpg");

    //Make a canvas that is half of the window, TODO: Make it resize
    var cnv = createCanvas(window.innerWidth * 0.4, window.innerHeight);
    cnv.parent("sketchHolder");

    //Create the physics engine
    engine = Engine.create();
    world = engine.world;

    createBounds();

    createHTMLEvents();

    //Start the simulation that runs at 60 frames per second
    Engine.run(engine);

    //This is so that the user immediately knows what is going on
    spawnGreeting();
}

//Called every frame
function draw() {
    background(unhex(["EE", "EE", "EE"]));
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

function spawnGreeting() {
    if (random(0, 1) < 0.5)
        spawnHey();
    else
        spawnHi();
}

function spawnHey() {
    objects.push(new Letter(width / 2 - 7.2, 20, unhex(["21", "21", "21"]), "H", 20, 0.02) );
    objects.push(new Letter(width / 2, 20, unhex(["21", "21", "21"]), "E", 20, 0.02) );
    objects.push(new Letter(width / 2 + 7.2, 20, unhex(["21", "21", "21"]), "Y", 20, 0.02) );
}

function spawnHi() {
    //19.9 width
    //middle is 9.95
    objects.push(new Letter(width / 2 - 2.75, 20, unhex(["21", "21", "21"]), "H", 20, 0.02) );
    objects.push(new Letter(width / 2 + 4.45, 20, unhex(["21", "21", "21"]), "I", 20, 0.02) );
}

function spawnTodo() {
    var pos = randomSpawn(150);

    objects.push(new Box(pos.x, pos.y, 300, 22, unhex(["23", "23", "23"]), 0.001 ) );
    objects.push(new Box(pos.x - 170, pos.y - 6, 17, 3, unhex(["23", "23", "23"]), 0.05 ) );
    objects.push(new Box(pos.x - 170, pos.y, 17, 3, unhex(["23", "23", "23"]), 0.05 ) );
    objects.push(new Box(pos.x - 170, pos.y + 6, 17, 3, unhex(["23", "23", "23"]), 0.05 ) );
}

function spawnBoop() {
    var pos1 = randomSpawn(25);
    var pos2 = randomSpawn(25);

    objects.push(new Circle(pos1.x, pos1.y, 50, unhex(["D0", "D0", "D0"]))); //#D05938 //D0D0D0
    objects.push(new Circle(pos2.x, pos2.y, 50, unhex(["91", "91", "91"]))); //#95D1C5 //D1D1D1
}

function spawnGraph() {
    var centerPos = randomSpawn(40);

    var randHeight = random(20, 100);
    objects.push(new Box(centerPos.x - 30, centerPos.y - randHeight / 2, 15, randHeight, unhex(["E3", "04", "4A"]), 0.02 ) ); //#E3044A
    randHeight = random(20, 100);
    objects.push(new Box(centerPos.x - 15, centerPos.y - randHeight / 2, 15, randHeight, unhex(["06", "72", "9C"]), 0.02 ) ); //#06729C

    randHeight = random(20, 100);
    objects.push(new Box(centerPos.x + 15, centerPos.y - randHeight / 2, 15, randHeight, unhex(["E3", "04", "4A"]), 0.02 ) ); //#E3044A
    randHeight = random(20, 100);
    objects.push(new Box(centerPos.x + 30, centerPos.y - randHeight / 2, 15, randHeight, unhex(["06", "72", "9C"]), 0.02 ) ); //#06729C
}

function spawnDogs() {
    var centerPos = randomSpawn(70);

    //This was tedious
    objects.push(new Letter(centerPos.x - 68.1, centerPos.y, unhex(["21", "21", "21"]), "M", 20, 0.02) );
    objects.push(new Letter(centerPos.x - 54.8, centerPos.y, unhex(["21", "21", "21"]), "Y", 20, 0.02) );
    objects.push(new Letter(centerPos.x - 34.9, centerPos.y, unhex(["21", "21", "21"]), "D", 20, 0.02) );
    objects.push(new Letter(centerPos.x - 19.4, centerPos.y, unhex(["21", "21", "21"]), "O", 20, 0.02) );
    objects.push(new Letter(centerPos.x - 3.9, centerPos.y, unhex(["21", "21", "21"]), "G", 20, 0.02) );
    objects.push(new Letter(centerPos.x + 9.4, centerPos.y, unhex(["21", "21", "21"]), "S", 20, 0.02) );
    objects.push(new Letter(centerPos.x + 28.2, centerPos.y, unhex(["21", "21", "21"]), "E", 20, 0.02) );
    objects.push(new Letter(centerPos.x + 41.5, centerPos.y, unhex(["21", "21", "21"]), "Y", 20, 0.02) );
    objects.push(new Letter(centerPos.x + 54.8, centerPos.y, unhex(["21", "21", "21"]), "E", 20, 0.02) );
    objects.push(new Letter(centerPos.x + 68.1, centerPos.y, unhex(["21", "21", "21"]), "S", 20, 0.02) );
}

function spawnCard() {
    var pos = randomSpawn(50);

    var rand = random(0, 3);
    if (rand < 1)
        objects.push(new Sprite(pos.x, pos.y, 108, 156, characterCard) );
    else if (rand < 2)
        objects.push(new Sprite(pos.x, pos.y, 108, 156, eventCard) );
    else
        objects.push(new Sprite(pos.x, pos.y, 108, 156, willCard) );
}

function spawnRock() {
    var pos = randomSpawn(50);

    objects.push(new Sprite(pos.x, pos.y, 100, 100, litrock) );
}

function boostUpward(force) {
    for (var i = 0; i < objects.length; i++) {
        objects[i].applyForce(objects[i].body.position, {x: 0, y: force});
    }
}

function translateCanvas(yTranslation) {
    
    //Prevent the objects from tunneling, by keeping yTranslation between -90 and 90
    yTranslation = Math.min(yTranslation, 75)
    yTranslation = Math.max(yTranslation, -75);

    if (yTranslation > 0) {
        boostUpward(yTranslation * -0.001);
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


//Called at setup to link canvas events to html Elements
function createHTMLEvents() {
    document.querySelector("#todo").addEventListener("mouseenter", spawnTodo);
    document.querySelector("#boop").addEventListener("mouseenter", spawnBoop);
    document.querySelector("#dogseyes").addEventListener("mouseenter", spawnDogs);
    document.querySelector("#card").addEventListener("mouseenter", spawnCard);
    document.querySelector("#rocks").addEventListener("mouseenter", spawnRock);
}