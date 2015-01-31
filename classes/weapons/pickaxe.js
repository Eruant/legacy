import weapon from '../weapon';
import tiles from '../../lib/tileKey';

class Pickaxe extends weapon {

    constructor() {
        super();

        this.type = 'Pickaxe';
        this.bonus = tiles.map.rock.charAt(0);
    }
}

export default Pickaxe;
