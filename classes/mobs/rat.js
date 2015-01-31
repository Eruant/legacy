import Mob from '../mob';

class Rat extends Mob {

    constructor(options) {
        super(options);

        this.setType(this.tiles.rat);
    }

}

export default Rat;
