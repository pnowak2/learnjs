class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      event.preventDefault();
      console.log('link click');
    })
  }
}

customElements.define('uc-link', ConfirmLink, { extends: 'a' });