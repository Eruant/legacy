import Mob from '../mob';

class Spider extends Mob {

    constructor(options) {
        super(options);

        this.setType('s');
        this.setWait(40);
    }

}

export default Spider;
