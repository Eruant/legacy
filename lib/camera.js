class Camera {

    constructor() {

        this.position = {
            x: 0,
            y: 0
        };

        this.setViewportSize({
            width: 20,
            height: 20
        });

        this.viewport = {
            width: 20,
            height: 20
        };

        this.half = {
            width: Math.floor(this.viewport.width * 0.5),
            height: Math.floor(this.viewport.height * 0.5)
        };
    }

    setViewportSize(size) {

        this.viewport = size;
        this.half = {
            width: Math.floor(this.viewport.width * 0.5),
            height: Math.floor(this.viewport.height * 0.5)
        };
    }

    setViewportBounds(level) {

        this.minPosition = {
            x: this.half.width,
            y: this.half.height
        };

        this.maxPosition = {
            x: level.width - this.half.width,
            y: level.height - this.half.height
        };
    }

    setPosition(position) {

        if (position.x < this.minPosition.x) {
            this.position.x = this.minPosition.x;
        } else if (position.x > this.maxPosition.x) {
            this.position.x = this.maxPosition.x;
        } else {
            this.position.x = position.x;
        }

        if (position.y < this.minPosition.y) {
            this.position.y = this.minPosition.y;
        } else if (position.y > this.maxPosition.y) {
            this.position.y = this.maxPosition.y;
        } else {
            this.position.y = position.y;
        }

    }

    move(position) {
        this.setPosition({
            x: this.position.x + position.x,
            y: this.position.y + position.y
        });
    }
}

export default new Camera();
