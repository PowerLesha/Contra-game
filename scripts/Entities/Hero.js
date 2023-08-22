import { Container, Graphics } from "../../pixi/pixi.mjs";

const states = {
  stay: "stay",
  jump: "jump",
  FlyDown: "flydown",
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

    if (this.#velocityY > 0 && this.isJumpState()) {
      this.#state = states.FlyDown;
    }

    this.#velocityY += this.#GRAVITY_FORCE;
    this.y += this.#velocityY;
  }

  stay() {
    this.#state = states.stay;
    this.#velocityY = 0;
  }

  isJumpState() {
    return this.#state == states.jump;
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
    if (this.#state != states.jump && this.#state != states.FlyDown) {
      this.#state = states.jump;
      this.#velocityY -= this.#JUMP_FORCE;
    }
  }

  #rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  getRect() {
    this.#rect.x = this.x;
    this.#rect.y = this.y;
    this.#rect.width = this.width;
    this.#rect.height = this.height;

    return this.#rect;
  }
}
