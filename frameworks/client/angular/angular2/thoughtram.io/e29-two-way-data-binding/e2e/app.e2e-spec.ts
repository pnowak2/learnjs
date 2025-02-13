import { E29TwoWayDataBindingPage } from './app.po';

describe('e29-two-way-data-binding App', function() {
  let page: E29TwoWayDataBindingPage;

  beforeEach(() => {
    page = new E29TwoWayDataBindingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
