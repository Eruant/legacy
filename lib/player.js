class Player {

    constructor() {
        this.position = {
            x: null,
            y: null
        };

        this.type = '☃';
        this.health = 100;
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    move(position) {

        this.setPosition({
            x: this.position.x + position.x,
            y: this.position.y + position.y
        });
    }

    heal(amount) {
        this.health += amount;
    }

    injure(amount) {
        this.health -= amount;
    }
}

export default new Player();
