

function Sprite(x, y, w, h, path) {
    this.body = Bodies.rectangle(x, y, w, h, {density: 0.02});
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.img = loadImage(path);

    //Called every frame
    this.show = function() {        
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        image(img, 0, 0, this.w, this.h);
        pop();
    }

    this.applyForce = function(position, force) {
        Body.applyForce(this.body, position, force);
    }
}