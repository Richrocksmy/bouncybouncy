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
            if(sprite.isRenderable()) {
                this._draw(sprite);
                sprite.updatePosition();
            } else {
                // If we can no longer draw this element, remove it
                // from the render list to increase performance
                this[_sprites].splice(this[_sprites].indexOf(sprite), 1)
            }
        });

        console.log(this[_sprites].length);
        requestAnimationFrame(() => this.animate());
    }

    _draw(sprite) {
        this[_context].beginPath();
        sprite.draw(this[_context]);
        this[_context].closePath();
    }

    addSprite(event) {
        this[_sprites].push(new Ball({x: event.clientX, y: event.clientY}));
    }
}
