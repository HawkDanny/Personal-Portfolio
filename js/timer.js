var canvas;
var ctx;
var backgroundColor;
var gs; //current game state
var currentTurn;

var timerFontSize; //Size in pixels of the timer font

var currentTime;
var currentTimeLimit; //The current tie limit being used
var beaverTimeLimit = 31.0;
var riverTimeLimit = 21.0;
var d; //date
var timerStart; //starting time of the timer

var beaverBackgroundColor = "#BF873D";
var riverBackgroundColor = "#57B4C2";
var menuBackgroundColor = "#2C2C2C";

GAMESTATE = Object.freeze({
    TITLESCREEN: 0,
    BEAVER: 1,
    RIVER: 2,
    GAMEOVER: 3
}),

window.onload = setup;
window.onresize = resize;

function setup() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener("touchend", skip);
    canvas.addEventListener("click", skip);

    //Starting background color
    backgroundColor = menuBackgroundColor;

    //Starting game state
    gs = GAMESTATE.TITLESCREEN;

    currentTurn = 1;

    //Get the time
    startTimer(beaverTimeLimit);

    draw();
}

function draw() {
    requestAnimationFrame(draw);

    //Clear to the current backgorund color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //TITLE TITLE TITLE
    if (gs === GAMESTATE.TITLESCREEN) {
        ctx.font = "90px Amatic SC";
        ctx.fillStyle = "#EEEEEE";
        var t = "TAP TO START";
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);
    }
    //BEAVER BEAVER BEAVER
    else if (gs === GAMESTATE.BEAVER) {

        setBigFont();
        
        ctx.fillStyle = "white";
        var t = getCountdown();
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);

        //GOODBYE BEAVER
        if (t < 1) {
            backgroundColor = riverBackgroundColor;
            startTimer(riverTimeLimit);
            gs = GAMESTATE.RIVER;
        }
    }
    //RIVER RIVER RIVER
    else if (gs === GAMESTATE.RIVER) {

        setBigFont();
               
        ctx.fillStyle = "white";
        var t = getCountdown();
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);
        //GOODBYE RIVER
        if (t < 1) {

            //Check if the game is over
            if (currentTurn === 4) {
                backgroundColor = menuBackgroundColor;
                gs = GAMESTATE.GAMEOVER;
            } else {
                backgroundColor = beaverBackgroundColor;
                startTimer(beaverTimeLimit);
                gs = GAMESTATE.BEAVER;
                currentTurn++;
            }
        }
    }
    //GAME OVER GAME OVER GAME OVER
    else if (gs === GAMESTATE.GAMEOVER) {
        ctx.font = "90px Amatic SC";
        ctx.fillStyle = "white";
        var t = "TAP TO RESTART";
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);
    }
}

function startTimer(timeLimit) {
    d = new Date();
    currentTimeLimit = timeLimit;
    timerStart = d.getTime();
}

//Returns the current time of the timer
function getCountdown() {
    d = new Date();
    return Math.trunc(currentTimeLimit - (d.getTime() - timerStart) / 1000);
}

//Make sure the text is big, but on screen
function setBigFont() {
    ctx.textBaseline = "middle";

    if (canvas.width < canvas.height) {
        ctx.font = (canvas.width / 2 ) + "px Amatic SC";
        timerFontSize = canvas.width / 2;
    }
    else if (canvas.height < canvas.width) {
        ctx.font = (canvas.height / 2 ) + "px Amatic SC";
        timerFontSize = canvas.height / 2;
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//Skips the current screen
function skip() {

    if (currentTurn === 4 && gs === GAMESTATE.RIVER) {
        backgroundColor = menuBackgroundColor;
        gs = GAMESTATE.GAMEOVER;
    } else if (gs === GAMESTATE.RIVER) {
        gs = GAMESTATE.BEAVER;
        backgroundColor = beaverBackgroundColor;
        startTimer(beaverTimeLimit);
        gs = GAMESTATE.BEAVER;
        currentTurn++;
    } else if (gs === GAMESTATE.BEAVER) {
        backgroundColor = riverBackgroundColor;
        startTimer(riverTimeLimit);
        gs = GAMESTATE.RIVER;
    } else if (gs === GAMESTATE.GAMEOVER) {
        gs = GAMESTATE.TITLESCREEN;
        currentTurn = 1;
    } else if (gs === GAMESTATE.TITLESCREEN) {
        startTimer(beaverTimeLimit);
        backgroundColor = beaverBackgroundColor;
        gs = GAMESTATE.BEAVER;
    }

    console.log(gs);
}