const _canvas = Symbol('canvas');
const _context = Symbol('context');
const _sprites = Symbol('sprites');

class Animator {

    constructor() {
        this[_canvas] = document.getElementById('canvas');
        this[_context] = this[_canvas].getContext('2d');
        this[_sprites] = [];
        //this._testPopulateSprites();

        this.resizeCanvas();
    }

    resizeCanvas() {
        this[_canvas].width = window.innerWidth;
        this[_canvas].height = window.innerHeight;
    }

    animate() {
        this[_context].beginPath();

        this[_sprites].forEach((sprite) => {
            sprite.draw(this[_context]);
            // sprite.updatePosition();
        });

        this[_context].closePath();

        requestAnimationFrame(() => this.animate());
    }

    addSprite(event) {
        this[_sprites].push(new Ball(event.clientX, event.clientY));
        // this[_sprites].push(new Ball(50, 50));
    }

    _testPopulateSprites() {
        this[_sprites].push(new Ball(50, 50));
        this[_sprites].push(new Ball(50, 40));
        this[_sprites].push(new Ball(50, 30));
        this[_sprites].push(new Ball(50, 20));
        this[_sprites].push(new Ball(50, 10));
    }
}
