class Player {
  constructor(name, health = 100, power = 10) {
    this.name = name;
    this.health = health;
    this.power = power;
  }

  hit(power) {
    this.health -= power;
    if (this.health < 0) this.health = 0;
  }

  useItem(item) {
    if (item.health !== undefined && item.power === undefined) {
      this.health += item.health;
      console.log(`Darah bertambah ${item.health}. Darah Setelah mendapat tambahan: ${this.health}`);
    } else if (item.power !== undefined && item.health === undefined) {
      this.power += item.power;
      console.log(`Power bertambah ${item.power}. power setalah mendapat tambahan: ${this.power}`);
    }
  }

  showStatus() {
    console.log(`${this.name} (Health => ${this.health}, Power => ${this.power})`);
  }
}

class ShootingGame {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
  }

  getRandomItem() {
    const item = {};

    if (Math.random() < 0.5) {
      item.health = Math.random() < 0.5 ? 0 : 10;
      item.power = 0;
    } else {
      item.health = 0;
      item.power = Math.random() < 0.5 ? 0 : 10;
    }

    return item;
  }

  start() {
    let currentPlayer = this.player1;
    let nextPlayer = this.player2;

    do {
      this.player1.showStatus();
      this.player2.showStatus();

      const item1 = this.getRandomItem();
      const item2 = this.getRandomItem();

      this.player1.useItem(item1);
      this.player2.useItem(item2);

      console.log(`\n${this.player1.name} gets item:`, item1);
      console.log(`${this.player2.name} gets item:`, item2);

      console.log(`\nIt's ${currentPlayer.name}'menembak.`);

      nextPlayer.hit(currentPlayer.power);

      [currentPlayer, nextPlayer] = [nextPlayer, currentPlayer];

    } while (this.player1.health > 0 && this.player2.health > 0);

    console.log('\nGame Over!');
    if (this.player1.health <= 0) {
      console.log(`${this.player2.name} pemenangnya`);
    } else {
      console.log(`${this.player1.name} pemenangnya`);
    }
  }
}

const player1 = new Player('Sepuh adi');
const player2 = new Player('Sepuh Chandra');

const game = new ShootingGame(player1, player2);
game.start();
