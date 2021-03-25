import { Component, h } from '@stencil/core';
export class Spinner {
  render() {
    return (h("div", { class: "lds-hourglass" }));
  }
  static get is() { return "uc-spinner"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() { return {
    "$": ["spinner.css"]
  }; }
  static get styleUrls() { return {
    "$": ["spinner.css"]
  }; }
}
