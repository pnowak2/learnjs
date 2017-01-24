import { IntroductionPage } from './app.po';

describe('introduction App', function() {
  let page: IntroductionPage;

  beforeEach(() => {
    page = new IntroductionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
