class Render {

    constructor() {
        this.el = document.querySelector('.js-game');
    }

    getLeftCornerOfViewport(level, camera) {

        var cameraKey = level.getKeyForCoords(camera.position.x, camera.position.y);

        return cameraKey;
    }

    draw(level, camera) {

        var topLeft, topRight, html;

        topLeft = {
            x: camera.position.x - camera.half.width,
            y: camera.position.y - camera.half.height
        };

        topRight = {
            x: camera.position.x + camera.half.width,
            y: camera.position.y + camera.half.height
        };

        html = '';

        for (let y = topLeft.y, yLen = topRight.y; y < yLen; y++) {
            for (let x = topLeft.x, xLen = topRight.x; x < xLen; x++) {
                let key = level.getKeyForCoords(x, y);
                html += `<span>${level.map[key]}</span>`;
            }

            html += '<br/>';
        }

        // TODO
        // - apply opacity to the visible area around the player

        this.el.innerHTML = html;
    }
}

export default new Render();
