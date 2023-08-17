class EuiTooltip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this._tooltipContainer;
        this._tooltipText = 'some dummy text';
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    font-weight: normal;
                    top: 1.5rem;
                    left: 0;
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    padding: 0.35rem;
                    border-radius: 3px;
                    box-shadow: 1px 1px 6px rgba(0,0,0,0.25);
                }

                .icon {
                    background: black;
                    display: inline-flex;
                    justify-content: center;
                    border-radius: 32px;
                    color: white;
                    width: 16px;
                    height: 16px;
                }

                :host {
                    border: 1px dotted red;
                    color: var(--color-primary, blue);
                }

                :host(.eui-important) {
                    background: green;
                }

                ::slotted(.highlight) {
                    color: red;
                }
            </style>
            <slot>Default slot</slot>
            <span class="icon">?</span>
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