class Mob {

    constructor() {
        this.position = {
            x: null,
            y: null
        };

        this.type = 'm';
    }

    setPosition(position) {

        this.position.x = position.x;
        this.position.y = position.y;
    }

    setType(type) {

        this.type = type;
    }

    debug() {
        console.log('type', this.type);
        console.log('position x:%s y: %s', this.position.x, this.position.y);
    }

}

export default Mob;
