"use strict";

var tree = (function() {

    //Globals
    var gStartingX = 0; //x coordinate of the base of the tree, defaulted to 0
    var gStartingY = 0; //y coordinate of the base of the tree, defaulted to 0
    var gStrokeStyle = "black";
    var gLineCap = "round";
    var gStartingLength = 150;
    var gStartingLineWidth = 1;
    var gCurrentLineWidth;
    var gTheta = Math.PI / 6;
    var gFalloff = 0.7;
    var canvas;
    var ctx;


    function treeInit() {
        canvas = document.querySelector("canvas");
        ctx = canvas.getContext("2d");
        ctx.lineWidth = gStartingLineWidth;
    }

    function setTheta(theta) {
        gTheta = theta;
    }

    function draw() {
        ctx.save();

        gCurrentLineWidth = gStartingLineWidth;
        ctx.strokeStyle = gStrokeStyle;
        ctx.lineCap = gLineCap;
        ctx.beginPath();
        drawBranch(gStartingX, gStartingY, gStartingLength);
        ctx.stroke();

        ctx.restore();
    }

    function drawBranch(x, y, length, rotation = 0) {


        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.moveTo(0, 0); //Don't know whether ot not it automatically draws from 0, 0
        ctx.lineTo(0, -length);
        

        if (length > 10)
        {
            //save the context and call drawBranch after rotating the canvas
            ctx.save();
            drawBranch(0, -length, length * gFalloff, gTheta);
            ctx.restore();

            ctx.save();
            drawBranch(0, -length, length * gFalloff, -gTheta);
            ctx.restore();
        }
    }

    return {
        draw: draw,
        init: treeInit,
        getAngle: gTheta,
        setAngle: setTheta
    };
}());

//tree is a reference to the object that contains the return values