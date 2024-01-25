/*
 * plugin.tsx
 *
 * Copyright (c) 2023-2024 Xiongfei Shi
 *
 * Author: Xiongfei Shi <xiongfei.shi(a)icloud.com>
 * License: Apache-2.0
 *
 * https://github.com/shixiongfei/phaser3-reactdom
 */

import React, { ElementType } from "react";
import { createRoot } from "react-dom/client";
import { Plugins, Scene } from "phaser";
import Renderer from "./renderer.js";
import Components from "./components.js";

export class PhaserReact extends Plugins.BasePlugin {
  constructor(pluginManager: Plugins.PluginManager) {
    super(pluginManager);
    pluginManager.registerGameObject("reactDom", this.createReactDom);
  }

  init() {
    const container = this.game.domContainer;

    if (!container) {
      return console.error(
        "this plugins requires you have `dom: { createContainer: true }` in your game config",
      );
    }

    const root = createRoot(container);
    root.render(<Renderer />);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createReactDom<T extends object>(component: ElementType<any>, props?: T) {
    return Components.addComponent(component, props);
  }
}

export class PhaserSceneReact extends Plugins.ScenePlugin {
  constructor(
    scene: Scene,
    pluginManager: Plugins.PluginManager,
    pluginKey: string,
  ) {
    super(scene, pluginManager, pluginKey);
    pluginManager.registerGameObject("sceneReactDom", this.createSceneReactDom);
  }

  createSceneReactDom<T extends object>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: ElementType<any>,
    props?: T,
  ) {
    if (!this.scene) {
      return undefined;
    }

    const sceneReact = this.scene.add.reactDom(component, props);

    this.scene.input.on("pointerdown", sceneReact.blur, sceneReact);

    this.scene.events.once("shutdown", () => {
      if (this.scene) {
        this.scene.input.off("pointerdown", sceneReact.blur, sceneReact);
      }
      sceneReact.destroy();
    });

    return sceneReact;
  }
}
