class Score {

    constructor() {
        this.gold = 0;
        this.points = 0;
        this.kills = 0;
    }

    addKill(sum) {
        this.kills += sum;
    }

    addPoints(points, depth) {
        this.points += points * depth;
    }

    addGold(sum) {
        this.gold += sum;
    }

    currentScore() {
        return this.gold + this.points + this.kills;
    }

}

export default new Score();
