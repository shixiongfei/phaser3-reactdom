# phaser3-reactdom

[![NPM Version](https://img.shields.io/npm/v/phaser3-reactdom)](https://www.npmjs.com/package/phaser3-reactdom)

Using React in the Phaser3 engine

### Configure phaser3-reactdom plugin

```JavaScript
import { PhaserReact, PhaserSceneReact } from "phaser3-reactdom";

const game = new Phaser.Game({
  // ...
  dom: { createContainer: true },
  // ...
  plugins: {
    global: [
      // ...
      {
        key: "phaser3-reactdom",
        plugin: PhaserReact,
        start: true,
      }
    ],
    scene: [
      // ...
      {
        key: "phaser3-reactdom-scene",
        plugin: PhaserSceneReact,
        start: true,
      }
    ],
    // ...
  },
  // ...
})
```

### Using React

```JavaScript
class ExampleScene extends Phaser.Scene {
  // ...
  create() {
    // The topUI will not be destroyed during scene destruction.
    const topUI = this.add.reactDom(ComponentTopUI, { state: ... });
    // ...

    // The sceneUI will be destroyed simultaneously as the scene is destroyed.
    this.sceneUI = this.add.sceneReactDom(ComponentSceneUI, { state: ... });
    // ...
  }
  // ...
  updateSceneUIState() {
    // Setting new state
    this.sceneUI.setState({ state: ... })
  }
}
```
