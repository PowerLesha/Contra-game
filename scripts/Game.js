import KeyboardProcessor from "../KeyboardProcessor.js";
import Hero from "./Entities/Hero.js";

import PlatformFactory from "./Entities/Platforms/PlatformFactory.js";

export default class Game {
  #app;
  #hero;
  #platforms = [];
  keyboardProcessor;
  constructor(app) {
    this.#app = app;

    this.#hero = new Hero();
    this.#hero.x = 100;
    this.#hero.y = 100;
    this.#app.stage.addChild(this.#hero);

    const platformFactory = new PlatformFactory(this.#app);

    this.#platforms.push(platformFactory.createPlatform(100, 400));
    this.#platforms.push(platformFactory.createPlatform(500, 500));
    this.#platforms.push(platformFactory.createPlatform(850, 450));

    this.keyboardProcessor = new KeyboardProcessor(this);

    this.keyboardProcessor.getButton("ArrowUp").executeDown = function () {
      this.#hero.startUpMove();
    };

    this.keyboardProcessor.getButton("ArrowLeft").executeDown = function () {
      this.#hero.startLeftMove();
    };
    this.keyboardProcessor.getButton("ArrowLeft").executeUp = function () {
      this.#hero.stopLeftMove();
    };

    this.keyboardProcessor.getButton("ArrowRight").executeDown = function () {
      this.#hero.startRightMove();
    };
    this.keyboardProcessor.getButton("ArrowRight").executeUp = function () {
      this.#hero.stopRightMove();
    };
  }

  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    };
    this.#hero.update();

    for (let i = 0; i < this.#platforms.length; i++) {
      const collisionResult = this.getPlatformCollisoinResult(
        this.#hero,
        this.#platforms[i],
        prevPoint
      );
      if (collisionResult.vertical == true) {
        this.#hero.stay();
      }
    }
  }

  getPlatformCollisoinResult(character, platform, prevPoint) {
    const collisionResult = {
      horizontal: false,
      vertical: false,
    };

    if (!this.isCheckedCollision(character, platform)) {
      return collisionResult;
    }
    let currentY = character.y;
    character.y = prevPoint.y;
    if (!this.isCheckedCollision(character, platform)) {
      collisionResult.vertical = true;
      return collisionResult;
    }
    character.y = currentY;
    character.x = prevPoint.x;
    collisionResult.horizontal = true;
    return collisionResult;
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
