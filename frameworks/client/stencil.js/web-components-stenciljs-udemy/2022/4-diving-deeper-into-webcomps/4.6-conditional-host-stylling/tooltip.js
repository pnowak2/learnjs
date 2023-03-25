class EuiTooltip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});

        this._tooltipContainer;
        this._tooltipText = 'some dummy tooltip text';

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

                :host {
                    background: lightgrey;
                }

                :host([important]),
                :host(.important) {
                    color: red;
                }

                ::slotted(.highlight) {
                    border-bottom: 1px dotted red;
                }

                .icon {
                    background: black;
                    color: white;
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 50%;
                    text-align: center;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                }
            </style>

            <slot>Default slot content</slot>
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