/*
 * index.ts
 *
 * Copyright (c) 2023-2024 Xiongfei Shi
 *
 * Author: Xiongfei Shi <xiongfei.shi(a)icloud.com>
 * License: Apache-2.0
 *
 * https://github.com/shixiongfei/phaser3-reactdom
 */

export * from "./plugin.js";
export { default as Renderer } from "./renderer.js";

import { ElementType } from "react";
import { ReactDomElement } from "./components.js";

declare module "phaser" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace GameObjects {
    interface GameObjectFactory {
      reactDom<T extends object>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component: ElementType<any>,
        props?: T,
      ): ReactDomElement<T>;

      sceneReactDom<T extends object>(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        component: ElementType<any>,
        props?: T,
      ): ReactDomElement<T>;
    }
  }
}
