class EuiWebcomp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    color: red;
                }
            </style>
        
            <div>hello</div>
        `;
    }
}

customElements.define('eui-webcomp', EuiWebcomp);