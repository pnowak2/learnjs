class EuiConfirmLink extends HTMLAnchorElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.addEventListener('click', (evt) => {
            if (!confirm('Are you sure ?')) {
                evt.preventDefault();
            }
        });
    }
}

customElements.define('eui-confirm-link', EuiConfirmLink, { extends: 'a' });