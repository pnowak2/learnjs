class EuiModal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;

        this.attachShadow({mode: 'open'}).innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }

                #modal {
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                    position: fixed;
                    width: 50%;
                    top: 10vh;
                    left: 25%;
                    background-color: white;
                    z-index: 100;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }

                :host([opened]) #backdrop, 
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([opened]) #modal {
                    top: 15vh;
                }

                header {
                    padding: 1rem;
                    border-bottom: 1px solid grey;
                }

                ::slotted(h1),
                header h1 {
                    font-size: 1.25rem;
                }


                #main {
                    padding: 1rem;
                }

                #actions {
                    display: flex;
                    justify-content: flex-end;
                    border-top: 1px solid grey;
                    padding: 1rem;
                }

                #actions button {
                    margin: 0 0.25rem;
                }
            </style>

            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title"><h1>Default title</h1></slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancelBtn">Cancel</button>
                    <button id="okBtn">Ok</button>
                </section>
            </div>
        `;

        const backdrop = this.shadowRoot.querySelector('#backdrop');
        backdrop.addEventListener('click', (evt) => {
            this.close();
            this.dispatchEvent(new Event('cancel', { bubbles: true, composed: false }));
        });

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', (evt) => {
            console.log('slot change');
            console.log(slots[1].assignedNodes());
        });

        const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');
        const okBtn = this.shadowRoot.querySelector('#okBtn');

        cancelBtn.addEventListener('click', () => {
            this.close();
            this.dispatchEvent(new Event('cancel', { bubbles: true, composed: false }));
        });

        okBtn.addEventListener('click', () => {
            this.close();
            this.dispatchEvent(new Event('confirm', { bubbles: true, composed: true }));
        });
    }

    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }

    close() {
        this.removeAttribute('opened');
        this.isOpen = false;
    }

    static get observedAttributes() {
        return ['opened'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === newValue) return;

        this.isOpen = this.hasAttribute('opened');
    }

    connectedCallback() {
    }
}

customElements.define('eui-modal', EuiModal);