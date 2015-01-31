class Render {

    constructor() {
        this.el = document.querySelector('.js-game');
    }

    getLeftCornerOfViewport(level, camera) {

        var cameraKey = level.getKeyForCoords(camera.position.x, camera.position.y);

        return cameraKey;
    }

    draw(player, level, camera, game) {

        var topLeft, topRight, html, mobs;

        topLeft = {
            x: camera.position.x - camera.half.width,
            y: camera.position.y - camera.half.height
        };

        topRight = {
            x: camera.position.x + camera.half.width,
            y: camera.position.y + camera.half.height
        };

        mobs = [];
        // loop threw mobs and add only visible ones
        for (let i = 0, len = level.mobs.length; i < len; i++) {

            let mob = level.mobs[i];

            if (mob.position.x >= topLeft.x &&
                mob.position.x <= topRight.x &&
                mob.position.y >= topLeft.y &&
                mob.position.y <= topRight.y) {
                    mobs.push(mob);
            }
        }

        html = '';

        for (let y = topLeft.y, yLen = topRight.y; y < yLen; y++) {
            for (let x = topLeft.x, xLen = topRight.x; x < xLen; x++) {
                let key = level.getKeyForCoords(x, y);
                let override = false;

                for (let i = 0, len = mobs.length; i < len; i++) {
                    if (mobs[i].position.x === x && mobs[i].position.y === y) {
                        override = mobs[i];
                    }
                }

                if (player.position.x === x && player.position.y === y) {
                    html += `<span>${player.type}</span>`;
                } else if (override) {
                    html += `<span>${override.type}</span>`;
                } else {
                    html += `<span>${level.map[key].charAt(0)}</span>`;
                }

            }

            html += '<br/>';
        }

        html += `Depth:${game.depth} Health:${player.health} Weapon:${player.weapon.type}`;

        // TODO
        // - apply opacity to the visible area around the player

        this.el.innerHTML = html;
    }
}

export default new Render();
