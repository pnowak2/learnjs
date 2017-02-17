import { E2TutorialPage } from './app.po';

describe('e2-tutorial App', function() {
  let page: E2TutorialPage;

  beforeEach(() => {
    page = new E2TutorialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
