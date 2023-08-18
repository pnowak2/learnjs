import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'ecl-expandable',
  styleUrl: 'ecl-expandable.css',
  shadow: false
})
export class EclExpandable {
  @Prop() styleClass: string;
  @Prop() isExpanded: boolean;

  getClass(): string {
    return [
      `ecl-expandable`,
      this.styleClass
    ].join(' ');
  }

  onExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  render() {
    return (
      <Host
        type="primary"
        class={this.getClass()}>
        <ecl-button
          onClick={this.onExpanded.bind(this)}
          type="secondary"
          aria-expanded={`${this.isExpanded}`}
          styleClass="ecl-expandable__toggle">
          {(!this.isExpanded) ? 'Expand' : 'Collapse'}
          <ecl-icon slot="icon" icon="ui--corner-arrow" size="fluid" transform="rotate-180" class="ecl-button__icon"></ecl-icon>
        </ecl-button>
        <div class="ecl-expandable__content" id="expandable-example-content" hidden={!this.isExpanded}>
          <slot></slot>
        </div>
      </Host >
    )
  }
}
