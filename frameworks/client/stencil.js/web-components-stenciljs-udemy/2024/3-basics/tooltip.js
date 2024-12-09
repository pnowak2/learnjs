class Tooltip extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    this.appendChild(tooltipIcon);
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  attributeChangedCallback() {
    console.log('attribute changed');
  }
}

customElements.define('eui-tooltip', Tooltip);
