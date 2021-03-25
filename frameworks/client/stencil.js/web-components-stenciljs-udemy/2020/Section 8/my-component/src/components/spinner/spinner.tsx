
import { Component, h } from '@stencil/core';

@Component({
  tag: 'uc-spinner',
  styleUrl: 'spinner.css',
  shadow: true
})
export class Spinner {
  render() {
    return (
      <div class="lds-hourglass"></div>
    )
  }
}
