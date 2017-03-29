//guarantees app exists
var app = app || {};
"use strict";

app.Tree = function() {

    //Globals
    var gStartingX; //x coordinate of the base of the tree, defaulted to 0
    var gStartingY; //y coordinate of the base of the tree, defaulted to 0
    var gStrokeStyle;
    var gLineCap = "round";
    var gStartingLength;
    var gStartingLineWidth = 1;
    var gCurrentLineWidth;
    var gTheta;
    var gFalloff = 0.7;
    var canvas;
    var ctx;

    function Tree(thatCanvas, x, y, strokeStyle, startingLength) {
        //"optional parameters"
        strokeStyle = strokeStyle || "black";
        startingLength = startingLength || 50;

        //set initial values 
        this.gStrokeStyle = strokeStyle;
        this.gStartingLength = startingLength;
        this.gStartingX = x;
        this.gStartingY = y;

        //set up canvas
        this.canvas = thatCanvas;
        this.ctx = this.canvas.getContext("2d");

        this.ctx.lineWidth = gStartingLineWidth;
    }

    Tree.prototype.setAngle = function(theta) {
        this.gTheta = theta;
    }

    Tree.prototype.getAngle = function() {
        return this.gTheta;
    }

    Tree.prototype.getStrokeStyle = function() {
        return this.gStrokeStyle;
    }

    Tree.prototype.getStartingLength = function() {
        return this.gStartingLength;
    }

    Tree.prototype.getX = function() {
        return this.gStartingX;
    }

    Tree.prototype.getY = function() {
        return this.gStartingY;
    }

    Tree.prototype.draw = function() {
        this.ctx.save();

        gCurrentLineWidth = gStartingLineWidth;
        this.ctx.strokeStyle = this.gStrokeStyle;
        this.ctx.lineCap = gLineCap;
        this.ctx.beginPath();
        this.drawBranch(this.gStartingX, this.gStartingY, this.gStartingLength);
        this.ctx.stroke();

        this.ctx.restore();
    }

    Tree.prototype.drawBranch = function(x, y, length, rotation) {
        rotation = rotation || 0;

        this.ctx.lineWidth = gCurrentLineWidth;
        //--gCurrentLineWidth;
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(0, -length);
        
        if (length > 10)
        {
            //save the context and call drawBranch after rotating the canvas
            this.ctx.save();
            this.drawBranch(0, -length, length * gFalloff, this.gTheta);
            this.ctx.restore();

            this.ctx.save();
            this.drawBranch(0, -length, length * gFalloff, -this.gTheta);
            this.ctx.restore();
        }
    }

    return Tree;
}();