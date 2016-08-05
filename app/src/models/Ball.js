const COLOR = '#0095DD';
const RADIUS = 10;
const DRAW_START_ANGLE = 0;

const _position = Symbol('position');
const _counter = Symbol('counter');
const _physics = Symbol('physics');

class Ball {

    constructor(startPosition, physics) {
        this[_position] = startPosition;
        this[_physics] = physics;
        this[_counter] = 0;
    }

    draw(context) {
        context.arc(this[_position].x, this[_position].y, RADIUS, DRAW_START_ANGLE, Math.PI*2);
        context.fillStyle = COLOR;
        context.fill();
    }

    updatePosition() {
        if(this[_counter] >= this[_physics].limitOfBounce) {
            // Reached limite of bounces - stop the ball
            this[_position].y = window.innerHeight;
        } else {
            this._calculateX();
            this._calculateY();
        }
    }

    _calculateX() {
        this[_position].x += this[_physics].dx;
    }

    _calculateY() {
        // Ball adheres to curve defined by y = x^2 + n
        this[_counter] += this[_physics].arcHeight;

        if(this[_position].y > window.innerHeight) {
            // Ball has hit bottom of window so
            // make it bounce
            this[_counter] = 0;
            this[_physics].arcHeight += this[_physics].bounceHeight;
        }

        this[_position].y += (Math.pow(this[_counter], 2) - this[_physics].graphShift);
    }
}