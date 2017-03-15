const vec2 = require("./victor.js");

const Turtle = {
    create( ctx, startX, startY) {

        //Why are you making a turtle object within the create?
        const turtle = Object.create(this);
        Object.assign(turtle, {
            ctx,
            weight: 1,
            color: "red",
            startX: startX,
            startY: startY,
            position: vec2(startX, startY),
            heading: vec2(1, 0),
            pen: 1,
            positionArr: [],
            headingArr: []
        });

        turtle.ctx.moveTo( turtle.position.x, turtle.position.y);
        return turtle;
    },

    penUp() {
        this.pen = 0;
    },

    penDown() {
        this.pen = 1;
    },

    push() {
        this.positionArr.push(this.position.clone());
        this.headingArr.push(this.heading.clone());
    },

    pop() {
        this.position = this.positionArr.pop();
        this.heading = this.headingArr.pop();
        this.ctx.moveTo(this.position.x, this.position.y);
    },

    rotate(rotationAmount) {
        this.heading.rotate(rotationAmount);
    },

    move(distance) {

        //Why are we checking if the pen exists?
        if (this.pen)
            this.ctx.beginPath();

        this.ctx.moveTo(this.position.x, this.position.y);
        this.position.x += (this.heading.x * distance);
        this.position.y += (this.heading.y * distance);
        if (this.pen) {
            this.ctx.lineTo(this.position.x, this.position.y);
            this.ctx.lineWidth = this.weight;
            this.ctx.stroke();
            this.ctx.closePath();
        } else {
            this.ctx.moveTo(this.position.x, this.position.y);
        }
    },

    reset() {
        this.position = vec2(this.startX, this.startY);
    }
};

//export the turtle object
module.exports = Turtle;