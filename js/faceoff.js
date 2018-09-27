var canvas;
var ctx;

var fontSize;

var red = "#EA1700";
var green = "#36A200";
var blue = "#0055A5";

window.onload = setup;

function setup() {
    canvas = document.querySelector("canvas");
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Set up the interaction events
    canvas.addEventListener("touchstart", function(e) {
        e.preventDefault();
        reveal();
    });
    canvas.addEventListener("touchend", hide);
    canvas.addEventListener("mousedown", reveal);
    canvas.addEventListener("mouseup", hide);
    window.addEventListener("orientationchange", resize);
    window.addEventListener("resize", resize);

    hide();
}

//A screen that displays instructions on how to get your card
function hide() {
    ctx.fillStyle = "#EEEEEE";
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#222222";
    ctx.font = "50px Fredoka One";
    var t = "HOLD TO REVEAL COLORS";
    ctx.fillText(t, (canvas.width / 2) - (ctx.measureText(t).width / 2), canvas.height / 2);
}

function reveal() {
    var firstColorChance = Math.random();
    if (firstColorChance < 0.33) { //Red
        ctx.fillStyle = red;
        ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

        if (Math.random() < 0.5) {
            ctx.fillStyle = green;
        } else {
            ctx.fillStyle = blue;
        }

        ctx.fillRect(canvas.width / 2, 0, canvas.width, canvas.height); 
    } else if (firstColorChance < 0.66) { //Green
        ctx.fillStyle = green;
        ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

        if (Math.random() < 0.5) {
            ctx.fillStyle = red;
        } else {
            ctx.fillStyle = blue;
        }

        ctx.fillRect(canvas.width / 2, 0, canvas.width, canvas.height); 
    } else { //Blue
        ctx.fillStyle = blue;
        ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

        if (Math.random() < 0.5) {
            ctx.fillStyle = green;
        } else {
            ctx.fillStyle = red;
        }

        ctx.fillRect(canvas.width / 2, 0, canvas.width, canvas.height); 
    }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    hide();
}