var app = app || {};
"use strict";

app.Timer = function(){

    var ctx;
    var timeLimit;
    var currentTime;
    var pauseTime;
    var timeAtPause;
    var x;
    var y;
    var startTime;
    var hasStarted;
    var isPaused;
    var prevTime;

    //color data
    var currentColor;
    var startingColor
    var colorStep;
    var colorDireciton; //determines whetehr you need to add or subtract color step

    function Timer(ctx, timeLimit, x, y, _startingColor, endingColor) {
        this.ctx = ctx;
        this.timeLimit = timeLimit;
        this.startingColor = _startingColor;
        this.x = x;
        this.y = y;
        this.hasStarted = false;
        this.isPaused = false;
        this.pauseTime = 0;

        //set color data
        this.currentColor = {
            h: this.startingColor.h,
            s: this.startingColor.s,
            l: this.startingColor.l
        };
        this.colorStep = {
            h: 0,
            s: 0,
            l: 0
        };
        this.colorDireciton = {
            h: 0,
            s: 0,
            l: 0
        };

        if (this.startingColor.h < endingColor.h) {
            this.colorStep.h = (endingColor.h - this.startingColor.h) / this.timeLimit;
            this.colorDireciton.h = 1;
        } else {
            this.colorDireciton.h = -1;
            this.colorStep.h = (this.startingColor.h - endingColor.h) / this.timeLimit;
        }
        if (this.startingColor.s < endingColor.s) {
            this.colorStep.s = (endingColor.s - this.startingColor.s) / this.timeLimit;
            this.colorDireciton.s = 1;
        } else {
            this.colorDireciton.s = -1;
            this.colorStep.s = (this.startingColor.s - endingColor.s) / this.timeLimit;
        }
        if (this.startingColor.l < endingColor.l) {
            this.colorStep.l = (endingColor.l - this.startingColor.l) / this.timeLimit;
            this.colorDireciton.l = 1;
        } else {
            this.colorDireciton.l = -1;
            this.colorStep.l = (this.startingColor.l - endingColor.l) / this.timeLimit;
        }
    }

    Timer.prototype.reset = function(timeLimit) {
        this.timeLimit;
        this.hasStarted = false;
        this.isPaused = false;
        this.pauseTime = 0;
        this.resetColor();
    }

    Timer.prototype.updateAndDraw = function() {
        var d = new Date();

        if (this.isPaused && this.hasStarted) {
            this.isPaused = false;
            this.pauseTime += (d.getTime() - this.timeAtPause);
        }

        //get the current date in milliseconds
        if (!this.hasStarted) {
            this.startTime = d.getTime();
            this.prevTime = this.startTime;
            this.hasStarted = true;
            this.isPaused = false;
        }

        this.currentTime = this.startTime + this.pauseTime - d.getTime();
        this.currentTime = this.timeLimit + this.currentTime / 1000;

        if (this.currentTime <= this.prevTime - 1) {
            this.currentColor.h += (this.colorDireciton.h * this.colorStep.h);
            this.currentColor.s += (this.colorDireciton.s * this.colorStep.s);
            this.currentColor.l += (this.colorDireciton.l * this.colorStep.l);

            this.prevTime = this.currentTime;
        }

        if (this.currentTime < 1) {
            //console.log(this.currentColor);
        }

        this.ctx.save();
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "400pt Fira Sans";
        this.ctx.fillStyle = this.formatCurrentColor();
        this.ctx.fillText("" + Math.trunc(this.currentTime), this.x, this.y);
        this.ctx.restore();
    }

    Timer.prototype.draw = function() {
        if (!this.isPaused) {
            var d = new Date();
            this.timeAtPause = d.getTime();
            this.isPaused = true;
            if(!this.hasStarted) {
                this.currentTime = this.timeLimit;
            }
        }

        this.ctx.save();
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "400pt Fira Sans";
        this.ctx.fillStyle = this.formatCurrentColor();
        this.ctx.fillText("" + Math.trunc(this.currentTime), this.x, this.y);
        this.ctx.restore();
    }

    Timer.prototype.calculateDeltaTime = function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	}

    Timer.prototype.formatCurrentColor = function() {
        return "hsl(" + this.currentColor.h + "," + this.currentColor.s + "%," + this.currentColor.l + "%)";
    }

    Timer.prototype.resetColor = function() {
        //This is so dumb there has to be a better way
        var h = this.startingColor.h;
        var s = this.startingColor.s;
        var l = this.startingColor.l;
        this.currentColor.h = h;
        this.currentColor.s = s;
        this.currentColor.l = l;
    }
    return Timer;
}();