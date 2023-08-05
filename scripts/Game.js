import Hero from "./Entities/Hero.js";
import Platform from "./Entities/Platform.js";

export default class Game {
  #app;
  #hero;
  #platform;
  constructor(app) {
    this.#app = app;

    this.#hero = new Hero();
    this.#hero.x = 200;
    this.#hero.y = 200;
    this.#app.stage.addChild(this.#hero);

    this.#platform = new Platform();
    this.#platform.x = 100;
    this.#platform.y = 400;
    this.#app.stage.addChild(this.#platform);
  }

  update() {
    const y = this.#hero.y;
    this.#hero.update();

    if (this.isCheckedCollision(this.#hero, this.#platform)) {
      this.#hero.y = y;
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
