import { Container, Graphics } from "../../pixi/pixi.mjs";

const states = {
  stay: "stay",
  jump: "jump",
};

export default class Hero extends Container {
  #GRAVITY_FORCE = 0.1;
  #SPEED = 2;
  #velocityX = 0;
  #velocityY = 0;
  #JUMP_FORCE = 5.5;

  #movement = {
    x: 0,
    y: 0,
  };

  #directionContext = {
    left: 0,
    right: 0,
  };
  #state = states.stay;
  constructor() {
    super();

    const view = new Graphics();
    view.lineStyle(1, 0xf00000);
    view.drawRect(0, 0, 20, 60);

    this.addChild(view);
  }

  update() {
    this.#velocityX = this.#movement.x * this.#SPEED;
    this.x += this.#velocityX;
    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }

  stay() {
    this.#state = states.stay;
    this.#velocityY = 0;
  }

  startLeftMove() {
    this.#directionContext.left = -1;
    this.#movement.x = -1;

    if (this.#directionContext.right > 0) {
      this.#movement.x = 0;
    }
  }

  startRightMove() {
    this.#directionContext.right = 1;
    this.#movement.x = 1;

    if (this.#directionContext.left > 0) {
      this.#movement.x = 0;
    }
  }

  stopLeftMove() {
    this.#directionContext.left = 0;
    this.#movement.x = this.#directionContext.right;
  }

  stopRightMove() {
    this.#directionContext.right = 0;
    this.#movement.x = this.#directionContext.left;
  }

  startUpMove() {
    if (this.#state != states.jump) {
      this.#state = states.jump;
      this.#velocityY -= this.#JUMP_FORCE;
    }
  }
}
