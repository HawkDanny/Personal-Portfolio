var app = app || {};
"use strict";

app.Trail = function() {

    var color;
    var ctx;
    var startingSize;
    var numCallsBetweenCircs;
    var decrementor;
    var circPositions;
    var circRadii;
    var numCircs;
    var numCurrentCircs;
    var counter;

    function Trail(ctx, color, startingSize) {
        this.ctx = ctx;
        this.color = color;
        this.startingSize = startingSize;

        this.circPositions = [];
        this.circRadii = [];
        this.numCircs = 6;
        this.counter = 0;
        this.numCurrentCircs = 0;
        this.numCallsBetweenCircs = 3;
        this.decrementor = this.startingSize / (this.numCallsBetweenCircs * this.numCircs);
        for (var i = 0; i < this.numCircs; i++) {
            this.circRadii[i] = startingSize;
        }
    }

    //call this every frame
    Trail.prototype.update = function(x, y) {
        //if numCallsBetweenCircs frames have passed, then add a new circle
        if (this.counter % this.numCallsBetweenCircs == 0) {
            var index = (this.counter / this.numCallsBetweenCircs) % 6;

            this.circPositions[index] = new Victor(x, y);
            this.circRadii[index] = this.startingSize;

            //record how many circles are currently in the trail
            if (this.numCurrentCircs < 6) {
                this.numCurrentCircs++;
            } else {
                this.numCurrentCircs = 6;
            }
        }

        //loop through the circles and decrease their size
        for (var i = 0; i < this.numCurrentCircs; i++) {
            this.circRadii[i] -= this.decrementor;
            if (this.circRadii[i] < 0) {
                this.circRadii[i] = 0;
            }
        }

        this.counter++;
    }

    Trail.prototype.draw = function() {
        //loop through the circles and draw them
        for (var i = 0; i < this.numCurrentCircs; i++) {
            this.ctx.save();
            this.ctx.fillStyle = this.color;
            this.ctx.beginPath();
            this.ctx.arc(this.circPositions[i].x, this.circPositions[i].y, this.circRadii[i], 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    Trail.prototype.clear = function() {
        this.circPositions = [];
        this.circRadii = [];
    }

    return Trail;
}();