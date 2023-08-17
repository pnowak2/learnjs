class EuiWebcomp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <slot></slot> 
            <div>And this is internal webcomp content</div>
            <slot name="footer"></slot>
        `;
    }
}

customElements.define('eui-webcomp', EuiWebcomp);