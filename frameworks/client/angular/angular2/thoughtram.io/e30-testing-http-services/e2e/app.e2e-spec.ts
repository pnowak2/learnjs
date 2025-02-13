import { E30TestingHttpServicesPage } from './app.po';

describe('e30-testing-http-services App', function() {
  let page: E30TestingHttpServicesPage;

  beforeEach(() => {
    page = new E30TestingHttpServicesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
