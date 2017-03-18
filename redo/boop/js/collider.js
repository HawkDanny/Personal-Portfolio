/**
 * A class that contains the data about a collider, and calculates whether a collision has occurred
 */


var app = app || {};

//global enum for collider type
var colliderType = Object.freeze({
    AABB: 0,
    CIRCLE: 1
});

app.Collider = function() {

    //type of collider
    var type;
    var position; //center of the collision box
    var normal; //the collision normal used to resolve collisions
    var penetrationDepth; //a number the represents how far into another object hte collision is

    var radius; //used for circle
    var min; //min vector used for AABB
    var max; //max vector used for AABB

    //Function Constructor
    function Collider(type, position) {
        this.type = type;
        this.position = position;

        this.penetrationDepth = 0;
    }

    //used for initialization of both AABB and circle
    Collider.prototype.init = function(radiusOrWidth, height) {
        if (this.type == colliderType.AABB) {
            var halfWidth = radiusOrWidth / 2;
            var halfHeight = height / 2;

            this.min = new Victor(this.position.x - halfWidth, this.position.y - halfHeight);
            this.max = new Victor(this.position.x + halfWidth, this.position.y + halfHeight);
        } else {
            this.radius = radiusOrWidth;
        }
    }

    //Where other is another collider
    Collider.prototype.isColliding = function(other) {
        if (this.type == colliderType.AABB && other.type == colliderType.AABB) {
            return isAABBCollidingWithAABB(this, other);
        } else if (this.type == colliderType.AABB && other.type == colliderType.CIRCLE) {
            return isAABBCollidingWithCIRCLE(this, other);
        } else if (this.type == colliderType.CIRCLE && other.type == colliderType.AABB) {
            return isAABBCollidingWithCIRCLE(other, this);
        } else if (this.type == colliderType.CIRCLE && other.type == colliderType.CIRCLE) {
            return isCIRCLECollidingWithCIRCLE(this, other);
        } else {
            console.log("Error in collision types");
        }

        return false;
    }

    //check if a collision between two AABB colliders occurred
    function isAABBCollidingWithAABB(collider1, collider2) {
        if (collider1.max.x <= collider2.min.x || collider1.min.x >= collider2.max.x) {
            collider1.penetrationDepth = collider2.penetrationDepth = 0;
            return false; //should not have = in the comparison, TODO: remove later
        }    
        if (collider1.max.y <= collider2.min.y || collider1.min.y >= collider2.max.y) {
            collider1.penetrationDepth = collider2.penetrationDepth = 0;
            return false;
        }

        if (collider1.max.x > collider2.min.x && !(collider1.min.x > collider2.max.x)) {
            collider1.normal = new Victor(-1, 0);
            collider2.normal = new Victor(1, 0);
            collider1.penetrationDepth = collider2.penetrationDepth = collider1.max.x - collider2.min.x;

            return true;
        } else if (collider1.min.x < collider2.max.x && !(collider2.max.x < collider1.min.x)) {
            collider1.normal = new Victor(1, 0);
            collider2.normal = new Victor(-1, 0);
            collider1.penetrationDepth = collider2.penetrationDepth = collider2.max.x - collider1.min.x;

            return true;
        } else if (collider1.max.y > collider2.min.y && !(collider1.min.y > collider2.max.y)) {
            collider1.normal = new Victor(0, -1);
            collider2.normal = new Victor(0, 1);
            collider1.penetrationDepth = collider2.penetrationDepth = collider1.max.y - collider2.min.y;

            return true;
        } else if (collider1.min.y < collider2.max.y && !(collider1.min.y > collider2.max.y)) {
            collider1.normal = new Victor(0, 1);
            collider2.normal = new Victor(0, -1);
            collider1.penetrationDepth = collider2.penetrationDepth = collider2.max.y - collider1.min.y;

            return true;
        }

        //no separating axis found, so there must be a collision
        return true;
    }

    //check if a collision between an AABB collider (collider1) occurred with with a CIRCLE collider (collider2)
    function isAABBCollidingWithCIRCLE(collider1, collider2) {
        var distanceBetweenCenterXAndMinX = Math.abs(collider2.position.x - collider1.min.x); //distance between center of circle and minX
        var distanceBetweenCenterXAndMaxX = Math.abs(collider2.position.x - collider1.max.x); //distance between center of circle and maxX
        var distanceBetweenCenterYAndMinY = Math.abs(collider2.position.y - collider1.min.y); //distance between center of circle and minY
        var distanceBetweenCenterYAndMaxY = Math.abs((collider2.position.y - collider1.max.y)); //distance between center of circle and maxY

        if (distanceBetweenCenterXAndMinX < collider2.radius) {
            collider1.normal = new Victor(1, 0);
            collider2.normal = collider1.normal.clone().invert(); //unoptimised but clearer TODO: possibly optimize it TODO: learn how to spell optomise
            collider1.penetrationDepth = collider2.penetrationDepth = collider2.radius - distanceBetweenCenterXAndMinX;

            return true;
        } else if (distanceBetweenCenterXAndMaxX < collider2.radius) {
            collider1.normal = new Victor(-1, 0);
            collider2.normal = collider1.normal.clone().invert();
            collider1.penetrationDepth = collider2.penetrationDepth = collider2.radius - distanceBetweenCenterXAndMaxX;

            return true;
        } else if (distanceBetweenCenterYAndMinY < collider2.radius) {
            collider1.normal = new Victor(0, 1);
            collider2.normal = collider1.normal.clone().invert();
            collider1.penetrationDepth = collider2.penetrationDepth = collider2.radius - distanceBetweenCenterYAndMinY;

            return true;
        } else if (distanceBetweenCenterYAndMaxY < collider2.radius) {
            collider1.normal = new Victor(0, -1);
            collider2.normal = collider1.normal.clone().invert();
            collider1.penetrationDepth = collider2.penetrationDepth = collider2.radius - distanceBetweenCenterYAndMaxY;

            return true;
        }

        collider1.penetrationDepth = collider2.penetrationDepth = 0;
        return false;
    }

    //check if a collision between two CIRCLE colliders occurred
    function isCIRCLECollidingWithCIRCLE(collider1, collider2) {
        var r = collider1.radius + collider2.radius;

        var xSqrd = (collider1.position.x - collider2.position.x) * (collider1.position.x - collider2.position.x);
        var ySqrd = (collider1.position.y - collider2.position.y) * (collider1.position.y - collider2.position.y);
        var distance = Math.sqrt((xSqrd + ySqrd));

        if (distance < r) {
            //calculate collision normal if colliding
            //get vector between the two joints
            collider1.normal = collider1.position.clone().subtract(collider2.position);

            //normalize that vector
            collider1.normal.norm();
            collider2.normal = collider1.normal.clone().invert();

            //assign the value of penetrationDepth
            collider1.penetrationDepth = collider2.penetrationDepth = r - distance;

            return true;
        } else {
            collider1.penetrationDepth = collider2.penetrationDepth = 0;
            return false;
        }
    }

    return Collider;
}();