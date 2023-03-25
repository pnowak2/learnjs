class EuiConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', (evt) => {
            const confirmationText = this.getAttribute('confirmation-text') || 'Are you sure ?';
            const isConfirmed = confirm(confirmationText);
            if (!isConfirmed) {
                evt.preventDefault();
            }
        });
    }
}

customElements.define('eui-confirm-link', EuiConfirmLink, { extends: 'a' });