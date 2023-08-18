import { Component, Prop, h, Host } from '@stencil/core';

@Component({
  tag: 'ecl-accordion-item',
  styleUrl: 'ecl-accordion-item.css',
  shadow: false
})
export class EclAccordion {
  @Prop() styleClass: string;
  @Prop() label: string;
  @Prop() isExpanded: boolean = false;

  getClass(): string {
    return [
      `ecl-accordion2__item`,
      `ecl-u-d-block`,
      this.styleClass
    ].join(' ');
  }

  onItemClick() {
    this.isExpanded = !this.isExpanded;
  }

  render() {
    return (
      <Host
        class={this.getClass()}>
        <h3 class="ecl-accordion2__title">
          <button
            onClick={this.onItemClick.bind(this)}
            type="button"
            aria-expanded={`${this.isExpanded}`}
            class="ecl-accordion2__toggle"
            data-ecl-accordion2-toggle="true"
            aria-controls="accordion-example-content">
            <span class="ecl-accordion2__toggle-flex">
              { (!this.isExpanded) ? <ecl-icon icon="ui--plus" size="m" styleClass="ecl-accordion2__toggle-icon" aria-hidden={!this.isExpanded}></ecl-icon> : ''}
              { (this.isExpanded) ? <ecl-icon icon="ui--minus" size="m" styleClass="ecl-accordion2__toggle-icon" aria-hidden={this.isExpanded}></ecl-icon> : ''}
              <span class="ecl-accordion2__toggle-title">{this.label}</span>
            </span>
          </button>
        </h3>
        <div class="ecl-accordion2__content" hidden={!this.isExpanded} role="region">
          <slot></slot>
        </div>
      </Host>
    )
  }
}
