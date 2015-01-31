import level from './level';
import render from './render';
import camera from './camera';
import io from './io';
import loop from './loop';
import player from './player';
import weapons from './weapons';
import tiles from './tileKey';

class Game {

    constructor(depth) {

        var self = this,
            playerPosition,
            healthCounter = 300,
            healthCounterMax = 300;

        this.depth = depth || 0;

        this.width = 200;
        this.height = 200;

        playerPosition = level.init(this.width, this.height);
        player.setPosition(playerPosition);
        player.arm(new weapons.pickaxe());

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
            if (level.map[keyForPlayer] === tiles.map.stairs) {
                // start a new game
                self = new Game(self.depth + 1);
            }

            if (player.health <= 0) {
                loop.stop();
                alert('You died!');
            }

            let direction = io.getDirection();
            let nextKey = level.getKeyForCoords(player.position.x + direction.x, player.position.y + direction.y);

            if (self.canPlayerMove(direction) && (direction.x !== 0 || direction.y !== 0)) {

                let hasBattled = self.battle(nextKey);

                if (!hasBattled) {
                    player.move(direction, level.map);
                    camera.setPosition(player.position);
                }
            } else {

                switch (level.map[nextKey].charAt(0)) {
                    case tiles.map.rock.charAt(0):
                        let strength = parseInt(level.map[nextKey].substring(2), 10);
                        if (strength > 0) {
                            let bonus = (player.weapon.bonus === level.map[nextKey].charAt(0)) ? 3 : 1;
                            level.map[nextKey] = tiles.map.rock.charAt(0) + ':' + (strength - (1 * bonus));
                        } else {
                            level.map[nextKey] = tiles.map.floor;
                        }
                        break;
                }

            }

            for (let i = 0, len = level.mobs.length; i < len; i++) {
                level.moveMob(level.mobs[i]);
            }

            if (healthCounter <= 0) {
                player.heal(1);
                healthCounter = healthCounterMax;
            } else {
                healthCounter--;
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

    battle(key) {

        var coords = level.getCoordsForKey(key);

        for (let i = 0, len = level.mobs.length; i < len; i++) {

            let mob = level.mobs[i];

            if (coords[0] === mob.position.x && coords[1] === mob.position.y) {
                let counter = mob.injure(player.weapon.damage);

                if (counter) {
                    player.injure(mob.damage);
                } else {
                    level.removeDeadMobs();
                }

                return true;
            }
        }

        // if no battle took place
        return false;

    }

}

export default new Game();
