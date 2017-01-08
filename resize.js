/**
 * The purpose of resize.js is to resize the canvas when the window resizes
 */

var app = app || {};
"use strict";

app.Resize = function() {
    var canvas;

    function Resize(_canvas) {
        this.canvas = _canvas;
    }

    Resize.prototype.resizeWidth = function() {
        this.canvas.width = window.innerWidth;

        if (this.canvas.width > this.canvas.scrollWidth) {
            //TODO: Account for the width of the scroll bar, and adjust the canvas accordingly
        }
    }

    Resize.prototype.resizeHeight = function() {
        this.canvas.height = window.innerHeight;
    }

    return Resize;
}();