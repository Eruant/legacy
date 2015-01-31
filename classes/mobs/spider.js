import Mob from '../mob';

class Spider extends Mob {

    constructor(options) {
        super(options);

        this.setType(this.tiles.spider);
        this.setWait(40);
    }

}

export default Spider;
