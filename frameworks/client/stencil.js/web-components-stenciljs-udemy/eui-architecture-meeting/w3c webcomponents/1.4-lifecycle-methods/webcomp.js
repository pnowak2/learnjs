class EuiWebcomp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <slot></slot> 
        `;
    }

    connectedCallback() {
        console.log('connected');
    }

    disconnectedCallback() {
        console.log('disconnected');
    }

    static get observedAttributes() {
        return ['text'];
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log(attrName, oldValue, newValue);
    }
}

customElements.define('eui-webcomp', EuiWebcomp);