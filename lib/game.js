import level from './level';
import render from './render';
import camera from './camera';
import io from './io';
import loop from './loop';
import player from './player';

class Game {

    constructor() {

        var self = this,
            playerPosition;

        this.width = 200;
        this.height = 200;

        playerPosition = level.init(this.width, this.height);
        player.setPosition(playerPosition);

        camera.setViewportSize({
            width: 40,
            height: 30
        });
        camera.setViewportBounds(level);
        camera.setPosition({
            x: playerPosition.x,
            y: playerPosition.y
        });

        loop.update = function () {

            var keyForPlayer = level.getKeyForCoords(player.position.x, player.position.y);
            if (level.map[keyForPlayer] === '>') {
                // TODO re-start level on harder difficulty
                console.log('you\'ve found the stairs');
            }

            let direction = io.getDirection();

            if (self.canPlayerMove(direction)) {
                player.move(direction, level.map);
                camera.setPosition(player.position);
            } else {
                // TODO start attack or mine...
            }

            for (let i = 0, len = level.mobs.length; i < len; i++) {
                level.moveMob(level.mobs[i]);
            }
        };

        loop.draw = function () {
            render.draw(player, level, camera);
        };

        loop.start();

    }

    canPlayerMove(direction) {

        var newPosition = {
            x: player.position.x + direction.x,
            y: player.position.y + direction.y
        };

        var key = level.getKeyForCoords(newPosition.x, newPosition.y);

        return (level.map[key] === '.' || level.map[key] === '>');
    }

}

export default new Game();
