var canvas;
var ctx;
var backgroundColor;
var gs; //current game state

var timerFontSize; //Size in pixels of the timer font

var currentTime;
var timeLimit = 61.0;
var d; //date
var timerStart; //starting time of the timer

var menuBackgroundColor = "#E5601B";
var countdownBackgroundColor = "#FF0000";

GAMESTATE = Object.freeze({
    PLAYERSELECT: 0,
    NUMBER_OF_PLAYERS_SELECT: 1,
    COUNTDOWN: 2,
    GAMEOVER: 3
}),

window.onload = setup;
window.onresize = resize;

function setup() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.addEventListener("touchstart", function(e) {
        e.preventDefault();
        tap();   
    });
    canvas.addEventListener("click", tap);
    window.addEventListener("orientationchange", resize);

    //Starting background color
    backgroundColor = menuBackgroundColor;

    //Starting game state
    gs = GAMESTATE.PLAYERSELECT;

    //Get the time
    startTimer(timeLimit);

    draw();
}

function draw() {
    requestAnimationFrame(draw);

    //Clear to the current backgorund color
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //TITLE TITLE TITLE
    if (gs === GAMESTATE.PLAYERSELECT) {
        ctx.font = "90px K2D";
        ctx.fillStyle = "#EEEEEE";
        var t = "TAP TO SELECT NUMBER OF PLAYERS";
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);
    }
    //TIMER TIMER TIMER
    else if (gs === GAMESTATE.TIMER) {

        setBigFont();
        
        ctx.fillStyle = "white";
        var t = getCountdown();
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);

        //GOODBYE TIMER
        if (t < 1) {
            backgroundColor = menuBackgroundColor;
            gs = GAMESTATE.GAMEOVER;
        }
    }
    //GAME OVER GAME OVER GAME OVER
    else if (gs === GAMESTATE.GAMEOVER) {
        ctx.font = "90px K2D";
        ctx.fillStyle = "white";
        var t = "TAP TO RESTART";
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);
    }
}

//Call to begin the new timer
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
        ctx.font = (canvas.width / 2 ) + "px K2D";
        timerFontSize = canvas.width / 2;
    }
    else if (canvas.height < canvas.width) {
        ctx.font = (canvas.height / 2 ) + "px K2D";
        timerFontSize = canvas.height / 2;
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

//Skips the current screen
function tap() {

    if (gs === GAMESTATE.GAMEOVER) {
        gs = GAMESTATE.PLAYERSELECT;
    } else if (gs === GAMESTATE.PLAYERSELECT) {
        startTimer(timeLimit);
        backgroundColor = countdownBackgroundColor;
        gs = GAMESTATE.TIMER;
    }
}