class EuiWebcomp extends HTMLElement {
    constructor() {
        super();
        console.log('hello webcomp');
    }
}

customElements.define('eui-webcomp', EuiWebcomp);