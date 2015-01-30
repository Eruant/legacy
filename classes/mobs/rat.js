import Mob from '../mob';

class Rat extends Mob {

    constructor(options) {
        super(options);

        this.setType('r');
    }

}

export default Rat;
