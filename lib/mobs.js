import Spider from '../classes/mobs/spider';
import Rat from '../classes/mobs/rat';

class Mobs {

    constructor() {
        this.mobs = {
            spider: Spider,
            rat: Rat
        };

    }

    getNumberOfMobs() {

        var size = 0;

        for (let key in this.mobs) {
            if (this.mobs.hasOwnProperty(key)) {
                size++;
            }
        }

        return size;

    }

    getRandomMob() {

        var random = Math.floor(this.getNumberOfMobs() * Math.random()),
            count = 0;

        for (let key in this.mobs) {
            if (this.mobs.hasOwnProperty(key)) {
                if (count === random) {
                    return this.mobs[key];
                }
                count++;
            }
        }

        return false;
    }

}

export default new Mobs();
