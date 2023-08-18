import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'ecl-message',
  styleUrl: 'ecl-message.css',
  shadow: false
})
export class EclMessage {
  @Prop() styleClass: string;
  @Prop() typeClass: string = 'info';
  @Prop() title: string;

  getClass(): string {
    return [
      `ecl-message`,
      `ecl-message--${this.typeClass}`,
      this.styleClass
    ].join(' ');
  }

  getIcon() {
    if (this.typeClass === 'info') {
      return 'notifications--information';
    } else if (this.typeClass === 'success') {
      return 'notifications--success';
    } else if (this.typeClass === 'warning') {
      return 'notifications--warning';
    } else if (this.typeClass === 'error') {
      return 'notifications--error';
    } else {
      return 'notifications--information';
    }
  }

  render() {
    return (
      <div role="alert" class={this.getClass()}>
        <ecl-icon size="l" styleClass="ecl-message__icon" icon={this.getIcon()}></ecl-icon>

        <div class="ecl-message__content">
          <ecl-button styleClass="ecl-message__close" type="ghost">
            Close
            <ecl-icon slot="icon" icon="ui--close" size="s"></ecl-icon>
          </ecl-button>
          <div class="ecl-message__title">{this.title}</div>
          <p class="ecl-message__description"><slot></slot></p>
        </div>
      </div>
    )
  }
}
