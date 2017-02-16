import { E4ViewEncapsulationPage } from './app.po';

describe('e4-view-encapsulation App', function() {
  let page: E4ViewEncapsulationPage;

  beforeEach(() => {
    page = new E4ViewEncapsulationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
