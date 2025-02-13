import { E18LifecycleHooksPage } from './app.po';

describe('e18-lifecycle-hooks App', function() {
  let page: E18LifecycleHooksPage;

  beforeEach(() => {
    page = new E18LifecycleHooksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
