class Mob {

    constructor(options) {
        this.position = {};
        this.setPosition(options.position);
        this.setType('m');

        this.modes = {
            0: 'normal'
        };

        this.mode = 0;
    }

    setPosition(position) {

        this.position.x = position.x;
        this.position.y = position.y;
    }

    setType(type) {

        this.type = type;
    }

    move() {

        var random = Math.random(),
            x = 0,
            y = 0;

        if (random < 0.25) {
            x = -1;
        } else if (random < 0.5) {
            x = 1;
        } else if (random < 0.75) {
            y = -1;
        } else {
            y = 1;
        }

        let bx = this.position.x;
        let by = this.position.y;

        this.position.x += x;
        this.position.y += y;

    }

    setMode(mode) {
        this.mode = mode;
    }

}

export default Mob;
