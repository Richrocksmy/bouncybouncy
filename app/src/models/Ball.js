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
    
    updatePosition() {
        this[_counter] += 0.02;
        this[_position].x += this[_velocity].dx;

        if(this[_position].y > window.innerHeight) {
            // Ball has hit bottom of window so
            // make it bounce
            this[_counter] = 0;
        }

        this[_position].y += (Math.pow(this[_counter], 2) - 4);

    }
}