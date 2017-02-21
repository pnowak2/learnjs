import { E7ForwardRefsPage } from './app.po';

describe('e7-forward-refs App', function() {
  let page: E7ForwardRefsPage;

  beforeEach(() => {
    page = new E7ForwardRefsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
