class Tooltip extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    this._tooltipContainer = null;
    this._tooltipText = 'not defined yet';

    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
        }

        .highlight {
          background-color: red;
        }
      </style>

      <slot>default value</slot>
      <span> (?)</span>
    `;
  }

  connectedCallback() {
    if(this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    const tooltipIcon = this.shadowRoot.querySelector('span');
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    this.style.position = 'relative';
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;

    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }

  attributeChangedCallback() {
    console.log('attribute changed');
  }
}

customElements.define('eui-tooltip', Tooltip);
