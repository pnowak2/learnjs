class EuiWebcomp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <slot></slot> 

            <div part="footer">
                this is comp footer
            </div>
        `;
    }
}

customElements.define('eui-webcomp', EuiWebcomp);