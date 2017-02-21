import { E6UserInputPage } from './app.po';

describe('e6-user-input App', function() {
  let page: E6UserInputPage;

  beforeEach(() => {
    page = new E6UserInputPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
