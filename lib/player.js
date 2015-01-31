import tiles from './tileKey';

class Player {

    constructor() {
        this.position = {
            x: null,
            y: null
        };

        this.type = tiles.mobs.player;
        this.health = 100;
        this.maxHealth = 100;
        this.weapon = null;
    }

    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }

    move(position) {

        this.setPosition({
            x: this.position.x + position.x,
            y: this.position.y + position.y
        });
    }

    heal(amount) {
        this.health += amount;

        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }

    injure(amount) {
        this.health -= amount;
    }

    arm(weapon) {
        this.weapon = weapon;
    }
}

export default new Player();
