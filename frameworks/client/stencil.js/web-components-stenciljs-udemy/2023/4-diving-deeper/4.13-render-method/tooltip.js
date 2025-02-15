class EuiTooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipVisible = false;

        this.attachShadow({ mode: 'open' });

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
                    position: relative;
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

        this._render();
    }

    disconnectedCallback() {
        console.log('disconnect')
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');

        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if(tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log(attrName, oldValue, newValue);
        this._tooltipText = newValue;
    }

    _showTooltip() {
        this._tooltipVisible = true;
        this._render();
    }

    _hideTooltip() {
        this._tooltipVisible = false;
        this._render();
    }
}

customElements.define('eui-tooltip', EuiTooltip);