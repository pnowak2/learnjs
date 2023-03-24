class EuiConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', (evt) => {
            const isConfirmed = confirm("Are you sure ?");
            if (!isConfirmed) {
                evt.preventDefault();
            }
        });
    }
}

customElements.define('eui-confirm-link', EuiConfirmLink, { extends: 'a' });