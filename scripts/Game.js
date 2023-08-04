import Hero from "./Entities/Hero.js";

export default class Game {
  #app;

  constructor(app) {
    this.app = app;
    this.app.stage.addChild(new Hero());
  }
}
