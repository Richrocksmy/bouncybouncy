const DRAW_START_ANGLE = 0;
const NUMBER_OF_ALLOWED_BOUNCES = 6;

const _position = Symbol('position');
const _counter = Symbol('counter');
const _physics = Symbol('physics');
const _style = Symbol('style');
const _numberOfBounces = Symbol('numberOfBounces');
const _drawable = Symbol('drawable');

class Ball {

    constructor(startPosition) {
        this[_position] = {
            initialPosition: startPosition,
            currentPosition: startPosition
        };
        this[_physics] = this._generatePhysics();
        this[_style] = {
            color: this._generateRandomColor(),
            radius: this._generateRandomNumber(10, 40)
        };

        this[_counter] = 0;
        this[_numberOfBounces] = 0;
        this[_drawable] = true;
    }

    draw(context) {
        context.arc(this[_position].currentPosition.x,
            this[_position].currentPosition.y,
            this[_style].radius,
            DRAW_START_ANGLE,
            Math.PI*2);

        context.fillStyle = this[_style].color;
        context.fill();
    }

    get isDrawable() {
        return this[_drawable];
    }

    updatePosition() {
        if(this[_numberOfBounces] < NUMBER_OF_ALLOWED_BOUNCES) {
            // The ball is still bouncing
            this._updateY();
            this._updateX();
        } else if(this[_physics].dx > 0) {
            // The ball has stopped bouncing and will now roll to a stop
            this[_physics].dx -= this[_physics].bounceFriction;
            this._updateX();
        }
    }

    _updateX() {
        this[_position].currentPosition.x += (this[_physics].dx * this[_physics].direction);

        // Check to see if the ball's new position
        // is outside the visible window in x axis
        if(this[_position].currentPosition.x < 0) {
            console.log('out of range left');
        } else {
            var displacement = this[_position].currentPosition.x - this[_position].initialPosition.x;
            var distanceToWindowEdge = window.innerWidth - this[_position].initialPosition.x;
            if(displacement > distanceToWindowEdge) {
                console.log('out of range right');
            }
        }
    }

    _updateY() {
        this[_counter] += this[_physics].arcHeight;

        if(this[_position].currentPosition.y > (window.innerHeight - this[_style].radius)) {
            // Ball has hit bottom of window so
            // make it bounce
            this[_counter] = 0;
            this[_numberOfBounces]++;

            // Reduce the arc height by the bounce height
            // --> y axis values are inverted so it's plus not minus!
            this[_physics].arcHeight += this[_physics].bounceHeight;

            // Reduce the movement in x axis because of friction
            // incurred from bounce
            this[_physics].dx -= this[_physics].bounceFriction;
        }

        // Ball adheres to curve defined by y = x^2 + n
        this[_position].currentPosition.y += Math.pow(this[_counter], 2) - this[_physics].startPointOnCurve;
    }

    _generatePhysics() {
        return {
            arcHeight: this._generateRandomNumber(0.02, 0.1),
            bounceHeight: this._generateRandomNumber(0.04, 0.1),
            bounceFriction: this._generateRandomNumber(0.01, 0.04),
            startPointOnCurve: this._generateRandomNumber(1, 6),
            dx: this._generateRandomNumber(4, 6),
            direction: this._generateDirection()
        }
    }

    _generateDirection() {
        var random = this._generateRandomNumber(0, 1);

        if(random <= 0.5) {
            return -1;
        }

        return 1;
    }

    _generateRandomNumber(lowerBound, upperBound) {
        return (Math.random() * upperBound) + lowerBound;
    }

    _generateRandomColor() {
        var colorIndex = Math.round(this._generateRandomNumber(0, COLORS.length - 1));
        return COLORS[colorIndex];
    }
}