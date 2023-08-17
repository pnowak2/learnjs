import { h, Component, Prop, State, Method } from "@stencil/core"

@Component({
  tag: 'eui-side-drawer',
  styleUrl: './eui-side-drawer.css',
  shadow: true,
})
export class EuiSideDrawer {
  @State() showContactInfo: boolean = false;
  @Prop({ reflect: true }) euititle: string;
  @Prop({ reflect: true, mutable: true }) opened: boolean;

  @Method()
  open() {
    this.opened = true;
  }

  onCloseDrawer() {
    this.opened = false;
  }

  onTabClick(content: string) {
    this.showContactInfo = (content === 'contact')
  }

  render() {
    let mainContent = <slot />;

    if (this.showContactInfo) {
      mainContent = (
        <div id="contact-information">
          <h2>Contact Information</h2>

          <p>You can reach us via teams of email</p>
          <ul>
            <li>Phone: 3202300454</li>
            <li><a href="email:sth@sth.com">Email</a></li>
          </ul>
        </div>
      );
    }

    return [ 
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,

      <aside>

        <header>
          <h1>{this.euititle}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>

        <section id="tabs">
          <button
            class={this.showContactInfo ? '' : 'active'}
            onClick={this.onTabClick.bind(this, 'nav')}>Navigation</button>
          <button 
            class={this.showContactInfo ? 'active' : ''}
            onClick={this.onTabClick.bind(this, 'contact')}>Contact</button>
        </section>

        <main>
          { mainContent }
        </main>

      </aside>
     ];
  }
}