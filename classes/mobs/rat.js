import Mob from '../mob';

class Rat extends Mob {

    constructor(options) {
        super(options);

        this.setType(this.tiles.rat);
        this.health = 30;
        this.score = 2;
        this.damage = 2;
    }

}

export default Rat;
