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
                }

                :host(.eui-important) {
                    background: green;
                }

                /* Selects a shadow root host, only if it is
                a descendant of the selector argument given */

                :host-context(p) {
                    /* some selectors */
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