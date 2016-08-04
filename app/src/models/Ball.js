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
        this[_counter] = 0;
    }

    draw(context) {
        context.arc(this[_position].x, this[_position].y, RADIUS, DRAW_START_ANGLE, Math.PI*2);
        context.fillStyle = COLOR;
        context.fill();
    }

    // updatePosition() {
    //     this[_counter] += 0.01;
    //     this[_position].x += this[_velocity].dx;
    //     this[_position].y += 10 * Math.sin(this[_counter]);
    // }

    updatePosition() {
        this[_counter] += 0.02;
        this[_position].x += this[_velocity].dx;

        var hasBounced = 1;
        if(this[_position].y > window.innerHeight) {
            hasBounced = -1;
            this[_counter] *= -1;

        }

        this[_position].y += (Math.pow(this[_counter], 2) - 4) * hasBounced;

        console.log(this[_position]);
        console.log(window.innerHeight);
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