

function Sprite(x, y, w, h, img) {
    this.body = Bodies.rectangle(x, y, w, h);
    this.w = w;
    this.h = h;
    World.add(world, this.body);

    this.img = img;

    //Called every frame
    this.show = function() {        
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.img, 0, 0, this.w, this.h);
        pop();
    }

    this.applyForce = function(position, force) {
        Body.applyForce(this.body, position, force);
    }
}