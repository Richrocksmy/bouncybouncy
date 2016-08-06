const _canvas = Symbol('canvas');
const _context = Symbol('context');
const _sprites = Symbol('sprites');

class Animator {

    constructor() {
        this[_canvas] = document.getElementById('canvas');
        this[_context] = this[_canvas].getContext('2d');
        this[_sprites] = [];

        this.resizeCanvas();
        // this._loadBackground();
    }

    resizeCanvas() {
        this[_canvas].width = window.innerWidth;
        this[_canvas].height = window.innerHeight;
    }
    //
    // _loadBackground() {
    //     var background = new Image();
    //     background.src = 'res/background.jpg';
    //
    //     background.onload = function () {
    //         this[_context].drawImage(background,0,0);
    //     }​;
    // }

    animate() {
        var drawableSprites = [];

        // Clear the canvas before we repaint
        this[_context].clearRect(0, 0, this[_canvas].width, this[_canvas].height);

        this[_sprites].forEach((sprite) => {
           if(sprite.isDrawable) {
                this._draw(sprite);
                sprite.updatePosition();
                drawableSprites.push(sprite);
            }
        });

        this[_sprites] = drawableSprites;
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
