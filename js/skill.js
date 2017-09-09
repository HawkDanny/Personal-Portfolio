

function Skill(x, y, radius, color, label) {
    this.body = Bodies.circle(x, y, radius, {
        frictionAir: 0.05   
    });
    this.radius = radius;
    this.label = label;
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

    //Called every frame, after the initial draw call
    this.showText = function() {
        fill(unhex(["26", "21", "21"]));
        textSize(radius / 2);
        
        var pos = this.body.position;

        push();
        translate(pos.x, pos.y);
        text(label, radius + 5, textSize() / 4);
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