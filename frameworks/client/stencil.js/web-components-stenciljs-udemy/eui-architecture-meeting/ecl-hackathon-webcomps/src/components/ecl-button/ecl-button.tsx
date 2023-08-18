import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'ecl-button',
  styleUrl: 'ecl-button.css',
  shadow: false
})
export class EclButton {
  @Prop() styleClass: string;
  @Prop() type: string = 'primary';

  getClass(): string {
    return [
      `ecl-button`,
      `ecl-button--${this.type}`,
      this.styleClass
    ].join(' ');
  }

  render() {
    return (
      <Host
        type="primary"
        class={this.getClass()}>
        <span class="ecl-button__container">
          <span class="ecl-button__label">
            <slot></slot>
          </span>
          <slot name="icon"></slot>
        </span>
      </Host>
    )
  }
}
