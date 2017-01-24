"use strict";

var app = app || {};

app.Fractal = function() {

    var canvas;
    var ctx;
    var fillColor;
    var isMobile;

    function Fractal(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        //set the fillColor value
        this.newFillColor();

        this.isMobile = checkMobile();
    }

    Fractal.prototype.draw = function(event) {
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;

        if (event) {
            var mousePos = getMousePos(this.canvas, event);
        } else {
            var mousePos = {x: centerX, y: centerY};
        }

        if (this.isMobile) {
            var distanceFromCenter = 75;
        } else {
        var distanceFromCenter = distance(centerX, centerY, mousePos.x, mousePos.y);
        }

        if (distanceFromCenter * 1.5 < 15) {
            this.newFillColor();
        }

        this.drawRecursiveSquare(centerX, centerY, distanceFromCenter * 1.5);
    }

    //Draws a "pyramid" of circles, each half the size of the previous until the radius drops below 5
    Fractal.prototype.drawRecursiveCircle = function(x, y, radius) {

        //Draw the ellipse
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, radius, radius, 0, 0, 2 * Math.PI);
        this.ctx.fill();

        //Set the fill color for the next tier of circles
        this.ctx.fillStyle = proColor.colorFromRange(this.fillColor);

        var halfRadius = radius / 2;
        if (radius > 10) {
            this.drawRecursiveCircle(x + radius, y, halfRadius);
            this.drawRecursiveCircle(x - radius, y, halfRadius);
            this.drawRecursiveCircle(x, y + radius, halfRadius);
            this.drawRecursiveCircle(x, y - radius, halfRadius);
        }
    }

    Fractal.prototype.drawRecursiveSquare = function(x, y, radius) {
        var minX = x - radius;
        var minY = y - radius;
        var maxX = x + radius;
        var maxY = y + radius;

        //Don't draw if the square is completely off the screen
        if (maxX > 0 || minX < this.canvas.width || maxY > 0 || minY < this.canvas.height) {
            //Set the fill color for the next tier of squares
            this.ctx.fillStyle = proColor.colorFromRange(this.fillColor);

            //Calculate half the "radius"
            var halfRadius = radius / 2;

            //Calculate the diameter (width) of the square
            var diameter = radius * 2; 

            //Draw the square
            //ctx.fillRect(x - radius, y - radius, diameter, diameter);
            this.ctx.beginPath();
            this.ctx.moveTo(x, y - radius);
            this.ctx.lineTo(x + radius, y);
            this.ctx.lineTo(x, y + radius);
            this.ctx.lineTo(x - radius, y);
            this.ctx.lineTo(x, y - radius);
            this.ctx.fill();
        }
        
        if (radius > 20)
        {
            this.drawRecursiveSquare(x + radius, y, halfRadius);
            this.drawRecursiveSquare(x - radius, y, halfRadius);
            this.drawRecursiveSquare(x, y + radius, halfRadius);
            this.drawRecursiveSquare(x, y - radius, halfRadius);
        }
    }

    Fractal.prototype.newFillColor = function() {
        this.fillColor = Math.trunc((Math.random() * 8) + 4);

        //change the colored items on the page to the new color
        changeColors(this.fillColor);
    }

    function distance(x1, y1, x2, y2) {
        var a = x1 - x2;
        var b = y1 - y2;

        var c = Math.sqrt(a * a + b * b);
        return c;
    }

    //Returns the x and y coordinates of the mouse position as properties
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    return Fractal;
}();