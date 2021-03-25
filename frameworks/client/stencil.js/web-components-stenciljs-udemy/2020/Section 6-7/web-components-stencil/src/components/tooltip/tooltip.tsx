import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'uc-tooltip',
  shadow: true,
  styleUrl: 'tooltip.css'
})
export class Tooltip {
  @Prop() tooltip: string;
  @State() isVisible = false;

  onTooltipClicked() {
    this.isVisible = !this.isVisible;
  }

  render() {
    let tooltip = null;

    if(this.isVisible) {
      tooltip = <div class="tooltip">{ this.tooltip } </div>;
    }

    return [
      <slot />,
      <span id="trigger" onClick={this.onTooltipClicked.bind(this)}>?</span>,
      tooltip
  ]
  }
}
