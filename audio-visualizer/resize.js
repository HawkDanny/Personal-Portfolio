var app = app || {};
"use strict";

app.Resize = function() {
    var canvas;

    function Resize(_canvas) {
        this.canvas = _canvas;
    }

    Resize.prototype.resizeWidth = function() {
        this.canvas.width = window.innerWidth;
    }

    Resize.prototype.resizeHeight = function() {
        this.canvas.height = window.innerHeight;
    }

    return Resize;
}();