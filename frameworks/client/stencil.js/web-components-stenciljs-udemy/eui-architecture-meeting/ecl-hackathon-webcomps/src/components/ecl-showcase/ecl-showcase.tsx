import { Component, h } from '@stencil/core';

@Component({
  tag: 'ecl-showcase',
  styleUrl: 'ecl-showcase.css',
  shadow: false
})
export class EclShowcase {
  render() {
    return <div>
      <img class="hck-eui-team" src="assets/images/fossa-eui-team.png" alt="fossa eui team"/>

      <div class="ecl-u-pa-xl">
      <h1>EU-FOSSA Hackaton 2019</h1>
      <p>Below is result of first day of creating technology agnostic version of <a href="https://eui.ecdevops.eu/screen/app/ecl" target="_blank">eui/ECL components</a> which are done using Angular framework</p>
      <p>Since webcomponents is an official browser standard, there's no need for any framework for them to work, just put there in plain html and use immediately</p>

      <h1>ECL Button</h1>

      <ecl-button styleClass="ecl-u-hackaton">Default</ecl-button>

      <ecl-button type="primary">Primary</ecl-button>
      <ecl-button type="secondary">Secondary</ecl-button>
      <ecl-button type="ghost">Ghost</ecl-button>
      <ecl-button type="search">Search</ecl-button>
      <ecl-button type="call">Call</ecl-button>

      <ecl-button>
        With icon
        <ecl-icon slot="icon" icon="ui--corner-arrow" transform="rotate-90"></ecl-icon>
      </ecl-button>

      <h1>ECL Icon</h1>

      <ecl-icon icon="general--audio" size="xs"></ecl-icon>
      <ecl-icon icon="general--audio" size="s"></ecl-icon>
      <ecl-icon icon="general--audio" size="m"></ecl-icon>
      <ecl-icon icon="general--audio" size="l"></ecl-icon>
      <ecl-icon icon="general--audio" size="xl"></ecl-icon>
      <ecl-icon icon="general--audio" size="2xl"></ecl-icon>
      <ecl-icon icon="general--audio" size="fluid"></ecl-icon>

      <ecl-icon icon="general--audio"></ecl-icon>
      <ecl-icon icon="general--audio" color="primary"></ecl-icon>
      <ecl-icon icon="general--audio" color="inverted"></ecl-icon>

      <ecl-icon icon="general--audio" transform="rotate-0"></ecl-icon>
      <ecl-icon icon="general--audio" transform="rotate-90"></ecl-icon>
      <ecl-icon icon="general--audio" transform="rotate-180"></ecl-icon>
      <ecl-icon icon="general--audio" transform="rotate-270"></ecl-icon>

      <h1>Message</h1>

      <ecl-message title="Information message" typeClass="info">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
        Duis scelerisque diam eu tempus fringilla.
      </ecl-message>

      <br/>

      <ecl-message title="Warning message" typeClass="warning">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
        Duis scelerisque diam eu tempus fringilla.
      </ecl-message>

      <br/>

      <ecl-message title="Error message" typeClass="error">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan semper lorem, ac mollis lacus tincidunt eu.
        Duis scelerisque diam eu tempus fringilla.
      </ecl-message>

      <h1>Tag</h1>

      <ecl-tag>Default</ecl-tag>
      <ecl-tag is-removable="true">Removable Tag</ecl-tag>

      <h1>Accordion</h1>

      <ecl-accordion>
          <ecl-accordion-item label="Delivery of last pending proposals, a common
          Destiny of unity, the hour of European Democracy">
              The College of Commissioners held today the first weekly meeting of 2019 which was devoted to discussing the
              challenges of this new year. Commissioners used the opportunity to take stock and discuss the year ahead,
              including the European elections in May and other important milestones ahead.
          </ecl-accordion-item>

          <ecl-accordion-item label="Energy union and climate">
              A balanced and progressive trade policy to harness globalisation
          </ecl-accordion-item>

          <ecl-accordion-item label="Delivery of last pending proposals, a common
          Destiny of unity, the hour of European Democracy">
              In the modern global economy trade is essential for growth, jobs and competiveness, and the EU is committed to
              maintaining an open and rules-based trading system. With the rising threat of protectionism and weakened
              commitment of large players to global trade governance, the EU must take the lead.
          </ecl-accordion-item>
      </ecl-accordion>

      <h1>Expandable</h1>

      <ecl-expandable>
        <p class="ecl-u-type-paragraph-m">
          The EU is building an energy union that ensures Europe’s energy supply is safe,
          viable and accessible to all. In doing so, it can boost the economy and attract investments that can create new jobs
          opportunities.
        </p>
      </ecl-expandable>

      <footer class="hck-footer">EU-FOSSA@Bruxelles, In any questions please do not hesitate to contact me <a href="mailto:piotr-andrzej.nowak@ext.ec.europa.eu">here</a></footer>
      </div>

    </div>;
  }
}
