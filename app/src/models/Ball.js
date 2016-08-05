const COLOR = '#0095DD';
const RADIUS = 10;
const DRAW_START_ANGLE = 0;
const BOUNCE_STOP_FACTOR = 0.6;

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
        if(this[_physics].dx >= BOUNCE_STOP_FACTOR) {
            this._updateX();
            this._updateY();
        } else {
            // this[_position].y += RADIUS;
        }
    }

    _updateX() {
        this[_position].x += this[_physics].dx;
    }

    _updateY() {
        this[_counter] += this[_physics].arcHeight;

        if(this[_position].y > window.innerHeight) {
            // Ball has hit bottom of window so
            // make it bounce
            this[_counter] = 0;

            // Reduce the arc height by the bounce height
            // --> y axis values are inverted!
            this[_physics].arcHeight += this[_physics].bounceHeight;

            // Reduce the movement in x axis because of friction
            // incurred from bounce
            this[_physics].dx -= this[_physics].bounceFriction;
        }

        // Ball adheres to curve defined by y = x^2 + n
        this[_position].y += (Math.pow(this[_counter], 2) - this[_physics].graphShift);
    }
}