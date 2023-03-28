class EuiTooltip extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open'});
        this._showTooltip = this._showTooltip.bind(this)
        this._hideTooltip = this._hideTooltip.bind(this)

        this._tooltipContainer;
        this._tooltipText = 'some dummy tooltip text';
        this._tooltipIcon;

        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: black;
                    color: white;
                    position: absolute;
                    z-index: 10;
                    padding: 0.5rem;
                    font-weight: normal;
                }

                .highlight {
                    background-color: red;
                }

                :host {
                    background: lightgrey;
                }

                :host([important]),
                :host(.important) {
                    color: var(--eui-color-primary, violet);
                }

                :host-context(p[extra]) {
                    background-color: yellow;
                    font-weight: bold;
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

        this.tooltipIcon = this.shadowRoot.querySelector('span');
        this.tooltipIcon.addEventListener('mouseenter', this._showTooltip);
        this.tooltipIcon.addEventListener('mouseleave', this._hideTooltip);

        this.style.position = 'relative';
    }

    disconnectedCallback() {
        this.tooltipIcon.removeEventListener('mouseover', this._showTooltip);
        this.tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === newValue) return;

        if(name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
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