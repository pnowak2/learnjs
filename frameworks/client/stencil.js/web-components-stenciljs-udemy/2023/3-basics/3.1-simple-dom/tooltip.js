class EuiTooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = 'some dummy text';
    }

    connectedCallback() {
        const tooltipIcon = document.createElement('span');
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        tooltipIcon.textContent = ' (?) ';
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

        this.appendChild(tooltipIcon);
        this.style.position = 'relative';
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.style.backgroundColor = 'black';
        this._tooltipContainer.style.color = 'white';
        this._tooltipContainer.style.position = 'absolute';
        this._tooltipContainer.style.zIndex = '10';

        this._tooltipContainer.textContent = this._tooltipText;
        this.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.removeChild(this._tooltipContainer);
    }
}

customElements.define('eui-tooltip', EuiTooltip);