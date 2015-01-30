import level from './level';
import render from './render';
import camera from './camera';
import io from './io';
import loop from './loop';
import player from './player';

class Game {

    constructor(depth) {

        var self = this,
            playerPosition;

        this.depth = depth || 0;

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
                // start a new game
                self = new Game(self.depth + 1);
            }

            let direction = io.getDirection();
            let nextKey = level.getKeyForCoords(player.position.x + direction.x, player.position.y + direction.y);

            if (self.canPlayerMove(direction)) {
                player.move(direction, level.map);
                camera.setPosition(player.position);
            } else {

                switch (level.map[nextKey]) {
                    case '⚅':
                        level.map[nextKey] = '⚄';
                        break;
                    case '⚄':
                        level.map[nextKey] = '⚃';
                        break;
                    case '⚃':
                        level.map[nextKey] = '⚂';
                        break;
                    case '⚂':
                        level.map[nextKey] = '⚁';
                        break;
                    case '⚁':
                        level.map[nextKey] = '⚀';
                        break;
                    case '⚀':
                        level.map[nextKey] = '.';
                        break;
                    default:
                        // TODO battle
                        break;
                }
            }

            for (let i = 0, len = level.mobs.length; i < len; i++) {
                level.moveMob(level.mobs[i]);
            }
        };

        loop.draw = function () {
            render.draw(player, level, camera, self);
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
