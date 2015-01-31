class IO {

    constructor() {
        this.bindKeyboard();

        this.activeKeys = [];

    }

    bindKeyboard() {
        window.addEventListener('keydown', (event) => { this.keyPressed(event); }, false);
        window.addEventListener('keyup', (event) => { this.keyReleased(event); }, false);
    }

    keyPressed(event) {

        if (this.activeKeys.indexOf(event.keyCode) === -1) {
            this.activeKeys.push(event.keyCode);
        }

        if (event.keyCode === 13) {
            this.triggerEnd();
        }
    }

    keyReleased(event) {

        var i = this.activeKeys.indexOf(event.keyCode);

        if (i !== -1) {
            this.activeKeys.splice(i, 1);
        }
    }

    getDirection() {

        var left = (this.activeKeys.indexOf(37) !== -1) ? -1 : 0,
            right = (this.activeKeys.indexOf(39) !== -1) ? 1: 0,
            up = (this.activeKeys.indexOf(38) !== -1) ? -1 : 0,
            down = (this.activeKeys.indexOf(40) !== -1) ? 1 : 0;

        return {
            x: left + right,
            y: up + down
        };
    }

    // stub
    triggerEnd() {}

}

export default new IO();
