const COLOR = '#0095DD';
const RADIUS = 10;
const DRAW_START_ANGLE = 0;

const _position = Symbol('position');
const _velocity = Symbol('velocity');
const _counter = Symbol('counter');

class Ball {

    constructor(startPosition, velocity) {
        this[_position] = startPosition;
        this[_velocity] = velocity;
        this[_counter] = startPosition.x;
    }

    draw(context) {
        context.arc(this[_position].x, this[_position].y, RADIUS, DRAW_START_ANGLE, Math.PI*2);
        context.fillStyle = COLOR;
        context.fill();
    }

    updatePosition() {
        this[_counter] += 0.1;
        this[_position].x += this[_velocity].dx;
        this[_position].y += 10 * Math.sin(this[_counter]);
        // this[_position].y = 10 * Math.sin(this[_position].x);
        // this[_position].x = this._calculateNextX();
        // this[_position].y = this._calculateNextY();
    }

    // _calculateNextX() {
    //     return this[_position].x + this[_velocity].dx;
    // }
    //
    // _calculateNextY() {
    //     // Need to take into account if the ball
    //     // has reached the bottom of the canvas
    //     if(this[_position].y >= window.innerHeight) {
    //         this[_velocity].dy *= -1;
    //     }
    //
    //     return this[_position].y - this[_velocity].dy;
    // }
}