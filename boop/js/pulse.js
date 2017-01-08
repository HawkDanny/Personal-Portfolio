var app = app || {};
"use strict";

app.Pulse = function() {

    var color;
    var ctx;
    var done; //a bool that becomes true when the effect is done
    var counter;
    var x;
    var y;
    var numCalls;
    var radius;

    function Pulse(ctx, x, y, color, startingRadius) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = startingRadius;

        this.counter = 0;
        this.done = false;
        this.numCalls = 5;
    }

    Pulse.prototype.updateAndDraw = function() {
        if (this.counter > this.numCalls) {
            this.done = true;
        } else {
            this.ctx.save();

            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = 10;
            this.ctx.beginPath;
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.ctx.stroke();

            this.ctx.restore();

            this.radius += 2;
        }
    }

    return Pulse;
}