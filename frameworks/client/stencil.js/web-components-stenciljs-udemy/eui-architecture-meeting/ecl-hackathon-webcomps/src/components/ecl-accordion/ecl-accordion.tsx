import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'ecl-accordion',
  styleUrl: 'ecl-accordion.css',
  shadow: false
})
export class EclAccordion {
  @Prop() styleClass: string;

  getClass(): string {
    return [
      `ecl-accordion2`,
      `ecl-u-d-block`,
      this.styleClass
    ].join(' ');
  }

  render() {
    return (
      <Host
        class={this.getClass()}>
        <slot></slot> 
      </Host>
    )
  }
}
