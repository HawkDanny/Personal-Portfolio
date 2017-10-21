/**
 * The Joint class.
 * Contains properties that determine position, whether or not the connection to the child is drawn, and the child itself
 */

var app = app || {};

app.Joint = function(){

    /** MUTABLE PROPERTIES */
    var children; //the children joints of this joint
    var distanceFromParent;

    /**CANVAS PROPERTIES */
    var canvas;

    /**COLLISION PROPERTIES */
    var collider; //the collider that contains collision properties

    /**PHYSICS PROPERTIES */
    var position;
    var velocity;
    var inputDirection;
    var maxSpeed;
    var acceleration;
    var restitution; //bounciness
    var mass;
    var affectedByGravity;
    var brakingMag;
    var collideWithBoundaries;
    var drag; //A number between 0 and 1 that represents how much percent velocity is lost every frame
    var dt;
    var lastTime;
    var bumpMag;

    /**DRAW PROPERTIES */
    var DRAWPROPS;

    /**FORCES 
     * Magnitude of the constant forces
    */
    var FORCES = {
        GRAVITY: 1,
        LEFTWIND: 0.1
    };

    /**CONSTRUCTOR*/
    //TODO: separate all of these hard coding things into different init functions
    function Joint(canvas, position, restitution, mass) {
        //initialize properties with passed in values, or default values.
        this.canvas = canvas;
        this.position = position || new Victor(0, 0);
        this.inputDirection = new Victor(0, 0);
        this.bumpMag = 20;
        this.isSpeedDoubled = false;

        this.lastTime = 0;

        //default properties of collider
        this.collider = new app.Collider(colliderType.CIRCLE, this.position);
        this.collider.init(30); //radius of 10

        this.restitution = restitution;
        this.mass = mass;
        this.maxSpeed = 50; //pixels per frame
        this.children = [];

        this.drag = 0.05;
        this.acceleration = new Victor(0, 0);
        this.velocity = new Victor(0, 0);
        this.notRestitution = 2; //If this isn't 2, shit hits the fan, also there is no property of this currently
        this.affectedByGravity = true;
        this.brakingMag = 1;
        this.collideWithBoundaries = true;
        this.initDrawProperties();
    }

    //initialize the draw properties of the node
    //TODO: incorporate all the draw properties into the drawing of the nodes
    Joint.prototype.initDrawProperties = function() {
        this.DRAWPROPS = {
            drawConnection: false,
            drawNode: false,
            drawnNodeRadius: 10,
            nodeColor: "red",
            nodeLineWidth: 1
        }
    }

    //initializes the properties of the collider
    Joint.prototype.initColliderProperties = function(type, radiusOrWidth, height) {
        this.collider = new app.Collider(type, this.position);

        if (type == colliderType.CIRCLE) {
            this.collider.init(radiusOrWidth);
        } else if (type == colliderType.AABB) {
            this.collider.init(radiusOrWidth, height);
        }
    }

    //Called once per frame, to calculate all changing values of the joint
    Joint.prototype.update = function() {
        //update the collider position
        this.collider.position.x = this.position.x;
        this.collider.position.y = this.position.y;

        //fail safe for if anything goes out of bounds
        if (this.mass != 0) {
            if (this.position.x < 0) {
                this.position.x = this.collider.radius;
            }
            if (this.position.x > this.canvas.width) {
                this.position.x = this.canvas.width - this.collider.radius;
            }
            if (this.position.y < 0) {
                this.position.y = this.collider.radius;
            }
            if (this.position.y > this.canvas.height) {
                this.position.y = this.canvas.height - this.collider.radius;
            }
        }

        //add the force of gravity
        if (this.affectedByGravity) {
            this.addForce(new Victor(0, FORCES.GRAVITY));
        }

        this.calcForces();
    }

    //Called once per frame, after update. Draws the joint to the canvas.
    Joint.prototype.draw =  function(ctx) {

        //Runs if debug is toggled on
        if (this.DRAWPROPS.drawNode) {
            if (this.collider.type == colliderType.CIRCLE) {
                ctx.save();
                ctx.fillStyle = this.DRAWPROPS.nodeColor;
                ctx.lineWidth = this.DRAWPROPS.nodeLineWidth;

                ctx.beginPath();
                ctx.arc(this.position.x, this.position.y, this.collider.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
            else if (this.collider.type == colliderType.AABB) {
                ctx.save();

                ctx.strokeStyle = this.DRAWPROPS.nodeColor;
                ctx.lineWidth = this.DRAWPROPS.nodeLineWidth;

                ctx.strokeRect(this.collider.min.x, this.collider.min.y, this.collider.max.x - this.collider.min.x, this.collider.max.y - this.collider.min.y);
                ctx.restore();
            }
        }
    }

    //Used to add a force to the modge podge of forces reprsented by the acceleration vector
    Joint.prototype.addForce = function(accelForce) {
        this.acceleration.add(accelForce);
    }

    //calculate the positions and velocities of the joint using the acceleration vector
    Joint.prototype.calcForces = function() {
        //add the acceleration to velocity after acceleration was calculated in addForce
        this.velocity.add(this.acceleration);

        //create a usable drag variable and use it to slow down velocity every frame
        //TODO: Don't affect velocity directly, and instead apply a small force in the opposite direction
        var usableDrag = 1 - this.drag;
        this.velocity.x *= usableDrag;
        this.velocity.y *= usableDrag;

        //limit the velocity to maxSpeed
        if (this.velocity.x > this.maxSpeed)
            this.velocity.x = this.maxSpeed;
        if (this.velocity.y > this.maxSpeed)
            this.velocity.y = this.maxSpeed;
        if (this.velocity.x < 0 && this.velocity.x < -this.maxSpeed)
            this.velocity.x = -this.maxSpeed;
        if (this.velocity.y < 0 && this.velocity.y < -this.maxSpeed)
            this.velocity.y = -this.maxSpeed;

        var dt = this.calculateDeltaTime();
        //console.log(this.velocity.clone().multiply(new Victor(dt, dt)));

        //add the velocity vector to the position vector
        this.position.add(this.velocity.clone().multiply(new Victor(dt, dt)));


        //reset acceleration (there are ways to optimize and not completely reset acceleration)
        this.acceleration = new Victor(0, 0);
    }

    //Called when main detects that a collision occurred
    //Other represents the joint that his joint is colliding with
    Joint.prototype.resolveCollision = function(other) {
        //calculate the relative velocity
        var relativeVelocity = this.velocity.clone().subtract(other.velocity.clone()); //TODO: check if correct value, may need to subtract individual coordinates

        //calculate the relative velocity in terms of the normal directions
        var velocityAlongNormal = relativeVelocity.dot(this.collider.normal);

        //if velocities are separating, do not resolve
        if (velocityAlongNormal > 0) {
            return;
        }
        
        //calculate inverse mass and check if the object is immovable
        if (this.mass == 0) {
            var thisInvMass = 0;
        } else {
            var thisInvMass = 1 / this.mass;
        }
        if (other.mass == 0) {
            var otherInvMass = 0;
        } else {
            var otherInvMass = 1 / other.mass;
        }

        //calculate restitution
        var e = Math.min(this.restitution, other.restitution);

        //calculate impulse
        var j = -(1 + e) * velocityAlongNormal;
        j /= (thisInvMass + otherInvMass);

        //Apply the impulse
        var impulse = this.collider.normal.clone();
        impulse.x *= j;
        impulse.y *= j;


        //necessary because Victor.js doesn't include scalar multiplication
        var thisForce = impulse.clone();
        var otherForce = impulse.clone();
        thisForce.x *= (thisInvMass);
        thisForce.y *= (thisInvMass);
        otherForce.x *= (-otherInvMass);
        otherForce.y *= (-otherInvMass);

        //account for the "sinking" porblem with linear projection. Basically a "Good enough" solution
        var percent = 0.7; //a number between 0.2 and 0.8
        var slop = 0.1; //a number between 0.01 and 0.1

        var correctionVecMag = (Math.max(this.collider.penetrationDepth - slop, 0) / (thisInvMass + otherInvMass)) * percent;
        var correctionVec = new Victor(this.collider.normal.x * correctionVecMag, this.collider.normal.y * correctionVecMag);
        var thisCorrectionVec = correctionVec.clone();
        var otherCorrectionVec = correctionVec.clone();

        thisCorrectionVec.x *= thisInvMass;
        thisCorrectionVec.y *= thisInvMass;
        otherCorrectionVec.x *= otherInvMass;
        otherCorrectionVec.y *= otherInvMass;

        this.position.add(thisCorrectionVec);
        other.position.subtract(otherCorrectionVec);

        //apply the forces calculated
        this.addForce(thisForce);
        other.addForce(otherForce);
    }

    //returns the normal vector that the current joint should move in, after coliding with joint other
    Joint.prototype.getCollisionNormal = function(other) {
        if (this.collider.type == colliderType.AABB && other.collider.type == colliderType.AABB) {
            //TODO: implement
        } else if (this.collider.type == colliderType.AABB && other.collider.type == colliderType.CIRCLE) {
            //TODO: implement
        } else if (this.collider.type == colliderType.CIRCLE && other.collider.type == colliderType.CIRCLE) {

            //get vector between the two joints
            var normal = this.position.clone().subtract(other.position);

            //normalize that vector
            normal.norm();

            return normal;
        }
    }

    //Add a joint to be a child of this joint
    Joint.prototype.addChild = function(child, distanceFromParent) {
        child.distanceFromParent = distanceFromParent;
        this.children.push(child);
    }

    Joint.prototype.updateChildren = function() {
        //directly affect the positions of the children based on this joint's position
        for (var i = 0; i < this.children.length; i++) {
            this.children[i].position.add(this.velocity);
            this.controlChild(this.children[i]);
        }
    }

    //Apply a force in the opposite direction of the current velocity. Meant to be called only once per deceleration
    Joint.prototype.brake = function() {
        var brakingForce = this.velocity.clone();
        brakingForce.invert();
        brakingForce.normalize();
        brakingForce.x *= this.brakingMag;
        brakingForce.y *= this.brakingMag;

        this.addForce(brakingForce);
    }

    //calculates the change in time it took for the frame to render
    Joint.prototype.calculateDeltaTime = function(){
		var now,fps;
		now = performance.now(); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1 - (1/fps);
	}

    Joint.prototype.bump = function() {
        var bumpVec = this.inputDirection.clone();
        bumpVec.x *= this.bumpMag;
        bumpVec.y *= this.bumpMag;
        this.velocity.x = 0;
        this.velocity.y = 0;
        this.addForce(bumpVec);
    }

    /*
    Function Name: clamp(val, min, max)
    Author: Web - various sources
    Return Value: the constrained value
    Description: returns a value that is
    constrained between min and max (inclusive) 
    */
    function clamp(val, min, max){
        return Math.max(min, Math.min(max, val));
    }

    return Joint;
}();