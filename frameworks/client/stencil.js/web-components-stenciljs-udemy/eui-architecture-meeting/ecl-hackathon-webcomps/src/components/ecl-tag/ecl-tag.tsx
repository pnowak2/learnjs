import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'ecl-tag',
  styleUrl: 'ecl-tag.css',
  shadow: false
})
export class EclTag {
  @Prop() styleClass: string;
  @Prop() isRemovable: boolean;

  getClass(): string {
    return [
      `ecl-tag`,
      this.styleClass
    ].join(' ');
  }

  getRemovable() {
    return (<span class="ecl-tag__icon">
      <ecl-icon icon="ui--close" styleClass="ecl-tag__icon-close"></ecl-icon>
      <ecl-icon icon="ui--close-filled" styleClass="ecl-tag__icon-close-filled"></ecl-icon>
    </span>)
  }

  render() {
    return (
      <Host
        type="primary"
        class={this.getClass()}>
        <slot></slot>
        { this.isRemovable ? <this.getRemovable /> : '' }
      </Host>
    )
  }
}
