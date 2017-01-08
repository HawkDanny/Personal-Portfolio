var app = app || {};
"use strict";

app.Sound = (function(){
	var bgAudio = undefined;
	var effectAudio = undefined;
	

	function init() {
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume=0.25;
		effectAudio = document.querySelector("#effectAudio");
		effectAudio.volume = 0.1;
	}
		
	function stopBGAudio() {
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}

	function pauseBGAudio() {
		bgAudio.pause();
	}

	function playBGAudio() {
		bgAudio.play();
	}
	
	function playEffect() {
		effectAudio.play();
	}
		
	return {
		init: init,
		stopBGAudio: stopBGAudio,
		pauseBGAudio: pauseBGAudio,
		playEffect: playEffect,
		playBGAudio: playBGAudio
	};
}());