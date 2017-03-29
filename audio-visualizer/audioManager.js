var app = app || {};
"use strict";

app.AudioManager = function() {
    var NUM_SAMPLES = 256;
    var SOUND_1 = "media/TheOrientation.mp3";
    var SOUND_2 = "media/DisarmYou.mp3";
    var SOUND_3 = "media/ItsYourWorld.mp3";
    var SOUND_$ = "media/MyFunnyValentine.mp3";
    var audioElement;
	var analyserNode;
    var delayAmount = 0.0;
    var delayNode;
	var canvas
    var ctx;
    var data;

    function AudioManager() {
        //set up the canvas
        canvas = document.querySelector("canvas");
		ctx = canvas.getContext("2d");

        // get reference to <audio> element on page
		audioElement = document.querySelector("audio");

        // call our helper function and get an analyser node
        analyserNode = createWebAudioContextWithAnalyserNode(audioElement);
        
        // get sound track <select> working
        setupUI();
        
        // load and play default sound into audio element
        playStream(audioElement,SOUND_1);
    }

    function createWebAudioContextWithAnalyserNode(audioElement) {
        var audioCtx, analyserNode, sourceNode;
        // create new AudioContext
        // The || is because WebAudio has not been standardized across browsers yet
        // http://webaudio.github.io/web-audio-api/#the-audiocontext-interface
        audioCtx = new (window.AudioContext || window.webkitAudioContext);
        
        // create an analyser node
        analyserNode = audioCtx.createAnalyser();

        delayNode = audioCtx.createDelay();
        delayNode.delayTime.value = delayAmount;
        
        /*
        We will request NUM_SAMPLES number of samples or "bins" spaced equally 
        across the sound spectrum.
        
        If NUM_SAMPLES (fftSize) is 256, then the first bin is 0 Hz, the second is 172 Hz, 
        the third is 344Hz. Each bin contains a number between 0-255 representing 
        the amplitude of that frequency.
        */ 
        
        // fft stands for Fast Fourier Transform
        analyserNode.fftSize = NUM_SAMPLES;
        
        // this is where we hook up the <audio> element to the analyserNode
        sourceNode = audioCtx.createMediaElementSource(audioElement); 
        sourceNode.connect(audioCtx.destination);

        sourceNode.connect(delayNode);
        delayNode.connect(analyserNode);
        analyserNode.connect(audioCtx.destination);
        
        // here we connect to the destination i.e. speakers
        //analyserNode.connect(audioCtx.destination);
        return analyserNode;
    }

    function setupUI(){
        document.querySelector("#trackSelect").onchange = function(e){
            playStream(audioElement,e.target.value);
        };
    }

    function playStream(audioElement, path){
        audioElement.src = path;
        audioElement.play();
        audioElement.volume = 1.0;
        document.querySelector('#status').innerHTML = "Now playing: " + path;
    }

    AudioManager.prototype.update = function(isFrequency) {
        //create a new array of 8-bit integers (0-255)
	    data = new Uint8Array(NUM_SAMPLES/2);

        if (isFrequency) {
            analyserNode.getByteFrequencyData(data);
        } else {
            analyserNode.getByteTimeDomainData(data);
        }

        delayNode.delayTime.value = delayAmount;
    }

    AudioManager.prototype.getData = function() {
        return data;
    }

    AudioManager.prototype.setDelay = function(dAmount) {
        delayAmount = dAmount;
    }

    return AudioManager;
}();