window.onload = function() {

//Create the applicaton and set it to the size of the window
var app = new PIXI.Application(window.innerWidth, window.innerHeight, { antialias: true });
document.body.appendChild(app.view);

//create the graphics generator
var graphics = new PIXI.Graphics();

graphics.lineStyle(0);
graphics.beginFill(0xFFFF0B, 0.5);
graphics.drawCircle(window.innerWidth / 2, window,60);
graphics.endFill();

app.stage.addChild(graphics);

};