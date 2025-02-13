import { E25CustomFormComponentsPage } from './app.po';

describe('e25-custom-form-components App', function() {
  let page: E25CustomFormComponentsPage;

  beforeEach(() => {
    page = new E25CustomFormComponentsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
