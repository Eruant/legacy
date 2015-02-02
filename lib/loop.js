class Loop {

    constructor() {

        // 1000 / 60 === 60 fps (too fast for us!)
        this.fps = 1000 / 60;
        this.pause = true;
    }

    start() {
        this.pause = false;
        this.startTime = new Date().getTime();
        this.timeSinceLastUpdate = 0;

        this.tick(0);
    }

    stop() {
        this.pause = true;
    }

    tick(timestamp) {

        if (this.pause) {
            return;
        }

        var timePassed = new Date().getTime() - this.startTime,
            delta = timestamp - timePassed;

        this.timeSinceLastUpdate += delta;

        if (this.timeSinceLastUpdate > this.fps) {
            this.update();
            this.timeSinceLastUpdate = 0;
        }
        this.draw();

        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(this.tick.bind(this));
        } else {
            this.raf();
        }
    }

    raf() {

        var self = this,
            fps = 1000 / 60;

        setTimoue(function () {
            self.tick.bind(self);
        }, fps);
    }

    // stubs to be overritten
    update() {}
    draw() {}
}

export default new Loop();
