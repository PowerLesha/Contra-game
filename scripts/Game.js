import Hero from "./Entities/Hero.js";
import Platform from "./Entities/Platform.js";

export default class Game {
  #app;
  #hero;
  #platforms = [];
  constructor(app) {
    this.#app = app;

    this.#hero = new Hero();
    this.#hero.x = 200;
    this.#hero.y = 200;
    this.#app.stage.addChild(this.#hero);

    const platform1 = new Platform();
    platform1.x = 100;
    platform1.y = 400;
    this.#app.stage.addChild(platform1);

    const platform2 = new Platform();
    platform2.x = 500;
    platform2.y = 500;
    this.#app.stage.addChild(platform2);

    const platform3 = new Platform();
    platform3.x = 850;
    platform3.y = 450;
    this.#app.stage.addChild(platform3);

    this.#platforms.push(platform1);
    this.#platforms.push(platform2);
    this.#platforms.push(platform3);
  }

  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    };
    this.#hero.update();

    for (let i = 0; i < this.#platforms.length; i++) {
      if (!this.isCheckedCollision(this.#hero, this.#platforms[i])) {
        continue;
      }
      let currentY = this.#hero.y;
      this.#hero.y = prevPoint.y;
      if (!this.isCheckedCollision(this.#hero, this.#platforms[i])) {
        this.#hero.stay();
        continue;
      }
      this.#hero.y = currentY;
      this.#hero.x = prevPoint.x;
    }
  }

  isCheckedCollision(entity, area) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    );
  }
}
