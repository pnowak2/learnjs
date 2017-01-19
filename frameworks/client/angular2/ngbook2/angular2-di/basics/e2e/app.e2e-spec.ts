import { InjectorPage } from './app.po';

describe('injector App', function() {
  let page: InjectorPage;

  beforeEach(() => {
    page = new InjectorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
