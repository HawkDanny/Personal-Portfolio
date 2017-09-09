

function Box(x, y, w, h, color, density) {
    this.body = Bodies.rectangle(x, y, w, h, {density: density});
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    //Called every frame
    this.show = function() {
        fill(color);
        
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        rect(0, 0, this.w, this.h);
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