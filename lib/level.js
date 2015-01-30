import mobs from './mobs';

class Level {

    constructor() {
        this.CAVERN_SIZE = Math.random() * 50 + 200;
        this.MINORS = Math.random() * 50 + 100;
        this.MOBS = 100;
    }

    init(width, height) {

        this.width = width;
        this.height = height;
        this.map = [];

        this.generateMap();
        this.createMobs();
        this.createEndPoint();
        return this.createStartPoint();
    }

    getCoordsForKey(key) {

        if (key === 0) {
            return [0, 0];
        }

        var y = Math.floor(key / this.width),
            x = key % this.width;

        return [x, y];
    }

    getKeyForCoords(x, y) {

        return (y * this.width) + x;
    }

    isKeyValid(key) {
        return (key > 0) && (key <= this.map.length);
    }

    isCoordsValid(x, y) {
        return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
    }

    generateMap() {

        // fill with rocks
        for (let i = 0, len = this.width * this.height; i < len; i++) {
            this.map[i] = 'X';
        }

        // mine out the rock
        for (let i = 0, len = this.MINORS; i < len; i++) {
            this.mineMap(Math.floor(Math.random() * this.map.length));
        }

        // create the top and bottom
        for (let x = 0, len = this.width; x < len; x++) {

            // top edge
            this.map[x] = '-';

            // bottom edge
            let key = this.getKeyForCoords(x, this.height - 1);
            this.map[key] = '-';
        }

        // create the sides
        for (let y = 0, len = this.height; y < len; y++) {

            // left edge
            let key = this.getKeyForCoords(0, y);
            this.map[key] = '|';

            // right edge
            key = this.getKeyForCoords(this.width - 1, y);
            this.map[key] = '|';

        }

        // create the corners
        this.map[0] = '+';
        this.map[this.width - 1] = '+';
        this.map[this.width * this.height - 1] = '+';
        this.map[this.width * this.height - this.width] = '+';
    }

    mineMap(startpoint) {

        var coords = this.getCoordsForKey(startpoint),
            large = (Math.random() > 0.3);

        for (let i = 0, len = this.CAVERN_SIZE; i < len; i++) {

            let rand = Math.random();

            this.minePoint(coords[0], coords[1], large);

            if (rand < 0.25) {
                coords[0] += 1;
            } else if (rand < 0.5) {
                coords[0] -= 1;
            } else if (rand < 0.75) {
                coords[1] += 1;
            } else {
                coords[1] -= 1;
            }
        }

    }

    minePoint(x, y, large) {

        if (this.isCoordsValid(x, y)) {
            this.map[this.getKeyForCoords(x, y)] = '.';
        }

        if (large) {

            if (this.isCoordsValid(x - 1, y)) {
                this.map[this.getKeyForCoords(x - 1, y)] = '.';
            }

            if (this.isCoordsValid(x + 1, y)) {
                this.map[this.getKeyForCoords(x + 1, y)] = '.';
            }

            if (this.isCoordsValid(x, y - 1)) {
                this.map[this.getKeyForCoords(x, y - 1)] = '.';
            }

            if (this.isCoordsValid(x, y + 1)) {
                this.map[this.getKeyForCoords(x, y + 1)] = '.';
            }

        }

    }

    getFreePosition() {

        var key, points;

        do {
            key = Math.floor(Math.random() * this.map.length);
        } while (this.map[key] !== '.');

        points = this.getCoordsForKey(key);

        return {
            x: points[0],
            y: points[1]
        };

    }

    createMobs() {

        this.mobs = [];

        for (let i = 0, len = this.MOBS; i < len; i++) {

            let position = this.getFreePosition();

            let MobClass = mobs.getRandomMob();

            let mob = new MobClass({
                position: position
            });

            this.mobs.push(mob);
        }

    }

    createStartPoint() {
        var start = this.getFreePosition();

        return start;
    }

    createEndPoint() {

        var end = this.getFreePosition();
        this.map[this.getKeyForCoords(end.x, end.y)] = '>';
    }

    moveMob(mob) {

        var x, y, key;

        x = mob.position.x;
        y = mob.position.y;
        mob.move();

        key = this.getKeyForCoords(mob.position.x, mob.position.y);
        if (this.map[key] !== '.') {
            mob.position.x = x;
            mob.position.y = y;
        }

    }

}

export default new Level();
