

function Circle(x, y, radius, color) {
    this.body = Bodies.circle(x, y, radius);
    this.radius = radius;
    World.add(world, this.body);

    //Called every frame
    this.show = function() {
        fill(color);
        
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        ellipse(0, 0, this.radius * 2);
        pop();
    }

    this.applyForce = function(position, force) {
        Body.applyForce(this.body, position, force);
    }

    this.isOffScreen = function() {
        var pos = this.body.position;

        return (pos.x + this.radius < 0 ||
                pos.y + this.radius < 0 ||
                pos.x - this.radius > width ||
                pos.y - this.radius > height);
    }

    this.removeFromWorld = function() {
        World.remove(world, this.body);
    }
}