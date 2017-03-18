"use strict";
app.SmileSprite = function(){

	function SmileSprite(image,width,height,frameWidth,frameHeight,frameDelay) {
		this.x = 0;
		this.y = 0;
		this.width = width;
		this.height = height;
		this.xVelocity = 0
		this.yVelocity = 0;
		this.image = image;
		this.color = "red";
		this.active = true;
		
		// new
		this.frameWidth = frameWidth;
		this.frameHeight = frameHeight;
		this.frameDelay = frameDelay;
		this.numCols = Math.floor(this.image.width/this.frameWidth);
		this.numRows = Math.floor(this.image.height/this.frameHeight);
		this.totalFrames = this.numCols * this.numRows;
		this.frameIndex = 0;
		this.lastTime = 0;
	};
		
	var p = SmileSprite.prototype;
	
  	p.draw = function(ctx) {
		var halfW = this.width/2;
		var halfH = this.height/2;
		if(!this.image){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);
			
		} else{
			var col =  this.frameIndex % this.numCols;
			var row =  Math.floor(this.frameIndex / this.numCols);
			var imageX = col * this.frameWidth;
			var imageY = row * this.frameHeight;
			ctx.drawImage(this.image, imageX, imageY, this.frameWidth, this.frameHeight, this.x, this.y, this.width - halfW, this.height - halfH); 
		}		
	  };
	
	  p.update = function(dt) {
		this.lastTime += dt;
		if(this.lastTime >= this.frameDelay){
			this.lastTime = 0;
			this.frameIndex ++;
		}
		if(this.frameIndex >= this.totalFrames){
			//this.frameIndex = 0; // if we wanted to loop
			this.active = false;
		}
	  };
	return SmileSprite;
}();