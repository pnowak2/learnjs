class EuiModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([opened]) #modal {
                    top: 15vh;
                    pointer-events: all;
                }

                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0, 0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }

                #modal {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }

                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;
                }

                ::slotted(h1),
                header h1 {
                    font-size: 1.25rem;
                    margin: 0;
                }

                #main {
                    margin: 0 1rem;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
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
                    <button id="cancel">Cancel</button>
                    <button id="confirm">Confirm</button>
                </section>
            </div>
        `;

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots.forEach(slot => {
            slot.addEventListener('slotchange', evt => {
                console.dir(slot.assignedElements(), slots.assignedSlot);
            });
        })

        const cancelBtn = this.shadowRoot.querySelector('#cancel');
        const confirmBtn = this.shadowRoot.querySelector('#confirm');
        const backdrop = this.shadowRoot.querySelector('#backdrop');

        backdrop.addEventListener('click', () => {
            this.close();
        })

        cancelBtn.addEventListener('click', () => {
            this.close();

            const evt = new Event('cancel', { composed: true })
            this.dispatchEvent(evt);
        });

        confirmBtn.addEventListener('click', (evt) => {
            this.close();

            const e = new Event('confirm', { composed: true, bubbles: true })
            evt.target.dispatchEvent(e);
        });

    }

    open() {
        this.setAttribute('opened', '');
    }

    close() {
        this.removeAttribute('opened');
    }
}

customElements.define('eui-modal', EuiModal);