import { InjectorsPage } from './app.po';

describe('injectors App', function() {
  let page: InjectorsPage;

  beforeEach(() => {
    page = new InjectorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
