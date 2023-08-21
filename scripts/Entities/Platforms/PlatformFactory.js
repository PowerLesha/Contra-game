import Platform from "./Platform.js";

export default class PlatformFactory {
  #app;
  constructor(app) {
    this.#app = app;
  }

  createPlatform(x, y) {
    const platform = new Platform();
    platform.x = x;
    platform.y = y;
    this.#app.stage.addChild(platform);
    return platform;
  }
}
