import level from './level';
import render from './render';
import camera from './camera';
import io from './io';
import loop from './loop';

class Game {

    constructor() {

        this.width = 200;
        this.height = 200;

        level.init(this.width, this.height);

        camera.setViewportSize({
            width: 40,
            height: 30
        });
        camera.setViewportBounds(level);
        camera.setPosition({
            x: this.width * 0.5,
            y: this.height * 0.5
        });

        loop.update = function () {
            camera.move(io.getDirection());

            for (let i = 0, len = level.mobs.length; i < len; i++) {
                level.moveMob(level.mobs[i]);
            }
        };

        loop.draw = function () {
            render.draw(level, camera);
        };

        loop.start();

    }

}

export default new Game();
