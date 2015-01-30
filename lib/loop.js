class Loop {

    constructor() {

        // 1000 / 60 === 60 fps (too fast for us!)
        this.fps = 1000 / 60;
    }

    start() {
        this.startTime = new Date().getTime();
        this.timeSinceLastUpdate = 0;

        this.tick(0);
    }

    tick(timestamp) {

        var timePassed = new Date().getTime() - this.startTime,
            delta = timestamp - timePassed;

        this.timeSinceLastUpdate += delta;

        if (this.timeSinceLastUpdate > this.fps) {
            this.update();
            this.timeSinceLastUpdate = 0;
        }
        this.draw();
        window.requestAnimationFrame(this.tick.bind(this));
    }

    // stubs to be overritten
    update() {}
    draw() {}
}

export default new Loop();
