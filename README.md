# phaser3-reactdom

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
    const topUI = this.add.reactDom(ComponentTopUI);
    // ...

    // The sceneUI will be destroyed simultaneously as the scene is destroyed.
    const sceneUI = this.add.sceneReactDom(ComponentSceneUI);
    // ...
  }
  // ...
}
```
