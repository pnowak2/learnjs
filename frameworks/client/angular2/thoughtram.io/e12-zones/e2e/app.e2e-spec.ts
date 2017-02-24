import { E12ZonesPage } from './app.po';

describe('e12-zones App', function() {
  let page: E12ZonesPage;

  beforeEach(() => {
    page = new E12ZonesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
