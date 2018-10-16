var canvas;
var ctx;
var backgroundColor;
var gs; //current game state

var boxes = new Array(); //An array of the player select box dimensions
var stopDrawingBoxesPlease;

var announcements = new Array();
var tick;
var finish;

var timerFontSize; //Size in pixels of the timer font
var timerLastFrame; //What the timer was last frame
var timerLastTen; //The most recent ten seconds the timer was on

var currentTime;
var timeLimit = 61.0;
var d; //date
var timerStart; //starting time of the timer

var menuBackgroundColor = "#FFFFFF";
var countdownBackgroundColor = "#FF0000";

GAMESTATE = Object.freeze({
    WELCOME: 0,
    PLAYERSELECT: 1,
    TAP_TO_START: 2,
    COUNTDOWN: 3,
    GAMEOVER: 4
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
    gs = GAMESTATE.WELCOME;

    setupSound();

    //Get the time
    startTimer(timeLimit);

    calcBoxes();
    stopDrawingBoxesPlease = false;

    draw();
}

function draw() {
    requestAnimationFrame(draw);

    //WELCOME WELCOME WELCOME
    if (gs === GAMESTATE.WELCOME) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "50px K2D";
        ctx.fillStyle = "#FF0000";
        var t = "TAP TO SELECT NUMBER OF PLAYERS";
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);
    }
    //PLAYER SELECT PLAYER SELECT PLAYER SELECT
    else if (gs === GAMESTATE.PLAYERSELECT) {
        setSmallFont();
        if (!stopDrawingBoxesPlease) {
            for(var i = 0; i < boxes.length; i++) {
                ctx.fillStyle = "hsl(" + (Math.random() * 7) + ", " + (Math.random() * 20 + 80) + "%, " + (Math.random() * 20 + 40) + "%)";
                ctx.fillRect(boxes[i].x, boxes[i].y, Math.ceil(boxes[i].width), Math.ceil(boxes[i].height));

                ctx.fillStyle = "#EEEEEE";
                var t = boxes[i].num + "";
                ctx.fillText(t, boxes[i].x + (boxes[i].width / 2) - (ctx.measureText(t).width / 2), boxes[i].y + (boxes[i].height / 2) ); 
            }
        }
        stopDrawingBoxesPlease = true;
    }
    //TAP TO START TAP TO START TAP TO START
    else if (gs === GAMESTATE.TAP_TO_START) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "90px K2D";
        ctx.fillStyle = "#FF0000";
        var t = "TAP TO BEGIN TIMER";
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);
    }
    //TIMER TIMER TIMER
    else if (gs === GAMESTATE.TIMER) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        var t = getCountdown();

        //Handle audio
        if (timerLastFrame != t) {
            tick.play();
            timerLastFrame = t;
        }

        if (timerLastTen !== t && t % 10 === 0) {
            announcements[(t / 10) - 1].play();
            timerLastTen = t;
        }

        setBigFont();
        
        ctx.fillStyle = "white";
        ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);

        //GOODBYE TIMER
        if (t < 1) {
            finish.play();
            backgroundColor = menuBackgroundColor;
            gs = GAMESTATE.GAMEOVER;
        }
    }
    //GAME OVER GAME OVER GAME OVER
    else if (gs === GAMESTATE.GAMEOVER) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "90px K2D";
        ctx.fillStyle = "#FF0000";
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

//Used for player select
function setSmallFont() {
    ctx.textBaseline = "middle";

    //portrait
    if (canvas.width < canvas.height) {
        ctx.font = (canvas.width / 6 ) + "px K2D";
        timerFontSize = canvas.width / 5;
    }
    //landscape
    else if (canvas.height < canvas.width) {
        ctx.font = (canvas.height / 6 ) + "px K2D";
        timerFontSize = canvas.height / 5;
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stopDrawingBoxesPlease = false;
    calcBoxes();
}

//Calculate the dimensions of the player select options
function calcBoxes() {
    for (var i = 0; i < 17; i++) {
        var boxWidth = canvas.width / 4;
        var boxHeight = canvas.height / 5;
        var boxX = (i % 4) * boxWidth;
        var boxY = Math.trunc(i / 4) * boxHeight;

        if (i == 16)
            boxWidth = canvas.width;
        
        boxes[i] = {
            num: i + 10,
            width: boxWidth,
            height: boxHeight,
            x: boxX,
            y: boxY
        }
    }
}

//Skips the current screen
function tap(evt) {

    if (gs === GAMESTATE.GAMEOVER) {
        stopDrawingBoxesPlease = false;
        gs = GAMESTATE.WELCOME;
    } else if (gs === GAMESTATE.WELCOME) {
        gs = GAMESTATE.PLAYERSELECT;
    } else if (gs === GAMESTATE.TAP_TO_START) {
        startTimer(timeLimit);
        backgroundColor = countdownBackgroundColor;
        gs = GAMESTATE.TIMER;
    } else if (gs === GAMESTATE.TIMER) {
        gs = GAMESTATE.GAMEOVER;
        backgroundColor = menuBackgroundColor;
    } else if (gs === GAMESTATE.PLAYERSELECT) {
        var rect = canvas.getBoundingClientRect();
        var tapPos = {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
        
        for (var i = 0; i < boxes.length; i++) {
            if (tapPos.x > boxes[i].x && tapPos.x < boxes[i].x + boxes[i].width && tapPos.y > boxes[i].y && tapPos.y < boxes[i].y + boxes[i].height) {
                timeLimit = (6 * boxes[i].num) + 1;
                gs = GAMESTATE.TAP_TO_START;
                return;
            }
        }

    }
}

function setupSound() {
    announcements[0] = document.querySelector("#announcement10");
    announcements[1] = document.querySelector("#announcement20");
    announcements[2] = document.querySelector("#announcement30");
    announcements[3] = document.querySelector("#announcement40");
    announcements[4] = document.querySelector("#announcement50");
    announcements[5] = document.querySelector("#announcement60");
    announcements[6] = document.querySelector("#announcement70");
    announcements[7] = document.querySelector("#announcement80");
    announcements[8] = document.querySelector("#announcement90");
    announcements[9] = document.querySelector("#announcement100");
    announcements[10] = document.querySelector("#announcement110");
    announcements[11] = document.querySelector("#announcement120");
    announcements[12] = document.querySelector("#announcement130");
    announcements[13] = document.querySelector("#announcement140");
    announcements[14] = document.querySelector("#announcement150");
    tick = document.querySelector("#tick");
    finish = document.querySelector("#finish");
}