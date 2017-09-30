function Letter(x, y, color, letter, size, density) {
    textSize(size);
    this.w = textWidth(letter);
    this.h = textSize() * 0.75; //0.75 to get ride of the spacing that accompanies the font
    this.body = Bodies.rectangle(x, y, this.w, this.h, {density: density});
    this.letter = letter;
    World.add(world, this.body);

    //Called every frame
    this.show = function() {
        fill(color);
        
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        textAlign(CENTER);
        text(letter, 0, this.h / 2); //h / 2 because there is no way to vertically center the text
        pop();
    }

    this.applyForce = function(position, force) {
        Body.applyForce(this.body, position, force);
    }

    this.isOffScreen = function() {
        var pos = this.body.position;

        return (pos.x + this.w/2 < 0 ||
                pos.y + this.h/2 < 0 ||
                pos.x - this.w/2 > width ||
                pos.y - this.h/2 > height);
    }

    this.removeFromWorld = function() {
        World.remove(world, this.body);
    }
}