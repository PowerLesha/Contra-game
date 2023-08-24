import HeroView from "./HeroView.js";

const states = {
  stay: "stay",
  jump: "jump",
  FlyDown: "flydown",
};

export default class Hero {
  #GRAVITY_FORCE = 0.2;
  #SPEED = 3;
  #velocityX = 0;
  #velocityY = 0;
  #JUMP_FORCE = 9;

  #movement = {
    x: 0,
    y: 0,
  };

  #directionContext = {
    left: 0,
    right: 0,
  };
  #state = states.stay;

  #view;
  constructor(stage) {
    this.#view = new HeroView();
    stage.addChild(this.#view);
    this.#view.showStay();
  }

  get collisionBox() {
    return this.#view.collisionBox;
  }

  get x() {
    return this.#view.x;
  }
  set x(value) {
    this.#view.x = value;
  }

  get y() {
    return this.#view.y;
  }
  set y(value) {
    this.#view.y = value;
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

  stay(platformY) {
    this.#state = states.stay;
    this.#velocityY = 0;

    this.y = platformY - this.#view.collisionBox.height;
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

  throwDown() {
    this.#state = states.jump;
  }
  startUpMove() {
    if (this.#state != states.jump && this.#state != states.FlyDown) {
      this.#state = states.jump;

      this.#velocityY -= this.#JUMP_FORCE;
      this.#view.showJump();
    }
  }

  stopJump() {
    this.#view.showStay();
  }

  lay() {
    this.#view.showLay();
  }

  stopLay() {
    this.#view.showStay();
  }

  run() {
    this.#view.showRun();
  }

  stopRun() {
    this.#view.showStay();
  }
}
