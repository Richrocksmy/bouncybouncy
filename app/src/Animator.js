const _canvas = Symbol('canvas');
const _context = Symbol('context');
const _sprites = Symbol('sprites');

class Animator {

    constructor() {
        this[_canvas] = document.getElementById('canvas');
        this[_context] = this[_canvas].getContext('2d');
        this[_sprites] = [];

        this._resizeCanvas();
    }

    _resizeCanvas() {
        this[_canvas].width = window.innerWidth;
        this[_canvas].height = window.innerHeight;
    }

    animate() {
        // Clear the canvas before we repaint
        this[_context].clearRect(0, 0, this[_canvas].width, this[_canvas].height);
        this[_sprites].forEach((sprite) => {
            this._draw(sprite);
            sprite.updatePosition();
        });

        requestAnimationFrame(() => this.animate());
    }

    _draw(sprite) {
        this[_context].beginPath();
        sprite.draw(this[_context]);
        this[_context].closePath();
    }

    addSprite(event) {
        this[_sprites].push(new Ball({x: event.clientX, y: event.clientY}, this._generatePhysics()));
    }

    _generatePhysics() {
        return {
            arcHeight: this._generateRandomNumberWithinBounds(0.02, 0.10),
            bounceHeight: this._generateRandomNumberWithinBounds(0.04, 0.12),
            bounceFriction: this._generateRandomNumberWithinBounds(0.04, 0.12),
            graphShift: this._generateRandomNumberWithinBounds(1, 4),
            dx: this._generateRandomNumberWithinBounds(0.5, 4)
        }
    }

    _generateRandomNumberWithinBounds(lowerBound, upperBound) {
        return (Math.random() * upperBound) + lowerBound;
    }

    // _generatePhysics() {
    //     return {
    //         arcHeight: 0.02,
    //         bounceHeight: 0.04,
    //         bounceFriction: 0.04,
    //         graphShift: 4,
    //         dx: 1
    //     }
    // }
}
