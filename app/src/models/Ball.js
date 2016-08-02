const COLOR = '#0095DD';
const RADIUS = 5;
const DRAW_START_ANGLE = 0;

const _x = Symbol('x');
const _y = Symbol('y');

class Ball {

    constructor(x, y) {
        this[_x] = x;
        this[_y] = y;
    }

    draw(context) {
        context.arc(this[_x], this[_y], RADIUS, DRAW_START_ANGLE, Math.PI*2);
        context.fillStyle = COLOR;
        context.fill();
    }

    updatePosition() {
        this[_x] = this._calculateNextX();
        this[_y] = this._calculateNextY();
    }

    _calculateNextX() {}
    _calculateNextY() {
        // Need to take into account if the ball
        // has reached the bottom of the canvas
    }
}