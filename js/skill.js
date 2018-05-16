

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
        textSize(map(radius, 20, 60, 9, 18));
        
        var pos = this.body.position;
        var angle = this.body.angle;

        //translate(pos.x, pos.y);
        //rotate(angle);
        fill(unhex(["FD", "FD", "FD"])); //the text color
        text(label, pos.x + textWidth(label) / -2, pos.y + textSize() / 4);
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

    this.translate = function(x, y) {
        Body.translate(this.body, {x: x, y: y});
    }

    this.removeFromWorld = function() {
        World.remove(world, this.body);
    }
}