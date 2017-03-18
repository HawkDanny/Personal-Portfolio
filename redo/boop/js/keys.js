/**
 * A globally accessible key daemon that solves the problem of multiple input
 * 
 * In the future, myKeys can also contain data for key rebinding
 */

"use strict";

//an object that contains an enum of keyboard keywords, and an array of all of the keys that are currently down
var myKeys = {};

myKeys.KEYBOARD = Object.freeze({
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_SHIFT": 16
});

//boolean array of keys currently presssed, accessed by keyCode
myKeys.keydown = [];


//sets the corresponding element in the array to true based on keyCode
window.addEventListener("keydown",function(e){
    //console.log("keydown=" + e.keyCode);
	myKeys.keydown[e.keyCode] = true;
});

//sets the corresponding element in the array to true based on keyCode, also sets the bind for pausing the game
window.addEventListener("keyup",function(e){
	myKeys.keydown[e.keyCode] = false;
	
	// pausing and resuming
	var char = String.fromCharCode(e.keyCode);
	if (char == "p" || char == "P"){
		if (app.Main.paused) {
			app.Main.resumeGame();
		} else {
			app.Main.pauseGame();
		}
	}
	if (char == "f" || char == "F") {
		app.Main.toggleDebug();
	}
});