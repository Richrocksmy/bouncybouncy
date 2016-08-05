const _canvas = Symbol('canvas');
const _context = Symbol('context');
const _sprites = Symbol('sprites');

class Animator {

    constructor() {
        this[_canvas] = document.getElementById('canvas');
        this[_context] = this[_canvas].getContext('2d');
        this[_sprites] = [];

        this.resizeCanvas();
    }

    resizeCanvas() {
        this[_canvas].width = window.innerWidth;
        this[_canvas].height = window.innerHeight;
    }

    animate() {
        this[_context].clearRect(0, 0, this[_canvas].width, this[_canvas].height);
        this[_sprites].forEach((sprite) => {
            this._draw(sprite);
            sprite.updatePosition();
        });

        requestAnimationFrame(() => this.animate());
    }

    _draw(sprite) {
        // Clear the canvas before we repaint

        this[_context].beginPath();
        sprite.draw(this[_context]);
        this[_context].closePath();
    }

    addSprite(event) {
        this[_sprites].push(new Ball(
            {
                x: event.clientX,
                y: event.clientY
            },
            {
                arcHeight: 0.02,
                bounceHeight: 0.04,
                limitOfBounce: 4.2,
                graphShift: 4,
                dx: 1
            }));
    }

    _getVelocity() {

    }
}
