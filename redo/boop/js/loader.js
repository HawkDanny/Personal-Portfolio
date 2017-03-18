/**
 * The purpose of loader.js is to house all of the events in app.
 * This includes window.onload, so loader also initializes all of the modules.
 * Every event in here MUST call a function in another file. The goal of this
 * file is to offer concise events, so you can easily check on all events
 */

var app = app || {};
"use strict";

window.onload = function() {
    app.Main.initCanvasElements();
    app.Main.resize = new app.Resize(app.Main.canvas);
    app.Sound.init();
    app.Main.sound = app.Sound;
    app.Main.init();

    window.onmousemove = function(e) {
    app.Main.setMousePos(e);
}
}

window.onblur = function() {
    app.Main.pauseGame();
}

window.onfocus = function() {
    app.Main.resumeGame();
}

window.onresize = function() {
    app.Main.resizeCanvas();
}