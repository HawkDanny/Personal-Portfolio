(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const system = require("./system.js");
const turtle = require("./turtle.js");

window.onload = function() {
    //Grab canvas information
    let canvas = document.querySelector("canvas");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let ctx = canvas.getContext("2d");

    //Create and run the L System
    //F->F[+F--F+++F-----F]FF[+F-F]
    //F->++F--F++F[-----F]

    system.createSystem("F", ["F->FF[FF--FFF]+FF"]);
    system.runCycles(5);

    //Create the turtle
    let myTurtle = turtle.create(ctx, canvas.width / 2 - 30, (canvas.height / 5) * 4);
    let theta = (Math.PI * 2) / 25.7;

    //Do some canvas styling
    ctx.fillStyle = "#EEEEEE";
    ctx.strokeStyle = "#222222";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    console.log(system.axiom);
    //Loop through the axiom's letters and operate the turtle accordingly
    for (let i = 0; i < system.axiom.length; i++) {
        let letter = system.axiom.substring(i, i+1);

        if (letter == "F") { //Move forward drawing line
            myTurtle.penDown();
            myTurtle.move(20);
            myTurtle.penUp();
        } else if (letter == "+") { //Turn right by theta degrees
            myTurtle.rotate(-theta);
        } else if (letter == "-") { //Turn left by theta degrees
            myTurtle.rotate(theta);
        } else if (letter == "[") { //Push the current state of the turtle to a stack
            myTurtle.push();
        } else if (letter == "]") { //Pop the last state of the tutle from the stack
            myTurtle.pop();
        }
    }
}
},{"./system.js":2,"./turtle.js":3}],2:[function(require,module,exports){
module.exports = {
    axiom: "",
    ruleset: [],

    //Axiom is a string that contains the seed for the system,
    //and rules is an array of strings that contain any number of rules
    createSystem: function(axiom, rules) {
        this.axiom = axiom;

        this.parseRules(rules);
    },

    parseRules: function(rules) {
        //Loop through the rules provided, and parse them into objects, that are added to ruleset
        for (let i = 0; i < rules.length; i++) {
            let arrowIndex = rules[i].indexOf("->");

            //Use substring to slice up each rule into a target and a rule
            this.ruleset.push({
                target: rules[i].substring(0, arrowIndex),
                rule: rules[i].substring(arrowIndex + 2)
            });
        }
    },

    //The function that should be called by the main method
    runCycles: function(numCycles) {
        for (let i = 0; i < numCycles; i++)
            this.cycle();
    },

    //Runs one iteration of the ruleset
    cycle: function() {
        let temp = this.axiom;
        
        let newString = "";
        //Loop through each letter of the current axiom
        for (let i = 0; i < temp.length; i++) {
            let letter = temp.substring(i, i + 1);

            for (let j = 0; j < this.ruleset.length; j++) {
                //Check if the letter is the same as any rule's target.
                //If it is, brea out of the loop
                if (letter == this.ruleset[j].target) {
                    newString += this.ruleset[j].rule;
                    break;
                }

                //If all rules' targets have been tested, then just add
                //the letter to the new string.
                if (j == this.ruleset.length - 1) {
                    newString += letter;
                }
            }
        }

        this.axiom = newString;
    }
};
},{}],3:[function(require,module,exports){
const Vec2 = require("./victor.js") // substitute vector library of your choice
// pass in canvas context, a starting x and a starting y position
const Turtle = { 
  create( canvas, startX, startY ) {
    const turtle = Object.create( this )
    Object.assign( turtle, {
      canvas,
      weight:1,
      color:'red',
      pos: Vec2( startX, startY ),
      dir: Vec2( 1,0 ) ,
      pen: 1,
      posArray: [],
      dirArray: [],
    })
    turtle.canvas.moveTo( turtle.pos.x, turtle.pos.y )
    return turtle
  },
    
  penUp()   { this.pen = 0 },
    
  penDown() { this.pen = 1 },
    
  push() {
    this.posArray.push( this.pos.clone() )
    this.dirArray.push( this.dir.clone() )
  },
  pop() {
    this.pos = this.posArray.pop()
    this.dir = this.dirArray.pop()
    this.canvas.moveTo( this.pos.x, this.pos.y )
  },
  // THIS IS IN RADIANS!!!
  rotate( amt ) {
    this.dir.rotate( amt )
  },
  move( amt ) {
    if( this.pen ) this.canvas.beginPath()
    this.canvas.moveTo( this.pos.x, this.pos.y )
    this.pos.x += this.dir.x * amt
    this.pos.y += this.dir.y * amt
    if( this.pen ) {
      this.canvas.lineTo( this.pos.x, this.pos.y )
      this.canvas.lineWidth = this.weight
      this.canvas.stroke()
      this.canvas.closePath()
    }else{
      this.canvas.moveTo( this.pos.x, this.pos.y )
    }
  }
}
module.exports = Turtle
},{"./victor.js":4}],4:[function(require,module,exports){
(function (global){
/*!
MIT License
Copyright (c) 2011 Max Kueng, George Crabtree
 
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
!function(t){if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else{var i;"undefined"!=typeof window?i=window:"undefined"!=typeof global?i=global:"undefined"!=typeof self&&(i=self),i.Victor=t()}}(function(){return function t(i,r,n){function o(s,h){if(!r[s]){if(!i[s]){var u="function"==typeof require&&require;if(!h&&u)return u(s,!0);if(e)return e(s,!0);throw new Error("Cannot find module '"+s+"'")}var p=r[s]={exports:{}};i[s][0].call(p.exports,function(t){var r=i[s][1][t];return o(r?r:t)},p,p.exports,t,i,r,n)}return r[s].exports}for(var e="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({1:[function(t,i,r){function n(t,i){return this instanceof n?(this.x=t||0,void(this.y=i||0)):new n(t,i)}function o(t,i){return Math.floor(Math.random()*(i-t+1)+t)}function e(t){return t*h}function s(t){return t/h}r=i.exports=n,n.fromArray=function(t){return new n(t[0]||0,t[1]||0)},n.fromObject=function(t){return new n(t.x||0,t.y||0)},n.prototype.addX=function(t){return this.x+=t.x,this},n.prototype.addY=function(t){return this.y+=t.y,this},n.prototype.add=function(t){return this.x+=t.x,this.y+=t.y,this},n.prototype.addScalar=function(t){return this.x+=t,this.y+=t,this},n.prototype.addScalarX=function(t){return this.x+=t,this},n.prototype.addScalarY=function(t){return this.y+=t,this},n.prototype.subtractX=function(t){return this.x-=t.x,this},n.prototype.subtractY=function(t){return this.y-=t.y,this},n.prototype.subtract=function(t){return this.x-=t.x,this.y-=t.y,this},n.prototype.subtractScalar=function(t){return this.x-=t,this.y-=t,this},n.prototype.subtractScalarX=function(t){return this.x-=t,this},n.prototype.subtractScalarY=function(t){return this.y-=t,this},n.prototype.divideX=function(t){return this.x/=t.x,this},n.prototype.divideY=function(t){return this.y/=t.y,this},n.prototype.divide=function(t){return this.x/=t.x,this.y/=t.y,this},n.prototype.divideScalar=function(t){return 0!==t?(this.x/=t,this.y/=t):(this.x=0,this.y=0),this},n.prototype.divideScalarX=function(t){return 0!==t?this.x/=t:this.x=0,this},n.prototype.divideScalarY=function(t){return 0!==t?this.y/=t:this.y=0,this},n.prototype.invertX=function(){return this.x*=-1,this},n.prototype.invertY=function(){return this.y*=-1,this},n.prototype.invert=function(){return this.invertX(),this.invertY(),this},n.prototype.multiplyX=function(t){return this.x*=t.x,this},n.prototype.multiplyY=function(t){return this.y*=t.y,this},n.prototype.multiply=function(t){return this.x*=t.x,this.y*=t.y,this},n.prototype.multiplyScalar=function(t){return this.x*=t,this.y*=t,this},n.prototype.multiplyScalarX=function(t){return this.x*=t,this},n.prototype.multiplyScalarY=function(t){return this.y*=t,this},n.prototype.normalize=function(){var t=this.length();return 0===t?(this.x=1,this.y=0):this.divide(n(t,t)),this},n.prototype.norm=n.prototype.normalize,n.prototype.limit=function(t,i){return Math.abs(this.x)>t&&(this.x*=i),Math.abs(this.y)>t&&(this.y*=i),this},n.prototype.randomize=function(t,i){return this.randomizeX(t,i),this.randomizeY(t,i),this},n.prototype.randomizeX=function(t,i){var r=Math.min(t.x,i.x),n=Math.max(t.x,i.x);return this.x=o(r,n),this},n.prototype.randomizeY=function(t,i){var r=Math.min(t.y,i.y),n=Math.max(t.y,i.y);return this.y=o(r,n),this},n.prototype.randomizeAny=function(t,i){return Math.round(Math.random())?this.randomizeX(t,i):this.randomizeY(t,i),this},n.prototype.unfloat=function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},n.prototype.toFixed=function(t){return"undefined"==typeof t&&(t=8),this.x=this.x.toFixed(t),this.y=this.y.toFixed(t),this},n.prototype.mixX=function(t,i){return"undefined"==typeof i&&(i=.5),this.x=(1-i)*this.x+i*t.x,this},n.prototype.mixY=function(t,i){return"undefined"==typeof i&&(i=.5),this.y=(1-i)*this.y+i*t.y,this},n.prototype.mix=function(t,i){return this.mixX(t,i),this.mixY(t,i),this},n.prototype.clone=function(){return new n(this.x,this.y)},n.prototype.copyX=function(t){return this.x=t.x,this},n.prototype.copyY=function(t){return this.y=t.y,this},n.prototype.copy=function(t){return this.copyX(t),this.copyY(t),this},n.prototype.zero=function(){return this.x=this.y=0,this},n.prototype.dot=function(t){return this.x*t.x+this.y*t.y},n.prototype.cross=function(t){return this.x*t.y-this.y*t.x},n.prototype.projectOnto=function(t){var i=(this.x*t.x+this.y*t.y)/(t.x*t.x+t.y*t.y);return this.x=i*t.x,this.y=i*t.y,this},n.prototype.horizontalAngle=function(){return Math.atan2(this.y,this.x)},n.prototype.horizontalAngleDeg=function(){return e(this.horizontalAngle())},n.prototype.verticalAngle=function(){return Math.atan2(this.x,this.y)},n.prototype.verticalAngleDeg=function(){return e(this.verticalAngle())},n.prototype.angle=n.prototype.horizontalAngle,n.prototype.angleDeg=n.prototype.horizontalAngleDeg,n.prototype.direction=n.prototype.horizontalAngle,n.prototype.rotate=function(t){var i=this.x*Math.cos(t)-this.y*Math.sin(t),r=this.x*Math.sin(t)+this.y*Math.cos(t);return this.x=i,this.y=r,this},n.prototype.rotateDeg=function(t){return t=s(t),this.rotate(t)},n.prototype.rotateTo=function(t){return this.rotate(t-this.angle())},n.prototype.rotateToDeg=function(t){return t=s(t),this.rotateTo(t)},n.prototype.rotateBy=function(t){var i=this.angle()+t;return this.rotate(i)},n.prototype.rotateByDeg=function(t){return t=s(t),this.rotateBy(t)},n.prototype.distanceX=function(t){return this.x-t.x},n.prototype.absDistanceX=function(t){return Math.abs(this.distanceX(t))},n.prototype.distanceY=function(t){return this.y-t.y},n.prototype.absDistanceY=function(t){return Math.abs(this.distanceY(t))},n.prototype.distance=function(t){return Math.sqrt(this.distanceSq(t))},n.prototype.distanceSq=function(t){var i=this.distanceX(t),r=this.distanceY(t);return i*i+r*r},n.prototype.length=function(){return Math.sqrt(this.lengthSq())},n.prototype.lengthSq=function(){return this.x*this.x+this.y*this.y},n.prototype.magnitude=n.prototype.length,n.prototype.isZero=function(){return 0===this.x&&0===this.y},n.prototype.isEqualTo=function(t){return this.x===t.x&&this.y===t.y},n.prototype.toString=function(){return"x:"+this.x+", y:"+this.y},n.prototype.toArray=function(){return[this.x,this.y]},n.prototype.toObject=function(){return{x:this.x,y:this.y}};var h=180/Math.PI},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
