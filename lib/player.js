class Player {

    constructor() {
        this.position = {
            x: null,
            y: null
        };

        this.type = 'O';
        this.setWait(0);
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    setWait(steps) {
        this.moveTime = steps;
        this.waitTime = steps;
    }

    move(position) {

        if (this.waitTime > 0) {
            this.waitTime--;
            return;
        } else {
            this.waitTime = this.moveTime;
        }

        this.setPosition({
            x: this.position.x + position.x,
            y: this.position.y + position.y
        });
    }
}

export default new Player();
