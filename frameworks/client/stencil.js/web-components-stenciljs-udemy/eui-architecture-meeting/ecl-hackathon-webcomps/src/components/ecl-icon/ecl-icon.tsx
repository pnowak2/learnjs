import { Component, Prop, h } from '@stencil/core';
// import AppLogo from "../../assets/icons/svg/ui/close.svg";

@Component({
  tag: 'ecl-icon',
  styleUrl: 'ecl-icon.css',
  shadow: false
})
export class EclIcon {
  @Prop() styleClass: string;
  @Prop() icon: string;
  @Prop() size: string = 'xs';
  @Prop() color: string;
  @Prop() transform: string;

  getClass(): string {
    return [
      `ecl-icon`,
      `ecl-icon--${this.size}`,
      `ecl-icon--${this.color}`,
      `ecl-icon--${this.transform}`,
      this.styleClass
    ].join(' ');
  }

  render() {
    return (
      <svg class={this.getClass()}>
        <use xlinkHref={`assets/icons/sprites/icons.svg#${this.icon}`}></use>
      </svg>
    )
  }
}