import { E15CustomValidatorsPage } from './app.po';

describe('e15-custom-validators App', function() {
  let page: E15CustomValidatorsPage;

  beforeEach(() => {
    page = new E15CustomValidatorsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
