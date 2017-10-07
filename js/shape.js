

function Shape(x, y, vertices, color) {
    this.body = Bodies.fromVertices(x, y, vertices);
    this.vertices = vertices;
    World.add(world, this.body);

    //Called every frame
    this.show = function() {
        fill(color);
        
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);

        noStroke();
        beginShape();
        for (var i = 0; i < this.vertices.length; i++) {
            vertex(this.vertices[i].x, this.vertices[i].y);
        }
        endShape(CLOSE);
        pop();
    }

    this.applyForce = function(position, force) {
        Body.applyForce(this.body, position, force);
    }

    this.removeFromWorld = function() {
        World.remove(world, this.body);
    }

    this.isOffScreen = function() {
        var pos = this.body.position;

        return (pos.x < 0 ||
                pos.y < 0 ||
                pos.x > width ||
                pos.y > height);
    }
}