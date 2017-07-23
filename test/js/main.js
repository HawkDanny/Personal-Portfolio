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

function setup() {
    article = document.querySelector("article");
    scrollPos = 0;

    //Load images
    characterCard = loadImage("media/CharacterCardFront.jpg");
    eventCard = loadImage("media/EventCardFront.jpg");
    willCard = loadImage("media/WillCardFront.jpg");

    //Make a canvas that is half of the window, TODO: Make it resize
    var cnv = createCanvas(window.innerWidth / 2, window.innerHeight);
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
    background(unhex(["EE", "E4", "E4"]));
    noStroke();

    for (var i = 0; i < objects.length; i++) {
        objects[i].show();
    }

    if (scrollPos !== article.scrollTop) {

        translateCanvas(scrollPos - article.scrollTop);
        
        scrollPos = article.scrollTop;
    }

    noStroke();
    fill(unhex("96", "09", "09"));
    beginShape();
    vertex(20, 20);
    vertex(40, 20);
    vertex(40, 40);
    vertex(20, 40);
    endShape(CLOSE);
}

function spawnGreeting() {
    var h = Vertices.fromPath("-20, -20, 20, -20, 20, 20, -20, 20"); //Square?

    //objects.push(new Shape(width / 2, 50, h, unhex("96", "09", "09") ) );
}

function spawnTodo() {
    var pos = randomSpawn(150);

    objects.push(new Box(pos.x, pos.y, 300, 22, unhex(["8A", "B7", "D1"]) ) );
    objects.push(new Box(pos.x - 170, pos.y - 6, 17, 3, unhex(["8A", "B7", "D1"]) ) );
    objects.push(new Box(pos.x - 170, pos.y, 17, 3, unhex(["8A", "B7", "D1"]) ) );
    objects.push(new Box(pos.x - 170, pos.y + 6, 17, 3, unhex(["8A", "B7", "D1"]) ) );
}

function spawnBoop() {
    var pos1 = randomSpawn(25);
    var pos2 = randomSpawn(25);

    objects.push(new Circle(pos1.x, pos1.y, 50, unhex(["D0", "59", "38"]))); //#D05938
    objects.push(new Circle(pos2.x, pos2.y, 50, unhex(["95", "D1", "C5"]))); //#95D1C5
}

function spawnGraph() {
    var centerPos = randomSpawn(40);

    var randHeight = random(20, 100);
    objects.push(new Box(centerPos.x - 30, centerPos.y - randHeight / 2, 15, randHeight, unhex(["E3", "04", "4A"]) ) ); //#E3044A
    randHeight = random(20, 100);
    objects.push(new Box(centerPos.x - 15, centerPos.y - randHeight / 2, 15, randHeight, unhex(["06", "72", "9C"]) ) ); //#06729C

    randHeight = random(20, 100);
    objects.push(new Box(centerPos.x + 15, centerPos.y - randHeight / 2, 15, randHeight, unhex(["E3", "04", "4A"]) ) ); //#E3044A
    randHeight = random(20, 100);
    objects.push(new Box(centerPos.x + 30, centerPos.y - randHeight / 2, 15, randHeight, unhex(["06", "72", "9C"]) ) ); //#06729C
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
    resizeCanvas(window.innerWidth / 2, window.innerHeight);

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
    document.querySelector("#graph").addEventListener("mouseenter", spawnGraph);
    document.querySelector("#card").addEventListener("mouseenter", spawnCard);
}