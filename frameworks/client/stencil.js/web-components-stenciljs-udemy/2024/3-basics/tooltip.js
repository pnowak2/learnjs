class Tooltip extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: 'open'});

    this._tooltipContainer = null;
    this._tooltipText = 'not defined yet';
  }

  connectedCallback() {
    if(this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    const tooltipIcon = document.createElement('span');

    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    tooltipIcon.textContent = ' (?)';
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = 'relative';
  }

  disconnectedCallback() {
    console.log('disconnected');
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;

    this._tooltipContainer.style.backgroundColor = 'black';
    this._tooltipContainer.style.color = 'white';
    this._tooltipContainer.style.position = 'absolute';
    this._tooltipContainer.style.zIndex = '10';

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
