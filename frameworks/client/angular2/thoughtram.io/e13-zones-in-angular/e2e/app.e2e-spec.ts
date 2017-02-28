import { E13ZonesInAngularPage } from './app.po';

describe('e13-zones-in-angular App', function() {
  let page: E13ZonesInAngularPage;

  beforeEach(() => {
    page = new E13ZonesInAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
