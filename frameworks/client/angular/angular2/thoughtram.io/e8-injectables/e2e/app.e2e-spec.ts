import { E8InjectablesPage } from './app.po';

describe('e8-injectables App', function() {
  let page: E8InjectablesPage;

  beforeEach(() => {
    page = new E8InjectablesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
