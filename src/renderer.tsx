/*
 * renderer.tsx
 *
 * Copyright (c) 2023-2024 Xiongfei Shi
 *
 * Author: Xiongfei Shi <xiongfei.shi(a)icloud.com>
 * License: Apache-2.0
 *
 * https://github.com/shixiongfei/phaser3-reactdom
 */

import React, { Component, ElementType, RefObject } from "react";
import Components, { ReactDomElement } from "./components.js";

type ReactDomComponent = {
  element: ReactDomElement<object>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: ElementType<any>;
};

class Wrap extends Component<ReactDomComponent> {
  ref: RefObject<HTMLDivElement>;

  constructor(props: ReactDomComponent) {
    super(props);
    this.state = { ...props.element.state };
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.props.element.events.on("state-change", this.setState, this);
    this.props.element.events.on("blur", () => {
      const inputs = this.ref.current?.querySelectorAll("input");
      inputs?.forEach((input) => input.blur());
    });
  }

  render() {
    return (
      <div ref={this.ref} style={{ pointerEvents: "auto" }}>
        <this.props.component {...this.state} />
      </div>
    );
  }
}

class Renderer extends Component<object, { components: ReactDomComponent[] }> {
  constructor(props: object) {
    super(props);
    this.state = { components: [] };
  }

  componentDidMount() {
    Components.events.on("component-added", this.addComponent, this);
    Components.events.on("component-removed", this.removeComponent, this);
  }

  addComponent(component: ReactDomComponent) {
    this.setState((state) => ({
      components: [component, ...state.components],
    }));
  }

  removeComponent(id: number) {
    this.setState((state) => ({
      components: state.components.filter(
        (component) => component.element.id !== id,
      ),
    }));
  }

  render() {
    return (
      <>
        {this.state.components.map(({ element, component }) => (
          <Wrap key={element.id} element={element} component={component} />
        ))}
      </>
    );
  }
}

export default Renderer;
