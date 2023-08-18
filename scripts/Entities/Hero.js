import { Container, Graphics } from "../../pixi/pixi.mjs";

export default class Hero extends Container {
  constructor() {
    super();

    const view = new Graphics();
    view.lineStyle(1, 0xff0000);
    view.drawRect(0, 0, 20, 60);

    this.addChild(view);
  }

  update() {
    this.y += 1;
    this.x += 1;
  }
}
