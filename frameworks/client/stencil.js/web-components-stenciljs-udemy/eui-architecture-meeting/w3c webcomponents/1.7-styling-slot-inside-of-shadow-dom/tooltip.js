class EuiTooltip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this._tooltipContainer;
        this._tooltipText = 'some dummy text';
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                }

                ::slotted(.highlight) {
                    color: red;
                }

                /* wont work, only direct child works */
                ::slotted(span a) {
                    color: blue;
                }
            </style>
            <slot>Default slot</slot>
            <span>?</span>
        `;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

        this.shadowRoot.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');

        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer);
    }
}

customElements.define('eui-tooltip', EuiTooltip);