class EuiModal extends HTMLElement {
    constructor() {
        super();
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
                }

                #modal {
                    display: flex;
                    flex-flow: column;
                    justify-content: space-between;
                    position: fixed;
                    width: 50%;
                    top: 15vh;
                    left: 25%;
                    background-color: white;
                    z-index: 100;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                }

                header {
                    padding: 1rem;
                    border-bottom: 1px solid grey;
                }

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
                    <h1>Please confirm</h1>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button>Cancel</button>
                    <button>Ok</button>
                </section>
            </div>
        `;
    }

    connectedCallback() {

    }
}

customElements.define('eui-modal', EuiModal);