import { Component, Prop, h } from "@stencil/core";

@Component({
    tag: 'ecl-site-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @Prop({ reflect: true }) title: string;

    constructor() {
        setTimeout(() => {
           this.title = 'buba';
        }, 3000);
    }

    render() {
        return (
            <aside>
                <header>
                    <h1>{ this.title }</h1>
                </header>
                <main>
                    <slot />
                </main>
            </aside>
        )
    }
};

