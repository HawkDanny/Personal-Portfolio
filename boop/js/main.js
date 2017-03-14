var app = app || {};
"use strict";

//globally accessible boolean that controls the debug state
var debug = true;

app.Main = {
    /* PROPERTIES */
    //modules
    resize: undefined,
    sound: undefined,

    //Necessary canvas materials
    canvas: undefined,
    ctx: undefined,

    //mouse position vector
    mousePos: undefined,

    //Animation information
    animationID: 0,

    //Images
    smile: undefined,
    titleImage: undefined,

    //game state information
    GAMESTATE: Object.freeze({
        TITLESCREEN: 0,
        GAME: 1,
        GAMEOVERSCREEN: 2
    }),
    currentGS: undefined, //the current game state of the game
    paused: false,

    //Joints
    joints: [],

    //Handle keyInput
    keyWasDown: [],

    //timers
    timer1: undefined,
    timer2: undefined,
    runTimer1: undefined,
    runTimer2: undefined,

    //trails
    trail1: undefined,
    trail2: undefined,

    //array of pulses
    pulses: [],

    //controller movement magnitude
    movementMag: undefined,

    //Canvas elements are initialized seperately because they're needed for resize.js
    initCanvasElements: function() {
        this.canvas = document.querySelector("#mainCanvas");
        this.ctx = this.canvas.getContext("2d");
    },

    //initializes starting values and begins the game loop
    init: function() {
        //resize the canvas
        this.resizeCanvas();

        //set the game state
        this.currentGS = this.GAMESTATE.TITLESCREEN;

        //set the mouse position to a vector
        this.mousePos = new Victor(0, 0);

        //set the movement magnitude
        this.movementMag = 1;

        //retrieve the Images
        this.titleImage = document.querySelector("#title");

        //set the timers
        this.timer1 = new app.Timer(this.ctx, 30.00, this.canvas.width / 4, this.canvas.height / 2, {h:40,s:33,l:74}, {h:168,s:39,l:70});
        this.timer2 = new app.Timer(this.ctx, 30.00, (this.canvas.width / 4) * 3, this.canvas.height / 2, {h:40,s:33,l:74}, {h:13,s:62,l:52});

        //populate the list of joints
        this.populateJoints();

        //create trails for the controllers
        this.trail1 = new app.Trail(this.ctx, "#D05938", 50);
        this.trail2 = new app.Trail(this.ctx, "#95D1C5", 50);

        //start music
        this.sound.playBGAudio();

        //first call of update
        this.update();
    },

    //calculates changing values, called once per frame
    update: function() {
        this.animationID = requestAnimationFrame(this.update.bind(this));

        //Only execute calculations pertinent to the current state of the game
        if (this.currentGS == this.GAMESTATE.TITLESCREEN) {
            this.updateControls();
        } else if (this.currentGS == this.GAMESTATE.GAME) {
            if (this.paused) {
                //nothing to calculate currently
            } else {
                //WINNING GAME STATE
                if (this.timer1.currentTime < 1 || this.timer2.currentTime < 1) {
                    this.currentGS = this.GAMESTATE.GAMEOVERSCREEN;
                }

                //update which timer should run
                if (this.joints[0].position.x < this.canvas.width / 2) {
                    this.runTimer1 = true;
                    this.runTimer2 = false;
                } else if (this.joints[0].position.x > this.canvas.width / 2) {
                    this.runTimer1 = false;
                    this.runTimer2 = true;
                } else {
                    this.runTimer1 = false;
                    this.runTimer2 = false;
                }

                this.updateControls();

                //update joints and check collisions
                for (var i = 0; i < this.joints.length; i++) {
                    this.joints[i].update();

                    for (var j = 0; j < this.joints.length; j++) {
                        if (i == j) {
                            continue;
                        } else if (this.joints[i].collider.isColliding(this.joints[j].collider)) {
                            if (i == 0 || j == 0) {
                                this.sound.playEffect();
                            }
                            this.joints[i].resolveCollision(this.joints[j]);
                        }
                    }
                }

                //update trails
                this.trail1.update(this.joints[1].position.x, this.joints[1].position.y);
                this.trail2.update(this.joints[2].position.x, this.joints[2].position.y);
            }
        } else if (this.currentGS == this.GAMESTATE.GAMEOVERSCREEN) {
            //The gamestate is being checked in updateControls, which calls changeGameState
            this.updateControls();
        }
        this.draw();
    },

    //draws everything to the screen, called once per frame after update
    draw: function() {
        this.clear();
        this.ctx.fillStyle = "#E3D5B8";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        //Only draws to the screen what is pertinent to the current game state
        if (this.currentGS == this.GAMESTATE.TITLESCREEN) {
            this.ctx.drawImage(this.titleImage, (this.canvas.width / 2) - 576, (this.canvas.height / 3) - 159, 1152, 317);

            this.ctx.save();
            this.ctx.textAlign = "left";
            this.ctx.textBaseline = "middle";
            this.ctx.font = "128pt Fira Sans";
            this.ctx.fillStyle = "black";
            this.ctx.fillText("BOOP", 0, this.canvas.height - 70);
            this.ctx.textAlign = "right";
            this.ctx.textBaseline = "middle";
            this.ctx.font = "32pt Fira Sans";
            this.ctx.fillText("PRESS SPACE TO BEGIN", this.canvas.width - 10, this.canvas.height - 50);
            this.ctx.fillStyle = "#444444";
            this.ctx.font = "16pt Fira Sans";
            this.ctx.fillText("A GAME BY DANNY HAWK", this.canvas.width - 10, this.canvas.height - 20);
            this.ctx.restore();
        } else if (this.currentGS == this.GAMESTATE.GAME) {
            if (this.paused) {
                this.ctx.save();
                this.ctx.textAlign = "center";
                this.ctx.textBaseline = "middle";
                this.ctx.font = "32pt Fira Sans";
                this.ctx.fillStyle = "#444444";
                this.ctx.fillText("PAUSED", this.canvas.width / 2, this.canvas.height /2);
                this.ctx.restore();
            } else {
                this.ctx.beginPath();
                this.ctx.strokeStyle = "#D3C5A8";
                this.ctx.moveTo(this.canvas.width / 2, 0);
                this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
                this.ctx.stroke();

                //draw timers
                if (this.runTimer1) {
                    this.timer1.updateAndDraw();
                } else {
                    this.timer1.draw();
                }
                if (this.runTimer2) {
                    this.timer2.updateAndDraw();
                } else {
                    this.timer2.draw();
                }

                //draw trails
                this.trail1.draw();
                this.trail2.draw();

                //draw joints
                for (var i = 0; i < this.joints.length; i++) {
                    this.joints[i].draw(this.ctx);
                }
            }
        } else if (this.currentGS == this.GAMESTATE.GAMEOVERSCREEN) {
            this.ctx.save();
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.font = "148pt Fira Sans";
            this.ctx.fillStyle = "#444444";
            if (this.timer1.currentTime < 1) {
                this.ctx.fillStyle = "#95D1C5";
                this.ctx.fillText("BLUE WINS", this.canvas.width / 2, this.canvas.height /2);
            } else if (this.timer2.currentTime < 1) {
                this.ctx.fillStyle = "#D05938";
                this.ctx.fillText("ORANGE WINS", this.canvas.width / 2, this.canvas.height /2);
            }
            this.ctx.fillStyle = "#444444";
            this.ctx.font = "16pt Fira Sans";
            this.ctx.fillText("Press Space to Restart the Game", this.canvas.width / 2, this.canvas.height / 2 + 95);
            this.ctx.restore();

            this.timer1.reset(30);
            this.timer2.reset(30);
            this.joints[0].velocity = new Victor(0, 0);
            this.joints[1].velocity = new Victor(0, 0);
            this.joints[2].velocity = new Victor(0, 0);
            this.joints[0].position = new Victor(this.canvas.width / 2, this.canvas.height / 2);
            this.joints[1].position = new Victor((this.canvas.width / 4), this.canvas.height / 2);
            this.joints[2].position = new Victor((this.canvas.width / 4) * 3, this.canvas.height / 2);
        }
    },

    //resizes both the width and height of the canvas to fit the window
    resizeCanvas: function() {
        this.resize.resizeWidth();
        this.resize.resizeHeight();
    },

    //clears the screen of the current ctx
    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    //create boundaries out of joints/colliders for the canvas
    createWalls: function() {
        var wallThickness = 100;
        var halfWallThickness = wallThickness / 2;
        var halfWidth = this.canvas.width / 2;
        var halfHeight = this.canvas.height / 2;

        //ceiling
        this.joints.push(new app.Joint(this.canvas, new Victor(halfWidth, -halfWallThickness), 1.0, 0));
        this.joints[this.joints.length - 1].initColliderProperties(colliderType.AABB, this.canvas.width + 2 * wallThickness, wallThickness);
        this.joints[this.joints.length - 1].affectedByGravity = false;

        //right wall
        this.joints.push(new app.Joint(this.canvas, new Victor(this.canvas.width + halfWallThickness, halfHeight), 1.0, 0));
        this.joints[this.joints.length - 1].initColliderProperties(colliderType.AABB, wallThickness, this.canvas.height);
        this.joints[this.joints.length - 1].affectedByGravity = false;

        //floor
        this.joints.push(new app.Joint(this.canvas, new Victor(halfWidth, this.canvas.height + halfWallThickness), 1.0, 0));
        this.joints[this.joints.length - 1].initColliderProperties(colliderType.AABB, this.canvas.width + 2 * wallThickness, wallThickness);
        this.joints[this.joints.length - 1].affectedByGravity = false;

        //left wall
        this.joints.push(new app.Joint(this.canvas, new Victor(-halfWallThickness, halfHeight), 1.0, 0));
        this.joints[this.joints.length - 1].initColliderProperties(colliderType.AABB, wallThickness, this.canvas.height);
        this.joints[this.joints.length - 1].affectedByGravity = false;
    },

    //pauses the corresponding features when pause game is toggled
    pauseGame: function() {
		this.paused = true;

        app.Sound.pauseBGAudio();

		cancelAnimationFrame(this.animationID);

        //called once to render the pause screen frame
		this.update();
	},

    //resumes the corresponding features when the game is unpaused
	resumeGame: function() {
		cancelAnimationFrame(this.animationID);

        app.Sound.playBGAudio();

		this.paused = false;

        //called to resume the gameloop
		this.update();
	},

    //toggles the global debug boolean to the opposite of what it currently is
    toggleDebug: function() {
		debug = !debug;
	},

    //returns an object with the x and y coordinates of the mouse
    setMousePos: function(event) {
        var rect = this.canvas.getBoundingClientRect();
        this.mousePos.x = event.clientX - rect.left;
        this.mousePos.y = event.clientY - rect.top;
    },

    //all of the if statements that check keyInput
    updateControls: function() {
        //left controller controls
        if (myKeys.keydown[87]) { //w
            this.keyWasDown[87] = true;
            this.joints[1].addForce(new Victor(0, -this.movementMag));
            this.joints[1].inputDirection.y = -1;
        } else { this.joints[1].inputDirection.y = 0; }
        if (myKeys.keydown[65]) { //a
            this.keyWasDown[65] = true;
            this.joints[1].addForce(new Victor(-this.movementMag, 0));
            this.joints[1].inputDirection.x = -1;
        } else { this.joints[1].inputDirection.x = 0; }
        if (myKeys.keydown[83]) { //s
            this.keyWasDown[83] = true;
            this.joints[1].addForce(new Victor(0, this.movementMag));
            this.joints[1].inputDirection.y = 1;
        }
        if (myKeys.keydown[68]) { //d
            this.keyWasDown[68] = true;
            this.joints[1].addForce(new Victor(this.movementMag, 0));
            this.joints[1].inputDirection.x = 1;
        }

        //right controller controls
        if (myKeys.keydown[38]) { //up
            this.keyWasDown[38] = true;
            this.joints[2].addForce(new Victor(0, -this.movementMag));
            this.joints[2].inputDirection.y = -1;
        } else { this.joints[2].inputDirection.y = 0; }
        if (myKeys.keydown[37]) { //left
            this.keyWasDown[37] = true;
            this.joints[2].addForce(new Victor(-this.movementMag, 0));
            this.joints[2].inputDirection.x = -1;
        } else { this.joints[2].inputDirection.x = 0; }
        if (myKeys.keydown[40]) { //down
            this.keyWasDown[40] = true;
            this.joints[2].addForce(new Victor(0, this.movementMag));
            this.joints[2].inputDirection.y = 1;
        }
        if (myKeys.keydown[39]) { //right
            this.keyWasDown[39] = true;
            this.joints[2].addForce(new Victor(this.movementMag, 0));
            this.joints[2].inputDirection.x = 1;
        }

        //spacebar
        if (myKeys.keydown[32]) {
            if (!this.keyWasDown[32]) {
                //Apply boost to balls
                this.joints[1].bump();
                this.joints[2].bump();
            }

            this.keyWasDown[32] = true;
        }

        if (!(myKeys.keydown[87]) && this.keyWasDown[87]) {
            this.joints[1].brake();
            this.keyWasDown[87] = false;
        }
        if (!(myKeys.keydown[65]) && this.keyWasDown[65]) {
            this.joints[1].brake();
            this.keyWasDown[65] = false;
        }
        if (!(myKeys.keydown[83]) && this.keyWasDown[83]) {
            this.joints[1].brake();
            this.keyWasDown[83] = false;
        }
        if (!(myKeys.keydown[68]) && this.keyWasDown[68]) {
            this.joints[1].brake();
            this.keyWasDown[68] = false;
        }

        if (!(myKeys.keydown[38]) && this.keyWasDown[38]) {
            this.joints[2].brake();
            this.keyWasDown[38] = false;
        }
        if (!(myKeys.keydown[37]) && this.keyWasDown[37]) {
            this.joints[2].brake();
            this.keyWasDown[37] = false;
        }
        if (!(myKeys.keydown[40]) && this.keyWasDown[40]) {
            this.joints[2].brake();
            this.keyWasDown[40] = false;
        }
        if (!(myKeys.keydown[39]) && this.keyWasDown[39]) {
            this.joints[2].brake();
            this.keyWasDown[39] = false;
        }

        //spacebar
        if (!(myKeys.keydown[32]) && this.keyWasDown[32]) {
            this.keyWasDown[32] = false;
            this.changeGameState();
        }
    },

    clearJoints: function() {
        this.joints = [];
    },

    populateJoints: function() {
        //puck
        this.joints.push(new app.Joint(this.canvas, new Victor(this.canvas.width / 2, this.canvas.height / 2), 0.5, 10));
        this.joints[0].initColliderProperties(colliderType.CIRCLE, 80);
        this.joints[0].affectedByGravity = false;
        this.joints[0].DRAWPROPS.nodeColor = "#AAAAAA";
        this.joints[0].DRAWPROPS.drawNode = true;
        this.joints[0].DRAWPROPS.nodeLineWidth = 2;

        //left controller
        this.joints.push(new app.Joint(this.canvas, new Victor((this.canvas.width / 4), this.canvas.height / 2), 0.01, 50));
        this.joints[1].initColliderProperties(colliderType.CIRCLE, 50);
        this.joints[1].affectedByGravity = false;
        this.joints[1].DRAWPROPS.nodeColor = "#D05938";
        this.joints[1].DRAWPROPS.drawNode = true;
        this.joints[1].DRAWPROPS.nodeLineWidth = 10;
        this.joints[1].brakingMag = 4;

        //right controller
        this.joints.push(new app.Joint(this.canvas, new Victor((this.canvas.width / 4) * 3, this.canvas.height / 2), 0.01, 50));
        this.joints[2].initColliderProperties(colliderType.CIRCLE, 50);
        this.joints[2].affectedByGravity = false;
        this.joints[2].DRAWPROPS.nodeColor = "#95D1C5";
        this.joints[2].DRAWPROPS.drawNode = true;
        this.joints[2].DRAWPROPS.nodeLineWidth = 10;
        this.joints[2].brakingMag = 4;

        //create boundaries out of joints with AABB collision
        this.createWalls();
    },

    //changes the game state based on the current game state
    changeGameState() {
        if (this.currentGS == this.GAMESTATE.TITLESCREEN) {
            this.currentGS = this.GAMESTATE.GAME;
        }
        if (this.currentGS == this.GAMESTATE.GAMEOVERSCREEN) {
            this.resetGame();
            this.currentGS = this.GAMESTATE.TITLESCREEN;
        }
    },

    //resets values to their starting values
    resetGame: function() {
        this.timer1.resetColor();
        this.timer2.resetColor();
        this.trail1.clear();
        this.trail2.clear();
        this.clearJoints();
        this.populateJoints();
    }
};