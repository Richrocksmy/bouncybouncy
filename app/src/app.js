(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        var animator = new Animator();
        
        document.body.addEventListener('click', () => animator.addSprite(event), false);
        window.addEventListener('resize', () => animator.resizeCanvas(), false);

        requestAnimationFrame(() => animator.animate());
    });
})();