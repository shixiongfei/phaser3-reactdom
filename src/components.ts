/*
 * components.ts
 *
 * Copyright (c) 2023 Xiongfei Shi
 *
 * Author: Xiongfei Shi <xiongfei.shi(a)icloud.com>
 * License: Apache-2.0
 *
 * https://github.com/shixiongfei/phaser3-reactdom
 */

import { ElementType } from "react";
import EventEmitter from "eventemitter3";

export class ReactDomElement<T extends object> {
  events: EventEmitter;
  components: Components;
  id: number;
  state: T;

  constructor(id: number, state: T, components: Components) {
    this.events = new EventEmitter();
    this.components = components;
    this.id = id;
    this.state = { ...state };
  }

  setState(state: T) {
    this.state = { ...this.state, ...state };
    this.events.emit("state-change", this.state);
  }

  blur() {
    this.events.emit("blur");
  }

  destroy() {
    this.components.removeComponent(this.id);
  }
}

class Components {
  events: EventEmitter;
  lastId: number;

  constructor() {
    this.events = new EventEmitter();
    this.lastId = 0;
  }

  addComponent<T extends object>(component: ElementType, props?: T) {
    const element = new ReactDomElement(++this.lastId, props ?? {}, this);

    this.events.emit("component-added", {
      element: element,
      component: component,
    });
    return element;
  }

  removeComponent(id: number) {
    this.events.emit("component-removed", id);
  }
}

export default new Components();
