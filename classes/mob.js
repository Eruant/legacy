class Mob {

    constructor(options) {
        this.position = {};
        this.setPosition(options.position);
        this.setType('m');
    }

    setPosition(position) {

        this.position.x = position.x;
        this.position.y = position.y;
    }

    setType(type) {

        this.type = type;
    }

}

export default Mob;
